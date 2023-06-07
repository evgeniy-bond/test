import React from 'react';

import styles from '../../Table.module.css';
import { Column } from '../Header';

export interface BodyProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function Body<T>({ data, columns }: BodyProps<T>) {
  return (
    <div className={styles.body}>
      {data.map((row, rowIndex: number) => {
        return (
          <div key={rowIndex} className={styles.row}>
            {columns.map((column, columnIndex) => {
              const { name, width, styles: columnsStyles = {} } = column;

              if (typeof column.render === 'function') {
                const { render } = column;

                return (
                  <div
                    key={`${rowIndex}${columnIndex}`}
                    style={{ ...columnsStyles, width, minWidth: width }}
                    className={styles.cell}
                  >
                    {render(row, rowIndex)}
                  </div>
                );
              }

              const nameAsString = String(name);

              return (
                <div
                  key={`${nameAsString}${rowIndex}${columnIndex}`}
                  style={{ ...columnsStyles, width, minWidth: width }}
                  className={styles.cell}
                >
                  {(row as any)[nameAsString]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
