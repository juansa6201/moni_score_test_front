// PersonList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Person {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    genero: string;
    status: string;
}

const PersonList: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<{ results: { persona: Person; status: string }[] }>('http://localhost:8000/api/score/');
            const personsData: Person[] = response.data.results.map((result, index) => ({
                id: result.id,
                ...result.persona,
                status: result.status,
            }));
            setPersons(personsData);
        } catch (error) {
            console.error('Error al obtener la lista de personas:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/score/${id}/`);
            setPersons(persons.filter(person => person.id !== id));
        } catch (error) {
            console.error('Error al eliminar la persona:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="card-title text-center">Lista de Scores</h2>
            <ul className="list-group mt-3">
                {persons.map(person => (
                    <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Nombre:</strong> {person.nombre} <br />
                            <strong>Apellido:</strong> {person.apellido} <br />
                            <strong>DNI:</strong> {person.dni} <br />
                            <strong>Género:</strong> {person.genero} <br />
                            <strong>Email:</strong> {person.email} <br />
                            <strong>Status:</strong> {person.status}
                        </div>
                        <div>
                            <button className="btn btn-danger me-2" onClick={() => handleDelete(person.id)}>Eliminar</button>
                            <button className="btn btn-primary">Editar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonList;