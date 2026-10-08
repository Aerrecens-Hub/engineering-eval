// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {TaskVerification} from "../src/TaskVerification.sol";

contract Deploy is Script {
    function run() external returns (TaskVerification verification) {
        vm.startBroadcast();
        verification = new TaskVerification();
        vm.stopBroadcast();
    }
}
