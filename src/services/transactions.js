import Blockchain from 'vanillachain-core';

import { C, ERROR } from '../common';

const { BLOCKCHAIN, KEY } = C;

export default ({ props, session }, res) => {
  const {
    latestTransaction,
    year = new Date().getFullYear().toString(),  // eslint-disable-line
  } = props;

  let { blocks: txs } = new Blockchain({
    ...BLOCKCHAIN, file: session.hash, key: KEY, readMode: true,
  });

  if (latestTransaction) {
    const index = txs.findIndex(({ hash }) => hash === latestTransaction);

    if (index < 0) return ERROR.NOT_FOUND(res);
    txs = txs.slice(index + 1, txs.length);
  }

  return res.json({
    txs: txs.map(({ hash, timestamp, data }) => ({ hash, timestamp: data.timestamp || timestamp, ...data })),
  });
};
