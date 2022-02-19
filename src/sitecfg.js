
// 全局变量

let local_lang = 'en'
let lang_arr = ['en-US','zh']
for(let item of lang_arr){
  if(window.navigator.language.indexOf(item) === 0){
    local_lang = item
    break
  }
}

let cfg = {
  dev: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://ropsten.etherscan.io/address/",
    url_transaction_view: "https://ropsten.etherscan.io/tx/",
    url_opensea_view: "https://rinkeby.opensea.io/",
    chain_id: 3
  },

  kovan: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://kovan.etherscan.io/address/",
    url_transaction_view: "https://kovan.etherscan.io/tx/",
    url_opensea_view: "https://kovan.opensea.io/",
    chain_id: 42
  },

  rinkeby: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://rinkeby.etherscan.io/address/",
    url_transaction_view: "https://rinkeby.etherscan.io/tx/",
    url_opensea_view: "https://rinkeby.opensea.io/",
    chain_id: 4
  },

  prod: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://etherscan.io/address/",
    url_transaction_view: "https://etherscan.io/tx/",
    url_opensea_view: "https://opensea.io/",
    chain_id: 1
  },

  // 币安
  bsc: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://bscscan.com/",
    url_transaction_view: "hhttps://bscscan.com/tx/",
    chain_id: 56
  },
  bsc97: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://testnet.bscscan.com/",
    url_transaction_view: "https://testnet.bscscan.com/tx/",
    chain_id: 97
  },
  avax: {
    default_lang: local_lang, // en zh id
    url_network_address_view: "https://api.avax.network/ext/bc/C/rpc",
    url_transaction_view: "https://snowtrace.io/tx/",
    chain_id: 43114
  }
};

// 输出
export default cfg.avax
