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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/score/', formData);
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
                            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Dni</label>
                            <input type="text" className="form-control" id="dni" name="dni" value={formData.dni} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Genero</label>
                            <input type="text" className="form-control" id="genero" name="genero" value={formData.genero} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                    {status && <div className={`alert ${status === 'habilitada' ? 'alert-success' : 'alert-danger'} mt-3`}>{`La persona está ${status}`}</div>}
                </div>
            </div>
        </div>
    );
};

export default PersonForm;