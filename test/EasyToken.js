const EasyToken = artifacts.require("EasyToken");

contract("EasyToken", function (accounts) {
  it("Smart contract deployment successful", async () => {
    const easyToken = await EasyToken.deployed();
    assert(easyToken.address !== "");
  });
});
