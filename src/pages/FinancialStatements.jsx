
import { useState } from "react";
import { formatUSD } from "../data/transactions";

const revenues = [
  ["Service Revenue", 2850],
  ["Sales Revenue", 1250],
  ["Consulting Revenue", 950],
  ["Interest Income", 35],
];

const expenses = [
  ["Cost of Goods Sold", 760],
  ["Rent Expense", 1200],
  ["Salaries Expense", 2250],
  ["Advertising Expense", 350],
  ["Electricity Expense", 205],
  ["Fuel Expense", 110],
  ["Bank Charges Expense", 25],
  ["Depreciation Expense", 70],
  ["Office Supplies Expense", 420],
  ["Insurance Expense", 300],
];

const assets = [
  ["Cash at Bank", 25530],
  ["Accounts Receivable", 1350],
  ["Accounts Receivable – Bright Future School", 500],
  ["Inventory", 240],
  ["Office Supplies", 230],
  ["Prepaid Insurance", 900],
  ["Office Equipment", 2200],
  ["Less: Accumulated Depreciation", -70],
];

const liabilities = [
  ["Accounts Payable – ABC Stationery", 250],
  ["Bank Loan Payable", 5000],
  ["Unearned Service Revenue", 1000],
  ["Salaries Payable", 650],
  ["Electricity Payable", 85],
];

const totalRevenue = revenues.reduce((s, x) => s + x[1], 0);
const totalExpenses = expenses.reduce((s, x) => s + x[1], 0);
const netIncome = totalRevenue - totalExpenses;
const totalAssets = assets.reduce((s, x) => s + x[1], 0);
const totalLiabilities = liabilities.reduce((s, x) => s + x[1], 0);
const endingCapital = 25000 - 500 + netIncome;
const totalLiabilitiesAndEquity = totalLiabilities + endingCapital;

function ReportRow({ label, amount, bold = false }) {
  return (
    <tr style={{
      borderBottom: "1px solid #55555530",
      fontWeight: bold ? "bold" : "normal"
    }}>
      <td style={{ padding: "12px" }}>{label}</td>
      <td style={{ padding: "12px", textAlign: "right" }}>
        {formatUSD(amount)}
      </td>
    </tr>
  );
}

export default function FinancialStatements() {
  const [report, setReport] = useState("income");
  const balanced = totalAssets === totalLiabilitiesAndEquity;

  return (
    <div style={{ padding: "24px", color: "var(--text-primary, #fff)" }}>
      <div style={{ marginBottom: "24px" }}>
        <span style={{ color: "#C6A45A", fontSize: "12px" }}>
          AUREVIA ACCOUNTING SYSTEM
        </span>
        <h2 style={{ margin: "8px 0" }}>Financial Statements</h2>
        <p style={{ color: "#999" }}>
          Financial reports for the year ended December 31, 2026
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "22px"
      }}>
        <button
          onClick={() => setReport("income")}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #C6A45A",
            background: report === "income" ? "#C6A45A" : "transparent",
            color: report === "income" ? "#111" : "inherit"
          }}
        >
          Income Statement
        </button>

        <button
          onClick={() => setReport("balance")}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #C6A45A",
            background: report === "balance" ? "#C6A45A" : "transparent",
            color: report === "balance" ? "#111" : "inherit"
          }}
        >
          Balance Sheet
        </button>
      </div>

      {report === "income" ? (
        <div style={{
          padding: "20px",
          borderRadius: "12px",
          background: "var(--card-bg, #202938)"
        }}>
          <h3 style={{ textAlign: "center" }}>
            AUREVIA ACCOUNTING & TRADING LLC
          </h3>
          <h3 style={{ textAlign: "center" }}>Income Statement</h3>
          <p style={{ textAlign: "center", color: "#999" }}>
            For the Year Ended December 31, 2026
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td colSpan="2" style={{ padding: "14px", color: "#C6A45A" }}>
                  <strong>REVENUES</strong>
                </td>
              </tr>

              {revenues.map(([name, amount]) => (
                <ReportRow key={name} label={name} amount={amount} />
              ))}

              <ReportRow
                label="Total Revenue"
                amount={totalRevenue}
                bold
              />

              <tr>
                <td colSpan="2" style={{ padding: "14px", color: "#C6A45A" }}>
                  <strong>EXPENSES</strong>
                </td>
              </tr>

              {expenses.map(([name, amount]) => (
                <ReportRow key={name} label={name} amount={amount} />
              ))}

              <ReportRow
                label="Total Expenses"
                amount={totalExpenses}
                bold
              />

              <ReportRow
                label="NET INCOME / (LOSS)"
                amount={netIncome}
                bold
              />
            </tbody>
          </table>

          <p style={{
            marginTop: "18px",
            color: netIncome < 0 ? "#E58A8A" : "#65C995",
            fontWeight: "bold"
          }}>
            {netIncome < 0 ? "Net Loss" : "Net Income"}: {formatUSD(Math.abs(netIncome))}
          </p>
        </div>
      ) : (
        <div style={{
          padding: "20px",
          borderRadius: "12px",
          background: "var(--card-bg, #202938)"
        }}>
          <h3 style={{ textAlign: "center" }}>
            AUREVIA ACCOUNTING & TRADING LLC
          </h3>
          <h3 style={{ textAlign: "center" }}>Balance Sheet</h3>
          <p style={{ textAlign: "center", color: "#999" }}>
            As of December 31, 2026
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td colSpan="2" style={{ padding: "14px", color: "#C6A45A" }}>
                  <strong>ASSETS</strong>
                </td>
              </tr>

              {assets.map(([name, amount]) => (
                <ReportRow key={name} label={name} amount={amount} />
              ))}

              <ReportRow
                label="TOTAL ASSETS"
                amount={totalAssets}
                bold
              />

              <tr>
                <td colSpan="2" style={{ padding: "14px", color: "#C6A45A" }}>
                  <strong>LIABILITIES</strong>
                </td>
              </tr>

              {liabilities.map(([name, amount]) => (
                <ReportRow key={name} label={name} amount={amount} />
              ))}

              <ReportRow
                label="Total Liabilities"
                amount={totalLiabilities}
                bold
              />

              <tr>
                <td colSpan="2" style={{ padding: "14px", color: "#C6A45A" }}>
                  <strong>OWNER'S EQUITY</strong>
                </td>
              </tr>

              <ReportRow label="Owner's Capital" amount={25000} />
              <ReportRow label="Less: Owner's Drawing" amount={-500} />
              <ReportRow label="Add: Net Income / (Loss)" amount={netIncome} />

              <ReportRow
                label="Ending Owner's Equity"
                amount={endingCapital}
                bold
              />

              <ReportRow
                label="TOTAL LIABILITIES AND EQUITY"
                amount={totalLiabilitiesAndEquity}
                bold
              />
            </tbody>
          </table>

          <div style={{
            marginTop: "20px",
            padding: "14px",
            borderRadius: "8px",
            background: balanced ? "#1D4938" : "#642E2E",
            color: balanced ? "#8CE0B4" : "#FFAAAA"
          }}>
            {balanced
              ? "✓ Balance Sheet is balanced."
              : "⚠ Balance Sheet is not balanced."}
          </div>
        </div>
      )}
    </div>
  );
}
