import { mutation } from './_generated/server';

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
