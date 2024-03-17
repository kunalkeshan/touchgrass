import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
	}).index('by_token', ['tokenIdentifier']),
	habits: defineTable({
		name: v.string(),
		userId: v.id('users'),
	}).index('by_user', ['userId']),
	entries: defineTable({
		habitId: v.id('habits'),
		date: v.string(),
		// P for present, A for absent, N for not recorded
		value: v.union(v.literal('P'), v.literal('A'), v.literal('N')),
	}).index('by_habit', ['habitId']),
	messages: defineTable({
		author: v.string(),
		body: v.string(),

	})
});
