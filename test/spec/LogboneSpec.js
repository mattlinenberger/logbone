describe('Logbone', function(){
	
	it('Should exist on the global namespace', function(){
		expect(window.Logbone).toBeDefined();
		expect(Logbone).toBeDefined();
	});
	
	it('Should return a Logger when calling getLoggger with a name', function (){
		var namedLogger = Logbone.getLogger('NamedLogger');
		expect(namedLogger).toBeDefined();
	});
	
	it('Should return a Logger when calling getLogger with a name and prefix', function () {
		 var namedPrefixedLogger = Logbone.getLogger('NamedPrefixeddLogger', 'TEST');
		 expect(namedPrefixedLogger).toBeDefined();
	});
	
});

var methodTestClosure = function(method){
	
	describe('Logger.' + method, function () {
		var name = "Logger";
		var prefix = "TEST";
		var level = method.trim().toUpperCase();
		
		var printFn = 'printArgs';
		
		var logger = Logbone.getLogger('Logger', 'TEST');
		var format = '[' + level + '][' + prefix + '][' + name + ']:';
		
		beforeEach(function () {
			spyOn(logger, printFn);
		});
		
		it('Should be defined', function () {
			expect(logger[method]).toBeDefined();
		});
		
		it('Should be able to log a single param', function () {
			var args = [
				'Hello, World!'
			];
			
			logger[method](args[0]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
		
		
		it('Should be able to log two params', function () {
			var args = [
				'Hello, World!',
				1
			];
			
			logger[method](args[0], args[1]);
			expect(logger[printFn]).toHaveBeenCalledWith(method, format, args);
		});
	});
};

methodTestClosure('debug');

// describe('Logger.trace', function () {
// 	var logger = Logbone.getLogger('Logger', 'TEST');
	
// 	it('Should be defined', function () {
// 		expect(logger.trace).toBeDefined();
// 	});
	
// 	it('Should be able to trace ', function () {
		
// 	});
	
// });