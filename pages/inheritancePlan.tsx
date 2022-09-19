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
  Image,
  Stack,
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
import {
  AddIcon,
  CloseIcon,
  EmailIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import type { Token } from "utils/tokens/index";
import type { ITestator } from "utils/web3/heritage";
import inheritancePlanStyle from "styles/InheritancePlan.module.scss";
import inheritancePlanSvg from "../public/images/inheritancePlan.svg";

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
        <Box
          alignItems="center"
          as="button"
          display="flex"
          flexDirection="row"
          marginTop={1}
          padding="20px 0px"
        >
          <Image
            alt="AVAX Logo"
            height="35px"
            src="/images/inheritancePlan.svg"
            width="35px"
          />
          <Box fontSize="4xl" letterSpacing="0.25px" marginLeft="18px">
            Inheritance plan
          </Box>
        </Box>
        <div className={inheritancePlanStyle["connectstep"]}>
          <div className={inheritancePlanStyle["connectstep__container"]}>
            <Grid templateColumns="repeat(12, 1fr)" gap={4} mt={5}>
              <GridItem colSpan={1} h="100%">
                <Text as="span" fontSize="sm">
                  Days since inactivity
                </Text>
                <InfoOutlineIcon ml="10px" />
                <div
                  className={
                    inheritancePlanStyle["connectstep__container__flex"]
                  }
                >
                  <Image
                    alt="AVAX Logo"
                    height="25px"
                    src="/images/moonbase.svg"
                    width="25px"
                  />
                  <Box fontSize="14px" letterSpacing="0.25px" marginLeft="10px">
                    Moonbase
                  </Box>
                </div>
              </GridItem>

              <GridItem colStart={3} colEnd={10} h="100%">
                <Slider
                  defaultValue={30}
                  isDisabled={!isConnected}
                  max={60}
                  mb="10"
                  min={30}
                  onChange={handleSliderChange}
                  step={15}
                  value={maxDays}
                  color="#5F4DFF"
                >
                  <SliderMark value={30} mt="2" ml="-2.5" fontSize="sm">
                    {t("create-plan.days", { days: 0 })}
                  </SliderMark>

                  <SliderMark
                    value={60}
                    mt="2"
                    ml="-10"
                    fontSize="sm"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("create-plan.days", { days: 365 })}
                  </SliderMark>

                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>

                  <SliderThumb color="#5F4DFF" />
                </Slider>
              </GridItem>

              <GridItem colStart={11} colEnd={13} h="100%">
                <Link color="blue" pl="20px" pt="5px" mr="20px">
                  Edit
                </Link>
                <Button
                  backgroundColor="#5F4DFF"
                  borderRadius={5}
                  color="#FFFFFF"
                  fontSize={14}
                  width="100%"
                >
                  Verify file
                </Button>
              </GridItem>
            </Grid>
          </div>
          <div
            className={inheritancePlanStyle["connectstep__button__container"]}
          >
            Last proof of life: Wed Jun 22, 12:43:23 GMT-0500
          </div>
        </div>

        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={5}>
          <GridItem colSpan={2} h="100%">
            <FormControl mb="10" colorScheme="blue">
              <div className={inheritancePlanStyle["connectstep"]}>
                <div className={inheritancePlanStyle["connectstep__container"]}>
                  <div
                    className={inheritancePlanStyle["connectstep__disclaimer"]}
                  >
                    <div className={styles["connectstep__block"]}>
                      <Input
                        id="inheritor"
                        onChange={(event: BaseSyntheticEvent) =>
                          setInheritor(event.currentTarget.value)
                        }
                        placeholder="Search pool or token address"
                        type="string"
                        value={inheritor}
                        mb="30px"
                        w="75%"
                        borderRadius="16px"
                      />
                    </div>
                  </div>
                  <Flex>
                    <div
                      className={inheritancePlanStyle["connectstep__container"]}
                    >
                      <Text>Assets on Peace</Text>
                      <Text as="span">$0</Text>
                    </div>
                    <Spacer />
                    <Link color="blue" pl="20px" pt="5px" mr="20px">
                      Edit
                    </Link>
                    <Button
                      backgroundColor="#5F4DFF"
                      borderRadius={5}
                      color="#FFFFFF"
                      fontSize={14}
                      width="100%"
                      mr="20px"
                    >
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
                </div>
              </div>
            </FormControl>
          </GridItem>

          <GridItem colStart={4} colEnd={6} h="100%">
            <FormControl mb="10" colorScheme="blue">
              <div className={inheritancePlanStyle["connectstep"]}>
                <div className={inheritancePlanStyle["connectstep__container"]}>
                  <FormControl colorScheme="blue">
                    <Input
                      id="inheritor"
                      onChange={(event: BaseSyntheticEvent) =>
                        setInheritor(event.currentTarget.value)
                      }
                      placeholder="Search pool or token"
                      type="string"
                      value={inheritor}
                      w="75%"
                      mb="10px"
                      borderRadius="16px"
                    />
                  </FormControl>
                  <Flex m="20px">
                    <FormControl mb="10" colorScheme="blue">
                      <Text as="span">Your heirs</Text>{" "}
                      <InfoOutlineIcon ml="10px" />
                      <Text>2 Beneficiaries</Text>
                    </FormControl>
                    <Spacer />
                    <Link color="blue" pl="20px" pt="5px" mr="20px">
                      Edit
                    </Link>
                    <Button
                      backgroundColor="#5F4DFF"
                      borderRadius={5}
                      color="#FFFFFF"
                      fontSize={14}
                      width="100%"
                    >
                      Add beneficiaries
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
                </div>
              </div>
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
