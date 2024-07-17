import React from "react";
import { ElementData } from "./BoardUtils";

interface ElementRendererProps {
  element: ElementData;
  windowWidth: number;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  setEditingElementId: (id: string | null) => void;
  setModalOpen: (open: boolean) => void;
  setElementData: (data: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  }) => void;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  windowWidth,
  selectedElementId,
  setSelectedElementId,
  setEditingElementId,
  setModalOpen,
  setElementData,
}) => {
  const isSelected = element.id === selectedElementId;
  const style = {
    fontSize: `${element.fontSize}px`,
    fontWeight: element.fontWeight,
    padding: "10px",
    border: isSelected ? "2px solid red" : "none",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSelectedElementId(element.id);
      setEditingElementId(element.id);
      setModalOpen(true);
      setElementData({
        text: element.text,
        x: element.top,
        y: element.left,
        fontSize: element.fontSize,
        fontWeight: element.fontWeight,
      });
    }
  };

  const handleElementClick = () => {
    setSelectedElementId(element.id);
    setEditingElementId(element.id);
    setModalOpen(true);
    setElementData({
      text: element.text,
      x: element.top,
      y: element.left,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
    });
  };

  const handleClick = () => {
    setSelectedElementId(element.id);
    if (windowWidth < 768) {
      handleElementClick();
    }
  };

  switch (element.type) {
    case "input":
      return (
        <input
          onKeyDown={handleKeyDown}
          placeholder="Enter Value"
          onClick={handleClick}
          value={element.text}
          type="text"
          style={style}
        />
      );
    case "label":
      return (
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          style={style}
        >
          {element.text}
        </div>
      );
    case "button":
      return (
        <button
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          style={style}
        >
          {element.text}
        </button>
      );
    default:
      return null;
  }
};

export default ElementRenderer;
