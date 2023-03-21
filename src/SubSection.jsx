import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT_MIN_SIZE, COMPONENT, SUBSECTION, CANVAS } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";
import { getAvailableSize } from "./helpers";

const style = {};
const SubSection = ({ data, components, handleDrop, path, sectionSize }) => {
  const ref = useRef(null);
  //Calling the function that adds all the component's size and subtracts it from the subsection's size to find the available size inside the subsection
  let availableSize = getAvailableSize(data);

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
                type: COMPONENT,
                availableSize: Math.max(availableSize, COMPONENT_MIN_SIZE)
              }}
              onDrop={handleDrop}
              availableSize={Math.max(availableSize, COMPONENT_MIN_SIZE)}
              className="horizontalDrag"
            />
            {(component.size>3) && <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
                type: COMPONENT,
                modify: true,
                availableSize: component.size/2
              }}
              onDrop={handleDrop}
              availableSize={component.size/2}
              className="horizontalDrag"
            />}
            {renderComponent(component, currentPath, data.size)}
            {(component.size>3) && <DropZone
              data={{
                path: siblingPath,
                childrenCount: data.children.length,
                type: COMPONENT,
                modify: true,
                availableSize: component.size/2
              }}
              onDrop={handleDrop}
              availableSize={component.size/2}
              className="horizontalDrag"
            />}
          </React.Fragment>
        );
      })}
      <DropZone
        style= {{flex: availableSize/data.size}}
        data={{
          path: [...path, data.children.length],
          childrenCount: data.children.length,
          type: COMPONENT,
          availableSize: Math.max(availableSize, COMPONENT_MIN_SIZE)
        }}
        onDrop={handleDrop}
        availableSize={Math.max(availableSize, COMPONENT_MIN_SIZE)}
        className="horizontalDrag"
        isLast
      />
      </div>
    </div>
  );
};
export default SubSection;
