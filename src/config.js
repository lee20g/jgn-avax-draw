import sitecfg from './sitecfg.js'

let json = {
  env: "master",
  network: "homestead",
  chainId: sitecfg.chain_id,
  connectors: {
    injected: {
      id: "injected",
      name: "MetaMask"
    },
    // binancechain: {
    //   id: "binancechain",
    //   name: "BinanceChain"
    // },
    // fortmatic: {
    //   id: "fortmatic",
    //   name: "Fortmatic",
    //   options: {
    //     apiKey: "pk_live_9CE8FD92E54684ED"
    //   }
    // },
    // portis: {
    //   id: "portis",
    //   name: "Portis",
    //   options: {
    //     dappId: "3f1c3cfc-7dd5-4e8a-aa03-71ff7396d9fe",
    //     network: "mainnet"
    //   }
    // },
    walletconnect: {
      id: "walletconnect",
      name: "WalletConnect",
      options: {
        rpc: {
          "43114": "https://api.avax.network/ext/bc/C/rpc"
        }
      }
    },
    // walletlink: {
    //   id: "walletlink",
    //   name: "Coinbase",
    //   options: {
    //     appName: "JGN",
    //     darkMode: false,
    //     chainId: 1,
    //     ethJsonrpcUrl:
    //       "https://mainnet.infura.io/v3/8bc14765e58149ec928a5695cb8e1ea4"
    //   }
    // }
  }
};

export default json;
