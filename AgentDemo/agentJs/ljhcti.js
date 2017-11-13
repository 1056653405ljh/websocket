function cti()
{
	
	this.socket=socket;
	this.m_szAgentID="";
	this.m_szDeviceID="";
	this.m_szGroupID="";
	this.m_szPassword="";
	this.m_nCurCallID="";
	this.m_nStatus=STATUS_ORIGINAL;
	this.m_szErrorText="";
	this.m_nErrorCode=0;
	this.m_bIsMonitor=false;
	this.m_bInMonitor=false;
	this.m_pDataBuffer="";
	this.m_nDataBufferLength=0;
	this.m_nDataBufferItemNumber=0;
	this.m_nConnectFlag=0;
	this.SignalResult=function(waitstatus, functionid)
	{
		if (waitstatus == STATUS_LOGGING && functionid == FUNCTION_LOGIN);
		else if (waitstatus == STATUS_WAITPASSWORDCNG && functionid == FUNCTION_CHANGEAGENTPASSWORD);
		else if (waitstatus == STATUS_WAITLOGOUT && functionid == FUNCTION_LOGOUT);
		else if (waitstatus == STATUS_WAITKICKOUT && functionid == FUNCTION_KICKOUT);
		else if (waitstatus == STATUS_WAITLEAVECAUSE && functionid == FUNCTION_GETLEAVECAUSE);
		else return;

	};
	
	this.ResetDataBuffer=function()
	{
		this.m_pDataBuffer = "";
		this.m_nDataBufferLength = 0;
		this.m_nDataBufferItemNumber = 0;
	};
	this.SetStatus=function(status)
	{
		this.m_nStatus = status;
	};
	this.GetStatus=function()
	{
		return this.m_nStatus;
	};
	this.SetError=function(functionid, errorcode, errortext )
	{
		var waitstatus = this.GetStatus();

		this.m_nErrorCode = errorcode;
		this.m_szErrorText = errortext;

		switch (functionid)
		{
		case FUNCTION_LOGIN:
			if (errorcode == 0)
				this.SetStatus(STATUS_LOGGEDIN);
			else
			{
				this.SetStatus(STATUS_CONNECTED);
				alert("座席员登录失败");
			}
			break;
		case FUNCTION_LOGOUT:
			if (errorcode == 0 && waitstatus != STATUS_WAITKICKOUT)
				this.SetStatus(STATUS_CONNECTED);
			if (waitstatus == STATUS_WAITKICKOUT)
				functionid = FUNCTION_KICKOUT;
			break;
		};

		this.SignalResult(waitstatus, functionid);
	};
	
	this.Connect=function(IP,Port)
	{
		this.SetStatus(STATUS_CONNECTING);
		this.socket.connect(IP, Port);
		
		//logger1.log("socket 长度为:"+count(socket));
	};
	
	this.Disconnect=function()
	{
		this.socket.Disconnect();
	};
	
	this.Login=function( agentID, agentGroupID, deviceAddress, password)
	{
		if (agentID == null || agentID.length == 0)
		{
			this.m_szErrorText = "座席工号 未输入。";
			return false;
		}
		if (agentGroupID == null)
		{
			this.m_szErrorText = "内部错误 - agentGroupID (NULL)。";
			return false;
		}
		if (deviceAddress == null || deviceAddress.length == 0)
		{
			this.m_szErrorText = "监控电话 未输入。";
			return false;
		}
		if (password == null || password.length == 0)
		{
			this.m_szErrorText = "座席密码 未输入。";
			return false;
		}

		if (this.GetStatus() == STATUS_LOGGEDIN) 
		{
			agent.isLogin = true;
			phone.currentState = phone.STATE_INITIAL;
			//不应该在这个地方写，在登录成功事件激活后，修改到登录成功事件中
			agent.currentState = agent.State_READY;
			agent.setAgentStatus(agent.State_READY);
			logger1.log("座席员登录成功");
			return true;
		}
    
	if (this.socket.Login(agentID, agentGroupID, deviceAddress, password))
		{
			this.SetStatus(STATUS_LOGGING);
			this.m_szAgentID = agentID;
			this.m_szDeviceID = deviceAddress;
			this.m_szGroupID = agentGroupID;
			this.m_szPassword = password;
		}
		else
		{
			this.SetStatus(STATUS_CONNECTED);			
			return false;
		}

		return (this.GetStatus() == STATUS_LOGGEDIN)?true:false;
	};

	 this.Logout=function()
	{
		 var  laststatus = this.GetStatus();

		if (this.socket.Logout(this.m_szAgentID))
		{
			this.SetStatus(STATUS_WAITLOGOUT);
		}
		else
		{
			this.SetStatus(laststatus);
			return false;
		}
	};

	this.AnswerCall=function()
	{
		this.SetStatus(STATUS_WAITANSWER);
		return this.socket.AnswerCall(this.m_szAgentID,this.m_nCurCallID);
	};
	this.HangUp=function()
	{
		return this.socket.HangupCall(this.m_szAgentID,this.m_nCurCallID);
	}
	this.MakeCall=function(dest,data)
	{
		this.SetStatus(STATUS_CALLMAKING);
		return this.socket.Makecall(this.m_szAgentID,this.m_nCurCallID,dest,data);
	};
	
	this.AutoMakeCall=function(dest,timeout,tipInfo)
	{
		return this.socket.AutoMakeCall(this.m_szAgentID,this.m_nCurCallID,dest,timeout,tipInfo);
	};

	this.TransferCall=function(dest,data)
	{
		return this.socket.TransferCall(this.m_szAgentID, this.m_nCurCallID, dest,data, 0);
	};

	this.ConferenceCall=function(dest,data)
	{
		this.SetStatus(STATUS_CONFERENCING);
		return this.socket.ConferenceCall(this.m_szAgentID,this.m_nCurCallID,dest,data);
	};
	this.Cancel=function()
	{
		return this.socket.Cancel(this.m_szAgentID,this.m_nCurCallID, ID_TRANSFERCALL, 0);
	};
	this.ChangeAgentStatus=function(state,description)
	{
		return this.socket.ChangeAgentStatus(this.m_szAgentID,state,description);
	};
	this.GetAgentID=function()
	{
		 return this.m_szAgentID;
	};
	this.GetDeviceID=function()
	{
		return this.m_szDeviceID;
	};
	this.GetLastError=function()
	{
		return this.m_szErrorText;
	};
	this.IsMonitor=function()
	{
		return this.m_bIsMonitor ? true : false;
	};
	this.GetLeaveCauses=function(buf,bufbytelen,count)
	{
		var laststatus = this.GetStatus();
		this.m_pDataBuffer = buf;
		this.m_nDataBufferLength = bufbytelen;
		count = 0;

		if (this.socket.GetLeaveCauses())
		{
			this.SetStatus(STATUS_WAITLEAVECAUSE);
		}
		else
		{
			this.ResetDataBuffer();
			this.SetStatus(laststatus);
			return false;
		}
		if (m_nErrorCode == 0)
		{
			count = this.m_nDataBufferItemNumber;
			this.ResetDataBuffer();
			this.SetStatus(laststatus);
			return true;
		}
		else
		{
			this.ResetDataBuffer();
			this.SetStatus(laststatus);
			return false;
		}
	};

	this.QueryFunction=function(FunctionID)
	{
		var ret = 0;
		var status = this.GetStatus();

		switch (FunctionID)
		{
		case FUNCTION_CONNECT:
			if (status == STATUS_ORIGINAL) ret = 1;
			break;
		case FUNCTION_DISCONNECT:
			if (status >= STATUS_CONNECTED) ret = 1;
			break;
		case FUNCTION_LOGIN:
			if (status == STATUS_CONNECTED) ret = 1;
			break;
		case FUNCTION_LOGOUT:
			if (status == STATUS_READY) ret = 1;
			else if (status == STATUS_LOGGEDIN) ret = 1;
			break;
		case FUNCTION_CHANGEAGENTPASSWORD:
		case FUNCTION_CHANGEAGENTSTATUS:
			if (status == STATUS_LOGGEDIN) ret = 1;
			else if (status == STATUS_READY) ret = 1;
			break;
		case FUNCTION_MAKECALL:
			if (status == STATUS_READY) ret = 1;
			break;
		case FUNCTION_ANSWER:
			if (status == STATUS_INBOUNDING) ret = 1;
			break;
		case FUNCTION_HANGUP:
			if (status == STATUS_INBOUNDING) ret = 1;
			else if (status == STATUS_ANSWERING) ret = 1;
			else if (status == STATUS_CALLMAKING) ret = 1;
			break;
		case FUNCTION_TRANSFER:
		case FUNCTION_CONFERENCE:
			if (status == STATUS_ANSWERING) ret = 1;
			break;
		case FUNCTION_SENDTEXTMESSAGE:
			if (status >= STATUS_LOGGEDIN) ret = 1;
			break;
		case FUNCTION_CANCEL:
			if (status == STATUS_TRANSFERING) ret = 1;
			else if (status == STATUS_CONFERENCING) ret = 1;
			break;
		case FUNCTION_KICKOUT:
		case FUNCTION_INTRUDE:
			if (status == STATUS_READY&&this.m_bIsMonitor) ret = 1;
			break;
		case FUNCTION_STARTMONITOR:
			if (status == STATUS_READY)
			if (!this.m_bInMonitor&&this.m_bIsMonitor) ret = 1;
			break;
		case FUNCTION_STOPMONITOR:
			if (status == STATUS_READY)
			if (this.m_bInMonitor&&this.m_bIsMonitor) ret = 1;
			break;
		}
		return ret;
	};

	this.ChangeAgentPassword=function(oldPassword,newPassword)
	{
		if (newPassword.length == 0) return false;
		var laststatus = this.GetStatus();
		if (this.socket.ChangePassword(this.m_szAgentID, oldPassword, newPassword))
		{
			this.SetStatus(STATUS_WAITPASSWORDCNG);
		}
		else
		{
			this.SetStatus(laststatus);
			return false;
		}

		if (this.m_nErrorCode == 0)
		{
			return true;
		}
		else
		{
			this.SetStatus(laststatus);
			return false;
		}
	};
	
	this.SendTXTMessage=function(address,message)
	{
		this.socket.SendTXTMessage(this.m_szAgentID, address, message);
		return true;
	};
	this.StartMonitor=function()
	{
		this.m_bInMonitor = (this.socket.Monitor(this.m_szAgentID, null) == true);
		return this.m_bInMonitor ? true : false;
	};
	this.StopMonitor=function()
	{
		this.m_bInMonitor = !(this.socket.UnMonitor(this.m_szAgentID, null) == true);
		return !this.m_bInMonitor ? true : false;
	};
	this.KickOut=function(AgentID)
	{
		if (this.m_szAgentID == AgentID) return false;

		var laststatus = this.GetStatus();
		if (this.socket.Logout(AgentID))
		{
			this.SetStatus(STATUS_WAITKICKOUT);
		}
		else
		{
			this.SetStatus(laststatus);
			return false;
		}

		if (this.m_nErrorCode == 0)
		{
			return true;
		}
		else
		{
			this.SetStatus(laststatus);
			return false;
		}
	};
	this.Intrude=function(AgentID)
	{
		if (this.m_szAgentID == AgentID) return false;
		this.SetStatus(STATUS_CONFERENCING);
		var bRes = this.socket.ConferenceCall(AgentID, 0, this.m_szDeviceID, "INTRUDE") == true;
		return bRes ? true : false;
	};
	this.AcceptService=function(RequestID,isAccept)
	{
		this.socket.ServiceResult(RequestID, isAccept);
	};
	this.ForemanExtend=function(extendKind,foremanID,agentID,appdata)
	{
		this.socket.ForemanExtend(foremanID, agentID, extendKind, appdata);
		return true;
	};
   //-------------------消息处理-------------------------- 
    this.OnConnectionState=function(buff)
	{
		var res=ntoh32(buff, 14+Uint32Array.BYTES_PER_ELEMENT);
		this.HandleConnetionState(res[0]);
		return true;
	};
	this.OnAgentStatus=function(buff)
	{
		var res=ntoh8(buff, 14+Uint32Array.BYTES_PER_ELEMENT,MAX_AGENTNAME+1);
		var agentName=res[0];
		res=ntoh8(buff,res[1],MAX_AGENTID+1);
		var agentID=res[0];
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var deviceAddress=res[0];
		res=ntoh8(buff,res[1],32);
		var loginTime=res[0];
		res=ntoh32(buff,res[1]);
		var state=res[0];
		res=ntoh8(buff,res[1],MAX_DESCRIPTION+1);
		var cause=unescape(res[0].replace(/\\u/g, '%u'));
		this.HandleAgentStatus(agentName,agentID,deviceAddress,loginTime,state,cause);
		return true;
	};

	this.OnTextMessage=function(buff)
	{
		var res=ntoh8(buff, 14+Uint32Array.BYTES_PER_ELEMENT,MAX_AGENTID+1);
		var agentID=res[0];
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var address=res[0];
		res=ntoh8(buff,res[1],MAX_APPDATA+1);
		var message=res[0];
		this.HandleTextMessage(agentID,address,message);	
		return true;
	};

	this.OnAgentStatusCNGed=function(buff)
	{
		var pos=10+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*6)+Uint32Array.BYTES_PER_ELEMENT*9+Float64Array.BYTES_PER_ELEMENT*1;
		var res=ntoh32(buff,pos);
		var agentStatus=res[0];
		this.HandleAgentStatusCNGed(agentStatus);
		return true;
	};

	this.OnDeviceStatus=function(buff)
	{
		var pos=MSG_HEADER+1*Uint32Array.BYTES_PER_ELEMENT;
		var res=ntoh8(buff,pos,MAX_ADDRESS+1);
		var deviceAddress=res[0];
		pos=res[1]+24;
		res=ntoh8(buff,pos,12);
		status=res[0];
		var isIdle=(status=="空闲") ? true:false;
		this.HandleDeviceStatus(deviceAddress, isIdle);
		return true;
	};

	this.OnAgentStatistics=function(buff)
	{
		var pos=MSG_HEADER+Uint8Array.BYTES_PER_ELEMENT*(MAX_CALLID_LEN+1)*4+Uint32Array.BYTES_PER_ELEMENT*1+Float64Array.BYTES_PER_ELEMENT;
		var res= ntoh32(buff,pos);
		var svalue=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_ADDRESS+1)*6+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+MAX_CALLID_LEN+(MAX_CHANNEL_LEN+1)*2+4)+Uint32Array.BYTES_PER_ELEMENT*10+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_QUEUE_LEN +1)
		var queueName=res[0];
		this.HandleAgentStatistics(queueName, svalue);
		return true;
	};

	this.OnWaitforService=function(buff)//此函数未使用
	{
		var pos=MSG_HEADER+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*2)+Uint32Array.BYTES_PER_ELEMENT*6+Float64Array.BYTES_PER_ELEMENT;
		var res=ntoh8(buff,pos,MAX_ADDRESS+1);
		var currentCallingParty=res[0];
		pos=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+1)+Uint32Array.BYTES_PER_ELEMENT*2;
		res=ntoh8(buff,pos,MAX_ADDRESS+1);
		var monitorParty=res[0];
		pos=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+4)+Uint32Array.BYTES_PER_ELEMENT*2
		res=ntoh64(buff,pos);
		var functiona=res[0];
		res=ntoh32(buff,res[1]);
		var asyncHandle=res[0];
		this.HandleWaitforService(monitorParty,functiona,currentCallingParty,asyncHandle);
		return true;
	};

	this.OnUnknownEvent=function(buff)//此函数未使用
	{
		var res=ntoh32(buff,MSG_HEADER);
		var eventID=res[0];
		this.HandleUnknownEvent(eventID);
		return true;
	};

	this.OnInboundCall=function(buff)
	{
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3)+Uint32Array.BYTES_PER_ELEMENT*1+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh32(buff,res[1]);
		var callType=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var originalCallingParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var originalCalledParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var currentCallingParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var currentCalledParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];

		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+MAX_AGENTID+MAX_GROUPID+3)+Uint32Array.BYTES_PER_ELEMENT*2;
		res=ntoh8(buff,res[1],MAX_APPDATA+1);
		var applicationData=res[0];

		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT*2+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_CALLID_LEN+1);
		var enumcallID=res[0];
		this.HandleInboundCall(monitorParty,callID,currentCallingParty,currentCalledParty,
			originalCallingParty,originalCalledParty,applicationData,callType,enumcallID, null);
		return true;
	};

	this.OnCallIdle=function(buff)
	{	
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*4)+Uint32Array.BYTES_PER_ELEMENT*7+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+4)+Uint32Array.BYTES_PER_ELEMENT*4+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_CALLID_LEN+1);
		var enumcallID=res[0];
		res=ntoh8(buff,res[1],32)
		var currentTime=res[0];
		this.HandleCallIdle(monitorParty,callID,enumcallID,currentTime);
		return true;
	};

	this.OnAnswered=function(buff)
	{
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*4)+Uint32Array.BYTES_PER_ELEMENT*7+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+4)+Uint32Array.BYTES_PER_ELEMENT*2+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh32(buff,res[1]);
		var asyncHandle=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_CALLID_LEN+1);
		var enumcallID=res[0];
		res=ntoh8(buff,res[1],32)
		var currentTime=res[0];
		this.HandleAnswered(monitorParty,callID,asyncHandle,enumcallID,currentTime);
		return true;
	};
	this.OnDialTone=function(buff)
	{
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*4)+Uint32Array.BYTES_PER_ELEMENT*7+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];
		this.HandleDialTone(monitorParty,callID);
		return true;
	};

	this.OnConferenced=function(buff)
	{
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*4)+Uint32Array.BYTES_PER_ELEMENT*7+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];
		this.HandleConferenced(monitorParty,callID);
		return true;
	};

	this.OnTransfered=function(buff)
	{
		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*4)+Uint32Array.BYTES_PER_ELEMENT*7+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];
		this.HandleConferenced(monitorParty,callID);
		return true;
	};

	this.OnDestBusy=function(buff)
	{
		this.HandleDestBusy();
		return true;
	};

	this.OnForemanExtend=function(buff)
	{
		this.HandleForemanExtend();
		return true;
	};

	this.OnRingBack=function(buff)
	{

		var res=ntoh8(buff,MSG_HEADER+Uint32Array.BYTES_PER_ELEMENT*1,MAX_CALLID_LEN+1);
		var callID=res[0];
		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*3+(MAX_ADDRESS+1)*2)+Uint32Array.BYTES_PER_ELEMENT*5+Float64Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var currentCallingParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var currentCalledParty=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh8(buff,res[1],MAX_ADDRESS+1);
		var monitorParty=res[0];

		res[1]=res[1]+Uint8Array.BYTES_PER_ELEMENT*(MAX_ADDRESS+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+4)+Uint32Array.BYTES_PER_ELEMENT*4+Float64Array.BYTES_PER_ELEMENT;
		
		res=ntoh8(buff,res[1],MAX_CALLID_LEN+1);
		var enumcallID=res[0];
		res=ntoh8(buff,res[1],32);
		var currentTime=res[0];
		this.HandleRingBack(monitorParty,callID,currentCallingParty,currentCalledParty,enumcallID,currentTime);
		return true;
	}

	this.OnAgentLoggedOff=function(buff)
	{
		if (this.m_nErrorCode == 0)
			this.SetStatus(STATUS_CONNECTED);
		else
			this.SetStatus(this.laststatus);
		var pos=MSG_HEADER+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*6)+Uint32Array.BYTES_PER_ELEMENT*10+Float64Array.BYTES_PER_ELEMENT;
		var res=ntoh8(buff,pos,MAX_AGENTID+1);
		var agentID=res[0];
		this.HandleLoggedOut(agentID);
		return true;
	};

	this.OnAgentLoggedOn=function(buff)
	{
		agent.isLogin = true;
		phone.currentState = phone.STATE_INITIAL;
		//不应该在这个地方写，在登录成功事件激活后，修改到登录成功事件中
		agent.currentState = this.State_READY;
		agent.setAgentStatus(agent.State_READY);
		logger1.log("座席员登录成功");
		var pos=MSG_HEADER+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*6)+Uint32Array.BYTES_PER_ELEMENT*9+Float64Array.BYTES_PER_ELEMENT;
		var res=ntoh32(buff,pos);
		var isMonitor=res[0];
		this.HandleLoggedIn(isMonitor);
		return true;
	};

	this.OnMonitorSuccess=function(buff)
	{
		var pos=MSG_HEADER+Uint8Array.BYTES_PER_ELEMENT*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*6+MAX_AGENTID+MAX_GROUPID+MAX_APPDATA+3)+Uint32Array.BYTES_PER_ELEMENT*12+Float64Array.BYTES_PER_ELEMENT*2;
		var res=ntoh8(buff,pos,MAX_CALLID_LEN+1);
		var enumcallID=res[0];
		MonitorSuccess(enumcallID);
		return true;
	};

	/*****新添加函数************/
	this.OnLeaveCauses=function(buff)
	{
		var res=ntoh32(buff,10);
		var datalen=res[0];
		res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
		res=ntoh32(buff,res[1]);
		var count=res[0];
		res=ntoh8(buff,res[1],datalen-Uint32Array.BYTES_PER_ELEMENT);
		var data=res[0];
		this.HandleLeaveCauses(data,datalen-Uint32Array.BYTES_PER_ELEMENT,count);
	};
	//发送消息
	this.HandleConnetionState=function(state)
	{
		if (state == 0)   //ready
		{
			this.SetStatus(STATUS_CONNECTED);
			//重连成功后主动请求一次消息
			if (this.socket.Login(this.m_szAgentID,this.m_szGroupID,this.m_szDeviceID,this.m_szPassword))
			{
				this.socket.ChangeAgentStatus(this.m_szAgentID, AGENT_READY, "");
			}
		}
		else //broken
		{
			this.SetStatus(STATUS_ORIGINAL);
			ConnectionBroken();
		}
	};

	this.HandleAgentStatus=function(agentName,agentID,deviceAddress,loginTime,status,cause)
	{
		//AgentStatus(agentName,agentID,deviceAddress,loginTime,status,cause);
		agentStatus(agentName,agentID,deviceAddress,loginTime,status,cause);
	};
	
	this.HandleTextMessage=function(agentID,address,tmessage)
	{
		if (m_szDeviceID == address)
			TextMessage(agentID, address, tmessage);
		//else
		//	TextMessage(agentID, address, tmessage);
	};

	this.HandleAgentStatusCNGed=function(agentStatus)
	{
		if (agentStatus == AGENT_READY)
			this.SetStatus(STATUS_READY);
		else
			this.SetStatus(STATUS_LOGGEDIN);

		AgentStatusCNGed(agentStatus);
		if(config != null){
			config.autoExcute(agentStatus);
		}
	};

	this.HandleDeviceStatus=function(deviceAddress,isIdle)
	{
		DeviceStatus(deviceAddress, isIdle);
	};

	this.HandleAgentStatistics=function(SName,SValue)
	{
		AgentStatistics(SName, SValue);
	};

	this.HandleWaitforService=function(MAddress,requestid,callingnbr,leavetime)//未使用
	{
		if (m_szDeviceID == MAddress)
		{
			FireWaitforService(requestid, callingnbr, leavetime / 1000);
		}
	};

	this.HandleUnknownEvent=function(eventID)//未使用
	{
		//UnknownEvent(eventID);
	};

	this.HandleLeaveCauses=function(buf,buflen,count)
	{
		
		if (this.m_pDataBuffer)
		{
			if (this.m_nDataBufferLength < buflen)
			{
				this.SetError(FUNCTION_GETLEAVECAUSE, -1);
			}
			else
			{
			
				this.m_pDataBuffer=buf;
				this.m_nDataBufferItemNumber = count;
				this.SetError(FUNCTION_GETLEAVECAUSE, 0);
			}
		}
	};

	this.HandleInboundCall=function(MAddress,callID,currentCallingParty,currentCalledParty,originalCallingParty,originalCalledParty,applicationData,callType,EnumCallID,currentTime)
	{
		this.m_nCurCallID = callID;
		this.SetStatus(STATUS_INBOUNDING);

		if (this.m_szDeviceID == MAddress)
		{

			InboundCall
				(
				currentCallingParty,
				currentCalledParty,
				originalCallingParty,
				originalCalledParty,
				applicationData,
				callType,
				EnumCallID,
				currentTime
				);
		}
		else
		{
			
		}
	};
    
	this.HandleCallIdle=function(MAddress,callID,EnumCallID,currentTime)
	{
		this.m_nCurCallID = callID;
		this.SetStatus(STATUS_READY);

		if (this.m_szDeviceID == MAddress)
			CallIdle(EnumCallID, currentTime);
	//	else
	//		FireMCallIdle(MAddress);
	};

	this.HandleAnswered=function(MAddress,callID,opNumber,EnumCallID,currentTime)
	{
		this.m_nCurCallID = callID;
		this.SetStatus(STATUS_ANSWERING);
		if (this.m_szDeviceID == MAddress)
			Answered(opNumber, EnumCallID, currentTime);
		//else
			//FireMAnswered(MAddress);
	};

	this.HandleDialTone=function(MAddress,callID)
	{
		this.m_nCurCallID = callID;
		if (this.m_szDeviceID == MAddress)
			DialTone();
		//else
		//	FireMDialTone(MAddress);
	};
	this.HandleConferenced=function(MAddress,callID)
	{
		this.m_nCurCallID = callID;
		this.SetStatus(STATUS_ANSWERING);

		if (this.m_szDeviceID == MAddress)
			Conferenced();
		//else
		//	FireMConferenced(MAddress);
	};

	this.HandleTransfered=function(MAddress,callID)
	{
		this.m_nCurCallID = callID;
		SetStatus(STATUS_READY);
		//if (m_szDeviceID == MAddress)
			//FireTransfered();
		//else
			//FireMTransfered(MAddress);
	};

	this.HandleDestBusy=function()
	{
		DestBusy();
	};

	this.HandleForemanExtend=function()
	{
		ForemanExtendOpered();
	};

	this.HandleRingBack=function(MAddress,callID,currentCallingParty,currentCalledParty,EnumCallID,currentTime)
	{
		this.m_nCurCallID = callID;
		if (this.m_szDeviceID == MAddress)
		{
			RingBack(currentCallingParty, currentCalledParty, EnumCallID, currentTime);
		}
	};

	this.HandleLoggedOut=function(agentID)
	{
		this.SetError(FUNCTION_LOGOUT, 0);
		var a=agentID.length;
		var b=this.m_szAgentID.length;
		if (this.m_szAgentID == agentID)
		{
			LoggedOut();
		}
	};

	this.HandleLoggedIn=function(isMonitor)
	{
		this.m_bIsMonitor = isMonitor;
		this.SetError(FUNCTION_LOGIN, 0);
	};

	this.HandleChangePassword=function()
	{
		this.SetError(FUNCTION_CHANGEAGENTPASSWORD, 0);
	}

}
var cti=new cti();


function count(obj)
{
    var objType = typeof obj;
    logger1.log("socket 类型为:"+objType);
    if(objType == "string"){
      return obj.length;
    }else if(objType == "object"){
      var objLen = 0;
      for(var i in obj){
        objLen++;
      }
      return objLen;
    }
    return false;
  }

 /*  function sleep(millis) {
    var notifier = NjsRuntime.createNotifier();
    setTimeout(notifier, millis);
    notifier.wait();
}*/
