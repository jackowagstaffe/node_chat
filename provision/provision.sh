sudo apt update
sudo apt-get -y install git

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo cp /vagrant/provision/mongodb.service /etc/systemd/system/mongodb.service
sudo systemctl start mongodb

sudo apt-get -y install nodejs
sudo apt-get -y install npm

sudo npm install -g n
sudo n v7.2.1
sudo ln -s /usr/local/n/versions/node/7.2.1/bin/node /usr/bin/node

sudo npm install pm2 -g
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown vagrant /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
authbind --deep pm2 update
authbind --deep pm2 start /vagrant/server.js
