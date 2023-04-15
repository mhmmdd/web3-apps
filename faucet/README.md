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



# Changes
1. Contract interaction (truffle console) on Ganache
2. Web3 interaction (truffle console) on Ganache
