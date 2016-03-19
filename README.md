# FullStack TypeScript Seed
This is seed project for my "living the dream" full stack typescript applications that share code between server and client(aka API/Models/Utilities/Business Logic)  

# Stuff inside
- [Gulp](https://github.com/gulpjs/gulp) as task runner
- [WebPack](https://github.com/webpack/webpack) as bundler
- [TypeScript](https://github.com/Microsoft/TypeScript) duh, aka Babel + type checking + generics 
- [typings](https://github.com/typings/typings) for installing definitely typed for libraries you use
- [jasmine](https://github.com/jasmine/jasmine) [mocha](https://github.com/mochajs/mocha) [power-assert](https://github.com/power-assert-js/power-assert)(this one kick ass) for unit tests which can be written in TypeScript
- [Express.js](https://github.com/expressjs/express) with [Jade](https://github.com/pugjs/jade) for server side

# Stuff I still wish to have
- [Protractor](https://github.com/angular/protractor) or something similar for BBD style end to end testing(aka RSpec style testing)
- Currently tests run in command line and run for middle/backend code, want to setup front end unit tests as well(aka runnable in browser)
- Test coverage with something like [istanbul.js](https://github.com/gotwarlost/istanbul) that plays well with TypeScript/Unit/BDD
- May be add [PouchDB](https://github.com/pouchdb/pouchdb)/ServiceWorker to allow app work offline out of the gate [like here](https://github.com/wonderwhy-er/offline-first-seed)
- May be add Jade loader to webpack allowing server and client reusing same templates 

# What it won't have
- Any front-end framework, you just add one you want(Angular, React(will need additional work I guess, JSX and stuff), BackBone etc)
- Any CSS stuff as you can add it yourself too be it PostCSS/LESS/SASS etc

# Usage
Install dependencies
```bash
npm install
npm install typings --global
typings install
```

To start server and gulp/webpack watchers
```bash
gulp
```
Now go to [localhost:3002](http://localhost:3002/) to see the app.
You will see hello from server and client code in browser.
Also hello in console too.

To run unit tests 
```bash
gulp test
```

There is also a watcher to rerun tests if files change. 
```bash
gulp testWatch
```

Example of adding new module.
```bash
npm install underscore.string --save
typings install underscore.string --save --ambient
```
Then just require it in your code.

# Project structure and decisions
Most magic is in gulpfile.js

We have following structure
```bash
|-- src
|   |-- back
|   |-- front
|   |-- middle
|-- wwwroot
|   |-- back
|   |-- middle
|   |-- public
|   |   |-- css
|   |   |-- images
|   |   |-- js
```

All your code goes to src folder. 
Back for server.
Front for browser code.
Middle for code to used both on client and server.

In gulp file we have a nodemon task that watches files and restarts server on changes using wwwroot/back/app.js as server script


Then we have gulp watch task
```
    gulp.watch(backFolder, ['compileServer']);
    gulp.watch(frontFolder, ['compileClient']);
    gulp.watch(viewsFolder, ['copyViews']);
    gulp.watch(middleFolder, ['compileMiddle', 'compileClient']);
```

It watches back, middle, front folders and on changes compiles code for those.

For server we compile TypeScript using typescript compiler to commonjs format(aka many files are generated)

For browser we compile TypeScript to AMD format using WebPack and ts-loader. 
WebPack handles our CommonJS style TypeScript dependencies including one from node_modules and bundles + source maps are generated.

End result is that in middle folder we have code used on server and client. 
But its compiled differently to client and server. 
Still considering source maps we can debug it as TypeScript which results in experiance of having same code on server and client.

# Unit tests
Can be stored anywhere in the src folder with names *.test.ts
This allows putting test files near files they actually test, so you can move or remove them together
 
Gulp task finds all files with such names and pipes them to Mocha

There is example src/middle/HelloWorld.test.ts file with one successful and one failing test
Running gulp test shows this
```
gulp test
 Using gulpfile FullStack Typescript Seed\gulpfile.js
 Starting 'test'...


  HelloWorld
    √ should show Hello World when called without parameters
    1) should show Hello world when called with world


  1 passing (60ms)
  1 failing

  1) HelloWorld should show Hello world when called with world:

      AssertionError:   # file.ts:18
  
  assert(greeter.greeting('world') == 'Hello world')
         |       |              |             
         |       "Hello World"     false         
         HelloWorld{}                         
[...]
```

What I like about power-assert is that it allows to write very minimalistic and clean documentation like tests while still having very informative failure messages   
Plus its just an assert. No need for all those large APIs. You just write your code.



# Known issues
 - There are some semantic and syntax errors while compiling TypeScript but it compiles fine
 - TypeScript fils to see node modules + for some reason type definitions for node throw syntax error because of type this while it should be fine with 1.8 compiler