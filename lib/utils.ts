import { parse, ParseEntry } from "shell-quote";

/**
 * Detects all the word boundaries in the given input.
 */
export function wordBoundaries(
	input: string,
	leftSide: boolean = true,
): number[] {
	let match: RegExpExecArray | null;
	const words: number[] = [];
	const rx: RegExp = /\w+/g;

	while ((match = rx.exec(input))) {
		words.push(leftSide ? match.index : match.index + match[0].length);
	}

	return words;
}

/**
 * Finds the closest left word boundary of the given input at the given offset.
 */
export function closestLeftBoundary(input: string, offset: number): number {
	const found = wordBoundaries(input, true)
		.reverse()
		.find((x) => x < offset);
	return found ?? 0;
}

/**
 * Finds the closest right word boundary of the given input at the given offset.
 */
export function closestRightBoundary(input: string, offset: number): number {
	const found = wordBoundaries(input, false).find((x) => x > offset);
	return found ?? input.length;
}

/**
 * Converts an offset in the given input to a column/row location.
 */
export function offsetToColRow(
	input: string,
	offset: number,
	maxCols: number,
): { row: number; col: number } {
	let row = 0,
		col = 0;

	for (let i = 0; i < offset; ++i) {
		const chr = input.charAt(i);
		if (chr === "\n") {
			col = 0;
			row += 1;
		} else {
			col += 1;
			if (col > maxCols) {
				col = 0;
				row += 1;
			}
		}
	}

	return { row, col };
}

/**
 * Counts the lines in the given input.
 */
export function countLines(input: string, maxCols: number): number {
	return offsetToColRow(input, input.length, maxCols).row + 1;
}

/**
 * Checks if there is an incomplete input.
 */
export function isIncompleteInput(input: string): boolean {
	if (input.trim() === "") {
		return false;
	}

	if ((input.match(/'/g) || []).length % 2 !== 0) {
		return true;
	}

	if ((input.match(/"/g) || []).length % 2 !== 0) {
		return true;
	}

	if (
		input
			.split(/(\|\||\||&&)/g)
			.pop()
			?.trim() === ""
	) {
		return true;
	}

	return input.endsWith("\\") && !input.endsWith("\\\\");
}

/**
 * Checks if the input ends with trailing whitespace.
 */
export function hasTailingWhitespace(input: string): boolean {
	return /[^\\][ \t]$/m.test(input);
}

/**
 * Returns the last token in the given input.
 */
export function getLastToken(input: string): string {
	if (input.trim() === "" || hasTailingWhitespace(input)) {
		return "";
	}

	const tokens = parse(input) as string[];
	return tokens.pop() || "";
}

/**
 * Collects autocomplete candidates based on the input and callback functions.
 */
export function collectAutocompleteCandidates(
	callbacks: {
		fn: (index: number, tokens: string[], ...args: unknown[]) => string[];
		args: unknown[];
	}[],
	input: string,
): string[] {
	const tokens = parse(input) as string[];
	let index = tokens.length - 1;
	let expr = tokens[index] || "";

	if (input.trim() === "") {
		index = 0;
		expr = "";
	} else if (hasTailingWhitespace(input)) {
		index += 1;
		expr = "";
	}

	return callbacks
		.reduce<string[]>((candidates, { fn, args }) => {
			try {
				return candidates.concat(fn(index, tokens, ...args));
			} catch (e) {
				console.error("Auto-complete error:", e);
				return candidates;
			}
		}, [])
		.filter((txt) => txt.startsWith(expr));
}

/**
 * Returns the longest common starting substring in a list of strings.
 */
export function getSharedFragment(
	fragment: string,
	candidates: string[],
): string | null {
	if (fragment.length >= candidates[0].length) return fragment;

	const oldFragment = fragment;
	fragment += candidates[0].slice(fragment.length, fragment.length + 1);

	for (let i = 0; i < candidates.length; i++) {
		if (!candidates[i].startsWith(oldFragment)) return null;
		if (!candidates[i].startsWith(fragment)) {
			return oldFragment;
		}
	}

	return getSharedFragment(fragment, candidates);
}
