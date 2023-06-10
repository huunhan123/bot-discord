"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_bot_1 = __importDefault(require("./module/discord-bot"));
const config_1 = __importDefault(require("./module/configuration/config"));
const tokens = config_1.default.getValue('token');
const targetChannelIds = config_1.default.getValue('channelId');
tokens.forEach((token, index) => {
    const bot = new discord_bot_1.default(token, targetChannelIds[0], index);
    bot.start();
});
