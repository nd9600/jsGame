type Wall = "x";
type Character = "c";
type Empty = " ";
type End = "end";
type Place = Character | Wall | Empty | End | string;

type Board = Place[][];
type twoNumbers = [number, number];

interface Position {
    x: number;
    y: number;
}

export {Wall, Character, Empty, End, Place, Board, twoNumbers, Position};