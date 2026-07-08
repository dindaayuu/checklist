import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import RouteMap from "./pages/RouteMap/RouteMap";
import Report from "./pages/Report/Report";
import TenantDetail from "./pages/TenantDetail/TenantDetail";

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
          path="/report"
          element={<Report />}
        />

        <Route
          path="/tenant-detail/:id"
          element={<TenantDetail />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;