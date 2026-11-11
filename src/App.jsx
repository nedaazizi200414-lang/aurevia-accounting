
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Journal from "./pages/Journal";
import Ledger from "./pages/Ledger";
import "./index.css";
import GeneralLedger from "./pages/GeneralLedger";
import TrialBalance from "./pages/TrialBalance";
import Adjustments from "./pages/Adjustments";
import FinancialStatements from "./pages/FinancialStatements";
import CashFlow from "./pages/CashFlow";
import Notes from "./pages/Notes";
export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <Header activePage={activePage} />

        <div className="page-content">
          {activePage === "Dashboard" ? (
            <Dashboard />
          ) : activePage === "Transactions" ? (
            <Transactions />
          ) : activePage === "General Journal" ? (
            <Journal />
          ) : activePage === "Ledger Accounts" ? (
            <Ledger />
          ) : activePage === "General Ledger" ? (
              <GeneralLedger />
         ) : activePage === "Trial Balance" ? (
         <TrialBalance />
         ) : activePage === "Adjustments" ? (
        <Adjustments />
        ) : activePage === "Financial Statements" ? (
        <FinancialStatements />
        ) : activePage === "Cash Flow" ? (
        <CashFlow />
        ) : activePage === "Notes" ? (
      <Notes />
            ):( 
            <section className="placeholder-page">
              <span>AUREVIA ACCOUNTING SYSTEM</span>
              <h2>{activePage}</h2>
              <p>This section will be developed in the next stage.</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
