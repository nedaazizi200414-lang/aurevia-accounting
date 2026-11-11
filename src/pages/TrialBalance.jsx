
import { useState } from "react";
import { formatUSD } from "../data/transactions";

const unadjusted = [
  ["Cash at Bank", 25530, 0],
  ["Accounts Receivable", 800, 0],
  ["Accounts Receivable – Bright Future School", 500, 0],
  ["Inventory", 240, 0],
  ["Office Supplies", 650, 0],
  ["Prepaid Insurance", 1200, 0],
  ["Office Equipment", 2200, 0],
  ["Accounts Payable – ABC Stationery", 0, 250],
  ["Bank Loan Payable", 0, 5000],
  ["Unearned Service Revenue", 0, 1000],
  ["Owner's Capital", 0, 25000],
  ["Owner's Drawing", 500, 0],
  ["Service Revenue", 0, 2300],
  ["Sales Revenue", 0, 1250],
  ["Consulting Revenue", 0, 950],
  ["Interest Income", 0, 35],
  ["Cost of Goods Sold", 760, 0],
  ["Rent Expense", 1200, 0],
  ["Salaries Expense", 1600, 0],
  ["Advertising Expense", 350, 0],
  ["Electricity Expense", 120, 0],
  ["Fuel Expense", 110, 0],
  ["Bank Charges Expense", 25, 0],
];

const adjusted = [
  ["Cash at Bank", 25530, 0],
  ["Accounts Receivable", 1350, 0],
  ["Accounts Receivable – Bright Future School", 500, 0],
  ["Inventory", 240, 0],
  ["Office Supplies", 230, 0],
  ["Prepaid Insurance", 900, 0],
  ["Office Equipment", 2200, 0],
  ["Accumulated Depreciation", 0, 70],
  ["Accounts Payable – ABC Stationery", 0, 250],
  ["Bank Loan Payable", 0, 5000],
  ["Unearned Service Revenue", 0, 1000],
  ["Salaries Payable", 0, 650],
  ["Electricity Payable", 0, 85],
  ["Owner's Capital", 0, 25000],
  ["Owner's Drawing", 500, 0],
  ["Service Revenue", 0, 2850],
  ["Sales Revenue", 0, 1250],
  ["Consulting Revenue", 0, 950],
  ["Interest Income", 0, 35],
  ["Cost of Goods Sold", 760, 0],
  ["Rent Expense", 1200, 0],
  ["Salaries Expense", 2250, 0],
  ["Advertising Expense", 350, 0],
  ["Electricity Expense", 205, 0],
  ["Fuel Expense", 110, 0],
  ["Bank Charges Expense", 25, 0],
  ["Depreciation Expense", 70, 0],
  ["Office Supplies Expense", 420, 0],
  ["Insurance Expense", 300, 0],
];

export default function TrialBalance() {
  const [type, setType] = useState("adjusted");

  const rows = type === "adjusted" ? adjusted : unadjusted;

  const totalDebit = rows.reduce((sum, row) => sum + row[1], 0);
  const totalCredit = rows.reduce((sum, row) => sum + row[2], 0);
  const balanced = totalDebit === totalCredit;

  return (
    <div style={{ padding: "24px", color: "var(--text-primary, #fff)" }}>
      <div style={{ marginBottom: "24px" }}>
        <span style={{ color: "#C6A45A", fontSize: "12px" }}>
          AUREVIA ACCOUNTING SYSTEM
        </span>
        <h2 style={{ margin: "8px 0" }}>Trial Balance</h2>
        <p style={{ color: "#999" }}>
          Summary of all ledger account balances · 2026
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          onClick={() => setType("unadjusted")}
          style={{
            padding: "11px 16px",
            borderRadius: "8px",
            border: "1px solid #C6A45A",
            background: type === "unadjusted" ? "#C6A45A" : "transparent",
            color: type === "unadjusted" ? "#111" : "inherit",
          }}
        >
          Unadjusted Trial Balance
        </button>

        <button
          onClick={() => setType("adjusted")}
          style={{
            padding: "11px 16px",
            borderRadius: "8px",
            border: "1px solid #C6A45A",
            background: type === "adjusted" ? "#C6A45A" : "transparent",
            color: type === "adjusted" ? "#111" : "inherit",
          }}
        >
          Adjusted Trial Balance
        </button>
      </div>

      <div style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "20px"
      }}>
        <div style={{
          flex: "1 1 150px",
          padding: "16px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Total Debit</small>
          <h3>{formatUSD(totalDebit)}</h3>
        </div>

        <div style={{
          flex: "1 1 150px",
          padding: "16px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Total Credit</small>
          <h3>{formatUSD(totalCredit)}</h3>
        </div>

        <div style={{
          flex: "1 1 150px",
          padding: "16px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Balance Status</small>
          <h3 style={{ color: balanced ? "#36B37E" : "#E05252" }}>
            {balanced ? "Balanced" : "Unbalanced"}
          </h3>
        </div>
      </div>

      <div style={{
        overflowX: "auto",
        borderRadius: "10px",
        background: "var(--card-bg, #202938)"
      }}>
        <table style={{
          width: "100%",
          minWidth: "600px",
          borderCollapse: "collapse",
          textAlign: "left"
        }}>
          <thead>
            <tr style={{ background: "#C6A45A", color: "#111" }}>
              <th style={{ padding: "13px" }}>Account Name</th>
              <th style={{ padding: "13px", textAlign: "right" }}>Debit ($)</th>
              <th style={{ padding: "13px", textAlign: "right" }}>Credit ($)</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #55555530" }}>
                <td style={{ padding: "12px" }}>{row[0]}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {row[1] ? formatUSD(row[1]) : "—"}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {row[2] ? formatUSD(row[2]) : "—"}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr style={{
              borderTop: "2px solid #C6A45A",
              fontWeight: "bold"
            }}>
              <td style={{ padding: "14px" }}>TOTAL</td>
              <td style={{ padding: "14px", textAlign: "right" }}>
                {formatUSD(totalDebit)}
              </td>
              <td style={{ padding: "14px", textAlign: "right" }}>
                {formatUSD(totalCredit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
