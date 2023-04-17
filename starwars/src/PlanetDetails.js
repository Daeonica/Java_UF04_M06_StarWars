import React, { useState, useEffect } from 'react';
import { ResidentList } from './ResidentList';

function PlanetDetails({ planet, onBackClick }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-center">{planet.name}</h2>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6">
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Diameter:</strong> {planet.diameter}</p>
            <p><strong>Gravity:</strong> {planet.gravity}</p>
            <p><strong>Population:</strong> {planet.population}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
          </div>
          <div className="col-sm-6">
            <ResidentList residents={planet.residents} />
          </div>
        </div>
        <button className="btn btn-secondary mt-3" onClick={onBackClick}>Back to the planet's list</button>
      </div>
    </div>
  );
}


export default PlanetDetails;
