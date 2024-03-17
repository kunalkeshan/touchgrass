'use node';

/*
LlamaCpp

import { LlamaCpp } from "@langchain/community/llms/llama_cpp";

const llamaPath = "/Replace/with/path/to/your/model/gguf-llama2-q4_0.bin";
const question = "Where do Llamas come from?";

const model = new LlamaCpp({ modelPath: llamaPath });

console.log(`You: ${question}`);
const response = await model.invoke(question);
console.log(`AI : ${response}`);
*/

/*
Ollama

import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2", // Default value
});

const stream = await model
  .pipe(new StringOutputParser())
  .stream(`Translate "I love programming" into German.`);

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
}
*/

/**
OpenAI
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
const prompt = ChatPromptTemplate.fromMessages([
	['human', 'For building consisteny to {topic}, tell me about {message}.'],
]);

const model = new LlamaCpp({});
const parser = new StringOutputParser();

const chain = RunnableSequence.from([prompt, model, parser]);
 */

/*
Tune.ai

from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI

chat_model = ChatOpenAI(
    openai_api_key="tune-9b9221be-996c-441b-9e08-5fc01f7f379f1710684965",
    openai_api_base="https://chat.tune.app/api/",
    model_name="mixtral-8x7b-inst-v0-1-32k"
)

out = chat_model.predict("hi!")
print(out)
*/

import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';
import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
const prompt = ChatPromptTemplate.fromMessages([
	['human', 'For building consisteny to {topic}, tell me about {message}.'],
]);

const model = new ChatOpenAI({
	openAIApiKey: process.env.OPENAI_API_KEY,
	modelName: 'mixtral-8x7b-inst-v0-1-32k',
	configuration: {
		baseURL: 'https://chat.tune.app/api/',
	},
});
const parser = new StringOutputParser();

const chain = RunnableSequence.from([prompt, model, parser]);

export const chat = action({
	args: { habitId: v.id('habits'), message: v.string() },
	handler: async (ctx, args) => {
		const habitName = await ctx.runMutation(
			api.messages.createUserMessageEntry,
			args
		);
		const response = await chain.invoke({
			topic: habitName,
			message: args.message,
		});
		console.log(response);
		return 'action value';
	},
});
