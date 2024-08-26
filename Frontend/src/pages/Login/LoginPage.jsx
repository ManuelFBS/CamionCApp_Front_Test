import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/yadiraLogoColor2.png'

export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginRequest(data);

      if (response.status === 200) {
        navigate('/home');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-gray-600 p-8 rounded-lg  w-full max-w-md">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="imagen" className="h-30 w-auto" />
        </div>
        <h1 className="text-4xl text-center mb-6 text-white">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
          <Label htmlFor="inputValue">Usuario</Label>
          <Input
            type="text"
            placeholder="Escriba su 'usuario'..."
            {...register('usuario')}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"          
          />
          </div>

          <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="*******"
            {...register('password')}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          </div>
          {errors && (
            <p className="text-red-600 text-center">{errors}</p>
          )}

          <Button
            type="submit"
            className="w-full px-4 py-3 text-red-700 border rounded-full bg-white font-bold border-red-600 focus:ring-2 focus:ring-gray-900 hover:bg-red-600 hover:text-white transition-colors"
          >
            Aceptar
          </Button>
          <div className="text-center py-2 text-gray-400">
            ¿Aún no tienes una cuenta? <Link className="underline text-black hover:text-red-800 transition-colors" to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
