import Board from "@/core/board/Board";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";

interface Players {
    [id: number]: Player;
}

interface Boards {
    [id: number]: Board;
}

interface PlayerBoards {
    [playerID: number]: {
        [boardID: number]: PlayerBoard;
    };
}

export { Players, Boards, PlayerBoards };

