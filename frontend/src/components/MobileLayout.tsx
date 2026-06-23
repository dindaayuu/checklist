import "./MobileLayout.css";
import type { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({
  children,
}: MobileLayoutProps) {
  return (
    <div className="app-shell">
      <div className="phone-frame">
        <main className="phone-content">
          {children}
        </main>
      </div>
    </div>
  );
}