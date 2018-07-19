type Character = "x";
type Empty = " ";
type End = "end";
type Place = Character | Empty | End;

type Board = Array<Array<Place>>;
type twoNumbers = [number, number];

/** 
 * height x width 
 * #rows x #columns
 * */
let size: twoNumbers = [10, 10];
let startPoint: twoNumbers = [0, 0];
let endPoint: twoNumbers = [9, 9]

function setPosition(board: Board, position: twoNumbers, newValue: Place): Board {
    board[position[0]][position[1]] = newValue;
    return board;
}

function getPosition(board: Board, position: twoNumbers) : Place {
    return board[position[0]][position[1]];
}

function makeInitialBoard(size: twoNumbers, start: twoNumbers, end: twoNumbers) : Board {
    let row = Array(size[0]).fill(" ");
    let board = Array(size[1]).fill(row);

    board

    return board;
}

export default {
    board: []
}