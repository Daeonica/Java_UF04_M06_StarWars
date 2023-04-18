import React, { useState, useEffect } from 'react';

export function ResidentList({ residents }) {
    const [residentNames, setResidentNames] = useState([]);
    const [residentInfo, setResidentInfo] = useState(null);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [showResidentInfo, setShowResidentInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getResidentNames = async () => { // definimos una funcion asincrona para recibir el nombre de los residentes
          const promises = residents.map((residentUrl) => { // creamos un array de promesas
            return fetch(residentUrl) // hacemos fetch de la info de cada resident
              .then(response => {
                if (!response.ok) { // si la respuesta no esta bien, error
                  throw new Error(`Failed to fetch resident data from ${residentUrl}`);
                }
                return response.json(); // si esta ok, devolvemos el json
              })
              .then(data => { // usamos otro promise para recoger el nombre y la url
                return { name: data.name, url: residentUrl };
              });
          });
          Promise.all(promises) // usamos Promise.all para esperar las respuestas
            .then(names => { // si las promises salen bien, pasamos los nombres
              setResidentNames(names);
              setIsLoading(false);
            })
            .catch(error => { // si alguna promise es negativa, ponemos el isLoading a false
              console.error(error);
              setIsLoading(false);
            });
        };
        getResidentNames(); // llamamos a la funcion asincrona para pillar los nombres
      }, [residents]); // esto lo hacemos cuando el array de residentes cambia
      
      

    const handleResidentClick = async (residentUrl) => {
        const response = await fetch(residentUrl);
        const data = await response.json();
        setResidentInfo(data);
        const planetResponse = await fetch(data.homeworld);
        const planetData = await planetResponse.json();
        setPlanetInfo(planetData);
        setShowResidentInfo(true);
    };
    const ResidentInfo = ({ resident }) => (
        <div className="card col-sm-6">
            <div className="card-body">
                <h3 className="card-title">{resident.name}</h3>
                <p className="card-text">Height: {resident.height}</p>
                <p className="card-text">Mass: {resident.mass}</p>
                <p className="card-text">Birth Year: {resident.birth_year}</p>
                <p className="card-text">Gender: {resident.gender}</p>
                <p className="card-text">Homeworld:{planetInfo.name}</p>
            </div>
            <button className="btn btn-secondary mt-3" onClick={() => setShowResidentInfo(false)}>Close</button>

        </div>

    );
    return (
        <div className="card">
            <div className="card-body">
                {showResidentInfo && residentInfo && (
                    <div>
                        <ResidentInfo resident={residentInfo} />
                    </div>
                )}
                {!showResidentInfo && residentNames && (
                    <div>
                        <h3 className="card-title">Residents:</h3>
                        {residentNames.length === 0 ? (
                            isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <p>There are no residents in this planet</p>
                            )
                        ) : (
                            
                            <ul className="list-group">
                                {residentNames.map((resident) => (
                                    <li key={resident.name} className="list-group-item">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => handleResidentClick(resident.url)}
                                        >
                                            {resident.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} export default ResidentList;
