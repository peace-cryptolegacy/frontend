import { ethers } from "ethers";
export default  async function dynamicVaultContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const isAddress = ethers.utils.isAddress(window.location.href.slice(-42));
  const contractAddress = isAddress ? window.location.href.slice(-42) : "";
  const vaultContract = new ethers.Contract(
    contractAddress,
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "signalLife",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "T_ADDRESS_ZERO",
        type: "error",
      },
      {
        inputs: [],
        name: "T_BACKUP_ADDRESS_ALREADY_EXISTS",
        type: "error",
      },
      {
        inputs: [],
        name: "T_BACKUP_ADDRESS_IS_OWNER",
        type: "error",
      },
      {
        inputs: [],
        name: "T_DYNAMIC_VAULT_ALREADY_EXISTS",
        type: "error",
      },
      {
        inputs: [],
        name: "T_INHERITANCE_PERCENTAGE_EXCEEDED",
        type: "error",
      },
      {
        inputs: [],
        name: "T_NO_TRANSCENDENCE",
        type: "error",
      },
      {
        inputs: [],
        name: "T_SUCCEEDED",
        type: "error",
      },
      {
        inputs: [],
        name: "T_UNAUTHORIZED",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "backupAddress",
            type: "address",
          },
        ],
        name: "BackupAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
        ],
        name: "BeneficiaryAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "beneficiaryAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint128",
            name: "newInheritancePercentage",
            type: "uint128",
          },
        ],
        name: "BeneficiaryPercentageUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
        ],
        name: "BeneficiaryRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint128",
            name: "timestamp",
            type: "uint128",
          },
        ],
        name: "ProofOfLifeUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "TestamentSucceeded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "TokenAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "backupAddress",
            type: "address",
          },
        ],
        name: "accountRepossessed",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "backupAddress",
            type: "address",
          },
        ],
        name: "addBackup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address payable",
                name: "address_",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "inheritancePercentage",
                type: "uint256",
              },
            ],
            internalType: "struct Types.Beneficiary",
            name: "beneficiary",
            type: "tuple",
          },
        ],
        name: "addBeneficiary",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "addToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "claimant",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "inactivityMaximum",
            type: "uint128",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address payable",
                name: "address_",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "inheritancePercentage",
                type: "uint256",
              },
            ],
            internalType: "struct Types.Beneficiary[]",
            name: "beneficiaries",
            type: "tuple[]",
          },
        ],
        name: "createTestament",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "backupAddress",
            type: "address",
          },
        ],
        name: "removeBackup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "address_",
            type: "address",
          },
        ],
        name: "removeBeneficiary",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "repossessAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "succeed",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "address_",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "newInheritancePercentage",
            type: "uint128",
          },
        ],
        name: "updateBeneficiaryPercentage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "newInactivityMaximum",
            type: "uint128",
          },
        ],
        name: "updateInactivityMaximum",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "dynamicVaults",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "claimant",
                type: "address",
              },
              {
                internalType: "uint128",
                name: "inactivityMaximum",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "proofOfLife",
                type: "uint128",
              },
              {
                internalType: "bool",
                name: "succeeded",
                type: "bool",
              },
              {
                components: [
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "address payable",
                    name: "address_",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "inheritancePercentage",
                    type: "uint256",
                  },
                ],
                internalType: "struct Types.Beneficiary[]",
                name: "beneficiaries",
                type: "tuple[]",
              },
              {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
              },
            ],
            internalType: "struct Types.Testament",
            name: "testament",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "getBackupAddresses",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "dynamicVaultId",
            type: "uint256",
          },
        ],
        name: "getTestamentParameters",
        outputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "claimant",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "tokens",
            type: "address[]",
          },
          {
            internalType: "uint128",
            name: "inactivityMaximum",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "proofOfLife",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "succeeded",
            type: "bool",
          },
          {
            internalType: "string[]",
            name: "beneficiariesNames",
            type: "string[]",
          },
          {
            internalType: "address[]",
            name: "beneficiariesAddresses",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "beneficiariesInheritancePercentages",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider
  );
  return vaultContract;
}
