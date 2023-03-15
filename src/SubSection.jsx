import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, SUBSECTION, CANVAS } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {};
const SubSection = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: SUBSECTION,
      id: data.id,
      children: data.children,
      path: path,
      origin: CANVAS
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column"
    >
      {data.id}
      {data.children.map((component, index) => {
        const currentPath = [...path, index];

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
                type: COMPONENT
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: [...path, data.children.length],
          childrenCount: data.children.length,
          type: COMPONENT
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default SubSection;
