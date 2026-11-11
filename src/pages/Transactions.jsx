
import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  ReceiptText,
  Filter,
} from "lucide-react";
import { transactions } from "../data/transactions";
import { formatUSD } from "../data/transactions";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const transactionList = Array.isArray(transactions)
    ? transactions
    : [];

  const filteredTransactions = useMemo(() => {
    return transactionList.filter((item) => {
      const text = [
        item.id,
        item.date,
        item.description,
        item.account,
        item.debitAccount,
        item.creditAccount,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        String(item.type || "").toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [transactionList, search, filter]);

  return (
    <section className="transactions-page">
      <div className="transactions-heading">
        <div>
          <span className="page-eyebrow">ACCOUNTING RECORDS</span>
          <h2>Transactions</h2>
          <p>Manage and review all company transactions.</p>
        </div>

        <div className="transaction-count">
          <ReceiptText size={19} />
          <span>{transactionList.length} Transactions</span>
        </div>
      </div>

      <div className="transaction-summary">
        <div>
          <span>Total Records</span>
          <strong>{transactionList.length}</strong>
        </div>
        <div>
          <span>Currency</span>
          <strong>USD ($)</strong>
        </div>
        <div>
          <span>Showing</span>
          <strong>{filteredTransactions.length}</strong>
        </div>
      </div>

      <div className="transactions-panel">
        <div className="transactions-toolbar">
          <div className="transaction-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="transaction-filter">
            <Filter size={16} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Adjustment">Adjustments</option>
              <option value="Regular">Regular</option>
            </select>
          </div>
        </div>

        <div className="transactions-table-wrap">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Description</th>
                <th>Debit Account</th>
                <th>Credit Account</th>
                <th>Amount (USD)</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((item, index) => (
                <tr key={item.id || index}>
                  <td>#{item.id || index + 1}</td>
                  <td>{item.date || "—"}</td>
                  <td className="transaction-description">
                    {item.description || "—"}
                  </td>
                  <td>{item.debitAccount || "—"}</td>
                  <td>{item.creditAccount || "—"}</td>
                  <td className="transaction-amount">
                    {formatUSD
                      ? formatUSD(Number(item.amount || 0))
                      : `$${Number(item.amount || 0).toFixed(2)}`}
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-transactions">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
