
require('dotenv').config()

require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-contract-sizer')
require('@nomiclabs/hardhat-solhint')
require('hardhat-abi-exporter')
require('solidity-coverage')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      mining: {
        auto: false,
        interval: 5000
      }
    },
    hardhat: {
      forking: {
        url: process.env.HTTPS_EGEM_RPC
      },
      mining: {
        auto: false,
        interval: 5000
      }
    },
    egem: {
      url: process.env.HTTPS_EGEM_RPC,
      chainId: 1987,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 80000
  },
  etherscan: {
    apiKey: ''
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2
  }
}
