# Blockchain: verify a task

**Time:** about 15–20 minutes
**Where:** `TaskVerification` in `services/blockchain/src/TaskVerification.sol`
**Leave alone:** public networks, real wallets, and external RPCs — stay on local Anvil

## Before you start

Create a new git branch from `main`, then do all of your work on that branch.

Use your name and birthday in the branch name, lowercase, with hyphens:

```bash
git checkout main
git pull
git checkout -b alex-chen-19900315
```

Example pattern: `<first>-<last>-<YYYYMMDD>`

## What you are building

Foundry, the deploy script, and Anvil config are already set up. The contract file is a placeholder.

You will store a one-time verification hash per task id, expose read methods for that state, and emit an event when a verification is stored successfully.

## Requirements

```solidity
function verifyTask(uint256 taskId, bytes32 taskHash) external;
function isVerified(uint256 taskId) external view returns (bool);
function getTaskHash(uint256 taskId) external view returns (bytes32);
event TaskVerified(uint256 taskId, bytes32 taskHash);
```

Calling `verifyTask(123, hash)` stores the hash and emits `TaskVerified`. After that, `isVerified(123)` is `true` and `getTaskHash(123)` returns the same hash.

- Before verification: `isVerified` is `false` and `getTaskHash` is `bytes32(0)`
- Different task ids do not affect each other
- A second `verifyTask` for the same id reverts, keeps the stored hash, and does not emit again
- Emit `TaskVerified` only when a verification is newly stored

The same sequence on a fresh deployment should produce the same storage and events.

## How to run

Requires [Foundry](https://book.getfoundry.sh/getting-started/installation).

```bash
cd services/blockchain
forge build
forge test
anvil
```

Deploy with Anvil account 0 (published local development key):

```bash
cd services/blockchain
forge script script/Deploy.sol --rpc-url local --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

Anvil: http://127.0.0.1:8545. After the functions exist, call them with `cast` and confirm `TaskVerified` is emitted.

## Done when

`forge test` passes for the behaviors above, and a second verify for the same id reverts without changing storage.
