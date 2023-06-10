import { Client, TextChannel } from 'discord.js-selfbot-v13';
import ConfigReader from './configuration/config';
import DataReader from './configuration/data';

class DiscordBot {
  private client: Client;
  private token: string;
  private targetChannelId: string;
  private delay: number;

  constructor(token: string, targetChannelId: string, delay: number) {
    this.token = token;
    this.targetChannelId = targetChannelId;
    this.delay = delay;

    this.client = new Client({
      checkUpdate: false,
    });
    this.client.on('ready', this.onReady.bind(this));
  }

  private async onReady() {
    console.log(`Bot đã sẵn sàng với tên ${this.client.user.username}`);

    setInterval(() => {
      this.sendMessage();
    }, (ConfigReader.getValue('interval') as number) + this.delay * 10000);
  }

  private async sendMessage() {
    try {
      const targetChannel = await this.client.channels.fetch(this.targetChannelId) as unknown as TextChannel;
      if (!targetChannel) {
        console.log('Không tìm thấy kênh');
        return;
      }

      const message = DataReader.getData();
      await targetChannel.send(message);
      console.log('Tin nhắn đã được gửi thành công');
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  }

  public start() {
    this.client.login(this.token);
  }
}

export default DiscordBot;