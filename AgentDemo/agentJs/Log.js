/*
 * Log：日志类 实现日志缓存 实现日志自动清空 实现日志开关功能
 */
// alert("日志连接成功");
function Log(name) {
	var logger = document.getElementById(name); // 文本框对象
	var logCash = []; // 日志1缓存
	var lineNumber = 0;

	this.timer = null;
	this.interval = 100; // 日志显示扫描间隔
	this.logSize = 500; // 日志默认最大行数为500
	this.logEnabled = false; // 日志开关变量

	// 将日志写入文本域1
	this.display = function() {
		if (logger != null) {
			while (this.logEnabled && logCash && logCash.length
					&& logCash[0]) {
				if (lineNumber >= this.logSize) {
					logger.value = "";
					lineNumber = 0;
				}				
				lineNumber = lineNumber + 1;				
				logger.value = lineNumber + "\t" + logCash[0].toString()  + "\n" + logger.value;
				logCash.shift();
			}
		}
	};

	// 将日志写入日志缓存1
	this.log = function(content) {
		if (this.logEnabled) {
			var str = new String(content);
			logCash.push(str);
		}
	};

	// 停止日志显示
	this.stop = function() {
		window.clearInterval(this.timer);
		this.timer = null;
	};
}

var logger1 = new Log("log1");
var logger2 = new Log("log2");
logger1.timer = window.setInterval(function() {
			logger1.display();
		}, logger1.interval);

logger2.timer = window.setInterval(function() {
			logger2.display();
		}, logger2.interval);