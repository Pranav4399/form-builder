import React from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { COMPONENT, SIDEBAR_ITEM, SECTION, SUBSECTION } from "./constants";

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, SECTION, SUBSECTION];

const DropZone = ({style, data, onDrop, isLast, className, availableSize }) => {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const dropZonePath = data.path;
      const itemPath = item.path;
      
      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        return true;
      }

      if(itemPath.length < dropZonePath.length)
        return false;
      
      if(JSON.stringify([...itemPath.slice(0,-1), parseInt(itemPath.slice(-1)) + 1]) 
      === JSON.stringify(dropZonePath))
        return false;

      if (itemPath === dropZonePath)
        return false;
      
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
    <div style={style}
      className={classNames(
        "dropZone",
        { active: isActive, isLast },
        className
      )}
      ref={drop}
      availablesize={availableSize}
    />
  );
};
export default DropZone;
