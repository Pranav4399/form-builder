import shortid from "shortid";
import { SECTION, SUBSECTION, SUBCOMPONENT, COMPONENT, SUPERSECTION, NEW, CANVAS, HEIRARCHY } from "./constants";

//--------------------------------

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const remove = (arr, index) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1)
];

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const insertModify = (arr, index, newItem) => {
  let predecessor = arr.slice(0, index)[0];
  let successor = arr.slice(index)[0];
  if(predecessor) {
    newItem.size = predecessor.size = predecessor.size/2;
    return [
    // part of the array before the specified index
    predecessor,
    // inserted item
    newItem
    ];
  }
  else {
    newItem.size = successor.size = successor.size/2;
    return [
    // inserted item
    newItem,
    // part of the array after the specified index
    successor
    ];
  }
  
};


export const handleDropEvent = (layout, dropZone, item) => {

  
  const wrapItemRecursive = (item, targetType, availableSize) => {
    while (item.type !== targetType) {
      let curIndex = HEIRARCHY.indexOf(item.type);
      item = {
        type: HEIRARCHY[curIndex-1],
        id: shortid.generate(),
        children: [
          {
            ...item,
            size: availableSize
          }
        ]
      }

      wrapItemRecursive(item, targetType);
    }

    item = {
      ...item,
      size: availableSize
    }
    
    return item;
  }

  const insertJSONRecursive = (layout, i, target, parentSize) => {

    console.log(layout);
    if(i != target) {

      let layoutChildren = layout[dropZone.path[i]].children;
      let layoutSize = layout[dropZone.path[i]].size;

      layout[dropZone.path[i]].children = insertJSONRecursive(layoutChildren, ++i, target, layoutSize);
      return layout;
    }

    let availableSize = parentSize;

    if(item.size < availableSize)
      availableSize = item.size;
    
    //if dropping at new supersection level
    if(target > 1)
      availableSize-= layout.map(el => el.size).reduce((a,b) => {return a+b});

    return dropZone.modify == true? insertModify(layout, dropZone.path[dropZone.path.length-1], wrapItemRecursive(item, dropZone.type, availableSize))
    : insert(layout, dropZone.path[dropZone.path.length-1], wrapItemRecursive(item, dropZone.type, availableSize));

  }

  const removeJSONRecursive = (layout, i, target) => {
    if(i != target) {
      layout[item.path[i]].children = removeJSONRecursive(layout[item.path[i]].children, ++i, target);
      return layout;
    }

    return remove(layout, item.path[item.path.length-1]);

  }

  if(item.origin === NEW)
    return insertJSONRecursive(layout, 0, dropZone.path.length - 1, 12);
  else {
    layout = removeJSONRecursive(layout, 0, item.path.length - 1);
    return insertJSONRecursive(layout, 0, dropZone.path.length - 1, 12);
  }
}

