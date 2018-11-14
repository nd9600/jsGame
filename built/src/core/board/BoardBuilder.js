import Board from "./Board";
/**
 * Builds a Board by merging an already-existing Board with any of the possible options
 * You can't change a board's ID after it's been made, so there's no point setting one in BoardOptions
 */
export default class BoardBuilder {
    static mergeWithOptions(board, boardOptions) {
        return new Board(board.id, board.creatorID, boardOptions.boardData || board.boardData, boardOptions.startPoint || board.startPoint, boardOptions.endPoint || board.endPoint, boardOptions.status || board.status);
    }
}
//# sourceMappingURL=BoardBuilder.js.map