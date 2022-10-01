import "./App.css";
import { Navbar, NotFound, Login, Register, HeroSection, HomeSection, PrivateRoute, PreventRoute, PageLaoding, MyAccount, Router, Routes, Route, useFirebaseContext, AddFriend, ManageFriend } from "./AllComponents";

function App() {
  const { currentUser, fullDB } = useFirebaseContext();
  return (currentUser && fullDB) || currentUser === false ? (
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
          <Route exact path="/addfriend" element={<AddFriend />} />
          <Route exact path="/managefriend" element={<ManageFriend />} />
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
