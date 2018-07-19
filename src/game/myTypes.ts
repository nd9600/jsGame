type Wall = "x";
type Character = "c";
type Empty = " ";
type End = "end";
type Place = Character | Wall | Empty | End;

type Board = Array<Array<Place>>;
type twoNumbers = [number, number];

interface Position {
    x: number,
    y: number
}

export {Wall, Character, Empty, End, Place, Board, twoNumbers, Position};