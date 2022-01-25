const EasyToken = artifacts.require("EasyToken");
const EasySale = artifacts.require("EasySale");

module.exports = async function (deployer) {
  await deployer.deploy(EasyToken, 1000000);
  return deployer.deploy(EasySale,EasyToken.address,1);
};
