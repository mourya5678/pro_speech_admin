import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AllRoutes, pageRoutes } from './Routes/pageRoutes';
import PageNotFound from './Pages/PageNotFound';
import PrivateRoute from './Controllers/PrivateRoute';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  return (
    <div>
      <Routes>
        {
          AllRoutes?.map((item) => {
            return (
              <Route
                path={item.path}
                exact
                element={<PrivateRoute>{item?.element}</PrivateRoute>}
              />
            )
          })
        }
        <Route exact path={pageRoutes.login} element={<Login />} />
        <Route exact path={pageRoutes.forgotPassword} element={<ForgotPassword />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App;