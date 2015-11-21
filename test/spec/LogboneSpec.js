describe('Logbone', function(){
	
	it('Should exist on the global namespace', function(){
		expect(window.Logbone).toBeDefined();
		expect(Logbone).toBeDefined();
	});
	
	it('Should be initialied with a default level if no config exists', function () {
		expect(window.logboneConfig).not.toBeDefined();
		expect(Logbone.getLevel()).toEqual(Logbone.defaults.level);
	});

	it('Should return a Logger when calling getLoggger with a name', function (){
		var namedLogger = Logbone.getLogger('NamedLogger');
		expect(namedLogger).toBeDefined();
	});
	
	it('Should return a Logger when calling getLogger with a name and prefix', function () {
		 var namedPrefixedLogger = Logbone.getLogger('NamedPrefixeddLogger', 'TEST');
		 expect(namedPrefixedLogger).toBeDefined();
	});
	
	it('Should have a method for setting the log level', function () {
		expect(Logbone.setLevel).toBeDefined();
	});
	
	it('Should have a method for getting the log level', function () {
		expect(Logbone.getLevel).toBeDefined();
	});
	
	it('Should return a value for log level', function () {
		expect(Logbone.getLevel()).toBeDefined();
	});
	
	it('Should be able to change the log level', function () {
		expect(Logbone.getLevel()).toEqual(Logbone.level.trace);
		Logbone.setLevel('DEBUG');
		expect(Logbone.level.debug).toEqual(Logbone.getLevel());
	});
	
	describe('Should update value and level when setLevel is called', function () {
		
		function setLevelTest(level){
			it('Should set the level to:[' + level + '], when setLevel(' + level + ') is called', function (){
				Logbone.setLevel(level);
				expect(Logbone.getLevel()).toEqual(level);
			});
		}
		
		setLevelTest(Logbone.level.trace);
		setLevelTest(Logbone.level.debug);
		setLevelTest(Logbone.level.info);
		setLevelTest(Logbone.level.warn);
		setLevelTest(Logbone.level.error);
		setLevelTest(Logbone.level.silent);
		
		/*--reset the level after testing--*/
		Logbone.setLevel(Logbone.level.trace);
	});
	
});

var methodTest = function(method){
	var logger = Logbone.getLogger('Logger', 'TEST');
	var methodValue = Logbone.value[method];
	
	describe('Logger.' + method, function () {
		var name = "Logger";
		var prefix = "TEST";
		var level = method.trim().toUpperCase();
		
		var printFn = 'printArgs';
		
		var format = '[' + level + '][' + prefix + '][' + name + ']:';
		
		beforeEach(function () {
			spyOn(logger, printFn);
		});
		
		it('Should be defined', function () {
			expect(logger[method]).toBeDefined();
		});
		
		it('Should log to console.', function () {
			logger[method]('Mic check, 1, 2.');
			expect(logger[printFn]).toHaveBeenCalled();
		});
		
		it('Should be able to log 1 param', function () {
			var args = [
				'Hello, World!'
			];
			
			logger[method](args[0]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		
		it('Should be able to log 2 params', function () {
			var args = [
				'Hello, World!',
				1
			];
			
			logger[method](args[0], args[1]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 3 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				}
			];
			
			logger[method](args[0], args[1], args[2]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 4 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4"
			];
			
			logger[method](args[0], args[1], args[2], args[3]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 5 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5"
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 6 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5",
				6
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4], args[5]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 7 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5",
				6,
				{test: '123'}
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 8 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5",
				6,
				{test: '123'},
				'Eight'
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 9 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5",
				6,
				{test: '123'},
				'Eight',
				'nine'
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		it('Should be able to log 10 params', function () {
			var args = [
				'Hello, World!',
				1,
				{
					item: {
						value: "Logger"
					}
				},
				"Item no. 4",
				"Item no. 5",
				6,
				{test: '123'},
				'Eight',
				'nine',
				10
			];
			
			logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8] , args[9]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});		
	});
	
	//practical tests that hit the real printFn
		var args = [
		'Hello, World!',
		1,
		{
			item: {
				value: "Logger"
			}
		},
		"Item no. 4",
		"Item no. 5",
		6,
		{test: '123'},
		'Eight',
		'nine',
		10
	];
	
	//practical test
	logger[method](args[0]);
	logger[method](args[0], args[1]);
	logger[method](args[0], args[1], args[2]);
	logger[method](args[0], args[1], args[2], args[3]);
	logger[method](args[0], args[1], args[2], args[3], args[4]);
	logger[method](args[0], args[1], args[2], args[3], args[4], args[5]);
	logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
	logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
	logger[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8] , args[9]);
	
};

describe('Logger', function () {
	
	it('Should use the global log level if created without a log level param', function () {
		var logger = Logbone.getLogger('LoggerTest');
		
		expect(logger.getLevel()).toBeDefined();
		expect(Logbone.getLevel()).toEqual(logger.getLevel());
	});
	
	it('Should be able change log level', function () {
		var logger = Logbone.getLogger('LoggerTest');
		
		expect(logger.getLevel()).toBeDefined();
		expect(Logbone.getLevel()).toEqual(logger.getLevel());
		
		logger.setLevel('SILENT');
		expect(Logbone.level.silent).toEqual(logger.getLevel());
	});
	
	methodTest('trace');
	methodTest('debug');
	methodTest('info');
	methodTest('warn');
	methodTest('error');
});

// function levelTest(method, level){
// 	var logger = Logbone.getLogger('LEVEL-CHECK', 'TEST');
	
// 	console.log('Setting level: ' + level);
// 	Logbone.setLevel(level);
	
// 	beforeEach(function () {
// 		spyOn(logger, 'printLn');
// 	});
	
// 	it('Should be called', function () {
// 		logger[method]('Testing 1, 2.. Testing 1, 2..')
		
// 		var currLevel = Logbone.getLevel().toLowerCase();
// 		var currValue = Logbone.value[currLevel];
// 		console.log('Current level is: %s, value is: %s', currLevel, currValue);
		
// 		expect(logger.printLn).toHaveBeenCalled();
// 	});
		
// }

// describe('When the log level is TRACE', function () {
// 	levelTest('trace', Logbone.level.trace);
// });