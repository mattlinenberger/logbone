(function(){
	//constants
	var constants = {
		defaultLogLevel: 'TRACE'
	};
	
	//declare vars
	var Logbone;
	var config;
	var isLogging;
	var globalLogLevel;
	
	//create the Logbone object on the global namespace
	if(window.Logbone == undefined){
		window.Logbone = {};
		Logbone = window.Logbone;
	}
	
	//initialize preconfigs..	
	if(window.logboneConfig !== undefined){
		config = window.logboneConfig;
		isLogging = config.sysout === true;	
		
		globalLogLevel = 
			config.logLevel !== undefined ? 
			config.logLevel : constants.defaultLogLevel;
	}
	
	var Logger = function(name, prefix, level){
		console.log('%s %s %s', name, prefix, level);
	};
	
	Logbone.getLogger = function(name, prefix, level){
		var loggerLevel = level !== undefined ? level : globalLogLevel;
		return new Logger(name, prefix, loggerLevel);
	}
	
	
})();