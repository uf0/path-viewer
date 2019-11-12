import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { groups as d3Groups } from "d3-array";
import DenseImage from "../../components/DenseImage";

const Path = props => {
  const [hasError, setErrors] = useState(false);
  const [steps, setSteps] = useState([]);

  async function fetchData() {
    const res = await fetch(
      `${process.env.PUBLIC_URL}/${props.match.params.id}.json`
    );
    res
      .json()
      .then(res =>
        setSteps(
          d3Groups(res, d => d.filename.split("_")[0]).sort((a, b) => {
            return a[0] - b[0];
          })
        )
      )
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex h-100">
      {steps.map((step, i) => {
        return (
          <div key={i} className="h-100 d-flex flex-column">
            <DenseImage
              filename={step[1][1].filename}
              path={props.match.params.id}
              objects={step[1][1].results}
              rotated
            ></DenseImage>

            <DenseImage
              filename={step[1][0].filename.replace("left", "up")}
              path={props.match.params.id}
              rotated
            ></DenseImage>

            <DenseImage
              filename={step[1][0].filename}
              path={props.match.params.id}
              objects={step[1][0].results}
            ></DenseImage>
          </div>
        );
      })}
    </div>
  );
};
export default withRouter(Path);
