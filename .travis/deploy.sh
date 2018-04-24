#!/bin/bash

cd .travis

echo -e "Host github.com\n\tStrictHostKeyChecking no\nIdentityFile ~/.ssh/deploy_key\n" >> ~/.ssh/config
openssl aes-256-cbc -K $encrypted_8af22c44f404_key -iv $encrypted_8af22c44f404_iv -in deploy_key.enc -out deploy_key -d
cp deploy_key ~/.ssh/
chmod 600 ~/.ssh/deploy_key

cd -

yarn build

cd dist

git config user.email "deploy@travis-ci.org"
git config user.name "Deployment Bot"

git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force "git@github.com:Mushus/Mushus.github.io.git" master:master > /dev/null 2>&1
