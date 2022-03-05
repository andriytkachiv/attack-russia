pm2 save && pm2 stop all && pm2 restart all && pm2 stop all && pm2 start start.js -i --watch

curl -sL https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/setup.sh | sudo bash -
curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/start.js --output start.js
curl https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/package.json --output package.json
