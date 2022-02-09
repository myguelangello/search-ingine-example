var express = require('express');
var router = express.Router();

const simplify = require('../modules/simplify');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.query.q)
    return res.render('index', {
      title: 'Pesquisa de professores',
      users: [],
      query: '',
    });
  else {
    const query = simplify.simplify(req.query.q);
    const modalidade = req.query.modalidade;
    const mongoClient = require('mongodb').MongoClient;
    mongoClient
      .connect('mongodb://localhost:27017')
      .then((conn) => conn.db('noderest'))
      .then((db) =>
        db.collection('t2').find({
          preferredModalities: modalidade,
          tags: { $in: query },
        })
      ) //  ** { tags: { $in: query } }
      .then((cursor) => cursor.toArray())
      .then((users) => {
        return res.render('index', {
          title: 'Motor de Busca',
          users,
          query: req.query.q,
        });
      });
  }
});

module.exports = router;
