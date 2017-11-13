/**
 * @include "./Log.js"
 * @include "./Agent.js"
 * @include "./Event.js"
 * @include "./Cti.js"
 */
function Phone() {
	this.btConnect = document.getElementById("btConnect");//连接按钮
	this.btDisconnect = document.getElementById("btDisconnect");//断连按钮
	this.txtAgentName = document.getElementById("agentName");	//座席名输入文本框
	this.txtAgentPassword = document.getElementById("agentPassword"); //座席密码输入文本框
	this.btLogin = document.getElementById("btLogin"); // 登录
	this.btLogout = document.getElementById("btLogout"); // 登出
	this.btMakeCall = document.getElementById("btMakeCall"); // 外呼
	this.btAnswerCall = document.getElementById("btAnswerCall"); // 接听
	this.btTransferCall = document.getElementById("btTransferCall"); // 发起转移
	this.btConferenceCall = document.getElementById("btConferenceCall"); // 发起三方
	this.btCancelCall = document.getElementById("btCancelCall"); // 取消转移或三方
	this.btHangupCall = document.getElementById("btHangupCall"); // 挂断
	this.btBlackNumber = document.getElementById("btBlackNumber"); // 黑名单按钮
	this.selectPhoneNumber = document.getElementById("selectPhoneNumber"); // 话机选择框
	this.selectAgentStatus = document.getElementById("selectAgentStatus"); // 座席状态选择框
	this.txtCallingNumber = document.getElementById("txtCallingNumber"); // 来电号码显示
	this.queueCount = document.getElementById("queueCount"); // 队列电话数量
	this.talkDuration = document.getElementById("talkDuration"); // 通话时长
	this.busyAgentTotal = document.getElementById("busyAgentTotal"); // 显示已登陆座席和忙状态的座席
	
	// 软电话状态
	this.STATE_NONE = 0; // 未连接CTI服务器
	this.STATE_NOTLOGIN = 1; //未登陆
	this.STATE_INITIAL = 2; // 初始状态
	this.STATE_INBOUND = 3; // 有呼入电话
	this.STATE_ANSWERED = 4; // 接听了电话
	this.STATE_CONNECTED = 5; // 已经接通电话
	this.STATE_TRANSFERING = 6; // 发起电话转移中
	this.STATE_CONFERENCING = 7; // 三方通话中
	this.STATE_OUTBOUNDING = 8; // 外呼电话中
	this.STATE_MONITOR = 9;		//监听状态

	this.currentState = this.STATE_NONE; // 软电话状态全局变量，用于暂存话机状态
	
	//连接按钮样式控制
	this.Connect_buttonStyle = function(flag){
		if(this.btConnect != null){
			this.btConnect.disabled = !flag;
		} 
	};
	
	//断连按钮样式控制
	this.Disconnect_buttonStyle = function(flag){
		if(this.btDisconnect != null){
			this.btDisconnect.disabled = !flag;
		} 
	};
	
	this.AgentName_Style = function(flag){
		if(this.txtAgentName != null){
			this.txtAgentName.disabled = !flag;
		}
	};

	//座席密码输入框样式控制
	this.AgentPassword_Style = function(flag){
		if(this.txtAgentPassword != null){
			this.txtAgentPassword.disabled = !flag;
		}
	};
	
	// 登陆按钮样式设置
	this.Login_buttonStyle = function(flag) {
		if (this.btLogin != null) {
			this.btLogin.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btLogin.className = "btLogin_useable";
			} else {
				// 按钮不可用样式
				this.btLogin.className = "btLogin_unuseable";
			}
		}
	};

	// 登出按钮样式
	this.Logout_buttonStyle = function(flag) {
		if (this.btLogout != null) {
			this.btLogout.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btLogout.className = "btLogout_useable";
			} else {
				// 按钮不可用样式
				this.btLogout.className = "btLogout_unuseable";
			}
		}
	};

	// 拨打按钮样式设置
	this.MakeCall_buttonStyle = function(flag) {
		if (this.btMakeCall != null) {
			this.btMakeCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btMakeCall.className = "btMakeCall_useable";
			} else {
				// 按钮不可用样式
				this.btMakeCall.className = "btMakeCall_unuseable";
			}
		}
	};

	// 接听按钮样式设置
	this.AnswerCall_buttonStyle = function(flag) {
		if (this.btAnswerCall != null) {
			this.btAnswerCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btAnswerCall.className = "btAnswerCall_useable";
			} else {
				// 按钮不可用样式
				this.btAnswerCall.className = "btAnswerCall_unuseable";
			}
		}
	};

	// 转移按钮样式设置
	this.TransferCall_buttonStyle = function(flag) {
		if (this.btTransferCall != null) {
			this.btTransferCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btTransferCall.className = "btTransferCall_useable";
			} else {
				// 按钮不可用样式
				this.btTransferCall.className = "btTransferCall_unuseable";
			}
		}
	};

	// 三方
	this.ConferenceCall_buttonStyle = function(flag) {
		if (this.btConferenceCall != null) {
			this.btConferenceCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btConferenceCall.className = "btConferenceCall_useable";
			} else {
				// 按钮不可用样式
				this.btConferenceCall.className = "btConferenceCall_unuseable";
			}
		}
	};

	// 取消转移或三方
	this.Cancel_buttonStyle = function(flag) {
		if (this.btCancelCall != null) {
			this.btCancelCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btCancelCall.className = "btCancelCall_useable";
			} else {
				// 按钮不可用样式
				this.btCancelCall.className = "btCancelCall_unuseable";
			}
		}
	};

	// 挂断
	this.HangUp_buttonStyle = function(flag) {
		if (this.btHangupCall != null) {
			this.btHangupCall.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btHangupCall.className = "btHangupCall_useable";
			} else {
				// 按钮不可用样式
				this.btHangupCall.className = "btHangupCall_unuseable";
			}
		}
	};

	// 黑名单样式设置
	this.BlackNumber_buttonStyle = function(flag) {
		if (this.btBlackNumber != null) {
			this.btBlackNumber.disabled = !flag;
			if (flag) {
				// 按钮可用样式
				this.btBlackNumber.className = "btBlackNumber_useable";
			} else {
				// 按钮不可用样式
				this.btBlackNumber.className = "btBlackNumber_unuseable";
			}
		}
	};

	// 话机选择框
	this.PhoneNumber_Style = function(flag) {
		if (this.selectPhoneNumber != null) {
			this.selectPhoneNumber.disabled = !flag;
		}
	};

	// 状态选择框
	this.AgentStatus_Style = function(flag) {
		if (this.selectAgentStatus != null) {
			this.selectAgentStatus.disabled = !flag;
		}
	};
	
	// 设置软电话状态
	this.setPhoneState = function(state) {
		switch (state) {
			// 未连接
			case this.STATE_NONE :
				this.Connect_buttonStyle(true);
				this.Disconnect_buttonStyle(false);
				
				this.AgentName_Style(false);
				this.AgentPassword_Style(false);
				this.Login_buttonStyle(false);
				this.Logout_buttonStyle(false);
				this.BlackNumber_buttonStyle(false);
				this.PhoneNumber_Style(false);
				this.AgentStatus_Style(false);

				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			// 未登陆
			case this.STATE_NOTLOGIN :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
				
				this.AgentName_Style(true);
				this.AgentPassword_Style(true);
				this.Login_buttonStyle(true);
				this.Logout_buttonStyle(false);
				this.BlackNumber_buttonStyle(false);
				this.PhoneNumber_Style(true);
				this.AgentStatus_Style(false);

				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			// 状态初始化
			case this.STATE_INITIAL :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
				
				this.AgentName_Style(false);
				this.AgentPassword_Style(false);
				this.Login_buttonStyle(false);
				this.Logout_buttonStyle(true);
				this.BlackNumber_buttonStyle(true);
				this.PhoneNumber_Style(false);
				this.AgentStatus_Style(true);

				this.MakeCall_buttonStyle(true);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			// 有电话呼入
			case this.STATE_INBOUND :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(true);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			// 接听电话
			case this.STATE_ANSWERED :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(true);
				this.HangUp_buttonStyle(true);
				this.ConferenceCall_buttonStyle(true);
				this.Cancel_buttonStyle(false);
				break;
			// 拨打电话
			case this.STATE_OUTBOUNDING :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(true);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			// 发起呼叫转移或三方通话
			case this.STATE_TRANSFERING :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(true);
				break;
			// 三方通话中
			case this.STATE_CONFERENCING :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(true);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			//监听状态
			case this.STATE_MONITOR:
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
			
				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(true);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
			default :
				this.Connect_buttonStyle(false);
				this.Disconnect_buttonStyle(true);
				
				this.Login_buttonStyle(true);
				this.Logout_buttonStyle(false);
				this.BlackNumber_buttonStyle(false);
				this.PhoneNumber_Style(true);
				this.AgentStatus_Style(false);

				this.MakeCall_buttonStyle(false);
				this.AnswerCall_buttonStyle(false);
				this.TransferCall_buttonStyle(false);
				this.HangUp_buttonStyle(false);
				this.ConferenceCall_buttonStyle(false);
				this.Cancel_buttonStyle(false);
				break;
		}
	};
	
	this.keyDown = function(){
		switch(window.event.keyCode){
			case 27:	//ESC键
			break;
			case 32:	//空格键
				if(this.currentState == this.STATE_INBOUND){
					agent.answerCall();
				}else if(this.currentState == this.STATE_ANSWERED){
					agent.hangUp();
				}
			break;
			case 13:	//输入键
				if(this.txtCallingNumber.value != null){
					agent.makeCall(this.txtCallingNumber.value);
				}
			break;
			default:
			break;
		}
	};
}

var phone = new Phone();
phone.setPhoneState(phone.STATE_NONE);