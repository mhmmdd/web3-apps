// @ts-ignore
import contract from '@truffle/contract';

// load contract from public folder
export const loadContract = async (contractName: string, provider: any) => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/contracts/${contractName}.json`
  );
  const json = await response.json();
  const contractInstance = contract(json);
  contractInstance.setProvider(provider);

  return await contractInstance.deployed();
};
