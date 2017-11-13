function socket()
{
    //var wsUri ="ws://192.168.0.221:8080/echo"; 
    this.websocket=null;
    this.connect=function(IP,Port) { 
    	var wsUri ="ws://echo.websocket.org/";
    	//var wsUri ="ws://"+IP+":"+Port+"/";
    	//logger1.log("connect socket");
      this.websocket = new WebSocket(wsUri); 
      this.websocket.binaryType = "arraybuffer";
      this.websocket.onopen = function(evt) { 
          onOpen(evt); 
      }; 
      this.websocket.onclose = function(evt) { 
          onClose(evt); 
      }; 
     this.websocket.onmessage = function(evt) { 
          onMessage(evt);
      }; 
      this.websocket.onerror = function(evt) { 
          onError(evt); 
      };       
    };
    this.disconnect=function()
    {
    	this.websocket.close(); 
    };
    this.Login=function(agentID, agentGroupID, deviceAddress, password)
    {
      if (agentID == null || agentID.length == 0 ||
      deviceAddress == null || deviceAddress.length == 0 ||
      password == null || password.length == 0) //去掉了agentGroupID==NULL的判断
      {
        return false;
      }
      var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID, agentGroupID, deviceAddress, 0,password,null);
      return doSend(buff);
    };
    this.Logout=function(agentID)
    {
      if (agentID == null || agentID.length == 0)
        return false;
      var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID,0,0,0,0,0);
      return doSend(buff);
    };
    this.HangupCall=function(agentID,callID)
    {
      if (agentID == null || agentID.length == 0)
        return false;
      var buff=HangupCallPdu(ID_HANGUPCALL,agentID,callID);
      return doSend(buff);
    };
  this.MakeCall=function(agentID,callID,destination,applicationData)
  {
    if (agentID == null || agentID.length == 0 ||
      destination == null || destination.length == 0)
      return false;
    var buff=MakeCallPdu (ID_MAKECALL,agentID,callID,destination,applicationData);
    return doSend(buff);
  };
  this.AutoMakeCall=function(agentID,callID,destination,timeout,tipinfo)
  {
    if (agentID == null || agentID.length == 0 ||
      destination == null || destination.length == 0 ||
      tipinfo == null || tipinfo.length == 0)
      return false;
    var buff =AutoMakeCallPdu (ID_AUTOMAKECALL,agentID,callID,destination,tipInfo);
    return doSend(buff);
  };

  this.TransferCall=function(agentID,callID,destination,applicationData,isBlind)
  {
    if (agentID == null || agentID.length == 0 ||
        destination == null || destination.length == 0)
        return false;
      var buff=TransferCallPdu(ID_TRANSFERCALL,callID,destination,applicationData,isBlind,0,0);
      return dosend(buff);
  };

  this.ConferenceCall=function(agentID,callID,destination,applicationData)
  {
    if (agentID == null || agentID.length == 0 ||
    destination == null || destination.length == 0)
    return false;
  var buff=ConferenceCallPdu(ID_CONFERENCECALL,agentID,callID,destination,applicationData,0);
  return dosend(buff);
  };

  this.Cancel=function(agentID,callID,requestType,requestID)
  {
    if (agentID == null || agentID.length == 0)
    return false;
    var buff=CancelPdu(ID_CANCEL,agentID,null,requestType,requestID,callID);
    return doSend(buff);
  };

  this.ChangeAgentStatus=function(agentID,state,description)
  {
    if (agentID == null || agentID.length == 0)
    return false;
    var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID,null,null,state,null,description);
    return doSend(buff);
  };
  this.GetLeaveCauses=function()
  {
    var buff=LeaveCausesPdu(ID_LEAVECAUSE,0,null);
    //Initiate the data of buf
    return dosend(buff);
  };
  
  this.ChangePassword=function(agentID,oldPassword,newPassword)  
  {
    if (agentID == null || agentID.length == 0 ||
    oldPassword == null ||
    newPassword == null || newPassword.length<4)
    return false;
    var buf=ChangePasswordPdu(ID_CHANGEPASSWORD,agentID,oldPassword,newPassword);
    return dosend(buf);
  };
  
  this.SendTXTMessage=function(senderAgentID,address,message)
  {
    if (senderAgentID == null || senderAgentID.length == 0 ||
    address == null || address.length == 0 ||
    message == null)
    return false;
    var buf=InstantMessagePdu(ID_INSTANTMESSAGE,senderAgentID,address,message);
    return doSend(buf);
  };
  this.Monitor=function(agentID,deviceID)
  {
    if (agentID == null && deviceID == null)
      return false;
      var buf=MonitorPdu(ID_MONITOR,agentID,deviceID);
      return dosend(buf);
  };
  this.UnMonitor=function(agentID,deviceID)
  {
    if (agentID == null && deviceID == null)
      return false;
    var buf=UnMonitorPdu(ID_UNMONITOR,agentID,deviceID);
    return dosend(buf);
  };
  this.ServiceResult=function(requestID,isAccept)
  {
     var buf=ServiceAgentResultPdu(ID_SERVICEAGENTRESULT,requestID,isAccept); 
    return dosend (buf);
  };

}
var socket=new socket();  
 		 function onOpen(evt) { 
 		 	agent.isConnected = true;
        logger1.log("CTI服务器连接成功");
        phone.setPhoneState(phone.STATE_NOTLOGIN);
        doSend("1011110101010101010"); 
    }
    function onClose(evt) { 
        agent.isConnected =false; 
				logger1.log("与CTI服务器的连接断开");
        phone.setPhoneState(phone.STATE_NONE);
    }  
 
    function onMessage(evt) { 
        writeToScreen('收到回复消息 '+ evt.data); 
        logger1.log("收到数据长度为:"+evt.data.length);
      //socket.websocket.send(evt.data);
    }  
 
    function onError(evt) { 
    	if(websocket.readyState==3)
    	{
    	alert("CTI服务器连接失败");
    	agent.isConnected = false;
    	}
        writeToScreen('<span style="color: red;">ERROR:</span> '+ evt.data);
    }  
 
    function doSend(message) { 
        writeToScreen("SENT: " + message);  
        socket.websocket.send(message); 
        return true;
    }  
    function writeToScreen(message) { 
        logger1.log(message);
    } 
    
    function ReadMessage()
    {
    	
    }
