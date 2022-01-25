// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract EasyToken {
    string public name;
    string public sybmol;
    string public standard;
    uint256 public totalTokenSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) internal allowance_map;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(uint256 _initialSupply) {
        totalTokenSupply = _initialSupply;
        name = 'Easy Coin';
        sybmol = 'EZC';
        standard = 'EZC v1.0.0';
        balanceOf[msg.sender] = _initialSupply;
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) internal {
        require(to != msg.sender, 'ERC20: transfer to the zero address');
        balanceOf[from] = SafeMath.sub(balanceOf[from], value);
        balanceOf[to] = SafeMath.add(balanceOf[to], value);
        emit Transfer(from, to, value);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance_map[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(allowance_map[_from][_to] >= _value, 'Tranfer limit exceeded');
        _transfer(_from, _to, _value);
        allowance_map[_from][_to] = SafeMath.sub(
            allowance_map[_from][_to],
            _value
        );
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256)
    {
        return allowance_map[_owner][_spender];
    }
}
