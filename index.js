"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const telegraf_1 = require("telegraf");
const warframe_market_prime_trash_buyer_1 = require("warframe-market-prime-trash-buyer");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
const keyboard = telegraf_1.Markup.keyboard([
    ['/start', '/getMessages'], // Первый ряд кнопок
    ['/help', '/getCoolOdrers'] // Второй ряд кнопок
]).resize();
bot.start((ctx) => {
    ctx.reply('Привет! Выберите команду:', keyboard);
});
// Обработка других команд
bot.command('hello', (ctx) => {
    ctx.reply('Приветствую! Как дела?');
});
bot.command('getCoolOdrers', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ctx.reply('Прохожусь по предметам...', { reply_markup: { remove_keyboard: true } });
        let coolOrders = yield (0, warframe_market_prime_trash_buyer_1.getAllCoolOrders)({});
        for (const coolOrder of coolOrders) {
            yield ctx.replyWithHTML(`<code>${JSON.stringify(coolOrder, null, 2)}</code>`);
        }
        yield ctx.reply('Готово!', keyboard);
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        // Обработка ошибок, если необходимо
    }
}));
bot.command('getMessages', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ctx.reply('Прохожусь по предметам и генерирую сообщения...', { reply_markup: { remove_keyboard: true } });
        let coolOrders = yield (0, warframe_market_prime_trash_buyer_1.getAllCoolOrders)({});
        let messages = (0, warframe_market_prime_trash_buyer_1.getMessages)({ orders: coolOrders });
        for (const message of messages) {
            yield ctx.replyWithHTML(`<code>${message}</code>`);
        }
        yield ctx.reply('Готово!', keyboard);
    }
    catch (error) {
        console.error('Произошла ошибка:', error);
        // Обработка ошибок, если необходимо
    }
}));
// Запуск бота
bot.launch().then(() => {
    console.log('Бот запущен');
});
