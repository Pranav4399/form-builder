import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, CANVAS } from "./constants";

const Component = ({ data, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, 
            id: data.id,
            path: path,
            origin: CANVAS },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);


  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="component draggable"
    >
      <div>{data.id}{' '}{data.size}</div>
    </div>
  );
};
export default Component;
