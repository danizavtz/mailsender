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
    const mailOptions = {
        from: process.env.SMTPUSER,
        subject: '[danizavtz.com.br] ',
        text: 'Mensagem de: ' + req.body.nome + ', email: [' + req.body.email + '] ' + req.body.mensagem,
        to: process.env.SMTPRECIPIENT
    }
    transporter.sendMail(mailOptions).then((trans) => {
        res.status(200);
        res.json(trans);
        res.end();
    }).catch((error) => {
        res.status(500);
        res.json(error);
        res.end();
    });
}