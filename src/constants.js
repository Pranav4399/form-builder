import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const SUPERSECTION = "supersection";
export const SECTION = "section";
export const SUBSECTION = "subsection";
export const COMPONENT = "component";
export const CANVAS = "canvas";
export const NEW = "new";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: COMPONENT,
    component: {
      type: "Input",
      content: "Some input"
    }
  }
];
