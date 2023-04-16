# 1 - Faucet Contract Migration to Ganache
```shell
$ cd faucet
$ truffle create migration faucet_migration
```

# 2 - Truffle Console
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

## 3 - Faucet Contract Interaction with web3
```shell
$ truffle console

truffle(development)> const instance = new web3.eth.Contract(Faucet.abi, Faucet.address)
# undefined

truffle(development)> instance
```

# 4 - EVM
Ethereum Clients (Geth, Parity, etc.) are EVM (Ethereum Virtual Machine) implementations. Geth is golang, parity is rust.
Client has access State and Transaction Pool(Mempool). State is a key-value store. Transaction Pool is a list of transactions that are waiting to be included in a block.
State is a form of tree structure. Merkle Patricia Trie is a tree structure that is used to store the state.
There are 3 types of nodes: full node, light node, and archive node. Full node stores the state of the last 128 blocks. Light node stores the state of the last 64 blocks. Archive node stores the state of all blocks.

## 5 - Truffle receive ether
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

## 6 - Faucet Bytecode with web3
```shell
$ truffle console

truffle(development)> const bytecode = Faucet.bytecode
# undefined

truffle(development)> bytecode
# This is the bytecode of the contract
# '0x60806040526103e86000557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6600155603260025534801561003f57600080fd5b506101ef8061004f6000396000f3fe6080604052600436106100385760003560e01c806361bc221a1461005b578063c89f2ce414610086578063f8a8fd6d146100b157610056565b36610056573460008082825461004e9190610127565b925050819055005b600080fd5b34801561006757600080fd5b506100706100dc565b60405161007d9190610174565b60405180910390f35b34801561009257600080fd5b5061009b6100e2565b6040516100a8919061019e565b60405180910390f35b3480156100bd57600080fd5b506100c66100e8565b6040516100d3919061019e565b60405180910390f35b60015481565b60005481565b60025481565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610132826100ee565b915061013d836100ee565b9250828201905080821115610155576101546100f8565b5b92915050565b6000819050919050565b61016e8161015b565b82525050565b60006020820190506101896000830184610165565b92915050565b610198816100ee565b82525050565b60006020820190506101b3600083018461018f565b9291505056fea26469706673582212204145e0dc77e0cc4b98c3e7fd3a50aa2c0312aeb49b58a3817a8679a85aecd82f64736f6c63430008130033'

truffle(development)> web3.eth.getCode(Faucet.address)
# This is deployed contract bytecode
# '0x6080604052600436106100385760003560e01c806361bc221a1461005b578063c89f2ce414610086578063f8a8fd6d146100b157610056565b36610056573460008082825461004e9190610127565b925050819055005b600080fd5b34801561006757600080fd5b506100706100dc565b60405161007d9190610174565b60405180910390f35b34801561009257600080fd5b5061009b6100e2565b6040516100a8919061019e565b60405180910390f35b3480156100bd57600080fd5b506100c66100e8565b6040516100d3919061019e565b60405180910390f35b60015481565b60005481565b60025481565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610132826100ee565b915061013d836100ee565b9250828201905080821115610155576101546100f8565b5b92915050565b6000819050919050565b61016e8161015b565b82525050565b60006020820190506101896000830184610165565b92915050565b610198816100ee565b82525050565b60006020820190506101b3600083018461018f565b9291505056fea26469706673582212204145e0dc77e0cc4b98c3e7fd3a50aa2c0312aeb49b58a3817a8679a85aecd82f64736f6c63430008130033'
```

# Change History
1. [Faucet Contract Migration to Ganache](#1---faucet-contract-migration-to-ganache)
2. [Truffle Console](#2---truffle-console)
3. [Faucet Contract Interaction with web3](#3---faucet-contract-interaction-with-web3)
4. [EVM](#4---evm)
5. [Truffle receive ether](#5---truffle-receive-ether)
6. [Faucet Bytecode with web3](#6---faucet-bytecode-with-web3)
