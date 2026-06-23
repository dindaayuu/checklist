import "./ScanDevice.css";

import { useNavigate } from "react-router-dom";

import MobileLayout from "../../components/MobileLayout";

import {
  ArrowLeft,
  ScanLine,
  Keyboard,
} from "lucide-react";

export default function ScanDevice() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="scan-page">

        <div className="scan-header">

          <button
            className="back-btn"
            onClick={() =>
              navigate("/tenant-detail")
            }
          >
            <ArrowLeft size={20} />
          </button>

          <h2>Scan Barcode Device</h2>

        </div>

        <p className="scan-subtitle">
          Scan barcode device pengganti
          untuk menambahkan ke asset
          tracking.
        </p>

        {/* SCANNER */}

        <div className="scanner-card">

          <div className="scanner-box">

            <div className="scanner-corner top-left"></div>
            <div className="scanner-corner top-right"></div>
            <div className="scanner-corner bottom-left"></div>
            <div className="scanner-corner bottom-right"></div>

            <ScanLine
              size={90}
              className="scan-icon"
            />

            <div className="scan-line"></div>

          </div>

          <p className="scanner-text">
            Arahkan kamera ke barcode
          </p>

          <div className="divider">
            <span>atau</span>
          </div>

          <button className="manual-btn">

            <Keyboard size={18} />

            Input Manual

          </button>

        </div>

        {/* DEVICE INFO */}

        <div className="device-info-card">

          <h3>Informasi Device</h3>

          <div className="info-row">
            <span>Nama Device</span>
            <strong>
              Canon LiDE 400
            </strong>
          </div>

          <div className="info-row">
            <span>Tipe</span>
            <strong>Scanner</strong>
          </div>

          <div className="info-row">
            <span>Kode Asset</span>
            <strong>
              SAL-DSC-25061479
            </strong>
          </div>

          <div className="info-row">
            <span>Status</span>

            <strong className="ready">
              Siap Digunakan
            </strong>

          </div>

        </div>

        <button
          className="save-btn"
          onClick={() =>
            navigate("/tenant-detail")
          }
        >
          Simpan Hasil
        </button>

      </div>
    </MobileLayout>
  );
}