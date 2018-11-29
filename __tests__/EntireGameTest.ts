import Board from "@/core/board/Board";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import EventRunner from "@/core/events/EventRunner";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import * as R from "ramda";

describe("TheEntireGame", () => {

    function getPlayersFromGameState(gameState: GameState): Player[] {
        return R.values(gameState.players);
    }

    function getBoardsFromGameState(gameState: GameState): Board[] {
        return R.values(gameState.boards);
    }

    it("plays a whole round", () => {
        const setup = new DefaultGameSetup();
        const [initialPlayerName, size, startPoint, endPoint] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

        const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint};
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        let gameState = initialSetupEvent.handle(GameStateFactory.createGameState());

        let [player1, player2] = getPlayersFromGameState(gameState);
        let [board1, board2] = getBoardsFromGameState(gameState);

        expect(player1.name).toBe("");
        expect(player2.score).toBe(0);

        // ####################
        // players change names
        // ####################

        const player1NameChangeEvent = new PlayerNameChangeEvent({playerID: player1.id, newPlayerName: "p1"});
        const player2NameChangeEvent = new PlayerNameChangeEvent({playerID: player2.id, newPlayerName: "p2"});

        gameState = EventRunner.runEvents([player1NameChangeEvent, player2NameChangeEvent], gameState);
        [player1, player2] = getPlayersFromGameState(gameState);

        expect(player1.name).toBe("p1");
        expect(player2.name).toBe("p2");

        // ####################
        // players change start and end positions
        // ####################
        
        const newBoard1StartPoint = { x: 2, y: 2 };
        const newBoard1EndPoint = { x: 0, y: 0 };
        const player1StartPointChangeEvent = new StartPointChangeEvent({boardID: board1.id, newStartPoint: newBoard1StartPoint});
        const player1EndPointChangeEvent = new EndPointChangeEvent({boardID: board1.id, newEndPoint: newBoard1EndPoint});

        const newBoard2StartPoint = { x: 0, y: 2 };
        const newBoard2EndPoint = { x: 2, y: 0 };
        const player2StartPointChangeEvent = new StartPointChangeEvent({boardID: board2.id, newStartPoint: newBoard2StartPoint});
        const player2EndPointChangeEvent = new EndPointChangeEvent({boardID: board2.id, newEndPoint: newBoard2EndPoint});

        gameState = EventRunner.runEvents([player1StartPointChangeEvent, player1EndPointChangeEvent, player2StartPointChangeEvent, player2EndPointChangeEvent], gameState);
        [board1, board2] = getBoardsFromGameState(gameState);

        expect(board1.startPoint).toBe(newBoard1StartPoint);
        expect(board1.endPoint).toBe(newBoard1EndPoint);
        expect(board2.startPoint).toBe(newBoard2StartPoint);
        expect(board2.endPoint).toBe(newBoard2EndPoint);
    });
});
