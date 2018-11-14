import Board from "@/core/board/Board";
import boardFunctions from "@/core/board/boardFunctions";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
export default class InitialSetupEvent extends Event {
    constructor(initialGameSetupData) {
        super();
        this.type = "InitialSetupEvent";
        this.types = R.append(this.type, this.types);
        this.data = initialGameSetupData;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        const initialPlayer1 = new Player(Player.idCounter++, this.data.initialPlayerName, 0);
        const initialPlayer2 = new Player(Player.idCounter++, this.data.initialPlayerName, 0);
        const initialBoardData = boardFunctions.makeInitialBoard(this.data.size, this.data.startPoint, this.data.endPoint);
        const initialBoard1 = new Board(Board.idCounter++, initialPlayer1.id, initialBoardData, this.data.startPoint, this.data.endPoint);
        const initialBoard2 = new Board(Board.idCounter++, initialPlayer2.id, initialBoardData, this.data.startPoint, this.data.endPoint);
        const players = usefulFunctions.makePlayersObject([initialPlayer1, initialPlayer2]);
        const boards = usefulFunctions.makeBoardsObject([initialBoard1, initialBoard2]);
        const playerBoards = usefulFunctions.makePlayerBoardsObject(players, boards);
        return new GameState(players, boards, playerBoards);
    }
}
//# sourceMappingURL=InitialSetupEvent.js.map