import React from "react";
import { useDrag } from "react-dnd";
import { NEW } from "./constants";

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    item: {...data,
      origin: NEW},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
