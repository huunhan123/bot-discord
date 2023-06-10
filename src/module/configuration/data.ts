import * as fs from 'fs';

class DataReader {
  private data: string[];

  constructor(filePath: string) {
    try {
      const configFile = fs.readFileSync(filePath, 'utf-8');
      this.data = configFile.split('\n');
    } catch (error) {
      console.error('Error reading config file:', error);
    }
  }

  getData(): string {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }
}

export default new DataReader('src/config/data.txt')