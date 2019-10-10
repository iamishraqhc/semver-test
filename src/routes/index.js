import express from 'express';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.render('pages/about');
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

router.get('/config', (req, res) => {
  res.render('pages/config');
});

router.get('/dina', (req, res) => {
  res.render('pages/dina');
});

router.get('/mos', (req, res) => {
  res.render('pages/mos');
});



// handles invalid route
router.get('*', (req, res) => {
  res.status(404).render('pages/404');
});

module.exports = router;
