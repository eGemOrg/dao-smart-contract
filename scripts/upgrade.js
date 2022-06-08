require('dotenv').config()

const { ethers, upgrades } = require('hardhat')

async function main () {
  const [deployer] = await ethers.getSigners()

  const provider = waffle.provider // ethers.getDefaultProvider()
  const { chainId } = await provider.getNetwork()

  const daoAddress = '0x'

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())
  console.log('Deployment network chain id:', chainId)

  const DAOUpgradeable = await ethers.getContractFactory('DAOUpgradeable')
  await upgrades.upgradeProxy(daoAddress, DAOUpgradeable)

  console.log('upgrade success!')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
