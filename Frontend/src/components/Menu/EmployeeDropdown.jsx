/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/global.css';

export const EmployeeDropdown = () => {
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
                Personal
            </button>
            {isOpen && (
                <div className="absolute right-68 mt-2 w-48 bg-red-600 rounded-md shadow-lg z-10">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={'/employees'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Mostrar todos...
                            </Link>

                            <hr className="bg-red-400 border-red-400 h-0.5 mt-2 mb-1" />

                            <Link
                                to={'employees/add'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Agregar nuevo...
                            </Link>

                            <Link
                                to={'/employees/bydni'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Buscar por cédula...
                            </Link>

                            <hr className="bg-red-400 border-red-400 h-0.5 mt-2 mb-1" />

                            <Link
                                to={'/employees/employee/edit'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Actualizar Empleado...
                            </Link>
                            <Link
                                to={'/employees/employee/del'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Eliminar Empleado...
                            </Link>
                        </>
                    ) : (
                        <p className="block px-4 py-2 text-sm text-gray-400">
                            Debe estar loggeado para acceder...!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
