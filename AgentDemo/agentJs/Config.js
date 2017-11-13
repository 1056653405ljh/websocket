/**
 * @include "./Log.js"
 * @include "./Agent.js"
 * @include "./Cti.js"
 * @include "./Phone.js"
 */

function Config() {
	this.checkbox_isLog1 = document.getElementById("islog1");
	this.checkbox_isLog2 = document.getElementById("islog2");
	this.checkbox_isMonitor = document.getElementById("isMonitor");
	this.text_AutoMakeCallInterval = document
			.getElementById("AutoMakeCallInterval");
	this.checkbox_isAutoMakeCall = document.getElementById("isAutoMakeCall");
	this.text_AutoAnswerCallInterval = document
			.getElementById("AutoAnswerCallInterval");
	this.checkbox_isAutoAnswerCall = document
			.getElementById("isAutoAnswerCall");
	this.text_AutoHangUpInterval = document
			.getElementById("AutoHangUpInterval");
	this.checkbox_isAutoHangUp = document.getElementById("isAutoHangUp");
	this.checkbox_isFilter = document.getElementById("isFilter");

	this.IsLog1 = false; // 本机日志开关
	this.IsLog2 = false; // 其它日志开关
	this.IsMonitor = false; // 座席监控开关
	this.ISFilter = false; //是否过滤重复消息
	this.autoExecuteFunction = "";
	this.autoExcuteInterval = 0;

	// 自动拨打
	this.IsAutoMakeCall = false;
	this.AutoMakeCallInterval = 0;

	// 自动接听
	this.IsAutoAnswerCall = false;
	this.AutoAnswerCallInterval = 0;

	// 接听后自动挂断
	this.IsAutoHangUp = false;
	this.AutoHangUpInterval = 0;


	// 设置是否打开本机日志
	this.setIsLog1 = function(checkbox) {
		if (checkbox.checked) {
			this.IsLog1 = true;
			logger1.log("打开本机日志。");
			logger1.logEnabled = true;
		} else {
			this.IsLog2 = false;
			logger1.log("关闭本机日志。");
			logger1.logEnabled = false;
		}
	};

	// 设置是否打开其它日志
	this.setIsLog2 = function(checkbox) {
		if (checkbox.checked) {
			this.IsLog2 = true;
			logger1.log("打开其它座席日志。");
			logger2.logEnabled = true;
		} else {
			this.IsLog2 = false;
			logger1.log("关闭其它座席日志。");
			logger2.logEnabled = false;
		}
	};

	// 设置是否打开监控
	this.setIsMonitor = function(checkbox) {
		if (checkbox.checked) {
			this.IsMonitor = true;
			logger1.log("打开座席监控功能。");
		} else {
			this.IsMonitor = false;
			logger1.log("关闭座席监控功能。");
		}
	};
	
	//设置是否打开重复消息过滤功能
	this.setIsFilter = function(checkbox){
		if(checkbox.checked){
			this.ISFilter = true;
			logger1.log("打开重复消息过滤功能。");
		}else{
			this.ISFilter = false;
			logger1.log("关闭重复消息过滤功能。");
		}
	};

	// 自动拨打
	this.setAutoMakeCall = function(checkbox) {
		this.AutoMakeCallInterval = this.text_AutoMakeCallInterval.value;
		if (checkbox.checked) {
			this.IsAutoMakeCall = true;
			logger1.log("打开自动拨打，间隔：" + this.AutoMakeCallInterval);
		} else {
			this.IsAutoMakeCall = false;
			logger1.log("关闭自动拨打");
		}
	};

	// 自动接听
	this.setAutoAnswerCall = function(checkbox) {
		this.AutoAnswerCallInterval = this.text_AutoAnswerCallInterval.value;
		if (checkbox.checked) {
			this.IsAutoAnswerCall = true;
			logger1.log("打开自动接听，间隔：" + this.AutoAnswerCallInterval);
		} else {
			this.IsAutoAnswerCall = false;
			logger1.log("关闭自动接听");
		}
	};

	// 自动挂机
	this.setAutoHangUp = function(checkbox) {
		this.AutoHangUpInterval = this.text_AutoHangUpInterval.value;
		if (checkbox.checked) {
			this.IsAutoHangUp = true;
			logger1.log("打开自动挂机，间隔：" + this.AutoHangUpInterval);
		} else {
			this.IsAutoHangUp = false;
			logger1.log("关闭自动挂机");
		}
	};

	this.autoExcute = function(status) {
		switch (status) {
			case 1 :
				if (this.IsAutoMakeCall) {
					var dest = phone.txtCallingNumber.value;
					this.AutoMakeCallInterval = this.text_AutoMakeCallInterval.value;
					if (dest != "") {
						setTimeout(function() {
							operateQueue.push("agent.makeCall('" + dest + "')");
						}, this.AutoMakeCallInterval * 1000);
					}
				}
				break;
			case 3 :

				break;
			case 4 :
				if (this.IsAutoAnswerCall
						&& phone.currentState == phone.STATE_INBOUND) {
					this.AutoAnswerCallInterval = this.text_AutoAnswerCallInterval.value;
					setTimeout(function() {
								operateQueue.push("agent.answerCall()");
							}, this.AutoAnswerCallInterval * 1000);
				} else if (this.IsAutoHangUp
						&& (phone.currentState == phone.STATE_ANSWERED
								|| phone.currentState == phone.STATE_INBOUND || phone.currentState == phone.STATE_OUTBOUNDING)) {
					this.AutoHangUpInterval = this.text_AutoHangUpInterval.value;
					setTimeout(function() {
								operateQueue.push("agent.hangUp()");
							}, this.AutoHangUpInterval * 1000);
				}
				break;
			default :
				break;
		}
	};
}

var config = new Config();

// 页面加载时，初始化配置
window.onload = function() {
	config.setAutoAnswerCall(config.checkbox_isAutoAnswerCall);
	config.setAutoHangUp(config.checkbox_isAutoHangUp);
	config.setAutoMakeCall(config.checkbox_isAutoMakeCall);
	config.setIsLog1(config.checkbox_isLog1);
	config.setIsLog2(config.checkbox_isLog2);
	config.setIsMonitor(config.checkbox_isMonitor);
	config.setIsFilter(config.checkbox_isFilter);
};