import type { Context, Hono, Next } from "hono";
import {
	mergeContextValues,
	runWithContext,
	setContextValue,
} from "../utils/context";

export const withAppContext = (app: Hono) => {
	app.use(async (c: Context, next: Next) => {
		await runWithContext(async () => {
			const requestId = crypto.randomUUID();

			// Set initial context values
			mergeContextValues({
				requestId,
				requestPath: c.req.path,
				method: c.req.method,
				startTime: Date.now(),
			});

			// Add request ID to response headers
			c.header("X-Request-ID", requestId);

			try {
				await next();
			} finally {
				setContextValue("statusCode", c.res.status);
			}
		});
	});
};
