import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
const WalletContext = createContext(null);
const installableWallets = [
  { id: "metamask", name: "MetaMask", href: "https://metamask.io/download/" },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    href: "https://www.coinbase.com/wallet/downloads",
  },
  { id: "rabby", name: "Rabby", href: "https://rabby.io/" },
];
function firstAddress(result) {
  if (!Array.isArray(result)) {
    return null;
  }
  const next = result.find((item) => typeof item === "string");
  return typeof next === "string" ? next : null;
}
function messageFrom(error) {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 4001
  ) {
    return "Connection was rejected.";
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Could not connect the wallet.";
}
export function WalletProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [connectingId, setConnectingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [announced, setAnnounced] = useState([]);
  const activeProvider = useRef(null);
  const pendingPath = useRef(null);
  const locationRef = useRef(location);
  locationRef.current = location;
  const [injected, setInjected] = useState(null);
  useEffect(() => {
    const found = new Map();
    const onAnnounce = (event) => {
      const detail = event.detail;
      const uuid = detail?.info?.uuid;
      const walletProvider = detail?.provider;
      if (!uuid || !walletProvider) {
        return;
      }
      found.set(uuid, {
        uuid,
        name: detail.info?.name || "Browser wallet",
        icon: detail.info?.icon,
        provider: walletProvider,
      });
      setAnnounced([...found.values()]);
    };
    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
  }, []);
  const wallets = useMemo(() => {
    if (announced.length > 0) {
      return announced;
    }
    return injected ? [injected] : [];
  }, [announced, injected]);
  useEffect(() => {
    let provider;
    try {
      provider = window.ethereum;
    } catch {
      provider = undefined;
    }
    setInjected((current) => {
      if (!provider) {
        return current === null ? current : null;
      }
      if (current?.provider === provider) {
        return current;
      }
      return { uuid: "injected", name: "Browser wallet", provider };
    });
  }, [modalOpen]);
  useEffect(() => {
    if (!address) {
      setModalOpen(true);
    }
  }, [address, location.hash, location.pathname, location.search]);
  useEffect(() => {
    if (!address) {
      return;
    }
    setModalOpen(false);
    const next = pendingPath.current;
    pendingPath.current = null;
    const current = locationRef.current;
    const here = `${current.pathname}${current.search}${current.hash}`;
    if (next && next !== here) {
      navigate(next);
    }
  }, [address, navigate]);
  useEffect(() => {
    const onClick = (event) => {
      if (address) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest(".wallet-modal, .wallet, .state-error")) {
        return;
      }
      const link = target.closest("a");
      if (
        link instanceof HTMLAnchorElement &&
        link.origin === window.location.origin
      ) {
        event.preventDefault();
        event.stopPropagation();
        pendingPath.current = `${link.pathname}${link.search}${link.hash}`;
        setModalOpen((open) => (open ? open : true));
        return;
      }
      const button = target.closest("button");
      if (!button) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      setModalOpen((open) => (open ? open : true));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [address]);
  const onAccounts = useCallback((accounts) => {
    const next = firstAddress(accounts);
    setAddress(next);
    if (!next) {
      setModalOpen(true);
    }
  }, []);
  const openModal = useCallback(() => {
    setError(null);
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    pendingPath.current = null;
    setModalOpen(false);
  }, []);
  const connect = useCallback(
    (wallet) => {
      setConnectingId(wallet.uuid);
      setError(null);
      wallet.provider
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          const next = firstAddress(result);
          if (!next) {
            setError("The wallet did not return an account.");
            return;
          }
          if (activeProvider.current !== wallet.provider) {
            activeProvider.current?.removeListener?.(
              "accountsChanged",
              onAccounts,
            );
            wallet.provider.on?.("accountsChanged", onAccounts);
            activeProvider.current = wallet.provider;
          }
          setAddress(next);
        })
        .catch((caught) => {
          setError(messageFrom(caught));
        })
        .finally(() => {
          setConnectingId(null);
        });
    },
    [onAccounts],
  );
  const disconnect = useCallback(() => {
    activeProvider.current?.removeListener?.("accountsChanged", onAccounts);
    activeProvider.current = null;
    setAddress(null);
    setError(null);
    setModalOpen(true);
  }, [onAccounts]);
  const value = useMemo(
    () => ({
      address,
      error,
      connectingId,
      modalOpen,
      wallets,
      openModal,
      closeModal,
      connect,
      disconnect,
    }),
    [
      address,
      error,
      connectingId,
      modalOpen,
      wallets,
      openModal,
      closeModal,
      connect,
      disconnect,
    ],
  );
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
export function useWallet() {
  const value = useContext(WalletContext);
  if (!value) {
    throw new Error("useWallet must be used within WalletProvider.");
  }
  return value;
}
export { installableWallets };
