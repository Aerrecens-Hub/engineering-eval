import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { WalletModal } from "../components/WalletModal";
import { WalletProvider } from "../components/WalletProvider";

const PageContent = memo(function PageContent() {
  return (
    <main className="app-content">
      <Outlet />
    </main>
  );
});

export function AppLayout() {
  return (
    <WalletProvider>
      <div className="app-shell">
        <Header />
        <PageContent />
        <WalletModal />
      </div>
    </WalletProvider>
  );
}
