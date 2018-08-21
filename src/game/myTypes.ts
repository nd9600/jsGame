enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "end"
}

type Board = Place[][];
type twoNumbers = [number, number];

enum Direction {Up, Down, Left, Right}

interface Position {
    x: number;
    y: number;
}

interface GameState {
    board: Board;
    characterPosition: Position;
}

interface IError {
    name: string;
    message: string;
}

export {Place, Board, twoNumbers, Direction, Position, GameState, IError};
