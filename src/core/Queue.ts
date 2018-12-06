/** Originally created by Kate Morley - http://code.iamkate.com/ - and released under the terms of the CC0 1.0 Universal legal code: http://creativecommons.org/publicdomain/zero/1.0/legalcode
 */
export default class Queue<T> {
    private queue: T[];
    private offset: number;

    constructor() {
        this.queue = [];
        this.offset = 0;
    }

    public getLength(): number {
        return (this.queue.length - this.offset);
    }

    public isEmpty(): boolean {
        return (this.queue.length === 0);
    }

    public enqueue(item: T): void {
        this.queue.push(item);
    }

    public dequeue(): T | undefined {
        if (this.queue.length === 0) {
            return undefined;
        }

        const item = this.queue[this.offset];
        // increments an internal offset to indicate that there is space at the front of the array; when this space takes up half the array, the slice function removes it. Because n items are moved only after n dequeuing operations have occurred, the dequeue function runs in amortised constant time.
        if (++this.offset * 2 >= this.queue.length) {
            this.queue = this.queue.slice(this.offset);
            this.offset = 0;
        }
        return item;
    }

    public peek(): T | undefined {
        return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
    }
}
