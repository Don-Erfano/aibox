'use client';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { FileDown, X } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

// import { useIsMobile } from "@/hooks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../drawer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../dialog';
import { Button, Form, RhfDatePicker, RHFRadioGroup } from '../../form';
import { useIsMobile } from '../../../hooks/use-mobile';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function TableReport<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const isMobile = useIsMobile();
  const form = useForm({
    defaultValues: {
      from: '',
      to: '',
      type: 'csv',
      info: 'filtered',
    },
  });

  function convertJSONToCSV(
    jsonData: Array<any>,
    columnHeaders: Array<string>
  ) {
    if (jsonData.length === 0) {
      return '';
    }

    const headers = columnHeaders.join(',') + '\n';

    const rows = jsonData
      .map((row) => {
        return columnHeaders.map((field) => row[field] || '').join(',');
      })
      .join('\n');

    return headers + rows;
  }

  const headers = table
    .getAllColumns()
    .filter((c) => c.id !== 'action' && c.id !== 'select')
    .map((c) => c.id);

  function downloadCSV(jsonData: Array<any>, headers: Array<string>) {
    const csvData = convertJSONToCSV(jsonData, headers);

    if (csvData === '') {
      alert('No data to export');
    } else {
      // Create CSV file and initiate download
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'product_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const CustomTagNames = !isMobile
    ? {
        Parent: Dialog,
        Content: DialogContent,
        Description: DialogDescription,
        Footer: DialogFooter,
        Header: DialogHeader,
        Title: DialogTitle,
        Trigger: DialogTrigger,
        Close: DialogClose,
      }
    : {
        Parent: Drawer,
        Content: DrawerContent,
        Description: DrawerDescription,
        Footer: DrawerFooter,
        Header: DrawerHeader,
        Title: DrawerTitle,
        Trigger: DrawerTrigger,
        Close: DrawerClose,
      };

  return (
    <>
      <CustomTagNames.Parent>
        <CustomTagNames.Trigger asChild>
          <Button variant="subtle" size="sm">
            <FileDown />
            دریافت خروجی
          </Button>
        </CustomTagNames.Trigger>
        <CustomTagNames.Content
          className={clsx('border-0 p-0', {
            'sm:px-8 md:px-16': isMobile,
          })}
        >
          <CustomTagNames.Close
            className="absolute top-2.5 left-4 cursor-pointer"
            asChild
          >
            <X
              className={clsx('cursor-pointer text-neutral-300 md:block', {
                '!hidden': isMobile,
              })}
            />
          </CustomTagNames.Close>
          <CustomTagNames.Title
            className={clsx('text-right text-base leading-5 font-medium', {
              'rounded-t-lg bg-teal-600 px-4 py-3 text-white': !isMobile,
              'px-4 py-8 text-zinc-700 sm:py-8': isMobile,
            })}
          >
            دریافت خروجی
          </CustomTagNames.Title>

          <Form {...form}>
            <form
              className={clsx('flex flex-col items-start gap-5', {
                'px-6': !isMobile,
                'px-5': isMobile,
              })}
            >
              <div
                className={clsx('flex w-full flex-col items-start gap-4 pb-5', {
                  'border-b border-b-slate-200': isMobile,
                })}
                title="will enable after bind services"
              >
                <p className="text-right text-sm text-zinc-600">نوع خروجی</p>
                <RHFRadioGroup
                  disabled
                  control={form.control}
                  className="flex gap-8 px-2"
                  name="type"
                  options={[
                    { id: 'csv', label: 'csv' },
                    { id: 'pdf', label: 'pdf' },
                  ]}
                />
              </div>
              <div
                className={clsx('flex w-full flex-col items-start gap-4 pb-5', {
                  'border-b border-b-slate-200': isMobile,
                })}
                title="will enable after bind services"
              >
                <p className="text-right text-sm text-zinc-600">اطلاعات</p>
                <RHFRadioGroup
                  disabled
                  control={form.control}
                  className="flex gap-8 px-2"
                  name="info"
                  options={[
                    { id: 'filtered', label: 'مطابق فیلتر جدول' },
                    { id: 'all', label: 'همه اطلاعات' },
                  ]}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-5">
                <p className="text-right text-sm text-zinc-600">بازه زمانی</p>
                <div className="flex w-full flex-col gap-4 px-2 lg:flex-row">
                  <div className="flex w-full items-center gap-2 [&>div]:flex-1">
                    <span className="text-sm leading-normal text-gray-500">
                      از
                    </span>
                    <RhfDatePicker
                      mode="single"
                      name="from"
                      control={form.control}
                    />
                  </div>
                  <div className="flex w-full items-center gap-2 [&>div]:flex-1">
                    <span className="text-sm leading-normal text-gray-500">
                      تا
                    </span>
                    <RhfDatePicker
                      mode="single"
                      name="to"
                      control={form.control}
                    />
                  </div>
                </div>
              </div>
              <CustomTagNames.Footer className="flex w-full flex-row !justify-center gap-5 overflow-hidden pb-8 md:mt-3 md:pb-6">
                <div className="w-full">
                  <Button
                    variant={isMobile ? 'outline' : 'default'}
                    size="full"
                    isFilled
                    onClick={() =>
                      downloadCSV(
                        table.getRowModel().rows.map((r) => r.original),
                        headers
                      )
                    }
                  >
                    دریافت خروجی
                  </Button>
                </div>
                <div className="w-full">
                  <CustomTagNames.Close asChild>
                    <Button
                      variant={isMobile ? 'outline' : 'default'}
                      size="full"
                    >
                      لغو
                    </Button>
                  </CustomTagNames.Close>
                </div>
              </CustomTagNames.Footer>
            </form>
          </Form>
        </CustomTagNames.Content>
      </CustomTagNames.Parent>
    </>
  );
}
