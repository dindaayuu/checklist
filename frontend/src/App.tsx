import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import RouteMap from "./pages/RouteMap/RouteMap";
import TenantDetail from "./pages/TenantDetail/TenantDetail";
import Checklist from "./pages/Checklist/Checklist";
import Report from "./pages/Report/Report";
import ScanDevice from "./pages/ScanDevice/ScanDevice";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/route-map"
          element={<RouteMap />}
        />

        <Route
          path="/tenant-detail"
          element={<TenantDetail />}
        />

        <Route
          path="/checklist"
          element={<Checklist />}
        />

        <Route
          path="/Report"
          element={<Report />}
        />

        <Route
          path="/scan-device"
          element={<ScanDevice />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;