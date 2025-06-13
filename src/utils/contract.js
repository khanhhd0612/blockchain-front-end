import { ethers } from 'ethers';
import abi from '../contracts/ElectionSystem.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const getContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask chưa được cài đặt');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ phải có await ở đây
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
  return contract;
};
