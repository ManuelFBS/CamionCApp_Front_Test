/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { createNewVolquetaForm } from '../../../api/volquetas';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';

export function VolquetasFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {};
    /*
    "n_planilla": "A10CT08", ---------
  "fecha": "2024-09-05", -----------
  "placa_vehiculo": "T10025", ----------
  "cedula": 2000215520, -----------
  "cliente": "Constructora 2100", -----------
  "volmts3": "10m3", -----------
  "n_viajes": 1, ------------
  "material": "Gravilla", ------------
  "hora_inicio": "2024-09-05T07:30:00",
  "hora_final": "2024-09-05T11:50:00",
  "km_inicial": 2750,
  "km_final": 2820,
  "lugar_de_cargue": "Sitio 01",
  "lugar_de_descargue": "Sitio 02",
  "observacion": "Operación normal"
    */
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
                            Nueva Planilla
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        <div className="grid grid-cols-2 gap-3">
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
                                <Label htmlFor="fecha">
                                    Fecha de nacimiento
                                </Label>
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
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="placa_vehiculo">Placa</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba la placa..."
                                    {...register('placa_vehiculo', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.placa_vehiculo && (
                                    <p className="text-red-700">
                                        {errors.placa_vehiculo.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="cedula">
                                    Cédula del Conductor
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba el nro de cédula..."
                                    {...register('cedula', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.cedula && (
                                    <p className="text-red-700">
                                        {errors.cedula.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="cliente">Cliente</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nombredel cliente..."
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
                                <Label htmlFor="volmts3">Volumen Carga</Label>
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

                        <div className="grid grid-cols-2 gap-3">
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
