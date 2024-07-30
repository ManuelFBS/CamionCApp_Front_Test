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

function App() {
  return (
    <BrowserRouter>
      <NavBarMain />
      <main className="container mx-auto px-10 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/lock-unlock"
            element={
              <ProtectedRoute>
                <LockUnlockPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
