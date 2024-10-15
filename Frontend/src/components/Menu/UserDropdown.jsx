/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Agregar el listener cuando el componente se monta...
        document.addEventListener('click', handleClickOutside);

        // Limpiar el listener cuando el componente se desmonta...
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="ml-4" ref={menuRef}>
            <button onClick={toggleMenu} className="pt-1 hover:text-yellow-200">
                Usuario
            </button>
            {isOpen && (
                <div className="absolute right-50 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={'/users'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Todos los ...
                            </Link>

                            <hr className="bg-slate-300 h-0.5" />

                            <Link
                                to={'/users/add'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Nuevo Usuario...
                            </Link>

                            <Link
                                to={'/users/user/byuser'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Buscar Usuario...
                            </Link>
                            {/* <Link
                                // to={'/employees/search'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Actualizar...
                            </Link> */}

                            <hr className="bg-slate-300 h-0.5" />

                            <Link
                                to={'/users/admin/disable-user'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Bloquear Usuario...
                            </Link>

                            <Link
                                to={'/users/admin/unlock-user'}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Desbloquear Usuario...
                            </Link>
                        </>
                    ) : (
                        <p className="block px-4 py-2 text-sm text-gray-700">
                            Debe estar loggeado para acceder...!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
