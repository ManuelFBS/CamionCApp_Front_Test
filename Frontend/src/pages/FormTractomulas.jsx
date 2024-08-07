import { useState } from "react";
import { useNavigate } from "react-router-dom";


const FormTractomulas = () => {
    const [formData, setFormData] = useState({
      placa: '',
      conductor: '',
      planilla: '',
      inicio: '',
      final: '',
      anticipo: '',
      empresa: '',
      manifiesto: '',
      origen: '',
      destino: '',
      valorFlete: '',
      anticipoFlete: '',
      gastos: [] // Manejo de gastos en formato de lista
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem('tractomulasData', JSON.stringify(formData));
      navigate('/tractomulas'); // Redirige al componente Tractomulas
    };
  
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Formulario de Tractomulas</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="placa" className="block text-gray-700">Placa de Vehículo:</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Agrega otros campos aquí */}
          <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-lg mt-4">
            Enviar
          </button>
        </form>
      </div>
    );
  };

export default FormTractomulas