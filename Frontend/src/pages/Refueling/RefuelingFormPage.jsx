/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { createNewRefuelingForm } from '../../../api/refueling';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';

export function RefuelingFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const { dni, vehicleRegistrationPlate } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const _data = {
                ...data,
                cedula: dni,
                placas: vehicleRegistrationPlate,
            };

            const response = await createNewRefuelingForm(_data);

            if (response.status === 201) {
                swal2.fire({
                    title: 'Registro exitoso...!',
                    text: `La nueva planilla de tanqueo Nº ${data.n_recibo} ha sido registrada exitosamente...!!!\n\nDesea agregar un nuevo empleado?`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            }

            reset();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            swal2.fire({
                title: 'Error inesperado...!',
                text: `Ha ocurrido un error inesperado: ${error.message}. Si el error persiste, contacte con el Desarrollador del software...!!!`,
                icon: 'error',
            });
            setIsLoading(false);
        }
    };

    const onCancel = () => {
        reset();
        navigate('/general_access');
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
                        <h2 className="text-2xl font-bold italic ml-32 mb-2 text-gray-100">
                            Nueva Planilla
                        </h2>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        {/* Cédula --- Fecha */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="cedula">
                                    Cédula del Conductor
                                </Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1">
                                    {dni || 'Cargando...'}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="fecha_tanqueo">Fecha</Label>
                                <Input
                                    type="date"
                                    {...register('fecha_tanqueo', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha_tanqueo && (
                                    <p className="text-red-700">
                                        {errors.fecha_tanqueo.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Nro Recibo --- Estación */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="n_recibo">Nº Recibo</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nro del recibo..."
                                    {...register('n_recibo', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.n_recibo && (
                                    <p className="text-red-700">
                                        {errors.n_recibo.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="estacion">Estación</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba nombre Estación..."
                                    {...register('estacion', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.estacion && (
                                    <p className="text-red-700">
                                        {errors.estacion.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Cantidad galones --- Valor Tanqueo */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="cantidad_galones">
                                    Cantidad galones
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba la cantidad..."
                                    {...register('cantidad_galones', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.cantidad_galones && (
                                    <p className="text-red-700">
                                        {errors.cantidad_galones.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="valor_tanqueo">
                                    Costo Tanqueo
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba costo..."
                                    {...register('valor_tanqueo', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.valor_tanqueo && (
                                    <p className="text-red-700">
                                        {errors.valor_tanqueo.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Placas */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="placas">Placas</Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1.5 mb-3">
                                    {vehicleRegistrationPlate || 'Cargando...'}
                                </p>
                            </div>
                        </div>

                        {/* Botones... */}
                        <div className="flex justify-between">
                            <div>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    className="bg-red-600 w-32 mb-2 hover:bg-red-400"
                                >
                                    Cancelar
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="bg-slate-500 w-32 mb-2 hover:bg-slate-400"
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
