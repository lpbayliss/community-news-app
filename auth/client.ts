import type { Auth } from "./server";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<Auth>()],
});
