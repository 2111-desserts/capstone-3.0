import React, { useRef, useState } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

const DrawingCanvas = () => {
  //states
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  //mouse down event to start drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  //mouse movement
  const handleMouseMove = (e) => {
    //no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    //add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    //replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  //when user lets go of mouse click
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={1600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      >
        <Layer>
          {/* <Text text='Just start drawing' x={5} y={30} /> */}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#df4b26'
              strokeWidth={5}
              tension={0.5}
              lineCap='round'
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value='pen'>Pen</option>
        <option value='eraser'>Eraser</option>
      </select>
    </div>
  );
};

export default DrawingCanvas;
