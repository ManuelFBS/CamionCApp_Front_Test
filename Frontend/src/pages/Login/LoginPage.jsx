/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../api/auth';
import { useAuth } from '../../context/AuthContext';
import {
    getDriverByDniRequest,
    getVehicleByIDRequest,
} from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';

export function LoginPage() {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {
        setIsAuthenticated,
        // userRole,
        setUserRole,
        userName,
        setUserName,
        // dni,
        setDNI,
        // vehicleRegistrationPlate,
        setVehicleRegistrationPlate,
    } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Mostrar spinner de carga...

            const response = await loginRequest(data);

            console.log('Datos del usuario: ', response.data);

            if (response.status === 200) {
                const driverData = await getDriverByDniRequest(
                    response.data.usuarioReg.usuario_cedula,
                );
                setDNI(driverData.data.cedula);
                //
                // // console.log('Cédula Nº :', driverData.data.cedula);

                //
                if (driverData.data.vehiculos[0] !== undefined) {
                    const getVehRegPlate = await getVehicleByIDRequest(
                        driverData.data.vehiculos[0],
                    );
                    setVehicleRegistrationPlate(getVehRegPlate.data.data.placa);
                    // console.log(
                    //     'Placas del vehículo asignado: ',
                    //     getVehRegPlate.data.data.placa,
                    // );
                }

                const role = response.data.usuarioReg.roles || [];
                const fullName = response.data.employeeFullName;
                //
                setUserName(fullName);
                setUserRole(role);
                setIsAuthenticated(true);

                // Redirigir según el rol del usuario...
                if (role === 'Owner' || role === 'Admin') {
                    navigate('/employees');
                } else if (role === 'Empleado') {
                    navigate('/general_access');
                    // navigate('/volquetas/planilla/add');
                } else {
                    navigate('/unauthorized');
                }
            }
        } catch (error) {
            setErrors([error.response?.data?.message]);
        } finally {
            setIsLoading(false); // Se oculta el spinner de carga...
        }
    };

    useEffect(() => {
        if (userName) {
            console.log('Nombre completo actualizado: ', userName);
        }
    }, [userName]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <div className="bg-otherpages min-h-screen">
            {isLoading && (
                <div>
                    <Loading />
                </div>
            )}{' '}
            {/* Se renderiza si es true... */}
            <div className="flex h-[calc(100vh-100px)] items-center justify-center">
                <div className="bg-zinc-100 border-4 border-red-600 max-w-md w-full p-0 rounded-md">
                    <div className="bg-red-600 flex items-stretch">
                        <h2 className="text-2xl font-bold italic ml-48 mb-2 text-gray-100">
                            Login
                        </h2>
                    </div>

                    <form
                        className="pt-5 pl-6 pr-6 pb-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Label htmlFor="inputValue">Usuario</Label>
                        <Input
                            type="text"
                            placeholder="Escriba su 'usuario'..."
                            {...register('usuario')}
                        />

                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="*******"
                            {...register('password')}
                        />
                        {errors.length > 0 && (
                            <p className="text-red-600">{errors.join(', ')}</p>
                        )}

                        <Button
                            type="submit"
                            className="bg-slate-500 w-full mt-3 mb-4 hover:bg-slate-400"
                        >
                            Aceptar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
