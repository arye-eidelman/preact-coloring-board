import { FunctionComponent } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";

interface ColoringBoardProps {
    drawing: Drawing
    setDrawing: (drawing: Drawing) => void
}
const BOARD_SCALE = 92;
const MARGIN_SCALE = (100 - BOARD_SCALE) / 2;

const ColoringBoard: FunctionComponent<ColoringBoardProps> = ({ drawing, setDrawing }) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [penColor, setPenColor] = useState("#1676c0");
    const [penSize, setPenSize] = useState(3);
    const [boardSize, setBoardSize] = useState<number>();
    let handleResize = () => setBoardSize(Math.min(window.innerWidth, window.innerHeight) * BOARD_SCALE / 100);

    useLayoutEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDraw = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setDrawing({
            ...drawing,
            points: [...drawing.points, { x, y, color: penColor, size: penSize }]
        })
    }


    return (<div>
        <div style={{ display: "flex", alignItems: "center", gap: "calc(1svmin + 4px)", margin: `4px ${MARGIN_SCALE}svmin`, justifyContent: "space-between" }}>
            {editingTitle
                ? <h1><input
                    type="text"
                    value={drawing.title}
                    onInput={e => setDrawing({ ...drawing, title: e.currentTarget.value })}
                    onBlur={() => setEditingTitle(false)}
                    autoFocus
                    style={{ fontSize: "calc(3svmin + 8px)", border: "none", outline: "none" }}
                /></h1>
                : <h1 onClick={() => setEditingTitle(true)} style={{ fontSize: "calc(3svmin + 8px)" }}>
                    {drawing.title ?? "Untitled Coloring Board"}
                </h1>
            }

            <div style={{ display: "flex", alignItems: "center", gap: "calc(1svmin + 4px)", justifyContent: "end", fontSize: "calc(2svmin + 4px)" }}>
                <label htmlFor="penColor">Color</label>
                <input
                    type="color"
                    name="color"
                    id="penColor"
                    value={penColor}
                    onInput={e => setPenColor(e.currentTarget.value)}
                    style={{ maxWidth: "calc(1svmin + 24px)" }}
                />
                <label htmlFor="penSize">Size</label>
                <input
                    type="range"
                    name="size"
                    id="penSize"
                    value={penSize}
                    onInput={e => { setPenSize(parseInt(e.currentTarget.value)); console.log(e.currentTarget.value) }}
                    style={{ maxWidth: "calc(2svmin + 36px)" }}
                    min="1"
                    max="10"
                    step=".25"
                />
            </div>
        </div>
        <div
            style={{ width: BOARD_SCALE + 'svmin', height: BOARD_SCALE + 'svmin', margin: `4px ${MARGIN_SCALE}svmin`, backgroundColor: "lightgray", position: "relative" }}
            onMouseDown={handleDraw}
            onMouseMove={e => e.buttons === 1 && handleDraw(e)}
        >
            {drawing.points.map((point, i) => <div
                key={i}
                style={{
                    position: "absolute",
                    left: point.x * boardSize,
                    top: point.y * boardSize,
                    width: point.size + 'svmin',
                    height: point.size + 'svmin',
                    backgroundColor: point.color,
                    borderRadius: "50%",
                    color: point.color,
                }}
            />)}
        </div>
    </div>);
}

export default ColoringBoard;