import React from 'react';

import styles from './Table.module.css';
import Header, { HeaderClickHandler } from './components/Header';
import Body, { BodyProps } from './components/Body';

interface TableProps<T> extends BodyProps<T> {
  onHeaderClick?: HeaderClickHandler;
}

export default function Table<D>({
  data,
  columns,
  onHeaderClick,
}: TableProps<D>) {
  return (
    <div className={styles.root}>
      <Header columns={columns} onHeaderClick={onHeaderClick} />
      <Body data={data} columns={columns} />
    </div>
  );
}
