
import React from "react";

const notes = [
  {
    number: "01",
    title: "Company Information",
    content:
      "AUREVIA ACCOUNTING & TRADING LLC is a business entity. These financial statements cover the accounting period from January 1 to December 31, 2026. The reporting currency is the United States Dollar (USD).",
  },
  {
    number: "02",
    title: "Basis of Preparation",
    content:
      "The financial statements have been prepared using the accrual basis of accounting. Transactions are recorded when they occur, rather than only when cash is received or paid. The statements are prepared using the historical cost basis.",
  },
  {
    number: "03",
    title: "Cash and Cash Equivalents",
    content:
      "Cash represents funds held at the bank. At December 31, 2026, the company's cash at bank balance was $25,530. The cash flow statement reports the same ending balance.",
    values: [
      { label: "Cash at Bank", amount: "$25,530" },
    ],
  },
  {
    number: "04",
    title: "Accounts Receivable",
    content:
      "Accounts receivable represents amounts owed by customers for services provided or sales made on credit. The adjusted balance includes $1,350 in general accounts receivable and $500 due from Bright Future School.",
    values: [
      { label: "General Accounts Receivable", amount: "$1,350" },
      { label: "Bright Future School", amount: "$500" },
      { label: "Total Accounts Receivable", amount: "$1,850" },
    ],
  },
  {
    number: "05",
    title: "Inventory",
    content:
      "Inventory represents goods available for sale. During the year, inventory purchases and cost of goods sold were recorded. The ending inventory balance was $240.",
    values: [
      { label: "Ending Inventory", amount: "$240" },
      { label: "Cost of Goods Sold", amount: "$760" },
    ],
  },
  {
    number: "06",
    title: "Property and Equipment",
    content:
      "Office equipment was purchased for $2,200. Depreciation expense of $70 was recognized for the year. Accumulated depreciation is deducted from the equipment cost to calculate its carrying amount.",
    values: [
      { label: "Office Equipment", amount: "$2,200" },
      { label: "Accumulated Depreciation", amount: "($70)" },
      { label: "Net Book Value", amount: "$2,130" },
    ],
  },
  {
    number: "07",
    title: "Prepaid Expenses and Supplies",
    content:
      "Prepaid insurance represents the portion of insurance paid in advance that has not yet expired. Office supplies represent unused supplies remaining at year-end.",
    values: [
      { label: "Prepaid Insurance", amount: "$900" },
      { label: "Office Supplies", amount: "$230" },
    ],
  },
  {
    number: "08",
    title: "Liabilities",
    content:
      "Liabilities include amounts owed to suppliers, the bank, and employees, as well as revenue received in advance. Accrued salaries and electricity expenses are recognized as payable at year-end.",
    values: [
      { label: "Accounts Payable", amount: "$250" },
      { label: "Bank Loan Payable", amount: "$5,000" },
      { label: "Unearned Service Revenue", amount: "$1,000" },
      { label: "Salaries Payable", amount: "$650" },
      { label: "Electricity Payable", amount: "$85" },
      { label: "Total Liabilities", amount: "$6,985" },
    ],
  },
  {
    number: "09",
    title: "Revenue",
    content:
      "Revenue includes service revenue, sales revenue, consulting revenue, and interest income recognized during the 2026 accounting period.",
    values: [
      { label: "Service Revenue", amount: "$2,850" },
      { label: "Sales Revenue", amount: "$1,250" },
      { label: "Consulting Revenue", amount: "$950" },
      { label: "Interest Income", amount: "$35" },
      { label: "Total Revenue", amount: "$5,085" },
    ],
  },
  {
    number: "10",
    title: "Expenses and Net Loss",
    content:
      "Expenses include operating costs, salaries, rent, advertising, cost of goods sold, depreciation, insurance, and other expenses. Total expenses exceeded total revenue, resulting in a net loss for the year.",
    values: [
      { label: "Total Expenses", amount: "$5,690" },
      { label: "Total Revenue", amount: "$5,085" },
      { label: "Net Loss", amount: "($605)" },
    ],
  },
  {
    number: "11",
    title: "Owner's Equity",
    content:
      "Owner's equity reflects the owner's investment, drawings, and the net result of business operations. Ending owner's equity is calculated by adding the net loss to the initial capital after deducting drawings.",
    values: [
      { label: "Owner's Capital", amount: "$25,000" },
      { label: "Owner's Drawings", amount: "($500)" },
      { label: "Net Loss", amount: "($605)" },
      { label: "Ending Owner's Equity", amount: "$23,895" },
    ],
  },
];

function NoteCard({ note }) {
  return (
    <article className="note-card">
      <div className="note-card-heading">
        <span className="note-number">{note.number}</span>
        <h3>{note.title}</h3>
      </div>

      <p>{note.content}</p>

      {note.values && (
        <div className="note-values">
          {note.values.map((item, index) => (
            <div className="note-value-row" key={index}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Notes() {
  return (
    <div className="notes-page">
      <div className="notes-header">
        <div>
          <span className="notes-eyebrow">
            AUREVIA ACCOUNTING SYSTEM
          </span>
          <h1>Notes to Financial Statements</h1>
          <p>For the year ended December 31, 2026</p>
        </div>

        <span className="notes-currency">USD ($)</span>
      </div>

      <div className="notes-intro">
        <h2>Explanatory Notes</h2>
        <p>
          The following notes provide additional information about
          the company's financial position and financial performance.
          They should be read together with the financial statements.
        </p>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.number} note={note} />
        ))}
      </div>

      <div className="notes-footer">
        <strong>End of Notes</strong>
        <p>
          These notes form an integral part of the financial
          statements of AUREVIA ACCOUNTING & TRADING LLC.
        </p>
      </div>
    </div>
  );
}
