import { AsyncLocalStorage } from "node:async_hooks";

export type AcceptableContextTypes = string | number | boolean | undefined;

export interface ContextData {
	[key: string]: AcceptableContextTypes;
}

const asyncLocalStorage = new AsyncLocalStorage<ContextData>();

export function runWithContext<T>(
	callback: () => T,
	initialData: ContextData = {},
): T {
	return asyncLocalStorage.run(initialData, callback);
}

export function getContext(): ContextData {
	return asyncLocalStorage.getStore() || {};
}

export function setContextValue(
	key: string,
	value: AcceptableContextTypes,
): void {
	const store = asyncLocalStorage.getStore();
	if (store) {
		store[key] = value;
	} else {
		throw new Error(
			"No active context found. Make sure to call runWithContext() first.",
		);
	}
}

export function getContextValue(key: string) {
	const store = asyncLocalStorage.getStore();
	if (!store) return undefined;
	return store[key];
}

export function getContextValues(keys: string[]): Partial<ContextData> {
	const store = asyncLocalStorage.getStore() || {};
	return keys.reduce(
		(result, key) => {
			if (key in store) {
				result[key] = store[key];
			}
			return result;
		},
		{} as Partial<ContextData>,
	);
}

export function mergeContextValues(values: ContextData): void {
	const store = asyncLocalStorage.getStore();
	if (store) {
		Object.assign(store, values);
	} else {
		throw new Error(
			"No active context found. Make sure to call runWithContext() first.",
		);
	}
}

export function removeContextValue(key: string): void {
	const store = asyncLocalStorage.getStore();
	if (store && key in store) {
		delete store[key];
	}
}

export function clearContext(): void {
	const store = asyncLocalStorage.getStore();
	if (store) {
		for (const key in store) {
			delete store[key];
		}
	}
}
