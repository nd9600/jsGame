export default class Player {
    public static idCounter: number = 0;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly score: number
    ) {

    }
}
