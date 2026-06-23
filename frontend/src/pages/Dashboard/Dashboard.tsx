import "./Dashboard.css";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

import {
  Bell,
  Store,
  Waves,
  Mountain,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] =
  useState<any>(null);

const areas = [
  {
    id: 1,
    name: "Downtown Area",
    checked: 3,
    total: 4,
    progress: 75,
    icon: "downtown",
    tenants: [
      {
        id: 1,
        name: "Loket Tiket",
        status: "Selesai",
      },
      {
        id: 2,
        name: "Tata-Titi",
        status: "Belum Dicek",
      },
      {
        id: 3,
        name: "Kupu-Kupu",
        status: "Kendala",
      },
      {
        id: 4,
        name: "Komidi Kuda Laut",
        status: "Selesai",
      },
    ],
  },

  {
    id: 2,
    name: "Pesisir Area",
    checked: 0,
    total: 3,
    progress: 0,
    icon: "pesisir",
    tenants: [
      {
        id: 1,
        name: "Lumbung Ilmu Galileo",
        status: "Belum Dicek",
      },
      {
        id: 2,
        name: "Arena Jejogedan",
        status: "Belum Dicek",
      },
      {
        id: 3,
        name: "Kapal Jenju",
        status: "Belum Dicek",
      },
    ],
  },

  {
    id: 3,
    name: "Balantara Area",
    checked: 1,
    total: 2,
    progress: 50,
    icon: "balantara",
    tenants: [
      {
        id: 1,
        name: "Angon Ingon",
        status: "Belum Dicek",
      },
      {
        id: 2,
        name: "Safari Bocah",
        status: "Selesai",
      },
    ],
  },
];

  const userName =
    localStorage.getItem("userName") ||
    "Dinda";

  return (
    <MobileLayout>
      <div className="dashboard-page">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1 className="welcome-title">
              Halo, {userName} 👋
            </h1>

            <p className="welcome-subtitle">
              PIC Checklist IT
            </p>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="progress-card">

          <div className="progress-left">

            <p>
              Progress Hari Ini
            </p>

            <h2>
              35<span>/45</span>
            </h2>

            <small>
              Tenant sudah dicek
            </small>

          </div>

          <div className="circle-progress">

            <svg viewBox="0 0 120 120">

              <circle
                cx="60"
                cy="60"
                r="50"
                className="circle-bg"
              />

              <circle
                cx="60"
                cy="60"
                r="50"
                className="circle-fill"
              />

            </svg>

            <span>78%</span>

          </div>

        </div>

        {/* ROUTE */}

        <h3 className="section-title">
          Route Hari Ini
        </h3>

        {areas.map((area) => (
  <div
    key={area.id}
    className="route-card clickable"
    onClick={() =>
      setSelectedArea(area)
    }
  >
    <div className="route-item">

      <div
        className={`route-icon ${area.icon}`}
      >
        {area.icon === "downtown" && (
          <Store size={20} />
        )}

        {area.icon === "pesisir" && (
          <Waves size={20} />
        )}

        {area.icon === "balantara" && (
          <Mountain size={20} />
        )}
      </div>

      <div className="route-content">
        <h4>{area.name}</h4>

        <p>
          {area.checked} / {area.total}
          {" "}
          Tenant
        </p>

        <div className="progress-line">
          <div
            className="progress-fill"
            style={{
              width:
                `${area.progress}%`,
            }}
          />
        </div>
      </div>

      <span>
        {area.progress}%
      </span>

    </div>
  </div>
))}

        {/* BUTTON */}

        <button
          className="route-btn"
          onClick={() =>
            navigate("/route-map")
          }
        >
          Mulai Route

          <ChevronRight size={18} />

        </button>

      </div>

      {selectedArea && (
  <div
    className="area-overlay"
    onClick={() =>
      setSelectedArea(null)
    }
  >
    <div
      className="area-popup"
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <div className="popup-header">

        <div>
          <h3>
            {selectedArea.name}
          </h3>

          <p>
            {selectedArea.checked}
            {" / "}
            {selectedArea.total}
            {" "}
            Tenant
          </p>
        </div>

        <button
          className="popup-close"
          onClick={() =>
            setSelectedArea(null)
          }
        >
          ✕
        </button>

      </div>

      {selectedArea.tenants.map(
        (tenant: any) => (
          <div
            key={tenant.id}
            className="tenant-row"
          >
            <div
              className={`status-indicator ${
                tenant.status ===
                "Selesai"
                  ? "done"
                  : tenant.status ===
                    "Kendala"
                  ? "issue"
                  : "pending"
              }`}
            />

            <div className="tenant-row-info">
              <h4>
                {tenant.name}
              </h4>

              <p>
                {tenant.status}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  </div>
)}

      <BottomNav />
    </MobileLayout>
  );
}