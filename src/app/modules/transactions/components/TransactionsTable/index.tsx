import { useCallback, useMemo, useState } from 'react';

import styles from './TransactionsTable.module.css';
import Table from '@/app/components/Table';
import {
  Sorting,
  TIMESTAMP_COLUMN_INDEX,
  VALUE_COLUMN_INDEX,
  getColumns,
  sortByTimestamp,
  sortByValue,
} from './utils';
import { FormattedTransaction } from '../../utils';

interface TransactionsTableProps {
  transactions?: FormattedTransaction[];
}

interface SortingParams {
  sortDirection: Sorting;
  transactions: FormattedTransaction[];
  columnIndex?: number;
}

const DEFAULT_SORTING = {
  sortDirection: Sorting.desc,
  transactions: [],
};

const getDefaultSorting = (transactions: FormattedTransaction[]) => {
  return {
    ...DEFAULT_SORTING,
    transactions,
  };
};

export default function TransactionsTable({
  transactions = [],
}: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingParams>(
    getDefaultSorting(transactions),
  );

  const columns = useMemo(
    () => getColumns(sorting.sortDirection),
    [sorting.sortDirection],
  );

  const handleHeaderClick = useCallback((columnIndex: number) => {
    if (columnIndex === TIMESTAMP_COLUMN_INDEX) {
      setSorting(prevSorting => {
        const isDescSorting = prevSorting.sortDirection === Sorting.desc;

        return {
          sortDirection: isDescSorting ? Sorting.asc : Sorting.desc,
          transactions: sortByTimestamp(
            prevSorting.transactions,
            isDescSorting,
          ),
          columnIndex,
        };
      });
    }

    if (columnIndex === VALUE_COLUMN_INDEX) {
      setSorting(prevSorting => {
        const isDescSorting = prevSorting.sortDirection === Sorting.desc;

        return {
          sortDirection: isDescSorting ? Sorting.asc : Sorting.desc,
          transactions: sortByValue(
            prevSorting.transactions,
            isDescSorting,
          ),
          columnIndex,
        };
      });
    }
  }, []);

  const { transactions: sortedTransactions } = sorting;

  if (!Array.isArray(sortedTransactions) || sortedTransactions.length === 0) {
    return <div>No Transactions for this address</div>;
  }

  return (
    <div className={styles.root}>
      <Table
        data={sortedTransactions}
        columns={columns}
        onHeaderClick={handleHeaderClick}
      />
    </div>
  );
}
