/**
 * @include "../agentJs/Agent.js";
 * @include "../agentJs/Event.js";
 * @include "../agentJs/Log.js";
 * @include "../agentJs/Monitor.js";
 * @include "../agentJs/Call.js";
 * @include "../agentJs/Config.js";
 */
var currentCall = null;
var stateFlag = "";
var operateQueue = new Array();// 函数执行缓存
window.setInterval(function() {
			while (operateQueue && operateQueue.length && operateQueue[0]) {
				logger2.log(operateQueue[0]);
				eval(operateQueue[0]);
				operateQueue.shift();
			}
		}, 10);

// 事件注册
// 当前座席状态更改1
function AgentStatusCNGed(status) {
	logger1.log("[AgentStatusCNGed]：话机状态" + status);
	phone.setPhoneState(phone.currentState);
	eAgentStatusCNGed(status);
}
// cti.attachEvent("AgentStatusCNGed", AgentStatusCNGed);

// 电话呼入事件1
function InboundCall(currentCallingParty, currentCalledParty,
		originalCallingParty, originalCalledParty, applicationData, callType,
		enumCallID) {
	if(currentCall == null){
		currentCall = new Call();
	}
	if(currentCall.InboundCallFlag == true){
		logger1.log("重复消息：InboundCall");
		return;
	}else{
		currentCall.InboundCallFlag = true;
	}
	
	stateFlag = "InboundCall";
	phone.currentState = phone.STATE_INBOUND;
	agent.currentState = agent.State_WORKING;	
	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);
	
	phone.txtCallingNumber.value = originalCallingParty;
	eInboundCall(currentCallingParty, currentCalledParty, originalCallingParty,
			originalCalledParty, applicationData, callType, enumCallID);
}

// 电话接听事件1
function Answered(notused, enumCallID, pickupTime) {
	if(currentCall == null || currentCall.AnsweredFlag == true){
		logger1.log("重复消息：Answered");
		return;	
	}else{
		currentCall.AnsweredFlag = true;
	}
	
	stateFlag = "Answered";
	if (agent.isConferenced) {
		phone.currentState = phone.STATE_CONFERENCING;
	} else if(agent.isListenFlag || agent.isIntrudeFlag){
		phone.currentState = phone.STATE_MONITOR;
	}else{
		phone.currentState = phone.STATE_ANSWERED;
	}
	agent.currentState = agent.State_WORKING;
	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);

	if (agent.isCallInFlag) {
		eCallInAnswered(enumCallID, pickupTime);
	} else {
		eCallOutAnswered(enumCallID, pickupTime);
	}
}

// 当前通话被挂断1
function CallIdle() {
	if(currentCall == null || currentCall.CallIdleFlag == true){
		logger1.log("重复消息：CallIdle");
		return;
	}else if(currentCall.ConferencedFlag == true){
		currentCall.ConferencedFlag = false;
		phone.currentState = phone.STATE_ANSWERED;
		agent.currentState = agent.State_WORKING;
	}else{
		currentCall = null;
		phone.currentState = phone.STATE_INITIAL;
		agent.currentState = agent.State_READY;
	}
	
	stateFlag = "CallIdle";
//	agent.isConferenced = false;
//	agent.isCallInFlag = true;
	agent.initialStatus();
	operateQueue.push("agent.setAgentStatus(" + agent.State_READY + ")");
	phone.setPhoneState(phone.currentState);
	eCallIdle();
}

// 成功登录，是否班长席(无响应)
function LoggedIn(isMonitor) {
	stateFlag = "LoggedIn";
	phone.currentState = phone.STATE_INITIAL;
	agent.currentState = agent.State_READY;
	operateQueue.push("agent.setAgentStatus(" + agent.State_READY + ")");
	phone.setPhoneState(phone.currentState);
	eLoggedIn(isMonitor);
}

// 登出消息
function LoggedOut() {
    stateFlag = "LoggedOut";
    phone.currentState = phone.STATE_NOTLOGIN;
    phone.setPhoneState(phone.STATE_NOTLOGIN);
    operateQueue.push("agent.setAgentStatus(" + agent.State_NotLogin + ")");
    phone.setPhoneState(phone.currentState);
    if (agent.isLogin) {
        agent.isLogin = false;
        eForceLoggedOut();
    } else {
eLoggedOut();
    }
}

// 电话呼转事件(无响应)1
function Transfered() {
	if(currentCall == null || currentCall.ConferencedFlag == true){
		logger1.log("重复消息：Transfered");
		return;
	}else{
		currentCall.ConferencedFlag == true;
	}
	
	stateFlag = "Transfered";
	phone.currentState = phone.STATE_TRANSFERING;
	agent.currentState = agent.State_WORKING;

	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);
	eTransfered();
}

// 三方对话中1
function Conferenced() {
	stateFlag = "Conferenced";
	phone.currentState = phone.STATE_CONFERENCING;
	agent.currentState = agent.State_WORKING;
	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);
	eConferenced();
}

// 摘机事件(无响应)1
function DialTone() {
	stateFlag = "DialTone";
	phone.currentState = phone.STATE_OUTBOUNDING;
	agent.currentState = agent.State_WORKING;
	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);
	eDialTone();
}

// 外呼，对方振铃
function RingBack(currentCallingParty, currentCalledParty, enumCallID,
		startTime) {
	if(currentCall == null){
	   	currentCall = new Call();
	}	
	if(currentCall.RingBackFlag == true){
		logger1.log("重复消息：RingBack");
	   	return;
	}else{
		currentCall.RingBackFlag = true;
	}
			
	stateFlag = "RingBack";
	agent.isCallInFlag = false;
	phone.currentState = phone.STATE_OUTBOUNDING;
	agent.currentState = agent.State_WORKING;
	operateQueue.push("agent.setAgentStatus(" + agent.State_WORKING + ")");
	phone.setPhoneState(phone.currentState);

	eRingBack(currentCallingParty, currentCalledParty, enumCallID, startTime);
}

// 外呼，对方忙(没测试)1
function DestBusy() {
	stateFlag = "DestBusy";
	eDestBusy();
}

// 当前话机状态11
function DeviceStatus(extension, isIdle) {
	eDeviceStatus(extension, isIdle);
}

// 座席间有信息1
function TextMessage(agentID, address, message) {
	eTextMessage(agentID, address, message);
}

// 队列长度有变化1
function AgentStatistics(name, value) {
	if (phone.queueCount != null) {
		phone.queueCount.innerText = value;
	}
	eAgentStatistics(name, value);
}

// 与CTI的连接断开1
function ConnectionBroken() {
	phone.currentState = phone.STATE_NONE;
	phone.setPhoneState(phone.STATE_NONE);
	agent.currentState = agent.State_NotLogin;
	eConnectionBroken();
}

// 重新连接CTI服务器
function ConnectionReady() {
	if (agent.isLogin) {

	} else {

	}
	eConnectionReady();
}

// 其它座席消息1
function agentStatus(agentName, agentID, deviceAddress, loginTime, status,
		cause) {
	monitor.addAgentToList(agentID, deviceAddress, status, cause);
	monitor.countAgentState();
	eAgentStatus(agentName, agentID, deviceAddress, loginTime, status, cause);
}

function MonitorSuccess(EnumCallID)
{
    eMonitorSuccess(EnumCallID);
}