import HelloWorld = require('../middle/HelloWorld');

var element:HTMLElement = <HTMLElement>document.getElementsByClassName('client')[0];
var greeter = new HelloWorld();
element.innerHTML = greeter.greeting('from client');


function sleep(time) {
    return new Promise((resolve,reject) => {
       setTimeout(resolve,time);
    });
}

async function await() {
    console.log('hi' + new Date().getTime());
    await sleep(100);
    console.log('awaited hi' + new Date().getTime());
}

await();