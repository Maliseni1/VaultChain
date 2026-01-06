# VaultChain
A decentralized password manager that stores encrypted credentials on the blockchain. Users retain full control with no central servers. Access via dApp wallet authentication.

## Installation

1. From the project root install dependencies:
   - npm install
   - (If you have package-lock.json and want reproducible installs) npm ci

2. Main packages included (installed by the commands above):
   - hardhat, @nomicfoundation/hardhat-toolbox, ethers
   - crypto-js, ipfs-http-client, web3
   - typechain, typescript, ts-node
   - chai, solidity-coverage, hardhat-gas-reporter
   - dotenv

3. Run local Hardhat node and scripts:
   - npx hardhat node
   - npx hardhat run scripts/deploy.js --network localhost
   - npx hardhat run scripts/integration-test.js --network localhost
