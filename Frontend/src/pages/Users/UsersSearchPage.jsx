/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useState } from 'react';
import { getUserRequest } from '../../../api/users';
import { Loading } from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import '../../styles/global.css';
import { UsersDetailsCard } from '../../components/Users/UserDetailsCard';

export function UsersSearchPage() {
    const [user, setUser] = useState('');
    const [employeeUser, setEmployeeUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setUser(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setEmployeeUser(null);

        try {
            const response = await getUserRequest(user);

            setEmployeeUser(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Usuario no encontrado...!!!');
        } finally {
            setLoading(false);
        }

        // const handleDeleteUser = async (e) => {};
    };
    return (
        <div className="bg-otherpages min-h-screen">
            {loading && (
                <div>
                    <Loading />
                </div>
            )}{' '}
            {/* Se renderiza si es true... */}
            <div className="customDiv-1a">
                <div className="customDiv-2">
                    <div className="customDivH2">
                        <h2 className="customH2 ml-8 text-xl">
                            Buscar / Eliminar Usuario
                        </h2>
                    </div>

                    <form className="customFormDiv" onSubmit={handleSearch}>
                        <div>
                            <div>
                                <Label htmlFor="user">Usuario</Label>
                                <Input
                                    type="text"
                                    value={user}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el usuario..."
                                />
                            </div>
                        </div>

                        <div className="customButtonContainer">
                            <div>
                                {/* Botón para eliminar usuario */}
                                {employeeUser && (
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            // onClick={handleDelete}
                                            className="bg-red-600 w-40 mb-4 hover:bg-red-400"
                                        >
                                            Eliminar Usuario
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div>
                                {/* Botón para buscar usuario */}
                                <Button
                                    type="submit"
                                    className="bg-slate-500 w-40 mt-4 mb-4 hover:bg-slate-400"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Mostrar el mensaje de carga, error o detalles del empleado... */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {employeeUser && (
                <div className="mt-10 w-full">
                    <UsersDetailsCard employeeUser={employeeUser} />
                </div>
            )}
        </div>
    );
}
