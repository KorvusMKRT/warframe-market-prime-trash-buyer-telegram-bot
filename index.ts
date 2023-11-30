require('dotenv').config();
import { off } from 'process';
import { Telegraf, Context, Markup } from 'telegraf';
import { getAllCoolOrders, getMessages } from "warframe-market-prime-trash-buyer"
const bot = new Telegraf(process.env.BOT_TOKEN || '');
const keyboard = Markup.keyboard([
    ['/start', '/getMessages'], // Первый ряд кнопок
    ['/help', '/getCoolOdrers']     // Второй ряд кнопок
]).resize();
bot.start((ctx: Context) => {
    ctx.reply('Hi! Choose command:', keyboard
    );
});

// Обработка других команд
bot.command('hello', (ctx: Context) => {
    ctx.reply('Hi!');
});

bot.command('getCoolOdrers', async (ctx: Context) => {
    try {
        await ctx.reply('Analyzing all subjects...', { reply_markup: { remove_keyboard: true } });
        let coolOrders = await getAllCoolOrders({});

        for (const coolOrder of coolOrders) {
            await ctx.replyWithHTML(`<code>${JSON.stringify(coolOrder , null, 2)}</code>`);
        }

        await ctx.reply('Ready!', keyboard);
    } catch (error) {
        console.error('Error:', error);
        // Обработка ошибок, если необходимо
    }
});

bot.command('getMessages', async (ctx: Context) => {
    try {
        await ctx.reply('Analyzing all subjects and generating messages...', { reply_markup: { remove_keyboard: true } });
        let coolOrders = await getAllCoolOrders({});
        let messages = getMessages({ orders: coolOrders });

        for (const message of messages) {
            await ctx.replyWithHTML(`<code>${message}</code>`);
        }

        await ctx.reply('Ready!', keyboard);
    } catch (error) {
        console.error('Error:', error);
        // Обработка ошибок, если необходимо
    }
});

// Запуск бота
bot.launch().then(() => {
    console.log('Bot activated');
});
