#!/bin/bash
echo Setting file permissions
chmod +x faxhandle.sh

echo Installing Dependencies
sudo apt install curl libtiff-tools -y
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash -
sudo apt install nodejs npm -y
npm install