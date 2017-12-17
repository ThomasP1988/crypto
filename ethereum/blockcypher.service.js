var axios = require('axios');
const API_BLOCKCYPHER = 'https://api.blockcypher.com/v1/eth/main/';

class BlockcypherEthereumService {
    static getBalance(address) {
        return axios.get(API_BLOCKCYPHER + 'addrs/' + address + '/balance');
    }
}

module.exports = BlockcypherEthereumService;