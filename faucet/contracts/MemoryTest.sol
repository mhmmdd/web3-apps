// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MemoryTest {

    function test(uint num) external pure returns (uint data) {
        assembly {
            mstore(0x40, 0x90)
        }

        uint8[3] memory items = [1, 2, 3];

        assembly {
            data := mload(add(0x90, 0x20))
        }

        // equivalent to:
        // return num;
    }

    function test2() external pure returns (uint data) {
        assembly {
            let fmp := mload(0x40)

            // hello ASCII code in binary format check here: https://www.rapidtables.com/convert/number/ascii-hex-bin-dec-converter.html
            // 8 bits per byte, h = 01101000, e = 01100101, l = 01101100, l = 01101100, o = 01101111
            // 01101000 01100101 01101100 01101100 01101111
            // hex = 0x68656c6c6f
            // hello
            mstore(add(fmp, 0x00), 0x68656c6c6f)
            data := mload(add(fmp, 0x00))
        }
    }

}
