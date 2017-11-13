var	ID_SETAGENTSTATUS		= 0x1001;
var	ID_ANSWERCALL			= 0x1002;
var	ID_MAKECALL				= 0x1004;
var	ID_HOLDCALL				= 0x1005;
var	ID_RETRIEVECALL			= 0x1006;
var	ID_TRANSFERCALL			= 0x1007;
var	ID_CONFERENCECALL		= 0x1008;
var	ID_HANGUPCALL			= 0x1009;
var	ID_LEAVECONFERENCE		= 0x100A;
var	ID_CANCEL				= 0x100B;
var	ID_SETAPPDATA			= 0x100C;
var	ID_GETAPPDATA			= 0x100D;
var	ID_MONITOR				= 0x100E;
var	ID_AGENTLOGGEDON		= 0x2001;
var	ID_AGENTLOGGEDOFF		= 0x2002;
var	ID_AGENTSTATUSCHANGED	= 0x2003;
var	ID_BACKINSERVICE		= 0x2004;
var	ID_OUTOFSERVICE			= 0x2005;
var	ID_CALLINFORMATION		= 0x2006;
var	ID_DESTBUSY				= 0x2007;
var	ID_DESTCHANGED			= 0x2008;
var	ID_DESTINVALID			= 0x2009;
var	ID_DESTNOTOBTAINABLE	= 0x200A;
var	ID_DESTSEIZED			= 0x200B;
var	ID_DIVERTED				= 0x200C;
var	ID_ERROR				= 0x200D;
var	ID_INBOUNDCALL			= 0x200E;
var	ID_OFFHOOK				= 0x200F;
var	ID_OPANSWERED			= 0x2010;
var	ID_OPCONFERENCED		= 0x2011;
var	ID_OPDISCONNECTED		= 0x2012;
var	ID_OPHELD				= 0x2013;
var	ID_OPRETRIEVED			= 0x2014;
var	ID_TPANSWERED			= 0x2015;
var	ID_TPCONFERENCED		= 0x2016;
var	ID_TPDISCONNECTED		= 0x2017;
var	ID_TPSUSPENDED			= 0x2018;
var	ID_TPRETRIEVED			= 0x2019;
var	ID_CALLIDLE				= 0x201A;
var	ID_TRANSFERED			= 0x201B;
var	ID_LINEREPLY			= 0x201C;
var	ID_DIALTONE				= 0x201D;
var	ID_UNAVAILABLE			= 0x201E;
var	ID_HOLDCONF				= 0x201F;
var	ID_UNMONITOR			= 0x2020;
var	ID_APPLOG				= 0x2021;
var	ID_NEWREQUEST			= 0x2022;
var	ID_DISPATCHREQUEST		= 0x2023;
var	ID_CANCELREQUEST		= 0x2024;
var	ID_DEVICESTATUS			= 0x2025;
var	ID_CONNECTIONSTATE		= 0x2026;
var	ID_INSTANTMESSAGE		= 0x2027;
var	ID_AGENTSTATUS			= 0x2028;
var	ID_CHANGEPASSWORD		= 0x2029;
var	ID_ONTIMER				= 0x202A;
var	ID_SOCKETBROKEN			= 0x202B;
var	ID_LEAVECAUSE			= 0x202C;
var	ID_PING					= 0x202D;
var	ID_TRACESETTING			= 0x202E;
var	ID_CALLDETAIL			= 0x202F;
var	ID_TIMEOUTED			= 0x2030;
var	ID_RINGBACK				= 0x2031;
var	ID_STOPMUSIC			= 0x2032;
var	ID_OPTRANSFERED         = 0x2033;
var	ID_SETTIMER             = 0x2034;
var	ID_HOLDCONFERENCE       = 0x2035;
var	ID_HOLDTRANSFER         = 0x2036;
var	ID_LOCKFREEAGENT		= 0x2037;
var	ID_TRANSFERTOAGENT		= 0x2038;
var	ID_ROUTEREQUEST         = 0x2039;
var	ID_TSAPIROUTE_END       = 0x203A;	
var	ID_PREVIOUSSERVICEAGENT	= 0x203B;
var	ID_WAITFORSERVICEAGENT	= 0x203C;
var	ID_SERVICEAGENTRESULT	= 0x203D;	
var	ID_GETCURRENTSTATUS		= 0x203E;
var ID_HTMLREQUEST          = 0x203F;  // 针对团购添加的补丁，通过网页返回转移的号码
var	ID_OVERFLOW_DATA        = 0x2040;  // 虚拟路由点超时溢出
var	ID_VIPPriorityQueue     = 0x2041;  // VIP号码优先转移
var	ID_FOREMANEXTENDCALL    = 0x2042;  // 班长扩展功能(监听、强插、强转)
var	ID_FOREMANEXTENDED      = 0x2043;  // 班长扩展功能事件ID
var	ID_IVRANSWERCALL        = 0x2044;  // CTI控制IVR的接听 Build.1001
var	ID_IVRDROPCALL          = 0x2045;  // CTI控制IVR的挂断 Build.1001
var	ID_IVRGATHERDIGITS      = 0x2046;  // CTI监听DTMF按键  Build.1001
var	ID_IVRDIGITSGATHERED    = 0x2047;  // CTI监听DTMF按键完成 Build.1001
var	ID_FOREMANEXTENDFORNBX  = 0x2048;  // 班长扩展功能(针对NBX) Build.1003
var	ID_MONITORPASSWORDFORNBX= 0x2049;  // 班长特有功能操作密码(针对NBX) Build.1003
var	ID_EXTENSIONNEEDEDFORNBX= 0x204A;  // 班长管理的号码(针对NBX) Build.1003
var	ID_FOREMANEXTENDEDFORNBX= 0x204B;  // 班长管理功能返回事件 Build.1003
var	ID_AGENTMONITORFORNBX   = 0x204C;  // 班长管理功能监控 Build.1003
var	ID_IVRANSWERED          = 0x204D;  // IVR接听完成   Build.1009
var	ID_REDIRECTCALL			= 0x204E;  // DND状态下转其他号码 4.20.1028
var	ID_QUEUEINFO			= 0x204F;  // 获取当前排队的所有信息 4.20.1028

var	ID_QUITDISPATCH			= 0x2050;
var	ID_MONITORSUCCESS		= 0x2051;	//2014-11-24-ADD-ZOUWENBO添加监听成功事件，并在返回事件中回传EnumCallID
var	ID_CLEAR				= 0x2052;	//ADD_ZOUWENBO+20150311+01+"专门用于清除呼叫相关信息（与call_idle的不同之处ID_CLEAR主要用于在被叫接听前，主叫显示点击取消的情况）"
var	ID_JOINACD				= 0X2053;	//ADD_ZOUWENBO+20150424+01+"电话进入离开ACD队列"
var	ID_LEAVEACD				= 0X2054;
var	ID_AUTOMAKECALL			= 0X2055;	//ADD_ZOUWENBO+20150507+01+"主要用于解决调度平台中的问题"
var	ID_ABANDONACD			= 0X2066;
var	ID_DTMF					= 0X2067;


var MAX_AGENTID  = 6;
var MAX_GROUPID   =  6;
var MAX_AGENTNAME  = 32;
var MAX_PASSWORD    =8;
var MAX_DESCRIPTION  = 20;
var MAX_ADDRESS     =16;
var MAX_APPDATA     =1024;
var MAX_INFO         =   256;
var MAX_CALLID_LEN    =64;
var MAX_CHANNEL_LEN   =64;
var MAX_QUEUE_LEN   =64;
var MAX_CAUSE_LEN   =32;
var MSG_HEADER      =14;


var TYPE_INBOUND		= 0;
var	TYPE_TRANSFERED		= 1;
var	TYPE_CONFERENCED	= 2;
var	TYPE_OUTBOUND		= 3;


var	TYPE_NONE = -1;
var	TYPE_QUEUE_DISTRIBUTE=0; // 队列中转移过来
var	TYPE_AGENT_TRANSFER=1;   // 表示坐席转移过来的电话
var	TYPE_AGENT_INBOUND=2;   // 没有通过转移，直接呼来的
var	TYPE_AGENT_OUTBOUND=3;   // 外呼
var	TYPE_AGENT_CONFERENED=4; // 表示坐席三方过来的电话


var	AGENT_LOGIN=0; // 登录状态
var	AGENT_READY=1; // 接听状态
var	AGENT_WORKREADY=2; // 接听状态
var	AGENT_NOTREADY=3;  // 离开状态，例如：离开，用餐等
var	AGENT_WORKNOTREADY=4; // 处理电话中
var	AGENT_LOGOUT=5; // 登出状态


var FUNCTION_CONNECT=				0x00000001;
var FUNCTION_DISCONNECT	=			0x00000002;
var FUNCTION_LOGIN	=				0x00000004;
var FUNCTION_LOGOUT	=				0x00000008;
var FUNCTION_CHANGEAGENTSTATUS=		0x00000010;
var FUNCTION_ANSWER	=				0x00000020;
var FUNCTION_HANGUP	=				0x00000040;
var FUNCTION_TRANSFER=				0x00000080;
var FUNCTION_CONFERENCE	=			0x00000100;
var FUNCTION_MAKECALL	=			0x00000200;
var FUNCTION_CANCEL	=				0x00000400;
var FUNCTION_CHANGEAGENTPASSWORD=	0x00000800;
var FUNCTION_SENDTEXTMESSAGE=		0x00001000;
var	FUNCTION_STARTMONITOR=			0x00002000;
var	FUNCTION_STOPMONITOR=			0x00004000;
var FUNCTION_KICKOUT=               0x00008000;
var FUNCTION_GETLEAVECAUSE=         0x00010000;
var FUNCTION_INTRUDE=				0x00020000;
var FUNCTION_REDIRECT=				0x00040000;
var FUNCTION_DIAL=					0x00080000;
var FUNCTION_COMPLETETRANSFER=		0x00100000;
var FUNCTION_HOLD=					0x00200000;
var FUNCTION_UNHOLD					0x00400000;
var FUNCTION_LOCKFREEAGENT=			0x00800000;
var FUNCTION_TRANSFERTOAGENT=		0x01000000;
var FUNCTION_IVRANSWER =            0x02000000;
var FUNCTION_IVRDROP =              0x04000000;
var FUNCTION_IVRGATHERDIGITS=       0x08000000;
var FUNCTION_NBXFEATUREPASSWORD=    0x00000011;
var FUNCTION_NBXEXTENSIONNEEDED=    0x00000021;
var FUNCTION_AUTOMAKECALL=			0x00000031;

var STATUS_ORIGINAL =     0x00000000;
var STATUS_CONNECTING =   0x00000001;
var STATUS_CONNECTED=     0x00000002;
var STATUS_LOGGING =      0x00000003;
var STATUS_LOGGEDIN =     0x00000004;
var STATUS_READY =        0x00000005;

var STATUS_WAITPASSWORDCNG =     0x00000006;
var STATUS_WAITLOGOUT =          0x00000007;
var STATUS_WAITKICKOUT =         0x00000008;
var STATUS_WAITLEAVECAUSE =      0x00000009;


var STATUS_INBOUNDING =          0x00000010;
var STATUS_CALLMAKING  =         0x00000011;
var STATUS_TRANSFERING =         0x00000012;
var STATUS_CONFERENCING =        0x00000013;



var STATUS_WAITANSWER =          0x00000021;
var STATUS_ANSWERING =           0x00000022;

var MESSAGEBUFFERLENGTH =         20;


function getArrayBuff() {
  var nums = arguments.length;
  var totalLength = 0;
  for (var i=0; i<nums; ++i) {
      if (("INT8"==arguments[i][0]) || ("UINT8"==arguments[i][0])) {
        totalLength += Uint8Array.BYTES_PER_ELEMENT * arguments[i][1];
      }
      else if (("INT16"==arguments[i][0]) || ("UINT16"==arguments[i][0])) {
        totalLength += Uint16Array.BYTES_PER_ELEMENT * arguments[i][1];
      }
      else if (("INT32"==arguments[i][0]) || ("UINT32"==arguments[i][0])) {
        totalLength += Uint32Array.BYTES_PER_ELEMENT * arguments[i][1];
      }
      else if (("INT64"==arguments[i][0]) || ("UINT64"==arguments[i][0])) {
        totalLength += 8 * arguments[i][1];
      }
      else if ("FLOAT32"==arguments[i][0]) {
        totalLength += Float32Array.BYTES_PER_ELEMENT * arguments[i][1];
      }
      else if ("FLOAT64"==arguments[i][0]) {
        totalLength += Float64Array.BYTES_PER_ELEMENT * arguments[i][1];
      }
  }
    //分配所需内存
  var buff = new ArrayBuffer(totalLength);
  return buff;
}

function write_delimiter(buff) {
  var len = 10;
  var i8View = new Uint8Array(buff, 0, len);
  for (var i=0; i<len; i++) {
       i8View[i] = 255;
  }
}

function hton8(buff, val, pos, len) {
  var i8View = new Uint8Array(buff, pos, len);
  for (var i=0, strLen=val.length; i<strLen; i++) {
       i8View[i] = val.charCodeAt(i);
  }
  return pos + len;
}


function hton16(buff, val, pos) {
   var i16NetView = new DataView(buff);
   if (val < 0) {
      i16NetView.setInt16(pos, val, false);
   }
   else {
      i16NetView.setUint16(pos, val, false);
   }
   return pos + Uint16Array.BYTES_PER_ELEMENT;
}

function hton32(buff, val, pos) {
   var i32NetView = new DataView(buff);
   if (val < 0) {
      i32NetView.setInt32(pos, val, false);
   }
   else {
      i32NetView.setUint32(pos, val, false);
   }
   
   return pos + Uint32Array.BYTES_PER_ELEMENT;
}

function hton64(buff, val, pos) {
    var  mask =  0x00000000000000ff;
    var  i8NetView = new Uint8Array(buff, pos, 8);

    for (var i = 0; i<8; ++i) {
      i8NetView[i] = val & mask;
      val = val >> 8;
    }

   return pos + i8NetView.byteLength;
}

function ntoh8(buff, pos, len) {
   var res = String.fromCharCode.apply(null, new Uint8Array(buff, pos, len));
   return [res, pos+len];
}

function ntoh16(buff, pos) {
    var dv = new DataView(buff);
    var res = dv.getInt16(pos, true);
    return [res, pos+Int16Array.BYTES_PER_ELEMENT];
}

function ntoh32(buff, pos) {
    var dv = new DataView(buff);
    var res = dv.getInt32(pos, true);
    return [res, pos+Int32Array.BYTES_PER_ELEMENT];
}

function ntoh32f(buff, pos) {
    var dv = new DataView(buff);
    var res = dv.getFloat32(pos, true);
    return [res, pos+Float32Array.BYTES_PER_ELEMENT];
}

function ntoh64(buff, pos) {

    var val = 0;
    var  i8LocalView = new Uint8Array(8);
    var  dv = new DataView(buff);

    for (var i = 0; i<8; ++i) {
      i8LocalView[i] = dv.getInt8(pos+i)
    }

    for (var i=7; i>=0; --i) {
      val <<= 8;
      val = val | i8LocalView[i];
    }   

    return [val, pos+8];
}


function SetAgentStatusPdu(eventID,agentID,agentGroupID,deviceAddress,state,password,description)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1], 
	["UINT8", MAX_GROUPID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", 1],
	["UINT8", MAX_PASSWORD+1],
	["UINT8", MAX_DESCRIPTION+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, agentGroupID, prevEndPos, MAX_GROUPID+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, state, prevEndPos,1);
	prevEndPos = hton8(buff, password, prevEndPos,MAX_PASSWORD+1);
	prevEndPos = hton8(buff, description, prevEndPos, MAX_DESCRIPTION+1);
	return buff;
	
}


function answerCallPdu(eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1], 
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	console.log("len:"+buff.byteLength);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID, prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos, MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	return buff;
}

function MakeCallPdu (eventID,agentID,callID,destination,applicationData)
{
var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, destination, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	return buff;
	
}

function HoldCallPdu(eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1], 
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID, prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos, MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	return buff;
}

function RetrieveCallPdu(eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1], 
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID, prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos, MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	return buff;

}

function TransferCallPdu(eventID,agentID,callID,deviceAddress,destination,applicationData,isBlind,timeout,priority)
{
	
   var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1],
	["UINT8", 1],
	["UINT32", 1], 
	["UINT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, destination, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	prevEndPos = hton8(buff, isBlind, prevEndPos, 1);
	prevEndPos = hton32(buff, timeout,prevEndPos);
	prevEndPos = hton32(buff, priority,prevEndPos);
	return buff;
}

function LockFreeAgentPdu(eventID,callID,deviceAddress,destination,applicationData,timeout,priority)
{
	
    var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1],
	["UINT32", 1], 
	["UINT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, destination, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	prevEndPos = hton32(buff, timeout,prevEndPos);
	prevEndPos = hton32(buff, priority,prevEndPos);
	return buff;
}

function TransferToAgentPdu(eventID,callID,deviceAddress,applicationData,timeout)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1],
	["UINT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	prevEndPos = hton32(buff, timeout,prevEndPos);
	return buff;
}

function ConferenceCallPdu(eventID,agentID,callID,destination,applicationData,timeout)
{
    var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1],
	["UINT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, destination, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	prevEndPos = hton32(buff, timeout,prevEndPos);
	return buff;
}

function HangupCallPdu(eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);	
	return buff;
}

function LeaveConferencePdu(eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);	
	return buff;
}

function CancelPdu( eventID,agentID,deviceAddress,requestType,requestID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT32", 1], 
	["UINT32", 1],
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton32(buff, requestType,prevEndPos);
	prevEndPos = hton32(buff, requestID,prevEndPos);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);	
	return buff;
}
function SetApplicationDataPdu(eventID,agentID,callID,applicationData)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_APPDATA+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
	hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
	return buff;
}

function GetApplicationDataPdu (eventID,agentID,callID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);	
	return buff;
}
function MonitorPdu (eventID,agentID,deviceID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	hton8(buff, deviceID, prevEndPos, MAX_ADDRESS+1);	
	return buff;
}
function UnMonitorPdu (eventID,agentID,deviceID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	hton8(buff, deviceID, prevEndPos, MAX_ADDRESS+1);	
	return buff;
}
function SocketBrokenPdu (eventID,ip)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", 32]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton8(buff, ip, prevEndPos,32);
	return buff;
}
function ApplicationLogPdu (eventID,agentID,logLevel,info)	// 0: eroror, 1 warning, 2 trace, 3 alwaysinfo)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT32", 1],
	["UINT8", MAX_APPDATA+512+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton32(buff, logLevel,prevEndPos);
	hton8(buff, info, prevEndPos, MAX_APPDATA+512+1);	
	return buff;
}
function HtmlPDU(eventID,callID,callingNbr,agentID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_AGENTID+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID, prevEndPos,MAX_CALLID_LEN+1)
	prevEndPos = hton8(buff, callingNbr, prevEndPos,MAX_ADDRESS+1);
	hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);	
	return buff;
}

//Add: 2006-12-11
function VRPOutDataPDU(eventID,callID,type,destination)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_CALLID_LEN+1],
	["INT32",1],
	["UINT8", MAX_ADDRESS+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID, prevEndPos,MAX_CALLID_LEN+1)
	prevEndPos = hton32(buff, type,prevEndPos);
	prevEndPos = hton8(buff, destination, prevEndPos,MAX_ADDRESS+1);	
	return buff;
}
//Add: 2006-12-12
function VIPNumberPDU(eventID,callID,level,callingNbr,timeout)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_CALLID_LEN+1],
	["UINT32", 1],
	["UINT8", MAX_ADDRESS+1],
	["INT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID, prevEndPos,MAX_CALLID_LEN+1)
	prevEndPos = hton32(buff, level,prevEndPos);
	prevEndPos = hton8(buff, callingNbr, prevEndPos,MAX_ADDRESS+1);
	hton8(buff, timeout, prevEndPos);	
	return buff;
}
function ConnectionStatePdu (eventID,state)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	hton8(buff, state, prevEndPos);	
	return buff;
}
function InstantMessagePdu (eventID,agentID,address,message)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_APPDATA+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, address, prevEndPos,MAX_ADDRESS+1);
	hton8(buff, message, prevEndPos,MAX_APPDATA+1);	
	return buff;
}
function AgentStatusPdu(eventID,agentName,agentID,deviceAddress,loginTime,state,cause)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTNAME+1],
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", 32],
	["UINT8", 1],
	["UINT8", MAX_DESCRIPTION+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentName, prevEndPos,MAX_AGENTNAME+1);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, loginTime, prevEndPos,32);
	prevEndPos = hton8(buff, state, prevEndPos,1);
	hton8(buff, cause, prevEndPos,MAX_DESCRIPTION+1);	
	return buff;
}
function DeviceStatusPdu(eventID,deviceAddress,type,role,status)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_ADDRESS+1],
	["UINT8", 12],
	["UINT8", 12],
	["UINT8", 12]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, deviceAddress, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, type, prevEndPos,12);
	prevEndPos = hton8(buff, role, prevEndPos,12);
	hton8(buff, status, prevEndPos,12);
	
	return buff;
}
function CallDetailPdu(eventID,callingNumber,calledNumber,agentID,fromRoutePoint,toRoutePoint,beginTime,pickupTime,endTime,isInbound,enumcallID,isAgentHangupFirst)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", 32],
	["UINT8", 32],
	["UINT8", 32],
	["UINT8", 1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", 1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callingNumber, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, calledNumber, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, fromRoutePoint, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, toRoutePoint, prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, beginTime, prevEndPos,32);
	prevEndPos = hton8(buff, pickupTime, prevEndPos,32);
	prevEndPos = hton8(buff, endTime, prevEndPos,32);
	prevEndPos = hton8(buff, isInbound, prevEndPos,1);
	prevEndPos = hton8(buff, enumcallID, prevEndPos,MAX_CALLID_LEN+1);
	hton8(buff, isAgentHangupFirst, prevEndPos,1);
	
	return buff;
}
function ChangePasswordPdu (eventID,agentID,oldPassword,newPassword)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_PASSWORD+1],
	["UINT8", MAX_PASSWORD+1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, oldPassword, prevEndPos,MAX_PASSWORD+1);
	hton8(buff, newPassword, prevEndPos,MAX_PASSWORD+1);	
	return buff;
}
function OnTimerPdu (eventID,timerEventID,data)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT32", 1],
	["UINT8", 1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, timerEventID, prevEndPos);
	prevEndPos = hton8(buff, data, prevEndPos,1);	
	return buff;	
}
function LeaveCausesPdu (eventID,count,data)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT32", 1],
	["UINT8", 1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, count, prevEndPos);
	prevEndPos = hton8(buff, data, prevEndPos,1);	
	return buff;
}

function	LeaveCause (causeID,cuase)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", 81]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, causeID,prevEndPos);
	prevEndPos = hton8(buff, cause, prevEndPos,81);	
	return buff;
}

function TraceSettingPdu (eventID,traceOn,traceSetting)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", 1],
	["UINT32", 1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, traceOn, prevEndPos,1);
	hton32(buff, traceSetting, prevEndPos);	
	return buff;
}

function RouteRequestPdu(eventID,callID,routeRegisterReqID,routingCrossRefID,routepoint,calling)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1],
	["UINT8", MAX_CALLID_LEN+1], 
	["INT64", 1],
	["INT64", 1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_ADDRESS+1],
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID, prevEndPos,MAX_CALLID_LEN+1);
	prevEndPos = hton64(buff, routeRegisterReqID,prevEndPos);
	prevEndPos = hton64(buff, routingCrossRefID, prevEndPos);
	prevEndPos = hton8(buff, routepoint,prevEndPos,MAX_ADDRESS+1);
	hton8(buff, callID, calling,MAX_ADDRESS+1);
	return buff;
}
function RouteEndPdu(eventID,routeRegisterReqID,routingCrossRefID)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT64", 1],
	["INT64", 1]
	);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton64(buff, routeRegisterReqID,prevEndPos);
	hton64(buff, routingCrossRefID, prevEndPos);
	return buff;
}
function PreviousServiceAgentPdu (eventID,callID,callingNbr,agentID,timeout)

{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_AGENTID+1],
	["INT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, callID,prevEndPos,MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, callingNbr,prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton8(buff, agentID,prevEndPos,MAX_AGENTID+1);
	hton32(buff, timeout, prevEndPos);
	return buff;
}
function ServiceAgentResultPdu (eventID,requestID,isAccept)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT32", 1],
	["UINT8", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, requestID,prevEndPos);
	hton8(buff, isAccept,prevEndPos);
	return buff;
}
function GetCurrentStatusPdu (eventID,totalActiveOutboundAgents,freeOutboundAgents,freeBothAgents,totalIvrPorts,freeIvrPorts,inQueueNumber,threshold)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT32", 1],
	["INT32", 1],
	["INT32", 1],
	["INT32", 1],
	["INT32", 1],
	["INT32", 1],
	["INT32", 1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, totalActiveOutboundAgents,prevEndPos);
	prevEndPos = hton32(buff, freeOutboundAgents,prevEndPos);
	prevEndPos = hton32(buff, freeBothAgents,prevEndPos);
	prevEndPos = hton32(buff, totalIvrPorts,prevEndPos);
	prevEndPos = hton32(buff, freeIvrPorts,prevEndPos);
	prevEndPos = hton32(buff, inQueueNumber,prevEndPos);
	prevEndPos = hton32(buff, threshold,prevEndPos);
	return buff;
}
// CTI控制IVR接听数据包 Build.1001  
function IVRAnswerCallPdu(eventID,deviceAddress)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_ADDRESS+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	hton8(buff, deviceAddress,prevEndPos,MAX_ADDRESS+1);
	return buff;
}

// CTI控制IVR挂断数据包 Build.1001
function IVRDropCallPdu(eventID,deviceAddress)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_ADDRESS+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	hton8(buff, deviceAddress,prevEndPos,MAX_ADDRESS+1);
	return buff;
}
// CTI接收DTMF按键 Build.1001
function IVRGatherDigitsPdu(eventID,deviceAddress,length,terminateDigit)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["UINT8", MAX_ADDRESS+1],
	["UINT32", 1], 
	["UINT8", 10]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, deviceAddress,prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton32(buff, length,prevEndPos);
	prevEndPos = hton8(buff, terminateDigit,prevEndPos,10);
	return buff;
}
// 班长扩展功能包结构(针对AVX)
function ForemanExtendPdu (eventID,extendKind,foremanID,agentID,appdata)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_APPDATA+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, extendKind,prevEndPos);
	prevEndPos = hton8(buff, foremanID,prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, agentID,prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, appdata,prevEndPos,MAX_APPDATA+1);
	return buff;
}
// 班长扩展功能包结构(针对NBX) Build.1003
function ForemanExtendForNBXPdu(eventID,extendKind,	foremanID,agentID,huntgroup,password)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1], 
	["INT32", 1], 
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT8", MAX_PASSWORD+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton32(buff, extendKind,prevEndPos);
	prevEndPos = hton8(buff, foremanID,prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, agentID,prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, huntgroup,prevEndPos,MAX_ADDRESS+1);
	hton8(buff, password,prevEndPos,MAX_PASSWORD+1);
	return buff;
}
//ADD_ZOUWENBO+20150507+02+"为自动调度平台添加"
function AutoMakeCallPdu (eventID,agentID,callID,destination,tipInfo)
{
	var buff = getArrayBuff(["UINT8", 10], 
	["UINT32", 1], 
	["UINT32", 1],  
	["UINT8", MAX_AGENTID+1],
	["UINT8", MAX_CALLID_LEN+1],
	["UINT8", MAX_ADDRESS+1],
	["UINT32", 1],
	["UINT8", MAX_CALLID_LEN+1]);
	write_delimiter(buff);
	var prevEndPos = hton32(buff, buff.byteLength-MSG_HEADER,10);
	prevEndPos = hton32(buff, eventID,prevEndPos);
	prevEndPos = hton8(buff, agentID,prevEndPos,MAX_AGENTID+1);
	prevEndPos = hton8(buff, callID,prevEndPos,MAX_CALLID_LEN+1);
	prevEndPos = hton8(buff, destination,prevEndPos,MAX_ADDRESS+1);
	prevEndPos = hton32(buff, timeout,prevEndPos);
	hton8(buff, tipInfo,prevEndPos,MAX_CALLID_LEN+1);
	return buff;
}

function NotificationPdu(	)	
/*eventID;	// EventIDEnum  
	char		callID[MAX_CALLID_LEN+1];
	char		remoteCallID[MAX_CALLID_LEN + 1];
	char		oldcallID[MAX_CALLID_LEN+1];
	char		secondcallID[MAX_CALLID_LEN+1];
	uint		device;		// NOT for client use
	uint		callState;	// CallStateEnum in ICall.h
	uint		callType;	// CallTypeEnum, for ID_CALLINFORMATION only
	uint		originalCallingPartyType;	// not used now
	char		originalCallingParty[MAX_ADDRESS+1];
	uint		originalCalledPartyType;	// not used now
	char		originalCalledParty[MAX_ADDRESS+1];
	uint		currentCallingPartyType;	// not used now
	char		currentCallingParty[MAX_ADDRESS+1];
	uint		currentCalledPartyType;		// not used now
	char		currentCalledParty[MAX_ADDRESS+1];
	uint		monitorPartyType;			// not used now
	char		monitorParty[MAX_ADDRESS+1];	// not used now
	char        dnis[MAX_ADDRESS+1];    
	uint		agentStatus;
	uint		isMonitor;					// 1 yes, 0 no
	char		agentID[MAX_AGENTID+1];
	char		agentGroupID[MAX_GROUPID+1];
	char		applicationData[MAX_APPDATA+1];
	long		function;
	uint		asyncHandle;		// used by server side only
	ErrorCodeEnum	errorCode;
	// 新建的一个EnumCallID列，表示一个唯一的呼叫
	char		enumcallID[MAX_CALLID_LEN+1];
	char        currentTime[32];
	char		localChannel[MAX_CHANNEL_LEN+1];
	char		remoteChannel[MAX_CHANNEL_LEN+1];
	char		queueName[MAX_ADDRESS+1];
	unsigned int queueMembers;
	unsigned int memberPostion;
	int			holdTime;
	int			dtmf;)
*/
{
	 var buff = getArrayBuff(["UINT8", 10], 
      ["UINT32", 1], 
      ["UINT32", 1], 
      ["UINT8", MAX_CALLID_LEN+1], 
      ["UINT8", MAX_CALLID_LEN+1],
      ["UINT8", MAX_CALLID_LEN+1], 
      ["UINT8", MAX_CALLID_LEN+1],
      //["FLOAT64", 1], 
      ["UINT64",1],
      ["UINT32", 1],
      ["UINT32", 1], 
      ["UINT32", 1],
      ["UINT8", MAX_ADDRESS+1], 
      ["UINT32", 1],
      ["UINT8", MAX_ADDRESS+1], 
      ["UINT32", 1],
      ["UINT8", MAX_ADDRESS+1], 
      ["UINT32", 1],
      ["UINT8", MAX_ADDRESS+1], 
      ["UINT32", 1],
      ["UINT8", MAX_ADDRESS+1], 
      ["UINT8", MAX_ADDRESS+1],
      ["UINT32", 1],
      ["UINT32", 1],

      ["UINT8", MAX_AGENTID+1], 
      ["UINT8", MAX_GROUPID+1],
      ["UINT8", MAX_APPDATA+1],
      //["FLOAT64",1], 
       ["UINT64",1],
      ["UINT32",1],
      ["INT32",1], 
      ["UINT8", MAX_CALLID_LEN+1], 
      ["UINT8", 32],
      ["UINT8", MAX_CHANNEL_LEN+1], 
      ["UINT8", MAX_CHANNEL_LEN+1],
      ["UINT8", MAX_QUEUE_LEN+1], 
      ["UINT32", 1],
      ["UINT32", 1], 
      ["INT32", 1],
      ["INT32", 1],
      ["UINT8", MAX_CALLID_LEN+1],
      ["UINT8", MAX_CAUSE_LEN+1]);
    write_delimiter(buff);
    var prevEndPos = hton32(buff, 6666,10);
    prevEndPos = hton32(buff, 1, prevEndPos);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    //prevEndPos = hton64f(buff, 2, prevEndPos);
    prevEndPos = hton64(buff, 2, prevEndPos);
    prevEndPos = hton32(buff, 3, prevEndPos);
    prevEndPos = hton32(buff, 4, prevEndPos);
    prevEndPos = hton32(buff, 5, prevEndPos);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, 6, prevEndPos);
  
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, 7, prevEndPos);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, 8, prevEndPos);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, 9, prevEndPos);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton32(buff, 10, prevEndPos);
	prevEndPos = hton32(buff, 11, prevEndPos);
	prevEndPos = hton8(buff, "client", prevEndPos, MAX_AGENTID+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_GROUPID+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_APPDATA+1);
 	//prevEndPos = hton64f(buff, 12, prevEndPos);
 	prevEndPos = hton64(buff, 12, prevEndPos);
 	prevEndPos = hton32(buff, 13, prevEndPos);
 	prevEndPos = hton32(buff, 14, prevEndPos);
 	prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, 32);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CHANNEL_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_CHANNEL_LEN+1);
    prevEndPos = hton8(buff, "client", prevEndPos, MAX_QUEUE_LEN+1);   
	prevEndPos = hton32(buff, 15, prevEndPos);
	prevEndPos = hton32(buff, 16, prevEndPos);
	prevEndPos = hton32(buff, 17, prevEndPos);
	prevEndPos =hton32(buff, 18, prevEndPos);
	prevEndPos = hton8(buff, "client", prevEndPos, MAX_CALLID_LEN+1);
    hton8(buff, "client", prevEndPos, MAX_CAUSE_LEN+1);
    /*
    prevEndPos = hton32(buff, eventID, prevEndPos);
    prevEndPos = hton8(buff, callID, prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, remoteCallID, prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, oldcallID, prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, secondcallID, prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton32(buff, device, prevEndPos);
    prevEndPos = hton32(buff, callState, prevEndPos);
    prevEndPos = hton32(buff, callType, prevEndPos);
    prevEndPos = hton32(buff, originalCallingPartyType, prevEndPos);
    prevEndPos = hton8(buff, originalCallingParty, prevEndndPos);
    Pos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, originalCalledPartyType, prevE
    prevEndPos = hton8(buff, originalCalledParty, prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, currentCallingPartyType, prevEndPos);
    prevEndPos = hton8(buff, currentCallingParty, prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, currentCalledPartyType, prevEndPos);
    prevEndPos = hton8(buff, currentCalledParty, prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton32(buff, monitorPartyType, prevEndPos);
    prevEndPos = hton8(buff, monitorParty, prevEndPos, MAX_ADDRESS+1);
    prevEndPos = hton8(buff, dnis, prevEndPos, MAX_ADDRESS+1);
	prevEndPos = hton32(buff, agentStatus, prevEndPos);
	prevEndPos = hton32(buff, isMonitor, prevEndPos);
	prevEndPos = hton8(buff, agentID, prevEndPos, MAX_AGENTID+1);
    prevEndPos = hton8(buff, agentGroupID, prevEndPos, MAX_GROUPID+1);
    prevEndPos = hton8(buff, applicationData, prevEndPos, MAX_APPDATA+1);
 	prevEndPos = hton64(buff, function1, prevEndPos);
 	prevEndPos = hton32(buff, asyncHandle, prevEndPos);
 	prevEndPos = hton16s(buff, errorCode, prevEndPos);
 	prevEndPos = hton8(buff, enumcallID, prevEndPos, MAX_CALLID_LEN+1);
    prevEndPos = hton8(buff, currentTime, prevEndPos, 32);
    prevEndPos = hton8(buff, localChannel, prevEndPos, MAX_CHANNEL_LEN+1);
    prevEndPos = hton8(buff, remoteChannel, prevEndPos, MAX_CHANNEL_LEN+1);
    prevEndPos = hton8(buff, queueName, prevEndPos, MAX_ADDRESS+1);   
	prevEndPos = hton32(buff, queueMembers, prevEndPos);
	prevEndPos = hton32f(buff, memberPostion, prevEndPos);
	prevEndPos = hton32f(buff, holdTime, prevEndPos);
 	hton32(buff, dtmf, prevEndPos);
 	*/
    return buff;
}



function recv_NotificationPdu(evt) {

  var buff = evt.data;
  var res = ntoh32(buff, 14);
   console.log("eventID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);
   console.log("callID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);
   console.log("remoteCallID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);
   console.log("oldcallID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);   
   console.log("secondcallID=" + res[0]);  

   //res = ntoh64f(buff, res[1]);
   res = ntoh64(buff, res[1]);   
   console.log("device=" + res[0]);  

   res = ntoh32(buff, res[1]);   
   console.log("callState=" + res[0]); 
   res = ntoh32(buff, res[1]);   
   console.log("callType=" + res[0]); 
   res = ntoh32(buff, res[1]);   
   console.log("originalCallingPartyType=" + res[0]); 

   res = ntoh8(buff, res[1],MAX_ADDRESS+1);
   console.log("originalCallingParty=" + res[0]); 

   res = ntoh32(buff, res[1]); 
   console.log("originalCalledPartyType=" + res[0]); 
  
   res = ntoh8(buff, res[1], MAX_ADDRESS+1);
   console.log("originalCalledParty=" + res[0]); 
   
   res = ntoh32(buff, res[1]); 
   console.log("currentCallingPartyType=" + res[0]); 
   
   res = ntoh8(buff, res[1], MAX_ADDRESS+1);
   console.log("currentCallingParty=" + res[0]);

   res = ntoh32(buff, res[1]); 
   console.log("currentCalledPartyType=" + res[0]); 

   res = ntoh8(buff, res[1], MAX_ADDRESS+1);
   console.log("currentCalledParty=" + res[0]);

   res = ntoh32(buff, res[1]); 
   console.log("monitorPartyType=" + res[0]); 
   res = ntoh8(buff, res[1], MAX_ADDRESS+1);
   console.log("monitorParty=" + res[0]);

   res = ntoh8(buff, res[1], MAX_ADDRESS+1);
   console.log("dnis=" + res[0]);

   res = ntoh32(buff, res[1]); 
   console.log("agentStatus=" + res[0]); 

   res = ntoh32(buff, res[1]); 
   console.log("isMonitor=" + res[0]); 

   res = ntoh8(buff, res[1], MAX_AGENTID+1);
   console.log("agentID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_GROUPID+1);
   console.log("agentGroupID=" + res[0]);

   res = ntoh8(buff, res[1], MAX_APPDATA+1);
   console.log("applicationData=" + res[0]);

   //res = ntoh64f(buff, res[1]); 
   res = ntoh64(buff, res[1]);
   console.log("function=" + res[0]); 

   res = ntoh32(buff, res[1]); 
   console.log("asyncHandle=" + res[0]); 

   res = ntoh32(buff, res[1]); 
   console.log("errorCode=" + res[0]); 

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);
   console.log("enumcallID=" + res[0]);
   res = ntoh8(buff, res[1], 32);
   console.log("currentTime=" + res[0]);
   res = ntoh8(buff, res[1], MAX_CHANNEL_LEN+1);
   console.log("localChannel=" + res[0]);
   res = ntoh8(buff, res[1], MAX_CHANNEL_LEN+1);
   console.log("remoteChannel=" + res[0]);
   res = ntoh8(buff, res[1], MAX_QUEUE_LEN+1);
   console.log("queueName=" + res[0]);

   res = ntoh32(buff, res[1]); 
   console.log("queueMembers=" + res[0]);
   res = ntoh32(buff, res[1]); 
   console.log("memberPostion=" + res[0]);

   res = ntoh32(buff, res[1]); 
   console.log("holdTime=" + res[0]);
   res = ntoh32(buff, res[1]); 
   console.log("dtmf=" + res[0]);

   res = ntoh8(buff, res[1], MAX_CALLID_LEN+1);
   console.log("pbxUniqueID=" + res[0]);
   res = ntoh8(buff, res[1], MAX_CAUSE_LEN+1);
   console.log("leaveQueueCause=" + res[0]);
  }