import React, { createContext, useEffect, useReducer } from 'react';
import { DataModel, Id } from '../../convex/_generated/dataModel';
import { useQuery } from 'react-query';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

type ChatState = {
	selectedHabit: Id<'habits'> | null;
	habits: DataModel['habits']['document'][];
	messages: DataModel['messages']['document'][];
};

type ChatFunctions = {
	setSelectedHabit: (habitId: Id<'habits'>) => void;
	setHabits: (habits: DataModel['habits']['document'][]) => void;
	setMessages: (messages: DataModel['messages']['document'][]) => void;
	addMessage: (message: DataModel['messages']['document']) => void;
};

export const ChatContext = createContext<ChatState & ChatFunctions>({
	selectedHabit: null,
	habits: [],
	messages: [],
	setSelectedHabit: () => {},
	setHabits: () => {},
	setMessages: () => {},
	addMessage: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const storeUser = useMutation(api.user.storeUser);
	const getAllHabits = useMutation(api.messages.getAllHabits);

	const [state, dispatch] = useReducer(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(state: ChatState, action: { type: string; payload: any }) => {
			switch (action.type) {
				case 'SELECT_HABIT':
					return { ...state, selectedHabit: action.payload };
				case 'SET_HABITS':
					return { ...state, habits: action.payload };
				case 'SET_MESSAGES':
					return { ...state, messages: action.payload };
				case 'ADD_MESSAGE':
					return {
						...state,
						messages: [...state.messages, action.payload],
					};
				default:
					return state;
			}
		},
		{
			selectedHabit: null,
			habits: [],
			messages: [],
		}
	);

	const setSelectedHabit = (habitId: Id<'habits'>) => {
		dispatch({ type: 'SELECT_HABIT', payload: habitId });
	};

	const setHabits = (habits: DataModel['habits']['document'][]) => {
		dispatch({ type: 'SET_HABITS', payload: habits });
	};

	const setMessages = (messages: DataModel['messages']['document'][]) => {
		dispatch({ type: 'SET_MESSAGES', payload: messages });
	};

	const addMessage = (message: DataModel['messages']['document']) => {
		dispatch({ type: 'ADD_MESSAGE', payload: message });
	};

	const {
		data: habits,
		isLoading: habitsIsLoading,
		isError: habitsIsError,
	} = useQuery(['chat-room-habits'], async () => {
		const userId = await storeUser();
		const habits = await getAllHabits({ userId });
		return habits;
	});

	useEffect(() => {
		if (habits) setHabits(habits);
	}, [habits]);

	console.log(habits);

	return (
		<ChatContext.Provider
			value={{
				...state,
				setSelectedHabit,
				setHabits,
				setMessages,
				addMessage,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
