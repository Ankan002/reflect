import type { ServerResponse } from ".";

export type ActionController<D = void, A = undefined> = (
	ctx?: A,
) => Promise<ServerResponse<D>>;
