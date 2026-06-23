import "./Login.css";
import logoSaloka from "../../assets/logo-saloka.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!name.trim()) {
      alert("Nama harus diisi");
      return;
    }
  
    localStorage.setItem("userName", name);
  
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="mobile-container">
        <div className="login-content">

          <img
            src={logoSaloka}
            alt="Saloka"
            className="login-logo"
          />

          <div className="brand-section">
            <h2 className="brand-subtitle">
              SATS
            </h2>

            <p className="brand-desc">
              Smart Asset Tracking Saloka
            </p>
          </div>

          <div className="illustration-box">
            <div className="illustration-icon">
              📋
            </div>
          </div>

          <h3 className="login-title">
            Masuk Sebagai PIC Checklist
          </h3>

          <p className="login-desc">
            Masukkan nama Anda untuk memulai
            checklist perangkat tenant.
          </p>

          <div className="form-group">
            <label>Nama Anda</label>

            <input
              type="text"
              placeholder="Ketik nama Anda"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="tip-box">
            💡 Gunakan nama asli agar laporan
            checklist tercatat dengan benar.
          </div>

          <button
            className="primary-btn"
            onClick={handleLogin}
          >
            Mulai Checklist
          </button>

          <p className="version">
            Versi 1.0.0
          </p>

        </div>
      </div>
    </div>
  );
}