// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {TaskVerification} from "../src/TaskVerification.sol";

contract TaskVerificationTest is Test {
    function test_deploys() public {
        TaskVerification verification = new TaskVerification();
        assertTrue(address(verification) != address(0));
    }
}
