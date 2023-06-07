import { AnkrProvider } from '@ankr.com/ankr.js';

const RPC_ENDPOINT =
  'https://rpc.ankr.com/multichain/249e6156637f0fd30fd92242ec1739e49a176a723f3894c4ae1e299c2fad9635';

const provider = new AnkrProvider(RPC_ENDPOINT);

export default provider;
