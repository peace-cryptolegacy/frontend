const baseRoute = '/logos/symbols';

const tokenMappings = {
  moonbeam: {
    route: baseRoute + '/moonbeam-black.png',
    symbol: 'MOON',
    networks: {
      polygon: {
        address: '',
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
        address: '',
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
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  bitcoin: {
    route: baseRoute + '/bitcoin.png',
    symbol: 'BTC',
    networks: {
      polygon: {
        address: '',
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
        address: '',
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
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  sushi: {
    route: baseRoute + '/sushi.png',
    symbol: 'USDT',
    networks: {
      polygon: {
        address: '',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  maker: {
    route: baseRoute + '/maker.png',
    symbol: 'USDT',
    networks: {
      polygon: {
        address: '',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
  fakeMatic: {
    route: baseRoute + '/matic.png',
    symbol: 'FMATIC',
    networks: {
      polygon: {
        address: '',
      },
      mumbai: {
        address: '0x10055ef62E88eF68b5011F4c7b5Ab9B99f00BB40',
      },
    },
  },
};

export default tokenMappings;
