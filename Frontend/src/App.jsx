/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    GeneralAccessPage,
    VolquetasFormPage,
    RefuelingFormPage,
    UnauthorizedPage,
    VehicleFormAddPage,
    AssignDriverToVehicleFormPage,
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
                            path="/employees"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <EmployeesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/employees/employee/:_id"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <EmployeesDetailsCard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/employees/add"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <EmployeesFormAddPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/employees/bydni"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <EmployeeByDniPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/employees/bydni/:cedula"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <EmployeesDetailsCard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/employees/employee/edit"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <UpdateEmployeeByDni />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <UsersPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users/add"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <UsersFormAddPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users/admin/lock-unlock"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <UsersFormLockUnlockPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/vehicles/planilla/add"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <VehicleFormAddPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/vehicles/vehassign"
                            element={
                                <ProtectedRoute allowed={['Admin', 'Owner']}>
                                    <AssignDriverToVehicleFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/general_access"
                            element={<GeneralAccessPage />}
                        />
                        <Route
                            path="/volquetas/planilla/add"
                            element={
                                <ProtectedRoute
                                    allowed={['Admin', 'Owner', 'Empleado']}
                                >
                                    <VolquetasFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/refueling/planilla/add"
                            element={
                                <ProtectedRoute
                                    allowed={['Admin', 'Owner', 'Empleado']}
                                >
                                    <RefuelingFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/unauthorized"
                            element={<UnauthorizedPage />}
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </AuthProvider>
    );
}

// const ProtectedRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/employees" element={<EmployeesPage />} />
//             <Route
//                 path="/employees/employee/:id"
//                 element={<EmployeesDetailsCard />}
//             />
//             <Route path="/employees/add" element={<EmployeesFormAddPage />} />
//             <Route path="/employees/bydni" element={<EmployeeByDniPage />} />
//             <Route
//                 path="/employees/bydni/:cedula"
//                 element={<EmployeesDetailsCard />}
//             />
//             <Route
//                 path="/employees/employee/edit"
//                 element={<UpdateEmployeeByDni />}
//             />
//             <Route path="/users" element={<UsersPage />} />
//             <Route path="/users/add" element={<UsersFormAddPage />} />
//             <Route
//                 path="/users/admin/lock-unlock"
//                 element={<UsersFormLockUnlockPage />}
//             />
//             <Route
//                 path="/volquetas/planilla/add"
//                 element={<VolquetasFormPage />}
//             />
//         </Routes>
//     );
// };

export default App;
