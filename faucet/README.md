# Faucet Contract Migration to Ganache
```shell
$ cd faucet
$ truffle create migration faucet_migration
```

# Truffle Console
```shell
$ truffle console

truffle(development)> const instance = await Faucet.deployed()
# undefined

truffle(development)> instance

truffle(development)> const funds = await instance.funds()
# truffle(development)> instance.funds()
# undefined

truffle(development)> funds
#BN {
#  negative: 0,
#  words: [ 1000, <1 empty item> ],
#  length: 1,
#  red: null
#}

truffle(development)> funds.toString()
# '1000'

truffle(development)> const counter = await instance.counter()
truffle(development)> counter.toString()
```

## Faucet Contract Interaction with web3
```shell
$ truffle console

truffle(development)> const instance = new web3.eth.Contract(Faucet.abi, Faucet.address)
# undefined

truffle(development)> instance
```

# EVM
Ethereum Clients (Geth, Parity, etc.) are EVM (Ethereum Virtual Machine) implementations. Geth is golang, parity is rust.
Client has access State and Transaction Pool(Mempool). State is a key-value store. Transaction Pool is a list of transactions that are waiting to be included in a block.
State is a form of tree structure. Merkle Patricia Trie is a tree structure that is used to store the state.
There are 3 types of nodes: full node, light node, and archive node. Full node stores the state of the last 128 blocks. Light node stores the state of the last 64 blocks. Archive node stores the state of all blocks.

## Truffle receive ether
```shell
# revert migration
$ truffle migrate --reset

$ truffle console

$ accounts 
#[
#  '0xa747D5507e6148d3423075e3856e14DF71eD9440',
#  '0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9',
#  '0xE3AA5Eb72F172eDB6fe448E901C99309bCC63063',
#  '0x1E1f4eC3De4c3D8bf103f89dc4f1A36Ce560019a',
#  '0x179A8D987F75D540C6a2F4525DeEEc5F5FbD1377',
#  '0xf34D4eF1736D1449B45Cf5FF94aDeAfE7B6271D2',
#  '0xCe4774204094f39e393D2ca1D449fa11a4f20b67',
#  '0x8B0923Cdd5893c0C79d5b3CCE3746d27661305E3',
#  '0x789765A52A6e628295e05D6D9A92d148aCE6c265',
#  '0xC5BF98Ce98D175Ba8da4d5c5D08Bbe40e1b8c205'
#]


truffle(development)> web3.eth.getBalance(accounts[1])
#truffle(development)> web3.eth.getBalance('0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9')
# '100000000000000000000'

truffle(development)> web3.eth.getBalance(Faucet.address)
# '0'

truffle(development)> web3.eth.sendTransaction({from: accounts[1], to: Faucet.address, value: web3.utils.toWei('10', 'ether')})
# '0x8

truffle(development)> web3.eth.getBalance(accounts[1])
# '89999928703168088151'
truflle(development)> const balance = await web3.eth.getBalance(accounts[1])
truffle(development)> web3.utils.fromWei(balance, 'ether')
# '89.999928703168088151'

truffle(development)> web3.eth.getBalance(Faucet.address)
# '10000000000000000000'
```

# Changes
1. Contract interaction (truffle console) on Ganache
2. Web3 interaction (truffle console) on Ganache
3. Send ether to contract
