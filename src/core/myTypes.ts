import Board from "@/core/board/Board";

enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "end"
}

type BoardType = Place[][];
type twoNumbers = [number, number];

enum Direction {Up, Down, Left, Right}

interface Position {
    x: number;
    y: number;
}

interface IError {
    name: string;
    message: string;
}

export {Place, BoardType, twoNumbers, Direction, Position, IError};
