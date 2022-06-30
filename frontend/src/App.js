import Header from './components/navigation/Header';
import AppBody from './components/AppBody';
import Footer from './components/navigation/Footer';

const App = () =>  {
  return (
    <div className="relative min-h-screen text-center">
      <Header/>
      <AppBody/>
      <Footer/>
    </div>
  );
}

export default App;
