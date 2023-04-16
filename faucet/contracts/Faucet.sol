// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Faucet {
    // storage variables
    address[] public funders;


    // receive ether
    receive() external payable {

    }

    function addTwoNumbers(int a, int b) public pure returns (int) {
        return a + b;
    }

    function addFunds() public payable {
        funders.push(msg.sender);
    }

    function getAllFunders() public view returns (address[] memory) {
        return funders;
    }

    function getFunderAtIndex(uint index) public view returns (address) {
        address[] memory funders = getAllFunders();
        return funders[index];
    }
}
