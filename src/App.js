import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { pageRoutes } from './Routes/pageRoutes';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={pageRoutes.home} element={<Home />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;