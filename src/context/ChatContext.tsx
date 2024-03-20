import React, { createContext, useEffect, useReducer } from 'react';
import { DataModel, Id } from '../../convex/_generated/dataModel';
import { useQuery } from 'react-query';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

type ChatState = {
	selectedHabit: Id<'habits'> | null;
	habits: DataModel['habits']['document'][];
	messages: DataModel['messages']['document'][];
	chatLoading: boolean;
};

type ChatFunctions = {
	setSelectedHabit: (habitId: Id<'habits'>) => void;
	setHabits: (habits: DataModel['habits']['document'][]) => void;
	setMessages: (messages: DataModel['messages']['document'][]) => void;
	addMessage: (message: DataModel['messages']['document']['prompt']) => void;
	setChatLoading: (loading: boolean) => void;
};

export const ChatContext = createContext<ChatState & ChatFunctions>({
	selectedHabit: null,
	habits: [],
	messages: [],
	chatLoading: false,
	setSelectedHabit: () => {},
	setHabits: () => {},
	setMessages: () => {},
	addMessage: () => {},
	setChatLoading: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const chat = useAction(api.ai.chat);

	const storeUser = useMutation(api.user.storeUser);
	const getAllHabits = useMutation(api.messages.getAllHabits);
	const listMessagesForHabit = useMutation(api.messages.listMessagesForHabit);
	const createUserMessageEntry = useMutation(
		api.messages.createUserMessageEntry
	);
	const updatePromptMessage = useMutation(
		api.messages.updatePromptMessageEntry
	);

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
				case 'UPDATE_RESPONSE': {
					const messageId = action.payload.messageId;
					const updatedMessages = state.messages.map((message) => {
						if (message._id === messageId) {
							return {
								...message,
								response: action.payload.response,
							};
						}
						return message;
					});
					return { ...state, messages: updatedMessages };
				}
				case 'SET_CHAT_LOADING':
					return { ...state, chatLoading: action.payload };
				default:
					return state;
			}
		},
		{
			selectedHabit: null,
			habits: [],
			messages: [],
			chatLoading: false,
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

	const addMessage = async (
		message: DataModel['messages']['document']['prompt']
	) => {
		try {
			const { habitName, newMessage } = await createUserMessageEntry({
				habitId: state.selectedHabit,
				message,
			});
			dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
			const response = await chat({ habitName: habitName, message });
			await updatePromptMessage({ messageId: newMessage._id, response });
			dispatch({
				type: 'UPDATE_RESPONSE',
				payload: { messageId: newMessage._id, response },
			});
			dispatch({ type: 'SET_CHAT_LOADING', payload: false });
		} catch (error) {
			toast.error('Unable to send message. Try again later.');
		}
	};

	const setChatLoading = (loading: boolean) => {
		dispatch({ type: 'SET_CHAT_LOADING', payload: loading });
	};

	const { data: habits, isError: habitsIsError } = useQuery(
		['chat-room-habits'],
		async () => {
			const userId = await storeUser();
			const habits = await getAllHabits({ userId });
			return habits;
		}
	);

	const { data: messages, isError: messagesIsError } = useQuery(
		['chat-room-messages', state.selectedHabit],
		async () => {
			if (!state.selectedHabit) return;
			const messages = await listMessagesForHabit({
				habitId: state.selectedHabit,
			});
			return messages;
		}
	);

	useEffect(() => {
		if (habits) setHabits(habits);
	}, [habits]);

	useEffect(() => {
		if (messages) setMessages(messages);
	}, [messages]);

	return (
		<ChatContext.Provider
			value={{
				...state,
				setSelectedHabit,
				setHabits,
				setMessages,
				addMessage,
				setChatLoading,
			}}
		>
			{habitsIsError || messagesIsError ? (
				<div>Error loading data.</div>
			) : (
				children
			)}
		</ChatContext.Provider>
	);
};
