const { ethers, network } = require("hardhat");
const { daiAbi } = require('./dai.js');

const HACKER = '0xc759659E0E4B6207d522b7121742A5cC06C822b5';
const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';
const UNISWAP_V3_DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';

async function main() {
  console.log('main');

  const [signer] = await ethers.getSigners();

  const dai = new ethers.Contract(DAI, daiAbi, signer);

  console.log('impersonating uniswap ', UNISWAP_V3_DAI);

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [UNISWAP_V3_DAI],
  });

  const uniswapSigner = await ethers.provider.getSigner(UNISWAP_V3_DAI);

  console.log('funding UNISWAP_V3_DAI with ETH');

  console.log('existing ETH balance:', await ethers.provider.getBalance(UNISWAP_V3_DAI));

  await ethers.provider.send("hardhat_setBalance", [
    UNISWAP_V3_DAI,
    '0xfffffffffffffffffffffff',
  ]);

  console.log('updated ETH balance:', await ethers.provider.getBalance(UNISWAP_V3_DAI));

  console.log('HACKER Dai Balance pre-transfer:', await dai.balanceOf(HACKER));
  console.log('UNISWAP_V3_DAI Dai Balance pre-transfer:', await dai.balanceOf(UNISWAP_V3_DAI));

  await dai.connect(uniswapSigner).transferFrom(UNISWAP_V3_DAI, HACKER, 100);

  console.log('HACKER Dai Balance post-transfer:', await dai.balanceOf(HACKER));
  console.log('UNISWAP_V3_DAI Dai Balance post-transfer:', await dai.balanceOf(UNISWAP_V3_DAI));

  console.log('done'); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
