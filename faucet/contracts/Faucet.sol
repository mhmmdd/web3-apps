// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Faucet {
    // storage variables
    mapping(address => bool) public funders;
    address[] public fundersArray;

    // receive ether
    receive() external payable {

    }

    function addFunds() public payable {
        if (funders[msg.sender] == false) {
            funders[msg.sender] = true;
            fundersArray.push(msg.sender);
        }
    }

    function getAllFunders() public view returns(address[] memory) {
        return fundersArray;
    }

    function getFunderAtIndex(uint index) public view returns(address) {
        return fundersArray[index];
    }
}
