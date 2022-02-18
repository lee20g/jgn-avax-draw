import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['BinanceChain']) {
      provider = window['BinanceChain'];
      try {
        await window['BinanceChain'].enable();
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  isLoggedIn(): boolean {
    return !!window['BinanceChain'];
  }
}
