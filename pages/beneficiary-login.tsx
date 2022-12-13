import clsx from 'clsx';
import Button from 'components/button/Button';
import Carousel from 'components/Carousel/Carousel';
import TextField from 'components/Input/TextField';
import Image from 'next/image';
import assets from 'public/images/assets.png';
import invest from 'public/images/invest.png';
import recovery from 'public/images/recovery.png';
import tokensVault from 'public/images/tokensVault.png';

const BeneficiaryLogin = () => {
  const slides = [
    {
      image: <Image key={0} src={recovery} alt="inheritance" />,
      top: 'top-36',
      title: 'Inheritance without problems',
      description: (
        <>
          Transfer your assets on web3 to your loved ones securely and easily
          through a <strong>multisig process.</strong>
        </>
      ),
    },
    {
      image: <Image key={0} src={tokensVault} alt="Carousel 1" />,
      top: 'top-24',
      title: 'Protect your Wealth on Web3',
      description: (
        <>
          Use our multi-chain protocol, that combines DeFi with a non custodial
          solution to{' '}
          <strong>
            protect, manage and growth your assets in case of emergency, error
            or death.
          </strong>
        </>
      ),
    },
    {
      image: <Image key={0} src={assets} alt="Carousel 1" />,
      top: 'top-11',
      title: 'Manage your assets easy',
      description: (
        <>
          Track your entire crypto portfolio across every wallet you own and
          manage your <strong>tokens, NFTs or DeFi activity.</strong>
        </>
      ),
    },
    {
      image: <Image key={0} src={invest} alt="Carousel 1" />,
      top: 'top-9',
      title: 'Grow your capital safe',
      description: (
        <>
          <strong>
            Earn yield on security vaults with selected DeFi protocols where you
          </strong>
          can see their level of risk on your favorite chains.
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-5 text-center">
      <div className="col-span-2 h-screen bg-white">
        <div className="mx-auto max-w-[369px]">
          <div className="relative mx-auto mt-24 h-14 w-[216px]">
            <Image
              src="/logos/peace-logo-216:54.png"
              alt="peace"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3 className="h2 text-gradient mt-32 inline-block">Log in</h3>
          <p className="mt-7">Access as Beneficiary to claim your plan</p>
          <Button
            size="lg"
            className="mt-14"
            variant="fancy"
            text="Connect wallet"
            onClick={() => {}}
          />
          {/* eslint-disable-next-line prettier/prettier */}
          <span className="mt-12 block text-gray-500">or continue with</span>
          <span className="mt-8 inline-block">WEB2 LOGIN PLACEHOLDER</span>
          <TextField
            className="mt-7 [&>input]:w-full [&>input]:bg-white"
            placeHolder="Email"
          />
          <Button
            size="lg"
            variant="fancy"
            text="Log In"
            onClick={() => {}}
            className="mt-8"
          />
        </div>
      </div>
      <Carousel slideInterval={5000} className="relative col-span-3">
        {slides.map((slide) => {
          return (
            <div key={slide.title} className="grid h-full grid-rows-3">
              <div className="row-span-2">
                <div className={clsx(slide.top, 'relative')}>{slide.image}</div>
              </div>
              <div className="row-span-1">
                <h2 className="h2 text-gradient inline-block">
                  Inheritance without problems
                </h2>
                <p className="mx-auto mt-10 max-w-lg text-blue-gray">
                  Transfer your assets on web3 to your loved ones securely and
                  easily through a <strong>multisig process.</strong>
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BeneficiaryLogin;
