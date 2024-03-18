import { useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

/**
 * React hook that manages user storage in the Convex database.
 *
 * This hook utilizes the Convex `useConvexAuth` and `useUser` hooks to retrieve authentication state and user information. It performs the following actions:
 * 1. Tracks the user's authentication status using `isAuthenticated` from `useConvexAuth`.
 * 2. Retrieves the current user object using `user` from `useUser`.
 * 3. Maintains a local state variable `userId` (type `Id<'users'> | null`) to store the user ID.
 * 4. Provides a mutation function `storeUser` using `useMutation` to interact with the `api.user.storeUser` mutation.
 * 5. Utilizes a `useEffect` hook to:
 *    - Check if the user is authenticated. If not, it exits without action.
 *    - Calls the `createUser` function to store the user information in the database using the `storeUser` mutation.
 *    - Sets the `userId` state variable with the ID returned by the `storeUser` mutation.
 *    - Cleans up by setting `userId` to `null` on unmount.
 *    - Re-runs the effect whenever `isAuthenticated`, `storeUser`, or `user?.id` changes to ensure proper handling of login/logout and potential user updates.
 *
 * This hook is typically used to manage user storage and retrieve the user ID within a React component.
 *
 * @returns {Id<'users'> | null} The ID of the stored user in the `users` table, or null if the user is not authenticated.
 */

export default function useStoreUserEffect() {
	const { isAuthenticated } = useConvexAuth();
	const { user } = useUser();
	// When this state is set we know the server
	// has stored the user.
	const [userId, setUserId] = useState<Id<'users'> | null>(null);
	const storeUser = useMutation(api.user.storeUser);
	// Call the `storeUser` mutation function to store
	// the current user in the `users` table and return the `Id` value.
	useEffect(() => {
		// If the user is not logged in don't do anything
		if (!isAuthenticated) {
			return;
		}
		// Store the user in the database.
		// Recall that `storeUser` gets the user information via the `auth`
		// object on the server. You don't need to pass anything manually here.
		async function createUser() {
			const id = await storeUser();
			setUserId(id);
		}
		createUser();
		return () => setUserId(null);
		// Make sure the effect reruns if the user logs in with
		// a different identity
	}, [isAuthenticated, storeUser, user?.id]);
	return userId;
}
