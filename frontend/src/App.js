import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';

const App = () => {

  const hello = 1;

  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
