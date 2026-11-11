
// src/pages/Dashboard.jsx

import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Scale,
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
  TrendingDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/StatCard";

import {
  COMPANY,
  financialSummary,
  monthlyActivity,
  accountingChecklist,
  formatUSD,
} from "../data/transactions";

export default function Dashboard() {
  const trialBalance = financialSummary.adjustedTrialBalance;

  return (
    <div className="dashboard">

      <section className="welcome-banner">
        <div>
          <span className="eyebrow">
            FINANCIAL OVERVIEW · {COMPANY.fiscalYear}
          </span>

          <h2>Welcome to Aurevia.</h2>

          <p>
            Your accounting workspace, organized in one place.
          </p>
        </div>

        <div className="banner-badge">
          <span className="badge-dot"></span>
          Fiscal Year {COMPANY.fiscalYear}
        </div>
      </section>

      <section className="section-heading">
        <div>
          <h2>Financial Overview</h2>
          <p>Your accounting summary at a glance.</p>
        </div>

        <span className="currency-label">
          Currency: USD ($)
        </span>
      </section>

      <section className="stats-grid">

        <StatCard
          title="Total Income"
          value={formatUSD(financialSummary.totalIncome)}
          subtitle="Total adjusted revenue"
          icon={ArrowDownLeft}
          accent="green"
        />

        <StatCard
          title="Total Expenses"
          value={formatUSD(financialSummary.totalExpenses)}
          subtitle="Total adjusted expenses"
          icon={ArrowUpRight}
          accent="red"
        />

        <StatCard
          title="Cash Balance"
          value={formatUSD(financialSummary.cashBalance)}
          subtitle="Ending cash balance"
          icon={Wallet}
          accent="gold"
        />

        <StatCard
          title="Adjusted Trial Balance"
          value={
            trialBalance.balanced ? "Balanced" : "Unbalanced"
          }
          subtitle={`Debit: ${formatUSD(trialBalance.debit)}`}
          icon={Scale}
          accent="blue"
        />

      </section>

      <section className="content-grid">

        <article className="panel chart-panel">

          <div className="panel-heading">
            <div>
              <h3>Financial Activity</h3>
              <p>Monthly income and expenses</p>
            </div>

            <span className="panel-tag">
              {COMPANY.fiscalYear}
            </span>
          </div>

          <div className="chart-area">

            {monthlyActivity.length > 0 ? (

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyActivity}>

                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#C6A45A"
                        stopOpacity={0.3}
                      />

                      <stop
                        offset="100%"
                        stopColor="#C6A45A"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#E9EAF0"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={65}
                  />

            <Tooltip
              formatter={(value) => formatUSD(value)}
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #475569",
                borderRadius: "10px",
                color: "#FFFFFF",
              }}
              labelStyle={{
                color: "#FFFFFF",
                fontWeight: "600",
              }}
              itemStyle={{
                color: "#FFFFFF",
              }}
            />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22C55E"
              fill="#22C55E"
              fillOpacity={0.22}
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f91616"
              fill="#f91616"
              fillOpacity={0.22}
              strokeWidth={3}
              activeDot={{ r: 6 }}
/>

                </AreaChart>
              </ResponsiveContainer>

            ) : (

              <div className="chart-empty">
                <TrendingDown size={28} />
                <strong>Monthly data not connected yet</strong>
                <span>
                  The chart will display after transaction dates
                  are connected.
                </span>
              </div>

            )}

          </div>

          <p className="chart-note">
            All financial figures are displayed in USD.
          </p>

        </article>

        <article className="panel activity-panel">

          <div className="panel-heading">
            <div>
              <h3>Accounting Progress</h3>
              <p>Accounting cycle overview</p>
            </div>

            <FileSpreadsheet size={21} />
          </div>

          {accountingChecklist.map((item) => (

            <div className="checklist-item" key={item.name}>

              <div className="check-icon">
                {item.status === "Available" ||
                 item.status === "Prepared" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Clock3 size={18} />
                )}
              </div>

              <div>
                <strong>{item.name}</strong>
                <span>Project accounting records</span>
              </div>

              <span
                className={`status ${
                  item.status === "Available" ||
                  item.status === "Prepared"
                    ? "ready"
                    : "pending"
                }`}
              >
                {item.status}
              </span>

            </div>

          ))}

        </article>

      </section>

      <section className="panel result-panel">
        <div className="panel-heading">
          <div>
            <h3>Financial Result</h3>
            <p>Income compared with expenses</p>
          </div>
        </div>

        <div className="result-content">
          <div>
            <span>Net Income / (Loss)</span>
            <h2 className="loss-value">
              {formatUSD(financialSummary.netIncome)}
            </h2>
          </div>

          <span className="result-label">
            Net Loss
          </span>
        </div>
      </section>

      <footer className="dashboard-footer">
        AUREVIA ACCOUNTING SYSTEM
        <span>Better Records. Better Decisions.</span>
      </footer>

    </div>
  );
}
