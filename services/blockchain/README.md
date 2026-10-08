# Blockchain service

Local Foundry project for the task verification exercise. `TaskVerification` compiles and can be deployed to Anvil. Verification behavior is not implemented.

The local chain is Anvil at http://127.0.0.1:8545. No mainnet, public testnet, external RPC, or real wallet is required. The key below is Anvil's published development account (account 0).

## Run

From the repository root:

```bash
cd services/blockchain
forge build
forge test
anvil
```

Leave Anvil running. In a second terminal, deploy the placeholder contract:

```bash
cd services/blockchain
forge script script/Deploy.sol --rpc-url local --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

Requires [Foundry](https://book.getfoundry.sh/getting-started/installation).
