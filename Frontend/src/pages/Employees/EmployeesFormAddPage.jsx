/* eslint-disable no-undef */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { addEmployeeRequest } from '../../../api/employees';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';
import '../../styles/global.css';

export function EmployeesFormAddPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Para 'resetear' el formulario...
    } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Mostrar spinner de carga...

            const payload = {
                ...data,
                fecha_final_contrato: data.fecha_final_contrato || undefined,
            };

            const response = await addEmployeeRequest(payload);

            if (response.status === 201) {
                setIsLoading(false);

                swal2
                    .fire({
                        title: 'Registro exitoso...!',
                        text: `El nuevo empleado ${data.nombres} ${data.apellidos} ha sido registrado exitosamente...!!!\n\nDesea agregar un nuevo empleado?`,
                        icon: 'success',
                        showCancelButton: true, // Muestra el botón 'Cancelar'...
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'No',
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            // Si el usuario elige "Sí", limpia el formulario...
                            reset();
                        } else {
                            // Si el usuario elige "No", limpia el formulario y redirige a...
                            reset();
                            navigate('/employees');
                        }
                    });
            }
        } catch (error) {
            swal2.fire({
                title: 'Error inesperado...!',
                text: `Ha ocurrido un error inesperado: ${error.message}. Si el error persiste, contacte con el Deassarrollador del software...!!!`,
                icon: 'error',
            });
            setIsLoading(false);
        }
    };

    const onCancel = () => {
        reset();
        navigate('/employees');
    };

    return (
        <div className="bg-otherpages min-h-screen">
            {isLoading && (
                <div>
                    <Loading />
                </div>
            )}{' '}
            {/* Se renderiza si es true... */}
            <div className="customDiv-1">
                <div className="customDiv-2">
                    <div className="customDivH2">
                        <h2 className="customH2 ml-28">Nuevo Empleado</h2>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="customFormDiv"
                    >
                        <div className="customFormGrid">
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

                        <div className="customFormGrid">
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

                        <div className="customFormGrid">
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

                        <div className="customFormGrid">
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

                        {/* Botones... */}
                        <div className="flex justify-between">
                            <div>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    className="bg-red-600 w-36 mb-2 hover:bg-red-400"
                                >
                                    Cancelar
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="bg-slate-500 w-36 mb-2 hover:bg-slate-400"
                                >
                                    Aceptar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
