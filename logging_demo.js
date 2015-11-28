/*
|--------------------WELCOME TO-------------------|
|	 __    _____ _____ _____ _____ _____ _____    |
|	|  |  |     |   __| __  |     |   | |   __|   | 
|	|  |__|  |  |  |  | __ -|  |  | | | |   __|   |
|	|_____|_____|_____|_____|_____|_|___|_____|   |  
|-------------------------------------------------|
*/
/*--Default global logging leve: 'LOG'--*/

//Get a logger
//Logbone.getLogger(name, [prefix], [level])
var logger = Logbone.getLogger('Tutorial');
var logger2 = Logbone.getLogger('Logger With Prefix', 'DEMO');
var logger3 = Logbone.getLogger('Logger with log level override', 'DEMO', Logbone.level.error);

//Do some logging
logger.log('<-- Logging output -->');
logger.debug('<-- Debugging output -->');
logger.info('<-- Info output -->');
logger.warn('<-- Warning output -->');
logger.error('<-- Error output -->');

//Some demo variables
var div = document.getElementById('div_id');
var jsObject = {
	name: "Logbone",
	description: "An awesome logging tool"
};

//Do some formatted logging
logger2.log("The name is %s, %s %s", "Bone", "Log", "Bone");
logger2.debug("Logbone has %i different log methods.", 5);
logger2.info("Format a floating point number like: %f", 12e5);
logger2.warn("How about an expandable DOM element? Like this one: %o", div);
logger2.error("Or an expandable javascript object.. %O", jsObject);
/*
    ----------------==>FORMAT SPECIFIERS<==-------------------------
	(broswer dependent - supported by latest builds of: Chrome)
%s - Formats the value as a string
%i or %d - Formats the value as an integer.
%f - Formats the value as a floating point value.
%o - Formats the value as an expandable DOM element. As seen in the Elements panel.
%O - Formats the value as an expandable JavaScript object.

[Found here: https://developer.chrome.com/devtools/docs/console]
*/

//Control log levels
//change the global log level
Logbone.setLevel(Logbone.level.error);

//now only error logs will output to the console
logger.log("Won't print because the global log level is 'ERROR'.");
logger2.log("Won't print because the global log level is 'ERROR'.");
logger3.log("Won't print because the global log level is 'ERROR'.");

logger.error('This outputs to the console!');
logger2.error('This one goes to the console too.');

//however, you can assign a log level override on a logger
logger3.setLevel(Logbone.level.log);

logger.log("Won't print because the global log level is 'ERROR'.");
logger2.log("Won't print because the global log level is 'ERROR'.");
logger3.log("Prints to the console because it has a log level override.");

/*
Loggers initialized without a log level argument listen to the global log
level. Initializing a logger with a log level, or setting a log level on
a logger will cause the logger to ignore the global log level and
use the supplied log level instead.
*/

/*
ASCII ART CREATED HERE:
http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
*/