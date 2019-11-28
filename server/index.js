const router = require('express').Router();
router.use(require('./routes/mail.route'));

router.get('/', (req, res) => {
    res.status(200).json({msg: "server up and running"})
});
router.get('*', (req, res) => {
    res.status(404).json('Não encontrado');
});


module.exports = router;