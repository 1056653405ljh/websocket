function socket()
{ 
    //var wsUri ="ws://192.168.0.225:8080/echo";
    this.websocket=null;
    this.connect=function(IP,Port) { 
  	var wsUri ="ws://"+IP+":"+Port+"/echo";
    this.websocket = new WebSocket(wsUri); 
    this.websocket.binaryType = "arraybuffer";
    this.websocket.onopen = function(evt) { 
        onOpen(evt); 
    }
    this.websocket.onclose = function(evt) { 
        onClose(evt); 
    }
   this.websocket.onmessage = function(evt) { 
        onMessage(evt);
    } 
    this.websocket.onerror = function(evt) { 
        onError(evt); 
    }      
  };
    this.Disconnect=function()
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
      var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID, agentGroupID, deviceAddress, 0,password,"");
      return doSend(buff);
    };
    
    this.Logout=function(agentID)
    {
      if (agentID == null || agentID.length == 0)
        return false;
      var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID,"","",AGENT_LOGOUT,"","");
      return doSend(buff);
    };
    
    this.AnswerCall=function(agentID,callID)
    {
      if (agentID == null || agentID.length == 0)
          return false;
      var buff=answerCallPdu(ID_ANSWERCALL,agentID,callID);
      return doSend(buff);
    };
    this.HangupCall=function(agentID,callID)
    {
      if (agentID == null || agentID.length == 0)
        return false;
      var buff=HangupCallPdu(ID_HANGUPCALL,agentID,callID);
      return doSend(buff);
    }; 
  this.Makecall=function(agentID,callID,destination,applicationData)
  {
    
    if (agentID == null || agentID.length == 0 ||
      destination == null || destination.length == 0)
      return false;
    var buff=MakeCallPdu(ID_MAKECALL,agentID,callID,destination,applicationData);
    return doSend(buff);
    
   return false;
  };
  this.AutoMakeCall=function(agentID,callID,destination,timeout,tipinfo)
  {
    if (agentID == null || agentID.length == 0 ||
      destination == null || destination.length == 0 ||
      tipinfo == null || tipinfo.length == 0)
      return false;
    var buff =AutoMakeCallPdu(ID_AUTOMAKECALL,agentID,callID,destination,timeout,tipinfo);
    return doSend(buff);
  };

  this.TransferCall=function(agentID,callID,destination,applicationData,isBlind)
  {
    if (agentID == null || agentID.length == 0 ||
        destination == null || destination.length == 0)
        return false;
      var buff=TransferCallPdu(ID_TRANSFERCALL,agentID,callID,"",destination,applicationData,isBlind,0,0);
      return doSend(buff);
  };

  this.ConferenceCall=function(agentID,callID,destination,applicationData)
  {
    if (agentID == null || agentID.length == 0 ||destination == null || destination.length == 0)
      return false;
    var buff=ConferenceCallPdu(ID_CONFERENCECALL,agentID,callID,destination,applicationData,0);
    return doSend(buff);
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
    var buff=SetAgentStatusPdu(ID_SETAGENTSTATUS,agentID,"","",state,"",description);
    return doSend(buff);
  };
  this.GetLeaveCauses=function()
  {
    var buff=LeaveCausesPdu(ID_LEAVECAUSE,0,"");
    //Initiate the data of buf
    return doSend(buff);
  };
  
  this.ChangePassword=function(agentID,oldPassword,newPassword)  
  {
    if (agentID == null || agentID.length == 0 ||
    oldPassword == null ||
    newPassword == null || newPassword.length<4)
    return false;
    var buf=ChangePasswordPdu(ID_CHANGEPASSWORD,agentID,oldPassword,newPassword);
    return doSend(buf);
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
      return doSend(buf);
  };
  this.UnMonitor=function(agentID,deviceID)
  {
    if (agentID == null && deviceID == null)
      return false;
    var buf=UnMonitorPdu(ID_UNMONITOR,agentID,deviceID);
    return doSend(buf);
  };
  this.ServiceResult=function(requestID,isAccept)
  {
     var buf=ServiceAgentResultPdu(ID_SERVICEAGENTRESULT,requestID,isAccept); 
    return doSend (buf);
  };
  this.ForemanExtend=function(foremanID,agentID,extendKind,appdata)
  {
    if (foremanID == null || foremanID.length == 0 || agentID == null || agentID.length == 0)
    {
      return false;
    }
     var buf=ForemanExtendPdu(ID_FOREMANEXTENDCALL,extendKind,foremanID,agentID,appdata);
    return doSend(buf);
  };

}
    var socket=new socket();  
   		 function onOpen(evt) { 
   		 	  agent.isConnected = true;
          cti.SetStatus(STATUS_CONNECTED);
          logger1.log("CTI服务器连接成功");
          phone.setPhoneState(phone.STATE_NOTLOGIN);
      }
      function onClose(evt) { 
          cti.SetStatus(STATUS_ORIGINAL);
          agent.isConnected =false; 
  				logger1.log("与CTI服务器的连接断开");
          phone.setPhoneState(phone.STATE_NONE);
      }  
      
      function onMessage(evt) { 
      //logger1.log("收到数据长度为:"+evt.data.length);
      var buff = evt.data;
      if(typeof buff!="object")
        return;
      var res = ntoh32(buff, 14);
      var eventID=res[0];
      if (eventID == ID_PING)
      {
        return;
      }
      if (eventID == ID_DEVICESTATUS)//当前分机状态，extension为分机号码，isIdle表示是空闲状态
      {
        cti.OnDeviceStatus(buff);
        return;
      }
      if (eventID == ID_CHANGEPASSWORD)
      {
        cti.HandleChangePassword();
        return;
      }
      if (eventID == ID_AGENTSTATUS)//其它坐席状态
      {
        cti.OnAgentStatus(buff);
        return;
      }
      if(eventID == ID_CONNECTIONSTATE)
      {
          cti.OnConnectionState(buff);
          return;
      }
      if(eventID == ID_INSTANTMESSAGE)//座席间发生了文字消息
      {
          cti.OnTextMessage(buff);
          return;
      }
      if(eventID == ID_LEAVECAUSE)
      {
          cti.OnLeaveCauses(buff);
          return;
      }
      switch (eventID)
      {
          case ID_AGENTLOGGEDON:
              cti.OnAgentLoggedOn(buff);
              break;

          case ID_AGENTLOGGEDOFF://成功登出消息
          {
              cti.OnAgentLoggedOff(buff);
              break;
          }
          case ID_AGENTSTATUSCHANGED://座席状态设置成功，status 0表示刚登录，1表示准备接听，3表示离开状态，4表示处理电话中，5表示登出
          {
                          
              cti.OnAgentStatusCNGed(buff);
              break;
          }
          case ID_INBOUNDCALL://座席有电话呼入
          {
              cti.OnInboundCall(buff);
              break;
          }
          case ID_TPANSWERED://当前电话已经被接听, enumcallID为呼叫标识，pickupTime为接听时间，格式YYYY-MM-DD HH:mm:ss --
          {
              cti.OnAnswered(buff);
              break;
          }

          case ID_CALLIDLE://电话被挂断
          {
              cti.OnCallIdle(buff);
              break;
          }
          case ID_DIALTONE://电话外呼已经摘机
          {
              cti.OnDialTone(buff);
              break;
          }
          case ID_TPCONFERENCED://电话已经建立起三方会话
          {
              
              cti.OnConferenced(buff)
              break;
          }
          case ID_TRANSFERED://电话被成功转移
          {
              cti.OnTransfered(buff);
              break;
          }
          case ID_NEWREQUEST:
          case ID_DISPATCHREQUEST:
          case ID_CANCELREQUEST://排队队列长度有了变化
          {
              cti.OnAgentStatistics(buff)
              break;
          }

          case ID_ERROR:
          {
            var pos=MSG_HEADER+(Uint8Array.BYTES_PER_ELEMENT)*((MAX_CALLID_LEN+1)*4+(MAX_ADDRESS+1)*6+MAX_AGENTID+MAX_GROUPID+2)+(Uint32Array.BYTES_PER_ELEMENT)*10+Float64Array.BYTES_PER_ELEMENT;
            var res=ntoh8(buff,pos,MAX_APPDATA+1);
            var applicationData=res[0];
            res=ntoh64(buff,res[1]);
            var functionid=res[0];
            res[1]=res[1]+Uint32Array.BYTES_PER_ELEMENT;
            res=ntoh32(buff,res[1]);
            var errorCode=res[0];
            cti.SetError(functionid,errorCode,applicationData)
            break;
          }
          case ID_WAITFORSERVICEAGENT:
          {
              cti.OnWaitforService(buff);
              break;
          }
          case ID_DESTBUSY://电话外呼对方忙
              cti.OnDestBusy(buff);
              break;
          case ID_FOREMANEXTENDED:
              cti.OnForemanExtend(buff);
              break;
          case ID_FOREMANEXTENDEDFORNBX:
              
              break;
          case ID_RINGBACK://电话外呼对方正在振铃
          {
              cti.OnRingBack(buff);
              break;
          }
          case ID_MONITORSUCCESS:
          {
              cti.OnMonitorSuccess(buff);
              break;
          }
          default:
          {
              cti.OnUnknownEvent(buff);
              break;
          }
      }
    }  
   
    function onError(evt) { 
    	if(socket.websocket.readyState==3)
    	{
    	alert("CTI服务器连接失败");
    	agent.isConnected = false;
    	}
        writeToScreen('<span style="color: red;">ERROR:</span> '+ evt.data);
    }  
 
    function doSend(message) { 
       // writeToScreen("SENT: " + message.byteLength);  
        //socket.websocket.send(message); 
        //message=encodeURIComponent(message);
        //var buff = new ArrayBuffer(100);
        //hton8(buff,message,0,100);
        //var res=ntoh8(buff,0,100);
        //message=decodeURIComponent(res[0],"utf-8");
        socket.websocket.send(message); 
        return true;
    }  
    function writeToScreen(message) { 
        logger1.log(message);
    } 
    
    function ReadMessage()
    {
    	
    }
function uniencode(text)
{
    if(text==null||text.length==0)
        return text;
    text = escape(text.toString()).replace(/\+/g, "%2B");
    var matches = text.match(/(%([0-9A-F]{2}))/gi);
    if (matches)
    {
        for (var matchid = 0; matchid < matches.length; matchid++)
        {
            var code = matches[matchid].substring(1,3);
            if (parseInt(code, 16) >= 128)
            {
                text = text.replace(matches[matchid], '%u00' + code);
            }
        }
    }
    text = text.replace('%25', '%u0025');
    return text;
}

