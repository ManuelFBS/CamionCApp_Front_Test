import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginRequest(data);

      if (response.status === 200) {
        navigate('/employees');
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

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
          {errors && (
            <p className="text-red-600">{errors}</p>
          )}

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
