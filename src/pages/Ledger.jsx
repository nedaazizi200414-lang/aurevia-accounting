
import React, { useMemo, useState } from "react";
import { Search, BookOpen, Wallet } from "lucide-react";
import { transactions, formatUSD } from "../data/transactions";

const compoundEntries = {
  11: [
    { account: "Cash at Bank", debit: 450, credit: 0 },
    { account: "Cost of Goods Sold", debit: 280, credit: 0 },
    { account: "Sales Revenue", debit: 0, credit: 450 },
    { account: "Inventory", debit: 0, credit: 280 },
  ],
  12: [
    { account: "Accounts Receivable", debit: 800, credit: 0 },
    { account: "Cost of Goods Sold", debit: 480, credit: 0 },
    { account: "Sales Revenue", debit: 0, credit: 800 },
    { account: "Inventory", debit: 0, credit: 480 },
  ],
};

export default function Ledger() {
  const [selectedAccount, setSelectedAccount] = useState("All Accounts");
  const [search, setSearch] = useState("");

  const ledgerEntries = useMemo(() => {
    return transactions
      .flatMap((item) => {
        const compound = compoundEntries[String(item.id)];

        if (compound) {
          return compound.map((line) => ({
            id: item.id,
            date: item.date,
            description: item.description,
            account: line.account,
            debit: line.debit,
            credit: line.credit,
          }));
        }

        return [
          {
            id: item.id,
            date: item.date,
            description: item.description,
            account: item.debitAccount,
            debit: Number(item.amount) || 0,
            credit: 0,
          },
          {
            id: item.id,
            date: item.date,
            description: item.description,
            account: item.creditAccount,
            debit: 0,
            credit: Number(item.amount) || 0,
          },
        ];
      })
      .filter((entry) => entry.account)
      .sort((a, b) => {
        const dateCompare = String(a.date).localeCompare(String(b.date));
        return dateCompare || Number(a.id) - Number(b.id);
      });
  }, []);

  const accounts = useMemo(() => {
    return [...new Set(ledgerEntries.map((entry) => entry.account))].sort();
  }, [ledgerEntries]);

  const visibleAccounts = accounts.filter((account) =>
    account.toLowerCase().includes(search.toLowerCase())
  );

  const accountTotals = useMemo(() => {
    return accounts.map((account) => {
      const rows = ledgerEntries.filter(
        (entry) => entry.account === account
      );

      const debit = rows.reduce((sum, row) => sum + row.debit, 0);
      const credit = rows.reduce((sum, row) => sum + row.credit, 0);
      const balance = debit - credit;

      return { account, debit, credit, balance };
    });
  }, [accounts, ledgerEntries]);

  const displayedEntries = ledgerEntries.filter((entry) => {
    const matchesAccount =
      selectedAccount === "All Accounts" ||
      entry.account === selectedAccount;

    const matchesSearch =
      selectedAccount !== "All Accounts" ||
      entry.account.toLowerCase().includes(search.toLowerCase());

    return matchesAccount && matchesSearch;
  });

  let runningBalance = 0;

  const rowsWithBalance = displayedEntries.map((entry) => {
    runningBalance += selectedAccount === "All Accounts"
  ? 0
  : entry.debit - entry.credit;

    return {
      ...entry,
      balanceDebit: runningBalance > 0 ? runningBalance : 0,
      balanceCredit: runningBalance < 0 ? Math.abs(runningBalance) : 0,
    };
  });

  const totalDebit = ledgerEntries.reduce(
    (sum, entry) => sum + entry.debit,
    0
  );

  const totalCredit = ledgerEntries.reduce(
    (sum, entry) => sum + entry.credit,
    0
  );

  return (
    <div className="ledger-page">
      <div className="ledger-heading">
        <div>
          <span className="ledger-eyebrow">AUREVIA ACCOUNTING SYSTEM</span>
          <h1>Ledger Accounts</h1>
          <p>Individual account records posted from the General Journal.</p>
        </div>
        <div className="ledger-heading-icon">
          <BookOpen size={25} />
        </div>
      </div>

      <div className="ledger-summary">
        <div className="ledger-summary-card">
          <span>Total Accounts</span>
          <strong>{accounts.length}</strong>
        </div>
        <div className="ledger-summary-card">
          <span>Total Debits</span>
          <strong>{formatUSD(totalDebit)}</strong>
        </div>
        <div className="ledger-summary-card">
          <span>Total Credits</span>
          <strong>{formatUSD(totalCredit)}</strong>
        </div>
        <div className="ledger-summary-card">
          <span>Difference</span>
          <strong>{formatUSD(Math.abs(totalDebit - totalCredit))}</strong>
        </div>
      </div>

      <div className="ledger-layout">
        <aside className="ledger-account-panel">
          <h3><Wallet size={17} /> Select Account</h3>

          <div className="ledger-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedAccount("All Accounts");
              }}
              placeholder="Search accounts..."
            />
          </div>

          <button
            className={`ledger-account-button ${
              selectedAccount === "All Accounts" ? "active" : ""
            }`}
            onClick={() => setSelectedAccount("All Accounts")}
          >
            All Accounts
            <span>{ledgerEntries.length}</span>
          </button>

          {visibleAccounts.map((account) => {
            const count = ledgerEntries.filter(
              (entry) => entry.account === account
            ).length;

            return (
              <button
                key={account}
                className={`ledger-account-button ${
                  selectedAccount === account ? "active" : ""
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                {account}
                <span>{count}</span>
              </button>
            );
          })}
        </aside>

        <section className="ledger-table-panel">
          <div className="ledger-table-heading">
            <div>
              <h2>{selectedAccount}</h2>
              <p>{rowsWithBalance.length} ledger entries</p>
            </div>
          </div>

          <div className="ledger-table-wrap">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Description</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance Dr.</th>
                  <th>Balance Cr.</th>
                </tr>
              </thead>
              <tbody>
                {rowsWithBalance.map((entry, index) => (
                  <tr key={`${entry.id}-${entry.account}-${index}`}>
                    <td>{entry.date}</td>
                    <td>{entry.account}</td>
                    <td>{entry.description}</td>
                    <td>{entry.debit ? formatUSD(entry.debit) : "—"}</td>
                    <td>{entry.credit ? formatUSD(entry.credit) : "—"}</td>
                    <td>
                      {entry.balanceDebit
                        ? formatUSD(entry.balanceDebit)
                        : "—"}
                    </td>
                    <td>
                      {entry.balanceCredit
                        ? formatUSD(entry.balanceCredit)
                        : "—"}
                    </td>
                  </tr>
                ))}

                {rowsWithBalance.length === 0 && (
                  <tr>
                    <td colSpan="7" className="ledger-empty">
                      No ledger entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="ledger-balances-panel">
        <h2>Account Balances Summary</h2>
        <div className="ledger-table-wrap">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Total Debit</th>
                <th>Total Credit</th>
                <th>Net Balance</th>
                <th>Balance Side</th>
              </tr>
            </thead>
            <tbody>
              {accountTotals.map((item) => (
                <tr key={item.account}>
                  <td>{item.account}</td>
                  <td>{formatUSD(item.debit)}</td>
                  <td>{formatUSD(item.credit)}</td>
                  <td>{formatUSD(Math.abs(item.balance))}</td>
                  <td>
                    {item.balance > 0
                      ? "Debit"
                      : item.balance < 0
                      ? "Credit"
                      : "Zero"}
                  </td>
                </tr>
              ))}
              <tr className="ledger-total-row">
                <td>Totals</td>
                <td>{formatUSD(totalDebit)}</td>
                <td>{formatUSD(totalCredit)}</td>
                <td colSpan="2">
                  {totalDebit === totalCredit ? "Balanced" : "Not Balanced"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
