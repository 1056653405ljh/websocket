/**
 * @include "./Log.js"
 * @include "./Phone.js"
 * @include "./Event.js"
 * @include "./Cti.js"
 */
function Agent() {
	this.State_Error = 0; // 座席状态异常
	this.State_READY = 1; // 准备接听
	this.State_NOTREADY = 3; // 离开状态，例如：离开，用餐等
	this.State_WORKING = 4; // 处理电话中
	this.State_NotLogin = 5; // 座席未登录
	this.State_READY_TEXT = "准备接听";
	this.State_WORKING_TEXT = "处理电话中";

	this.currentState = 0; // 坐席当前状态全局变量
	this.currentStateText = ""; // 坐席当前状态说明

	this.isConnected = false; // 是否连接
	this.isLogin = false; // 是否登录
	this.isEnforcedlogout = false; // 是否被强制注销
	this.isCallInFlag = true; // 当前通话是否是呼入电话，用于呼入电话和呼出电话被接听判断
	this.isFreeFlag = false; // 当前座席是否处于其它状态
	this.isListenFlag = false;	//是否是监听状态
	this.isIntrudeFlag = false;//设置为强插状态
	this.isConferenced = false;//会议、强插状态，设置该标志为true
	
	//座席状态初始化
	this.initialStatus = function(){
		this.isEnforcedlogout = false; // 是否被强制注销
		this.isCallInFlag = true; // 当前通话是否是呼入电话，用于呼入电话和呼出电话被接听判断
		this.isListenFlag = false;	//是否是监听状态
		this.isIntrudeFlag = false;//设置为强插状态
		this.isConferenced = false;//会议、强插状态，设置该标志为true
	};
	
	// 座席准备接听
	this.agentReady = function() {
		var flag;
		try {
			this.currentState = this.State_READY;
			flag = cti.ChangeAgentStatus(this.State_READY,
					this.State_READY_TEXT);
			return flag;
		} catch (e) {
			logger1.log("修改座席为准备状态时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 座席接听电话中
	this.agentBusy = function() {
		var flag;
		try {
			this.currentState = this.State_WORKING;
			flag = cti.ChangeAgentStatus(this.State_WORKING,
					this.State_WORKING_TEXT);
			return flag;
		} catch (e) {
			logger1.log("修改座席状态为接听电话时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 座席处于其它状态
	this.agentFree = function(status) {
		var flag;
		try {
			this.currentStateText = status;
			flag = cti.ChangeAgentStatus(this.State_NOTREADY, status);
			return flag;
		} catch (e) {
			logger1.log("修改座席为其它状态时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 修改座席当前状态
	this.changeStatus = function(status) {
		if (status == "准备接听") {
			this.isFreeFlag = false;
			if (!this.agentReady()) {
				alert("状态改变失败，请联系管理员！");
			}
		} else {
			this.isFreeFlag = true;
			if (!this.agentFree(status)) {
				alert("状态改变失败，请联系管理员！");
			}
		}
	};

	// 设置座席状态
	this.setAgentStatus = function(state) {
		if(state == this.State_READY && this.isFreeFlag == true){
			state = this.State_NOTREADY;
		}
		switch (state) {
			// 准备接听
			case this.State_READY :
				this.agentReady(state);
				break;
			// 离开状态，例如：离开，用餐等
			case this.State_NOTREADY :
				this.agentFree(this.currentStateText);
				break;
			// 处理电话中
			case this.State_WORKING :
				this.agentBusy();
				break;
			default :
				break;
		}
	};

	// 连接CTI服务器
	this.connect = function(ip1, port1, ip2, port2) {
		try {
			if (ip2.length != 0) {
				cti.Connect2(ip1, port1, ip2, port2);
			} else {
				cti1.Connect(ip1, port1);
			}
		} catch (e) {
			logger1.log("连接CTI服务器时发生异常，请检查网络及控件情况，异常信息：" + e.description);
		}
	};

	// 断开与CTI服务器的连接
	this.disconnect = function() {
		try {
			cti1.Disconnect();
		} catch (e) {
			logger1.log("断开连接时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 座席登录
	this.login = function(agentId, agentPwd, device) {
		var flag;
		try {
			flag = cti.Login(agentId, "", device, agentPwd);
			if (flag) {
				this.isLogin = true;
				phone.currentState = phone.STATE_INITIAL;
				//不应该在这个地方写，在登录成功事件激活后，修改到登录成功事件中
				// this.currentState = this.State_READY;
				this.setAgentStatus(this.State_READY);
			}
			return flag;
		} catch (e) {
			logger1.log("座席登录时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 座席登出
	this.logout = function() {
		var flag;
		this.isEnforcedlogout = false;
		phone.currentState = phone.STATE_NONE;
		this.currentState = this.State_NotLogin;
		this.isLogin = false;
		try {
			flag = cti.Logout();
			return true;
		} catch (e) {
			logger1.log("座席登出时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 拨打电话
	this.makeCall = function(destNum) {
		var flag;
		try {
			this.setAgentStatus(this.State_WORKING);
			flag = cti.MakeCall(destNum, "");
			return flag;
		} catch (e) {
			logger1.log("拨打电话时发生异常，异常信息：" + e.description);
			return false;
		}
	};

    //自动调用空闲的IVR来拨打电话
    //destNum  被叫号码
    //timeout  只要被叫未接听，就会一直呼叫被叫知道到达此时间
    //tipInfo  提示音文件名，需与上传到服务器上的文件名一致
	this.autoMakeCall = function(destNum, timeout, tipInfo) {
	    var flag;
	    try {
	        flag = cti.AutoMakeCall(destNum, timeout, tipInfo)
	        return flag;
	    } catch (e) {
	        logger1.log("自动拨打电话时发生异常，异常信息：" + e.description);
	        return false;
	    }
	}

	// 挂断电话
	this.hangUp = function() {
		try {
			return cti.HangUp();			
		} catch (e) {
			logger1.log("挂断电话时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 接听电话
	this.answerCall = function() {
		try {
			this.isCallInFlag = true;
			return cti.AnswerCall();			
		} catch (e) {
			logger1.log("接听电话时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 呼叫转移
	this.transferCall = function(destNum, appData) {
		var flag;
		try {
			phone.currentState = phone.STATE_TRANSFERING;
			phone.setPhoneState(phone.currentState);
			this.currentState = this.State_WORKING;
			this.isCallInFlag = false;
			flag = cti.TransferCall(destNum, appData);
			return flag;
		} catch (e) {
			logger1.log("呼叫转移时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 发起三方会话，destNum为目标号码，appData为随路业务数据
	this.conferenceCall = function(destNum, appData) {
		var flag;
		try {
			phone.currentState = phone.STATE_TRANSFERING;
			phone.setPhoneState(phone.currentState);
			this.currentState = this.State_WORKING;
			this.isCallInFlag = false;
			this.isConferenced = true;
			flag = cti.ConferenceCall(destNum, appData);
			return flag;
		} catch (e) {
			logger1.log("发起三方会话时发生异常，异常信息：" + e.description);
			return false;
		}
	};
	
	//评分
	this.grade = function(destNum, appData) {
		var flag;
		try {
			phone.currentState = phone.STATE_INITIAL;
			this.currentState = this.State_WORKING;
			this.isCallInFlag = false;
			flag = cti.TransferCall(destNum, appData);
			return flag;
		} catch (e) {
			logger1.log("呼叫转移时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 取消
	this.cancel = function() {
		var flag;
		try {
			phone.currentState = phone.STATE_ANSWERED;
			phone.setPhoneState(phone.currentState);
			this.currentState = this.State_WORKING;
			this.isCallInFlag = false; //用于三方取消时，answered事件的判断
			this.isConferenced = false;
			flag = cti.Cancel();
			return flag;
		} catch (e) {
			logger1.log("使用取消功能时发生异常，异常信息：" + e.description);
			return false;
		}
	};

	// 获取登录座席工号
	this.GetAgentID = function() {
		return cti.GetAgentID();
	};

	// 获得当前设备编号
	this.GetExtension = function() {
		return cti.GetDeviceID();
	};

	// 强制注销
	this.KickOut = function(agentID) {
		if (cti.KickOut(agentID)) {
			return true;
		} else {
			return false;
		}
	};

	// 监听
	this.Listen = function(destAgent) {
		var monitor = this.GetAgentID();
		//设置为监听状态
		this.isListenFlag = true;
		if (cti.ForemanExtend(1, monitor, destAgent, "")) {
			return true;
		} else {
			return false;
		}
	};

	// 强插
	this.Intrude = function(destAgent) {
		var monitor = this.GetAgentID();
		//设置为强插状态
		this.isIntrudeFlag = true;
		if (cti.ForemanExtend(2, monitor, destAgent, "")) {
			return true;
		} else {
			return false;
		}
	};

	// 强转
	this.Redirect = function(destAgent) {
		var monitor = this.GetAgentID();
		if (cti.ForemanExtend(3, monitor, destAgent, monitor)) {
			return true;
		} else {
			return false;
		}
	};
}

var agent = new Agent();