/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ChartProps } from '@superset-ui/core';
import { NUMBER_OF_COLORS, StatusColorsMap } from '../types';

const getQueryValues = (item: object) => Object.values(item);

export default function transformProps(chartProps: ChartProps) {
  // @ts-ignore (queriesData - will be supported in future version of superset-ui/core)
  const { width, height, queriesData, formData } = chartProps;
  // @ts-ignore (same here)
  const data = queriesData.map(({ data }) => data.map(getQueryValues).join(', '));
  const statusColorsMap: StatusColorsMap = {};

  for (let i = 0; i < NUMBER_OF_COLORS; i++) {
    statusColorsMap[formData[`statusValue${i}`] as string] = formData[`statusValueColor${i}`];
  }

  return {
    width,
    height,
    statusColorsMap,
    data,
  };
}