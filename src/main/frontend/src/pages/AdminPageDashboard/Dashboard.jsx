import DateSummaryCard from "../../components/Dashboard/DateSummaryCard";
import PaymentStatusCard from "../../components/Dashboard/PaymentStatusCard";
import ReferrerCard from "../../components/Dashboard/ReferrerCard"
import VisitantCard from "../../components/Dashboard/VisitantCard";
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
