# todo-vue

> A Vue.js project

## Build Setup

``` bash
# make directory and change directory to new one
mkdir todoList
cd todoList

# clone source file from github
git init
git clone https://github.com/psy082/project_todo

# install node
sudo apt update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install node
nvm use node

# install mongodb
sudo apt-get install -y mongdb-clients mongodb-server

# start mongod as a Daemon
sudo mongod --fork --logpath /var/log/mongodb.log

# install nginx
sudo apt-get install -y nginx

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
