## 1 - Faucet Contract Migration to Ganache
```shell
$ cd faucet
$ truffle create migration faucet_migration
```

## 2 - Truffle Console
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

## 4 - EVM
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

## 7 - [JSON-RPC API Call with Curl](https://ethereum.org/en/developers/docs/apis/json-rpc/)

### 7.1 - Get the list of accounts
```shell
$ curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:7545

# {
#   "id":1,
#   "jsonrpc":"2.0",
#   "result":[
#      "0xa747d5507e6148d3423075e3856e14df71ed9440",
#      "0x36403e07a24ee8eb7615ab741eb66eabc8ce34b9",
#      "0xe3aa5eb72f172edb6fe448e901c99309bcc63063",
#      "0x1e1f4ec3de4c3d8bf103f89dc4f1a36ce560019a",
#      "0x179a8d987f75d540c6a2f4525deeec5f5fbd1377",
#      "0xf34d4ef1736d1449b45cf5ff94adeafe7b6271d2",
#      "0xce4774204094f39e393d2ca1d449fa11a4f20b67",
#      "0x8b0923cdd5893c0c79d5b3cce3746d27661305e3",
#      "0x789765a52a6e628295e05d6d9a92d148ace6c265",
#      "0xc5bf98ce98d175ba8da4d5c5d08bbe40e1b8c205"
#   ]
#}
```

### 7.2 - Send ether from account 2 to Faucet
```shell
$ truffle console
$ web3.eth.getBalance(accounts[2]) # 0xE3AA5Eb72F172eDB6fe448E901C99309bCC63063
# 100000000000000000000
$ web3.eth.getBalance(Faucet.address) # 0x4f02E479d2634640b96a44B38820533656f9eE37
# 100000000000000000000


# Send 10 ether from account 2 to Faucet
$ curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0xe3aa5eb72f172edb6fe448e901c99309bcc63063","to":"0x4f02e479d2634640b96a44b38820533656f9ee37","value":"0x8ac7230489e80000"}],"id":1}' http://localhost:7545
# {"id":1,"jsonrpc":"2.0","result":"0xf50d88c4e0332cb0d173ea90f1f82261bcea6c7dfd4eccde36e30fd2c089bb3b"}

$ truffle console
$ web3.eth.getBalance(Faucet.address)
# 200000000000000000000
```

### 7.3 - Call Faucet "addTwoNumbers(int a, int b)" function with parameters
```shell
$ truffle console

$ const contract = new web3.eth.Contract(Faucet.abi, Faucet.address)
$ const callData = contract.methods.addTwoNumbers(3, 2).encodeABI()
# 0x6321e71a00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002

$ web3.eth.call({to: Faucet.address, data: callData})
# 0x0000000000000000000000000000000000000000000000000000000000000005

$ web3.utils.hexToNumberString("0x0000000000000000000000000000000000000000000000000000000000000005")
# '5'

$ curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x9155B723911F260fcB7EFfB1563cF68DcE260a05","data":"0x6321e71a00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002"}, "latest"],"id":1}' http://localhost:7545
# {"id":1,"jsonrpc":"2.0","result":"0x0000000000000000000000000000000000000000000000000000000000000005"}
```

## 8 - Add Funds to Faucet Contract
```shell
$ truffle console
$ web3.eth.getBalance(Faucet.address)
# 0

$ const instance = await Faucet.deployed()
$ instance.addFunds({from: accounts[0], value: web3.utils.toWei("10", "ether")})

$ web3.eth.getBalance(Faucet.address)
# 10000000000000000000

$ instance.addFunds({from: accounts[1], value: web3.utils.toWei("10", "ether")})

$ web3.eth.getBalance(Faucet.address)
# 20000000000000000000
```

## 9 - Get all funders
```shell
$ truffle console
$ const instance = await Faucet.deployed()
$ instance.getAllFunders()
# [
#  '0xa747D5507e6148d3423075e3856e14DF71eD9440',
#  '0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9'
#]
```

## 10 - External vs Public Functions
If getAllFunders is declared as external, it will not call getFunderAtIndex function. 
External function means that the function only can be called from outside the contract not from inside the contract.

## 11 - MemoryTest Contract to see how memory works
```shell 
$ truffle create migration memory_test
$ truffle migrate --reset
$ truffle console
$ const instance = await MemoryTest.deployed()
$ const result = await instance.test2()
$ result.toString()
# decimal number for hello
# 448378203247
```
## 12 - Private vs Internal fields
Private: Only accessible from inside the contract
Internal: Only accessible from inside the contract and from contracts that inherit from this contract

## 13 - Storage Contract to see memory slots
```shell
$ truffle create migration storage
$ truffle migrate --reset
$ truffle console
$ const instance = await Storage.deployed()


#  uint8 public a = 7; // 1 byte
#  uint16 public b = 8; // 2 bytes
#  address public c = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; // 20 bytes
#  bool public d = true; // 1 byte
#  uint64 public e = 10; // 8 bytes

$ web3.eth.getStorageAt(instance.address, 0)
# 0x000000000000000a015b38da6a701c568545dcfcb03fcb875f56beddc4000807 -> 7, 8, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, true, 10
# 0x00000000000000 0a 01 5b38da6a701c568545dcfcb03fcb875f56beddc4 0008 07
#                  10 1  5b38da6a701c568545dcfcb03fcb875f56beddc4 8    7


$ let result = await web3.eth.getStorageAt(instance.address, 0)
$ web3.utils.hexToNumberString(result)

$ result = await web3.eth.getStorageAt(instance.address, 1)
$ web3.utils.hexToNumberString(result)
# '12'

$ result = await web3.eth.getStorageAt(instance.address, 2)
$ web3.utils.hexToNumberString(result)
# '13'

#  uint8 public h = 14; // 1 byte -> slot 3
#  uint8 public i = 15; // 1 byte -> slot 3
$ result = await web3.eth.getStorageAt(instance.address, 3)
# 0x000000000000000000000000000000000000000000000000000000000000 0f 0e
# 0                                                              15 14
```

## 14 - Mapping implementation in Faucet Contract
```shell
$ truffle console
$ truffle migrate --reset

# mapping(uint => address) public funders; -> makes duplicate entries
$ const instance = await Faucet.deployed()
$ instance.addFunds({from: accounts[0], value: web3.utils.toWei("10", "ether")})
$ instance.addFunds({from: accounts[1], value: web3.utils.toWei("10", "ether")})
$ instance.addFunds({from: accounts[0], value: web3.utils.toWei("10", "ether")})

$ instance.getFunderAtIndex(0)
# '0xa747D5507e6148d3423075e3856e14DF71eD9440'
$ instance.getFunderAtIndex(1)
# '0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9'

$ instance.getAllFunders()
# [
#  '0xa747D5507e6148d3423075e3856e14DF71eD9440',
#  '0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9'
#  '0xa747D5507e6148d3423075e3856e14DF71eD9440' -> duplicated
#]
```

## 15 - Mapping implementation in Faucet Contract without duplicates
```shell
$ truffle migrate --reset
$ truffle console

# mapping(address => bool) public funders; -> no duplicate entries
# address[] public fundersArray; -> to get all funders

$ const instance = await Faucet.deployed()
$ instance.addFunds({from: accounts[0], value: web3.utils.toWei("10", "ether")})
$ instance.addFunds({from: accounts[1], value: web3.utils.toWei("10", "ether")})
$ instance.addFunds({from: accounts[0], value: web3.utils.toWei("10", "ether")})

$ instance.getAllFunders()
# [
#  '0xa747D5507e6148d3423075e3856e14DF71eD9440',
#  '0x36403e07A24eE8Eb7615Ab741eb66EABc8cE34b9'
#]
```

## 16 - Mapping in Storage Contract
```shell
$ truffle migrate --reset
$ truffle console

# keccak256(key + slot)
#  mapping(uint => uint) public j; // 32 bytes -> slot 4
#  mapping(address => uint) public k; // 32 bytes -> slot 5

$ const instance = await Storage.deployed()
$ let result = await web3.eth.getStorageAt(instance.address, "0x91da3fd0782e51c6b3986e9e672fd566868e71f3dbc2d6c2cd6fbb3e361af2a7")
# '0x0000000000000000000000000000000000000000000000000000000000000004' -> 4

$ result = await web3.eth.getStorageAt(instance.address, "0x2e174c10e159ea99b867ce3205125c24a42d128804e4070ed6fcc8cc98166aa0")
# '0x000000000000000000000000000000000000000000000000000000000000000a' -> 10

$ result = await web3.eth.getStorageAt(instance.address, "0xa8c8bc7c03ef03b3fe2f845d765c43dc1973518e7febf315273fadcae0a2af1a")
# '0x0000000000000000000000000000000000000000000000000000000000000064' -> 100


# Array
# This returns array size
$ result = await await web3.eth.getStorageAt(instance.address, 6)
# '0x0000000000000000000000000000000000000000000000000000000000000003' -> 3

# First element of array: keccak256 hex -> (decimal + 0) -> hex
$ result = await await web3.eth.getStorageAt(instance.address, "0xf652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f")
# '0x0000000000000000000000000000000000000000000000000000000000000001' -> 1

# Second element of array: keccak256 hex -> (decimal + 1) -> hex
$ result = await await web3.eth.getStorageAt(instance.address, "0xf652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d40")
# '0x000000000000000000000000000000000000000000000000000000000000000a' -> 10

# Third element of array: keccak256 hex -> (decimal + 2) -> hex
$ result = await await web3.eth.getStorageAt(instance.address, "0xf652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d41")
# '0x0000000000000000000000000000000000000000000000000000000000000064' -> 100
```

## 17 - Withdraw Funds from Faucet Contract
```shell
$ truffle migrate --reset
$ truffle console
$ const instance = await Faucet.deployed()

# Test withdraw function
$ instance.addFunds({value: 1000000000000000000, from: accounts[0]})
$ instance.addFunds({value: 1000000000000000000, from: accounts[0]})
$ instance.withdraw("1000000000000000000", {from: accounts[0]})

$ instance.withdraw("2000000000000000000", {from: accounts[0]})
#error: You can only withdraw less than 1 ether

# Test onlyOwner modifier
$ instance.testOnlyOwner()
$ instance.testOnlyOwner({from: accounts[0]})

$ instance.testOnlyOwner({from: accounts[1]})
#error: You are not the owner
```

## 18 - Abstract and Interface on Faucet Contract
Difference between Abstract and Interface
   - Abstract: Abstract contract can have function **implementation**
   - Interface: Interface contract can not have function implementation, only function **declaration**

## 19 - How Metamask works
1. 12 word mnemonic phrase + password -> private key -> public key -> address
2. Every transaction needs to be signed by private key
3. Metamask will sign the transaction with private key and send it to the network
4. The network will verify the signature with public key and address

## 20 - Metamask configuration
1. Add custom RPC
   - Network Name: Ganache
   - New RPC URL: http://127.0.0.1:7545
   - Chain ID: 1337
   - Symbol: ETH
2. Import account from Ganache to Metamask
   - Copy private key from Ganache (Click on key icon next to account)
   - Import account in Metamask (Click on account icon next to network name)

## 21 - Web3 Provider and Metamask integration
```shell
$ npm install bulma
$ npm install web3
```

## 22 - Get account from Metamask
```typescript
// get account from metamask
useEffect(() => {
   const getAccounts = async () => {
      const accounts = await web3Api?.eth.getAccounts();
      setAccount(accounts && accounts[0]);
   }
   web3Api?.eth && getAccounts();
}, [web3Api?.eth]);
```

## 23 - Use provider library to connect to Metamask
```shell
$ npm install @metamask/detect-provider
```
```typescript
useEffect(() => {
   const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
         await (provider as any).request({method: 'eth_requestAccounts'});
         setWeb3Api(new Web3((provider as any)));
      } else {
         console.log('Please install MetaMask!');
      }
   }
   loadProvider();
}, []);
```

# Change History 
1. [Faucet Contract Migration to Ganache](#1---faucet-contract-migration-to-ganache)
2. [Truffle Console](#2---truffle-console)
3. [Faucet Contract Interaction with web3](#3---faucet-contract-interaction-with-web3)
4. [EVM](#4---evm)
5. [Truffle receive ether](#5---truffle-receive-ether)
6. [Faucet Bytecode with web3](#6---faucet-bytecode-with-web3)
7. [JSON-RPC API Call with Curl](#7---json-rpc-api-call-with-curl)
8. [Add Funds to Faucet Contract](#8---add-funds-to-faucet-contract)
9. [Get all funders](#9---get-all-funders)
10. [External vs Public Functions](#10---external-vs-public-functions)
11. [MemoryTest Contract to see how memory works](#11---memorytest-contract-to-see-how-memory-works)
12. [Private vs Internal fields](#12---private-vs-internal-fields)
13. [Storage Contract](#13---storage-contract)
14. [Storage Contract with web3](#14---storage-contract-with-web3)
15. [Faucet Contract with web3](#15---faucet-contract-with-web3)
16. [Mapping in Storage Contract](#16---mapping-in-storage-contract)
17. [Withdraw Funds from Faucet Contract](#17---withdraw-funds-from-faucet-contract)
18. [Abstract and Interface on Faucet Contract](#18---abstract-and-interface-on-faucet-contract)
19. [How Metamask works](#19---how-metamask-works)
20. [Metamask configuration](#20---metamask-configuration)
21. [Web3 Provider and Metamask integration](#21---web3-provider-and-metamask-integration)
22. [Get account from Metamask](#22---get-account-from-metamask)
23. [Use provider library to connect to Metamask](#23---use-provider-library-to-connect-to-metamask)
