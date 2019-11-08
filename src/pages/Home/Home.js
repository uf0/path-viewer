import React from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import paths from "./paths.json";

const Home = () => {
  return (
    <div className="d-flex flex-column h-100">
      {paths.map(path => {
        return (
          <div key={path.id} className="flex-grow-1 p-2 border">
            <p>{path.name}</p>
            <h2>
              {path.start_address} - {path.end_address}
            </h2>
            <h4>
              {path.start_coordinates[0]},{path.start_coordinates[1]} -{" "}
              {path.end_coordinates[0]},{path.end_coordinates[1]}
            </h4>
            <p>
              {path.directions.distance / 1000} km - {path.directions.duration}{" "}
              seconds
            </p>
            <Link className="btn btn-secondary" to={`/path/${path.id}`}>
              explore
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
