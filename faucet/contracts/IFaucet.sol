// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// They can only inherit from other interfaces.
// All functions must be external.
interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}
