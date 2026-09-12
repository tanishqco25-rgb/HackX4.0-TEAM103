import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Resources from "./pages/Resources";
import Allocation from "./pages/Allocation";
import DisasterMap from "./pages/DisasterMap";
import Simulation from "./pages/Simulation";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/map" element={<DisasterMap />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;