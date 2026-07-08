import "./RouteMap.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";
import BottomNav from "../../components/BottomNav";
import api from "../../services/api";

import salokaMap from "../../assets/saloka-map.png";

import {
  X,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

interface Tenant {
  id: number;
  code: string;
  name: string;
  area: string;
  top: number;
  left: number;
  status: string;
  route_order: number;
  is_active: boolean;
}

// Keep the original 31 tenants as default fallback data
const defaultTenants: Tenant[] = [
  { id: 1, code: "TENANT-001", name: "Loket Tiket", area: "Pesisir", top: 69.00, left: 14.00, status: "pending", route_order: 1, is_active: true },
  { id: 2, code: "TENANT-002", name: "Lumbung Ilmu Galileo", area: "Pesisir", top: 55.00, left: 22.00, status: "done", route_order: 2, is_active: true },
  { id: 3, code: "TENANT-003", name: "Taman Galileo", area: "Pesisir", top: 54.00, left: 38.00, status: "pending", route_order: 3, is_active: true },
  { id: 4, code: "TENANT-004", name: "Arena Jejogedan", area: "Pesisir", top: 42.00, left: 21.00, status: "pending", route_order: 4, is_active: true },
  { id: 5, code: "TENANT-005", name: "Kapal Jenju", area: "Pesisir", top: 24.00, left: 22.00, status: "done", route_order: 5, is_active: true },
  { id: 6, code: "TENANT-006", name: "Cakrawala", area: "Pesisir", top: 6.00, left: 23.00, status: "pending", route_order: 6, is_active: true },

  { id: 7, code: "TENANT-007", name: "Angon Ingon", area: "Balalantara", top: 10.00, left: 33.00, status: "pending", route_order: 7, is_active: true },
  { id: 8, code: "TENANT-008", name: "Resi Waringin", area: "Balalantara", top: 14.00, left: 35.00, status: "pending", route_order: 8, is_active: true },
  { id: 9, code: "TENANT-009", name: "Kumbang Layang", area: "Balalantara", top: 18.00, left: 39.00, status: "done", route_order: 9, is_active: true },
  { id: 10, code: "TENANT-010", name: "Agrowisata", area: "Balalantara", top: 18.00, left: 55.00, status: "pending", route_order: 10, is_active: true },
  { id: 11, code: "TENANT-011", name: "Jamur Apung", area: "Balalantara", top: 28.00, left: 36.00, status: "pending", route_order: 11, is_active: true },
  { id: 12, code: "TENANT-012", name: "Safari Bocah", area: "Balalantara", top: 39.00, left: 41.00, status: "done", route_order: 12, is_active: true },
  { id: 13, code: "TENANT-013", name: "Adu Nyali", area: "Balalantara", top: 39.00, left: 48.00, status: "pending", route_order: 13, is_active: true },

  { id: 14, code: "TENANT-014", name: "Polah Bocah", area: "Kamayayi", top: 43.00, left: 54.00, status: "pending", route_order: 14, is_active: true },
  { id: 15, code: "TENANT-015", name: "Kupu-Kupu", area: "Kamayayi", top: 46.00, left: 60.00, status: "done", route_order: 15, is_active: true },
  { id: 16, code: "TENANT-016", name: "Pinguin", area: "Kamayayi", top: 47.00, left: 69.00, status: "pending", route_order: 16, is_active: true },
  { id: 17, code: "TENANT-017", name: "Tata-Titi", area: "Kamayayi", top: 59.00, left: 68.00, status: "issue", route_order: 17, is_active: true },
  { id: 18, code: "TENANT-018", name: "Semprat-Semprot", area: "Kamayayi", top: 52.00, left: 57.00, status: "pending", route_order: 18, is_active: true },
  { id: 19, code: "TENANT-019", name: "Komidi Kuda Laut", area: "Kamayayi", top: 69.00, left: 53.00, status: "pending", route_order: 19, is_active: true },
  { id: 20, code: "TENANT-020", name: "Teka Teko", area: "Kamayayi", top: 72.00, left: 64.00, status: "done", route_order: 20, is_active: true },
  { id: 21, code: "TENANT-021", name: "Titihan Bocah", area: "Kamayayi", top: 48.00, left: 52.00, status: "pending", route_order: 21, is_active: true },

  { id: 22, code: "TENANT-022", name: "Paku Bumi", area: "Ararya", top: 31.00, left: 84.00, status: "issue", route_order: 22, is_active: true },
  { id: 23, code: "TENANT-023", name: "Bengak-Bengok", area: "Ararya", top: 44.00, left: 89.00, status: "pending", route_order: 23, is_active: true },
  { id: 24, code: "TENANT-024", name: "Senggal-Senggol", area: "Ararya", top: 73.00, left: 73.00, status: "pending", route_order: 24, is_active: true },
  { id: 25, code: "TENANT-025", name: "Lika-Liku", area: "Ararya", top: 44.00, left: 98.00, status: "done", route_order: 25, is_active: true },
  { id: 26, code: "TENANT-026", name: "Obat-Abit", area: "Ararya", top: 64.00, left: 84.00, status: "pending", route_order: 26, is_active: true },

  { id: 27, code: "TENANT-027", name: "Gonjang-Ganjing", area: "Segara Prada", top: 47.00, left: 18.00, status: "pending", route_order: 27, is_active: true },

  { id: 28, code: "TENANT-028", name: "Kafe Jenju", area: "Resto", top: 37.00, left: 28.00, status: "done", route_order: 28, is_active: true },
  { id: 29, code: "TENANT-029", name: "Kedai Adu Tangkas", area: "Resto", top: 28.00, left: 52.00, status: "pending", route_order: 29, is_active: true },
  { id: 30, code: "TENANT-030", name: "Rimba Resto", area: "Resto", top: 29.00, left: 74.00, status: "pending", route_order: 30, is_active: true },
  { id: 31, code: "TENANT-031", name: "Kedai Daimami", area: "Resto", top: 63.00, left: 46.00, status: "done", route_order: 31, is_active: true },
];

export default function RouteMap() {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const isMobile = window.innerWidth < 768;
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [mapScale, setMapScale] = useState<number>(1);

  useEffect(() => {
    if (!isMobile || !transformRef.current || !imageLoaded) return;

    requestAnimationFrame(() => {
      transformRef.current?.centerView(
        mapScale,
        300
      );
    });
  }, [mapScale, isMobile, loading, imageLoaded]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const isLandscapeMap = img.naturalWidth > img.naturalHeight;

    let targetScale = 1;
    if (isLandscapeMap && isMobile) {
      targetScale = Math.min(
        Math.max(window.innerHeight / window.innerWidth, 1.6),
        2.2
      );
    }

    setMapScale(targetScale);
    setImageLoaded(true);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tenants");
      // Sort in frontend just to guarantee route_order ASC, and display active only
      const activeTenants = response.data
        .filter((t: Tenant) => t.is_active)
        .sort((a: Tenant, b: Tenant) => a.route_order - b.route_order);

      setTenants(activeTenants);
      setIsUsingFallback(false);
    } catch (error) {
      // API fails: fallback to local hardcoded data
      setTenants(defaultTenants);
      setIsUsingFallback(true);
      
      // Show toast message
      setToastMessage("Gagal mengambil Route Map terbaru. Menggunakan data cadangan.");
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout>
      <div className="route-page">
        {/* Toast Notification */}
        {toastMessage && (
          <div 
            style={{
              position: "fixed",
              top: "16px",
              left: "16px",
              right: "16px",
              background: "#ea580c",
              color: "white",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 10000,
            }}
          >
            <AlertCircle size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="route-header" style={{ marginBottom: isUsingFallback ? "4px" : "14px" }}>
          <h2>Route Map</h2>
        </div>

        {/* Persistent Warning Banner */}
        {isUsingFallback && (
          <div 
            style={{
              background: "#ffedd5",
              border: "1px solid #fed7aa",
              color: "#c2410c",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px"
            }}
          >
            <AlertCircle size={14} />
            <span>⚠ Menggunakan data cadangan Route Map.</span>
          </div>
        )}

        <div className="map-card">
          {loading ? (
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "8px",
                color: "#64748b"
              }}
            >
              <Loader2 className="status-spinner" size={32} style={{ color: "#4f8440" }} />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>Memuat rute peta...</span>
            </div>
          ) : (
            <TransformWrapper
              ref={transformRef}
              initialScale={mapScale}
              centerOnInit
              minScale={1}
              maxScale={4}
              limitToBounds={true}
              wheel={{ disabled: false }}
              pinch={{ disabled: false }}
              doubleClick={{ disabled: false }}
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
                <div className="map-stage">
                  <div className="map-image-wrapper">
                    <img
                      src={salokaMap}
                      alt="Saloka Map"
                      className="map-image"
                      onLoad={handleImageLoad}
                    />

                    {tenants.map((tenant) => (
                      <button
                        key={tenant.code}
                        className={`map-marker ${tenant.status}`}
                        style={{
                          top: `${tenant.top}%`,
                          left: `${tenant.left}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => setSelectedTenant(tenant)}
                      >
                        {tenant.route_order}
                      </button>
                    ))}
                  </div>
                </div>
              </TransformComponent>
            </TransformWrapper>
          )}

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
                  <div className="tenant-icon">🏪</div>
                  <div className="tenant-info">
                    <h3>{selectedTenant.name}</h3>
                    <p>{selectedTenant.area}</p>
                  </div>
                </div>

                <div className={`tenant-status ${selectedTenant.status}`}>
                  {selectedTenant.status === "done"
                    ? "✓ Selesai"
                    : selectedTenant.status === "issue"
                    ? "⚠ Kendala"
                    : "○ Belum Dicek"}
                </div>

                <button
                  className="checklist-btn"
                  onClick={() =>
                    navigate(
                      `/tenant-detail/${selectedTenant.id}`
                    )
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
  );
}