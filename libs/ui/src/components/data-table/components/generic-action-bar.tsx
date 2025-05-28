'use client';

import { Table } from '@tanstack/react-table';
import { Download, Trash2, Pencil } from 'lucide-react';
import { useState, useTransition } from 'react';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from './table-action';
import { exportTableToCSV } from '../lib/export';
import { Separator } from '../../separator';
import { Modal } from '../../modal';
import { Button } from '../../form';

type GenericActionBarProps<TData extends { id: string | number }> = {
  table: Table<TData>;
  onDelete: (id: TData['id']) => Promise<void> | void;
  onEdit: (ids: TData['id'][]) => void;
};

export function GenericActionBar<TData extends { id: string | number }>({
  table,
  onDelete,
  onEdit,
}: GenericActionBarProps<TData>) {
  const rows = table.getFilteredSelectedRowModel().rows;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentDeleteIds, setCurrentDeleteIds] = useState<TData['id'][]>([]);

  const selected = rows.map((r) => r.original);
  const selectedIds = selected.map((item) => item.id);

  const handleExport = () => {
    startTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ['select', 'actions', 'expand'],
        onlySelected: true,
      });
    });
  };

  const handleEditClick = () => {
    if (selectedIds.length > 0) {
      setShowEditModal(true);
    }
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      setCurrentDeleteIds(selectedIds);
      setShowDeleteConfirm(true);
    }
  };

  const handleConfirmDelete = async () => {
    for (const id of currentDeleteIds) {
      await onDelete(id);
    }
    table.toggleAllRowsSelected(false);
    setShowDeleteConfirm(false);
    setCurrentDeleteIds([]);
  };

  const handleConfirmEdit = () => {
    onEdit(selectedIds);
    setShowEditModal(false);
  };

  return (
    <>
      <DataTableActionBar table={table} visible={selectedIds.length > 0}>
        <DataTableActionBarSelection table={table} />
        <Separator
          orientation="vertical"
          className="hidden data-[orientation=vertical]:h-5 sm:block"
        />
        <div className="flex items-center gap-1.5">
          <DataTableActionBarAction
            size="icon"
            tooltip="دانلود"
            isPending={isPending}
            onClick={handleExport}
          >
            <Download />
          </DataTableActionBarAction>

          {selectedIds.length > 0 && (
            <DataTableActionBarAction
              size="icon"
              tooltip="ویرایش"
              onClick={handleEditClick}
            >
              <Pencil />
            </DataTableActionBarAction>
          )}

          {selectedIds.length > 0 && (
            <DataTableActionBarAction
              size="icon"
              tooltip="حذف"
              onClick={handleDeleteClick}
            >
              <Trash2 />
            </DataTableActionBarAction>
          )}
        </div>
      </DataTableActionBar>

      <Modal
        title="حذف رکوردها"
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <div className="flex flex-col items-center gap-4">
          <p>
            آیا از حذف {currentDeleteIds.length} مورد انتخاب‌شده مطمئن هستید؟
            این عملیات قابل بازگشت نیست.
          </p>
          <div className="flex gap-2">
            <Button
              className="w-fit"
              variant="outline"
              isFilled
              onClick={handleConfirmDelete}
            >
              تایید
            </Button>
            <Button className="w-fit" variant="outline">
              انصراف
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="ویرایش گروهی"
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <div className="flex flex-col items-center gap-4">
          <p>می‌خواهید {selectedIds.length} مورد را ویرایش کنید؟</p>
          <div className="flex gap-2">
            <Button
              className="w-fit"
              variant="outline"
              isFilled
              onClick={handleConfirmEdit}
            >
              تایید
            </Button>
            <Button className="w-fit" variant="outline">
              انصراف
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
