# Tiling Calculator

A web application that helps you visualize and plan tile layouts for your floor. This tool allows you to experiment with different tile sizes, joint widths, and starting configurations to find the perfect layout for your project.

## Features

### Floor Configuration
- Set custom floor dimensions (width and height in centimeters)
- Real-time visualization of the floor plan

### Tile Customization
- Adjust tile dimensions (width and height in centimeters)
- Choose tile color using a color picker
- Visualize how tiles will be laid out on your floor

### Joint Settings
- Set joint width (in millimeters)
- Option to start with joints on left and/or top edges
- Visual representation of joints between tiles

### Partial Tiles
- Option to start with partial tiles on left and/or top edges
- Adjustable partial tile size (percentage of full tile)
- Real-time preview of partial tile layouts

### User Interface
- Collapsible settings panel for better workspace utilization
- Smooth animations for panel transitions
- Responsive canvas that adjusts to window size
- Real-time updates as settings are changed

## How to Use

1. **Floor Setup**
   - Enter your floor dimensions in centimeters
   - The canvas will automatically scale to show your floor plan

2. **Tile Configuration**
   - Set your tile dimensions in centimeters
   - Choose a tile color using the color picker
   - The preview will update automatically

3. **Joint Configuration**
   - Set the desired joint width in millimeters
   - Toggle joints on left/top edges if needed

4. **Partial Tiles (Optional)**
   - Enable partial tiles on left/top edges if desired
   - Use the sliders to adjust partial tile sizes
   - The preview will show how partial tiles affect the layout

5. **Visualization**
   - Use the burger menu button to show/hide the settings panel
   - The canvas will automatically adjust to show your complete layout
   - All changes are reflected in real-time

## Technical Details

### Built With
- React
- TypeScript
- HTML5 Canvas
- Context API for state management

### Key Components
- `Settings`: Manages user inputs and configuration
- `Draw`: Handles canvas rendering and visualization
- `SettingsContext`: Provides global state management
- Responsive layout with smooth transitions

## Development

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Project Structure
```
src/
├── components/
│   ├── Settings.tsx        # Settings panel component
│   ├── Draw.tsx           # Canvas rendering component
│   ├── SettingsContext.tsx # Global state management
│   └── contexts/
│       └── settings.ts    # Settings type definitions
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
