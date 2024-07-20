/**
 * Detects all the word boundaries in the given input.
 */
export declare function wordBoundaries(input: string, leftSide?: boolean): number[];
/**
 * Finds the closest left word boundary of the given input at the given offset.
 */
export declare function closestLeftBoundary(input: string, offset: number): number;
/**
 * Finds the closest right word boundary of the given input at the given offset.
 */
export declare function closestRightBoundary(input: string, offset: number): number;
/**
 * Converts an offset in the given input to a column/row location.
 */
export declare function offsetToColRow(input: string, offset: number, maxCols: number): {
    row: number;
    col: number;
};
/**
 * Counts the lines in the given input.
 */
export declare function countLines(input: string, maxCols: number): number;
/**
 * Checks if there is an incomplete input.
 */
export declare function isIncompleteInput(input: string): boolean;
/**
 * Checks if the input ends with trailing whitespace.
 */
export declare function hasTailingWhitespace(input: string): boolean;
/**
 * Returns the last token in the given input.
 */
export declare function getLastToken(input: string): string;
/**
 * Collects autocomplete candidates based on the input and callback functions.
 */
export declare function collectAutocompleteCandidates(callbacks: {
    fn: (index: number, tokens: string[], ...args: unknown[]) => string[];
    args: unknown[];
}[], input: string): string[];
/**
 * Returns the longest common starting substring in a list of strings.
 */
export declare function getSharedFragment(fragment: string, candidates: string[]): string | null;
