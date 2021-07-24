import { BuildingBlockType, Predicate } from './types';

class BuildingBlock {
    public nextBuildingBlock: BuildingBlockType;

    connectToNext (nextBuildingBlock: BuildingBlockType) {
        this.nextBuildingBlock = nextBuildingBlock;
    }

    protected pass (integers: number[]) {
        if (this.nextBuildingBlock) {
            this.nextBuildingBlock.receive(integers);
        }
    }

    receive (integers: number[]) {
    }
}

export class Filter extends BuildingBlock {
    private readonly predicateFunction: Predicate;

    constructor (predicateFunction: Predicate) {
        super();
        this.predicateFunction = predicateFunction;
    }

    receive (integers: number[]) {
        this.pass(integers.filter(this.predicateFunction));
    }
}

export class FixedEventWindow extends BuildingBlock {
    private readonly windowSize: number;
    private window: number[];

    constructor (windowSize: number) {
        super();
        this.windowSize = windowSize;
        this.window = [];
    }

    receive (integers: number[]) {
        this.window = this.window.concat(integers);

        while (this.window.length >= this.windowSize) {
            this.pass(this.window.slice(0, this.windowSize));
            this.window.splice(0, this.windowSize);
        }
    }
}

export class FoldSum extends BuildingBlock {
    constructor () {
        super();
    }

    receive (integers: number[]) {
        const sum = integers.reduce((accumulator, currentValue) => accumulator + currentValue);
        this.pass([sum]);
    }
}

export class FoldMedian extends BuildingBlock {
    constructor () {
        super();
    }

    receive (integers: number[]) {
        integers.sort((a, b) => a - b);

        if (integers.length % 2 === 1) {
            const index = (integers.length - 1) / 2;
            this.pass([integers[index]]);
        } else {
            const secondElementIndex = integers.length / 2;
            const average = (integers[secondElementIndex - 1] + integers[secondElementIndex]) / 2;
            this.pass([average]);
        }
    }
}

export class FileSink extends BuildingBlock {
    constructor () {
        super();
    }

    receive (integers: number[]) {
        for (const integer of integers) {
            console.log(integer.toString());
            this.pass([integer]);
        }
    }
}
