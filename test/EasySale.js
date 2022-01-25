const EasyToken = artifacts.require('EasyToken');
const EasySale = artifacts.require('EasySale');

contract('EasySale', async function (accounts) {
    it('Initial checks', async () => { 
        const easySale = await EasySale.deployed();
        assert((await easySale.address) != "", "address null");
        assert((await easySale.tokenPrice()) == 1, "Cost mismatch");
        assert((await easySale.tokenSold())==0, "initial token sold not zero");
    });
    it('buyToken from ICO', async () => {
        const easySale = await EasySale.deployed();
        const easyToken = await EasyToken.deployed();
        const totalCoins = await easyToken.totalTokenSupply();
        const contractAddress = await easySale.address;
        await easyToken.transfer(contractAddress, Math.round(0.75 * totalCoins));
        assert((await easyToken.balanceOf(contractAddress)).words[0] == 750000, "Tokens transferred");
        await easySale.buyToken(1000, { from: accounts[5], value: 1000 });
        assert((await easyToken.balanceOf(accounts[5]))==1000,"Not transferred to 5th account");
    });
});