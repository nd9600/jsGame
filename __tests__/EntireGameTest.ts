import { Place, Status } from "@/core/@typings/BoardTypes";
import { Direction } from "@/core/@typings/EventDataTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import Board from "@/core/board/Board";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import EventRunner from "@/core/events/EventRunner";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";

describe("TheEntireGame", () => {

    function getPlayersFromGameState(gameState: GameState): Player[] {
        return R.values(gameState.players);
    }

    function getBoardsFromGameState(gameState: GameState): Board[] {
        return R.values(gameState.boards);
    }

    function getPlayerBoardsFromGameState(gameState: GameState): PlayerBoard[] {
        const playerBoards: PlayerBoard[] = [];
        for (const player of R.values(gameState.players)) {
            const playerBoardsForThisPlayer = R.prop(player.id, gameState.playerBoards);
            for (const playerBoard of R.values(playerBoardsForThisPlayer)) {
                playerBoards.push(playerBoard);
            }
        }
        return playerBoards;
    }

    it("plays a whole round", () => {
        const setup = new TestSetup();
        const [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint(),
            setup.getPlayerIDs(),
            setup.getBoardIDs(),
        ];

        const initialGameSetupData = { initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs };
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        let gameState = initialSetupEvent.handle(GameStateFactory.createGameState());

        let [player0, player1] = getPlayersFromGameState(gameState);
        let [board0, board1] = getBoardsFromGameState(gameState);

        expect(player0.name).toBe("player");
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
        // players change statuses to PlacingWalls
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

        // ####################
        // players change statuses to Playing
        // ####################

        gameState = EventRunner.runEvents([
            new StatusChangeEvent({boardID: board0.id, newStatus: Status.Playing}),
            new StatusChangeEvent({boardID: board1.id, newStatus: Status.Playing})
        ], gameState);
        [board0, board1] = getBoardsFromGameState(gameState);

        expect(board0.status).toBe(Status.Playing);
        expect(board1.status).toBe(Status.Playing);

        // ####################
        // players try to get to the end
        // ####################

        gameState = EventRunner.runEvents([
            new DirectionEvent({direction: Direction.Up, player: player0}),
            new DirectionEvent({direction: Direction.Left, player: player0}),
            new DirectionEvent({direction: Direction.Up, player: player0}),
            new DirectionEvent({direction: Direction.Right, player: player0}),
            new DirectionEvent({direction: Direction.Up, player: player0}),
            new DirectionEvent({direction: Direction.Left, player: player0}),

            new DirectionEvent({direction: Direction.Up, player: player1}),
            new DirectionEvent({direction: Direction.Left, player: player1}),
            new DirectionEvent({direction: Direction.Up, player: player1}),
            new DirectionEvent({direction: Direction.Right, player: player1}),
            new DirectionEvent({direction: Direction.Up, player: player1}),
            new DirectionEvent({direction: Direction.Left, player: player1}),
            new DirectionEvent({direction: Direction.Down, player: player1}),
            new DirectionEvent({direction: Direction.Left, player: player1}),
            new DirectionEvent({direction: Direction.Up, player: player1}),

        ], gameState);
        let [player0Board0, player0Board1, player1Board0, player1Board1] = getPlayerBoardsFromGameState(gameState);
        expect(player0Board0.boardStatus).toEqual(PlayerBoardStatus.Solved);
        expect(player0Board1.boardStatus).toEqual(PlayerBoardStatus.Playing);
        expect(player1Board0.boardStatus).toEqual(PlayerBoardStatus.Solved);
        expect(player1Board1.boardStatus).toEqual(PlayerBoardStatus.Playing);

        // ####################
        // players change PlayerBoard statuses
        // ####################

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);
        [player0Board0, player0Board1, player1Board0, player1Board1] = getPlayerBoardsFromGameState(gameState);

        expect(player0Board0.boardStatus).toEqual(PlayerBoardStatus.Finished);
        expect(player0Board1.boardStatus).toEqual(PlayerBoardStatus.Finished);
        expect(player1Board0.boardStatus).toEqual(PlayerBoardStatus.Finished);
        expect(player1Board1.boardStatus).toEqual(PlayerBoardStatus.Finished);
        
        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];

        expect(player0.score).toEqual(5);
        expect(player1.score).toEqual(5);
    });
});
