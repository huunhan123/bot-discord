import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ConfigType } from './config.type';

class ConfigReader {
  private config: ConfigType;

  constructor(filePath: string) {
    try {
      const configFile = fs.readFileSync(filePath, 'utf-8');
      this.config = yaml.load(configFile) as (ConfigType | undefined);
    } catch (error) {
      console.error('Error reading config file:', error);
    }
  }

  getValue(key: string): string[] | number {
    return this.config[key];
  }
}

export default new ConfigReader('src/config/config.yaml')