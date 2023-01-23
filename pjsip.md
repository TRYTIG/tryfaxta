# Example sip registration

```
[trunk]
type=registration
outbound_auth=trunk
server_uri=sip:mysipserver
client_uri=sip:myextension@mysipserver
retry_interval=60

[trunk]
type=auth
auth_type=userpass
password=mypassword
username=myextension

[trunk]
type=aor
contact=sip:mysipserver

[trunk]
type=endpoint
context=from-phonesys
disallow=all
allow=ulaw
outbound_auth=trunk
aors=mytrunk

[trunk]
type=identify
endpoint=trunk
match=mysipserver
```
