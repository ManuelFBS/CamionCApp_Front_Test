import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  EmployeesPage,
  EmployeesAllPage,
  EmployeesFormAddPage,
  EmployeeByDniPage,
  HomePage,
  LockUnlockPage,
  LoginPage,
} from './pages';
import { NavBarMain } from './components/Navs/NavBarMain';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './pages/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBarMain />
        <main className="container mx-auto px-10 pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <ProtectedRoutes />
                </ProtectedRoute>
              }
            >
              <Route
                path="lock-unlock"
                element={<LockUnlockPage />}
              />
              <Route
                path="employees"
                element={<EmployeesPage />}
              />
              <Route
                path="employees/add"
                element={<EmployeesFormAddPage />}
              />
              <Route
                path="employees/all"
                element={<EmployeesAllPage />}
              />
              <Route
                path="employees/search"
                element={<EmployeeByDniPage />}
              />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
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
      <Route
        path="/employees/add"
        element={<EmployeesFormAddPage />}
      />
      <Route
        path="/employees/all"
        element={<EmployeesAllPage />}
      />
      <Route
        path="/employees/search"
        element={<EmployeeByDniPage />}
      />
    </Routes>
  );
};

export default App;
