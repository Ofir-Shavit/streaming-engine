import StreamingEngine, { FileSink, Filter, FixedEventWindow, FoldMedian, FoldSum } from './StreamingEngine';

const pipeline = [
    new Filter((i) => i > 0),
    new FixedEventWindow(2),
    new FoldSum(),
    new FixedEventWindow(3),
    new FoldMedian(),
    new FileSink()
];

const streamingEngine = new StreamingEngine(pipeline);

streamingEngine.listen();
