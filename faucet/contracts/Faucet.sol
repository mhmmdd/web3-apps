// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Faucet {
    // storage variables
    address public owner;
    mapping(address => bool) public funders;
    address[] public fundersArray;

    constructor() {
        owner = msg.sender;
    }

    // modifier: only owner can call this function
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // limit modifier: amount of ether requested must be less than 1 ether
    modifier limitWithdraw(uint withdrawAmount) {
        require(withdrawAmount <= 1 ether, "You can only withdraw less than 1 ether");
        _;
    }

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

    // withdraw less than 1 ether
    function withdraw(uint withdrawAmount) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    // test function for onlyOwner modifier
    function testOnlyOwner() public onlyOwner {
        // do something
    }
}
