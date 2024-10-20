/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { disableUser, unlockUser } from '../../../api/users';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal2 from 'sweetalert2';

export function UsersFormUnlockPage() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await unlockUser(data);

            if (response.status === 200) {
                swal2.fire({
                    title: 'Desbloqueo...!',
                    text: `El usuario ${data.usuario} ha sido desbloqueado exitosamente...!!!`,
                    icon: 'success',
                });
                navigate('/users');
            }
        } catch (error) {
            setError('Usuario inválido o inexistente...!');
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center mt-0 bg-otherpages min-h-screen">
            <div className="bg-zinc-100 border-4 border-red-600 max-w-md w-full -mt-72 p-0 rounded-md">
                <div className="bg-red-600 flex items-stretch">
                    <h2 className="text-2xl font-bold italic ml-24 mb-2 text-gray-100">
                        Desbloqueo de Usuario
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="pt-5 pl-6 pr-6 pb-4"
                >
                    <div>
                        <Label htmlFor="inputValue">Usuario</Label>
                        <Input
                            type="text"
                            placeholder="Escriba su 'usuario'..."
                            {...register('usuario')}
                        />
                        {error && <p className="text-red-600">{error}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                        >
                            Desbloquear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function UsersFormDisablePage() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Confirmación del bloqueo por medio de un sweetalert...
            const result = await swal2.fire({
                title: '¿Está seguro...?',
                text: 'Esta acción bloqueará a el usuario e impedirá que el empleado asociado pueda iniciar sesión. ¡No se puede revertir...!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, bloquear...',
                cancelButtonText: 'No, cancelar...',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                try {
                    await disableUser(data);

                    swal2.fire({
                        title: 'Bloqueado...!',
                        text: `El usuario ${data.usuario} ha sido inhabilitado satisfactoriamente...!!!`,
                        icon: 'success',
                    });

                    setError(null);

                    navigate('/users');
                } catch (error) {
                    console.error(error.message);
                    // Mostrar mensaje de error
                    swal2.fire({
                        title: 'Error',
                        text: 'Hubo un problema al bloquear el usuario.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } else {
                setError(null);

                navigate('/users');
            }

            // const response = await disableUser(data);

            // if (response.status === 200) {
            //     swal2.fire({
            //         title: 'Bloqueado...!',
            //         text: `El usuario ${data.usuario} ha sido inhabilitado satisfactoriamente...!!!`,
            //         icon: 'success',
            //     });
            //     navigate('/users');
            // }
        } catch (error) {
            setError('Usuario inválido o inexistente...!');
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center mt-0 bg-otherpages min-h-screen">
            <div className="bg-zinc-100 border-4 border-slate-700 max-w-md w-full -mt-72 p-0 rounded-md">
                <div className="bg-slate-700 flex items-stretch">
                    <h2 className="text-2xl font-bold italic ml-24 mb-2 text-gray-100">
                        Inhabilitación de Usuario
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="pt-5 pl-6 pr-6 pb-4"
                >
                    <div>
                        <Label htmlFor="inputValue">Usuario</Label>
                        <Input
                            type="text"
                            placeholder="Escriba su 'usuario'..."
                            {...register('usuario')}
                        />
                        {error && <p className="text-red-600">{error}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                        >
                            Inhabilitar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}