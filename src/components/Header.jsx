import { Search, Bell, ChevronDown } from "lucide-react";

export default function Header({ activePage }) {
return (
<header className="topbar">
<div className="page-heading">
<span className="breadcrumb">Aurevia / Workspace</span>
<h1>{activePage}</h1>
</div>

  <div className="header-actions">
    <label className="search-box">
      <Search size={18} />
      <input
        type="search"
        placeholder="Search anything..."
        aria-label="Search"
      />
    </label>

    <button className="icon-button" aria-label="Notifications">
      <Bell size={19} />
      <span className="notification-dot"></span>
    </button>

    <div className="user-profile">
      <div className="avatar">A</div>

      <div className="user-info">
        <strong>Aurevia</strong>
        <span>Project Team</span>
      </div>

      <ChevronDown size={16} />
    </div>
  </div>
</header>

);
}