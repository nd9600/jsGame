type Wall = "x";
type Character = "c";
type Empty = " ";
type End = "end";
type Place = Character | Wall | Empty | End;
enum Place2 {
    Character,
    Wall,
    Empty,
    End
}

type Board = Place[][];
type twoNumbers = [number, number];

enum Direction {Up, Down, Left, Right}

interface Position {
    x: number;
    y: number;
}

export {Wall, Character, Empty, End, Place, Place2, Board, twoNumbers, Direction, Position};
