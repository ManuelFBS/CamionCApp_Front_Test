/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageRefuelingByDNIAndInvoiceRequest } from '../../../api/invoices';
import { Loading } from '../../components/Loading/Loading';

export function InvoiceSearchFormPage() {
    const [cedula, setCedula] = useState('');
    const [invoice, setInvoice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const response = await getImageRefuelingByDNIAndInvoiceRequest(
                cedula,
                invoice,
            );

            console.log(response.data);

            // Se convierte el blob en un URL para mostrar la imagen...
            const imageBlob = new Blob([response.data], {
                type: response.headers['Content-Type'],
            });
            const imageUrl = URL.createObjectURL(imageBlob);

            // Se navega a la vista de la imagen, pasando la URL de la imagen...
            navigate('/imgrefueling-view', { state: { imageUrl } });
        } catch (error) {
            setLoading(false);
            setError(
                'No se pudo obtener la imagen, verifique la cédula y el recibo.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-otherpages min-h-screen">
            {loading && (
                <div>
                    <Loading />
                </div>
            )}{' '}
            <div className="customDiv-1a">
                <div className="customDiv-2">
                    <div className="customDivH2">
                        <h2 className="customH2 ml-16">Buscar Recibo...</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="customFormDiv">
                        <div>
                            <div>
                                <Label htmlFor="cedula">Cédula</Label>
                                <Input
                                    id="cedula"
                                    type="number"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    placeholder="Ingrese el nro de cédula..."
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="invoice">Nº Recibo</Label>
                                <Input
                                    id="invoice"
                                    type="text"
                                    value={invoice}
                                    onChange={(e) => setInvoice(e.target.value)}
                                    placeholder="Ingrese el nro de recibo..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                            >
                                Buscar Recibo
                            </Button>
                        </div>
                    </form>

                    {/* Mostrar error si ocurre */}
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
