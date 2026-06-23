import "./BottomNav.css";

import {
  House,
  Map,
  FileText,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">

      <div
        className={`nav-item ${
          location.pathname === "/dashboard"
            ? "active"
            : ""
        }`}
        onClick={() =>
          navigate("/dashboard")
        }
      >
        <House size={20} />
        <span>Home</span>
      </div>

      <div
        className={`nav-item ${
          location.pathname === "/route-map"
            ? "active"
            : ""
        }`}
        onClick={() =>
          navigate("/route-map")
        }
      >
        <Map size={20} />
        <span>Route</span>
      </div>

      <div
        className={`nav-item ${
          location.pathname === "/report"
            ? "active"
            : ""
        }`}
        onClick={() =>
          navigate("/report")
        }
      >
        <FileText size={20} />
        <span>Report</span>
      </div>

    </div>
  );
}