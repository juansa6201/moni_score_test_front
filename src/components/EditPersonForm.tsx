// EditPersonForm.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Person {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    genero: string;
}

const EditPersonForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const person: Person = location.state;

    const [formData, setFormData] = useState<Person>({
        id: person.id,
        nombre: person.nombre,
        apellido: person.apellido,
        dni: person.dni,
        email: person.email,
        genero: person.genero
    });

    console.log(formData)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Mapear el valor del genero
            const generoValue = formData.genero === 'Masculino' ? 'M' :
                formData.genero === 'Femenino' ? 'F' : 'D';

            // Actualizar el estado formData con el valor del genero mapeado
            const updatedFormData = { ...formData, genero: generoValue };

            const response = await axios.put(`http://localhost:8000/api/score/${person.id}/`, updatedFormData);
            navigate('/list');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                            <label htmlFor="genero" className="form-label">Género</label>
                            <select className="form-select" id="genero" name="genero" value={formData.genero} onChange={handleChange}>
                                <option value="">Seleccionar Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPersonForm;