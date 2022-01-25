const EasyToken = artifacts.require('EasyToken');

contract('EasyToken', function (accounts) {
  it('Smart contract deployment successful', async () => {
    const easyToken = await EasyToken.deployed();
    assert((await easyToken.address) != '', 'easy token address null');
    const initialSupply = await easyToken.totalTokenSupply();
    assert(
      initialSupply == 1000000,
      `Wrong initial supply to owner that is ${initialSupply}`
    );
  });
  it('owner balance initiator', async () => {
    const easyToken = await EasyToken.deployed();
    const ownersInitialTokens = (await easyToken.balanceOf(accounts[0]))
      .words[0];
    assert(ownersInitialTokens == (await easyToken.totalTokenSupply()));
  });
  it('Transfer function working', async () => {
    const easyToken = await EasyToken.deployed();
    await easyToken.transfer(accounts[1], 10000);
    const amtAc0 = await easyToken.balanceOf(accounts[0]);
    const amtAc1 = await easyToken.balanceOf(accounts[1]);
    assert(
      amtAc0 == 990000 && amtAc1 == 10000,
      `Final Balances Did Not Match, ${amtAc0} & ${amtAc1}`
    );
  });
  it('Allowance function working', async () => {
    const easyToken = await EasyToken.deployed();
    await easyToken.approve(accounts[1], 1000);
    await easyToken.approve(accounts[2], 5000);
    await easyToken.transferFrom(accounts[0], accounts[1], 100);
    await easyToken.transferFrom(accounts[0], accounts[1], 900);
    await easyToken.transferFrom(accounts[0], accounts[2], 4000);
    assert(
      (await easyToken.allowance(accounts[0], accounts[2])).words[0] == 1000
      && (await easyToken.allowance(accounts[0], accounts[1])).words[0] == 0
    );
  });
});
