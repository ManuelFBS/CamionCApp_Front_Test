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
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedRoutes />
              </ProtectedRoute>
            }
          >
            <Route
              path="/lock-unlock"
              element={<LockUnlockPage />}
            />
            <Route
              path="/employees"
              element={<EmployeesPage />}
            />
          </Route>
        </Routes>
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
