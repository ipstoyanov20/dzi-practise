var express = require('express')
var connection = require('../services/database.js')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { page: 'About Us', menuId: 'about' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { page: 'Contact Us', menuId: 'contact' });
});

// Sensors route - Fetching data and passing it to the sensors view
router.get('/sensors', function (req, res, next) {
  let sql = `SELECT * FROM distance`;
  let filterOption = req.query.filterOption;

  if (filterOption === 'last20') {
    sql += ` ORDER BY timestamp DESC LIMIT 20`;
  }

  connection.query(sql, function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('sensors', { data: [], page: 'Sensors Info', menuId: 'sensors' });
    } else {
      // Optionally reverse the rows if you want them in ascending order
      if (filterOption === 'last20') {
        rows = rows.reverse();
      }
      res.render('sensors', { data: rows, page: 'Sensors Info', menuId: 'sensors' });
    }
  });
});


router.post('/edit-distance/:id', function (req, res) {
  const { id } = req.params;
  const { newDistance } = req.body;
  const sql = 'UPDATE distance SET distance = ? WHERE id = ?';

  connection.query(sql, [newDistance, id], function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/sensors');
    }
    res.redirect('/sensors');
  });
});

router.post('/delete-distance/:id', function (req, res) {
  const { id } = req.params;
  const sql = 'DELETE FROM distance WHERE id = ?';

  connection.query(sql, [id], function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/sensors');
    }
    res.redirect('/sensors');
  });
});

// Statistics route - Fetching data and passing it to the statistics view
router.get('/statistics', function (req, res, next) {
  connection.query('SELECT * FROM distance', function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('statistics', { data: [], page: 'Statistics', menuId: 'statistics' });
    } else {
      let labels = rows.map(row => row.timestamp);
      let chartData = rows.map(row => row.distance);

      // Log the data to ensure it's correct
      console.log(labels, chartData);

      res.render('statistics', {
        page: 'Statistics', 
        menuId: 'statistics', 
        labels: labels,
        chartData: chartData
      });
    }
  });
});


module.exports = router
