
const { ethers, upgrades } = require('hardhat')

async function main () {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const DAOUpgradeable = await ethers.getContractFactory(
    'DAOUpgradeable', { }
  )

  const dao = await upgrades.deployProxy(
    DAOUpgradeable, [], { initializer: 'initialize' }
  )

  await dao.deployed()

  console.log('dao address:', dao.address)
  console.log('owner address:', (await dao.owner()))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
