
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "gold",
}) {
  return (
    <article className={`stat-card accent-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>

        <div className="stat-icon">
          {Icon && <Icon size={21} />}
        </div>
      </div>

      <h2 className="stat-value">{value}</h2>

      <div className="stat-bottom">
        <span>{subtitle}</span>
        <ArrowUpRight size={16} />
      </div>
    </article>
  );
}
