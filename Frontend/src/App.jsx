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
import Tractomulas from './components/Tractomulas';

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
          <Route path='/formtractomulas' element={<FormTractomulas />} />
          <Route path='/tractomulas' element={<Tractomulas />} />

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
