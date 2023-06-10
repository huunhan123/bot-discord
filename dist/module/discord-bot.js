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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const config_1 = __importDefault(require("./configuration/config"));
const data_1 = __importDefault(require("./configuration/data"));
class DiscordBot {
    constructor(token, targetChannelId, delay) {
        this.token = token;
        this.targetChannelId = targetChannelId;
        this.delay = delay;
        this.client = new discord_js_selfbot_v13_1.Client({
            checkUpdate: false,
        });
        this.client.on('ready', this.onReady.bind(this));
    }
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Bot đã sẵn sàng với tên ${this.client.user.username}`);
            setInterval(() => {
                this.sendMessage();
            }, config_1.default.getValue('interval') + this.delay * 10000);
        });
    }
    sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetChannel = yield this.client.channels.fetch(this.targetChannelId);
                if (!targetChannel) {
                    console.log('Không tìm thấy kênh');
                    return;
                }
                const message = data_1.default.getData();
                yield targetChannel.send(message);
                console.log('Tin nhắn đã được gửi thành công');
            }
            catch (error) {
                console.error('Đã xảy ra lỗi:', error);
            }
        });
    }
    start() {
        this.client.login(this.token);
    }
}
exports.default = DiscordBot;
