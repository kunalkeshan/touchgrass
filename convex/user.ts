import { mutation } from './_generated/server';

/**
 * Stores user information based on the authenticated user identity.
 *
 * This function expects the user to be authenticated through Convex Auth before being called. It performs the following actions:
 * 1. Retrieves the authenticated user's identity using `ctx.auth.getUserIdentity()`.
 * 2. Throws an error if the user is not authenticated.
 * 3. Queries the `users` table to check if a user with the same `tokenIdentifier` already exists.
 * 4. If an existing user is found:
 *    - Checks if the user's name has changed.
 *    - If the name has changed, updates the name in the existing user document using a patch operation.
 *    - Returns the ID of the existing user document.
 * 5. If no existing user is found (new identity):
 *    - Creates a new user document in the `users` table with the following data:
 *        - `name`: User's name extracted from the identity (assumed to be non-null).
 *        - `tokenIdentifier`: Unique identifier from the identity for user authentication.
 *    - Returns the ID of the newly created user document.
 *
 * @throws {Error} If the user is not authenticated when calling the function.
 * @returns {Promise<string>} A promise that resolves to the ID of the user document (either existing or newly created).
 */
export const storeUser = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) {
			throw new Error('Called storeUser without authentication present');
		}

		// Check if we've already stored this identity before.
		const user = await ctx.db
			.query('users')
			.filter((q) =>
				q.eq(q.field('tokenIdentifier'), identity.tokenIdentifier)
			)
			.unique();
		if (user !== null) {
			// If we've seen this identity before but the name has changed, patch the value.
			if (user.name !== identity.name) {
				await ctx.db.patch(user._id, { name: identity.name });
			}
			return user._id;
		}
		// If it's a new identity, create a new `User`.
		return await ctx.db.insert('users', {
			name: identity.name!,
			tokenIdentifier: identity.tokenIdentifier,
		});
	},
});
