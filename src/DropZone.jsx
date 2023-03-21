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
      //Check if the availableSize of dropZone is more than 0 before dropping anything
      //But this statement also prevents rearranging of existing items inside the parent. Need to fix that
      if(availableSize < 1)
        return false;
      
      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        return true;
      }

      // parent container cannot be dropped in child container
      if(itemPath.length < dropZonePath.length)
        return false;
      
      // prevent dropping in itself(right)  
      if(JSON.stringify([...itemPath.slice(0,-1), parseInt(itemPath.slice(-1)) + 1]) 
      === JSON.stringify(dropZonePath))
        return false;

      // prevent dropping in itself(left)  
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
