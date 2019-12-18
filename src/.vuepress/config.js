const fs = require("fs");
const path = require("path");

const walk = (filepath, relative = "/") =>
  fs
    .readdirSync(filepath)
    .filter(filename => !filename.startsWith("."))
    .map(filename => {
      const myFilepath = path.join(filepath, filename);
      const extension = path.extname(filename);
      const basename = path.basename(filename, extension);
      const isDirectory = fs.statSync(myFilepath).isDirectory();

      return {
        basename,
        extension,
        filepath: myFilepath,
        isDirectory
      };
    })
    .filter(
      ({ filepath, extension, isDirectory }) =>
        fs.existsSync(filepath) && (isDirectory || extension == ".md")
    )
    .sort((a, b) => {
      if (a.isDirectory != b.isDirectory) {
        return a.isDirectory ? 1 : -1;
      }
      if (a.basename == "index") {
        return -1;
      }
      if (b.basename == "index") {
        return 1;
      }
      return a.basename - b.basename;
    })
    .map(({ filepath, basename, isDirectory }) => {
      const myRelative =
        basename === "index"
          ? path.join(relative, "/")
          : path.join(relative, basename);

      if (!isDirectory) {
        return myRelative;
      }

      const metadataPath = path.join(filepath, "metadata.json");
      let title = basename;
      if (fs.existsSync(metadataPath)) {
        const buf = fs.readFileSync(metadataPath);
        const metadata = JSON.parse(buf.toString());
        if (metadata.title) {
          title = metadata.title;
        }
      }

      const children = walk(filepath, myRelative);
      if (children.length === 0) {
        return null;
      }
      return { title, children };
    })
    .filter(link => link != null);

const sidebar = walk("./src");

module.exports = {
  locales: {
    "/": {
      lang: "ja",
      title: "mushus.github.io",
      description: "content"
    }
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" }
    ],
    sidebar
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
};
