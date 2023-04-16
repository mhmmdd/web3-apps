// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Faucet {
    // storage variables
    uint public funds = 1000; // positive value only
    int public counter = -10;

    // receive ether
    receive() external payable {
        funds += msg.value;
    }

    function addTwoNumbers(int a, int b) public pure returns (int) {
        return a + b;
    }
}
