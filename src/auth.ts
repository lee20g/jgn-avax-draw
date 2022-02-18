import Vue from 'vue';
import { LockPlugin } from '@/_kk_wallet_relock/plugins/vue';
import injected from '@/_kk_wallet_relock/connectors/injected';
import binancechain from '@/_kk_wallet_relock/connectors/binancechain';
import fortmatic from '@/_kk_wallet_relock/connectors/fortmatic';
import portis from '@/_kk_wallet_relock/connectors/portis';
import walletconnect from '@/_kk_wallet_relock/connectors/walletconnect';
import walletlink from '@/_kk_wallet_relock/connectors/walletlink';
import config from '@/helpers/config';

const options: any = { connectors: [] };
const connectors = { injected, binancechain, fortmatic, portis, walletconnect, walletlink };

Object.entries(config.connectors).forEach((connector: any) => {
  options.connectors.push({
    key: connector[0],
    connector: connectors[connector[0]],
    options: connector[1].options
  });
});

Vue.use(LockPlugin, options);
