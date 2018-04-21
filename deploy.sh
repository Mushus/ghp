#!/bin/bash
cd dist

git config user.email "example@example.com"
git config user.name "Travis-CI"

git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/Mushus/Mushus.github.io.git" master:master > /dev/null 2>&1
