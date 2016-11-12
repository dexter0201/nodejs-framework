#Dexter's NodeJs Framework based on Mean.io

##Structure
* **package.json:** defines the project's variables and dependencies
* **server:** this folder contains the core server side configuration
* **gulpfile.js:** the build script for compiling CSS, minifying JS and copying assets
* **gruntfile.js:** the build script for compiling CSS, minifying JS and copying assets


##Requirements
1. [Git](https://git-scm.com/downloads)
2. [Node.js](https://nodejs.org/en/) (NPM > v3.x)

##Getting started
Clone the repository
```sh
$ git clone git@github.com:dexter0201/nodejs-framework.git
```

Install dependencies
```sh
$ cd nodejs-framework
```
```sh
$ npm install
```

Install grunt globally
```sh
$ npm install -g grunt
```

Install gulp globally
```sh
$ npm install -g gulp
```

Build the project (compile CSS/JS)
```sh
$ grunt install
```

Run
```sh
$ node server
```