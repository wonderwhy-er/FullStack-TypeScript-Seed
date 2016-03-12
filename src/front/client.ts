import HelloWorld = require('../middle/HelloWorld');

var element:HTMLElement = <HTMLElement>document.getElementsByClassName('client')[0];
var greeter = new HelloWorld();
element.innerHTML = greeter.greeting('from client');