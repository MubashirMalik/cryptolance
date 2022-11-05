const Migrations = artifacts.require("Migrations");
const Cryptolance = artifacts.require("Cryptolance")

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Cryptolance);
};