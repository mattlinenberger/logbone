# Logbone  
Logbone is a dead simple utility written with javascript for javascript apps. Why Logbone? Simple! 
Logbone makes console logging effortless. Quickly and easily create named loggers so you know exactly 
where console output is coming from. Identify environments, tests and improve log filtering with 
prefixes. Control the global logging level with the flip of a switch or override it for any logger. 

Don't leave confusing console outputting just sitting around anymore. And no more tedious commenting 
and uncommenting logging lines before going to production. Logbone is here to be your bare-bones logging
solution. 

## Getting Started  
Using Logbone is easy. Simply download it from Github or install it with Bower:  
 `bower install logbone --save-dev`  

Then, add Logbone to your HTML with a script tag. Make sure you put Logbone's script include
before other scripts and code that utilize Logbone.

`<script type="text/javascript" src="Logbone.js"></script>` 

That's it! You're ready to begin using Logbone. On start-up Logbone will initialize and assign 
a reference to itself on the global namespace. Now you are ready to grab a logger and go.  

```javascript
var logger = Logbone.getLogger('My_Very_First_Logger');
logger.info("I promised myself I wasn't going to cry.. But it's just so beautiful!");
```

## Logging is about levels  
Logbone's loggers are all about log levels (try saying that 3 times fast). The following are log levels 
and log methods used by Logbone. 'SILENT' is only a level, not a logging method. Loggers using a 
level of 'SILENT` will not output to the console. 

| Level  | TRACE  | DEBUG | INFO | WARN  | ERROR  | SILENT |    
| -----: | :----: | :---: | :--: | :---: | :----: | ------ |  
| DEBUG  | YES    | YES   | NO   | NO    | NO     | NO     |  
| INFO   | YES    | YES   | YES  | NO    | NO     | NO     |  
| WARN   | YES    | YES   | YES  | YES   | NO     | NO     |  
| ERROR  | YES    | YES   | YES  | YES   | YES    | NO     | 

## Logging methods  
Logbone Loggers have five logging methods that utilize native console methods: 
log, debug, info, warn and error. 

```javascript
//get a logger
var logger = Logbone.getLogger('Level-check');

logger.log('<--Log output');
logger.debug('<--Debug output');
logger.info('<--Info output');
logger.warn('<--warn output');
logger.error('<--error output');
```

## Logging method arguments  
The number of logging method arguments are limited to 10. Passing a logging method 
more than 10 arguments will cause the method to throw an exception. Logging methods
utilize the native console, so logging objects is no problem. Should you find 
a secnario where you need to log more than 10 items to the console at once, consider 
using an object or breaking your logging up over multiple lines. 

## Logging formatters  
