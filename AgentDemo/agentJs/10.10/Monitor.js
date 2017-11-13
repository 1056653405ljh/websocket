/**
 * @include "../agentJs/Log.js";
 * @include "../agentJs/Phone.js";
 */
function Monitor() {
	// 用于保存座席状态的集合
	this.agentStatusList = new Object();

	// 座席状态
	this.addAgentToList = function(agentID, deviceAddress, status, cause) {
		if (this.agentStatusList[agentID] == null) {
			//座席登录，添加进行集合
			var agentStatus = new AgentStatus(agentID, "", deviceAddress, status, cause);
			this.agentStatusList[agentID] = agentStatus;
		} else if(this.agentStatusList[agentID] != null && status == 5){
			//座席注销，从集合中删除
			delete this.agentStatusList[agentID];
		} else if(this.agentStatusList[agentID] != null && status != 5){
			//座席修改状态
			var agentStatus = this.agentStatusList[agentID];
			agentStatus.deviceAddress = deviceAddress;
			agentStatus.cause = cause;
			agentStatus.status = status;
		}
	};
	
	//座席状态统计:空闲数量/总数
	this.countAgentState = function(){
		var total = 0;
	    var free = 0;
	    if(phone.busyAgentTotal != null){
	        for (var key in this.agentStatusList ) {
	            if(this.agentStatusList[key].status != 5){
	                total = total + 1;
	                if(this.agentStatusList[key].status == 1){
	                    free = free + 1;
	                }
	            }
	        }
	        phone.busyAgentTotal.innerText = free +"/" +total;
	    }
	};
}

function AgentStatus(agentID, agentName, deviceAddress, status, cause) {
	this.agentID = agentID;
	this.deviceAddress = deviceAddress;
	this.status = status;
	this.cause = cause;
	this.agentName = agentName;
}

var monitor = new Monitor();