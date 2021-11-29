import { Texture } from 'pixi.js';
import dinoIdle1 from './DinoSprites_vita-2.png';
import dinoIdle10 from './DinoSprites_vita-11.png';
import dinoIdle11 from './DinoSprites_vita-11.png';
import dinoIdle12 from './DinoSprites_vita-12.png';
import dinoIdle2 from './DinoSprites_vita-3.png';
import dinoIdle3 from './DinoSprites_vita-4.png';
import dinoIdle4 from './DinoSprites_vita-5.png';
import dinoIdle5 from './DinoSprites_vita-6.png';
import dinoIdle6 from './DinoSprites_vita-7.png';
import dinoIdle7 from './DinoSprites_vita-8.png';
import dinoIdle8 from './DinoSprites_vita-9.png';
import dinoIdle9 from './DinoSprites_vita-10.png';


import playerDead1 from './player-dead-1.png';
import playerDead2 from './player-dead-2.png';
import playerDead3 from './player-dead-3.png';
import playerDead4 from './player-dead-4.png';

// Dead
const playerDeadImages: string[] = [playerDead1, playerDead2, playerDead3, playerDead4];
const playerDeadTextures: Texture[] = [];
for (let i = 0; i < playerDeadImages.length; i++) {
    playerDeadTextures.push(Texture.from(playerDeadImages[i]));
}

// Idle
const playerIdleImages: string[] = [
    dinoIdle1,
    dinoIdle2,
    dinoIdle3,
    dinoIdle4,
    dinoIdle5,
    dinoIdle6,
    dinoIdle7,
    dinoIdle8,
    dinoIdle9,
    dinoIdle10,
    dinoIdle11,
    dinoIdle12,
];
const playerIdleTextures: Texture[] = [];
for (let i = 0; i < playerIdleImages.length; i++) {
    playerIdleTextures.push(Texture.from(playerIdleImages[i]));
}

export { playerDeadTextures, playerIdleTextures };
