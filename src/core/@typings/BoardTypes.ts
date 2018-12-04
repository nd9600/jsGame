/**
 * A list of possible options that can be used to make a new board from an existing one
 */
interface BoardOptions {
    boardData?: BoardType;
    startPoint?: BoardPosition;
    endPoint?: BoardPosition;
    status?: Status;
}

type BoardType = Place[][];

/**
 * number of rows X number of columns
 */
type twoNumbers = [number, number];

enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "e"
}

interface BoardPosition {
    x: number;
    y: number;
}

enum Status {
    NotStarted = "NotStarted",
    PlacingWalls = "PlacingWalls",
    Playing = "Playing",
    Finished = "Finished"
}

export { Place, BoardType, twoNumbers, BoardPosition, Status, BoardOptions };

