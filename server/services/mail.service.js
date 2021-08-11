const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASS
    },
    logger: false, // log to console
    debug: false // include SMTP traffic in the logs
});

exports.sendEmail = function(req, res) {
    const mailmsg = {
        from: process.env.SMTPUSER,
        subject: '[danizavtz.com.br] ',
        text: 'Mensagem de: ' + req.body.nome + ', email: [' + req.body.email + '] ' + req.body.mensagem,
        to: process.env.SMTPRECIPIENT
    }
    transporter.sendMail(mailmsg).then((trans) => {
        res.status(200).json(trans)
    }).catch((error) => {
        res.status(500).json(error);
    });
}