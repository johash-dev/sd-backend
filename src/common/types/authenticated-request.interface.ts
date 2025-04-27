import { Request } from 'express';
import { User } from 'src/modules';

export interface AuthenticatedRequest extends Request {
  user: User;
}
