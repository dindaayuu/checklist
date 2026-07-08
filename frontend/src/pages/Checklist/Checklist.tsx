import "./Checklist.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";

export default function Checklist() {
  const navigate = useNavigate();

  const [openArea, setOpenArea] =
    useState("Downtown Area");

  const areas = [
    {
      name: "Downtown Area",
      progress: "3/4 Tenant",
      tenants: [
        {
          id: 1,
          name: "Shop 89",
          status: "done",
        },
        {
          id: 2,
          name: "Cemilan",
          status: "done",
        },
        {
          id: 3,
          name: "Srengenge",
          status: "issue",
        },
        {
          id: 4,
          name: "Klamben",
          status: "pending",
        },
      ],
    },

    {
      name: "Pesisir Area",
      progress: "0/3 Tenant",
      tenants: [],
    },

    {
      name: "Balantara Area",
      progress: "0/2 Tenant",
      tenants: [],
    },
  ];

  const getStatusIcon = (
    status: string
  ) => {
    switch (status) {
      case "done":
        return (
          <CheckCircle2
            size={22}
            className="status-done"
          />
        );

      case "issue":
        return (
          <AlertCircle
            size={22}
            className="status-issue"
          />
        );

      default:
        return (
          <Clock3
            size={22}
            className="status-pending"
          />
        );
    }
  };

  return (
    <MobileLayout>
      <div className="checklist-page">

        {/* HEADER */}

        <div className="checklist-header">

          <h2>Checklist</h2>

        </div>

        {/* AREA */}

        {areas.map((area) => (
          <div
            key={area.name}
            className="area-card"
          >

            <div
              className="area-header"
              onClick={() =>
                setOpenArea(
                  openArea === area.name
                    ? ""
                    : area.name
                )
              }
            >

              <div>

                <h3>{area.name}</h3>

                <p>{area.progress}</p>

              </div>

              {openArea === area.name ? (
                <ChevronDown size={22} />
              ) : (
                <ChevronRight size={22} />
              )}

            </div>

            {openArea === area.name && (
              <div className="tenant-list">

                {area.tenants.map(
                  (tenant) => (
                    <div
                      key={tenant.id}
                      className={`tenant-item ${
                        tenant.status ===
                        "issue"
                          ? "tenant-issue"
                          : ""
                      }`}
                      onClick={() =>
                        navigate(
                          `/tenant-detail/${tenant.id}`
                        )
                      }
                    >

                      <div className="tenant-left">

                        <div className="tenant-number">
                          {tenant.id}
                        </div>

                        <span>
                          {tenant.name}
                        </span>

                      </div>

                      {getStatusIcon(
                        tenant.status
                      )}

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        ))}

        {/* LEGEND */}

        <div className="legend">

          <div>

            <CheckCircle2
              size={16}
              className="status-done"
            />

            <span>Selesai</span>

          </div>

          <div>

            <AlertCircle
              size={16}
              className="status-issue"
            />

            <span>Kendala</span>

          </div>

          <div>

            <Clock3
              size={16}
              className="status-pending"
            />

            <span>Belum Dicek</span>

          </div>

        </div>

      </div>

      <BottomNav />
    </MobileLayout>
  );
}