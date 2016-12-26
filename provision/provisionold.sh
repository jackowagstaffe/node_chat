sudo apt update
sudo apt-get -y install git
sudo apt-get -y install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get -y install npm
sudo npm install pm2 -g
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown vagrant /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
authbind --deep pm2 update
authbind --deep pm2 start /vagrant/server.js
