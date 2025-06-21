// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LendingProtocol {
    IERC20 public sageToken;

    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrows;
    mapping(address => uint256) public ethCollateral;

    uint256 public interestRate = 5; // 5% annual interest (simplified)
    uint256 public collateralRatio = 150; // 150% required

    constructor(address _sageToken) {
        sageToken = IERC20(_sageToken);
    }

    function deposit(uint256 amount) external {
        sageToken.transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
    }

    function addCollateral() external payable {
        ethCollateral[msg.sender] += msg.value;
    }

    function borrow(uint256 amount) external {
        uint256 collateralInEth = ethCollateral[msg.sender];
        require(collateralInEth > 0, "No collateral");
        require((collateralInEth * 100) / amount >= collateralRatio, "Insufficient collateral");
        borrows[msg.sender] += amount;
        sageToken.transfer(msg.sender, amount);
    }

    function repay(uint256 amount) external {
        sageToken.transferFrom(msg.sender, address(this), amount);
        borrows[msg.sender] -= amount;
    }

    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        sageToken.transfer(msg.sender, amount);
    }
}
