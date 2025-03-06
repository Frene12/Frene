import { Telegraf } from "telegraf";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) => ctx.reply("Привет! Я ИИ-бот. Напиши мне что-нибудь."));

bot.on("text", async (ctx) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: ctx.message.text }],
    });

    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
    ctx.reply("Ошибка! Попробуй позже.");
  }
});

bot.launch();
