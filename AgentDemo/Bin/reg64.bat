copy /Y SocketClient.dll c:\Windows\SysWOW64
copy /Y UniSS3000X.ocx c:\Windows\SysWOW64
c:
cd c:\Windows\SysWOW64
regsvr32 UniSS3000X.ocx