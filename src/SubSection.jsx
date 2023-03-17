import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { SUBCOMPONENT, COMPONENT, SUBSECTION, CANVAS } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {};
const SubSection = ({ data, components, handleDrop, path, sectionSize }) => {
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

  const renderComponent = (component, currentPath, subSectionSize) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
        subSectionSize={subSectionSize}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity, flex: data.size/sectionSize }}
      className="base draggable subSection"
    >
      <div className="subSectionLabel">{data.id}{' '}{data.size}</div>
      <div className="componentContainer">
      {data.children.map((component, index) => {
        const currentPath = [...path, index];
        const siblingPath = [...path, index + 1];

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
                type: COMPONENT
              }}
              onDrop={handleDrop}
              className="horizontalDrag"
            />
            {(component.size>2) && <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
                type: COMPONENT,
                modify: true
              }}
              onDrop={handleDrop}
              className="horizontalDrag"
            />}
            {renderComponent(component, currentPath, data.size)}
            {(component.size>2) && <DropZone
              data={{
                path: siblingPath,
                childrenCount: data.children.length,
                type: COMPONENT,
                modify: true
              }}
              onDrop={handleDrop}
              className="horizontalDrag"
            />}
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
        className="horizontalDrag"
        isLast
      />
      </div>
    </div>
  );
};
export default SubSection;
