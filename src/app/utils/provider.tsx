import { AnkrProvider } from '@ankr.com/ankr.js';

const provider = new AnkrProvider(process.env.RPC_ENDPOINT || '');

export default provider;
