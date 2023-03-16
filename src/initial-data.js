import { COMPONENT, SUPERSECTION, SECTION, SUBSECTION } from "./constants";

const initialData = {
  layout: [
    {
      type: SUPERSECTION,
      size: 8,
      id: "supersection0",
      children: [
        {
          type: SECTION,
          size: 8,
          id: "section0",
          children: [
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection0",
              children: [
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component0"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component1"
                }
              ]
            },
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection1",
              children: [
                {
                  size: 4,
                  type: COMPONENT,
                  id: "component2"
                }
              ]
            }
          ]
        },
        {
          type: SECTION,
          size: 4,
          id: "section1",
          children: [
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection2",
              children: [
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component3"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component4"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component5"
                }
              ]
            }
          ]
        }
      ]
    }
    ,
    {
      type: SUPERSECTION,
      size: 8,
      id: "supersection0",
      children: [
        {
          type: SECTION,
          size: 8,
          id: "section0",
          children: [
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection0",
              children: [
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component0"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component1"
                }
              ]
            },
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection1",
              children: [
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component2"
                }
              ]
            }
          ]
        },
        {
          type: SECTION,
          size: 4,
          id: "section1",
          children: [
            {
              type: SUBSECTION,
              size: 4,
              id: "subsection2",
              children: [
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component3"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component4"
                },
                {
                  size: 2,
                  type: COMPONENT,
                  id: "component5"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default initialData;
