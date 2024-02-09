// PersonForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const PersonForm: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        genero: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Mapear el valor del genero
            const generoValue = formData.genero === 'Masculino' ? 'M' :
                formData.genero === 'Femenino' ? 'F' : 'D';

            // Actualizar el estado formData con el valor del genero mapeado
            const updatedFormData = { ...formData, genero: generoValue };

            const response = await axios.post('http://localhost:8000/api/score/', updatedFormData);
            setStatus(response.data.status);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h2 className="card-title text-center">Cargar Datos de Persona</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input type="text" className="form-control" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">Género</label>
                            <select className="form-select" id="genero" name="genero" value={formData.genero} onChange={handleChange} required>
                                <option value="">Seleccionar Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                    {status && (
                        <div className={`alert ${status === 'Aprobado' ? 'alert-success' : 'alert-danger'} mt-3`}>
                            {`El cliente está ${status}`}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonForm;