import { Transaction } from '@ankr.com/ankr.js';
import Link from 'next/link';

import { Column } from '@/app/components/Table/components/Header';
import { formatTimestampToDate } from '@/app/utils/formatTimestampToDate';
import { formatValueToNumber } from '@/app/utils/formatValueToNumber';
import { FormattedTransaction } from '../../utils';

export enum Sorting {
  asc = 'asc',
  desc = 'desc',
}

interface DetailsLinkParams {
  from: string;
  blockchain: string;
  hash?: string;
}

export const getDetailsLink = ({
  from,
  blockchain,
  hash,
}: DetailsLinkParams) => {
  return `/address/${from}/${blockchain}/${hash}`;
};

export function getColumns(_sortDirection: Sorting) {
  const columns: Column<Transaction>[] = [
    {
      header: 'hash',
      name: 'hash',
      width: '16%',
    },
    {
      header: 'from',
      name: 'from',
      width: '16%',
    },
    {
      header: 'to',
      name: 'to',
      width: '16%',
    },
    {
      header: 'value',
      name: 'value',
      width: '16%',
      headerStyles: {
        cursor: 'pointer',
      },
      render: ({ value }) => {
        return <div>{formatValueToNumber(value)}</div>;
      },
    },
    {
      header: 'date',
      name: 'timestamp',
      headerStyles: {
        cursor: 'pointer',
      },
      render: ({ timestamp }) => {
        return formatTimestampToDate(timestamp);
      },
      width: '16%',
      styles: {
        whiteSpace: 'pre-wrap',
      },
    },

    {
      header: 'link',
      name: 'link',
      render: ({ from, blockchain, hash }) => {
        const detailsLink = getDetailsLink({ from, blockchain, hash });

        return <Link href={detailsLink}>tx details</Link>;
      },
      width: '20%',
    },
  ];

  return columns;
}

export const VALUE_COLUMN_INDEX = 3;
export const TIMESTAMP_COLUMN_INDEX = 4;

export const sortByTimestamp = (
  transactions: FormattedTransaction[],
  isDescSorting: boolean,
) => {
  return transactions?.sort((a, b) => {
    if (isDescSorting) {
      return (
        a.timestampAsBigNumber.toNumber() - b.timestampAsBigNumber.toNumber()
      );
    }

    return (
      b.timestampAsBigNumber.toNumber() - a.timestampAsBigNumber.toNumber()
    );
  });
};

export const sortByValue = (
  transactions: FormattedTransaction[],
  isDescSorting: boolean,
) => {
  return transactions?.sort((a, b) => {
    if (isDescSorting) {
      return a.valueAsBigNumber.toNumber() - b.valueAsBigNumber.toNumber();
    }

    return b.valueAsBigNumber.toNumber() - a.valueAsBigNumber.toNumber();
  });
};
