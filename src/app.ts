import DiscordBot from './module/discord-bot';
import ConfigReader from './module/configuration/config';

const tokens = ConfigReader.getValue('token') as string[];
const targetChannelIds = ConfigReader.getValue('channelId') as string[];

tokens.forEach((token, index) => {
  const bot = new DiscordBot(token, targetChannelIds[0], index);
  bot.start();
});