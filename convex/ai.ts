'use node';

import { v } from 'convex/values';
import { action } from './_generated/server';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

/**
 * Prompt template which is set before feeding into the LLM.
 * Definition of `prompt` : {@link ChatPromptTemplate}
 */
const prompt = ChatPromptTemplate.fromMessages([
	[
		'human',
		'Given the context, you are a helpful assistant, known as the Grass Toucher, and a supportive friend who usually has general friendly conversations with me but also help me {topic}, respond to the following prompt. {message}.',
	],
]);

/**
 * The Large Language Model which generates responses based on the text prompt given.
 * Definition of `model` : {@link ChatOpenAI}
 */
const model = new ChatOpenAI({
	openAIApiKey: process.env.OPENAI_API_KEY,
	frequencyPenalty: 3,
	presencePenalty: 2,
	temperature: 0.2,
	maxTokens: 500,
	modelName: 'goliath-120b-16k-gptq',
	configuration: {
		baseURL: 'https://chat.tune.app/api/',
	},
});

/**
 * Definition of `parser` : {@link StringOutputParser}
 */
const parser = new StringOutputParser();

/**
 * Definition of `chain` : {@link RunnableSequence}
 */
const chain = RunnableSequence.from([prompt, model, parser]);

/**
 * Defines a server action for handling chat requests with {@link chain}.
 *
 * This function takes the user's habit name (`habitName`) and message (`message`) as arguments and utilizes a pre-defined processing chain (`chain`) to interact with an OpenAI chat model.
 *  - The {@link chain} likely performs the following steps:
 *      1. Applies a chat prompt template to the user's input, incorporating the habit name and defined in {@link prompt}.
 *      2. Sends the formatted prompt to the chat model, defined in {@link chain}.
 *      3. Parses the raw response from the model using a {@link parser}.
 *
 * @param {string} habitName - The name of the habit the user is referring to.
 * @param {string} message - The user's chat message.
 * @returns {Promise<any>} A promise that resolves to the parsed response from the `chain`. The exact format of the response may depend on the implementation of the `chain`.
 */
export const chat = action({
	args: { habitName: v.string(), message: v.string() },
	handler: async (_, args) => {
		const response = await chain.invoke({
			topic: args.habitName,
			message: args.message,
		});
		return response;
	},
});
