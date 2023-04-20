// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Storage {
    // slot 0
    uint8 public a = 7; // 1 byte
    uint16 public b = 8; // 2 bytes
    address public c = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; // 20 bytes
    bool public d = true; // 1 byte
    uint64 public e = 10; // 8 bytes

    // slot is 32 bytes
    uint256 public f = 12; // 32 bytes -> slot 1
    uint256 public g = 13; // 32 bytes -> slot 2

    uint8 public h = 14; // 1 byte -> slot 3
    uint8 public i = 15; // 1 byte -> slot 3


}
