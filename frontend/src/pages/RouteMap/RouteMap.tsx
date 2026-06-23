import "./RouteMap.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";

import salokaMap from "../../assets/saloka-map.png";

import {
  SlidersHorizontal,
  ChevronRight,
  X,
} from "lucide-react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function RouteMap() {
  const navigate = useNavigate();

  const [selectedTenant, setSelectedTenant] =
    useState<any>(null);

    const tenants = [
      { id: 1, name: "Loket Tiket", area: "Pesisir", top: "69%", left: "14%", status: "pending" },
      { id: 2, name: "Lumbung Ilmu Galileo", area: "Pesisir", top: "55%", left: "22%", status: "done" },
      { id: 3, name: "Taman Galileo", area: "Pesisir", top: "54%", left: "38%", status: "pending" },
      { id: 4, name: "Arena Jejogedan", area: "Pesisir", top: "42%", left: "21%", status: "pending" },
      { id: 5, name: "Kapal Jenju", area: "Pesisir", top: "24%", left: "22%", status: "done" },
      { id: 6, name: "Cakrawala", area: "Pesisir", top: "6%", left: "23%", status: "pending" },
    
      { id: 7, name: "Angon Ingon", area: "Balalantara", top: "10%", left: "33%", status: "pending" },
      { id: 8, name: "Resi Waringin", area: "Balalantara", top: "14%", left: "35%", status: "pending" },
      { id: 9, name: "Kumbang Layang", area: "Balalantara", top: "18%", left: "39%", status: "done" },
      { id: 10, name: "Agrowisata", area: "Balalantara", top: "18%", left: "55%", status: "pending" },
      { id: 11, name: "Jamur Apung", area: "Balalantara", top: "28%", left: "36%", status: "pending" },
      { id: 12, name: "Safari Bocah", area: "Balalantara", top: "39%", left: "41%", status: "done" },
      { id: 13, name: "Adu Nyali", area: "Balalantara", top: "39%", left: "48%", status: "pending" },
    
      { id: 14, name: "Polah Bocah", area: "Kamayayi", top: "43%", left: "54%", status: "pending" },
      { id: 15, name: "Kupu-Kupu", area: "Kamayayi", top: "46%", left: "60%", status: "done" },
      { id: 16, name: "Pinguin", area: "Kamayayi", top: "47%", left: "69%", status: "pending" },
      { id: 17, name: "Tata-Titi", area: "Kamayayi", top: "59%", left: "68%", status: "issue" },
      { id: 18, name: "Semprat-Semprot", area: "Kamayayi", top: "52%", left: "57%", status: "pending" },
      { id: 19, name: "Komidi Kuda Laut", area: "Kamayayi", top: "69%", left: "53%", status: "pending" },
      { id: 20, name: "Teka Teko", area: "Kamayayi", top: "72%", left: "64%", status: "done" },
      { id: 21, name: "Titihan Bocah", area: "Kamayayi", top: "48%", left: "52%", status: "pending" },
    
      { id: 22, name: "Paku Bumi", area: "Ararya", top: "31%", left: "84%", status: "issue" },
      { id: 23, name: "Bengak-Bengok", area: "Ararya", top: "44%", left: "89%", status: "pending" },
      { id: 24, name: "Senggal-Senggol", area: "Ararya", top: "73%", left: "73%", status: "pending" },
      { id: 25, name: "Lika-Liku", area: "Ararya", top: "44%", left: "98%", status: "done" },
      { id: 26, name: "Obat-Abit", area: "Ararya", top: "64%", left: "84%", status: "pending" },
    
      { id: 27, name: "Gonjang-Ganjing", area: "Segara Prada", top: "47%", left: "18%", status: "pending" },
    
      { id: 28, name: "Kafe Jenju", area: "Resto", top: "37%", left: "28%", status: "done" },
      { id: 29, name: "Kedai Adu Tangkas", area: "Resto", top: "28%", left: "52%", status: "pending" },
      { id: 30, name: "Rimba Resto", area: "Resto", top: "29%", left: "74%", status: "pending" },
      { id: 31, name: "Kedai Daimami", area: "Resto", top: "63%", left: "46%", status: "done" },
    ];

    return (
      <MobileLayout>
        <div className="route-page">
    
          <div className="route-header">
            <h2>Route Map</h2>
          </div>
    
          <div className="map-card">
    
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={4}
              centerOnInit
              wheel={{
                step: 0.2,
              }}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className="map-container">
    
                  <img
                    src={salokaMap}
                    alt="Saloka Map"
                    className="map-image"
                  />
    
                  {tenants.map((tenant) => (
                    <button
                      key={tenant.id}
                      className={`marker ${tenant.status}`}
                      style={{
                        top: tenant.top,
                        left: tenant.left,
                      }}
                      onClick={() => setSelectedTenant(tenant)}
                    >
                      {tenant.id}
                    </button>
                  ))}
    
                </div>
              </TransformComponent>
            </TransformWrapper>
    
            {selectedTenant && (
              <div
                className="tenant-overlay"
                onClick={() => setSelectedTenant(null)}
              >
                <div
                  className="tenant-card"
                  onClick={(e) => e.stopPropagation()}
                >
    
                  <button
                    className="close-popup"
                    onClick={() => setSelectedTenant(null)}
                  >
                    <X size={18} />
                  </button>
    
                  <div className="tenant-top">
    
                    <div className="tenant-icon">
                      🏪
                    </div>
    
                    <div className="tenant-info">
                      <h3>{selectedTenant.name}</h3>
                      <p>{selectedTenant.area}</p>
                    </div>
    
                  </div>

                  <div
                    className={`tenant-status ${selectedTenant.status}`}
                  >
                    {selectedTenant.status === "done"
                      ? "✓ Selesai"
                      : selectedTenant.status === "issue"
                      ? "⚠ Kendala"
                      : "○ Belum Dicek"}
                  </div>
    
                  <button
                    className="checklist-btn"
                    onClick={() =>
                      navigate("/tenant-detail", {
                        state: {
                          name: selectedTenant.name,
                          area: selectedTenant.area,
                        },
                      })
                    }
                  >
                    Mulai Checklist
                    <ChevronRight size={18} />
                  </button>
    
                </div>
              </div>
            )}
    
          </div>
    
        </div>
    
        <BottomNav />
      </MobileLayout>
    )}