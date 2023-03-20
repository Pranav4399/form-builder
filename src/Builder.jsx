import React, { useState, useCallback } from "react";

import DropZone from "./DropZone";
import SideBarItem from "./SideBarItem";
import Section from "./Section";
import initialData from "./initial-data";
import {
  handleDropEvent
} from "./helpers";

import { SIDEBAR_ITEMS, SUPERSECTION, SECTION } from "./constants";
import shortid from "shortid";

const Builder = () => {
  const initialLayout = initialData.layout;
  const [layout, setLayout] = useState(initialLayout);

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log(dropZone);
      console.log(item);

      setLayout([...handleDropEvent(layout, dropZone, item)]);
      return;
    },
    [layout]
  );

  const renderSection = (section, currentPath) => {
    return (
      <Section
        key={section.id}
        data={section}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((el, supersectionindex) => {

            let availableSize = 12;

            return <>
              <DropZone
                data={{
                  path: [supersectionindex],
                  childrenCount: el.length,
                  type: SUPERSECTION
                }}
                onDrop={handleDrop}
                availableSize={availableSize}
                path={[supersectionindex]}
              />
              <div className="sectionContainer">
                {el.children.map((section, index) => {

                  availableSize-= section.size;
                  

                  return (
                    <React.Fragment key={section.id}>
                      {renderSection(section, [supersectionindex, index])}
                    </React.Fragment>
                  );
                })}
                {(availableSize > 0) && 
                <DropZone 
                  style={{ flexGrow : availableSize/12 }}
                  data={{
                    path: [supersectionindex, el.children.length],
                    childrenCount: el.children.length,
                    type: SECTION
                  }}
                  className="horizontalDrag"
                  onDrop={handleDrop}
                  availableSize={availableSize}
                  isLast
                />}
              </div>
            </>
          })}
          
          <DropZone
            data={{
              path: [layout.length],
              childrenCount: layout.length,
              type: SUPERSECTION
            }}
            onDrop={handleDrop}
            availableSize={12}
            isLast
          />
        </div>

      </div>
    </div>
  );
};
export default Builder;
