import Board from "@/core/board/Board";

interface Players {
    [id: number]: string;
}

interface Boards {
    [id: number]: Board;
}

export { Boards, Players };
