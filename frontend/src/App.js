import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNote from "./screens/MyNote/MyNote";
import Login from "./screens/LoginScreen/Login";
import Register from "./screens/RegisterScreen/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        {/* exact untuk menghapus tampilan dan mengganti tampilan berdasarkan menu */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/mynotes" component={() => <MyNote />} exact />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
