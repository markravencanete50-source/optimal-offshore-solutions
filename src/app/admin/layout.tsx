import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — Optimal Offshore Solutions",
  robots: { index: false, follow: false },
};

// Applies the saved admin theme (or the OS preference) before first paint so
// dark mode doesn't flash white. Stored under `oos-adm-theme`.
const themeInit = `(function(){try{var t=localStorage.getItem("oos-adm-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-adm-theme",t);}catch(e){}})();`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adm">
      <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      {children}
    </div>
  );
}
