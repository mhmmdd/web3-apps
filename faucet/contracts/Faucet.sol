// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./Owned.sol";
import "./IFaucet.sol";
import "./Logger.sol";

contract Faucet is Owned, Logger, IFaucet {
    // storage variables
    mapping(address => bool) public funders;
    address[] public fundersArray;

    // limit modifier: amount of ether requested must be less than 1 ether
    modifier limitWithdraw(uint withdrawAmount) {
        require(withdrawAmount <= 1 ether, "You can only withdraw less than 1 ether");
        _;
    }

    // receive ether
    receive() external payable {

    }

    function addFunds() override public payable {
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
    function withdraw(uint withdrawAmount) override external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    // test function for onlyOwner modifier
    function testOnlyOwner() public onlyOwner {
        // do something
    }

    // emit log implemented from Logger contract
    // function emitLog(string memory message) public virtual;
    function emitLog(string memory message) public override {
        // do something
    }
}
