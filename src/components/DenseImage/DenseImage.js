import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Tooltip } from "reactstrap";
import { scaleLinear } from "d3-scale";
import styles from "./DenseImage.module.scss";

const DenseImage = ({ path, filename, rotated, objects }) => {
  const [selectedObject, setSelectedObject] = useState({});
  const textRef = useRef(null);

  const copyToClipboard = () => {
    textRef.current.select();
    document.execCommand("copy");
  };

  const xScale = scaleLinear()
    .domain([0.0, 1.0])
    .rangeRound([0, 640]);
  const yScale = scaleLinear()
    .domain([0.0, 1.0])
    .rangeRound([0, 640]);

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
                    return (
                      xScale(b.bbox[2] - b.bbox[0]) *
                        yScale(b.bbox[3] - b.bbox[1]) -
                      xScale(a.bbox[2] - a.bbox[0]) *
                        yScale(a.bbox[3] - a.bbox[1])
                    );
                  })
                  .filter(d => d.score >= 0.85)
                  .map((object, i) => {
                    return (
                      <rect
                        key={i}
                        x={xScale(object.bbox[0])}
                        y={yScale(object.bbox[1])}
                        width={xScale(object.bbox[2] - object.bbox[0])}
                        height={yScale(object.bbox[3] - object.bbox[1])}
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
                return (
                  xScale(b.bbox[2] - b.bbox[0]) *
                    yScale(b.bbox[3] - b.bbox[1]) -
                  xScale(a.bbox[2] - a.bbox[0]) * yScale(a.bbox[3] - a.bbox[1])
                );
              })
              .filter(d => d.score >= 0.85)
              .map((object, i) => {
                return (
                  <React.Fragment key={i}>
                    <rect
                      className={styles.objRect}
                      x={xScale(object.bbox[0])}
                      y={yScale(object.bbox[1])}
                      width={xScale(object.bbox[2] - object.bbox[0])}
                      height={yScale(object.bbox[3] - object.bbox[1])}
                      onMouseOver={() => {
                        const copyText = filename
                          .replace(/_/g, "|")
                          .replace(".jpg", `|${i}`);
                        setSelectedObject({
                          class_subj: object.new_subject,
                          copyText: copyText
                        });
                      }}
                      onMouseOut={() => {
                        setSelectedObject({});
                      }}
                      onClick={() => {
                        copyToClipboard();
                      }}
                    ></rect>
                  </React.Fragment>
                );
              })}
          </svg>
        </div>
      )}

      <div className={styles.labelContainer}>
        <h4>{selectedObject.class_subj}</h4>
        <textarea
          className={styles.textArea}
          ref={textRef}
          value={selectedObject.copyText}
        />
      </div>
    </div>
  );
};
export default DenseImage;
