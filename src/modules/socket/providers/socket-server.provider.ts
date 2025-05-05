import { Server } from 'socket.io';
import { Provider } from '@nestjs/common';
import { SOCKET_SERVER } from '../constants/socket';

export const socketServerProvider: Provider = {
  provide: SOCKET_SERVER,
  useFactory: () => {
    const io = new Server({
      cors: {
        origin: '*',
      },
    });
    return io;
  },
};
