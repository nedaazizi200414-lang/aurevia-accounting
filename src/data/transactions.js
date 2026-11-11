
// src/data/accountingData.js

export const COMPANY = {
  name: "AUREVIA ACCOUNTING & TRADING LLC",
  currency: "USD",
  fiscalYear: 2026,
};

// Financial figures based on the current accounting workbook.
// These figures must be updated if the journal entries change.

export const financialSummary = {
  totalIncome: 5085,
  totalExpenses: 5690,
  netIncome: -605,
  cashBalance: 25530,

  unadjustedTrialBalance: {
    debit: 35785,
    credit: 35785,
    balanced: true,
  },

  adjustedTrialBalance: {
  debit: 37140,
  credit: 37140,
  balanced: true,
},
};

export const accountBalances = [
  { name: "Cash at Bank", debit: 25530, credit: 0 },
  { name: "Accounts Receivable", debit: 1350, credit: 0 },
  {
    name: "Accounts Receivable – Bright Future School",
    debit: 500,
    credit: 0,
  },
  { name: "Inventory", debit: 240, credit: 0 },
  { name: "Office Supplies", debit: 230, credit: 0 },
  { name: "Prepaid Insurance", debit: 900, credit: 0 },
  { name: "Office Equipment", debit: 2200, credit: 0 },
  { name: "Accumulated Depreciation", debit: 0, credit: 70 },
  { name: "Accounts Payable – ABC Stationery", debit: 0, credit: 250 },
  { name: "Bank Loan Payable", debit: 0, credit: 5000 },
  { name: "Unearned Service Revenue", debit: 0, credit: 1000 },
  { name: "Salaries Payable", debit: 0, credit: 650 },
  { name: "Electricity Payable", debit: 0, credit: 85 },
];

export const incomeStatementAccounts = {
  revenues: [
    { name: "Service Revenue", amount: 2850 },
    { name: "Sales Revenue", amount: 1250 },
    { name: "Consulting Revenue", amount: 950 },
    { name: "Interest Income", amount: 35 },
  ],

  expenses: [
    { name: "Cost of Goods Sold", amount: 760 },
    { name: "Rent Expense", amount: 1200 },
    { name: "Salaries Expense", amount: 2250 },
    { name: "Advertising Expense", amount: 350 },
    { name: "Electricity Expense", amount: 205 },
    { name: "Fuel Expense", amount: 110 },
    { name: "Bank Charges Expense", amount: 25 },
    { name: "Depreciation Expense", amount: 70 },
    { name: "Office Supplies Expense", amount: 420 },
    { name: "Insurance Expense", amount: 300 },
  ],
};

// Monthly chart data will be connected after importing
// the exact dates and amounts from all 30 transactions.

export const monthlyActivity = [
  { month: "Jan", income: 0, expenses: 1200 },
  { month: "Feb", income: 0, expenses: 700 },
  { month: "Mar", income: 600, expenses: 350 },
  { month: "Apr", income: 1200, expenses: 0 },
  { month: "May", income: 1250, expenses: 760 },
  { month: "Jun", income: 985, expenses: 0 },
  { month: "Jul", income: 0, expenses: 120 },
  { month: "Aug", income: 0, expenses: 1010 },
  { month: "Sep", income: 0, expenses: 0 },
  { month: "Oct", income: 0, expenses: 25 },
  { month: "Nov", income: 500, expenses: 0 },
  { month: "Dec", income: 550, expenses: 1525 },
];


export const accountingChecklist = [
  { name: "Transactions", status: "Available" },
  { name: "General Journal", status: "Available" },
  { name: "Ledger Accounts", status: "Available" },
  { name: "General Ledger", status: "Prepared" },
  { name: "Trial Balance", status: "Prepared" },
  { name: "Adjusting Entries", status: "Prepared" },
  { name: "Financial Statements", status: "Prepared" },
];

export function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const transactions = [
  { id: 1, date: "2026-01-01", description: "Initial Capital Investment", debitAccount: "Cash at Bank", creditAccount: "Owner's Capital", amount: 25000, transactionAmount: 25000, type: "Regular" },

  { id: 2, date: "2026-01-05", description: "Office Rent Payment", debitAccount: "Rent Expense", creditAccount: "Cash at Bank", amount: 1200, transactionAmount: 1200, type: "Regular" },

  { id: 3, date: "2026-01-10", description: "Purchase of Office Equipment", debitAccount: "Office Equipment", creditAccount: "Cash at Bank", amount: 2200, transactionAmount: 2200, type: "Regular" },

  { id: 4, date: "2026-01-15", description: "Purchase of Office Supplies on Credit", debitAccount: "Office Supplies", creditAccount: "Accounts Payable – ABC Stationery", amount: 650, transactionAmount: 650, type: "Regular" },

  { id: 5, date: "2026-02-10", description: "Purchase of Inventory for Resale", debitAccount: "Inventory", creditAccount: "Cash at Bank", amount: 1000, transactionAmount: 1000, type: "Regular" },

  { id: 6, date: "2026-02-15", description: "Employee Salary Payment", debitAccount: "Salaries Expense", creditAccount: "Cash at Bank", amount: 700, transactionAmount: 700, type: "Regular" },

  { id: 7, date: "2026-03-15", description: "Advertising Expense", debitAccount: "Advertising Expense", creditAccount: "Cash at Bank", amount: 350, transactionAmount: 350, type: "Regular" },

  { id: 8, date: "2026-03-20", description: "Cash Service Revenue", debitAccount: "Cash at Bank", creditAccount: "Service Revenue", amount: 600, transactionAmount: 600, type: "Regular" },

  { id: 9, date: "2026-04-05", description: "Services Provided on Credit", debitAccount: "Accounts Receivable – Bright Future School", creditAccount: "Service Revenue", amount: 1200, transactionAmount: 1200, type: "Regular" },

  { id: 10, date: "2026-04-20", description: "Collection from Customer", debitAccount: "Cash at Bank", creditAccount: "Accounts Receivable – Bright Future School", amount: 700, transactionAmount: 700, type: "Regular" },

  { id: 11, date: "2026-05-05", description: "Cash Sale of Merchandise Inventory", debitAccount: "Cash at Bank ($450); Cost of Goods Sold ($280)", creditAccount: "Sales Revenue ($450); Inventory ($280)", amount: 450, transactionAmount: 450, type: "Regular" },

  { id: 12, date: "2026-05-15", description: "Credit Sale of Merchandise Inventory", debitAccount: "Accounts Receivable ($800); Cost of Goods Sold ($480)", creditAccount: "Sales Revenue ($800); Inventory ($480)", amount: 800, transactionAmount: 800, type: "Regular" },

  { id: 13, date: "2026-06-01", description: "Consulting Revenue Received", debitAccount: "Cash at Bank", creditAccount: "Consulting Revenue", amount: 950, transactionAmount: 950, type: "Regular" },

  { id: 14, date: "2026-06-15", description: "Bank Interest Income", debitAccount: "Cash at Bank", creditAccount: "Interest Income", amount: 35, transactionAmount: 35, type: "Regular" },

  { id: 15, date: "2026-07-05", description: "Payment to Supplier", debitAccount: "Accounts Payable – ABC Stationery", creditAccount: "Cash at Bank", amount: 400, transactionAmount: 400, type: "Regular" },

  { id: 16, date: "2026-07-10", description: "Electricity Expense", debitAccount: "Electricity Expense", creditAccount: "Cash at Bank", amount: 120, transactionAmount: 120, type: "Regular" },

  { id: 17, date: "2026-08-01", description: "Employee Salary Payment", debitAccount: "Salaries Expense", creditAccount: "Cash at Bank", amount: 900, transactionAmount: 900, type: "Regular" },

  { id: 18, date: "2026-08-05", description: "Fuel Expense", debitAccount: "Fuel Expense", creditAccount: "Cash at Bank", amount: 110, transactionAmount: 110, type: "Regular" },

  { id: 19, date: "2026-09-10", description: "Prepaid Insurance Payment", debitAccount: "Prepaid Insurance", creditAccount: "Cash at Bank", amount: 1200, transactionAmount: 1200, type: "Regular" },

  { id: 20, date: "2026-10-10", description: "Bank Service Charges", debitAccount: "Bank Charges Expense", creditAccount: "Cash at Bank", amount: 25, transactionAmount: 25, type: "Regular" },

  { id: 21, date: "2026-10-20", description: "Short-Term Bank Loan", debitAccount: "Cash at Bank", creditAccount: "Bank Loan Payable", amount: 5000, transactionAmount: 5000, type: "Regular" },

  { id: 22, date: "2026-11-01", description: "Advance Received from Customer", debitAccount: "Cash at Bank", creditAccount: "Unearned Service Revenue", amount: 1500, transactionAmount: 1500, type: "Regular" },

  { id: 23, date: "2026-11-05", description: "Owner's Withdrawal", debitAccount: "Owner's Drawing", creditAccount: "Cash at Bank", amount: 500, transactionAmount: 500, type: "Regular" },

  { id: 24, date: "2026-11-15", description: "Partial Completion of Advance Services", debitAccount: "Unearned Service Revenue", creditAccount: "Service Revenue", amount: 500, transactionAmount: 500, type: "Regular" },

  { id: 25, date: "2026-12-31", description: "Accrued Salaries Payable", debitAccount: "Salaries Expense", creditAccount: "Salaries Payable", amount: 650, transactionAmount: 650, type: "Adjustment" },

  { id: 26, date: "2026-12-31", description: "Accrued Electricity Expense", debitAccount: "Electricity Expense", creditAccount: "Electricity Payable", amount: 85, transactionAmount: 85, type: "Adjustment" },

  { id: 27, date: "2026-12-31", description: "Accrued Service Revenue", debitAccount: "Accounts Receivable", creditAccount: "Service Revenue", amount: 550, transactionAmount: 550, type: "Adjustment" },

  { id: 28, date: "2026-12-31", description: "Depreciation of Office Equipment", debitAccount: "Depreciation Expense", creditAccount: "Accumulated Depreciation – Office Equipment", amount: 70, transactionAmount: 70, type: "Adjustment" },

  { id: 29, date: "2026-12-31", description: "Office Supplies Used During the Year", debitAccount: "Office Supplies Expense", creditAccount: "Office Supplies", amount: 420, transactionAmount: 420, type: "Adjustment" },

  { id: 30, date: "2026-12-31", description: "Prepaid Insurance Adjustment", debitAccount: "Insurance Expense", creditAccount: "Prepaid Insurance", amount: 300, transactionAmount: 300, type: "Adjustment" }
];

