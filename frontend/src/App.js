import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNote from "./screens/MyNote/MyNote";
import Login from "./screens/LoginScreen/Login";
import Profile from "./screens/User/ProfileScreen";
import Register from "./screens/RegisterScreen/Register";
import CreateNote from "./screens/MyNote/CreateNote";
import SingleNote from "./screens/MyNote/SingleNote";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        {/* exact untuk menghapus tampilan dan mengganti tampilan berdasarkan menu */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/createnote" component={CreateNote} exact />
        <Route path="/note/:id" component={SingleNote} exact />
        <Route
          path="/mynotes"
          component={() => <MyNote search={search} />}
          exact
        />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
