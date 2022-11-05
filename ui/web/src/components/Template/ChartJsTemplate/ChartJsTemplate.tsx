/** React imports */
import React, { forwardRef, useEffect, useRef } from 'react';

/** ChartJs imports */
import { Chart as ChartJS } from 'chart.js';
import type { ChartType, DefaultDataPoint } from 'chart.js';

/** Types */
import type {
  ChartProps,
  ForwardedRef,
  TypedChartComponent,
} from './ChartTypes';

/** Utils */
import {
  cloneData,
  setDatasets,
  setLabels,
  setOptions,
  updateRef,
} from './ChartUtils';

function ChartJsTemplateConstructor<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  {
    height = 150,
    width = 300,
    redraw = false,
    datasetIdKey,
    type,
    data,
    options,
    plugins = [],
    fallbackContent,
    updateMode,
    ...props
  }: ChartProps<TType, TData, TLabel>,
  ref: ForwardedRef<ChartJS<TType, TData, TLabel>>
) {
  type TypedChartJS = ChartJS<TType, TData, TLabel>;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<TypedChartJS | null>();

  useEffect(() => {
    mountChart();

    return () => unmountChart();
  }, []);

  useEffect(() => {
    if (!redraw && chartRef.current && options) {
      setOptions(chartRef.current, options);
    }
  }, [redraw, options]);

  useEffect(() => {
    if (!redraw && chartRef.current) {
      setLabels(chartRef.current.config.data, data.labels);
    }
  }, [redraw, data.labels]);

  useEffect(() => {
    if (!redraw && chartRef.current && data.datasets) {
      setDatasets(chartRef.current.config.data, data.datasets, datasetIdKey);
    }
  }, [redraw, data.datasets]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (redraw) {
      unmountChart();
      setTimeout(mountChart);
    } else {
      chartRef.current.update(updateMode);
    }
  }, [redraw, options, data.labels, data.datasets, updateMode]);

  useEffect(() => {
    if (!chartRef.current) return;

    unmountChart();
    setTimeout(mountChart);
  }, [type]);

  const mountChart = () => {
    if (!canvasRef.current) return;

    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data: cloneData(data, datasetIdKey),
      options: options && { ...options },
      plugins,
    });

    updateRef(ref, chartRef.current);
  };

  const unmountChart = () => {
    updateRef(ref, null);

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };

  return (
    <canvas ref={canvasRef} role="img" height={height} width={width} {...props}>
      {fallbackContent}
    </canvas>
  );
}

export const ChartJsTemplate = forwardRef(
  ChartJsTemplateConstructor
) as TypedChartComponent;
