export function chunkArray<T>(inputArray: T[], chunkSpan: number): T[][] {
  const chunkArray = inputArray.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / chunkSpan);

    if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []; // start a new chunk

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return chunkArray;
}
