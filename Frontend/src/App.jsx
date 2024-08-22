import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  EmployeesPage,
  EmployeesFormAddPage,
  EmployeeByDniPage,
  UpdateEmployeeByDni,
  HomePage,
  LoginPage,
  UsersFormAddPage,
  UsersFormLockUnlockPage,
  UsersPage,
} from './pages';
import { EmployeesDetailsCard } from './components/Employees/EmployeesDetailsCard';
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
                path="employees"
                element={<EmployeesPage />}
              />
              <Route
                path="employees/employee/:_id"
                element={<EmployeesDetailsCard />}
              />
              <Route
                path="employees/add"
                element={<EmployeesFormAddPage />}
              />
              <Route
                path="employees/bydni"
                element={<EmployeeByDniPage />}
              />
              <Route
                path="employees/bydni/:cedula"
                element={<EmployeesDetailsCard />}
              />
              <Route
                path="employees/employee/edit"
                element={<UpdateEmployeeByDni />}
              />
              <Route path="users" element={<UsersPage />} />
              <Route
                path="users/add"
                element={<UsersFormAddPage />}
              />

              <Route
                path="users/admin/lock-unlock"
                element={<UsersFormLockUnlockPage />}
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
        path="/employees"
        element={<EmployeesPage />}
      />
      <Route
        path="/employees/employee/:id"
        element={<EmployeesDetailsCard />}
      />
      <Route
        path="/employees/add"
        element={<EmployeesFormAddPage />}
      />
      <Route
        path="/employees/bydni"
        element={<EmployeeByDniPage />}
      />
      <Route
        path="/employees/bydni/:cedula"
        element={<EmployeesDetailsCard />}
      />
      <Route
        path="/employees/employee/edit"
        element={<UpdateEmployeeByDni />}
      />
      <Route path="/users" element={<UsersPage />} />
      <Route
        path="/users/add"
        element={<UsersFormAddPage />}
      />
      <Route
        path="/users/admin/lock-unlock"
        element={<UsersFormLockUnlockPage />}
      />
    </Routes>
  );
};

export default App;
