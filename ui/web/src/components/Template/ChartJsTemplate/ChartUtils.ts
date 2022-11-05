/** React imports */
import type { MouseEvent } from 'react';

/** ChartJs imports */
import type {
  ChartType,
  ChartData,
  DefaultDataPoint,
  ChartDataset,
  ChartOptions,
  Chart,
} from 'chart.js';

/** Types */
import type { ForwardedRef } from './ChartTypes';

/** Constants */
const DEFAULT_DATASET_ID_KEY = 'label';

/**
 * Get single dataset element from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getElementAtEvent(
  chart: Chart,
  event: MouseEvent<HTMLCanvasElement>
) {
  return chart.getElementsAtEventForMode(
    event.nativeEvent,
    'nearest',
    { intersect: true },
    false
  );
}

/**
 * Get all dataset elements from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getElementsAtEvent(
  chart: Chart,
  event: MouseEvent<HTMLCanvasElement>
) {
  return chart.getElementsAtEventForMode(
    event.nativeEvent,
    'index',
    { intersect: true },
    false
  );
}

/**
 * Get dataset from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */
export function getDatasetAtEvent(
  chart: Chart,
  event: MouseEvent<HTMLCanvasElement>
) {
  return chart.getElementsAtEventForMode(
    event.nativeEvent,
    'dataset',
    { intersect: true },
    false
  );
}

/**
 * Updates chart options to new value
 * @param chart - Chart.js instance
 * @param nextOptions - Updated options object
 */
export function setOptions<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(chart: Chart<TType, TData, TLabel>, nextOptions: ChartOptions<TType>) {
  // @ts-ignore
  Object.assign(chart.options, nextOptions);
}

/**
 * Updates chart labels to new value
 * @param currentData - Chart.js instance
 * @param nextLabels - Updated labels array
 */
export function setLabels<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextLabels: TLabel[] | undefined
) {
  currentData.labels = nextLabels;
}

/**
 * Iterates over nextDatasets matching objects in the currentData where the value
 * at the datasetIdKey key is equal. In the case that a match is found, the new
 * value is assigned to the old object, otherwise a new one is created, maintaining
 * the original object memory address.
 * @param currentData - Current datasets data
 * @param nextDatasets - New datasets data
 * @param datasetIdKey - Id key of the dataset being updated
 */
export function setDatasets<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextDatasets: ChartDataset<TType, TData>[],
  datasetIdKey = DEFAULT_DATASET_ID_KEY
) {
  const addedDatasets: ChartDataset<TType, TData>[] = [];

  currentData.datasets = nextDatasets.map(
    (nextDataset: Record<string, unknown>) => {
      // given the new set, find it's current match
      const currentDataset = currentData.datasets.find(
        (dataset: Record<string, unknown>) =>
          dataset[datasetIdKey] === nextDataset[datasetIdKey]
      );

      // There is no original to update, so simply add new one
      if (
        !currentDataset ||
        !nextDataset.data ||
        addedDatasets.includes(currentDataset)
      ) {
        return { ...nextDataset } as ChartDataset<TType, TData>;
      }

      addedDatasets.push(currentDataset);

      Object.assign(currentDataset, nextDataset);

      return currentDataset;
    }
  );
}
/**
 * Clone the labels and datasets from the data first param and returns it in a
 * @param data - Data to be cloned
 * @param datasetIdKey - Id key of the dataset being updated
 * @returns Object like {labels: [], datasets: []}
 */
export function cloneData<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  data: ChartData<TType, TData, TLabel>,
  datasetIdKey = DEFAULT_DATASET_ID_KEY
) {
  const nextData: ChartData<TType, TData, TLabel> = {
    labels: [],
    datasets: [],
  };

  setLabels(nextData, data.labels);
  setDatasets(nextData, data.datasets, datasetIdKey);

  return nextData;
}

/**
 * Updates first param ref content to second param value
 * @param ref - Ref instance
 * @param value - Value to update ref for
 */
export function updateRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
