import S = require('underscore.string');

class HelloWorld {
    greeting(name:string='world') {
        return 'Hello ' + S.capitalize(name);
    }
}

export = HelloWorld;