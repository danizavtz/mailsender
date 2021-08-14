const router = require('express').Router();
router.use(require('./routes/mail.route'));

router.get('/', (req, res) => {
    req.servermsg = { msg: "server up and running" };
    res.status(200).json(req.servermsg);
});
router.get('*', (req, res) => {
    res.status(404).json({ errors: [{location: req.path, msg: 'Not found', param: null}]});
});

module.exports = router;