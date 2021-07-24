import { FoldSum, FoldMedian, FixedEventWindow, Filter } from './buildingBlocks';

export type Predicate = (num: number) => boolean;

export type BuildingBlockType = FoldSum | FoldMedian | FixedEventWindow | Filter;
