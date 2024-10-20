import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import {
    getEmployeeByDniRequest,
    updateEmployeeByDniRequest,
} from '../../../api/employees';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';

export function UpdateEmployeeByDni() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const response = await updateEmployeeByDniRequest(data);

            if (response.status === 200) {
                swal2
                    .fire({
                        title: 'Actualización exitosa',
                        text: `El empleado con cédula ${response.data.cedula} ha sido actualizado`,
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'No',
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            reset();
                        } else {
                            reset();
                            navigate('/employees');
                        }
                    });
            }
        } catch (error) {
            setIsLoading(false);
            swal2.fire({
                title: 'Error...',
                text:
                    error.response?.data?.message ||
                    'No se pudo actualizar al empleado. Deberá repetir la operación...!',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : '';
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                setIsLoading(true);

                const response = await getEmployeeByDniRequest(
                    event.target.value,
                );
                const employeeData = response.data;

                // Convertir fechas al formato requerido por los campos de tipo date...
                employeeData.fecha_nacimiento = formatDate(
                    employeeData.fecha_nacimiento,
                );
                employeeData.fecha_inicio_contrato = formatDate(
                    employeeData.fecha_inicio_contrato,
                );
                employeeData.fecha_final_contrato = formatDate(
                    employeeData.fecha_final_contrato,
                );

                // Rellena los campos del formulario con los datos obtenidos del empleado...
                for (const key in employeeData) {
                    if (employeeData.hasOwnProperty(key)) {
                        setValue(key, employeeData[key]);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                swal2.fire({
                    title: 'Error...',
                    text:
                        error.response?.data?.message ||
                        'Empleado no encontrado...!',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        }
    };

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
                        <h2 className="text-2xl font-bold italic ml-24 mb-2 text-gray-100">
                            Actualizar Empleado
                        </h2>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="cedula">Cédula</Label>
                                <Input
                                    type="number"
                                    placeholder="Su Nro. de Cédula..."
                                    {...register('cedula', {
                                        required:
                                            'Este campo es obligatorio...',
                                        pattern: {
                                            value: /^\d+$/,
                                            message:
                                                'Solo se permiten números enteros',
                                        },
                                    })}
                                    onKeyDown={handleKeyDown}
                                />
                                {errors.cedula && (
                                    <p className="text-red-700">
                                        {errors.cedula.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="fecha_nacimiento">
                                    Fecha de nacimiento
                                </Label>
                                <Input
                                    type="date"
                                    {...register('fecha_nacimiento', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha_nacimiento && (
                                    <p className="text-red-700">
                                        {errors.fecha_nacimiento.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="nombres">Nombres</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba su(s) nombre(s)..."
                                    {...register('nombres', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.nombres && (
                                    <p className="text-red-700">
                                        {errors.nombres.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="apellidos">Apellidos</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba su(s) apellido(s)..."
                                    {...register('apellidos', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.apellidos && (
                                    <p className="text-red-700">
                                        {errors.apellidos.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Label htmlFor="correo">E-mail</Label>
                        <Input
                            type="email"
                            placeholder="Escriba su E-mail..."
                            {...register('correo', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message:
                                        'Debe ingresar un correo electrónico válido',
                                },
                            })}
                        />
                        {errors.correo && (
                            <p className="text-red-700">
                                {errors.correo.message}
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input
                                    type="text"
                                    placeholder="Su nro de teléfono..."
                                    {...register('telefono', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.telefono && (
                                    <p className="text-red-700">
                                        {errors.telefono.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="tipo_de_contrato">
                                    Tipo de contrato
                                </Label>
                                <select
                                    {...register('tipo_de_contrato', {
                                        required:
                                            'Este campo es obligatorio...!',
                                    })}
                                    className="w-full bg-gray-200 text-blue-700 px-4 py-2 rounded-md my-3 mt-1 mb-3"
                                >
                                    <option value="">
                                        Seleccione una opción...
                                    </option>
                                    <option value="Fijo">Fijo</option>
                                    <option value="Indefinido">
                                        Indefinido
                                    </option>
                                </select>
                                {errors.tipo_de_contrato && (
                                    <p className="text-red-700">
                                        {errors.tipo_de_contrato.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="fecha_inicio_contrato">
                                    Fecha inicio de contrato
                                </Label>
                                <Input
                                    type="date"
                                    {...register('fecha_inicio_contrato', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha_inicio_contrato && (
                                    <p className="text-red-700">
                                        {errors.fecha_inicio_contrato.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="fecha_final_contrato">
                                    Fecha final de contrato
                                </Label>
                                <Input
                                    type="date"
                                    {...register('fecha_final_contrato')}
                                />
                                {errors.fecha_final_contrato && (
                                    <p className="text-red-700">
                                        {errors.fecha_final_contrato.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                            >
                                Actualizar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
