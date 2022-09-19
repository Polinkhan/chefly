import "./App.css";
import FooterSection from "./components/footerSection/FooterSection";
import HeroSection from "./components/heroSection/heroSection";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/heroSection/Login";
import Register from "./components/heroSection/Register";
import NotFound from "./components/NotFound";
import { useLoginContext } from "./contexts/LoginContext";
import HomeSection from "./components/homeSection/HomeSection";
import Navbar from "./components/Navbar";

function App() {
  const { isSignIn } = useLoginContext();
  console.log(isSignIn);
  return (
    <Router>
      {isSignIn && <Navbar />}

      <Routes>
        <Route
          exact
          path="/"
          element={isSignIn ? <HomeSection /> : <HeroSection />}
        />
        <Route
          exact
          path="/login"
          element={isSignIn ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={isSignIn ? <Navigate to="/home" replace /> : <Register />}
        />
        <Route
          exact
          path="/home"
          element={isSignIn ? <HomeSection /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterSection />
    </Router>
  );
}

export default App;
