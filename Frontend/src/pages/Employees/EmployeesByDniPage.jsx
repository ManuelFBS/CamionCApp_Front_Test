/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
// // // Código modificado (híbrido)... // // //
// ------------------------------------------------------------------------------------------------------------------------------- //
import { Button, Input, Label } from '../../components/UI';
import { useState } from 'react';
import {
    getEmployeeByDniRequest,
    deleteEmployeeByDniRequest,
} from '../../../api/employees';
import { EmployeesDetailsCard } from '../../components/Employees/EmployeesDetailsCard';
import { Loading } from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import '../../styles/global.css';

export function EmployeeByDniPage() {
    const [cedula, setCedula] = useState('');
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setCedula(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setEmployee(null);

        try {
            const response = await getEmployeeByDniRequest(cedula);

            setEmployee(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Empleado no encontrado...!!!');
        } finally {
            setLoading(false);
        }
    };

    // Para eliminar el empleado...
    const handleDelete = async (e) => {
        e.preventDefault();

        // Confirmación de la eliminación por medio de un sweetalert...
        const result = await Swal.fire({
            title: '¿Está seguro...?',
            text: 'Esta acción eliminará al empleado. ¡No se puede revertir...!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar...',
            cancelButtonText: 'No, cancelar...',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await deleteEmployeeByDniRequest(cedula);

                Swal.fire({
                    title: 'Eliminado',
                    text: 'El empleado ha sido eliminado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                // Se resetea el formulario y limpiar los estados...
                setCedula('');
                setEmployee(null);
                setError(null);
            } catch (error) {
                // Mostrar mensaje de error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar al empleado.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } else {
            // Resetear el formulario si el usuario cancela...
            setCedula('');
            setEmployee(null);
            setError(null);
        }
    };

    return (
        <div className="bg-otherpages min-h-screen">
            {loading && (
                <div>
                    <Loading />
                </div>
            )}{' '}
            {/* Se renderiza si es true... */}
            <div className="customDiv-1a">
                <div className="customDiv-2">
                    <div className="customDivH2">
                        <h2 className="customH2 ml-8 text-xl">
                            Buscar / Eliminar Empleado por Cédula
                        </h2>
                    </div>
                    <form className="customFormDiv" onSubmit={handleSearch}>
                        <div>
                            <div>
                                <Label htmlFor="cedula">Cédula</Label>
                                <Input
                                    type="number"
                                    value={cedula}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el nro de cédula..."
                                />
                            </div>
                        </div>

                        <div className="customButtonContainer">
                            <div>
                                {/* Botón para eliminar empleado */}
                                {employee && (
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            onClick={handleDelete}
                                            className="bg-red-600 w-40 mb-4 hover:bg-red-400"
                                        >
                                            Eliminar Empleado
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div>
                                {/* Botón para buscar empleado */}
                                <Button
                                    type="submit"
                                    className="bg-slate-500 w-40 mt-4 mb-4 hover:bg-slate-400"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Mostrar el mensaje de carga, error o detalles del empleado... */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {employee && (
                <div className="mt-10 w-full">
                    <EmployeesDetailsCard employee={employee} />
                </div>
            )}
        </div>
    );
}
