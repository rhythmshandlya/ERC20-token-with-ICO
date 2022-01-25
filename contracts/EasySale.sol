// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './EasyToken.sol';

contract EasySale {
    address admin;
    EasyToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address owner, uint256 totalTokens);

    constructor(EasyToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // Functions and addresses declared payable can receive ether into the contract.
    function buyToken(uint256 _tokensToBePurchased) public payable {
        require(msg.value == SafeMath.mul(_tokensToBePurchased, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _tokensToBePurchased);
        require(tokenContract.transfer(msg.sender, _tokensToBePurchased));

        tokenSold = SafeMath.add(tokenSold, _tokensToBePurchased);
        emit Sell(msg.sender, _tokensToBePurchased);
    }

    function endSale() public {
        require(msg.sender == admin);
        tokenContract.transfer(admin, tokenContract.balanceOf(address(this)));
        //Cast to payble address
        selfdestruct(payable(msg.sender));
    }
}
