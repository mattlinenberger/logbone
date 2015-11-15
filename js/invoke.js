(function () {
	//constants
	var constant = {
		defaultLogLevel: 'TRACE',
		defaultLogValue: 5,
		trace: 'TRACE',
		debug: 'DEBUG',
		info: 'INFO',
		warn: 'WARN',
		error: 'ERROR',
		silent: 'SILENT'
	};
	
	//declare vars
	var Logbone;
	var config;
	var isLogging;
	var globalLogLevel;
	var internalName = "Logbone";
	var internalPrefix = "SYSOUT";
	var internalFormat = "[%s][%s]: %s";
	
	//errors
	var error = {
		invalidLevel: internalName + ": invalid logger command!"
	};
	
	//create the Logbone object on the global namespace
	if (window.Logbone == undefined) {
		window.Logbone = {};
		Logbone = window.Logbone;
	}
	
	//initialize preconfigs..	
	if (window.logboneConfig !== undefined) {
		config = window.logboneConfig;
		isLogging = config.sysout === true;

		globalLogLevel =
		config.logLevel !== undefined ?
			config.logLevel : constant.defaultLogLevel;
	}
	
	//create the internal logger: sysout
	this.sysout = function (msg) {
		if (isLogging) {
			console.log(internalFormat, internalPrefix, internalName, msg);
		}
	}
	
	//log the config and start-up
	this.sysout('Logbone created.');
	this.sysout('Log level initialized to: ' + globalLogLevel);


	/*====Logger====*/
	var Logger = function (name, prefix, level) {
		//construct
		this.name = name;
		this.prefix = prefix;
		this.level = level;

		this.getLevel = function () {
			return this.level;
		}

		this.getLevelValue = function () {
			switch (this.level) {
				case constant.trace:
					return 5;

				case constant.debug:
					return 4;

				case constant.info:
					return 3;

				case constant.warn:
					return 2;

				case constant.error:
					return 1;

				case constant.silent:
					return 0;

				default:
					return constant.defaultLogValue;
			}
		};

		this.printArgs = function (command, format, _args) {
			if (typeof _args[0] == 'string') {
				format = format + _args[0];
				_args.shift();
			}

			if (_args.length == 0) {
				console[command](format);
			}

			if (_args.length == 1) {
				console[command](format, _args[0]);
			}

			if (_args.length == 2) {
				console[command](format, _args[0], _args[1]);
			}
			
			if (_args.length == 2) {
				console[command](format, _args[0], _args[1]);
			}

		}

		this.printLn = function (level, _args) {
			if (level === undefined) {
				throw error.invalidLevel;
			}

			if (_args === undefined) {
				return;
			}

			var format = '[' + this.name + ']:';
			if (this.prefix !== undefined) {
				format = '[' + this.prefix + ']' + format;
			}
			
			format = '[' + level + ']'+ format;

			var command = level.toLowerCase();
			this.printArgs(command, format, _args);
		}

		var commandClosure = function (_this, threshold, command) {
			return function () {
				if (_this.getLevelValue() >= threshold) {
					var args = new Array(arguments.length);
					for (var i = 0; i < arguments.length; i++) {
						args[i] = arguments[i];
					}

					_this.printLn(command, args);
				}
			}
		};

		this.trace = commandClosure(this, 5, constant.trace);
		this.debug = commandClosure(this, 4, constant.debug);
		this.info = commandClosure(this, 3, constant.info);
		this.warn = commandClosure(this, 2, constant.warn);
		this.error = commandClosure(this, 1, constant.error);
	};

	Logbone.getLogger = function (name, prefix, level) {
		var loggerLevel = level !== undefined ? level : globalLogLevel;
		return new Logger(name, prefix, loggerLevel);
	}
	
})();

var logger = Logbone.getLogger('MyLogger');

//one arg
logger.debug('hi');
logger.debug({hello: 123})
logger.debug(123);

//two args
logger.debug('My name is %s', 'Scott');
logger.debug('This object %o is a real object', { a: 123 });
logger.debug('The number %i is just a number', 1);

logger.trace('Yep');
logger.trace('Yep', 'Scott');

logger.warn('Yikes');
logger.info('Who knew');
logger.error('Danger!');
