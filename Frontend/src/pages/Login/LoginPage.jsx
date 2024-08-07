import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/logosinfondo.png'

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

//   return (
//     <div className="flex h-[calc(100vh-100px)] items-center justify-center">
//       <div className="bg-zinc-800 max-w-md w-full p-8 rounded-md">
//         <h2 className="text-2xl font-bold italic mb-6 text-blue-300">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Label htmlFor="inputValue">Usuario</Label>
//           <Input
//             type="text"
//             placeholder="Escriba su 'usuario'..."
//             {...register('usuario')}
//           />

//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             placeholder="*******"
//             {...register('password')}
//           />
//           {errors && (
//             <p className="text-red-600">{errors}</p>
//           )}

//           <Button
//             type="submit"
//             className="w-full mt-3 mb-4"
//           >
//             Aceptar
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="imagen" className="h-30 w-auto" />
        </div>
        <h1 className="text-4xl text-center mb-6 text-gray-700">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
          <Label htmlFor="inputValue">Usuario</Label>
          <Input
            type="text"
            placeholder="Escriba su 'usuario'..."
            {...register('usuario')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"          
          />
          </div>

          <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="*******"
            {...register('password')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          </div>
          {errors && (
            <p className="text-red-600 text-center">{errors}</p>
          )}cd

          <Button
            type="submit"
            className="w-full py-2 bg-white text-red-800 border border-red-500 font-bold rounded-full hover:bg-red-600 hover:text-white transition-colors"
          >
            Aceptar
          </Button>
          <div className="text-center py-2 text-gray-400">
            ¿Aún no tienes una cuenta? <Link className="underline text-black hover:text-red-800 transition-color" to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
