import { useWallet } from "./WalletProvider";
function shortAddress(address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
export function ConnectWallet() {
  const { address, disconnect, openModal } = useWallet();
  if (address) {
    return (
      <div className="wallet">
        <button
          type="button"
          className="wallet-button connected"
          onClick={disconnect}
        >
          {shortAddress(address)}
        </button>
      </div>
    );
  }
  return (
    <div className="wallet">
      <button type="button" className="wallet-button" onClick={openModal}>
        Connect wallet
      </button>
    </div>
  );
}
