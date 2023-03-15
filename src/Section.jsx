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

  const renderSection = (column, currentPath) => {
    return (
      <SubSection
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  return (
    <div ref={ref} style={{ opacity, flexGrow : data.size/12 }} className="base draggable row">
      {data.id}
      <div className="columns">
        {data.children.map((column, index) => {
          const currentPath = [...path, index];

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                  type: SUBSECTION
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderSection(column, currentPath)}
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
