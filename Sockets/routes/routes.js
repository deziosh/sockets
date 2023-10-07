const express = require('express');
const router = express.Router();

router.route('/notificar')
  .get((req, res) => {
    res.json({ message: "testando rota" });
});

module.exports = router;