import readline, { Interface } from 'readline';
import { BuildingBlockType } from './types';

export default class StreamingEngine {
    private buildingBlocks: BuildingBlockType[] = [];
    private rl: Interface;

    constructor (buildingBlocks: BuildingBlockType[]) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.buildingBlocks = buildingBlocks;

        for (let i = 0; i < buildingBlocks.length - 1; i++) {
            buildingBlocks[i].connectToNext(buildingBlocks[i + 1]);
        }
    }

    stream (integer: number) {
        this.buildingBlocks[0].receive([integer]);
    }

    listenToInterruption () {
        this.rl.on('SIGINT', () => {
            this.rl.question('Are you sure you want to stop the stream? ', (answer) => {
                if (answer.match(/^y(es)?$/i)) {
                    this.rl.pause();
                }
            });
        });
    }

    listen () {
        console.log('Streaming engine is running, please insert integers!');
        process.stdout.write('>');
        this.rl.on('line', (input) => {
            const number = Number(input);

            if (input === '' || !Number.isInteger(number)) {
                console.log('Please insert only integers!');
                process.stdout.write('>');
            } else {
                this.stream(number);
                process.stdout.write('>');
            }
        });

        this.listenToInterruption();
    }
}
