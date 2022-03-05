#!/usr/bin/env bash

# node
curl -sL https://deb.nodesource.com/setup_17. | sudo bash -
sudo apt-get install -y nodejs build-essential
sudo npm install npm -g
sudo npm cache clean -f
sudo npm set registry https://registry.npmjs.org/
sudo npm i -g pm2
sudo npm install
