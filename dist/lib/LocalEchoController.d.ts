import { Terminal } from "xterm";
interface LocalEchoControllerOptions {
    historySize?: number;
    maxAutocompleteEntries?: number;
}
/**
 * A local terminal controller is responsible for displaying messages
 * and handling local echo for the terminal.
 *
 * Local echo supports most of bash-like input primitives. Namely:
 * - Arrow navigation on the input
 * - Alt-arrow for word-boundary navigation
 * - Alt-backspace for word-boundary deletion
 * - Multi-line input for incomplete commands
 * - Auto-complete hooks
 */
export default class LocalEchoController {
    private term;
    private history;
    private maxAutocompleteEntries;
    private _autocompleteHandlers;
    private _active;
    private _input;
    private _cursor;
    private _activePrompt;
    private _activeCharPrompt;
    private _termSize;
    private _disposables;
    private _handleTermData;
    private _handleTermResize;
    constructor(term?: Terminal | null, options?: LocalEchoControllerOptions);
    activate(term: Terminal): void;
    dispose(): void;
    /**
     *  Detach the controller from the terminal
     */
    detach(): void;
    /**
     * Attach controller to the terminal, handling events
     */
    attach(): void;
    /**
     * Register a handler that will be called to satisfy auto-completion
     */
    addAutocompleteHandler(fn: Function, ...args: any[]): void;
    /**
     * Remove a previously registered auto-complete handler
     */
    removeAutocompleteHandler(fn: Function): void;
    /**
     * Return a promise that will resolve when the user has completed
     * typing a single line
     */
    read(prompt: string, continuationPrompt?: string): Promise<string>;
    /**
     * Return a promise that will be resolved when the user types a single
     * character.
     *
     * This can be active in addition to `.read()` and will be resolved in
     * priority before it.
     */
    readChar(prompt: string): Promise<string>;
    /**
     * Abort a pending read operation
     */
    abortRead(reason?: string): void;
    /**
     * Prints a message and changes line
     */
    println(message: string): void;
    /**
     * Prints a message and properly handles new-lines
     */
    print(message: string): void;
    /**
     * Prints a list of items using a wide-format
     */
    printWide(items: string[], padding?: number): void;
    /**
     * Apply prompts to the given input
     */
    private applyPrompts;
    /**
     * Advances the `offset` as required in order to accompany the prompt
     * additions to the input.
     */
    private applyPromptOffset;
    /**
     * Clears the current prompt
     *
     * This function will erase all the lines that display the current prompt
     * and move the cursor in the beginning of the first line of the prompt.
     */
    private clearInput;
    /**
     * Replace input with the new input given
     *
     * This function clears all the lines that the current input occupies and
     * then replaces them with the new input.
     */
    private setInput;
    /**
     * This function completes the current input, calls the given callback
     * and then re-displays the prompt.
     */
    private printAndRestartPrompt;
    /**
     * Set the new cursor position, as an offset on the input string
     *
     * This function:
     * - Calculates the previous and current
     */
    private setCursor;
    /**
     * Move cursor at given direction
     */
    private handleCursorMove;
    /**
     * Erase a character at cursor location
     */
    private handleCursorErase;
    /**
     * Insert character at cursor location
     */
    private handleCursorInsert;
    /**
     * Handle input completion
     */
    private handleReadComplete;
    /**
     * Handle terminal resize
     *
     * This function clears the prompt using the previous configuration,
     * updates the cached terminal size information and then re-renders the
     * input. This leads (most of the times) into a better formatted input.
     */
    private handleTermResize;
    /**
     * Handle terminal input
     */
    private handleTermData;
    /**
     * Handle a single piece of information from the terminal.
     */
    private handleData;
}
export {};
