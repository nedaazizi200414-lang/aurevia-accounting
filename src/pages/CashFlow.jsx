
import React from "react";

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const operatingInflows = [
  { name: "Cash received for services", amount: 600 },
  { name: "Collection from Bright Future School", amount: 700 },
  { name: "Cash sales", amount: 450 },
  { name: "Consulting revenue received", amount: 950 },
  { name: "Interest received", amount: 35 },
  { name: "Unearned service revenue received", amount: 1500 },
];

const operatingOutflows = [
  { name: "Rent paid", amount: 1200 },
  { name: "Inventory purchased for cash", amount: 1000 },
  { name: "Salaries paid", amount: 1600 },
  { name: "Advertising paid", amount: 350 },
  { name: "Accounts payable paid", amount: 400 },
  { name: "Electricity paid", amount: 120 },
  { name: "Fuel paid", amount: 110 },
  { name: "Prepaid insurance paid", amount: 1200 },
  { name: "Bank charges paid", amount: 25 },
];

const investingActivities = [
  { name: "Purchase of office equipment", amount: -2200 },
];

const financingActivities = [
  { name: "Owner's capital contribution", amount: 25000 },
  { name: "Bank loan received", amount: 5000 },
  { name: "Owner's drawing", amount: -500 },
];

function Section({ title, items, total, negative = false }) {
  return (
    <section className="cashflow-section">
      <h3>{title}</h3>

      {items.map((item, index) => (
        <div className="cashflow-row" key={index}>
          <span>{item.name}</span>
          <span>{money(Math.abs(item.amount))}</span>
        </div>
      ))}

      <div className="cashflow-total">
        <strong>{title} Total</strong>
        <strong>{money(Math.abs(total))}</strong>
      </div>
    </section>
  );
}

export default function CashFlow() {
  const totalInflows = operatingInflows.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalOutflows = operatingOutflows.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const netOperating = totalInflows - totalOutflows;

  const netInvesting = investingActivities.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const netFinancing = financingActivities.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const netIncrease = netOperating + netInvesting + netFinancing;
  const beginningCash = 0;
  const endingCash = beginningCash + netIncrease;

  return (
    <div className="cashflow-page">
      <div className="cashflow-heading">
        <div>
          <span className="cashflow-eyebrow">AUREVIA ACCOUNTING SYSTEM</span>
          <h1>Statement of Cash Flows</h1>
          <p>For the year ended December 31, 2026</p>
        </div>

        <div className="cashflow-currency">USD ($)</div>
      </div>

      <div className="cashflow-summary">
        <div>
          <span>Net Operating Cash Flow</span>
          <strong>{money(netOperating)}</strong>
        </div>
        <div>
          <span>Net Investing Cash Flow</span>
          <strong>{money(netInvesting)}</strong>
        </div>
        <div>
          <span>Net Financing Cash Flow</span>
          <strong>{money(netFinancing)}</strong>
        </div>
        <div className="cashflow-highlight">
          <span>Ending Cash Balance</span>
          <strong>{money(endingCash)}</strong>
        </div>
      </div>

      <div className="cashflow-report">
        <Section
          title="Cash Flows from Operating Activities"
          items={operatingInflows}
          total={totalInflows}
        />

        <div className="cashflow-subtotal">
          <span>Total Cash Received from Operations</span>
          <strong>{money(totalInflows)}</strong>
        </div>

        <Section
          title="Operating Cash Payments"
          items={operatingOutflows}
          total={totalOutflows}
        />

        <div className="cashflow-net">
          <span>Net Cash from Operating Activities</span>
          <strong>{money(netOperating)}</strong>
        </div>

        <Section
          title="Cash Flows from Investing Activities"
          items={investingActivities}
          total={netInvesting}
        />

        <div className="cashflow-net">
          <span>Net Cash Used in Investing Activities</span>
          <strong>{money(netInvesting)}</strong>
        </div>

        <Section
          title="Cash Flows from Financing Activities"
          items={financingActivities}
          total={netFinancing}
        />

        <div className="cashflow-net">
          <span>Net Cash from Financing Activities</span>
          <strong>{money(netFinancing)}</strong>
        </div>

        <div className="cashflow-final">
          <div>
            <span>Net Increase in Cash</span>
            <strong>{money(netIncrease)}</strong>
          </div>
          <div>
            <span>Cash Balance at Beginning of Year</span>
            <strong>{money(beginningCash)}</strong>
          </div>
          <div className="cashflow-ending">
            <span>Cash Balance at December 31, 2026</span>
            <strong>{money(endingCash)}</strong>
          </div>
        </div>
      </div>

      <div className="cashflow-note">
        <strong>Accounting note:</strong>
        <p>
          This statement uses the direct method. Non-cash adjusting entries,
          such as depreciation, accrued salaries, accrued electricity,
          supplies used, and accrued revenue, are not shown as cash payments
          or receipts. The purchase of office equipment is classified as an
          investing activity. Owner contributions, loan proceeds, and
          drawings are classified as financing activities.
        </p>
      </div>
    </div>
  );
}
