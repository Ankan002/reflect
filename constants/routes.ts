export const PROTECTED_MATCHERS = [];

export const PROTECTED_ROUTES = new Set(["/"]);

export const UNPROTECTED_ROUTES: Set<string> = new Set([
	"/auth/login",
	"/auth/magic-link",
]);
