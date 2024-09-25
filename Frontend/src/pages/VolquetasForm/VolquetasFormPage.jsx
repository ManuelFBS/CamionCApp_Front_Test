/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { createNewVolquetaForm } from '../../../api/volquetas';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

export function VolquetasFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
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
                placa_vehiculo: vehicleRegistrationPlate,
            };

            _data.hora_inicio = new Date(_data.hora_inicio);
            _data.hora_final = new Date(_data.hora_final);

            if (_data.observacion === undefined) {
                _data.observacion = 'S/O';
            }

            const response = await createNewVolquetaForm(_data);

            if (response.status === 201) {
                swal2.fire({
                    title: 'Registro exitoso...!',
                    text: `La planilla Nº ${_data.n_planilla} ha sido registrada exitosamente...!!!`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                reset();

                setIsLoading(false);
            }
        } catch (error) {
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
            <div className="flex h-[calc(100vh-100px)] items-center justify-center -mt-4">
                <div className="bg-zinc-100 border-4 border-red-600 max-w-3xl w-full p-0 rounded-md">
                    <div className="bg-red-600 flex justify-items-center">
                        <h2 className="text-2xl font-bold italic ml-72 mb-2 text-gray-100">
                            Nueva Planilla
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        {/* Nro de planilla --- Cédula --- Fecha */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="n_planilla">Nº Planilla</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nro de la planilla..."
                                    {...register('n_planilla', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.n_planilla && (
                                    <p className="text-red-700">
                                        {errors.n_planilla.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="fecha">Fecha</Label>
                                <Input
                                    type="date"
                                    {...register('fecha', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha && (
                                    <p className="text-red-700">
                                        {errors.fecha.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="cedula">Cédula Conductor</Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1">
                                    {dni || 'Cargando...'}
                                </p>
                            </div>
                        </div>

                        {/* Placa ---  Cliente --- Volumen de carga */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="placa_vehiculo">Placa</Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1.5 mb-3">
                                    {vehicleRegistrationPlate || 'Cargando...'}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="cliente">Cliente</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba nombre del cliente..."
                                    {...register('cliente', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.cliente && (
                                    <p className="text-red-700">
                                        {errors.cliente.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="volmts3">
                                    Volumen de Carga
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el volumen de carga..."
                                    {...register('volmts3', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.volmts3 && (
                                    <p className="text-red-700">
                                        {errors.volmts3.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/*  Material --- Lugar de carga --- Lugar de descarga */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="material">Material</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el tipo de material..."
                                    {...register('material', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.material && (
                                    <p className="text-red-700">
                                        {errors.material.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="lugar_de_cargue">
                                    Lugar de Carga
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba lugar de carga..."
                                    {...register('lugar_de_cargue', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.lugar_de_cargue && (
                                    <p className="text-red-700">
                                        {errors.lugar_de_cargue.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="lugar_de_descargue">
                                    Lugar de Descarga
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba lugar descarga..."
                                    {...register('lugar_de_descargue', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.lugar_de_descargue && (
                                    <p className="text-red-700">
                                        {errors.lugar_de_descargue.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Nro de viajes --- Hora inicio --- Hora final */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="n_viajes">
                                    Cantidad de viajes
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba la cantidad de viajes..."
                                    {...register('n_viajes', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.n_viajes && (
                                    <p className="text-red-700">
                                        {errors.n_viajes.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="hora_inicio">Hora Inicio</Label>
                                <Input
                                    type="datetime-local"
                                    placeholder="Coloque hora de inicio..."
                                    {...register('hora_inicio', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.hora_inicio && (
                                    <p className="text-red-700">
                                        {errors.hora_inicio.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="hora_final">Hora Final</Label>
                                <Input
                                    type="datetime-local"
                                    placeholder="Coloque hora de fin..."
                                    {...register('hora_final', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.hora_final && (
                                    <p className="text-red-700">
                                        {errors.hora_final.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Kilometraje Inicio --- Kilometraje Final --- Observaciones*/}
                        <div className="grid grid-cols-4 gap-3">
                            <div className="col-span-1">
                                <Label htmlFor="km_inicial">Klm Inicial</Label>
                                <Input
                                    type="number"
                                    placeholder="Coloque klm de inicial..."
                                    {...register('km_inicial', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.km_inicial && (
                                    <p className="text-red-700">
                                        {errors.km_inicial.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="km_final">Klm Final</Label>
                                <Input
                                    type="number"
                                    placeholder="Coloque klm de final..."
                                    {...register('km_final', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.km_final && (
                                    <p className="text-red-700">
                                        {errors.km_final.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="observacion">Observación</Label>
                                <textarea
                                    rows="2"
                                    className="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Escriba sus observaciones..."
                                    {...register('observacion', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.observacion && (
                                    <p className="text-red-700">
                                        {errors.observacion.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-3">
                            <div>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    className="bg-red-600 w-48 mb-2 hover:bg-red-400"
                                >
                                    Cancelar
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="bg-slate-500 w-48 mb-2 hover:bg-slate-400"
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
