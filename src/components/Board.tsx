import React, { useState, useRef, useEffect} from "react";
import { BoardProps } from "./BoardUtils";
import ElementRenderer from "./ElementRenderer";
import Modal from "./Modal";

const Board: React.FC<BoardProps> = ({
  elements,
  onDrop,
  onMove,
  onEditMove,
  onDelete,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [elementData, setElementData] = useState<{
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  }>({ text: "", x: 0, y: 0, fontSize: 16, fontWeight: "normal" });
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const elementType = e.dataTransfer.getData("text");
    const id = e.dataTransfer.getData("id");
    const x = e.clientY - top;
    const y = e.clientX - left;

    if (id) {
      onMove(id, x, y);
    } else {
      setCurrentElement({
        type: elementType,
        id: `element-${elements.length}`,
      });
      setElementData({
        text: "",
        x,
        y,
        fontSize: 16,
        fontWeight: "normal",
      });
      setModalOpen(true);
    }

    setDraggedElement(null);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedElement(id);
    e.dataTransfer.setData("text", "existingElement");
    e.dataTransfer.setData("id", id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement) {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      onMove(draggedElement, e.clientY - top, e.clientX - left);
    }
  };
  
  const handleTouchStart = (id: string) => {
    setDraggedElement(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect || !draggedElement) return;
    const top = touch.clientY - boardRect.top;
    const left = touch.clientX - boardRect.left;
    onMove(draggedElement, top, left);
  };

  const handleTouchEnd = () => {
    setDraggedElement(null);
  };

  const handleSave = () => {
    if (editingElementId) {
      onEditMove(
        editingElementId,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
      setEditingElementId(null);
    } else if (currentElement) {
      onDrop(
        currentElement.type,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
    }

    setModalOpen(false);
    setElementData({
      text:'',
      x: 0,
      y: 0,
      fontSize: 16,
      fontWeight: "normal",
    });
  };

  const handleDelete = () => {
    if (selectedElementId) {
      onDelete(selectedElementId);
      setSelectedElementId(null);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        handleDelete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElementId]);

  return (
    <>
      <div
        ref={boardRef}
        className="w-full relative h-full bg-[#F3F3F3]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute z-50 ${element.type === "button" ? "bg-blue-500 rounded-md" : element.type === "label" ? "bg-transparent" : "bg-white"}`}
            style={{ top: element.top, left: element.left }}
            draggable
            onDragStart={(e) => handleDragStart(e, element.id)}
            onTouchStart={() => handleTouchStart(element.id)}
          >
            <ElementRenderer
              element={element}
              windowWidth={windowWidth}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              setEditingElementId={setEditingElementId}
              setModalOpen={setModalOpen}
              setElementData={setElementData}
            />
          </div>
        ))}
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            currentElement={currentElement}
            elementData={elementData}
            setElementData={setElementData}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default Board;
