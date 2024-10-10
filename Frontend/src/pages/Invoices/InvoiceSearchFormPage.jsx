/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useState } from 'react';
import { getEmployeeByDniRequest } from '../../../api/employees';
import { getImageRefuelingByIDRequest } from '../../../api/invoices';
import { Loading } from '../../components/Loading/Loading';

export function InvoiceSearchFormPage() {
    const [cedula, setCedula] = useState('');
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setCedula(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setEmployee(null);

        try {
            const response = await getEmployeeByDniRequest(cedula);

            setEmployee(response.data);
            setLoading(false);

            console.log(response.data.tanqueos);
        } catch (error) {
            setLoading(false);
            setError('Empleado no encontrado...!!!');
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

                    <form className="customFormDiv">
                        <div>
                            <div>
                                <Label htmlFor="cedula">Cédula</Label>
                                <Input
                                    type="number"
                                    value={cedula}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el nro de cédula..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={handleSearch}
                                className="bg-slate-500 w-1/3 mt-3 mb-4 hover:bg-slate-400"
                            >
                                Aceptar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
