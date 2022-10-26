const Migrations = artifacts.require("Migrations");
const FiverrBlock = artifacts.require("FiverrBlock")

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FiverrBlock);
};