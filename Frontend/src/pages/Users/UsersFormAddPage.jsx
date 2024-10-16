import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { createNewUserRequest } from '../../../api/users';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';

export function UsersFormAddPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const payload = {
                ...data,
                estado: data.estado || undefined,
                logged: data.logged || undefined,
            };

            const response = await createNewUserRequest(payload);

            if (response.status === 201) {
                swal2
                    .fire({
                        title: 'Registro exitoso...!',
                        text: `El usuario ${data.usuario} ha sido registrado exitosamente...!!!`,
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
                            navigate('/users');
                        }
                    });
            }
        } catch (error) {
            console.error(error.message);
            swal2.fire({
                title: 'Error inesperado...!',
                text: `Ha ocurrido un error inesperado: ${error.message}. Si el error persiste, contacte con el Deassarrollador del software...!!!`,
                icon: 'error',
            });
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
                            Nuevo Usuario
                        </h2>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        <div>
                            <Label htmlFor="cedula">Cédula</Label>
                            <Input
                                type="number"
                                placeholder="Su nro. de Cédula..."
                                {...register('usuario_cedula', {
                                    required: 'Este campo es obligatorio...',
                                    pattern: {
                                        value: /^\d+$/,
                                        message:
                                            'Solo se permiten números enteros...',
                                    },
                                })}
                            />
                            {errors.usuario_cedula && (
                                <p className="text-red-700">
                                    {errors.usuario_cedula.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="usuario">Usuario</Label>
                            <Input
                                type="text"
                                placeholder="Escriba su usuario..."
                                {...register('usuario', {
                                    required: 'Este es campo es obligatorio...',
                                })}
                            />
                            {errors.usuario && (
                                <p className="text-red-700">
                                    {errors.usuario.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Escriba su password..."
                                {...register('password', {
                                    required: 'Este es campo es obligatorio...',
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-700">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="roles">Roles</Label>
                            <select
                                {...register('roles', {
                                    required: 'Este campo es obligatorio...!',
                                })}
                                className="w-full bg-gray-200 text-blue-700 px-4 py-2 rounded-md my-3 mt-1 mb-3"
                            >
                                <option value="">
                                    Seleccione una opción...
                                </option>
                                <option value="Admin">Administrador</option>
                                <option value="Empleado">Empleado</option>
                                <option value="Empresa">Empresa</option>
                            </select>
                            {errors.roles && (
                                <p className="text-red-700">
                                    {errors.roles.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                            >
                                Aceptar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
