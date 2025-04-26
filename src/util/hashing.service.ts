import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable({})
export class HashingService {
  async getHashedString(value: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  }

  async compareString(value: string, encryptedValue: string) {
    return await bcrypt.compare(value, encryptedValue);
  }
}
