'use client';

import React from 'react';
import { Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
}

export default function AdminTable<T>({ 
  data, 
  columns, 
  title, 
  subtitle, 
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  isLoading
}: AdminTableProps<T>) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col h-full">
      {(title || onSearch) && (
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-3">
            {onSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            )}
            <button className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              <Filter className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 dark:bg-neutral-800/30">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-full"></div>
                    </td>
                  ))}
                  {actions && <td className="px-6 py-4"><div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-16 ml-auto"></div></td>}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-4 text-sm ${col.className || ''}`}>
                      {typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-neutral-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Showing {data.length} records
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 disabled:opacity-50" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
