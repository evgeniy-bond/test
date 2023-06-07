import provider from "@/app/utils/provider";

// Get token balances of address with USD prices among multiple chains
const balances = async () => {
    return await provider.getAccountBalance({
        blockchain: ['bsc', 'eth', 'polygon', 'avalanche'],
        walletAddress: '0xfa9019df60d3c710d7d583b2d69e18d412257617',
    });
};