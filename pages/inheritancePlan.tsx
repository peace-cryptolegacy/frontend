import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Link,
  Text,
  HStack,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Grid,
  GridItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { addTestator, getTestator } from "utils/web3/heritage";
import { approve } from "utils/web3/erc20";
import { BaseSyntheticEvent, FC, useState } from "react";
import { BigNumber, constants } from "ethers";
import { getAllowance } from "utils/web3/erc20";
import { getAddress, getIsConnected, setTestator } from "store/reducers/web3";
import { getTokensByChainId } from "utils/tokens/index";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import styles from "styles/CreatePlan.module.scss";
import { AddIcon, CloseIcon, EmailIcon } from "@chakra-ui/icons";
import type { Token } from "utils/tokens/index";
import type { ITestator } from "utils/web3/heritage";

const CreatePlan: FC = () => {
  //   const { t } = useTranslation("../../public/common");
  const { t } = useTranslation("common");
  const isConnected: boolean = useAppSelector(getIsConnected);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isCreatingTestament, setIsCreatingTestament] =
    useState<boolean>(false);
  const [inheritor, setInheritor] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [maxDays, setMaxDays] = useState<number>(30);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);

  const address: string = useAppSelector(getAddress);
  const chainId: number = useAppSelector((state) => state.web3.chainId);
  const tokens: Token[] = getTokensByChainId(chainId);
  const dispatch = useAppDispatch();

  async function handleApproveButtonClick() {
    try {
      setIsApproving(true);

      await approve(token);

      const allowance: BigNumber = await getAllowance(token);

      setHasAllowance(allowance.eq(constants.MaxUint256));
    } catch (error) {
      alert(error);
    } finally {
      setIsApproving(false);
    }
  }

  async function handleCreateTestamentButtonClick() {
    try {
      setIsCreatingTestament(true);

      await addTestator(inheritor, maxDays, token);

      const testator: ITestator | undefined = await getTestator(address);

      if (testator) {
        dispatch(setTestator(testator));
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsCreatingTestament(false);
    }
  }

  function handleSliderChange(maxDays: number) {
    setMaxDays(maxDays);
  }

  async function handleTokenChange(event: BaseSyntheticEvent) {
    const token = event.currentTarget.value;

    setToken(token);

    try {
      const allowance: BigNumber = await getAllowance(token);

      setHasAllowance(allowance.eq(constants.MaxUint256));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.createplan}>
      <Heading as="h1" size="lg" mb="10">
        {t("create-plan.title-create")}
      </Heading>

      <FormControl mb="10">
        <Text mb="5" as="span">
          Your profile: 0x797...31A9
        </Text>
        <Link color="blue" pl="20px">
          Edit
        </Link>

        <HStack mt="20px">
          <Button colorScheme="gray">
            <EmailIcon color="red.500" mr="10px" />
            Add
          </Button>
          <Button colorScheme="gray">
            <EmailIcon color="red.500" mr="10px" />
            Add
          </Button>
          <Button colorScheme="gray">
            <EmailIcon color="red.500" mr="10px" />
            Add
          </Button>
        </HStack>
      </FormControl>

      <FormControl mb="10">
        <FormHelperText mb="5">{t("create-plan.max-days-hint")}</FormHelperText>

        <Slider
          defaultValue={30}
          isDisabled={!isConnected}
          max={60}
          mb="10"
          min={30}
          onChange={handleSliderChange}
          step={15}
          value={maxDays}
        >
          <SliderMark value={30} mt="2" ml="-2.5" fontSize="sm">
            {t("create-plan.days", { days: 30 })}
          </SliderMark>
          <SliderMark value={45} mt="2" ml="-2.5" fontSize="sm">
            {t("create-plan.days", { days: 45 })}
          </SliderMark>
          <SliderMark
            value={60}
            mt="2"
            ml="-10"
            fontSize="sm"
            style={{ whiteSpace: "nowrap" }}
          >
            {t("create-plan.days", { days: 60 })}
          </SliderMark>

          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb />
        </Slider>

        <FormHelperText mb="5">
          {t("create-plan.beneficiary-hint")}
        </FormHelperText>

        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2} h="100%" bg="papayawhip">
            <FormControl mb="10" colorScheme="blue">
              <Input
                id="inheritor"
                onChange={(event: BaseSyntheticEvent) =>
                  setInheritor(event.currentTarget.value)
                }
                placeholder="Search pool or token address"
                type="string"
                value={inheritor}
                m="20px"
                w="75%"
                borderRadius="16px"
              />
              <Flex m="20px">
                <Text mb="5">Assets on Peace</Text>
                <Text mb="5" as="span">
                  $0
                </Text>
                <Spacer />
                <Link color="blue" pl="20px" pt="5px" mr="20px">
                  Edit
                </Link>
                <Button colorScheme="purple" mr="20px">
                  Add tokens
                </Button>
              </Flex>

              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Add tokens to your testament</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Asset</Th>
                      <Th>Price</Th>
                      <Th>Balance</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody></Tbody>
                </Table>
              </TableContainer>
            </FormControl>
          </GridItem>

          <GridItem colStart={4} colEnd={6} h="100%" bg="papayawhip">
            <FormControl mb="10" colorScheme="blue">
              <FormControl m="5" colorScheme="blue">
                <Input
                  id="inheritor"
                  onChange={(event: BaseSyntheticEvent) =>
                    setInheritor(event.currentTarget.value)
                  }
                  placeholder="Search pool or token address"
                  type="string"
                  value={inheritor}
                  w="75%"
                  borderRadius="16px"
                />
              </FormControl>
              <Flex m="20px">
                <FormControl mb="10" colorScheme="blue">
                  <Text>Your heirs</Text>
                  <Text>2 Beneficiaries</Text>
                </FormControl>
                <Spacer />
                <Link color="blue" pl="20px" pt="5px" mr="20px">
                  Edit
                </Link>
                <Button colorScheme="purple" mr="10px">
                  Add beneficia
                </Button>
              </Flex>

              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Bnneficiary</Th>
                      <Th>Tokens</Th>
                      <Th>% Funds</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Text>Son</Text>
                        <Text>0x256...cb07</Text>
                      </Td>
                      <Td>None</Td>
                      <Td>50%</Td>
                      <Td>$0</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text>Daughter</Text>
                        <Text>0x256...cb07</Text>
                      </Td>
                      <Td>None</Td>
                      <Td>50%</Td>
                      <Td>$0</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </FormControl>
          </GridItem>
        </Grid>
      </FormControl>
    </div>
  );
};

export default CreatePlan;

export const getStaticProps: GetStaticProps = async ({
  defaultLocale = "en",
  locale,
}) => {
  const translations = await serverSideTranslations(locale || defaultLocale, [
    "common",
  ]);

  return {
    props: {
      ...translations,
    },
  };
};
