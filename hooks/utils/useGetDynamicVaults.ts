import { deployments as mumbai } from 'deployments/mumbai';
import { useNetwork } from 'wagmi';

const useGetDynamicVaults = () => {
  const { chain } = useNetwork();

  // to add other network, add a new condition here
  if (!chain) return;
  if (chain?.name === 'Polygon Mumbai' || chain?.name === 'Mumbai')
    return mumbai.contracts.DynamicVaults;
};

export default useGetDynamicVaults;
