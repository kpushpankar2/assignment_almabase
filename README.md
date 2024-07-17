
# Interactive Board

An interactive drag-and-drop board where users can add, move, and edit elements such as inputs, labels, and buttons. The board features modals for editing element properties and a sidebar for importing and exporting JSON configurations.

## Features

- **Drag-and-Drop**: Move elements around the board using drag-and-drop.
- **Add Elements**: Add new elements to the board using the sidebar.
- **Edit Elements**: Edit text, position, font size, and font weight of elements via a modal.
- **Delete Elements**: Delete selected elements using the delete key or the modal.
- **Responsive Design**: Works seamlessly on different screen sizes.
- **Import/Export JSON**: Save and load board configurations using JSON.

## Demo

[![Watch the video](https://img.youtube.com/vi/bMjBV7YIqf/0.jpg)](https://screenrec.com/share/bMjBV7YIqf)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/interactive-board.git
   cd interactive-board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the project:**

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default browser.

## Project Structure

```
src/
│
├── components/
│   ├── Board.tsx
│   ├── ElementRenderer.tsx
│   ├── Modal.tsx
│   ├── Sidebar.tsx
│   └── BoardUtils.ts
│
├── App.tsx
├── index.tsx
└── styles.css
```

### Explanation of Files

#### `Board.tsx`

This file contains the main `Board` component, which manages elements on the board, handles drag-and-drop functionality, opens and closes the modal, and selects elements.

- **State Management**: Uses React state to manage dragged elements, modal state, current element, element data, and selected element ID.
- **Event Handling**: Handles events for dragging, dropping, moving, and selecting elements.
- **Element Rendering**: Renders elements with dynamic styles and handles editing and deleting.

#### `ElementRenderer.tsx`

This file contains the `ElementRenderer` component, responsible for rendering individual elements on the board.

- **Element Types**: Renders different types of elements (`input`, `label`, `button`) based on the `type` property.
- **Styling**: Applies styles to elements and handles key down events for selection and editing.

#### `Modal.tsx`

This file contains the `Modal` component, which allows users to edit element properties.

- **State Management**: Manages modal state and element data.
- **Event Handling**: Handles save and delete actions for elements.

#### `Sidebar.tsx`

This file contains the `Sidebar` component, which allows users to import and export JSON configurations and add new elements to the board.

- **Import/Export JSON**: Handles importing and exporting board configurations.
- **Add Elements**: Provides buttons to add new elements to the board.

#### `BoardUtils.ts`

This file contains utility types and interfaces used across the project.

- **Type Definitions**: Defines types for element data and board props.

## Contributing

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature`)
5. **Open a pull request**
