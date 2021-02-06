const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// catch all route for 'route not found'
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;