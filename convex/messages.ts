/*import { ChatOpenAI } from "langchain/openai";
import { ChatPromptTemplate } from "langchain/core/prompts";
import { StringOutputParser } from "langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
    ["human"," Please give me some tips for being more consistent to {topic}."],
])

const model = new ChatOpenAI({});
const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
        topic:"Cold Mailing"
});*/

/*import { query, mutation } from "./_generated/server";

export const list = query(async (ctx) => {
  return await ctx.db.query("messages").collect();
});

export const send = mutation(async (ctx, { body }) => {
  await ctx.db.insert("messages", {
    body,
    author: "user",
  });
  const botMessageId = await ctx.db.insert("messages", {
    author: "assistant",
  });
});*/

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query(async (ctx) => {
  return await ctx.db.query("messages").collect();
});

export const send_prompt = mutation(async (ctx, { body }) => {
  await ctx.db.insert("messages", {
    author: "user",
    body: "I need some help with this habit",
  });
  //const botMessageId = await ctx.db.insert("messages", {
    //author: "assistant",
  //});
});