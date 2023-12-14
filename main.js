const EtherSim = require('ethersim');
const sim = new EtherSim.init();

const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(sim.provider);

const account = sim.createAccounts(10, function() {})
const accounts = web3.eth.accounts
//console.log(accounts)

sim.setBalance(web3.eth.accounts[0], 123450000, function() {})
web3.eth.getBalance(web3.eth.accounts[0], function(err, balance) {console.log(balance.toNumber())}) //=> 123450000

// send ether from one account to another
web3.eth.sendTransaction({value: 1000, from: web3.eth.accounts[0], to: web3.eth.accounts[1], gasLimit: 10000},function() {console.log("transaction sent")})

// mine transaction
sim.mine()
