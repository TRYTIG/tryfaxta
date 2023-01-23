<h1 align="center">Tryfaxta Mail Sender</h1>

A standalone fax receiver and emailer built on Asterisk and Javascript
 
## Using the application
### Requirements:
These are the requirements to run the application as intended.
 * Basic understanding of VoIP, SIP, Asterisk and faxing
 * An Asterisk SIP server with the `app_system.so `, `res_fax.so` and `res_fax_spandsp.so` is enabled in `modules.conf` (see [res_and_app.md](res_and_app.md), [dialplan.md](dialplan.md), [pjsip.md](pjsip.md) and [compiling_asterisk.md](compiling_asterisk.md) for examples and help)
 * An email account to send the faxes
 * A DID or extension to receive your faxes on
 * A provider or phone system that will give you SIP trunk/account

### Installation
* Copy the application into `/etc/asterisk/tryfaxta`
* Make the installation script executable `$ chmod +x install.sh`
* Run `./install.sh` as a privileged user. This will set the necessary file permissions and download the required dependencies for the application to run
* Copy the example environment variable file into `.env` (`$ cp .env.example .env`)
* Configure the environment variable file to your needs
* Configure your dialplan and sip registration file (see [dialplan.md](dialplan.md) and [pjsip.md](pjsip.md))

### Running without converting to PDF
Application Syntax: `index.js <success|failure> <CID Name> <CID Number> <Fax Attachment>`

Running Examples:
* `index.js success "Example Company" 5555551234 /var/spool/1674276716_5555551234.tif`
* `index.js failure "Wireless Caller" 5555555555 /var/spool/1674276716_5555551234.tif` The Fax attachment is ignored when the status is "failure"
* `index.js failure "Wireless Caller" 5555555555`

This will send an email to the configured recipients containing the information about the fax status and the fax attachment (if successful)

### Running and converting to PDF
Application Syntax: `./faxhandle.sh <success|failure> <CID Name> <CID Number> <Fax Attachment>`

Running Examples:
* `./faxhandle.sh success "Example Company" 5555551234 /var/spool/1674276716_5555551234.tif.pdf`
* `./faxhandle.sh failure "Wireless Caller" 5555555555 /var/spool/1674276716_5555551234.tif.pdf` The Fax attachment is ignored when the status is "failure"
* `./faxhandle.sh failure "Wireless Caller" 5555555555`

This script has been provided to automatically convert the TIF file into a more understood PDF format. It then will call the email script to send out the PDF to the configured recipients if there was a successful fax or a failure message on failure.

## Environment Variables
An example `.env` file has been provided in [.env.example](.env.example).

### Variable values
|Variable Name|Variable Description|Example Value|
|--|--|--|
|`%FaxFromCIDNumber%`|The phone number which sent the fax|`5555555555`|
|`%FaxFromCIDName%`|The phone numbers caller ID which sent the fax|`EXAMPLE COMPANY`|
|`%DialInFaxNumber%`|The number provided in `FAX.NUMBER`|`555-555-5555`|
|`%ServerFaxFileLocation%`|The file path in which the original fax was stored on the server|`/var/spool/1674276716_5555551234.tif`|
|`%SystemHostname%`|The system's hostname|`fax01`|
