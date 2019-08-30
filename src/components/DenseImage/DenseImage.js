import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Tooltip } from "reactstrap";
import styles from "./DenseImage.module.scss";

const DenseImage = ({ path, filename, rotated, objects }) => {
  const [selectedObject, setSelectedObject] = useState("");
  return (
    <div
      className={classNames(styles.container, { [styles.rotated]: rotated })}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/${path}/${filename}`}
        alt="img"
      ></img>

      {objects && (
        <div className={styles.bboxContainer}>
          <svg width="100%" viewBox="0 0 640 640">
            <defs>
              <clipPath id={"clip_" + filename.replace(".jpg", "")}>
                {objects
                  .sort((a, b) => {
                    return b.bbox[2] * b.bbox[3] - a.bbox[2] * a.bbox[3];
                  })
                  .filter(d => d.score >= 0.85)
                  .map((object, i) => {
                    return (
                      <rect
                        key={i}
                        x={object.bbox[0]}
                        y={object.bbox[1]}
                        width={object.bbox[2]}
                        height={object.bbox[3]}
                      ></rect>
                    );
                  })}
              </clipPath>
            </defs>
            <image
              href={`${process.env.PUBLIC_URL}/images/${path}/${filename}`}
              x="0"
              y="0"
              height="640"
              width="640"
              style={{ clipPath: `url(#clip_${filename.replace(".jpg", "")})` }}
            />
            {objects
              .sort((a, b) => {
                return b.bbox[2] * b.bbox[3] - a.bbox[2] * a.bbox[3];
              })
              .filter(d => d.score >= 0.85)
              .map((object, i) => {
                return (
                  <React.Fragment key={i}>
                    <rect
                      className={styles.objRect}
                      x={object.bbox[0]}
                      y={object.bbox[1]}
                      width={object.bbox[2]}
                      height={object.bbox[3]}
                      onMouseOver={() => {
                        setSelectedObject(object.class_subj);
                      }}
                      onMouseOut={() => {
                        setSelectedObject("");
                      }}
                    ></rect>
                  </React.Fragment>
                );
              })}
          </svg>
        </div>
      )}

      <div className={styles.labelContainer}>
        <h4>{selectedObject}</h4>
      </div>
    </div>
  );
};
export default DenseImage;
