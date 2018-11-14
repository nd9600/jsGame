import Board from "@/core/board/Board";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";

interface Players {
    [id: number]: Player;
}

interface Boards {
    [id: number]: Board;
}

interface PlayerBoardsInternalObject {
    [boardID: number]: PlayerBoard;
}

interface PlayerBoards {
    [playerID: number]: PlayerBoardsInternalObject;
}

export { Players, Boards, PlayerBoards };

