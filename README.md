# Logbone  
Logbone is a dead simple utility written with javascript for javascript apps. Why Logbone? Simple! 
Logbone makes console logging effortless. Quickly and easily create named loggers so you know exactly 
where console output is coming from. Identify environments, tests and improve log filtering with 
prefixes. Control the global logging level with the flip of a switch or override it for any logger. 

Don't leave confusing console outputting just sitting around anymore. And no more tedious commenting 
and uncommenting logging lines before going to production. Logbone is here to be your bare-bone logging
solution. 

## Getting Started  
Using Logbone is so easy. Simply download it from Github or install it with Bower: `bower install logbone --save-dev`  

Then, add Logbone to your HTML with a script tag. Logbone should go before any other scripts or code you want
to use it in.  

`<script type="text/javascript" src="Logbone.js"></script>` 

That's it! You are ready to begin using Logbone. On start-up Logbone will initialize and assign 
a reference to itself on the global namespace. Now you are ready to grab a logger and go.  

````
var logger = Logbone.getLogger('My_Very_First_Logger');
logger.info("I promised myself I wasn't going to cry.. But it's just so beautiful!");
```

## Logging is about levels  
Logbone's loggers are all about log levels (try saying that 3 times fast). The following are log levels 
and log methods used by Logbone. 'SILENT' is only a level, not a logging method. Any logger using a 
level of 'SILENT` will not output anything to the console. 

| Level  | TRACE  | DEBUG | INFO | WARN  | ERROR  | SILENT |    
| -----: | :----: | :---: | :--: | :---: | :----: | ------ |  
| DEBUG  | YES    | YES   | NO   | NO    | NO     | NO     |  
| INFO   | YES    | YES   | YES  | NO    | NO     | NO     |  
| WARN   | YES    | YES   | YES  | YES   | NO     | NO     |  
| ERROR  | YES    | YES   | YES  | YES   | YES    | NO     | 
