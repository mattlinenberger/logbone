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



/*
ASCII ART CREATED HERE:
http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
*/