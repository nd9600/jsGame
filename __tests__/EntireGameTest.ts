import { Place, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
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

        let [player0, player1] = getPlayersFromGameState(gameState);
        let [board0, board1] = getBoardsFromGameState(gameState);

        expect(player0.name).toBe("");
        expect(player1.score).toBe(0);

        expect(board0.status).toBe(Status.NotStarted);
        expect(board1.status).toBe(Status.NotStarted);

        // ####################
        // players change names
        // ####################

        const player0NameChangeEvent = new PlayerNameChangeEvent({playerID: player0.id, newPlayerName: "p1"});
        const player1NameChangeEvent = new PlayerNameChangeEvent({playerID: player1.id, newPlayerName: "p2"});

        gameState = EventRunner.runEvents([player0NameChangeEvent, player1NameChangeEvent], gameState);
        [player0, player1] = getPlayersFromGameState(gameState);

        expect(player0.name).toBe("p1");
        expect(player1.name).toBe("p2");

        // ####################
        // players change start and end positions
        // ####################
        
        const newBoard0StartPoint = { x: 3, y: 3 };
        const newBoard0EndPoint = { x: 0, y: 0 };
        const player0StartPointChangeEvent = new StartPointChangeEvent({boardID: board0.id, newStartPoint: newBoard0StartPoint});
        const player0EndPointChangeEvent = new EndPointChangeEvent({boardID: board0.id, newEndPoint: newBoard0EndPoint});

        const newBoard1StartPoint = { x: 0, y: 3 };
        const newBoard1EndPoint = { x: 3, y: 0 };
        const player1StartPointChangeEvent = new StartPointChangeEvent({boardID: board1.id, newStartPoint: newBoard1StartPoint});
        const player1EndPointChangeEvent = new EndPointChangeEvent({boardID: board1.id, newEndPoint: newBoard1EndPoint});

        gameState = EventRunner.runEvents([player0StartPointChangeEvent, player0EndPointChangeEvent, player1StartPointChangeEvent, player1EndPointChangeEvent], gameState);
        [board0, board1] = getBoardsFromGameState(gameState);

        expect(board0.startPoint).toBe(newBoard0StartPoint);
        expect(board0.endPoint).toBe(newBoard0EndPoint);
        expect(board1.startPoint).toBe(newBoard1StartPoint);
        expect(board1.endPoint).toBe(newBoard1EndPoint);

        // ####################
        // players change statuses
        // ####################

        gameState = EventRunner.runEvents([
            new StatusChangeEvent({boardID: board0.id, newStatus: Status.PlacingWalls}),
            new StatusChangeEvent({boardID: board1.id, newStatus: Status.PlacingWalls})
        ], gameState);
        [board0, board1] = getBoardsFromGameState(gameState);

        expect(board0.status).toBe(Status.PlacingWalls);
        expect(board1.status).toBe(Status.PlacingWalls);

        // ####################
        // players toggle walls
        // ####################

        gameState = EventRunner.runEvents([
            // board0
            new ToggleWallEvent({boardID: board0.id, positionToToggle: {x: 3, y: 0}}),
            new ToggleWallEvent({boardID: board0.id, positionToToggle: {x: 1, y: 1}}),
            new ToggleWallEvent({boardID: board0.id, positionToToggle: {x: 1, y: 2}}),
            new ToggleWallEvent({boardID: board0.id, positionToToggle: {x: 2, y: 3}}),

            // board1
            new ToggleWallEvent({boardID: board1.id, positionToToggle: {x: 0, y: 0}}),
            new ToggleWallEvent({boardID: board1.id, positionToToggle: {x: 2, y: 1}}),
            new ToggleWallEvent({boardID: board1.id, positionToToggle: {x: 2, y: 2}}),
            new ToggleWallEvent({boardID: board1.id, positionToToggle: {x: 1, y: 3}}),
        ], gameState);
        [board0, board1] = getBoardsFromGameState(gameState);

        expect(board0.boardData).toEqual([
            [Place.Empty, Place.Empty, Place.Empty, Place.Wall],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Wall, Place.Empty],
        ]);

        expect(board1.boardData).toEqual([
            [Place.Wall, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Wall, Place.Empty],
            [Place.Empty, Place.Empty, Place.Wall, Place.Empty],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
        ]);
    });
});
