import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { SECTION } from "./constants";
import DropZone from "./DropZone";
import SubSection from "./SubSection";
import { SUBSECTION, CANVAS } from "./constants";

const Section = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: SECTION,
      id: data.id,
      size: data.size,
      children: data.children,
      path: path,
      origin: CANVAS
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderSubSection = (subSection, currentPath, sectionSize) => {
    return (
      <SubSection
        key={subSection.id}
        data={subSection}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
        sectionSize={sectionSize}
      />
    );
  };

  return (
    <div ref={ref} style={{ opacity, flex : data.size/12 }} className="base draggable section">
      <div className="sectionLabel">{data.id}{' '}{data.size}</div>
      <div className="subSectionContainer">
        {data.children.map((subSection, index) => {
          const currentPath = [...path, index];

          return (
            <React.Fragment key={subSection.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: SUBSECTION
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderSubSection(subSection, currentPath, data.size)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: [...path, data.children.length],
            childrenCount: data.children.length,
            type: SUBSECTION
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Section;
