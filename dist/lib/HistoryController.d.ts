/**
 * The history controller provides a ring-buffer
 */
export declare class HistoryController {
	private size;
	private entries;
	private cursor;
	constructor(size: number);
	/**
	 * Push an entry and maintain ring buffer size
	 */
	push(entry: string): void;
	/**
	 * Rewind history cursor to the last entry
	 */
	rewind(): void;
	/**
	 * Returns the previous entry
	 */
	getPrevious(): string | undefined;
	/**
	 * Returns the next entry
	 */
	getNext(): string | undefined;
}
