export interface ElementData {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }
  
  export interface BoardProps {
    elements: ElementData[];
    onDrop: (
      elementType: string,
      top: number,
      left: number,
      text: string,
      fontSize: number,
      fontWeight: string
    ) => void;
    onMove: (id: string, top: number, left: number) => void;
    touchData: string | null
    onEditMove: (
      id: string,
      top: number,
      left: number,
      text: string,
      fontSize: number,
      fontWeight: string
    ) => void;
    onDelete: (id: string) => void;
  }
  