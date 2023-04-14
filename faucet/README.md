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

# Changes
1. Contract interaction (truffle console) on Ganache
