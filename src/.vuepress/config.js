const fs = require('fs');
const path = require('path');

const walk = (filepath, relative = '/') => fs
    .readdirSync(filepath)
    .filter(filename => !filename.startsWith('.'))
    .map(filename => {
        const myFilepath = path.join(filepath, filename);

        if (!fs.existsSync(filepath)) {
            return null;
        }

        const ext = path.extname(myFilepath);
        const basename = path.basename(myFilepath, ext);
        const myRelative = basename === 'index' ? relative : path.join(relative, basename);

        if (!fs.statSync(myFilepath).isDirectory()) {
            return myRelative;
        }

        const children = walk(myFilepath, myRelative);
        if (children.length === 0) {
            return null;
        }
        return { [myRelative]: children };
    })
    .filter(link => link != null);


const sidebar = walk('./src');
console.log(sidebar);

module.exports = {
    locales: {
        '/': {
            lang: 'ja',
            title: 'mushus.github.io',
            description: 'content',
        }
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/' },
            { text: 'Blog', link: 'https://www.nxworld.net/' }
        ],
        sidebar
    }
};