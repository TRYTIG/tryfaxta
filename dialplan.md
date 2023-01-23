# Example dialplan

```
[from-phonesys]
exten => s,1,Answer() ; New call, pickup
same => n,Playback(hello-world)
same => n,Set(TmpFaxDest=/var/spool) ; Set temp fax dest
same => n,Set(EpochAnswerTime=${EPOCH}) ; Set the answer time
same => n,Set(CallerNumber=${CALLERID(num)}) ; Set caller number received
same => n,Set(CallerName=${CALLERID(name)}) ; Set caller name received
same => n,Set(TmpFaxFilePath=${TmpFaxDest}/${EpochAnswerTime}_${CallerNumber}.tif) ; Set the temp fax file path, EX: 1674272004_18025829562.tif
same => n,Verbose(2,- Incoming call from ${CallerName} <${CallerNumber}> at ${EpochAnswerTime}. Receving to ${TmpFaxFilePath})
same => n,ReceiveFax(${TmpFaxFilePath}) ; Receive the fax to the temp fax file path
same => n,Verbose(2,- Fax from ${CallerName} <${CallerNumber}> at ${EpochAnswerTime} completed with status ${FAXSTATUS})
same => n,System(echo hi) ; Run the result handler script
same => n,Hangup() ; Hang up
```
