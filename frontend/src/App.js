import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNote from "./screens/MyNote/MyNote";

const App = () => {
  const hello = 1;

  return (
    <BrowserRouter>
      <Header />
      <main>
        {/* exact untuk menghapus tampilan dan mengganti tampilan berdasarkan menu */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/mynotes" component={() => <MyNote />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
