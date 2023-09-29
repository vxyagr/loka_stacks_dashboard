//setter

export const buyLoka = async (loka, investmentValue, currentDurationValue) => {
  const mint = await loka.mintContract(
    investmentValue,
    currentDurationValue * 28
  );
  console.log("NFT id " + mint);
};

//getter
