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

# Install Ganache for Personal Blockchain
```shell
# download: https://github.com/trufflesuite/ganache-ui/releases/download/v2.7.1-beta/Ganache-2.7.1-beta-win-x64-setup.exe
# install: Ganache-2.7.1-beta-win-x64-setup.exe
```

# Migrate to Ganache
```shell
$ cd faucet
$ truffle create migration migrations
$ truffle migrate
```

# Create MarketPlace Next.js App
```shell
$ node -v
v18.15.0

$ npm -v
9.3.0

$ pnpm -v
8.3.1

$ pnpm create next-app marketplace --typescript
# or same as below
#$ npx create-next-app marketplace --typescript

#√ Would you like to use ESLint with this project? ... No / Yes -> Yes
#√ Would you like to use Tailwind CSS with this project? ... No / Yes -> Yes
#√ Would you like to use `src/` directory with this project? ... No / Yes -> Yes
#√ Would you like to use experimental `app/` directory with this project? ... No / Yes -> No
#√ What import alias would you like configured? ... @/*

$ cd marketplace
$ pnpm run dev
```

## Upgrade Pnpm
1. run `pnpm setup`
2. add `PNPM_HOME=C:\Users\[your system username]\AppData\Local\pnpm` to global `system variables`, not user variables!!!
3. add `%PNPM_HOME%` to `Path` of `system variables`
4. restart your terminal
```shell
$ pnpm add -g pnpm
$ pnpm -v
8.3.1
```


