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
		invalidLevel: internalName + ": invalid logger command!",
		levelDoesNotExist: 'Invalid log level!'
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
	
	this.setLevel = function(level){
		//trim leading/folllwing spaces, to uppercase
		level = level.trim().toUpperCase();
		
		if(level == undefined || !this.levelExists(level)){
			throw error.levelDoesNotExist;
		}
		
		this.globalLogLevel = level;
	};
	
	this.levelExists = function(level){
		switch(level){
			case constant.trace:
			case constant.debug:
			case constant.info:
			case constant.warn:
			case constant.error:
			case constant.silent:
				return true;
			default: 
				return false;
		}
	};

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
			
			if (_args.length == 3) {
				console[command](format, _args[0], _args[1], _args[2]);
			}
			
			if (_args.length == 4) {
				console[command](format, _args[0], _args[1], _args[2], _args[3]);
			}
			
			if (_args.length == 5) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4]);
			}
			
			if (_args.length == 6) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4], _args[5]);
			}

			if (_args.length == 7) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4], _args[5], _args[6]);
			}
			
			if (_args.length == 8) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4], _args[5], _args[6], _args[7]);
			}
			
			if (_args.length == 9) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4], _args[5], _args[6], _args[7], _args[8]);
			}
			
			if (_args.length == 10) {
				console[command](format, _args[0], _args[1], _args[2], _args[3], _args[4], _args[5], _args[6], _args[7], _args[8], _args[9]);
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

		/**-command closure for buiding the logging methods--*/
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

		/*--build logger methods from commandClosure--*/
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