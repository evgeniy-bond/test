interface DetailsLinkParams {
  from: string;
  blockchain: string;
  hash?: string;
}

export const getDetailsLink = ({ from, blockchain, hash }: DetailsLinkParams) => {
  return `/address/${from}/${blockchain}/${hash}`;
};
