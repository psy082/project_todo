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
apt-get update
sudo apt-get install -y nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install npm

# install mongodb
sudo apt-get install mongdb-clients mongodb-server

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
