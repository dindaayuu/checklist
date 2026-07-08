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

  const handleSubmit = async () => {
    console.log("Submit checklist");
    navigate("/dashboard");
  };

  return (
    <MobileLayout>
      <div className="scan-page">

        <div className="scan-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={22} />
          </button>

          <h2>Scan Device</h2>
        </div>

        <div className="scan-card">
          <div className="scan-icon">
            <ScanLine size={40} />
          </div>

          <h3>Scan Barcode Device</h3>
          <p>Scan barcode perangkat yang akan dicek</p>
        </div>

        <div className="manual-card">
          <Keyboard size={24} />

          <div>
            <span>Input Manual</span>
            <strong>Siap Digunakan</strong>
          </div>
        </div>

        <button
          className="save-btn"
          onClick={handleSubmit}
        >
          Simpan Hasil
        </button>

      </div>
    </MobileLayout>
  );
}