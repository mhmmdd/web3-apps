# Install pnpm for Windows to manage node packages
```shell
$ npm install -g pnpm

# add alias pn 
$ alias pn='pnpm'
```

# Create Faucet React App
```shell
$ node -v
v18.15.0

$ npm -v
9.3.0

$ pnpm create react-app faucet --template typescript
# or same as below
#$ npx create-react-app faucet --template typescript

$ cd faucet
$ pn install
$ npm install # fix some dependency issues
```

# Install truffle
```shell
$ npm install -g truffle

$ truffle version
#Truffle v5.8.1 (core: 5.8.1)
#Ganache v7.7.7
#Solidity v0.5.16 (solc-js)
#Node v18.15.0
#Web3.js v1.8.2

$ truffle init
```
