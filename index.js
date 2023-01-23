const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')
const os = require('os')

const args = process.argv.slice(2)

async function handle() {
    let subject
    let body
    let attachment
    if (args[0].toUpperCase() == "SUCCESS") {
        subject = process.env.FAX_SUCCESS_SUBJECT
        body = process.env.FAX_SUCCESS_BODY
        attachment = args[3]
    } else {
        subject = process.env.FAX_FAILURE_SUBJECT
        body = process.env.FAX_FAILURE_BODY
        attachment = null
    }

    let transporter = nodemailer.createTransport({
        host: process.env.ACCOUNT_HOST,
        port: process.env.ACCOUNT_PORT,
        secure: process.env.ACCOUNT_SECURE,
        auth: {
            user: process.env.ACCOUNT_USER,
            pass: process.env.ACCOUNT_PASS   
        }
    })

    let email = await transporter.sendMail({
        from: process.env.ACCOUNT_FROM,
        to: process.env.ACCOUNT_TO,
        subject: formatString(subject),
        text: formatString(body),
        attachments: [
            {
                path: attachment
            }
        ]
    })

    console.log("Message sent: %s", email.messageId);
}

function formatString(input) {
    return input
        .replaceAll('%FaxFromCIDNumber%', args[2])
        .replaceAll('%FaxFromCIDName%', args[1])
        .replaceAll('%DialInFaxNumber%', process.env.FAX_NUMBER)
        .replaceAll('%ServerFaxFileLocation%', args[3])
        .replaceAll('%SystemHostname%', os.hostname())
}

handle().catch((err) => {console.log(err)})