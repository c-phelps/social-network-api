const router = require('express').Router();
const apiRoutes = require('./api');

// modular routing for localhost/api
router.use('/api', apiRoutes);

// localhost/ is not going to be returning any data! let the user know
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;