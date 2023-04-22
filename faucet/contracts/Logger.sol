// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract Logger {
    function emitLog(string memory message) public virtual;

    // Abstract Contract can have function implementation
    function test() public pure returns (uint) {
        return 1;
    }
}
