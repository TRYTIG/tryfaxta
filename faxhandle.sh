#!/bin/bash
###
### FAX HANDLER SCRIPT
###
### AUTHOR: TREVOR RYAN
### CREATED: 1/21/2023
###
### EXAMPLE INPUT: faxhandle.sh success "Example Company" 5555551234 /var/spool/1674276716_5555551234.tif    <-- Will convert TIF to PDF and send out email
###                faxhandle.sh failure "Wireless Caller" 5555551234 {anything here is ignored}              <-- Will send out email alerting failed fax

cd /etc/asterisk/tryfaxta

if [ $1 == "FAILURE" ]; then
    node /etc/asterisk/tryfaxta/index.js failure $2 $3
fi

if [ $1 == "SUCCESS" ]; then
    # Convert TIF to a PDF file
    tiff2pdf $4 -o $4.pdf

    # Remove old TIF
    rm $4

    # Run emailer script
    node /etc/asterisk/tryfaxta/index.js success $2 $3 $4

    # Remove PDF from server
    rm $4.pdf
fi
