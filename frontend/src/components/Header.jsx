import { memo } from "react";
import { ConnectWallet } from "./ConnectWallet";
import { Sidebar } from "./Sidebar";
export const Header = memo(function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <p className="header-title">Engineering Operations</p>
        <Sidebar />
      </div>
      <ConnectWallet />
    </header>
  );
});
