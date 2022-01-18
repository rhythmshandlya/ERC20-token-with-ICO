const EasyToken = artifacts.require("./EasyToken.sol");

module.exports = function (deployer) {
  deployer.deploy(EasyToken, 1000000);
};
