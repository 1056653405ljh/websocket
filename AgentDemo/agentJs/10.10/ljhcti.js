function cti()
{
	
	this.socket=socket;
	this.STATUS_ORIGINAL=0;
	this.STATUS_CONNECTING=1;
	this.STATUS_CONNECTED=2;
	this.STATUS_LOGGING=3;
	this.STATUS_LOGGEDIN=4;
	this.STATUS_READY=5;

	this.STATUS_WAITPASSWORDCNG=6;
	this.STATUS_WAITLOGOUT=7;
	this.STATUS_WAITKICKOUT=8;
	this.STATUS_WAITLEAVECAUSE=9;


	this.STATUS_INBOUNDING=10;
	this.STATUS_CALLMAKING=11;
	this.STATUS_TRANSFERING=12;
	this.STATUS_CONFERENCING=13;



	this.STATUS_WAITANSWER=21;
	this.STATUS_ANSWERING=22;

	this.MESSAGEBUFFERLENGTH=20;
	
	this.m_szAgentID=null;
	this.m_szDeviceID=null;
	this.m_szGroupID=null;
	this.m_szPassword=null;
	this.m_nCurCallID=null;
	this.m_pEventTrigger;

	this.m_nStatus=this.STATUS_ORIGINAL;

	this.m_szErrorText=null;
	this.m_nErrorCode=null;




	this.m_bIsMonitor=false;
	this.m_bInMonitor=false;


	this.m_pDataBuffer=null;
	this.m_nDataBufferLength=0;
	this.m_nDataBufferItemNumber=0;

	this.m_nConnectFlag=null;


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
		this.m_pDataBuffer = null;
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
	}
	this.SetError=function(functionid, errorcode, errortext )
	{
		var waitstatus = GetStatus();

		this.m_nErrorCode = errorcode;
		this.m_szErrorText = errortext;

		switch (functionid)
		{
		case FUNCTION_LOGIN:
			if (errorcode == 0)
				this.SetStatus(STATUS_LOGGEDIN);
			else
				this.SetStatus(STATUS_CONNECTED);
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
		
		this.socket.connect(IP, Port);
		
		//logger1.log("socket 长度为:"+count(socket));
	};
	
	this.Disconnect=function()
	{
		this.socket.disconnect();
	};
	
	this.Login=function( agentID, agentGroupID, deviceAddress, password)
	{
		if (agentID == null || agentID.length == 0)
		{
			m_szErrorText = "座席工号 未输入。";
			return false;
		}
		if (agentGroupID == NULL)
		{
			m_szErrorText = "内部错误 - agentGroupID (NULL)。";
			return false;
		}
		if (deviceAddress == NULL || deviceAddress.length == 0)
		{
			m_szErrorText = "监控电话 未输入。";
			return false;
		}
		if (password == NULL || password.length == 0)
		{
			m_szErrorText = "座席密码 未输入。";
			return false;
		}

		if (GetStatus() == STATUS_LOGGEDIN) 
			return true;
    
	if (this.socket.Login(agentID, agentGroupID, deviceAddress, password))
		{
			SetStatus(STATUS_LOGGING);
			m_szAgentID = agentID;
			m_szDeviceID = deviceAddress;
			m_szGroupID = agentGroupID;
			m_szPassword = password;
		}
		else
		{
			SetStatus(STATUS_CONNECTED);
			
			return false;
		}

	//if (!WaitResult(6000))
	//	SetStatus(STATUS_CONNECTED);

		return GetStatus() == STATUS_LOGGEDIN;
	};

	 this.Logout=function()
	{
		 var  laststatus = GetStatus();

		//InitiateBlock();

		if (this.socket.Logout(m_szAgentID))
		{
			SetStatus(STATUS_WAITLOGOUT);
		}
		else
		{
			SetStatus(laststatus);
			return FALSE;
		}
		/*
		if (!WaitResult(500))
		{
			//	//SetError( //超时
			SetStatus(laststatus);
			return FALSE;
		}
		*/
		if (m_nErrorCode == 0)
		{
			SetStatus(STATUS_CONNECTED);
			return true;
		}
		else
		{
			SetStatus(laststatus);
			return FALSE;
		}
	};

	this.AnswerCall=function()
	{
		SetStatus(STATUS_WAITANSWER);
		return this.socket.HangupCall(m_szAgentID,m_nCurCallID);
	};

	this.MakeCall=function(dest,data)
	{
		SetStatus(STATUS_CALLMAKING);
		return this.socket.MakeCall(m_szAgentID,m_nCurCallID,dest,data);
	};
	this.back=function()
	{
		logger1.log("收到回复信息！");
	};

	this.AutoMakeCall=function(dest,timeout,tipInfo)
	{
		return this.socket.AutoMakeCall(m_szAgentID,m_nCurCallID,dest,timeout,tipInfo);
	};

	this.TransferCall=function(dest,data)
	{
		return this.socket.TransferCall(m_szAgentID, m_nCurCallID, dest,data, 0);
	};

	this.ConferenceCall=function(dest,data)
	{
		SetStatus(STATUS_CONFERENCING);
		return this.socket.ConferenceCall(m_szAgentID,m_nCurCallID,dest,data);
	};
	this.Cancel=function()
	{
		return this.socket.Cancel(m_szAgentID,m_nCurCallID, ID_TRANSFERCALL, 0);
	};
	this.ChangeAgentStatus=function(state,description)
	{
		return this.socket.ChangeAgentStatus(m_szAgentID,state,description);
	};
	this.GetAgentID=function()
	{
		 return m_szAgentID;
	};
	this.GetDeviceID=function()
	{
		return m_szDeviceID;
	};
	this.GetLastError=function()
	{
		return m_szErrorText;
	};
	this.IsMonitor=function()
	{
		return m_bIsMonitor ? true : false;
	};
	this.GetLeaveCauses=function(buf,bufbytelen,count)
	{
		var laststatus = GetStatus();
		m_pDataBuffer = buf;
		m_nDataBufferLength = bufbytelen;
		count = 0;

		if (this.socket.GetLeaveCauses())
		{
			SetStatus(STATUS_WAITLEAVECAUSE);
		}
		else
		{
			ResetDataBuffer();
			SetStatus(laststatus);
			return false;
		}
		if (m_nErrorCode == 0)
		{
			count = m_nDataBufferItemNumber;
			ResetDataBuffer();
			SetStatus(laststatus);
			return true;
		}
		else
		{
			ResetDataBuffer();
			SetStatus(laststatus);
			return false;
		}
	};

	this.QueryFunction=function(FunctionID)
	{
		var ret = 0;
		var status = GetStatus();

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
			if (status == STATUS_READY&&m_bIsMonitor) ret = 1;
			break;
		case FUNCTION_STARTMONITOR:
			if (status == STATUS_READY)
			if (!m_bInMonitor&&m_bIsMonitor) ret = 1;
			break;
		case FUNCTION_STOPMONITOR:
			if (status == STATUS_READY)
			if (m_bInMonitor&&m_bIsMonitor) ret = 1;
			break;
		}
		return ret;
	};

	this.ChangeAgentPassword=function(oldPassword,newPassword)
	{
		if (newPassword.length == 0) return false;
		var laststatus = GetStatus();
		if (this.socket.ChangePassword(m_szAgentID, oldPassword, newPassword))
		{
			SetStatus(STATUS_WAITPASSWORDCNG);
		}
		else
		{
			SetStatus(laststatus);
			return false;
		}

		if (m_nErrorCode == 0)
		{
			return true;
		}
		else
		{
			SetStatus(laststatus);
			return false;
		}
	};
	
	this.SendTXTMessage=function(address,message)
	{
		this.socket.SendTXTMessage(m_szAgentID, address, message);
		return true;
	};
	this.StartMonitor=function()
	{
		m_bInMonitor = (this.socket.Monitor(m_szAgentID, null) == true);
		return m_bInMonitor ? true : false;
	};
	this.StopMonitor=function()
	{
		m_bInMonitor = !(this.socket.UnMonitor(m_szAgentID, null) == true);
		return !m_bInMonitor ? true : false;
	};
	this.KickOut=function(AgentID)
	{
		if (m_szAgentID == AgentID) return false;

		var laststatus = GetStatus();
		if (this.socket.Logout(AgentID))
		{
			SetStatus(STATUS_WAITKICKOUT);
		}
		else
		{
			SetStatus(laststatus);
			return false;
		}

		if (m_nErrorCode == 0)
		{
			return true;
		}
		else
		{
			SetStatus(laststatus);
			return false;
		}
	};
	this.Intrude=function(AgentID)
	{
		if (m_szAgentID == AgentID) return false;
		SetStatus(STATUS_CONFERENCING);
		var bRes = this.socket.ConferenceCall(AgentID, 0, m_szDeviceID, "INTRUDE") == true;
		return bRes ? true : false;
	};
	this.AcceptService=function(RequestID,isAccept)
	{
		this.socket.ServiceResult(RequestID, isAccept);
	}

	
}
var cti1=new cti();


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

     