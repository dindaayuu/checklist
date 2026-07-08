import "./Login.css";
import logoSaloka from "../../assets/logo-saloka.png";
import heroBg from "../../assets/hero-bg.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardCheck,
  User,
  Lightbulb,
} from "lucide-react";

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

        <div className="hero">

          <img
            src={logoSaloka}
            alt="Saloka"
            className="login-logo"
          />

          <img
            src={heroBg}
            alt="Hero"
            className="hero-bg"
          />

        </div>

        <div className="login-card">

          <div className="floating-icon">

            <ClipboardCheck
              size={38}
              strokeWidth={2.2}
            />

          </div>

          <h2 className="login-title">
            Masuk Sebagai PIC Checklist
          </h2>

          <p className="login-desc">
            Masukkan nama Anda untuk memulai
            checklist perangkat tenant.
          </p>

          <div className="form-group">

            <label>
              Nama Anda
            </label>

            <div className="input-wrapper">

              <User
                size={20}
                className="input-icon"
              />

              <input
                type="text"
                placeholder="Ketik nama Anda"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

          </div>

          <div className="tip-box">

            <Lightbulb
              size={18}
              className="tip-icon"
            />

            <span>
              Gunakan nama asli agar laporan
              checklist tercatat dengan benar.
            </span>

          </div>

          <button
            className="primary-btn"
            onClick={handleLogin}
          >
            Mulai Checklist
          </button>

          <p className="version">
            Version 1.0.0
          </p>

        </div>

      </div>

    </div>
  );
}