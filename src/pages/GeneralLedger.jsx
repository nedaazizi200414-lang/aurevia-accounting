
import React, { useMemo, useState } from "react";
import { Search, BookCopy } from "lucide-react";
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

function normalizeAccount(account) {
  if (
    account === "Accumulated Depreciation – Office Equipment"
  ) {
    return "Accumulated Depreciation";
  }

  return account;
}

function buildLedgerEntries() {
  return transactions
    .flatMap((item) => {
      const compound = compoundEntries[item.id];

      if (compound) {
        return compound.map((line) => ({
          id: item.id,
          date: item.date,
          description: item.description,
          account: normalizeAccount(line.account),
          debit: line.debit,
          credit: line.credit,
          type: item.type,
        }));
      }

      return [
        {
          id: item.id,
          date: item.date,
          description: item.description,
          account: normalizeAccount(item.debitAccount),
          debit: Number(item.amount) || 0,
          credit: 0,
          type: item.type,
        },
        {
          id: item.id,
          date: item.date,
          description: item.description,
          account: normalizeAccount(item.creditAccount),
          debit: 0,
          credit: Number(item.amount) || 0,
          type: item.type,
        },
      ];
    })
    .filter((entry) => entry.account)
    .sort((a, b) => {
      const dateOrder = a.date.localeCompare(b.date);
      return dateOrder || a.id - b.id;
    });
}

export default function GeneralLedger() {
  const [search, setSearch] = useState("");
  const [showAdjustments, setShowAdjustments] = useState(true);

  const ledgerEntries = useMemo(() => buildLedgerEntries(), []);

  const accounts = useMemo(() => {
    return [...new Set(ledgerEntries.map((entry) => entry.account))].sort();
  }, [ledgerEntries]);

  const accountGroups = useMemo(() => {
    return accounts
      .filter((account) =>
        account.toLowerCase().includes(search.toLowerCase())
      )
      .map((account) => {
        const entries = ledgerEntries.filter(
          (entry) =>
            entry.account === account &&
            (showAdjustments || entry.type !== "Adjustment")
        );

        let runningBalance = 0;

        const rows = entries.map((entry) => {
          runningBalance += entry.debit - entry.credit;

          return {
            ...entry,
            balance: Math.abs(runningBalance),
            side:
              runningBalance > 0
                ? "Debit"
                : runningBalance < 0
                ? "Credit"
                : "Zero",
          };
        });

        const debit = entries.reduce(
          (sum, entry) => sum + entry.debit,
          0
        );

        const credit = entries.reduce(
          (sum, entry) => sum + entry.credit,
          0
        );

        return {
          account,
          rows,
          debit,
          credit,
          balance: Math.abs(debit - credit),
          side:
            debit > credit
              ? "Debit"
              : credit > debit
              ? "Credit"
              : "Zero",
        };
      })
      .filter((group) => group.rows.length > 0);
  }, [accounts, ledgerEntries, search, showAdjustments]);

  const totalDebit = accountGroups.reduce(
    (sum, group) => sum + group.debit,
    0
  );

  const totalCredit = accountGroups.reduce(
    (sum, group) => sum + group.credit,
    0
  );

  return (
    <div className="general-ledger-page">
      <div className="general-ledger-heading">
        <div>
          <span className="general-ledger-eyebrow">
            AUREVIA ACCOUNTING SYSTEM
          </span>
          <h1>General Ledger</h1>
          <p>
            Complete account-by-account record of journal postings.
          </p>
        </div>

        <div className="general-ledger-icon">
          <BookCopy size={25} />
        </div>
      </div>

      <div className="general-ledger-summary">
        <div className="general-ledger-card">
          <span>Accounts</span>
          <strong>{accountGroups.length}</strong>
        </div>

        <div className="general-ledger-card">
          <span>Total Debits</span>
          <strong>{formatUSD(totalDebit)}</strong>
        </div>

        <div className="general-ledger-card">
          <span>Total Credits</span>
          <strong>{formatUSD(totalCredit)}</strong>
        </div>

        <div className="general-ledger-card">
          <span>Difference</span>
          <strong>{formatUSD(Math.abs(totalDebit - totalCredit))}</strong>
        </div>
      </div>

      <div className="general-ledger-controls">
        <div className="general-ledger-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search account..."
          />
        </div>

        <label className="general-ledger-toggle">
          <input
            type="checkbox"
            checked={showAdjustments}
            onChange={(event) =>
              setShowAdjustments(event.target.checked)
            }
          />
          Include adjusting entries
        </label>
      </div>

      <div className="general-ledger-accounts">
        {accountGroups.map((group) => (
          <section
            className="general-ledger-account"
            key={group.account}
          >
            <div className="general-ledger-account-heading">
              <div>
                <h2>{group.account}</h2>
                <span>{group.rows.length} postings</span>
              </div>

              <div className="general-ledger-ending">
                <span>Ending Balance</span>
                <strong>{formatUSD(group.balance)}</strong>
                <small>{group.side} Balance</small>
              </div>
            </div>

            <div className="general-ledger-table-wrap">
              <table className="general-ledger-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ref.</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Running Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {group.rows.map((row, index) => (
                    <tr key={`${row.id}-${index}`}>
                      <td>{row.date}</td>
                      <td>JE-{String(row.id).padStart(3, "0")}</td>
                      <td>
                        {row.description}
                        {row.type === "Adjustment" && (
                          <span className="general-ledger-adjustment">
                            Adjusting
                          </span>
                        )}
                      </td>
                      <td>
                        {row.debit ? formatUSD(row.debit) : "—"}
                      </td>
                      <td>
                        {row.credit ? formatUSD(row.credit) : "—"}
                      </td>
                      <td>
                        {formatUSD(row.balance)} {row.side}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="3">Account Totals</td>
                    <td>{formatUSD(group.debit)}</td>
                    <td>{formatUSD(group.credit)}</td>
                    <td>
                      {formatUSD(group.balance)} {group.side}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        ))}

        {accountGroups.length === 0 && (
          <p className="general-ledger-empty">
            No accounts match your search.
          </p>
        )}
      </div>

      <div className="general-ledger-final">
        <h2>General Ledger Control Totals</h2>

        <div>
          <span>Total Debit Postings</span>
          <strong>{formatUSD(totalDebit)}</strong>
        </div>

        <div>
          <span>Total Credit Postings</span>
          <strong>{formatUSD(totalCredit)}</strong>
        </div>

        <div>
          <span>Difference</span>
          <strong>{formatUSD(Math.abs(totalDebit - totalCredit))}</strong>
        </div>

        <p className={totalDebit === totalCredit ? "ledger-balanced" : "ledger-unbalanced"}>
          {totalDebit === totalCredit
            ? "Debits and credits are balanced."
            : "Warning: Debits and credits do not balance."}
        </p>
      </div>
    </div>
  );
}
