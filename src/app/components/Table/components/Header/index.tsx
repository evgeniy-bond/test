import { ReactNode } from 'react';

import styles from '../../Table.module.css';

export interface Column<T> {
  header: ReactNode;
  name: keyof T | string;
  render?: (row: T, rowIndex: number) => ReactNode;
  width?: string;
  styles?: Record<string, string>;
  headerStyles?: Record<string, string>;
}

export type HeaderClickHandler = (columnIndex: number) => void;

interface HeaderProps<T> {
  columns: Column<T>[];
  onHeaderClick?: HeaderClickHandler;
}

export default function Header<T>({ columns, onHeaderClick }: HeaderProps<T>) {
  return (
    <div className={styles.head}>
      {columns.map((column, index) => {
        const { header, width, headerStyles = {} } = column;

        return (
          <div
            style={{ ...headerStyles, width, minWidth: width }}
            key={index}
            className={styles.cell}
            onClick={() =>
              typeof onHeaderClick === 'function' ? onHeaderClick(index) : null
            }
          >
            {header}
          </div>
        );
      })}
    </div>
  );
}
