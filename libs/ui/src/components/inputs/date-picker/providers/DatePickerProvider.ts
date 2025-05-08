'use client';

import { createContext } from 'react';

import { IDatePickerCtx } from './types';

export const DatePickerContext = createContext<IDatePickerCtx>(
  {} as IDatePickerCtx
);
