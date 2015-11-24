!function(){var e,l,n;void 0==window.Logbone&&(window.Logbone={},n=window.Logbone),n.internalName="Logbone",n.internalPrefix="SYSOUT",n.internalFormat="[%s][%s]: %s",n.level={debug:"DEBUG",info:"INFO",warn:"WARN",error:"ERROR",silent:"SILENT"},n.value={debug:4,info:3,warn:2,error:1,silent:0},n.defaults={level:n.level.debug,value:5},n.error={invalidLevel:n.internalName+": invalid logger command!",levelUndefined:"Log level argument undefined.",levelDoesNotExist:"Invalid log level!",invalidLoggerName:"Invalid Logger name argument! name undefined!"},void 0!==window.logboneConfig?(e=window.logboneConfig,l=e.sysout===!0,n.globalLogLevel=void 0!==e.logLevel?e.logLevel:n.defaults.level):n.globalLogLevel=n.level.debug,this.sysout=function(e){l&&console.log(n.internalFormat,n.internalPrefix,n.internalName,e)},this.sysout("Logbone created."),this.sysout("Log level initialized to: "+n.globalLogLevel),n.setLevel=function(e){if(e=e.trim().toUpperCase(),void 0==e||!this.levelExists(e))throw n.error.levelDoesNotExist;this.globalLogLevel=e},n.getLevel=function(){return this.globalLogLevel},n.levelExists=function(e){switch(e){case n.level.trace:case n.level.debug:case n.level.info:case n.level.warn:case n.level.error:case n.level.silent:return!0;default:return!1}};var t=function(e,l,t){if(void 0===e)throw n.error.invalidLoggerName;this.name=e,this.prefix=l,this.level=t,this.getLevel=function(){return void 0!==this.level?this.level:n.globalLogLevel},this.setLevel=function(e){if(void 0===e)throw n.error.levelUndefiend;if(e=e.trim().toUpperCase(),!n.levelExists(e))throw n.error.levelDoesNotExist+"["+e+"]";this.level=e},this.getLevelValue=function(){switch(this.getLevel()){case n.level.trace:return 5;case n.level.debug:return 4;case n.level.info:return 3;case n.level.warn:return 2;case n.level.error:return 1;case n.level.silent:return 0;default:return n.defaults.value}},this.printArgs=function(e,l,n){"string"==typeof n[0]&&(l+=n[0],n.shift()),0==n.length&&console[e](l),1==n.length&&console[e](l,n[0]),2==n.length&&console[e](l,n[0],n[1]),3==n.length&&console[e](l,n[0],n[1],n[2]),4==n.length&&console[e](l,n[0],n[1],n[2],n[3]),5==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4]),6==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4],n[5]),7==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4],n[5],n[6]),8==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7]),9==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8]),10==n.length&&console[e](l,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9])},this.printLn=function(e,l){if(void 0===e)throw n.error.invalidLevel;if(void 0!==l){var t="["+this.name+"]:";void 0!==this.prefix&&(t="["+this.prefix+"]"+t),t="["+n.level[e]+"]"+t;var o=e.toLowerCase();this.printArgs(o,t,l)}};var o=function(e,l){return function(){if(e.getLevelValue()>=n.value[l]){for(var t=new Array(arguments.length),o=0;o<arguments.length;o++)t[o]=arguments[o];e.printLn(l,t)}}};this.debug=o(this,"debug"),this.info=o(this,"info"),this.warn=o(this,"warn"),this.error=o(this,"error")};n.getLogger=function(e,l,n){return new t(e,l,n)}}();