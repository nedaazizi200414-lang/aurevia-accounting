
import { formatUSD } from "../data/transactions";

const adjustments = [
  {
    id: 25,
    date: "2026-12-31",
    description: "Accrued salaries",
    debitAccount: "Salaries Expense",
    creditAccount: "Salaries Payable",
    amount: 650,
  },
  {
    id: 26,
    date: "2026-12-31",
    description: "Accrued electricity expense",
    debitAccount: "Electricity Expense",
    creditAccount: "Electricity Payable",
    amount: 85,
  },
  {
    id: 27,
    date: "2026-12-31",
    description: "Accrued service revenue",
    debitAccount: "Accounts Receivable",
    creditAccount: "Service Revenue",
    amount: 550,
  },
  {
    id: 28,
    date: "2026-12-31",
    description: "Depreciation of office equipment",
    debitAccount: "Depreciation Expense",
    creditAccount: "Accumulated Depreciation – Office Equipment",
    amount: 70,
  },
  {
    id: 29,
    date: "2026-12-31",
    description: "Office supplies used",
    debitAccount: "Office Supplies Expense",
    creditAccount: "Office Supplies",
    amount: 420,
  },
  {
    id: 30,
    date: "2026-12-31",
    description: "Insurance expired",
    debitAccount: "Insurance Expense",
    creditAccount: "Prepaid Insurance",
    amount: 300,
  },
];

export default function Adjustments() {
  const totalDebit = adjustments.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalCredit = totalDebit;

  return (
    <div style={{ padding: "24px", color: "var(--text-primary, #fff)" }}>
      <div style={{ marginBottom: "24px" }}>
        <span style={{ color: "#C6A45A", fontSize: "12px" }}>
          AUREVIA ACCOUNTING SYSTEM
        </span>

        <h2 style={{ margin: "8px 0" }}>Adjusting Entries</h2>

        <p style={{ color: "#999" }}>
          Year-end adjustments · December 31, 2026
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "22px"
      }}>
        <div style={{
          flex: "1 1 160px",
          padding: "18px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Total Adjustments</small>
          <h2>{adjustments.length}</h2>
        </div>

        <div style={{
          flex: "1 1 160px",
          padding: "18px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Total Debit</small>
          <h2>{formatUSD(totalDebit)}</h2>
        </div>

        <div style={{
          flex: "1 1 160px",
          padding: "18px",
          borderRadius: "10px",
          background: "var(--card-bg, #202938)"
        }}>
          <small>Total Credit</small>
          <h2>{formatUSD(totalCredit)}</h2>
        </div>
      </div>

      <div style={{
        padding: "14px",
        marginBottom: "20px",
        borderRadius: "9px",
        background: "#1D4938",
        color: "#8CE0B4"
      }}>
        ✓ Adjusting entries are balanced.
      </div>

      <div style={{
        overflowX: "auto",
        borderRadius: "10px",
        background: "var(--card-bg, #202938)"
      }}>
        <table style={{
          width: "100%",
          minWidth: "850px",
          borderCollapse: "collapse",
          textAlign: "left"
        }}>
          <thead>
            <tr style={{ background: "#C6A45A", color: "#111" }}>
              <th style={{ padding: "13px" }}>Date</th>
              <th style={{ padding: "13px" }}>Description</th>
              <th style={{ padding: "13px" }}>Debit Account</th>
              <th style={{ padding: "13px" }}>Credit Account</th>
              <th style={{ padding: "13px", textAlign: "right" }}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {adjustments.map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: "1px solid #55555530" }}
              >
                <td style={{ padding: "12px" }}>{item.date}</td>
                <td style={{ padding: "12px" }}>{item.description}</td>
                <td style={{ padding: "12px" }}>{item.debitAccount}</td>
                <td style={{ padding: "12px" }}>{item.creditAccount}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {formatUSD(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr style={{
              borderTop: "2px solid #C6A45A",
              fontWeight: "bold"
            }}>
              <td colSpan="4" style={{ padding: "14px" }}>
                TOTAL
              </td>
              <td style={{ padding: "14px", textAlign: "right" }}>
                {formatUSD(totalDebit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
