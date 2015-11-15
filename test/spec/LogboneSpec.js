describe('Logbone', function(){
	
	it('Should exist on the global namespace', function(){
		expect(window.Logbone).toBeDefined();
		expect(Logbone).toBeDefined();
	});
	
	it('Should be initialied with a default level if no config exists', function () {
		expect(window.logboneConfig).not.toBeDefined();
		expect(Logbone.getLevel()).toEqual(Logbone.constant.defaultLogLevel);
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
		expect(Logbone.getLevel()).toEqual(Logbone.constant.trace);
		Logbone.setLevel('DEBUG');
		expect(Logbone.constant.debug).toEqual(Logbone.getLevel());
	});
	
});

var methodTest = function(method){
	var logger = Logbone.getLogger('Logger', 'TEST');
	
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
		expect(Logbone.constant.silent).toEqual(logger.getLevel());
	});
	
	methodTest('trace');
	methodTest('debug');
	methodTest('info');
	methodTest('warn');
	methodTest('error');
});
