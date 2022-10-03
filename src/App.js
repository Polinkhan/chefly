import "./App.css";
import { Pages, Contexts } from "./AllComponents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const { currentUser, fullDB } = Contexts.useFirebaseContext();
  return (currentUser && fullDB) || currentUser === false ? (
    <Router>
      {currentUser && <Pages.Navbar />}
      <Routes>
        {/* Routes When User is Not Authenticated */}
        <Route element={<Pages.PreventRoute />}>
          <Route exact path="/" element={<Pages.HeroSection />} />
          <Route exact path="/login" element={<Pages.Login />} />
          <Route exact path="/register" element={<Pages.Register />} />
        </Route>

        {/* Routes When User is Authenticated */}
        <Route element={<Pages.PrivateRoute />}>
          <Route exact path="/home" element={<Pages.HomeSection />} />
          <Route exact path="/account" element={<Pages.MyAccount />} />
          <Route exact path="/addfriend" element={<Pages.AddFriend />} />
          <Route exact path="/managefriend" element={<Pages.ManageFriend />} />
        </Route>

        {/* Routes When route Not Found */}
        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </Router>
  ) : (
    <Pages.PageLaoding />
  );
}

export default App;
