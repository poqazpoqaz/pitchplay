import VisitantCard from "../../components/Dashboard/VisitantCard";
import DateSummaryCard from "../../components/Dashboard/DateRangeDropdown";
import ReferrerCard from "../../components/Dashboard/ReferrerCard";
import PaymentStatusCard from "../../components/Dashboard/PaymentStatusCard";
import RefundStatusCard from "../../components/Dashboard/RefundStatusCard";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles["container"]}>
      <VisitantCard />
      <DateSummaryCard />
      <ReferrerCard />
      <PaymentStatusCard />
      <RefundStatusCard />
    </div>
  );
};

export default Dashboard;
