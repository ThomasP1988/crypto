const express = require('express');
const router = express.Router();
const blockcypherEthereumService = require('./blockcypher.service');
const ethereumConverter = require('./converter');

/* GET form Ethereum Balance fetcher. */
router.get('/', async (req, res, next) => {
  const address = req.query.address;
  let errorGetBalance = null;
  let etherBalance = null;
  if (address) {
    await blockcypherEthereumService.getBalance(address)
    .then((response) => {
      res.status(200);
      etherBalance = ethereumConverter.weiToEther(response.data.balance);
    })
    .catch((error) => {
      res.status(400);
      errorGetBalance = error.response.data.error || error;
    });
  }
  res.render('index', { error: errorGetBalance, result: etherBalance, address });
});

module.exports = router;
