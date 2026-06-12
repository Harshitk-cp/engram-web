import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GradientBackground from "./components/ui/GradientBackground";
import ChainRail from "./components/ui/ChainRail";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <GradientBackground />
      <ChainRail />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
