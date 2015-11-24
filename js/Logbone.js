(function () {
	//declare vars
	var config;
	var isLogging;
	var Logbone;
	
	//create the Logbone object on the global namespace
	if (window.Logbone == undefined) {
		window.Logbone = {};
		Logbone = window.Logbone;
	};
	
	Logbone.internalName = "Logbone";
	Logbone.internalPrefix = "SYSOUT";
	Logbone.internalFormat = "[%s][%s]: %s";
	
	Logbone.level = {
		debug: 'DEBUG',
		info: 'INFO',
		warn: 'WARN',
		error: 'ERROR',
		silent: 'SILENT'
	}
	
	Logbone.value = {
		debug: 4,
		info: 3,
		warn: 2,
		error: 1,
		silent: 0
	}
	
	//defaults
	Logbone.defaults = {
		level: Logbone.level.debug,
		value: 5,
	};
	

	
	//errors
	Logbone.error = {
		invalidLevel: Logbone.internalName + ": invalid logger command!",
		levelUndefined: "Log level argument undefined.",
		levelDoesNotExist: 'Invalid log level!',
		invalidLoggerName: 'Invalid Logger name argument! name undefined!'
	};
	
	//initialize preconfigs..	
	if (window.logboneConfig !== undefined) {
		config = window.logboneConfig;
		isLogging = config.sysout === true;

		Logbone.globalLogLevel =
		config.logLevel !== undefined ?
			config.logLevel : Logbone.defaults.level;
	}else{
		//if no preconfigs are defined, load defaults
		Logbone.globalLogLevel = Logbone.level.debug;
	}
	
	//create the internal logger: sysout
	this.sysout = function (msg) {
		if (isLogging) {
			console.log(Logbone.internalFormat, Logbone.internalPrefix, Logbone.internalName, msg);
		}
	}
	
	//log the config and start-up
	this.sysout('Logbone created.');
	this.sysout('Log level initialized to: ' + Logbone.globalLogLevel);
	
	Logbone.setLevel = function(level){
		//trim leading/folllwing spaces, to uppercase
		level = level.trim().toUpperCase();
		
		if(level == undefined || !this.levelExists(level)){
			throw Logbone.error.levelDoesNotExist;
		}
		
		this.globalLogLevel = level;
	};
	
	Logbone.getLevel = function(){
		return this.globalLogLevel;
	};
	
	Logbone.levelExists = function(level){
		switch(level){
			case Logbone.level.trace:
			case Logbone.level.debug:
			case Logbone.level.info:
			case Logbone.level.warn:
			case Logbone.level.error:
			case Logbone.level.silent:
				return true;
			default: 
				return false;
		}
	};

	/*====Logger====*/
	var Logger = function (name, prefix, level) {
		if(name === undefined){
			throw Logbone.error.invalidLoggerName;
		}
		
		//construct
		this.name = name;
		this.prefix = prefix;
		this.level = level;

		this.getLevel = function () {
			/*--if the logger has defined its own level--*/
			if(this.level !== undefined){
				return this.level;
			}
			
			/*--otherwise, return the global level--*/
			return Logbone.globalLogLevel;
		}
		
		this.setLevel = function(level){
			if(level === undefined){
				throw Logbone.error.levelUndefiend;
			}
			
			//trim leading/folllwing spaces, to uppercase
			level = level.trim().toUpperCase();
			
			if(!Logbone.levelExists(level)){
				throw Logbone.error.levelDoesNotExist + "[" + level + "]";
			}
			
			this.level = level;
		};

		this.getLevelValue = function () {
			switch (this.getLevel()) {
				case Logbone.level.trace:
					return 5;

				case Logbone.level.debug:
					return 4;

				case Logbone.level.info:
					return 3;

				case Logbone.level.warn:
					return 2;

				case Logbone.level.error:
					return 1;

				case Logbone.level.silent:
					return 0;

				default:
					return Logbone.defaults.value;
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
				throw Logbone.error.invalidLevel;
			}

			if (_args === undefined) {
				return;
			}

			var format = '[' + this.name + ']:';
			if (this.prefix !== undefined) {
				format = '[' + this.prefix + ']' + format;
			}
			
			format = '[' + Logbone.level[level] + ']'+ format;

			var command = level.toLowerCase();
			this.printArgs(command, format, _args);
		}

		/**-command closure for buiding the logging methods--*/
		var commandClosure = function (_this, command) {
			return function () {
				if (_this.getLevelValue() >= Logbone.value[command]) {
					var args = new Array(arguments.length);
					for (var i = 0; i < arguments.length; i++) {
						args[i] = arguments[i];
					}

					_this.printLn(command, args);
				}
			}
		};

		/*--build logger methods from commandClosure--*/
		this.debug = commandClosure(this, 'debug');
		this.info = commandClosure(this, 'info');
		this.warn = commandClosure(this, 'warn');
		this.error = commandClosure(this, 'error');
	};

	Logbone.getLogger = function (name, prefix, level) {
		return new Logger(name, prefix, level);
	}
	
})();