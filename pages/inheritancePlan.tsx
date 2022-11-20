import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Caption from 'components/Caption/Caption';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import SecondaryButton from 'components/SecondaryButton/SecondaryButton';
import Section from 'components/Section/Section';
import Title from 'components/Title/Title';
import { FC } from 'react';

const CreatePlan: FC = () => {
  return (
    <Section className="flex-col justify-end py-10">
      <section className="flex flex-col">
        <Title text="Welcome to your cryptolegacy!"></Title>
        <div className="flex">
          <Caption
            text="Your profile: 0x797...31A9"
            className="my-5 text-left text-black"
          ></Caption>
          <SecondaryButton text={'Edit'} className="" />
        </div>
        <div className="flex w-screen space-x-3">
          <PrimaryButton
            icon={<FontAwesomeIcon icon={['fab', 'twitter']} />}
            disabled={true}
            text={'Add'}
            className={'w-1/12 text-green-bluish'}
          />
          <PrimaryButton
            icon={<FontAwesomeIcon icon="envelope" />}
            disabled={true}
            text={'Add'}
            className={'w-1/12'}
          />
          <PrimaryButton
            icon={<FontAwesomeIcon icon={['fab', 'discord']} />}
            disabled={true}
            text={'Add'}
            className={'w-1/12'}
          />
        </div>
      </section>

      <Title text="Inheritance plan" className="pt-20 pb-10"></Title>

      <Section className="rounded-xl bg-white p-10 shadow-2xl">
        <>
          <Section className="w-1/4 flex-col justify-center p-0">
            <>
              <Caption
                text="Days since inactivity"
                className="text-left text-black "
              ></Caption>
              <Caption
                text="0 Days"
                className="text-left text-2xl text-black"
              ></Caption>
              <Caption
                text="Moonbase"
                className="text-left text-black "
              ></Caption>
            </>
          </Section>

          <Section className="w-2/4 flex-col justify-center">
            <>
              <RangeSlider />
              <p>Last proof of life: Wed Jun 22, 12:43:23 GMT-0500</p>
            </>
          </Section>

          <div className="flex w-1/4 items-center justify-end">
            <SecondaryButton text={'Edit'} className="h-12 " />
            <PrimaryButton
              disabled={false}
              text={'Verify life'}
              className={'h-12 w-32 '}
            />
          </div>
        </>
      </Section>

      <Section className="  mt-20 justify-between space-x-20 ">
        <>
          <div className="flex w-2/4 flex-col rounded-xl bg-white p-10 shadow-2xl">
            <div className="mb-6 flex">
              <label className="relative block w-3/4">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <FontAwesomeIcon icon="magnifying-glass" />
                </span>
                <input
                  className="block w-full rounded-full border bg-white py-2 pl-12 pr-3 shadow-sm placeholder:italic focus:outline-none focus:ring-1 sm:text-sm"
                  placeholder="Search pools or token address"
                  type="text"
                  name="search"
                />
              </label>
              <div className="flex w-1/4 cursor-pointer items-center justify-end text-green-bluish">
                <FontAwesomeIcon icon="sliders" />
              </div>
            </div>

            <div className="mb-10 flex justify-between">
              <div className="flex flex-col justify-center">
                <Caption
                  text="Assets on Peace"
                  className="text-black "
                ></Caption>
                <Caption text="$0" className="text-2xl text-black"></Caption>
              </div>

              <div className="flex w-1/4 items-center justify-end">
                <SecondaryButton text={'Edit'} className="h-12 " />
                <PrimaryButton
                  disabled={false}
                  text={'Add tokens'}
                  className={'h-auto w-auto '}
                />
              </div>
            </div>
            <table className="table-auto text-left">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>Balance</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex w-2/4 flex-col rounded-xl bg-white p-10 shadow-2xl ">
            <div className="mb-6 flex">
              <label className="relative block w-3/4">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <FontAwesomeIcon icon="magnifying-glass" />
                </span>
                <input
                  className="block w-full rounded-full border bg-white py-2 pl-12 pr-3 shadow-sm placeholder:italic focus:outline-none focus:ring-1 sm:text-sm"
                  placeholder="Search pools or token address"
                  type="text"
                  name="search"
                />
              </label>
              <div className="flex w-1/4 cursor-pointer items-center justify-end text-green-bluish">
                <FontAwesomeIcon icon="sliders" />
              </div>
            </div>
            <div className="mb-10 flex justify-between">
              <div className="flex flex-col justify-between">
                <Caption
                  text="Assets on Peace"
                  className="text-black "
                ></Caption>
                <Caption text="$0" className="text-2xl text-black"></Caption>
              </div>

              <div className="flex w-1/4 items-center justify-end">
                <SecondaryButton text={'Edit'} className="h-12 " />
                <PrimaryButton
                  disabled={false}
                  text={'Add beneficiaries'}
                  className={'h-auto w-auto '}
                />
              </div>
            </div>
            <table className="table-auto text-left">
              <thead>
                <tr>
                  <th>Beneficiary</th>
                  <th>Tokens</th>
                  <th>% Funds</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      </Section>
    </Section>
  );
};

export default CreatePlan;
