import {
  faCircleInfo,
  faEdit,
  faGripLines,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchBalance,
  prepareWriteContract,
  PrepareWriteContractResult,
  writeContract,
} from '@wagmi/core';
import Button from 'components/button/Button';
import CircleProgress from 'components/circleProgress/CircleProgress';
import Dialog from 'components/dialog/Dialog';
import DialogTitle from 'components/dialog/DialogTitle';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import TextField from 'components/Input/TextField';
import Listbox from 'components/listbox/Listbox';
import ListboxOption from 'components/listbox/ListboxOption';
import Stack from 'components/stack/Stack';
import useApproveToken from 'hooks/useApproveToken';
import useGetDynamicVaults from 'hooks/utils/useGetDynamicVaults';
import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { formatAddress } from 'utils/formatters';
import tokenMappings from 'utils/helpers/tokenMappings';
import wagmiChainNameMappings from 'utils/helpers/wagmiChainNameMappings';
import topTokens from 'utils/topTokens';
import { useNetwork, useWaitForTransaction } from 'wagmi';
import { Address, DynamicVault } from '../../../utils/Types';

type Props = {
  dynamicVault: Partial<DynamicVault> | undefined;
  dialogContent: 'edit assets' | 'edit heirs' | undefined;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const ProtectionActiveDialog = ({
  dynamicVault,
  dialogContent,
  isDialogOpen,
  setIsDialogOpen,
}: Props) => {
  const [tokenBalances, setTokenBalances] = useState<{
    token: {
      balance: number;
    };
  }>();
  const [approvalAddress, setApprovalAddress] = useState<Address>();

  const { prepareTransact: prepareApproveToken, transact: approveToken } =
    useApproveToken(approvalAddress);
  const waitApproveToken = useWaitForTransaction({
    hash: approveToken?.data?.hash,
  });

  const removeBeneficiariesConfigs = useRef<{
    address: { config: PrepareWriteContractResult<any, 'removeBeneficiary'> };
  }>();

  const { chain } = useNetwork();

  const network =
    wagmiChainNameMappings[
      chain?.name as keyof typeof wagmiChainNameMappings
    ] ?? 'moonbeam';

  const fetchBalancesAsync = useCallback(
    async (tokens: string[]) => {
      const balances: any = {};
      tokens.map(async (token) => {
        let balance: any;
        if (
          network in tokenMappings[token as keyof typeof tokenMappings].networks
        ) {
          balance = await fetchBalance({
            address: (tokenMappings[token as keyof typeof tokenMappings] as any)
              .networks[network],
          });
        }
        balances[token as keyof typeof balances] = { balance: balance ?? '0' };
      });
      setTokenBalances(balances);
    },
    [network]
  );

  useEffect(() => {
    if (isDialogOpen) {
      fetchBalancesAsync(topTokens);
    }
  }, [fetchBalancesAsync, isDialogOpen]);

  useEffect(() => {
    if (prepareApproveToken.isSuccess && approveToken.isIdle) {
      approveToken.write?.();
    }
  }, [approveToken, prepareApproveToken.isSuccess]);

  const handleApproveToken = (address: Address) => {
    if (approvalAddress === address) {
      approveToken.write?.();
    }
    setApprovalAddress(address);
  };

  const handleRemoveBeneficiary = async (address: Address) => {
    if (removeBeneficiariesConfigs.current) {
      await writeContract(
        removeBeneficiariesConfigs.current[
          address as keyof typeof removeBeneficiariesConfigs.current
        ].config
      );
    }
  };

  const dynamicVaults = useGetDynamicVaults();

  const testament = dynamicVault?.testament;

  const fetchRemoveBeneficiariesConfig = useCallback(async () => {
    let configs: {
      address: {
        config: PrepareWriteContractResult<any, 'removeBeneficiary'>;
      };
    } = {
      address: {
        config: undefined as unknown as PrepareWriteContractResult<
          any,
          'removeBeneficiary'
        >,
      },
    };

    if (!testament || !dynamicVaults || !dynamicVault) return;
    await Promise.all(
      testament.beneficiaries.map(async (beneficiary) => {
        const prepareTransact = await prepareWriteContract({
          address: dynamicVaults.address,
          abi: dynamicVaults.abi,
          functionName: 'removeBeneficiary',
          args: [beneficiary.address_],
        });
        configs[beneficiary.address_ as keyof typeof configs] = {
          config: prepareTransact,
        };
      })
    );
    removeBeneficiariesConfigs.current = configs;
  }, [dynamicVault, dynamicVaults, testament]);

  useEffect(() => {
    fetchRemoveBeneficiariesConfig();
  }, [dynamicVaults, dynamicVault, fetchRemoveBeneficiariesConfig]);

  const displayPriceTokens = [{ value: 'USD' }];

  const renderDialogContent = () => {
    if (dialogContent === undefined || dynamicVault === undefined) {
      return <DialogTitle>Loading...</DialogTitle>;
    }
    if (dialogContent === 'edit assets') {
      return (
        <>
          <DialogTitle onClose={() => setIsDialogOpen(false)}></DialogTitle>
          <Stack direction="row" className="justify-between">
            <div>
              <span className="subtitle block">Assets Protected</span>
              <span className="text-lg">1 ERC-20</span>
            </div>
            <Listbox className="!w-24">
              {displayPriceTokens.map((token, index) => {
                return <ListboxOption key={index}>{token.value}</ListboxOption>;
              })}
            </Listbox>
          </Stack>
          <p className="mt-8 text-sm">
            You will need to approve the expense of each token to let your heir
            claim after the inactivity time passed.
          </p>
          <TextField
            startAdornment="search"
            className="mt-6"
            placeHolder="Search by name or paste address"
          />
          <div className="mt-8 grid items-center !gap-5 text-sm text-blue-gray [grid-template-columns:repeat(14,minmax(0,1fr))]">
            <FontAwesomeIcon
              icon={faGripLines}
              style={{ gridColumn: 'span 1 / span 1', margin: 'auto' }}
            />
            <span className="col-span-3">Asset</span>
            <span className="col-span-3">Balance</span>
            <div className="col-span-3 flex gap-1">
              <span>Protected</span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <Button
              variant="basic"
              text="Bulk Approval"
              className="col-span-4 py-1 px-2"
            />
          </div>

          <div className="mt-6 space-y-6">
            {topTokens.map((token) => {
              const tokenMapping =
                tokenMappings[token as keyof typeof tokenMappings];
              const address = tokenMapping.networks[
                network as keyof typeof tokenMapping.networks
              ].address as Address;
              const loading =
                waitApproveToken.isLoading ||
                (approveToken.isLoading && approvalAddress === address);
              return (
                <div
                  key={token}
                  className="grid items-center gap-5 [grid-template-columns:repeat(14,minmax(0,1fr))]"
                >
                  <div className="relative col-span-1 h-6 w-6 shrink-0">
                    <Image
                      src={tokenMapping ? tokenMapping.route : '/'}
                      alt={token}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="relative col-span-3 text-sm">
                    <span className="block capitalize">{token}</span>
                    <span className="subtitle">{tokenMapping.symbol}</span>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span>
                      {(tokenBalances &&
                        Object.keys(tokenBalances).length &&
                        tokenBalances[token as keyof typeof tokenBalances]
                          .balance) ??
                        'loading...'}
                    </span>
                    <span className="subtitle block">$0.00</span>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span>
                      {(tokenBalances &&
                        Object.keys(tokenBalances).length &&
                        tokenBalances[token as keyof typeof tokenBalances]
                          .balance) ??
                        'loading...'}
                    </span>

                    <span className="subtitle block">$0.00</span>
                  </div>
                  <Button
                    variant="primary"
                    text={loading ? 'loading...' : 'Approve Token'}
                    disabled={loading}
                    className="col-span-4 py-3"
                    onClick={() => {
                      loading ? null : handleApproveToken(address);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (dialogContent === 'edit heirs') {
      return (
        <>
          <DialogTitle onClose={() => setIsDialogOpen(false)}></DialogTitle>
          <Stack direction="row" className="justify-between">
            <div>
              <span className="subtitle block">Your Heirs</span>
              <span className="text-lg">2 Beneficiaries</span>
            </div>
          </Stack>
          <p className="mt-8 text-sm">
            Add, remove and replace or rename existing owners. Owner names are
            only stored locally and will never be shared with us or any third
            parties.
          </p>
          <div className="mt-8 grid items-center !gap-5 text-sm text-blue-gray [grid-template-columns:repeat(14,minmax(0,1fr))]">
            <FontAwesomeIcon
              icon={faGripLines}
              style={{ gridColumn: 'span 1 / span 1', margin: 'auto' }}
            />
            <span className="col-span-3">Name</span>
            <span className="col-span-3">Address</span>
            <div className="col-span-3 flex gap-1">
              <span>% Funds</span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <HorizontalRule className="mt-3" />

          <div className="mt-6 space-y-6">
            {testament?.beneficiaries.map((beneficiary, index) => {
              const claimant = testament.claimant;
              return (
                <div
                  key={index}
                  className="grid items-center gap-5 [grid-template-columns:repeat(14,minmax(0,1fr))]"
                >
                  <div className="relative col-span-1 h-6 w-6 shrink-0">
                    <Image
                      src="/images/astronaut.png"
                      alt="astronaut"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="relative col-span-3 text-sm">
                    <span className="block capitalize">
                      {beneficiary.name ?? ''}
                    </span>
                    <span className="subtitle">
                      {beneficiary?.address_ === claimant
                        ? 'Protector'
                        : 'Beneficiary'}
                    </span>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span>{formatAddress(beneficiary?.address_)}</span>
                    <span className="subtitle block">{network}</span>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span>
                      <>
                        {parseInt(
                          beneficiary?.inheritancePercentage.toString() ?? '0'
                        )}{' '}
                        %
                      </>
                    </span>

                    <span className="subtitle block">$0.00</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="col-span-2"
                    style={{ cursor: 'pointer' }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="col-span-2"
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() =>
                      handleRemoveBeneficiary(beneficiary.address_)
                    }
                  />
                </div>
              );
            })}
            <Stack direction="row" className="mt-4 justify-between">
              <CircleProgress className="text-sm">
                <div className="relative h-[83px] w-[83px]">
                  <Image
                    src="/icons/vault.png"
                    alt="inheritance complete"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>Multisig Protection</span>
                <span className="block text-purple-900">1 Protector</span>
              </CircleProgress>
              <div className="flex grow flex-col items-center space-y-4">
                <Button variant="primary" text="Edit Multisig" size="sm" />
                <Button variant="basic" text="Cancel Protection" size="sm" />
              </div>
            </Stack>
          </div>
        </>
      );
    }
  };

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      className="[&>div:nth-child(2)>div>div>h3]:text-left"
      size="lg"
    >
      {renderDialogContent()}
    </Dialog>
  );
};

export default ProtectionActiveDialog;
