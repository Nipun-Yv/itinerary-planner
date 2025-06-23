import { LucideArrowUpSquare, MoveIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DraggableTextarea = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [text, setText] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const draggableRef = useRef(null);

  const handleMouseDown = (e: any) => {
    // Don't drag if clicking inside the textarea
    if (e.target.tagName === "TEXTAREA") return;
    setIsDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={draggableRef}
      className="absolute w-80 bg-white border-2 border-orange-200 rounded-xl shadow-xl shadow-gray-400 cursor-move select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        cursor: isDragging ? "grabbing" : "move",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Optional Drag Handle */}
      <div
        className="flex flex-col items-end px-2 py-2 bg-orange-100 border-b-2 border-orange-200 rounded-t-xl font-medium text-orange-800 text-xs"
      >
        <MoveIcon className="w-4 h-4 text-orange-400 mr-2" />
        Describe how you want your trip to me, I'll find some activities!
      </div>
      <textarea
        className="w-full h-32 p-4 border-none focus:outline-none resize-none text-gray-800 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your budget, what categories you wish to explore..."
      />
    </div>
  );
};

export default DraggableTextarea;

