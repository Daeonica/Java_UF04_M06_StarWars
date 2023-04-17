import React, { useState, useEffect } from 'react';
import PlanetDetails from './PlanetDetails';
import PlanetList from './PlanetList';

function App() {
  const [planets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showResidents, setShowResidents] = useState(false);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setShowResidents(true);
  };

  const handleBackClick = () => {
    setSelectedPlanet(null);
    setShowResidents(false);
  };


  return (
    <div className="container">
      <h1>Planets of Star Wars and their residents</h1>
      {selectedPlanet && showResidents ? (
        //Cuando se clicka en un planeta, se visualiza el componente PlanetDetails, sino se visualiza PlanetList
        <PlanetDetails planet={selectedPlanet} onBackClick={handleBackClick} />
      ) : (
        <>
          {showResidents === false && (
            <>
              <PlanetList planets={planets} onPlanetClick={handlePlanetClick} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
