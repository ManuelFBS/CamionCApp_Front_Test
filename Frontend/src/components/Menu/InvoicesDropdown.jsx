/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/global.css';

export const InvoicesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const { isAuthenticated, setInvoiceType } = useAuth();
    const menuRef = useRef(null);
    const subMenuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsSubMenuOpen(false); // Cerrar el submenú si se hace clic fuera del menú...
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
                Recibos
            </button>

            {isOpen && (
                <div className="absolute right-12 mt-2 w-56 bg-red-600 rounded-md shadow-lg z-10">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={'/imgheavyload'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Mostrar todos "Carga Pesada"
                            </Link>

                            <Link
                                to={'/imgvolq'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Mostrar todos "Volquetas"
                            </Link>

                            <Link
                                to={'/imgrefueling'}
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Mostrar todos "Tanqueos"
                            </Link>

                            <hr className="bg-red-400 border-red-400 h-0.5 mt-2 mb-1" />

                            <div
                                className="relative"
                                onMouseEnter={toggleSubMenu}
                                onMouseLeave={toggleSubMenu}
                            >
                                <button
                                    onClick={toggleSubMenu}
                                    className="customSubMenu"
                                >
                                    Buscar Recibo...
                                </button>

                                {isSubMenuOpen && (
                                    <div
                                        ref={subMenuRef}
                                        className="absolute right-full top-0 mt-0 mr-0 w-48 bg-red-500 rounded-md shadow-lg z-10"
                                    >
                                        <Link
                                            to={'/search/invoice-type'}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsSubMenuOpen(false);
                                                setInvoiceType('heavyload');
                                            }}
                                            className="customSubMenu block px-4 py-2 text-white hover:bg-red-400"
                                        >
                                            Carga Pesada
                                        </Link>

                                        <Link
                                            to={'/search/invoice-type'}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsSubMenuOpen(false);
                                                setInvoiceType('volqueta');
                                            }}
                                            className="customSubMenu block px-4 py-2 text-white hover:bg-red-400"
                                        >
                                            Volquetas
                                        </Link>

                                        <Link
                                            to={'/search/invoice-type'}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsSubMenuOpen(false);
                                                setInvoiceType('refueling');
                                            }}
                                            className="customSubMenu block px-4 py-2 text-white hover:bg-red-400"
                                        >
                                            Tanqueos
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* <Link
                                onClick={() => setIsOpen(false)}
                                className="customSubMenu"
                            >
                                Buscar Recibo...
                            </Link> */}
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
