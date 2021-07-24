import StreamingEngine, {FileSink, Filter, FixedEventWindow, FoldMedian, FoldSum} from './StreamingEngine';
import {BuildingBlockType} from './StreamingEngine/types';

const buildingBlocks: BuildingBlockType[] = [
    new Filter((i) => i > 0),
    new FixedEventWindow(2),
    new FoldSum(),
    new FixedEventWindow(3),
    new FoldMedian(),
    new FileSink()
];

const streamingEngine = new StreamingEngine(buildingBlocks);

streamingEngine.listen();