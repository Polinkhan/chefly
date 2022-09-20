import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Login from "./components/heroSection/Login";
import Register from "./components/heroSection/Register";
import HeroSection from "./components/heroSection/HeroSection";
import HomeSection from "./components/homeSection/HomeSection";
import { useFirebaseContext } from "./contexts/FirebaseContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import PreventRoute from "./components/privateRoute/PreventRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLaoding from "./components/PageLaoding";
import MyAccount from "./components/account/MyAccount";

function App() {
  const { currentUser } = useFirebaseContext();
  return currentUser || currentUser === false ? (
    <Router>
      {currentUser && <Navbar />}
      <Routes>
        {/* Routes When User is Not Authenticated */}
        <Route element={<PreventRoute />}>
          <Route exact path="/" element={<HeroSection />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>

        {/* Routes When User is Authenticated */}
        <Route element={<PrivateRoute />}>
          <Route exact path="/home" element={<HomeSection />} />
          <Route exact path="/account" element={<MyAccount />} />
        </Route>

        {/* Routes When route Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  ) : (
    <PageLaoding />
  );
}

export default App;
