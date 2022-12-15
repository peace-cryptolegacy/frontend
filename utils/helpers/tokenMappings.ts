import { Address } from 'wagmi';

const baseRoute = '/logos/symbols';

const tokenMappings: {
  [key: string]: {
    route: string;
    symbol: string;
    networks: {
      [key: string]: {
        address: Address;
      };
    };
  };
} = {
  moonbeam: {
    route: baseRoute + '/moonbeam-black.png',
    symbol: 'MOON',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  ether: {
    route: baseRoute + '/eth.png',
    symbol: 'ETH',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  'wrapped ethereum': {
    route: baseRoute + '/eth.png',
    symbol: 'WETH',
    networks: {
      polygon: {
        address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      },
      mumbai: {
        address: '0x878E6aDEfF7D66b79Dfa1c9a69b0038b08A25a7b',
      },
    },
  },
  bitcoin: {
    route: baseRoute + '/bitcoin.png',
    symbol: 'BTC',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  matic: {
    route: baseRoute + '/matic.png',
    symbol: 'MATIC',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  tether: {
    route: baseRoute + '/tether.png',
    symbol: 'USDT',
    networks: {
      polygon: {
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      },
      mumbai: {
        address: '0x048eC837d51c44d0e03da326eBE289bc657EB264',
      },
    },
  },
  sushi: {
    route: baseRoute + '/sushi.png',
    symbol: 'SUSHI',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x1DDD1Bec7c516004bccc9C6404828b2412C5c9B9',
      },
    },
  },
  maker: {
    route: baseRoute + '/maker.png',
    symbol: 'MKR',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0xbBdEFFfD2c407FBA9773e599BeD61C06BB917b42',
      },
    },
  },
  fakeMatic: {
    route: baseRoute + '/matic.png',
    symbol: 'FMATIC',
    networks: {
      polygon: {
        address: '0x',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
};

export default tokenMappings;
