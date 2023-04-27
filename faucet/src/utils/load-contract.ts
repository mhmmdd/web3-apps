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

  try {
    return await contractInstance.deployed();
  } catch (e){
    throw new Error(
      `Contract ${contractName} not deployed to detected network. Please check that your provider settings are correct.`
    );
  }
};
