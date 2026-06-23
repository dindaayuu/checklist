import "./Account.css";

import { useNavigate } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

export default function Account() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") ||
    "PIC Checklist";

  return (
    <MobileLayout>

      <div className="account-page">

        <div className="profile-card">

          <div className="avatar">
            👤
          </div>

          <h2>{userName}</h2>

          <p>PIC IT Saloka</p>

        </div>

        <div className="info-card">

          <div className="info-row">
            <span>Nama</span>
            <b>{userName}</b>
          </div>

          <div className="info-row">
            <span>Role</span>
            <b>PIC Checklist</b>
          </div>

          <div className="info-row">
            <span>Versi</span>
            <b>1.0.0</b>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={() =>
            navigate("/")
          }
        >
          Logout
        </button>

      </div>

      <BottomNav />

    </MobileLayout>
  );
}