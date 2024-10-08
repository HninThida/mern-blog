import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import DSidebar from "../components/Sidebar";
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";
import DashboardComments from "../components/DashboardComments";
import AdminDashboard from "../components/AdminDashboard";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParems = new URLSearchParams(location.search);
    const tabfromUrl = urlParems.get("tab");
    console.log(tabfromUrl);
    if (tabfromUrl) {
      setTab(tabfromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <Profile />}
      {tab === "posts" && <DashPost />}
      {tab === "users" && <DashUser />}
      {tab === "comments" && <DashboardComments />}
      {tab === "dashboard" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
