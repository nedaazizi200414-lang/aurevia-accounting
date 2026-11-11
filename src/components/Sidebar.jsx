import {
  LayoutDashboard,
  ArrowLeftRight,
  BookOpen,
  BookMarked,
  BookCopy,
  Scale,
  SlidersHorizontal,
  ChartNoAxesCombined,
  Wallet,
  FileText,
  Settings,
  Building2
} from "lucide-react";

const menuItems = [
{ name: "Dashboard", icon: LayoutDashboard },
{ name: "Transactions", icon: ArrowLeftRight },
{ name: "General Journal", icon: BookOpen },
{ name: "Ledger Accounts", icon: BookMarked },
{ name: "General Ledger", icon: BookCopy },
{ name: "Trial Balance", icon: Scale },
{ name: "Adjustments", icon: SlidersHorizontal },
{ name: "Financial Statements", icon: ChartNoAxesCombined },
{ name: "Cash Flow", icon: Wallet },
{ name: "Notes", icon: FileText },
];

export default function Sidebar({ activePage, onNavigate }) {
return (
<aside className="sidebar">
<div className="brand">
<div className="brand-icon">
<Building2 size={25} />
</div>

    <div>
      <h2>AUREVIA</h2>
      <span>ACCOUNTING SYSTEM</span>
    </div>
  </div>

  <div className="menu-label">WORKSPACE</div>

  <nav className="sidebar-nav">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <button
          key={item.name}
          className={`nav-item ${
            activePage === item.name ? "active" : ""
          }`}
          onClick={() => onNavigate(item.name)}
        >
          <Icon size={19} strokeWidth={1.8} />
          <span>{item.name}</span>
        </button>
      );
    })}
  </nav>

  <div className="sidebar-bottom">
    <Settings size={18} />
    <span>Project Workspace</span>
  </div>

  <div className="sidebar-footer">
    Better Records. Better Decisions.
  </div>
</aside>

);
}