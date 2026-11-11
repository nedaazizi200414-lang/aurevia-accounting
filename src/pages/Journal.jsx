import React, { useMemo, useState } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import { transactions, formatUSD } from "../data/transactions";

const compoundEntries = {
  11: {
    debits: [
      { account: "Cash at Bank", amount: 450 },
      { account: "Cost of Goods Sold", amount: 280 },
    ],
    credits: [
      { account: "Sales Revenue", amount: 450 },
      { account: "Inventory", amount: 280 },
    ],
  },
  12: {
    debits: [
      { account: "Accounts Receivable", amount: 800 },
      { account: "Cost of Goods Sold", amount: 480 },
    ],
    credits: [
      { account: "Sales Revenue", amount: 800 },
      { account: "Inventory", amount: 480 },
    ],
  },
};

function getJournalLines(item) {
  if (compoundEntries[item.id]) {
    return compoundEntries[item.id];
  }

  return {
    debits: [
      { account: item.debitAccount, amount: item.amount },
    ],
    credits: [
      { account: item.creditAccount, amount: item.amount },
    ],
  };
}

export default function Journal() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const entries = useMemo(() => {
    return transactions
      .filter((item) => {
        const matchesType =
          filter === "All" || item.type === filter;

        const searchableText = [
          item.id,
          item.date,
          item.description,
          item.debitAccount,
          item.creditAccount,
        ]
          .join(" ")
          .toLowerCase();

        return (
          matchesType &&
          searchableText.includes(search.toLowerCase())
        );
      })
      .sort((a, b) => a.id - b.id);
  }, [search, filter]);

  const totalDebit = entries.reduce(
    (sum, item) => sum + getJournalLines(item).debits.reduce(
      (lineSum, line) => lineSum + line.amount, 0
    ),
    0
  );

  const totalCredit = entries.reduce(
    (sum, item) => sum + getJournalLines(item).credits.reduce(
      (lineSum, line) => lineSum + line.amount, 0
    ),
    0
  );

  return (
    <section className="journal-page">
      <div className="journal-heading">
        <div>
          <span className="page-eyebrow">ACCOUNTING RECORDS</span>
          <h2>General Journal</h2>
          <p>
            A chronological record of all debit and credit entries.
          </p>
        </div>

        <div className="journal-title-icon">
          <BookOpen size={22} />
          <span>2026</span>
        </div>
      </div>

      <div className="journal-summary">
        <div>
          <span>Journal Entries</span>
          <strong>{entries.length}</strong>
        </div>

        <div>
          <span>Total Debit</span>
          <strong>{formatUSD(totalDebit)}</strong>
        </div>

        <div>
          <span>Total Credit</span>
          <strong>{formatUSD(totalCredit)}</strong>
        </div>
      </div>

      <div className="journal-panel">
        <div className="journal-toolbar">
          <div className="journal-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journal..."
            />
          </div>

          <div className="journal-filter">
            <Filter size={16} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Entries</option>
              <option value="Regular">Regular Entries</option>
              <option value="Adjustment">Adjusting Entries</option>
            </select>
          </div>
        </div>

        <div className="journal-table-wrap">
          <table className="journal-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Account / Explanation</th>
                <th>Debit (USD)</th>
                <th>Credit (USD)</th>
              </tr>
            </thead>

            <tbody>
             
      {entries.map((item) => {
        const lines = getJournalLines(item);
      
        return (
          <React.Fragment key={item.id}>
            <tr className="journal-description-row">
              <td>#{item.id}</td>
              <td>{item.date}</td>
              <td colSpan="3">
                {item.description}
                {item.type === "Adjustment" && (
                  <span className="journal-adjustment-tag">Adjusting</span>
                )}
        </td>
      </tr>

      {lines.debits.map((line, index) => (
        <tr key={`debit-${item.id}-${index}`}>
          <td></td><td></td>
          <td className="journal-debit-account">{line.account}</td>
          <td className="journal-money">{formatUSD(line.amount)}</td>
          <td></td>
        </tr>
      ))}

      {lines.credits.map((line, index) => (
        <tr key={`credit-${item.id}-${index}`}>
          <td></td><td></td>
          <td className="journal-credit-account">{line.account}</td>
          <td></td>
          <td className="journal-money">{formatUSD(line.amount)}</td>
        </tr>
      ))}

      <tr className="journal-spacer-row">
        <td colSpan="5"></td>
      </tr>
    </React.Fragment>
  );
})}


              {entries.length === 0 && (
                <tr>
                  <td colSpan="5" className="journal-empty">
                    No journal entries found.
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot>
              <tr>
                <th colSpan="3">TOTAL</th>
                <th>{formatUSD(totalDebit)}</th>
                <th>{formatUSD(totalCredit)}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="journal-balance-note">
          <span>Debit and credit equality</span>
          <strong className={totalDebit === totalCredit ? "balanced" : "unbalanced"}>
            {totalDebit === totalCredit ? "Balanced" : "Not Balanced"}
          </strong>
        </div>
      </div>
    </section>
  );
}
