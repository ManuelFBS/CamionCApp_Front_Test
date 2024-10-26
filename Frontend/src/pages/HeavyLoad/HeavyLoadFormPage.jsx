/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import {
    createNewHeavyLoadFormRequest,
    genHLContRandNumberRequest,
} from '../../../api/heavyLoad';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

export function HeavyLoadForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { dni, vehicleRegistrationPlate } = useAuth();
    const [dniRefresh, setDNIRefresh] = useState('');
    const [registrationPlateRefresh, setRegistrationPlateRefresh] =
        useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formNumber, setFormNumber] = useState('Cargando...');
    const navigate = useNavigate();

    const fetchFormNumber = async () => {
        try {
            const { data } = await genHLContRandNumberRequest();
            const { numbOfForm } = data;

            setFormNumber(numbOfForm);
        } catch (error) {
            console.error('Error al generar el número de planilla:', error);
            setFormNumber('Error al generar número');
        }
    };

    useEffect(() => {
        fetchFormNumber();
        setDNIRefresh(dni);
        setRegistrationPlateRefresh(vehicleRegistrationPlate);
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const _data = {
                ...data,
                n_planilla: formNumber,
                cedula: dni,
                placa_vehiculo: vehicleRegistrationPlate,
            };

            if (_data.observacion === undefined) {
                _data.observacion = 'S/O';
            }

            const response = await createNewHeavyLoadFormRequest(_data);

            if (response.status === 201) {
                swal2.fire({
                    title: 'Registro exitoso...!',
                    text: `La planilla Nº ${_data.n_planilla} ha sido registrada exitosamente...!!!`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                reset();

                setFormNumber('Cargando...');

                // Regenerar un nuevo número de planilla después de registrar...
                fetchFormNumber();
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
                <div className="bg-zinc-100 border-2 border-gray-600 max-w-3xl w-full p-0 rounded-md">
                    <div className="bg-gray-300 border-2 border-transparent border-b-gray-500 flex justify-items-center">
                        <h2 className="text-2xl font-bold italic pt-1 ml-56 mb-2 text-gray-600">
                            <span className="text-slate-500">
                                Nueva Planilla:
                            </span>{' '}
                            <span className="text-slate-900">Carga Pesada</span>
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-5 pl-6 pr-6 pb-4"
                    >
                        {/* Nro Planilla --- Conductor --- Placas */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="n_planilla">Nº Planilla</Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1 text-blue-700 text-right">
                                    {formNumber}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="conductor_cedula">
                                    Conductor
                                </Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1 text-blue-700 text-right">
                                    {dni || dniRefresh}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="placa_vehiculo">Placa</Label>
                                <p className="border border-gray-300 bg-gray-200 rounded-md p-1.5 mt-1 mb-3 text-blue-700 text-right">
                                    {vehicleRegistrationPlate ||
                                        registrationPlateRefresh}
                                </p>
                            </div>
                        </div>

                        {/* Empresa --- Ciudad Inicio --- Ciudad Destino */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="empresa">Empresa</Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba nombre Empresa ..."
                                    {...register('empresa', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.empresa && (
                                    <p className="text-red-700">
                                        {errors.empresa.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="ciudad_inicio">
                                    Ciudad Origen
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nombre origen..."
                                    {...register('ciudad_inicio', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.ciudad_inicio && (
                                    <p className="text-red-700">
                                        {errors.ciudad_inicio.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="ciudad_destino">
                                    Ciudad Destino
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nombre destino..."
                                    {...register('ciudad_destino', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.ciudad_destino && (
                                    <p className="text-red-700">
                                        {errors.ciudad_destino.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Fecha Inicio --- Fecha Final  --- Valor Flete */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="fecha_inicio">
                                    Fecha Inicio
                                </Label>
                                <Input
                                    type="date"
                                    {...register('fecha_inicio', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha_inicio && (
                                    <p className="text-red-700">
                                        {errors.fecha_inicio.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="fecha_final">Fecha Final</Label>
                                <Input
                                    type="date"
                                    {...register('fecha_final', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.fecha_final && (
                                    <p className="text-red-700">
                                        {errors.fecha_final.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="valor_flete">Flete</Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor flete..."
                                    {...register('valor_flete', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.valor_flete && (
                                    <p className="text-red-700">
                                        {errors.valor_flete.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Anticipo Empresa --- Anticipo Cliente --- ACPM */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="anticipo_empresa">
                                    Anticipo Empresa
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor anticipo..."
                                    {...register('anticipo_empresa', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.anticipo_empresa && (
                                    <p className="text-red-700">
                                        {errors.anticipo_empresa.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="anticipo_cliente">
                                    Anticipo Cliente
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor anticipo..."
                                    {...register('anticipo_cliente', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.anticipo_cliente && (
                                    <p className="text-red-700">
                                        {errors.anticipo_cliente.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="acpm">A.C.P.M.</Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor acpm..."
                                    {...register('acpm', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.acpm && (
                                    <p className="text-red-700">
                                        {errors.acpm.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Peaje --- Mantenimiento --- Mecanico */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="peaje">Peaje</Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor peaje..."
                                    {...register('peaje', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.peaje && (
                                    <p className="text-red-700">
                                        {errors.peaje.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="mantenimiento">
                                    Matenimiento
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor mantenimiento..."
                                    {...register('mantenimiento', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.mantenimiento && (
                                    <p className="text-red-700">
                                        {errors.mantenimiento.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="mecanico">Mecánico</Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor mecánico..."
                                    {...register('mecanico', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.mecanico && (
                                    <p className="text-red-700">
                                        {errors.mecanico.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Otros */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Label htmlFor="otros">Otros</Label>
                                <Input
                                    type="number"
                                    placeholder="Escriba valor otros gastos..."
                                    {...register('otros', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.otros && (
                                    <p className="text-red-700">
                                        {errors.otros.message}
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
