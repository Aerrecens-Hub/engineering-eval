import { useEffect } from "react";
import { installableWallets, useWallet } from "./WalletProvider";
export function WalletModal() {
  const { error, connectingId, modalOpen, wallets, closeModal, connect } =
    useWallet();
  useEffect(() => {
    if (!modalOpen) {
      return;
    }
    const onKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);
  if (!modalOpen) {
    return null;
  }
  return (
    <div className="wallet-modal" role="presentation" onClick={closeModal}>
      <div
        className="wallet-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="wallet-dialog-header">
          <h2 id="wallet-dialog-title">Connect wallet</h2>
          <button
            type="button"
            className="wallet-close"
            onClick={closeModal}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        {wallets.length > 0 ? (
          <ul className="wallet-options">
            {wallets.map((wallet) => (
              <li key={wallet.uuid}>
                <button
                  type="button"
                  className="wallet-option"
                  onClick={() => connect(wallet)}
                  disabled={connectingId !== null}
                >
                  {wallet.icon ? (
                    <img src={wallet.icon} alt="" width={24} height={24} />
                  ) : null}
                  <span>
                    {connectingId === wallet.uuid ? "Connecting…" : wallet.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="wallet-dialog-copy">
              No wallet was found in this browser. Install one to continue.
            </p>
            <ul className="wallet-options">
              {installableWallets.map((wallet) => (
                <li key={wallet.id}>
                  <a
                    className="wallet-option"
                    href={wallet.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {wallet.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        {error ? <p className="wallet-error">{error}</p> : null}
      </div>
    </div>
  );
}
