import Vue from 'vue';
import { getInstance } from '@/_kk_wallet_relock/plugins/vue';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
//import { multicall } from '@bonustrack/snapshot.js/src/utils';
//import spaces from '@/spaces';
import store from '@/store';
import abi from '@/helpers/abi';
import config from '@/helpers/config';
import wsProvider from '@/helpers/ws';
import rpcProvider from '@/helpers/rpc';
import '@ethersproject/units';
import {parseUnits,formatUnits} from "@ethersproject/units";
import { parseEther,formatEther } from '@ethersproject/units';

let auth;
let web3;



//bnb-test
//const JGN_TOKEN_ADDRESS = '0xd01D5fe5426989Dc0AD92cd8d27371a48d40B58f';
// const JGN_TOKEN_ADDRESS = '0xceC8B533a84bc35e9F88Fb98844C84539d45A662';
// const JGN_TOKEN_ABI = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

//bnb
// const JGN_TOKEN_ADDRESS = '0x10702bEbD7d15507F4Ed2078bC76da44D3BeF060'
const JGN_TOKEN_ADDRESS = '0xC13B7a43223BB9Bf4B69BD68Ab20ca1B79d81C75'
const JGN_TOKEN_ABI = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'


//bnb-test
//const NTFS_TOKEN_ADDRESS = '0xe84E367379192f2353C0dE315a4b0f60a71c4afb';
// const NTFS_TOKEN_ADDRESS = '0x4C53CCd302E09268371b8D3C8Aeb6249dB22Bfa5';
// const NTFS_TOKEN_ABI = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_uri","type":"string"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"WhitelistAdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"WhitelistAdminRemoved","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"create","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creators","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isWhitelistAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_newBaseMetadataURI","type":"string"}],"name":"setBaseMetadataURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenMaxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]';

//bnb
//const NTFS_TOKEN_ADDRESS = '0x6f6297331E20Fec79872492070A39F75a2edD7ae';
const NTFS_TOKEN_ADDRESS = '0x4Cd851d37035275E5ec6B4724C35d677E32e657b';
const NTFS_TOKEN_ABI = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_uri","type":"string"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"WhitelistAdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"WhitelistAdminRemoved","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"create","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creators","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isWhitelistAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceWhitelistAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_newBaseMetadataURI","type":"string"}],"name":"setBaseMetadataURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenMaxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'


//bnb-test
// const LOTTERY_ADDRESS = '0x07C11428d14b36A458BC0a21D790c06207d0464b';
// const LOTTERY_ABI = '[{"inputs":[{"internalType":"contract IERC1155Tradable","name":"_NTF","type":"address"},{"internalType":"contract IERC20","name":"_JGN","type":"address"},{"internalType":"address","name":"_dev","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"NFTMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"JGN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NTFS","outputs":[{"internalType":"contract IERC1155Tradable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"getOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_lotteryID","type":"uint256"}],"name":"getPlayer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"indexs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"numbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"randomNumberConsumer","outputs":[{"internalType":"contract IRandomNumberConsumer","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"randomToReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_randomNumberConsumer","type":"address"}],"name":"setRandom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ticketPerJGN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
// const LOTTERY_ADDRESS = '0x65d00B87f0b99e66f7DeC89bae0CE990024fE8e5';
// const LOTTERY_ABI  = '[{"inputs":[{"internalType":"contract IERC1155Tradable","name":"_NTF","type":"address"},{"internalType":"contract IERC20","name":"_jXP","type":"address"},{"internalType":"address","name":"_dev","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"NFTMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTMaxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NTFS","outputs":[{"internalType":"contract IERC1155Tradable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_player","type":"address"}],"name":"getLastReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"getOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_lotteryID","type":"uint256"}],"name":"getPlayer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"indexs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jXP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jXPNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"randomness","type":"uint256"},{"internalType":"uint256","name":"_lotteryId","type":"uint256"}],"name":"lotteryResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"numbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"randomNumberConsumer","outputs":[{"internalType":"contract IRandomNumberConsumer","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"randomToReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_randomNumberConsumer","type":"address"}],"name":"setRandom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"syncNFTData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

//bnb
// const LOTTERY_ADDRESS = '0x7C02F72A44400Ca11111C632DA35ddB25a1D5049'
const LOTTERY_ADDRESS = '0x45E6Deff9918c5b63ADd7dcBaA2dDC78DC09FBCD'
const LOTTERY_ABI = '[{"inputs":[{"internalType":"contract IERC1155Tradable","name":"_NTF","type":"address"},{"internalType":"contract IERC20","name":"_jXP","type":"address"},{"internalType":"address","name":"_dev","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"NFTMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTMaxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NTFS","outputs":[{"internalType":"contract IERC1155Tradable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_player","type":"address"}],"name":"getLastReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"getOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_lotteryID","type":"uint256"}],"name":"getPlayer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"indexs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jXP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jXPNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"randomness","type":"uint256"},{"internalType":"uint256","name":"_lotteryId","type":"uint256"}],"name":"lotteryResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"numbers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"randomNumberConsumer","outputs":[{"internalType":"contract IRandomNumberConsumer","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"randomToReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_randomNumberConsumer","type":"address"}],"name":"setRandom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"syncNFTData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'



//bnb-test
// const REDEEM_ADDRESS = '0x6795de4cca377E252f8Ecb4538Bc46DA08484864';
// const REDEEM_ABI = '[{"inputs":[{"internalType":"contract IERC1155Tradable","name":"_NTF","type":"address"},{"internalType":"address","name":"_dev","type":"address"},{"internalType":"address","name":"_JGN","type":"address"},{"internalType":"address","name":"_jXP","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"reward","type":"event"},{"constant":true,"inputs":[],"name":"JGN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NTFS","outputs":[{"internalType":"contract IERC1155Tradable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel4","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel5","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel6","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel1Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel2Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel3Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel4Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel5Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel6Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jXP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel1Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel2Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel3Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel4Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel5Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel6Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"redeemReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"checker","type":"address"}],"name":"reward_level","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'

//bnb
// const REDEEM_ADDRESS = '0x1eed3e82339493f9DC89224e765053a3080165f1';
const REDEEM_ADDRESS = '0xd6C41905ca489027A73E93aC657d8392203124dB';
const REDEEM_ABI = '[{"inputs":[{"internalType":"contract IERC1155Tradable","name":"_NTF","type":"address"},{"internalType":"address","name":"_dev","type":"address"},{"internalType":"address","name":"_JGN","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"reward","type":"event"},{"constant":true,"inputs":[],"name":"JGN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NTFS","outputs":[{"internalType":"contract IERC1155Tradable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel4","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel5","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RewardLevel6","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel1Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel2Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel3Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel4Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel5Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRewardLevel6Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel1Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel2Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel3Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel4Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel5Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRewardLevel6Number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"redeemReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"checker","type":"address"}],"name":"reward_level","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
/*
wsProvider.on('block', blockNumber => {
  store.commit('GET_BLOCK_SUCCESS', blockNumber);
});
*/

const state = {
  injectedLoaded: false,
  injectedChainId: null,
  account: null,
  account_balance_eth: 0,
  account_balance_lp: 0,
  name: null,
  active: false,
  balances: {},
  blockNumber: 0,
  status_account_approved_jgn: false, //
  status_account_approved_jxp: false, //
  account_balance_jgn: 0,
  account_balance_jxp: 0,

  // 分享
  referral_address: '',

  // 导出公用
  // POOL1_TOKEN_ADDRESS: POOL1_TOKEN_ADDRESS,
  NTFS_TOKEN_ADDRESS: NTFS_TOKEN_ADDRESS,
  JGN_TOKEN_ADDRESS: JGN_TOKEN_ADDRESS,
};

// 
const mutations = {
  setWeb3Data(state,obj){
    for(let key in obj){
      state[key] = obj[key]
    }
  },
  LOGOUT(_state) {
    Vue.set(_state, 'injectedLoaded', false);
    Vue.set(_state, 'injectedChainId', null);
    Vue.set(_state, 'account', null);
    Vue.set(_state, 'name', null);
    Vue.set(_state, 'active', false);
    Vue.set(_state, 'balances', {});
    console.debug('LOGOUT');
  },
  LOAD_WEB3_REQUEST() {
    console.debug('LOAD_WEB3_REQUEST');
  },
  LOAD_WEB3_SUCCESS() {
    console.debug('LOAD_WEB3_SUCCESS');
  },
  LOAD_WEB3_FAILURE(_state, payload) {
    console.debug('LOAD_WEB3_FAILURE', payload);
  },
  LOAD_PROVIDER_REQUEST() {
    console.debug('LOAD_PROVIDER_REQUEST');
  },
  LOAD_PROVIDER_SUCCESS(_state, payload) {
    Vue.set(_state, 'injectedLoaded', payload.injectedLoaded);
    Vue.set(_state, 'injectedChainId', payload.injectedChainId);
    Vue.set(_state, 'account', payload.account);
    Vue.set(_state, 'name', payload.name);
    console.debug('LOAD_PROVIDER_SUCCESS');
  },
  LOAD_PROVIDER_FAILURE(_state, payload) {
    Vue.set(_state, 'injectedLoaded', false);
    Vue.set(_state, 'injectedChainId', null);
    Vue.set(_state, 'account', null);
    Vue.set(_state, 'active', false);
    console.debug('LOAD_PROVIDER_FAILURE', payload);
  },
  LOAD_BACKUP_PROVIDER_REQUEST() {
    console.debug('LOAD_BACKUP_PROVIDER_REQUEST');
  },
  LOAD_BACKUP_PROVIDER_SUCCESS(_state, payload) {
    console.debug('LOAD_BACKUP_PROVIDER_SUCCESS', payload);
  },
  LOAD_BACKUP_PROVIDER_FAILURE(_state, payload) {
    Vue.set(_state, 'injectedLoaded', false);
    Vue.set(_state, 'backUpLoaded', false);
    Vue.set(_state, 'account', null);
    Vue.set(_state, 'activeChainId', null);
    Vue.set(_state, 'active', false);
    console.debug('LOAD_BACKUP_PROVIDER_FAILURE', payload);
  },
  HANDLE_CHAIN_CHANGED() {
    console.debug('HANDLE_CHAIN_CHANGED');
  },
  HANDLE_ACCOUNTS_CHANGED(_state, payload) {
    Vue.set(_state, 'account', payload);
    console.debug('HANDLE_ACCOUNTS_CHANGED', payload);
  },
  HANDLE_CLOSE_CHANGED() {
    console.debug('HANDLE_CLOSE_CHANGED');
  },
  HANDLE_NETWORK_CHANGED() {
    console.debug('HANDLE_NETWORK_CHANGED');
  },
  LOOKUP_ADDRESS_REQUEST() {
    console.debug('LOOKUP_ADDRESS_REQUEST');
  },
  LOOKUP_ADDRESS_SUCCESS(_state, payload) {
    Vue.set(_state, 'name', payload);
    console.debug('LOOKUP_ADDRESS_SUCCESS');
  },
  LOOKUP_ADDRESS_FAILURE(_state, payload) {
    console.debug('LOOKUP_ADDRESS_FAILURE', payload);
  },
  RESOLVE_NAME_REQUEST() {
    console.debug('RESOLVE_NAME_REQUEST');
  },
  RESOLVE_NAME_SUCCESS() {
    console.debug('RESOLVE_NAME_SUCCESS');
  },
  RESOLVE_NAME_FAILURE(_state, payload) {
    console.debug('RESOLVE_NAME_FAILURE', payload);
  },
  SEND_TRANSACTION_REQUEST() {
    console.debug('SEND_TRANSACTION_REQUEST');
  },
  SEND_TRANSACTION_SUCCESS() {
    console.debug('SEND_TRANSACTION_SUCCESS');
  },
  SEND_TRANSACTION_FAILURE(_state, payload) {
    console.debug('SEND_TRANSACTION_FAILURE', payload);
  },
  SIGN_MESSAGE_REQUEST() {
    console.debug('SIGN_MESSAGE_REQUEST');
  },
  SIGN_MESSAGE_SUCCESS() {
    console.debug('SIGN_MESSAGE_SUCCESS');
  },
  SIGN_MESSAGE_FAILURE(_state, payload) {
    console.debug('SIGN_MESSAGE_FAILURE', payload);
  },
  GET_BLOCK_REQUEST() {
    console.debug('GET_BLOCK_REQUEST');
  },
  GET_BLOCK_SUCCESS(_state, payload) {
    Vue.set(_state, 'blockNumber', payload);
    console.debug('GET_BLOCK_SUCCESS', payload);
  },
  GET_BLOCK_FAILURE(_state, payload) {
    console.debug('GET_BLOCK_FAILURE', payload);
  },
  METADATA_SUCCESS(_state, payload) {
    Vue.set(_state, 'spaces', payload);
    console.debug('METADATA_SUCCESS');
  }
};

// 
const actions = {
  login: async ({ dispatch }, connector = 'injected') => {
    auth = getInstance();
    await auth.login(connector);
    if (auth.provider) {
      web3 = new Web3Provider(auth.provider);

      // 传递给window对象，便于页面做判断web3有无加载完毕
      window.store_web3 = web3

      await dispatch('loadWeb3');
    }
  },
  logout: async ({ commit }) => {
    Vue.prototype.$auth.logout();
    commit('LOGOUT');
  },
  loadWeb3: async ({ commit, dispatch }) => {
    commit('LOAD_WEB3_REQUEST');
    try {
      await dispatch('loadProvider');
      await dispatch('lookupAddress');
      commit('LOAD_WEB3_SUCCESS');
      if (!state.injectedLoaded || state.injectedChainId !== config.chainId) {
        await dispatch('loadBackupProvider');
      } else {
        /**
        this.providerStatus.activeChainId = this.providerStatus.injectedChainId;
        this.providerStatus.injectedActive = true;
        if (this.providerStatus.account)
          this.fetchUserBlockchainData(this.providerStatus.account);
        */
      }
    } catch (e) {
      commit('LOAD_WEB3_FAILURE', e);
      return Promise.reject();
    }
  },
  loadProvider: async ({ commit, dispatch }) => {
    commit('LOAD_PROVIDER_REQUEST');
    try {
      if (auth.provider.removeAllListeners) auth.provider.removeAllListeners();
      if (auth.provider.on) {
        auth.provider.on('chainChanged', async () => {
          commit('HANDLE_CHAIN_CHANGED');
          if (state.active) {
            await dispatch('loadWeb3');
          }
        });
        auth.provider.on('accountsChanged', async accounts => {
          if (accounts.length === 0) {
            if (state.active) await dispatch('loadWeb3');
          } else {
            commit('HANDLE_ACCOUNTS_CHANGED', accounts[0]);
            await dispatch('loadWeb3');
          }
        });
        auth.provider.on('disconnect', async () => {
          commit('HANDLE_CLOSE');
          if (state.active) await dispatch('loadWeb3');
        });
        auth.provider.on('networkChanged', async () => {
          commit('HANDLE_NETWORK_CHANGED');
          if (state.active) {
            await dispatch('loadWeb3');
          }
        });
      }
      const network = await web3.getNetwork();
      const accounts = await web3.listAccounts();
      const account = accounts.length > 0 ? accounts[0] : null;
      commit('LOAD_PROVIDER_SUCCESS', {
        injectedLoaded: true,
        injectedChainId: network.chainId,
        account,
        name
      });
    } catch (e) {
      commit('LOAD_PROVIDER_FAILURE', e);
      return Promise.reject();
    }
  },
  loadBackupProvider: async ({ commit }) => {
    try {
      web3 = rpcProvider;
      const network = await rpcProvider.getNetwork();
      commit('LOAD_BACKUP_PROVIDER_SUCCESS', {
        injectedActive: false,
        backUpLoaded: true,
        account: null,
        activeChainId: network.chainId
        // backUpWeb3: web3,
      });
    } catch (e) {
      commit('LOAD_BACKUP_PROVIDER_FAILURE', e);
      return Promise.reject();
    }
  },
  lookupAddress: async ({ commit }) => {
    commit('LOOKUP_ADDRESS_REQUEST');
    try {
      const name = await web3.lookupAddress(state.account);
      commit('LOOKUP_ADDRESS_SUCCESS', name);
      return name;
    } catch (e) {
      commit('LOOKUP_ADDRESS_FAILURE', e);
    }
  },
  resolveName: async ({ commit }, payload) => {
    commit('RESOLVE_NAME_REQUEST');
    try {
      const address = await web3.resolveName(payload);
      commit('RESOLVE_NAME_SUCCESS');
      return address;
    } catch (e) {
      commit('RESOLVE_NAME_FAILURE', e);
      return Promise.reject();
    }
  },
  sendTransaction: async (
    { commit },
    [contractType, contractAddress, action, params]
  ) => {
    commit('SEND_TRANSACTION_REQUEST');
    try {
      const signer = web3.getSigner();
      const contract = new Contract(
        getAddress(contractAddress),
        abi[contractType],
        web3
      );
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner[action](...params);
      await tx.wait();
      commit('SEND_TRANSACTION_SUCCESS');
      return tx;
    } catch (e) {
      commit('SEND_TRANSACTION_FAILURE', e);
      return Promise.reject();
    }
  },
  signMessage: async ({ commit }, message) => {
    commit('SIGN_MESSAGE_REQUEST');
    try {
      const signer = web3.getSigner();
      const sig = await signer.signMessage(message);
      commit('SIGN_MESSAGE_SUCCESS');
      return sig;
    } catch (e) {
      commit('SIGN_MESSAGE_FAILURE', e);
      return Promise.reject(e);
    }
  },
  getBlockNumber: async ({ commit }) => {
    commit('GET_BLOCK_REQUEST');
    try {
      const blockNumber: any = await rpcProvider.getBlockNumber();
      commit('GET_BLOCK_SUCCESS', parseInt(blockNumber));
      return blockNumber;
    } catch (e) {
      commit('GET_BLOCK_FAILURE', e);
      return Promise.reject();
    }
  },
  
  // 20201127新使用
  //该地址是否已经同意了动用JGN
  hasApproveJGN: async ({ commit }, address) => {
    console.log('=== into === hasApproveJGN',address)
    const signer = web3.getSigner();
    const lp_contract = new Contract(JGN_TOKEN_ADDRESS, JGN_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    const b_num = await lp_WithSigner.allowance(address,LOTTERY_ADDRESS);
    if(b_num > 0){
      return true;
    }
    return false;
  },

  // 20201127新使用
  //同意动用JGN
  approveJGN: async (context) => {
    console.log('=== into === approveJGN')
    const signer = web3.getSigner();
    const lp_contract = new Contract(JGN_TOKEN_ADDRESS, JGN_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    await lp_WithSigner.approve(LOTTERY_ADDRESS,parseUnits('1',36));
    // 授权成功后更新全局jgn状态
    context.commit('setWeb3Data',{
      status_account_approved_jgn: true,
    })
  },

  //抽彩票
  draw: async ({ commit }, obj,address) => {
    console.log('=== into === draw', obj)
    let num = ''+ obj.num
    const signer = web3.getSigner();
    const vaults_contract = new Contract(LOTTERY_ADDRESS,LOTTERY_ABI,web3);
    const vaults_WithSigner = vaults_contract.connect(signer);
    
    var tx = await vaults_WithSigner.draw({gasLimit: 450000});
    
    if(obj&&obj.callHookOnDraw){
      obj.callHookOnDraw()
    }

    await web3.waitForTransaction(tx.hash);
    let receipt = await web3.getTransactionReceipt(tx.hash);
    console.log(receipt);

    let result = receipt['status']
    if (result > 0){
      console.log('true')
      return true;
    }
    console.log('false')
    return false;

  },

  getDrawResult: async ({ commit }, address) => {
    console.log('=== into === getDrawResult')
    const signer = web3.getSigner();
    const vaults_contract = new Contract(LOTTERY_ADDRESS,LOTTERY_ABI,web3);
    const vaults_WithSigner = vaults_contract.connect(signer);
    //await vaults_WithSigner.draw(parseUnits(num,18));
    let b_num = await vaults_WithSigner.getLastReward(address);
    let b = parseInt(b_num)
    console.log(b);
    return b
  },

  // 20201127新使用
  //得到钱包JGN数量
  getJGNBalance:async ({ commit }, address) => {
    //console.log('=== into === getJGNBalance',address)
    const signer = web3.getSigner();
    const vaults_contract = new Contract(JGN_TOKEN_ADDRESS, JGN_TOKEN_ABI, web3);
    const vaults_WithSigner = vaults_contract.connect(signer);
    let b_num = await vaults_WithSigner.balanceOf(address);
    // let b = parseInt(b_num)/1e18;
    let b = formatUnits(b_num,18);
    return b;
  },


  ntfTotalSupply: async ({ commit }, cardID) => {
    console.log('=== into === ntfTotalSupply', cardID)
    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS,NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    let b_num = await lp_WithSigner.maxSupply(cardID);
    console.log('ntfTotalSupply:'+cardID+':'+b_num);
    return b_num;
  },


  ntfMinted: async ({ commit }, cardID) => {
    console.log('=== into === ntfMinted', cardID)
    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS,NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    let b_num = await lp_WithSigner.totalSupply(cardID);
    console.log('ntfMinted:'+cardID+':'+b_num);
    return b_num;
  },


  myCollections: async ({ commit },address) => {
    console.log('=== into === myCollections',address);
    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS,NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);

    var aarray:any = [];
    var cardIDs:any = [];
    for (let index = 0; index < 18; index++) {
      aarray.push(address);
      cardIDs.push(index+1);
    }
    let b_num = await lp_WithSigner.balanceOfBatch(aarray,cardIDs);
    var results:any = []
    for (let index = 0; index < b_num.length; index++) {
      let element = b_num[index];
      let e = parseInt(element);
      results.push(e);
    }
    return results;
  },

  //查看该地址是否可以兑换奖品，address-钱包地址，index-序号
  canRedeem: async ({ commit }, obj) => {
    let {address,index} = obj
    console.log('=== into === canRedeem',address)
    const signer = web3.getSigner();
    const lp_contract = new Contract(REDEEM_ADDRESS,REDEEM_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    const b_num = await lp_WithSigner.reward_level(index,address);
    return b_num;
  },
  
  //兑换奖品，index-序号
  redeem: async ({ commit },obj) => {
    const {index} = obj
    console.log('=== into === redeem')
    const signer = web3.getSigner();
    const lp_contract = new Contract(REDEEM_ADDRESS,REDEEM_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    //await lp_WithSigner.getReward(index);
    await lp_WithSigner.redeemReward();
  },

  
  //该地址是否已经同意了动用NFT来兑换奖品
  hasApproveNFT: async ({ commit }, address) => {
    console.log('=== into === hasApproveNFT',address)
    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS, NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    const b_num = await lp_WithSigner.isApprovedForAll(address,REDEEM_ADDRESS);
    if(b_num > 0){
      return true;
    }
    return false;
  },


  //同意动用NFT来兑换奖品
  approveNFT: async (context) => {
    console.log('=== into === approveNFT')
    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS, NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    await lp_WithSigner.setApprovalForAll(REDEEM_ADDRESS,true);
  },

  //得到奖品一共有多少个
  maxRewardNum: async ({ commit }, index) => {
    console.log('=== into === maxRewardNum')
    const signer = web3.getSigner();
    const lp_contract = new Contract(REDEEM_ADDRESS,REDEEM_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    let b_num;
    if(index == 1){
      b_num = await lp_WithSigner.maxRewardLevel1Number();
    } else if(index == 2){
      b_num = await lp_WithSigner.maxRewardLevel2Number();
    } else if(index == 3){
      b_num = await lp_WithSigner.maxRewardLevel3Number();
    } else if(index == 4){
      b_num = await lp_WithSigner.maxRewardLevel4Number();
    } 
    let b = parseInt(b_num);
    console.log('maxRewardNum:',b);
    return b;
  },

  //得到已经兑换了奖品有多少个，用上面这个函数减去这个，得到还剩下多少个
  currentRewardNum: async ({ commit }, index) => {
    console.log('=== into === currentRewardNum')
    const signer = web3.getSigner();
    const lp_contract = new Contract(REDEEM_ADDRESS,REDEEM_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);
    let b_num;
    if(index == 1){
      b_num = await lp_WithSigner.currentRewardLevel1Number();
    } else if(index == 2){
      b_num = await lp_WithSigner.currentRewardLevel2Number();
    } else if(index == 3){
      b_num = await lp_WithSigner.currentRewardLevel3Number();
    } else if(index == 4){
      b_num = await lp_WithSigner.currentRewardLevel4Number();
    } 
    let b = parseInt(b_num);
    console.log('currentRewardNum:',b);
    return b;
  },

  transferNFT: async ({ commit }, obj) => {

    console.log('=== into === transferNFT',obj)

    let {address,toAddress,num,nft_id} = obj

    const signer = web3.getSigner();
    const lp_contract = new Contract(NTFS_TOKEN_ADDRESS, NTFS_TOKEN_ABI, web3);
    const lp_WithSigner = lp_contract.connect(signer);

    await lp_WithSigner.safeTransferFrom(address,toAddress,nft_id,num,'0x0000000000000000000000000000000000000000');

    if(obj && obj.callback){
      obj.callback()
    }
    
  },
  

  metadata: async ({ commit }) => {
    // try {
    //   const noDecimals = ['yearn'];
    //   const response = await multicall(
    //     rpcProvider,
    //     abi['TestToken'],
    //     Object.values(spaces)
    //       .filter((space: any) => !noDecimals.includes(space.key))
    //       .map((space: any) => [space.address, 'decimals', []])
    //   );
    //   const payload = Object.fromEntries(
    //     response.map((item, i) => [
    //       // @ts-ignore
    //       Object.values(spaces).filter(
    //         (space: any) => !noDecimals.includes(space.key)
    //       )[i].address,
    //       { decimals: response[i][0] }
    //     ])
    //   );
    //   payload['0xBa37B002AbaFDd8E89a1995dA52740bbC013D992'] = { decimals: 18 };
    //   commit('METADATA_SUCCESS', payload);
    //   return payload;
    // } catch (e) {
    //   console.log(e);
    //   return Promise.reject();
    // }
  },
};

export default {
  state,
  mutations,
  actions
};
