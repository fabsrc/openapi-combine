import * as R from "ramda";
import * as S from "sanctuary";
import { Transformer } from "../types/Transformer";
import { Operation } from "../types/Operation";
import { overPaths, overPath } from "../utils";

export const includePaths = (pathsToInclude: string[]): Transformer =>
  overPaths(R.pick(pathsToInclude));

export const includePath = (pathToInclude: string): Transformer =>
  includePaths(R.of(pathToInclude));

export const includeOperationsFromPath = (
  path: string,
  operations: Operation[]
): Transformer => overPath(path, R.pick(operations));

export const includeOperationsFromPaths = (
  pathsAndOperations: Record<string, Operation[]>
): Transformer =>
  S.pipe(
    // FIXME
    // @ts-ignore
    R.mapObjIndexed<Operation[], Transformer>(
      (operations, path) => includeOperationsFromPath(path, operations),
      pathsAndOperations
    )
  );
