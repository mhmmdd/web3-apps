// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Faucet {
    // storage variables
    uint public numOfFunders;
    mapping(uint => address) public funders;

    // receive ether
    receive() external payable {

    }

    function addFunds() public payable {
        funders[numOfFunders] = msg.sender;
        numOfFunders++;
    }

    function getAllFunders() public view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);
        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = funders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint index) public view returns (address) {
        return funders[index];
    }
}
