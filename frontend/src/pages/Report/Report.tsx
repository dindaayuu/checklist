import "./Report.css";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function Report() {
  const [activeFilter, setActiveFilter] =
    useState("all");

  const location = useLocation();
  const [selectedReport, setSelectedReport] =
  useState<any>(null);

  const newReport = location.state;

  const reports = [
    ...(newReport
      ? [
          {
            tenant: newReport.tenant,
            area: newReport.area,
            time: newReport.time,
            status: "done",
            detail:
              "Checklist berhasil disimpan",
          },
        ]
      : []),

    {
      tenant: "Klamben",
      area: "Downtown Area",
      time: "09:45 WIB",
      status: "issue",
      detail: "Scanner Mati Total",
    },

    {
      tenant: "Submarine",
      area: "Pesisir Area",
      time: "10:15 WIB",
      status: "done",
      detail: "Semua Perangkat Normal",
    },

    {
      tenant: "GG Merchandise",
      area: "Balantara Area",
      time: "11:30 WIB",
      status: "issue",
      detail: "Printer Tidak Terbaca",
    },
  ];

  const filteredReports =
    reports.filter((item) => {
      if (activeFilter === "issue")
        return item.status === "issue";

      if (activeFilter === "done")
        return item.status === "done";

      return true;
    });

  return (
    <MobileLayout>
      <div className="report-page">

        <h2 className="report-title">
          Laporan Checklist
        </h2>

        <p className="report-subtitle">
          Riwayat hasil pengecekan tenant
        </p>

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Cari tenant..."
          />

        </div>

        <div className="filter-group">

          <button
            className={
              activeFilter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setActiveFilter("all")
            }
          >
            Semua
          </button>

          <button
            className={
              activeFilter === "issue"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setActiveFilter("issue")
            }
          >
            Kendala
          </button>

          <button
            className={
              activeFilter === "done"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setActiveFilter("done")
            }
          >
            Selesai
          </button>

        </div>

        {filteredReports.map((item) => (

          <div
            key={
              item.tenant +
              item.time
            }
            className="report-card"
          >

            <div className="report-top">

              <div
                className={`report-icon ${
                  item.status === "issue"
                    ? "issue"
                    : "done"
                }`}
              >

                {item.status ===
                "issue" ? (
                  <AlertTriangle
                    size={22}
                  />
                ) : (
                  <CheckCircle2
                    size={22}
                  />
                )}

              </div>

              <div className="report-info">

                <h3>
                  {item.tenant}
                </h3>

                <p>
                  {item.area}
                </p>

              </div>

            </div>

            <div className="report-detail">

              <span className="time">
                {item.time}
              </span>

              <p>
                {item.detail}
              </p>

            </div>

            <div
              className="detail-link"
              onClick={() =>
                setSelectedReport(item)
              }
            >
                <span>
                Lihat Detail
              </span>

              <ChevronRight size={16} />
            </div>

          </div>

        ))}

      </div>
      {selectedReport && (
        <div
          className="detail-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="detail-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="detail-close"
              onClick={() => setSelectedReport(null)}
            >
              ✕
            </button>

            <h3>{selectedReport.tenant}</h3>

            <p className="sheet-area">
              {selectedReport.area}
            </p>

            <p className="sheet-time">
              {selectedReport.time}
            </p>

            <div
              className={`sheet-status ${
                selectedReport.status === "issue"
                  ? "issue"
                  : "done"
              }`}
            >
              {selectedReport.status === "issue"
                ? "🟠 Selesai Dengan Kendala"
                : "🟢 Selesai Tanpa Kendala"}
            </div>

            <div className="sheet-section">
              <h4>Checklist Perangkat</h4>

              <div className="device-item">
                <span>✅</span>
                <p>Tablet POS</p>
              </div>

              <div className="device-item">
                <span>
                  {selectedReport.status === "issue"
                    ? "❌"
                    : "✅"}
                </span>
                <p>Scanner Barcode</p>
              </div>

              <div className="device-item">
                <span>✅</span>
                <p>Printer Struk</p>
              </div>

              <div className="device-item">
                <span>✅</span>
                <p>Charger</p>
              </div>
            </div>

            {selectedReport.status === "issue" && (
              <div className="replacement-card">
                <h4>
                  🔄 Pergantian Device
                </h4>

                <div className="replacement-box">

                  <div className="replacement-section">
                    <span className="replacement-label">
                      Device Bermasalah
                    </span>

                    <h5>
                      ❌ Scanner Barcode
                    </h5>

                    <p>
                      SN : SCN-001
                    </p>
                  </div>

                  <div className="replacement-divider" />

                  <div className="replacement-section">
                    <span className="replacement-label">
                      Device Pengganti
                    </span>

                    <h5>
                      ✅ Scanner Barcode
                    </h5>

                    <p>
                      SN : SCN-015
                    </p>
                  </div>

                  <div className="replacement-divider" />

                  <div className="replacement-meta">

                    <div className="meta-row">
                      <span>PIC</span>
                      <strong>
                        Dani Saputra
                      </strong>
                    </div>

                    <div className="meta-row">
                      <span>Waktu</span>
                      <strong>
                        09:52 WIB
                      </strong>
                    </div>

                  </div>

                </div>
              </div>
            )}

            <div className="sheet-section last-section">
              <h4>📝 Catatan</h4>

              <p className="sheet-note">
                {selectedReport.status === "issue"
                  ? "Scanner mati total dan diganti menggunakan unit cadangan."
                  : "Semua perangkat dalam kondisi baik."}
              </p>
            </div>

          </div>
        </div>
      )}
      <BottomNav />
    </MobileLayout>
  );
}