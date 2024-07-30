import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginRequest(data);

      if (response.status === 200) {
        navigate('/employees');
      }
    } catch (error) {
      setError('Usuario o contraseña incorrectos...!');
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-8 rounded-md">
        <h2 className="text-2xl font-bold italic mb-6 text-blue-300">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          {error && <p className="text-red-600">{error}</p>}

          <Button
            type="submit"
            className="w-full mt-3 mb-4"
          >
            Aceptar
          </Button>
        </form>
      </div>
    </div>
  );
}
