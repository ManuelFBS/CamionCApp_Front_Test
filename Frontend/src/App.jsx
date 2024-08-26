import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  EmployeesPage,
  HomePage,
  LockUnlockPage,
  LoginPage,
} from './pages';
import { NavBarMain } from './components/Navs/NavBarMain';
import { ProtectedRoute } from './pages/ProtectedRoutes/ProtectedRoutes';
import Layout from './components/Layout';
import LandingPage from './LandingPage';
import FormTractomulas from './pages/FormTractomulas';
import FormVolquetas from './pages/FormVolquetas';
import FormTanqueos from './pages/FormTanqueos';
import UserProfileDetail from './pages/UserProfileDetail';
import Tractomulaspdf from './components/Tractomulaspdf';
import Tanqueospdf from './components/Tanqueospdf';
import Volquetaspdf from './components/Volquetaspdf';

function App() {
  return (
    <BrowserRouter>
      <NavBarMain />
      <main>
        <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/formTractomulas' element={<FormTractomulas />} />
          <Route path='/formVolquetas' element={<FormVolquetas />} />
          <Route path='/formTanqueos' element={<FormTanqueos />} />
          <Route path='/tractomulaspdf' element={<Tractomulaspdf />} />
          <Route path='/tanqueospdf' element={<Tanqueospdf />} />
          <Route path='/volquetaspdf' element={<Volquetaspdf />} />
          <Route path='/userProfileDetail' element={<UserProfileDetail />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedRoutes />
              </ProtectedRoute>
            }
          />
    
        </Routes>
        </Layout>
      </main>
    </BrowserRouter>
  );
}

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        path="/lock-unlock"
        element={<LockUnlockPage />}
      />
      <Route
        path="/employees"
        element={<EmployeesPage />}
      />
    </Routes>
  );
};

export default App;
