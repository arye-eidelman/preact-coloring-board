interface Point {
    x: number
    y: number
}

interface drawingPoint extends Point {
    color: string
    size: number
}
type Drawing = {
    title?: string
    points: drawingPoint[]
}