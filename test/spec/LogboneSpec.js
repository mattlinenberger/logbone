describe('Logbone', function () {

	var root = (typeof self == 'object' && self.self === self && self) ||
		(typeof global == 'object' && global.global === global && global);

	it('Should exist on the global namespace', function () {
		expect(root.Logbone).toBeDefined();
		expect(Logbone).toBeDefined();
	});

	it('Should be initialied with a default level if no preload configuration exists', function () {
		expect(root.logboneConfig).not.toBeDefined();
		expect(Logbone.getLevel()).toEqual(Logbone.defaults.level);
	});

	it('Should have the method: setLevel(..)', function () {
		expect(Logbone.setLevel).toBeDefined();
	});

	it('Should have the method: getLevel(..)', function () {
		expect(Logbone.getLevel).toBeDefined();
	});

	describe('Logbone.getLevel()', function () {
		it('Should return a value for log level', function () {
			expect(Logbone.getLevel()).toBeDefined();
		});
	});

	describe('Logbone.setLevel(..)', function () {
		it('Should change the log level when called with a valid level argument', function () {
			//level should have been set to debug
			Logbone.setLevel(Logbone.level.debug);
			expect(Logbone.getLevel()).toEqual(Logbone.level.debug);

			//now level should be set to debug
			Logbone.setLevel(Logbone.level.debug);
			expect(Logbone.level.debug).toEqual(Logbone.getLevel());
		});

		it('Should throw an error when called with an invalid level argument', function () {
			function incorrectLevel() {
				Logbone.setLevel('I_AM_NOT_A_VALID_LEVEL');
			}
			expect(incorrectLevel).toThrow();
		});

		function setLevelTest(level) {
			it('Should set the level to:[' + level + '], when setLevel(' + level + ') is called', function () {
				Logbone.setLevel(level);
				expect(Logbone.getLevel()).toEqual(level);
			});
		}

		setLevelTest(Logbone.level.log);
		setLevelTest(Logbone.level.debug);
		setLevelTest(Logbone.level.info);
		setLevelTest(Logbone.level.warn);
		setLevelTest(Logbone.level.error);
		setLevelTest(Logbone.level.silent);
	});

	describe('getLogger()', function () {
		it('Should return a Logger when calling getLoggger with the corect name', function () {
			var name = 'NamedLogger';
			var namedLogger = Logbone.getLogger(name);

			expect(name).toEqual(namedLogger.name);
		});

		it('Should return a Logger when calling getLogger with the correct name and prefix', function () {
			var name = 'NamedPrefixeddLogger';
			var prefix = 'TEST';

			var namedPrefixedLogger = Logbone.getLogger(name, prefix);

			expect(name).toEqual(namedPrefixedLogger.name);
			expect(prefix).toEqual(namedPrefixedLogger.prefix);
		});

		it('Should return a logger when calling getLogger with the correct name, prefix and level', function () {
			var name = 'myName';
			var prefix = 'PREFIX'
			var level = Logbone.level.info;

			var logger = Logbone.getLogger(name, prefix, level);

			expect(name).toEqual(logger.name);
			expect(prefix).toEqual(logger.prefix);
			expect(level).toEqual(logger.getLevel());
		});

		it('Should throw an error when calling without a name argument', function () {
			function callingWithoutName() {
				Logbone.getLogger();
			};

			expect(callingWithoutName).toThrow();
		});
	});
});

describe('Logger instance', function () {
	var name = 'LoggerTest';
	var prefix = 'LoggerTestPrefix';

	var logger = Logbone.getLogger(name, prefix);

	it('Should be initialized with the correct name value when calling Logbone.getLogger(..) with a valid name argument.', function () {
		expect(name).toEqual(logger.name);
	});

	it('Should be initialized with the correct prefix value calling  Logbone.getLogger(..) with a valid name and valid prefix argument.', function () {
		expect(prefix).toEqual(logger.prefix);
	});

	it('Should be initialized with global log level if Logbone.getLogger(..) is called without a level argument.', function () {
		expect(logger.getLevel()).toBeDefined();
		expect(Logbone.getLevel()).toEqual(logger.getLevel());
	});

	it('Should have the method: setLevel(..)', function () {
		expect(logger.getLevel).toBeDefined();
	});

	it('Should have the method: getLevel(..)', function () {
		expect(logger.getLevel).toBeDefined();
	});

	it('Should have the method: getLevelValue(..)', function () {
		expect(logger.getLevelValue).toBeDefined();
	});

	it('Should have the method: printLn(..)', function () {
		expect(logger.printLn).toBeDefined();
	});

	it('Should have the method: printArgs(..)', function () {
		expect(logger.printArgs).toBeDefined();
	});


	describe('Calling setLevel(..) on the logger with a valid level', function () {
		it('Should throw an error if called with an undefined log level argument.', function () {
			var logger = Logbone.getLogger('setLevel');

			function callingWithUndefinedValue() {
				logger.setLevel();
			}

			expect(callingWithUndefinedValue).toThrow();
		});

		it('Should set the Logger\'s level to the supplied valid value', function () {
			var logger = Logbone.getLogger('LevelChange');

			//expect the logger to be init with the global level
			expect(logger.getLevel()).toEqual(Logbone.getLevel());

			var level = Logbone.level.info;
			logger.setLevel(level);

			expect(level).toEqual(logger.getLevel());
		});

		it('Should cause the Logger to override the global log level rule using the supplied valid log level.', function () {
			var logger = Logbone.getLogger('LevelChange');

			//set the global level to silent
			Logbone.setLevel(Logbone.level.silent);
			spyOn(logger, 'printLn');

			//set the logger's levelt to info
			var level = Logbone.level.info;
			logger.setLevel(level);

			logger.info('This should override the global level and printLn should be called!');
			expect(level).toEqual(logger.getLevel());
			expect(logger.printLn).toHaveBeenCalled();
		});

	});
});

describe('Chainable setLevel method', function () {
	var logger = Logbone.getLogger('Chainable', 'setLevel');

	it('should return the instance of the logger', function () {
		expect(logger.setLevel(Logbone.level.debug)).toEqual(logger);
	});

});

describe('Chainable logging method', function () {
	var logger = Logbone.getLogger('ChainableLogger');

	it('should return the instance of the logger', function () {
		expect(logger.debug('debug called')).toEqual(logger);
	});

});

describe('When Logbone\'s global logging level is set to: ', function () {

	function shouldLog(setLevel, level, shouldLog) {
		var condition = shouldLog === false ? 'not' : '';

		it(setLevel + ': ' + Logbone.level[level] + ' should ' + condition + ' print logs to console', function () {
			var logger = Logbone.getLogger(level.toUpperCase() + '-TEST', 'TEST');
			Logbone.setLevel(setLevel);

			spyOn(logger, 'printLn');

			logger[level](level + ' logging');

			if (shouldLog === false) {
				expect(logger.printLn).not.toHaveBeenCalled();
			} else {
				expect(logger.printLn).toHaveBeenCalled();
			}
		});
	}

	var testLevel = Logbone.level.silent;
	shouldLog(testLevel, 'debug', false);
	shouldLog(testLevel, 'info', false);
	shouldLog(testLevel, 'warn', false);
	shouldLog(testLevel, 'error', false);

	testLevel = Logbone.level.error;
	shouldLog(testLevel, 'debug', false);
	shouldLog(testLevel, 'info', false);
	shouldLog(testLevel, 'warn', false);
	shouldLog(testLevel, 'error', true);

	testLevel = Logbone.level.warn;
	shouldLog(testLevel, 'debug', false);
	shouldLog(testLevel, 'info', false);
	shouldLog(testLevel, 'warn', true);
	shouldLog(testLevel, 'error', true);

	testLevel = Logbone.level.info;
	shouldLog(testLevel, 'debug', false);
	shouldLog(testLevel, 'info', true);
	shouldLog(testLevel, 'warn', true);
	shouldLog(testLevel, 'error', true);

	testLevel = Logbone.level.debug;
	shouldLog(testLevel, 'debug', true);
	shouldLog(testLevel, 'info', true);
	shouldLog(testLevel, 'warn', true);
	shouldLog(testLevel, 'error', true);

	var testLevel = Logbone.level.log;
	shouldLog(testLevel, 'log', true);
	shouldLog(testLevel, 'debug', true);
	shouldLog(testLevel, 'info', true);
	shouldLog(testLevel, 'warn', true);
	shouldLog(testLevel, 'error', true);
});