import { BoardOptions } from "@/core/myTypes";
import Board from "./Board";

/**
 * Builds a Board by merging an already-existing Board with any of the possible options
 * You can't change a board's ID after it's been made, so there's no point setting one in BoardOptions
 */
export default class BoardBuilder {
    public static mergeWithOptions(board: Board, boardOptions: BoardOptions): Board {
        return new Board(
            board.id,
            boardOptions.player || board.player,
            boardOptions.boardData || board.boardData,
            boardOptions.characterPosition || board.characterPosition,
            boardOptions.endPoint || board.endPoint,
            boardOptions.status || board.status
        );
    }
}
