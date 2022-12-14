import {
  faCircleInfo,
  faEdit,
  faGripLines,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  prepareWriteContract,
  PrepareWriteContractResult,
  writeContract,
} from '@wagmi/core';
import axios from 'axios';
import Button from 'components/button/Button';
import Chip from 'components/Chip/Chip';
import Dialog from 'components/dialog/Dialog';
import DialogTitle from 'components/dialog/DialogTitle';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import TextField from 'components/Input/TextField';
import Listbox from 'components/listbox/Listbox';
import ListboxOption from 'components/listbox/ListboxOption';
import Stack from 'components/stack/Stack';
import Loading from 'components/UI/Loading';
import RadioGroup from 'components/UI/radio/RadioGroup';
import RadioOption from 'components/UI/radio/RadioOption';
import { BigNumber, ethers } from 'ethers';
import useApproveToken from 'hooks/useApproveToken';
import useCancelTestament from 'hooks/useCancelTestament';
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
import { useAccount, useNetwork } from 'wagmi';
import useGetBalances from '../../../hooks/useGetBalances';
import useUpdateBeneficiaries from '../../../hooks/useUpdateBeneficiaries';
import useUpdateInactivityMaximum from '../../../hooks/useUpdateInactivityMaximum';
import formatBigNumber from '../../../utils/helpers/formatBigNumber';
import {
  Address,
  Beneficiary,
  DynamicVault,
  Testament,
} from '../../../utils/Types';

type Props = {
  protectedTokens: Address[] | undefined;
  setProtectedTokens: Dispatch<SetStateAction<Address[] | undefined>>;
  dynamicVault: Partial<DynamicVault> | undefined;
  dialogContent: 'edit assets' | 'edit heirs' | 'edit time' | undefined;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  testament: Testament | undefined;
};

const ProtectionActiveDialog = ({
  protectedTokens,
  setProtectedTokens,
  dynamicVault,
  dialogContent,
  isDialogOpen,
  setIsDialogOpen,
  testament,
}: Props) => {
  const { address } = useAccount();
  const [approvalAddress, setApprovalAddress] = useState<Address>();
  const [edit, setEdit] = useState({
    status: [false],
  });

  console.log('a');

  const [beneficiaries, setBeneficiaries] = useState<
    (Beneficiary[] & { new?: boolean }) | []
  >([]);
  const [editedBeneficiaries, setEditedBeneficiaries] = useState<
    [string[], Address[], BigNumber[], BigNumber[]]
  >([[], [], [], []]);
  const [newInactivityTime, setNewInactivityTime] = useState<BigNumber>();

  const { transact: cancelTestament, transaction: cancelTestamentTransaction } =
    useCancelTestament();

  const {
    prepareTransact: prepareApproveToken,
    transact: approveToken,
    transaction: approveTokenTransaction,
  } = useApproveToken(approvalAddress);

  useEffect(() => {
    if (approveTokenTransaction.isSuccess) {
      if (approvalAddress) {
        setProtectedTokens((prev) => [...(prev ?? []), approvalAddress]);
        axios
          .post('http://localhost:3000/api/testament/protected-tokens', {
            dynamicVaultOwner: address,
            newProtectedTokens: [approvalAddress],
          })
          .catch((error) => {
            return error;
          });
        setApprovalAddress(undefined);
      }
    }

    if (['error', 'success'].includes(approveTokenTransaction.status)) {
      approveToken.reset();
      setApprovalAddress(undefined);
    }
  }, [
    address,
    approvalAddress,
    approveToken,
    approveTokenTransaction.isSuccess,
    approveTokenTransaction.status,
    setProtectedTokens,
  ]);

  const removeBeneficiariesConfigs = useRef<{
    address: { config: PrepareWriteContractResult<any, 'removeBeneficiary'> };
  }>();

  const { chain } = useNetwork();

  const {
    prepareTransact: prepareUpdateBeneficiaries,
    transact: updateBeneficiaries,
    transaction: updateBeneficiariesTransaction,
  } = useUpdateBeneficiaries(...editedBeneficiaries);

  const {
    prepareTransact: prepareUpdateInactivityMaximum,
    transact: updateInactivityMaximum,
  } = useUpdateInactivityMaximum(newInactivityTime);

  useEffect(() => {
    if (
      prepareUpdateInactivityMaximum.isSuccess &&
      updateInactivityMaximum.isIdle
    ) {
      updateInactivityMaximum.write?.();
    }
  }, [prepareUpdateInactivityMaximum.isSuccess, updateInactivityMaximum]);

  useEffect(() => {
    if ((prepareUpdateBeneficiaries.isSuccess, updateBeneficiaries.isIdle)) {
      updateBeneficiaries.write?.();
    }
  }, [editedBeneficiaries, updateBeneficiaries, prepareUpdateBeneficiaries]);

  const networkName =
    wagmiChainNameMappings[chain?.name as keyof typeof wagmiChainNameMappings];
  const tokensAddresses = [
    ...topTokens.map(
      (token) =>
        tokenMappings[token as keyof typeof tokenMappings].networks[
          networkName as keyof typeof tokenMappings.bitcoin.networks
        ].address
    ),
  ];
  const tokenBalances = useGetBalances(address, tokensAddresses);

  const network =
    wagmiChainNameMappings[
      chain?.name as keyof typeof wagmiChainNameMappings
    ] ?? 'moonbeam';

  useEffect(() => {
    if (
      prepareApproveToken.isSuccess &&
      approveToken.isIdle &&
      approveTokenTransaction.isIdle
    ) {
      approveToken.write?.();
    }
  }, [
    approveToken,
    approveTokenTransaction.isIdle,
    prepareApproveToken.isSuccess,
  ]);

  const handleApproveToken = (address: Address) => {
    setApprovalAddress(address);
  };

  const handleRemoveBeneficiary = async (address: Address) => {
    beneficiaries.map(async (beneficiary) => {
      if (beneficiary.address_ === address) {
        if (beneficiary.new) {
          setBeneficiaries(
            beneficiaries.filter(
              (beneficiary) => beneficiary.address_ !== address
            )
          );
        } else {
          if (removeBeneficiariesConfigs.current) {
            await writeContract(
              removeBeneficiariesConfigs.current[
                address as keyof typeof removeBeneficiariesConfigs.current
              ].config
            );
          }
        }
      }
    });
  };

  const handleCancelTestament = () => {
    cancelTestament.write?.();
  };

  const dynamicVaults = useGetDynamicVaults();

  useEffect(() => {
    if (dynamicVault?.testament && !beneficiaries.length) {
      setBeneficiaries(dynamicVault.testament.beneficiaries as Beneficiary[]);
      setEdit({
        status: beneficiaries.map(() => false),
      });
    }
  }, [beneficiaries, dynamicVault]);

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

  // hard-coded for now
  const prices: { [key: string]: number } = {
    ether: 1220,
    tether: 1,
    sushi: 1.41,
    maker: 500,
  };

  const handleAddAnotherWallet = () => {
    setBeneficiaries([
      ...beneficiaries,
      {
        name: '',
        address_: '0x',
        inheritancePercentage: BigNumber.from(0),
        new: true,
      },
    ]);
    setEdit({
      status: [...edit.status, false],
    });
  };

  const handleEditBeneficiaries = (e: React.FormEvent) => {
    e.preventDefault();

    let { names, addresses, inheritancePercentages } =
      e.target as typeof e.target & {
        names: { value: string } | { value: string[] };
        addresses: { value: string } | { value: string[] };
        inheritancePercentages: { value: string } | { value: string[] };
      };

    let processedNames: string[] = [];
    let processedAddresses: Address[] = [];
    let processedInheritancePercentages: BigNumber[] = [];

    processedNames = (
      names
        ? names.value !== ''
          ? [names.value]
          : Object.values(names).map((name, index) => {
              if (name !== beneficiaries[index]?.name) {
                return name.value;
              }
            })
        : []
    ) as string[];

    processedAddresses = (
      addresses
        ? addresses.value !== ''
          ? [addresses.value]
          : Object.values(addresses).map((address, index) => {
              if (address !== beneficiaries[index]?.address_) {
                return address.value;
              }
            })
        : []
    ) as Address[];

    processedInheritancePercentages = (
      inheritancePercentages
        ? inheritancePercentages.value !== ''
          ? [inheritancePercentages.value]
          : Object.values(inheritancePercentages).map(
              (inheritancePercentage, index) => {
                if (
                  BigNumber.from(inheritancePercentage.value) !==
                  beneficiaries[index].inheritancePercentage
                ) {
                  return BigNumber.from(inheritancePercentage.value);
                }
              }
            )
        : []
    ) as BigNumber[];

    const indexes =
      names?.value !== ''
        ? [BigNumber.from(0)]
        : Object.values(names).map((_, index) => BigNumber.from(index));

    setEditedBeneficiaries([
      processedNames,
      processedAddresses,
      processedInheritancePercentages,
      indexes,
    ]);
  };

  const handleCloseDialog = () => {
    setBeneficiaries(testament?.beneficiaries as Beneficiary[]);
    setEdit({
      status: [],
    });
    setIsDialogOpen(false);
  };

  const handleInactivityTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { newInactivityTime } = e.target as typeof e.target & {
      newInactivityTime: { value: string };
    };

    setNewInactivityTime(BigNumber.from(newInactivityTime.value));
  };

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
            {topTokens.map((token, index) => {
              const tokenMapping =
                tokenMappings[token as keyof typeof tokenMappings];
              const address = tokenMapping.networks[
                network as keyof typeof tokenMapping.networks
              ].address as Address;
              const loading =
                approvalAddress === address &&
                (approveTokenTransaction.isLoading || approveToken.isLoading);

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
                      {(tokenBalances.data &&
                        formatBigNumber(tokenBalances.data[index])) ??
                        'loading...'}
                    </span>
                    <span className="subtitle block">
                      $
                      {(tokenBalances.data &&
                        +formatBigNumber(tokenBalances.data[index]) *
                          prices[token]) ??
                        '0.00'}
                    </span>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span>
                      {(tokenBalances.data &&
                        formatBigNumber(tokenBalances.data[index])) ??
                        'loading...'}
                    </span>

                    <span className="subtitle block">
                      $
                      {(tokenBalances.data &&
                        +formatBigNumber(tokenBalances.data[index]) *
                          prices[token]) ??
                        '0.00'}
                    </span>
                  </div>
                  {protectedTokens?.some((token) => token === address) ? (
                    <Chip
                      text={'Protected'}
                      className="col-span-4 h-12 py-0 "
                    />
                  ) : (
                    <Button
                      variant="primary"
                      loading={loading}
                      disabled={loading}
                      className="col-span-4 h-12 py-0"
                      onClick={() => {
                        loading ? null : handleApproveToken(address);
                      }}
                    >
                      {loading ? <Loading /> : <span>Approve Token</span>}
                    </Button>
                  )}
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

          <form
            onSubmit={(e) => handleEditBeneficiaries(e)}
            className="mt-6 space-y-6"
          >
            {beneficiaries &&
              beneficiaries.map((beneficiary, index) => {
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
                    <div className="relative col-span-3 text-sm  ">
                      {edit.status[index] ? (
                        <TextField
                          placeHolder={'Name'}
                          className="[&>input]:py-1 [&>input]:px-2"
                          name="names"
                          defaultValue={beneficiary.name && beneficiary.name}
                        />
                      ) : (
                        <span className="block capitalize">
                          {beneficiary.name === '' ? 'Name' : beneficiary.name}
                        </span>
                      )}
                      <span className="subtitle">Beneficiary</span>
                    </div>

                    <div className="col-span-3 text-sm">
                      {edit.status[index] ? (
                        <TextField
                          placeHolder={'Address'}
                          className="[&>input]:py-1 [&>input]:px-2"
                          name="addresses"
                          defaultValue={
                            beneficiary.address_ !==
                            ethers.constants.AddressZero
                              ? beneficiary?.address_
                              : undefined
                          }
                        />
                      ) : (
                        <span>
                          {formatAddress(
                            beneficiary?.address_ ??
                              ethers.constants.AddressZero
                          )}
                        </span>
                      )}
                      <span className="subtitle block">{network}</span>
                    </div>
                    <div className="col-span-3 text-sm">
                      {edit.status[index] ? (
                        <TextField
                          placeHolder={'Percentage'}
                          className="[&>input]:py-1 [&>input]:px-2"
                          type="number"
                          name="inheritancePercentages"
                          defaultValue={
                            beneficiary?.inheritancePercentage.toString() ??
                            undefined
                          }
                        />
                      ) : (
                        <span>
                          <>
                            {parseInt(
                              beneficiary?.inheritancePercentage.toString() ??
                                '0'
                            )}{' '}
                            %
                          </>
                        </span>
                      )}

                      <span className="subtitle block">$0.00</span>
                    </div>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="col-span-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setEdit((prev) => {
                          let newEditStatus = [...prev.status];
                          newEditStatus[index] = !newEditStatus[index];

                          return {
                            status: newEditStatus,
                          };
                        })
                      }
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="col-span-2"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() =>
                        handleRemoveBeneficiary(beneficiary?.address_)
                      }
                    />
                  </div>
                );
              })}
            <div className="!mt-7 flex w-full justify-center">
              <Button
                variant="text"
                text="+ Add another wallet"
                onClick={() => handleAddAnotherWallet()}
              />
            </div>
            <Stack direction="row" className="!mt-20 justify-center ">
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={
                  edit.status.every((status) => !status) ||
                  updateBeneficiariesTransaction.isLoading ||
                  updateBeneficiaries.isLoading
                }
                loading={
                  updateBeneficiariesTransaction.isLoading ||
                  updateBeneficiaries.isLoading
                }
              >
                <span>Save Changes</span>
              </Button>
              <Button
                variant="basic"
                size="sm"
                onClick={() => handleCancelTestament()}
                loading={
                  cancelTestament.isLoading ||
                  cancelTestamentTransaction.isLoading
                }
              >
                {cancelTestament.isLoading ||
                cancelTestamentTransaction.isLoading ? (
                  <Loading width={48} height={48} />
                ) : (
                  <span>Cancel Protection</span>
                )}
              </Button>
            </Stack>
          </form>
        </>
      );
    }
    if (dialogContent === 'edit time') {
      return (
        <form onSubmit={(e) => handleInactivityTimeSubmit(e)}>
          <DialogTitle onClose={() => setIsDialogOpen(false)}></DialogTitle>
          <Stack direction="row" className="justify-between">
            <div>
              <span className="subtitle block">Inactivity Time</span>
              <span className="text-lg">365 Days</span>
            </div>
          </Stack>
          <p className="mt-8 text-sm">
            Select how many days need to pass before any beneficiary could
            authorize the multisig to distribute the funds.
          </p>
          <div className="mt-8 flex justify-between gap-16">
            <RadioGroup
              className="[&>div>div]:flex [&>div>div]:gap-10 [&>div>div]:space-y-0"
              name="newInactivityTime"
            >
              <RadioOption value={3}>3 Days</RadioOption>
              <RadioOption value={6}>6 Days</RadioOption>
              <RadioOption value={7}>9 Days</RadioOption>
            </RadioGroup>
          </div>

          <p className="mt-10">
            Add an email if you want to receive notifications that warn you days
            before the proof of life expires. (This mail will not direct you to
            Peace site)
          </p>

          <Stack direction="row" className="mt-10 flex justify-between !gap-20">
            <TextField placeHolder="youremail@example.com" required={false} />
            <Listbox>
              <ListboxOption>1 day before</ListboxOption>
            </Listbox>
          </Stack>
          <div className="mt-32 flex justify-center gap-10">
            <Button
              size="sm"
              variant="primary"
              type="submit"
              loading={
                updateInactivityMaximum.isLoading ||
                updateBeneficiariesTransaction.isLoading
              }
            >
              Edit Protection
            </Button>
            <Button
              size="sm"
              variant="basic"
              loading={
                cancelTestament.isLoading ||
                cancelTestamentTransaction.isLoading
              }
              onClick={() => handleCancelTestament()}
              type="button"
            >
              Cancel Protection
            </Button>
          </div>
        </form>
      );
    }
  };

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => handleCloseDialog()}
      className="[&>div:nth-child(2)>div>div>h3]:text-left"
      size="lg"
    >
      {renderDialogContent()}
    </Dialog>
  );
};

export default ProtectionActiveDialog;
