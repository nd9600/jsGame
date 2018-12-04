import { InitialGameSetupData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import Board from "@/core/board/Board";
import Event from "@/core/events/Event";
import BoardFactory from "@/core/factories/BoardFactory";
import GameStateFactory from "@/core/factories/GameStateFactory";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import * as R from "ramda";

export default class InitialSetupEvent extends Event {
    public type: DispatchedEventNameTypes = "InitialSetupEvent";
    public data: InitialGameSetupData;

    constructor(initialGameSetupData: InitialGameSetupData) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = initialGameSetupData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const initialPlayer1 = new Player(
            Player.idCounter++,
            this.data.initialPlayerName,
            0
        );
        const initialPlayer2 = new Player(
            Player.idCounter++,
            this.data.initialPlayerName,
            0
        );

        const initialBoardData = BoardFactory.makeInitialBoard(this.data.size, this.data.startPoint, this.data.endPoint);
        const initialBoard1 = new Board(
            Board.idCounter++,
            initialPlayer1.id, 
            initialBoardData, 
            this.data.startPoint, 
            this.data.endPoint
        );
        const initialBoard2 = new Board(
            Board.idCounter++,
            initialPlayer2.id, 
            initialBoardData, 
            this.data.startPoint, 
            this.data.endPoint
        );

        const players = GameStateFactory.createPlayersObject([initialPlayer1, initialPlayer2]);
        const boards = GameStateFactory.createBoardsObject([initialBoard1, initialBoard2]);
        const playerBoards = GameStateFactory.createPlayerBoardsObject(players, boards);
        return new GameState(players, boards, playerBoards);
    }
}
