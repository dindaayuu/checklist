import "./TenantDetail.css";

import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";

import {
  ArrowLeft,
  Smartphone,
  Printer,
  ScanLine,
  Monitor,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

export default function TenantDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const tenant =
    location.state || {
      name: "Srengenge",
      area: "Downtown Area",
    };

  const [status, setStatus] =
    useState<Record<string, string>>({});

  const [issueType, setIssueType] =
    useState<Record<string, string>>({});

    const devices = [
      {
        id: "mobile",
        name: "Mobile",
        asset: "Samsung A14",
        icon: <Smartphone size={18} />,
      },
      {
        id: "printer",
        name: "Printer",
        asset: "Epson L3210",
        icon: <Printer size={18} />,
      },
      {
        id: "charger",
        name: "Charger",
        asset: "Original Charger",
        icon: <RefreshCcw size={18} />,
      },
      {
        id: "scanner",
        name: "Scanner",
        asset: "Canon LiDE 300",
        icon: <ScanLine size={18} />,
      },
      {
        id: "stand",
        name: "Stand",
        asset: "Scanner Stand",
        icon: <Monitor size={18} />,
      },
      {
        id: "pc",
        name: "PC",
        asset: "Acer All In One",
        icon: <Monitor size={18} />,
      },
    ];
    
    return (
    <MobileLayout>

      <div className="tenant-page">

        <div className="tenant-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
            <ArrowLeft size={20} />
          </button>

          <h2>Checklist Tenant</h2>

        </div>

        <div className="tenant-card">

          <div className="tenant-icon">
            🏪
          </div>

          <div>

            <h3>{tenant.name}</h3>

            <p>{tenant.area}</p>

          </div>

        </div>

        {devices.map((device) => (
          <div
            key={device.id}
            className="device-card"
          >

            <div className="device-info">

              <div className="device-icon">
                {device.icon}
              </div>

              <div>

                <h4>{device.name}</h4>

                <p>{device.asset}</p>

              </div>

            </div>

            <div className="device-actions">

              <button
                className={`status-btn normal ${
                  status[device.id] === "normal"
                    ? "active-normal"
                    : ""
                }`}
                onClick={() =>
                  setStatus({
                    ...status,
                    [device.id]: "normal",
                  })
                }
              >
                Normal
              </button>

              <button
                className={`status-btn issue ${
                  status[device.id] === "issue"
                    ? "active-issue"
                    : ""
                }`}
                onClick={() =>
                  setStatus({
                    ...status,
                    [device.id]: "issue",
                  })
                }
              >
                Kendala
              </button>

            </div>

            {status[device.id] ===
              "issue" && (
              <div className="issue-section">

                <div className="issue-grid">

                  {[
                    "Mati Total",
                    "Tidak Terbaca",
                    "Rusak Fisik",
                    "Hilang",
                  ].map((type) => (
                    <button
                      key={type}
                      className={
                        issueType[
                          device.id
                        ] === type
                          ? "issue-option active"
                          : "issue-option"
                      }
                      onClick={() =>
                        setIssueType({
                          ...issueType,
                          [device.id]:
                            type,
                        })
                      }
                    >
                      {type}
                    </button>
                  ))}

                </div>

                <textarea placeholder="Catatan kendala..." />

                <div className="warning-box">

                  <AlertTriangle size={18} />

                  <span>
                    Device bermasalah.
                    Disarankan mengganti
                    device.
                  </span>

                </div>

                <button
                  className="replace-btn"
                  onClick={() =>
                    navigate("/scan-device")
                  }
                >
                  <RefreshCcw size={16} />
                  Ganti Device
                </button>

              </div>
            )}

          </div>
        ))}

        <div className="notes-card">

          <label>
            Catatan Tambahan
          </label>

          <textarea placeholder="Tambahkan catatan umum..." />

        </div>

        <button
  className="save-btn"
  onClick={() =>
    navigate("/route-map", {
      state: {
        tenant: tenant.name,
        area: tenant.area,
        time: new Date().toLocaleTimeString(
          "id-ID",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
    })
  }
>
  Simpan Hasil
</button>

      </div>

    </MobileLayout>
  );
}