import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import { MonitorOptions, monitor } from '@colyseus/monitor';
import { Constants } from '@tosios/common';
import { GameRoom } from './rooms/GameRoom';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { join } from 'path';
import { string } from '@colyseus/schema/lib/encoding/decode';

const PORT = Number(process.env.PORT || Constants.WS_PORT);

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());

// Game server
const server = new Server({
    server: createServer(app),
    express: app,
});

// Game Rooms
server.define(Constants.ROOM_NAME, GameRoom);

// Serve static resources from the "public" folder
app.use(express.static(join(__dirname, 'public')));

// If you don't want people accessing your server stats, comment this line.
app.use('/colyseus', monitor(server as Partial<MonitorOptions>));

// Serve the frontend client
app.get('*', (req: any, res: any) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

server.onShutdown(() => {
    console.log(`Shutting down...`);
});

declare let process: {
    env: {
        PORT: number;
    };
};

server.listen(process.env.PORT || 3000);
console.log(`Listening on ws://localhost:${PORT}`);
