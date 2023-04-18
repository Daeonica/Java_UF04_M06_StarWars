import React, { useState, useEffect } from 'react';

export function PlanetList({ onPlanetClick }) {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    // Esta función se ejecutará cada vez que se produzca un cambio en la variable "currentPage"
    setIsLoading(true); // antes de hacer la solicitud isLoading = true
    const xml = new XMLHttpRequest();
    xml.open('GET', `https://swapi.dev/api/planets/?page=${currentPage}`);
    xml.onload = () => {
      if (xml.readyState == 4 && xml.status === 200) {
        const data = JSON.parse(xml.responseText);
        setPlanets(data.results);
        setIsLoading(false); // cuando se recibe la respuesta, isLoading=  false
      } else {
        console.log('Error fetching data from API');
      }
    };
    xml.send();
  }, [currentPage]);

  const paginationItems = [];
  for (let i = 1; i <= 6; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div>
      {isLoading && <div className="loading-icon">Loading...</div>} {/* Mostrar el icono de carga si isLoading es verdadero */}
      <div className="card">
      <div className="card-header">
        <h2>Planet's list</h2>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={index} onClick={() => onPlanetClick(planet)}>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevClick}>
              Previous
            </button>
          </li>
          {paginationItems}
          <li className={`page-item ${currentPage === 6 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextClick}>
              Next
            </button>
          </li>
        </ul>
      </nav>
      </div>
      <br></br>
    </div>
  );
}

export default PlanetList;
