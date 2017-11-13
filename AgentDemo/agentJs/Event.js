/**
 * @include "./Log.js"
 * @include "./Agent.js"
 */
/*******************************************************************************
 * 事件回调函数
 ******************************************************************************/
// 座席状态
function eAgentStatus(agentName, agentID, deviceAddress, loginTime, status,
		cause) {
//	logger1.log("[Other]座席状态：座席编号:" + agentID + " 设备号码:" + deviceAddress
//			+ " 状态:" + status + " 原因:" + cause);
	ui_agentStatusList();
}

// 电话呼入
function eInboundCall(currentCallingParty, currentCalledParty,
		originalCallingParty, originalCalledParty, applicationData, callType,
		enumCallID) {
	logger1.log("[InboundCal]:当前主叫:" + currentCallingParty + " 当前被叫:"
			+ currentCalledParty);
	logger1.log("[InboundCal]:原始主叫:" + originalCallingParty + " 原始被叫:"
			+ originalCalledParty);
	logger1.log("[InboundCal]:随路数据:" + applicationData);
	logger1.log("[InboundCal]:呼叫类型:" + callType + " 呼叫编号:" + enumCallID);
	ui_callingPromptBegin();
}

// 成功登录，是否班长席(无响应)
function eLoggedIn(isMonitor) {
	logger1.log("[Event]:成功登陆");
}

// 登出消息
function eLoggedOut() {
	logger1.log("[Event]:座席登出！！！");
}

//强制退出
function eForceLoggedOut(){
	logger1.log("[Event]:本座席被强制退出，请联系管理员！");
}

// 座席状态修改
function eAgentStatusCNGed(status) {
	switch (status) {
		case 1 :
//			logger1.log("[Event]:当前座席状态: 准备接听，事件标志：******" + stateFlag);
			break;
		case 3 :
//			logger1.log("[Event]:当前座席状态: 离开状态，事件标志：******" + stateFlag);
			break;
		case 4 :
//			logger1.log("[Event]:当前座席状态: 处理电话中，事件标志：******" + stateFlag);
			break;
		default :
//			logger1.log("[Event]:当前座席状态: 其它状态，事件标志：******" + stateFlag);
			break;
	}
}

// 呼入电话接听事件
function eCallInAnswered(enumCallID, pickupTime) {
	logger1.log("[CallInAnswered]:呼叫编号:" + enumCallID + "，接听时间" + pickupTime);
	ui_callingPromptStop();
}

// 呼出电话接听事件
function eCallOutAnswered(enumCallID, pickupTime) {
	logger1.log("[CallOutAnswered]:呼叫编号:" + enumCallID + "，接听时间"  + pickupTime);
}

// 电话呼转事件
function eTransfered() {
	logger1.log("[Event]:电话呼叫转移成功");
}

// 三方对话中
function eConferenced() {
	logger1.log("[Event]:三方通话成功，会议中");
}

// 当前通话被挂断
function eCallIdle() {
	logger1.log("[CallIdle]:当前通话被挂断");
	ui_callingPromptStop();
}

// 摘机事件
function eDialTone() {
	logger1.log("[Event]:摘机，准备拨打电话");
}

// 外呼，对方振铃
function eRingBack(currentCallingParty, currentCalledParty, enumCallID,
		startTime) {
	logger1.log("[RingBack]:外呼，对方振铃，呼叫编号：" + enumCallID);
}

// 外呼，对方忙事件
function eDestBusy() {
	logger1.log("[Event]:外呼，对方忙");
}

// 当前话机状态
function eDeviceStatus(extension, isIdle) {
//	logger1.log("[Event]:话机：" + extension + "  状态:" + isIdle);
}

// 座席间有信息
function eTextMessage(agentID, address, message) {
//	logger1.log("[Event]:座席间有信息");
}

// 队列长度有变化
function eAgentStatistics(name, value) {
	logger1.log("[Event]:获得队列信息名：" + name + "\t" + "获得队列信息值：" + value);
}

// 非本座席消息通知，电话呼入
function eMInboundCall(extension, currentCallingParty, currentCalledParty,
		originalCallingParty, originalCalledParty, applicationData, callType,
		enumCallID) {
	logger1.log("设备:" + extension + "有电话呼入，主叫号码:" + originalCallingParty);
}

// 呼叫转移失败
function eTransferFailed(notused, enumCallID, pickupTime) {
	logger1.log("[Event]:呼叫转移失败，呼叫编号：" + enumCallID);
}

// 与CTI主服务器断开连接
function eConnectionBroken() {
	logger1.log("[Event]:与CTI服务器断开连接");
}

// 准备连接
function eConnectionReady() {
	logger1.log("[Event]:准备连接");
}

function eMonitorSuccess(EnumCallID)
{
    logger1.log("[Event]:监听成功，被监听呼叫编号：" + EnumCallID);
}