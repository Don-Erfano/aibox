'use client';
import { useContext } from 'react';
import { DatePickerContext } from './DatePickerProvider';

export const useDatePickerProvider = () => useContext(DatePickerContext);
