# Streaming Engine

Streaming Engine Framework for [Node-JS](http://nodejs.org).

Stream integers throw custom pipeline composed as your wish!

The stream takes in integers from the console and pass them throw the pipeline. The pipeline is a chain of building
blocks, passing information from one to another.

The integers are passed throw the pipeline's building blocks in the same order they were placed in the pipeline at
initialization time.

### Challenge Example - Run Docker Image

Build the image from the DockerFile

or run:

```bash
docker run -t -i ofirshavit/streaming-engine
```

### Usage

Create a pipeline via combining building blocks in the desirable order. every building block receive input process it
and pass it to the next building block.

The building Blocks are:

* StdinSource - The first building block, **automatically defined inside the pipeline**. prints '>' and wait for integer
  received form the console.


* Filter - Takes a predicate function (function that takes integer as a parameter and returns true or false). The
  function only passes integers that match the predicate.


* FixedEventWindow - Aggregates integers into a fixed-size array, pass it forward when full. The size of the fixed array
  is defined during the initialization of fixed-event-window.


* FoldSum - Sums the values in the array passed to it, and pass it to the next building block.


* FoldMedian - Calculates the median value of the array passed to it, and pass it to the next building block.


* FileSink - write a new line with the integer passed to it, and pass it to the next building block.

#### First combine the building blocks to the desired pipeline:

```ts
import StreamingEngine, { FileSink, Filter, FixedEventWindow, FoldMedian, FoldSum } from './StreamingEngine';

// Define a pipeline
const pipeline = [
    new Filter((i) => i > 0),
    new FixedEventWindow(2),
    new FoldSum(),
    new FixedEventWindow(3),
    new FoldMedian(),
    new FileSink()
];
```

#### Then Initiate the Streaming Engine and listen to input

```ts
// Initiate an instace with the desired pipeline
const streamingEngine = new StreamingEngine(pipeline);

// Listen to console input
streamingEngine.listen();
```

