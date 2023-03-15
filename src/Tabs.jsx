import React from "react";

const Tabs = ({layout, setLayout, data}) => {
    const searchObjectById = (obj, id, num) => {
          if (obj.id === id) {
            return obj;
          }
    
          if (obj.children && obj.children.length) {
            for (let i = 0; i < obj.children.length; i++) {
              const found = searchObjectById(obj.children[i], id);
              if (found) {
                found.size = 12/num;
                return found;
              }
            }
          }
          return null;
    }
    
    const ChangeSize = (num) => {
        layout = layout.map(element => {
          const foundObject = searchObjectById(element, data.id, num);
          if (foundObject) {
            return element;
          }
        });    
        return layout;
    }

  return (
    <div className="sectionTabs">
      <button onClick={() => setLayout([...ChangeSize(1)])}>12x12</button>
      <button onClick={() => setLayout([...ChangeSize(2)])}>6x6</button>
      <button onClick={() => setLayout([...ChangeSize(3)])}>4x8</button>
    </div>
  );
};
export default Tabs;