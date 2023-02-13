export const deployments = {
  name: 'mumbai',
  chainId: '80001',
  contracts: {
    DefaultProxyAdmin: {
      address: '0x576F14126FD5A8680945448d707473309f443FC7',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'initialOwner',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'contract TransparentUpgradeableProxy',
              name: 'proxy',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'changeProxyAdmin',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'contract TransparentUpgradeableProxy',
              name: 'proxy',
              type: 'address',
            },
          ],
          name: 'getProxyAdmin',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'contract TransparentUpgradeableProxy',
              name: 'proxy',
              type: 'address',
            },
          ],
          name: 'getProxyImplementation',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'contract TransparentUpgradeableProxy',
              name: 'proxy',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'upgrade',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'contract TransparentUpgradeableProxy',
              name: 'proxy',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ],
    },
    DynamicVaults_Implementation: {
      address: '0x8655A40d3C3E774112f88EC18c15d81C5d58c666',
      abi: [
        {
          inputs: [],
          name: 'MATH_DIVISION_BY_ZERO',
          type: 'error',
        },
        {
          inputs: [],
          name: 'MATH_MULTIPLICATION_OVERFLOW',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_ADDRESS_ZERO',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_BACKUP_ADDRESS_ALREADY_EXISTS',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_BACKUP_ADDRESS_IS_OWNER',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_CANCELED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_INHERITANCE_PERCENTAGE_EXCEEDED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_NO_TRANSCENDENCE',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_SUCCEEDED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_TESTAMENT_ALREADY_EXISTS',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_UNAUTHORIZED',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'BackupAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              indexed: false,
              internalType: 'struct Types.Beneficiary[]',
              name: 'beneficiaries',
              type: 'tuple[]',
            },
          ],
          name: 'BeneficiariesUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiary',
              type: 'address',
            },
          ],
          name: 'BeneficiaryAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiaryAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint128',
              name: 'newInheritancePercentage',
              type: 'uint128',
            },
          ],
          name: 'BeneficiaryPercentageUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiary',
              type: 'address',
            },
          ],
          name: 'BeneficiaryRemoved',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint128',
              name: 'newEstablishmentFeeRate',
              type: 'uint128',
            },
          ],
          name: 'EstablishmentFeeRateUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Paused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint128',
              name: 'timestamp',
              type: 'uint128',
            },
          ],
          name: 'ProofOfLifeUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'TestamentCanceled',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'TestamentSucceeded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'token',
              type: 'address',
            },
          ],
          name: 'TokenAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Unpaused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'accountRepossessed',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'addBackup',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              internalType: 'struct Types.Beneficiary',
              name: 'beneficiary',
              type: 'tuple',
            },
          ],
          name: 'addBeneficiary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'cancelTestament',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'inactivityMaximum',
              type: 'uint128',
            },
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              internalType: 'struct Types.Beneficiary[]',
              name: 'beneficiaries',
              type: 'tuple[]',
            },
          ],
          name: 'createTestament',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'dynamicVaults',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint128',
                  name: 'inactivityMaximum',
                  type: 'uint128',
                },
                {
                  internalType: 'uint128',
                  name: 'proofOfLife',
                  type: 'uint128',
                },
                {
                  internalType: 'bool',
                  name: 'succeeded',
                  type: 'bool',
                },
                {
                  components: [
                    {
                      internalType: 'string',
                      name: 'name',
                      type: 'string',
                    },
                    {
                      internalType: 'address payable',
                      name: 'address_',
                      type: 'address',
                    },
                    {
                      internalType: 'uint128',
                      name: 'inheritancePercentage',
                      type: 'uint128',
                    },
                  ],
                  internalType: 'struct Types.Beneficiary[]',
                  name: 'beneficiaries',
                  type: 'tuple[]',
                },
                {
                  internalType: 'enum Types.TestamentStatus',
                  name: 'status',
                  type: 'uint8',
                },
              ],
              internalType: 'struct Types.Testament',
              name: 'testament',
              type: 'tuple',
            },
            {
              internalType: 'uint128',
              name: 'ESTABLISHMENT_FEE_RATE',
              type: 'uint128',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'getBackupAddresses',
          outputs: [
            {
              internalType: 'address[]',
              name: '',
              type: 'address[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'getTestamentParameters',
          outputs: [
            {
              internalType: 'uint128',
              name: 'inactivityMaximum',
              type: 'uint128',
            },
            {
              internalType: 'uint128',
              name: 'proofOfLife',
              type: 'uint128',
            },
            {
              internalType: 'bool',
              name: 'succeeded',
              type: 'bool',
            },
            {
              internalType: 'string[]',
              name: 'beneficiariesNames',
              type: 'string[]',
            },
            {
              internalType: 'address[]',
              name: 'beneficiariesAddresses',
              type: 'address[]',
            },
            {
              internalType: 'uint256[]',
              name: 'beneficiariesInheritancePercentages',
              type: 'uint256[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'establishmentFeeRate_',
              type: 'uint128',
            },
          ],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'pause',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'paused',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'removeBackup',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'address_',
              type: 'address',
            },
          ],
          name: 'removeBeneficiary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'tokens',
              type: 'address[]',
            },
          ],
          name: 'repossessAccount',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'signalLife',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'tokens',
              type: 'address[]',
            },
          ],
          name: 'succeed',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'unpause',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string[]',
              name: 'names',
              type: 'string[]',
            },
            {
              internalType: 'address[]',
              name: 'addresses',
              type: 'address[]',
            },
            {
              internalType: 'uint128[]',
              name: 'newInheritancePercentages',
              type: 'uint128[]',
            },
            {
              internalType: 'uint128[]',
              name: 'indexes',
              type: 'uint128[]',
            },
          ],
          name: 'updateBeneficiaries',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'newEstablishmentFeeRate',
              type: 'uint128',
            },
          ],
          name: 'updateEstablishmentFeeRate',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'newInactivityMaximum',
              type: 'uint128',
            },
          ],
          name: 'updateInactivityMaximum',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
    DynamicVaults_Proxy: {
      address: '0x4E45aDb2c92bd929e350F0A209e14b735EF138Ad',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_logic',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'admin_',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes',
            },
          ],
          stateMutability: 'payable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'previousAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'AdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'beacon',
              type: 'address',
            },
          ],
          name: 'BeaconUpgraded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'Upgraded',
          type: 'event',
        },
        {
          stateMutability: 'payable',
          type: 'fallback',
        },
        {
          inputs: [],
          name: 'admin',
          outputs: [
            {
              internalType: 'address',
              name: 'admin_',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'changeAdmin',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'implementation',
          outputs: [
            {
              internalType: 'address',
              name: 'implementation_',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
          ],
          name: 'upgradeTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeToAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          stateMutability: 'payable',
          type: 'receive',
        },
      ],
    },
    DynamicVaults: {
      address: '0x4E45aDb2c92bd929e350F0A209e14b735EF138Ad',
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'previousAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'AdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'beacon',
              type: 'address',
            },
          ],
          name: 'BeaconUpgraded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'Upgraded',
          type: 'event',
        },
        {
          stateMutability: 'payable',
          type: 'fallback',
        },
        {
          inputs: [],
          name: 'admin',
          outputs: [
            {
              internalType: 'address',
              name: 'admin_',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'changeAdmin',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'implementation',
          outputs: [
            {
              internalType: 'address',
              name: 'implementation_',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
          ],
          name: 'upgradeTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeToAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          stateMutability: 'payable',
          type: 'receive',
        },
        {
          inputs: [],
          name: 'MATH_DIVISION_BY_ZERO',
          type: 'error',
        },
        {
          inputs: [],
          name: 'MATH_MULTIPLICATION_OVERFLOW',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_ADDRESS_ZERO',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_BACKUP_ADDRESS_ALREADY_EXISTS',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_BACKUP_ADDRESS_IS_OWNER',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_CANCELED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_INHERITANCE_PERCENTAGE_EXCEEDED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_NO_TRANSCENDENCE',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_SUCCEEDED',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_TESTAMENT_ALREADY_EXISTS',
          type: 'error',
        },
        {
          inputs: [],
          name: 'T_UNAUTHORIZED',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'BackupAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              indexed: false,
              internalType: 'struct Types.Beneficiary[]',
              name: 'beneficiaries',
              type: 'tuple[]',
            },
          ],
          name: 'BeneficiariesUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiary',
              type: 'address',
            },
          ],
          name: 'BeneficiaryAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiaryAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint128',
              name: 'newInheritancePercentage',
              type: 'uint128',
            },
          ],
          name: 'BeneficiaryPercentageUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'beneficiary',
              type: 'address',
            },
          ],
          name: 'BeneficiaryRemoved',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint128',
              name: 'newEstablishmentFeeRate',
              type: 'uint128',
            },
          ],
          name: 'EstablishmentFeeRateUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Paused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint128',
              name: 'timestamp',
              type: 'uint128',
            },
          ],
          name: 'ProofOfLifeUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'TestamentCanceled',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'TestamentSucceeded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'token',
              type: 'address',
            },
          ],
          name: 'TokenAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Unpaused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'accountRepossessed',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'addBackup',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              internalType: 'struct Types.Beneficiary',
              name: 'beneficiary',
              type: 'tuple',
            },
          ],
          name: 'addBeneficiary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'cancelTestament',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'inactivityMaximum',
              type: 'uint128',
            },
            {
              components: [
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'address payable',
                  name: 'address_',
                  type: 'address',
                },
                {
                  internalType: 'uint128',
                  name: 'inheritancePercentage',
                  type: 'uint128',
                },
              ],
              internalType: 'struct Types.Beneficiary[]',
              name: 'beneficiaries',
              type: 'tuple[]',
            },
          ],
          name: 'createTestament',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'dynamicVaults',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint128',
                  name: 'inactivityMaximum',
                  type: 'uint128',
                },
                {
                  internalType: 'uint128',
                  name: 'proofOfLife',
                  type: 'uint128',
                },
                {
                  internalType: 'bool',
                  name: 'succeeded',
                  type: 'bool',
                },
                {
                  components: [
                    {
                      internalType: 'string',
                      name: 'name',
                      type: 'string',
                    },
                    {
                      internalType: 'address payable',
                      name: 'address_',
                      type: 'address',
                    },
                    {
                      internalType: 'uint128',
                      name: 'inheritancePercentage',
                      type: 'uint128',
                    },
                  ],
                  internalType: 'struct Types.Beneficiary[]',
                  name: 'beneficiaries',
                  type: 'tuple[]',
                },
                {
                  internalType: 'enum Types.TestamentStatus',
                  name: 'status',
                  type: 'uint8',
                },
              ],
              internalType: 'struct Types.Testament',
              name: 'testament',
              type: 'tuple',
            },
            {
              internalType: 'uint128',
              name: 'ESTABLISHMENT_FEE_RATE',
              type: 'uint128',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'getBackupAddresses',
          outputs: [
            {
              internalType: 'address[]',
              name: '',
              type: 'address[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'getTestamentParameters',
          outputs: [
            {
              internalType: 'uint128',
              name: 'inactivityMaximum',
              type: 'uint128',
            },
            {
              internalType: 'uint128',
              name: 'proofOfLife',
              type: 'uint128',
            },
            {
              internalType: 'bool',
              name: 'succeeded',
              type: 'bool',
            },
            {
              internalType: 'string[]',
              name: 'beneficiariesNames',
              type: 'string[]',
            },
            {
              internalType: 'address[]',
              name: 'beneficiariesAddresses',
              type: 'address[]',
            },
            {
              internalType: 'uint256[]',
              name: 'beneficiariesInheritancePercentages',
              type: 'uint256[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'establishmentFeeRate_',
              type: 'uint128',
            },
          ],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'pause',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'paused',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'backupAddress',
              type: 'address',
            },
          ],
          name: 'removeBackup',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'address_',
              type: 'address',
            },
          ],
          name: 'removeBeneficiary',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'tokens',
              type: 'address[]',
            },
          ],
          name: 'repossessAccount',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'signalLife',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'tokens',
              type: 'address[]',
            },
          ],
          name: 'succeed',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'unpause',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string[]',
              name: 'names',
              type: 'string[]',
            },
            {
              internalType: 'address[]',
              name: 'addresses',
              type: 'address[]',
            },
            {
              internalType: 'uint128[]',
              name: 'newInheritancePercentages',
              type: 'uint128[]',
            },
            {
              internalType: 'uint128[]',
              name: 'indexes',
              type: 'uint128[]',
            },
          ],
          name: 'updateBeneficiaries',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'newEstablishmentFeeRate',
              type: 'uint128',
            },
          ],
          name: 'updateEstablishmentFeeRate',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint128',
              name: 'newInactivityMaximum',
              type: 'uint128',
            },
          ],
          name: 'updateInactivityMaximum',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_logic',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'admin_',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes',
            },
          ],
          stateMutability: 'payable',
          type: 'constructor',
        },
      ],
    },
  },
} as const;
