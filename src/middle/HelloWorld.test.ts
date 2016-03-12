import assert = require('power-assert');
import HelloWorld = require("./HelloWorld");


describe('HelloWorld', () => {
    var greeter:HelloWorld;

    beforeEach(() => {
        greeter = new HelloWorld();
    })

    it('should show Hello World when called without parameters', ()=> {
        assert(greeter.greeting() == 'Hello World');
    });

    it('should show Hello world when called with world', ()=> {
        //fails to show how fail looks
        assert(greeter.greeting('world') == 'Hello world');
    });
});

