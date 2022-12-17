import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleProgress from '../components/circleProgress/CircleProgress';

import { Dialog as HeadlessDialog } from '@headlessui/react';
import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import Dialog from 'components/dialog/Dialog';
import Section from 'components/Section/Section';
import Stack from 'components/stack/Stack';
import Tabs from 'components/tabs/Tabs';
import { NextPage } from 'next';
import Image from 'next/image';

import axios from 'axios';
import GeneralDefaultConnectWallet from 'components/general/defaultConnectWallet/DefaultConnectWallet';
import GeneralDefaultConnectWalletDescription from 'components/general/defaultConnectWallet/Description';
import GeneralDefaultConnectWalletTitle from 'components/general/defaultConnectWallet/Title';
import History from 'components/myPlans/History';
import InheritancePlan from 'components/myPlans/InheritancePlan';
import Tab from 'components/tabs/Tab';
import TabGroup from 'components/tabs/TabGroup';
import TabPanel from 'components/tabs/TabPanel';
import TabPanels from 'components/tabs/TabPanels';
import UILoading from 'components/UI/Loading';
import { BigNumber } from 'ethers';
import useSignSucceed from 'hooks/useSignSucceed';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import menuItems from 'utils/menuItems';
import { UserPlans } from 'utils/Types';
import { Address, useAccount } from 'wagmi';
import useGetDynamicVault from '../hooks/useGetDynamicVault';
import recovery from '../public/images/recovery.png';

const MyPlans: NextPage = () => {
  const { address } = useAccount();

  const [userPlans, setUserPlans] = useState<UserPlans>();
  const [activeClaim, setActiveClaim] = useState<
    'Inheritance Plan' | 'Backup Wallet'
  >();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<
    'Complete Multisig' | 'Inheritance Complete'
  >();
  const [succeeded, setSucceeded] = useState<boolean>(false);

  const [beneficiary, setBeneficiary] = useState<{
    address: Address;
    dynamicVaults: {
      _id: string;
      dynamicVaultOwner: Address;
      testament: {
        _id: string;
        signatures: {
          address: Address;
          signature: string | undefined;
          _id: string;
        }[];
      };
    }[];
  }>();

  // for demo purposes
  const [fakeSignersAmount, setFakeSignersAmount] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    setUserPlans(['Inheritance Plan']);
  }, []);

  // prepare testament data
  // Todo: what happens if a beneficiary is part of multiple testaments

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchTestamentSignatures = async () => {
      try {
        const beneficiary = await axios
          .get('api/beneficiary/' + address)
          .then((res) => res.data.beneficiary);
        setBeneficiary(beneficiary);
      } catch (error) {
        return error;
      }
    };
    fetchTestamentSignatures();
  }, [address]);

  const dynamicVault = useGetDynamicVault(
    beneficiary?.dynamicVaults[0].dynamicVaultOwner
  );
  const testament = dynamicVault?.data?.testament;

  useEffect(() => {
    if (dynamicVault.data) {
      setSucceeded(dynamicVault.data.testament.succeeded);
    }
  }, [dynamicVault.data]);

  let beneficiariesAmount: number = 1;
  if (testament && testament.beneficiaries) {
    beneficiariesAmount = testament.beneficiaries.length;
  }

  let signersAmount = 0;
  signersAmount;

  const testamentSignatures:
    | {
        address: Address;
        signature: string | undefined;
        _id: string;
      }[]
    | undefined = beneficiary?.dynamicVaults[0]?.testament?.signatures;

  useEffect(() => {
    let signersAmount = 0;
    signersAmount;

    testamentSignatures?.map((signature) => {
      if (signature.signature) {
        signersAmount += 1;
      }
      if (signature.address === address && signature.signature) {
        setFakeSignersAmount(beneficiariesAmount);
        return;
      } else {
        setFakeSignersAmount(beneficiariesAmount - 1);
      }
    });
  }, [address, beneficiariesAmount, testamentSignatures]);

  // end prepare testament data

  const closeCompleteSignatureModal = () => {
    setIsDialogOpen(false);
  };
  const { message: signatureMessage, transact: signSucceed } = useSignSucceed(
    address ?? '0x'
  );

  useEffect(() => {
    if (signSucceed.isSuccess) {
      setFakeSignersAmount((prev) => (prev ? prev + 1 : 1));
      setFakeSignersAmount(beneficiariesAmount);
      axios.put('/api/testament-signatures', {
        testamentId: beneficiary?.dynamicVaults[0]?.testament._id,
        beneficiaryAddress: address,
        signature: signSucceed.data,
        message: signatureMessage,
      });
    }
  }, [
    address,
    beneficiary?.dynamicVaults,
    signatureMessage,
    signSucceed.data,
    signSucceed.isSuccess,
    signSucceed.status,
    beneficiariesAmount,
  ]);

  const handleSignSucceed = () => {
    if (address) {
      signSucceed.signMessage();
    }
  };

  const updateDialogContent = (
    content: 'Complete Multisig' | 'Inheritance Complete'
  ) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const renderPage = () => {
    if (!address) {
      return (
        <GeneralDefaultConnectWallet>
          <Image src={recovery} alt="Tokens Vault" objectFit="contain" />
          <GeneralDefaultConnectWalletTitle>
            Claim without problems
          </GeneralDefaultConnectWalletTitle>
          <GeneralDefaultConnectWalletDescription>
            Recover your assets on web3 securely and easily through a{' '}
            <strong>multisig process.</strong>
          </GeneralDefaultConnectWalletDescription>
        </GeneralDefaultConnectWallet>
      );
    }

    if (!beneficiary) {
      return <span className="h3 !font-normal ">No active plans</span>;
    }

    if (!dynamicVault) {
      return <UILoading width={120} height={120} />;
    }

    if (!testament || testament.proofOfLife === BigNumber.from(0)) {
      return <span className="h3 !font-normal ">No active plans</span>;
    }

    return (
      <TabPanels>
        <TabPanel>
          {activeClaim === 'Inheritance Plan' ? (
            <InheritancePlan
              setSucceeded={setSucceeded}
              succeeded={succeeded}
              dynamicVaultOwner={beneficiary.dynamicVaults[0].dynamicVaultOwner}
              signersAmount={signersAmount}
              fakeSignersAmount={fakeSignersAmount}
              testament={testament}
              updateDialogContent={updateDialogContent}
              setActiveClaim={setActiveClaim}
            />
          ) : activeClaim === 'Backup Wallet' ? (
            <></>
          ) : (
            activeClaim === undefined && (
              <Section className="gap-20">
                {userPlans?.map((plan) => {
                  const { title, description, icon, myPlansButtonText } =
                    menuItems.Protection.subMenu[plan];
                  return (
                    <Box
                      key={title}
                      className="flex max-w-sm flex-col justify-between rounded-xl"
                    >
                      <Stack direction="row">
                        <div className="relative h-[96px] w-[86px] shrink-0">
                          <Image
                            src={icon}
                            alt={title}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="h4">{title}</h4>
                          <p>{description}</p>
                        </div>
                      </Stack>
                      <Button
                        text={myPlansButtonText}
                        variant="basic"
                        className="mt-6 w-full"
                        onClick={() => setActiveClaim(title as any)}
                      />
                    </Box>
                  );
                })}
              </Section>
            )
          )}
        </TabPanel>
        <TabPanel>
          <History />
        </TabPanel>
      </TabPanels>
    );
  };

  const renderDialogContent = () => {
    if (dialogContent === 'Complete Multisig') {
      return (
        <>
          <div className="mb-4 flex w-full justify-end">
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsDialogOpen(false)}
            />
          </div>
          <HeadlessDialog.Title as="h3" className="h3 text-center">
            Complete Multisig
          </HeadlessDialog.Title>
          <Stack className="mt-4 mb-5 items-center !gap-10">
            <HeadlessDialog.Description>
              <p className="text-sm">
                Unlock this inheritance plan and transfer the funds to the heirs
                completing the multisig process sign.
              </p>
            </HeadlessDialog.Description>
            <CircleProgress
              className="!w-80"
              progress={(fakeSignersAmount * 100) / beneficiariesAmount}
            >
              <div className="text-center">
                <div className="relative h-[120px] w-[120px] shrink-0">
                  <Image
                    src="/icons/vault.png"
                    alt="vault"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-sm">Multisig Protection</span>
                <span className="block text-sm text-purple-900">
                  {beneficiariesAmount} Protectors
                </span>
              </div>
            </CircleProgress>
            <Button
              text="Sign Now"
              variant="gradientBorder"
              size="sm"
              loading={signSucceed.isLoading}
              disabled={signSucceed.isLoading || signSucceed.isSuccess}
              onClick={() => {
                signSucceed.isLoading || signSucceed.isSuccess
                  ? null
                  : handleSignSucceed();
              }}
            />
          </Stack>
        </>
      );
    }

    if (dialogContent === 'Inheritance Complete') {
      return (
        <>
          <div className="mb-4 flex w-full justify-end">
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsDialogOpen(false)}
            />
          </div>
          <HeadlessDialog.Title as="h3" className="h3 text-center">
            The Inheritance is Complete
          </HeadlessDialog.Title>
          <Stack className="mt-4 mb-5 items-center !gap-10">
            <HeadlessDialog.Description>
              <p className="text-sm">
                The assets you were eligible has been successful transfer to
                your wallet, we will now remove all the protectors.
              </p>
            </HeadlessDialog.Description>
            <CircleProgress className="!w-80" progress={100}>
              <div className="text-center">
                <div className="relative mb-3 h-[115px] w-[196px] shrink-0">
                  <Image
                    src="/icons/inheritanceComplete.png"
                    alt="inheritance complete"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-sm">Successful transfer </span>
                <span className="block text-sm text-purple-900">of Wealth</span>
              </div>
            </CircleProgress>
            <Button
              text="Manage your Wealth"
              variant="gradientBorder"
              size="sm"
              onClick={() => router.push('/assets')}
            />
          </Stack>
        </>
      );
    }
  };

  return (
    <>
      {address ? (
        <TabGroup>
          <>
            <Stack direction="row">
              <Image
                src="/icons/inheritance-plan.png"
                alt="protection"
                objectFit="contain"
                height={96}
                width={86}
              />
              <h2 className="h2 text-gradient">Welcome to Claim Process</h2>
            </Stack>
            <Tabs className="my-10">
              <Tab>Pending Claims</Tab>
              <Tab>History</Tab>
            </Tabs>
          </>
          {renderPage()};
          <Dialog isOpen={isDialogOpen} onClose={closeCompleteSignatureModal}>
            {renderDialogContent()}
          </Dialog>
        </TabGroup>
      ) : (
        renderPage()
      )}
    </>
  );
};

export default MyPlans;
