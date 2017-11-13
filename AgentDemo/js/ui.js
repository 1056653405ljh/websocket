﻿/*
 * @include "../agentJs/Agent.js";
 * @include "../agentJs/Config.js";
 * @include "../agentJs/Log.js";
 * @include "../agentJs/Monitor.js";
 */
function ui_connect() {
	var ip1 = document.getElementById("ctiIp1").value;
	var ip2 = document.getElementById("ctiIp2").value;
	var port = document.getElementById("ctiPort").value;
	/*if (agent.connect(ip1, port, ip2, port)) {
		logger1.log("CTI服务器连接成功");
		agent.isConnected = true;
	} else {
		alert("CTI服务器连接失败");
	}*/
	agent.connect(ip1, port, ip2, port);
}

function ui_disconnect() {
	agent.disconnect();
	//agent.isConnected = false;
	
}

function ui_login() {
	var name = document.getElementById("agentName").value;
	var password = document.getElementById("agentPassword").value;
	var phone = document.getElementById("selectPhoneNumber").value;
	agent.login(name, password, phone);
		
}

function ui_logout() {
	agent.logout();
	logger1.log("座席员注销！");
}

// 状态改变
function ui_agentChangeStatus() {
	var status = document.getElementById("selectAgentStatus").value;
	agent.changeStatus(status);
}

function ui_makecall() {
	var number = document.getElementById("txtCallingNumber").value;
	agent.makeCall(number);
	logger1.log("发起呼叫，目标：" + number);
}

function ui_autoMakecall() {
    var timeout = document.getElementById("txtTimeout").value;
    var tipInfo = document.getElementById("txtTipInfo").value;
    var number = document.getElementById("txtAutoCallee").value;
    agent.autoMakeCall(number,timeout,tipInfo);
    logger1.log("发起呼叫，目标：" + number);
}

//ADD BY ZOUWENBO用于测试 自动登录登出和断开连接
function ui_autoLoginLogout() {
  /*  var timeout = document.getElementById("txtLoginLogoutTimeout").value;
    logger1.log("启动自动登录登出，间隔时间" + timeout);
    setInterval(function () {
    	if(cti.m_nStatus==STATUS_READY||cti.m_nStatus==STATUS_LOGGEDIN)
        this.ui_logout();
 //       this.ui_disconnect();
        if(cti.m_nStatus==STATUS_ORIGINAL)
        	this.ui_connect();
        if(cti.m_nStatus==STATUS_CONNECTED)
        this.ui_login();
        logger1.log("自动登录登出测试");
    }, this.timeout * 1000);*/
}

function ui_conference() {
	var number = document.getElementById("txtCallingNumber").value;
	var appdata = document.getElementById("txtAppdata").value;
	logger1.log("发起三方会议，目标：" + number + "，随路数据：" + appdata);
	agent.conferenceCall(number, appdata);
}

function ui_transfer() {
	var number = document.getElementById("txtCallingNumber").value;
	var appdata = document.getElementById("txtAppdata").value;
	logger1.log("呼叫转移，目标" + number + "，随路数据：" + appdata);
	agent.transferCall(number, appdata);
}

var prompt = null;
function ui_callingPromptBegin() {
	if (prompt == null) {
		prompt = document.getElementById("callingprompt");
	}
	prompt.className = "logo-callin";
}

function ui_callingPromptStop() {
	if (prompt == null) {
		prompt = document.getElementById("callingprompt");
	}
	prompt.className = "logo";
}

function ui_agentStatusList() {
	if (config.IsMonitor) {
		var list = document.getElementById("agentSatausList");
		var result = "";
		var currentAgentid;
		try {
			currentAgentid = agent.GetAgentID();
		} catch (e) {
			logger1.log("获取座席号异常！异常信息：" + e.description);
		}
		result += "<table class='grid'>";
		result += "<thead>";
		result += "<tr>";
		result += "<td>坐席号</td>";
		result += "<td>坐席名</td>";
		result += "<td>电话机</td>";
		result += "<td>状态</td>";
		result += "<td>操作</td>";
		result += "</tr>";
		result += "</thead>";
		result += "<tbody>";
		var agentStatusList = monitor.agentStatusList;
		for (var key in agentStatusList) {
			// status 0表示刚登录，1表示准备接听，3表示离开状态，4表示处理电话中，5表示登出
			if (agentStatusList[key].status != 5) {
				result += "<tr>";
				result += "<td>" + agentStatusList[key].agentID + "</td>";
				result += "<td>" + agentStatusList[key].agentID + "</td>";
				result += "<td>" + agentStatusList[key].deviceAddress + "</td>";
				result += "<td>" + agentStatusList[key].cause + "</td>";
				result += "<td>";

				if (agentStatusList[key].agentID == currentAgentid) {

				} else if (agentStatusList[key].status == 4) {
					result += "<a href='#' onClick='ui_Intrude("
							+ agentStatusList[key].agentID + ")'>强插</a>";
					result += "<a href='#' onClick='ui_Redirect("
							+ agentStatusList[key].agentID + ")'>强转</a>";
					result += "<a href='#' onClick='ui_Listen("
							+ agentStatusList[key].agentID + ")'>监听</a>";
				} else {
					result += "<a href='#' onClick='ui_KickOut("
							+ agentStatusList[key].agentID + ")'>强制注销</a>";
				}
				result += "</td>";
				result += "</tr>";
			}
		}
		result += "</tbody>";
		result += "<tfoot>";
		result += "<tr>";
		result += "<td colspan='5'></td>";
		result += "</tr>";
		result += "</tfoot>";
		result += "</table>";
		list.innerHTML = result;
	}
}

// 强插
function ui_Intrude(destAgent) {
	if (agent.Intrude(String(destAgent))) {
		logger1.log("强插成功");
	} else {
		logger1.log("强插失败");
	}
}

function ui_KickOut(destAgent) {
	if (agent.KickOut(String(destAgent))) {
		logger1.log("强制注销" + destAgent + "成功");
	} else {
		logger1.log("强制注销" + destAgent + "失败");
	}
}

function ui_Listen(agentId) {
	logger1.log("静音监听目标：" + agentId);
	agent.Listen(String(agentId));
}

function ui_Redirect(agentId) {
	logger1.log("将座席" + agentId + "的通话强制转移至本机。");
	agent.Redirect(String(agentId));
}

function startMonitor() {
	cti.StartMonitor();
}

function ui_ini() {
	ui_connect();
	setTimeout(ui_login, 1000);
}

function ui_KeyDown(){
	logger1.log(window.event.keyCode);
}

function ui_hangUp(){
	//if(currentCall != null && currentCall.InboundCallFlag && currentCall.ConferencedFlag == false){
	//	agent.grade("H650", "isGrade:true");
	//}else{
		agent.hangUp();
	//}
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}