/*
|--------------------WELCOME TO-------------------|
|	 __    _____ _____ _____ _____ _____ _____    |
|	|  |  |     |   __| __  |     |   | |   __|   | 
|	|  |__|  |  |  |  | __ -|  |  | | | |   __|   |
|	|_____|_____|_____|_____|_____|_|___|_____|   |  
|-------------------------------------------------|
				LET'S GET STARTED!
*/
//Get a logger - make sure you give it a name!
var logger = Logbone.getLogger('Tutorial');

//Now we can debug, info, warn and error log
logger.debug('Just debugging some code...');
logger.info('Did you know the stapes is the smallest bone in the human body?');
logger.warn('Coffee levels dangerously low, refill at once!');
logger.error('THE CAKE IS A LIE!');
//yeah, like there weren't going to be Portal references..

//up to 10 arguments
logger.debug('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
logger.debug(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

//arguments with different types..
logger.debug('String', {what: 'object'}, 1);

//formatters..
logger.info('The %s goes %s', 'cow', 'moooooo');
logger.info('There are %i days in the week', 7);

var someObject = {
	value1: 'silver',
	value2: 'gold',
	value3: 'lead'
};

logger.warn('%o is an object!', someObject);

//How about a logger with a fancy prefix?
//common prefixes: DEV, PROD, STAGE, TEST, etc..
var prefixLogger = Logbone.getLogger('LoggerWithPrefix', 'PREFIX-VALUE');

prefixLogger.debug("See this Logger's output has a prefix.");

/*
Changing the global log level:

just call .setLevel(..) on the Logbone object with one
of the predefined logging levels

Levels:
--------------------------------------------------
Logbone.level.debug
Logbone.level.info
Logbone.level.warn
Logbone.level.error
*/

//changing the global loging level to 'INFO'
Logbone.setLevel(Logbone.level.info);

logger.debug("this doesn't display in the console!");
logger.info("but this does!");
logger.warn("What shows up in the console is all about log levels..");

//change the global level back to 'DEBUG' -- which is the default
Logbone.setLevel(Logbone.level.debug);

logger.debug('Hey! Now I show up in the console!');

/*
If you create a logger without giving it a logging level
argument, the logger will use Logbone's global log level.

BUT, if you want, you can set the log level on a per logger basis
by passing a log level argument to getLogger(..) or setting
a log level on a logger instance.

**Note** Setting a level on a logger instance instead of Logbone means
that logger instance will only listen to its own log level, not Logbone's
global logging level.
*/

var customLevelLogger = Logbone.getLogger('CustomLevel', 'Prefix Value', Logbone.level.warn);

//so, if we set Logbone's global level to 'SILENT'...
Logbone.setLevel(Logbone.level.silent);

logger.warn("Won't go to the console...");
logger.error("Still won't go to the console..");
prefixLogger.debug("I can't print to the console either!");

customLevelLogger.error("Everyone has to be silent..");
customLevelLogger.warn("I CAN LOG! I HAVE MY OWN LOG LEVEL!");

/*
MORE INFO:


GETTING STARTED WITH LOGBONE
1. Download Logbone
--------------------------------------------------
**Download Logbone from Github**

				-->OR<--

**Install Logbone using Bower**
bower install logbone --save-dev
--------------------------------------------------

2. Add Logbone to your HTML
--------------------------------------------------
Just add a script tag to your HTML
<script type='text/javascript' src='Logbone.js'></script>

**NOTE:** Make sure you add Logbone BEFORE any 
scripts that are going to log.
--------------------------------------------------

3. Pre-configure Logbone [-OPTIONAL-]
--------------------------------------------------
In the <head> tag of your HTML, you can add a 
script tag that can be used to initialize Logbone
with a log level as well as turn on internal log
output (if you want to see that kind of thing).

You can just as easily configure Logbone in your
javascript, this just puts the global logging 
level in a conventient place, making it easy to 
toggle your log level without digging through code.

see the <head> tag in logbone.html for an example
of the preconfiguration variables.
*/


/*
ASCII ART CREATED HERE:
http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
*/