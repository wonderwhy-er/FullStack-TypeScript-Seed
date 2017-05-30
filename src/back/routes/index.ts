import express = require('express');
import HelloWorld = require("../../middle/HelloWorld");

var router = express.Router();
var greeter = new HelloWorld();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'FullStack TypeScript Seed',
        serverCode: greeter.greeting('from server trough template')
    });
    console.log(greeter.greeting('from server console'));
});

export = router;