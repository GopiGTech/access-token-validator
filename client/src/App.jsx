import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout"
import Validator from "./pages/Validator";
import History from "./pages/History";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Validator />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;