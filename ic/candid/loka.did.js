export const idlFactory = ({ IDL }) => {
  const NFTContract = IDL.Record({
    id: IDL.Nat,
    end: IDL.Nat,
    durationText: IDL.Text,
    claimedBTC: IDL.Nat,
    claimedLOM: IDL.Nat,
    duration: IDL.Nat,
    hashrate: IDL.Nat,
    owner: IDL.Text,
    metadata: IDL.Text,
    electricityPerDay: IDL.Nat,
    start: IDL.Nat,
    LETBalance: IDL.Nat,
    amount: IDL.Nat,
    daysLeft: IDL.Nat,
    claimableBTC: IDL.Nat,
    claimableLOM: IDL.Nat,
  });
  return IDL.Service({
    claimBTC: IDL.Func([IDL.Nat], [IDL.Nat], []),
    claimLOM: IDL.Func([IDL.Nat], [IDL.Nat], []),
    distributeBTC: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    distributeLOM: IDL.Func([IDL.Nat], [IDL.Nat], []),
    getContractAmount: IDL.Func([IDL.Nat], [IDL.Text], ["query"]),
    getNFTContract: IDL.Func([IDL.Nat], [NFTContract], ["query"]),
    getOwnedContracts: IDL.Func([], [IDL.Vec(NFTContract)], ["query"]),
    greet: IDL.Func([], [IDL.Text], ["query"]),
    mintContract: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
      [IDL.Nat],
      []
    ),
    pauseContract: IDL.Func([IDL.Bool], [IDL.Bool], []),
    rechargeLET: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
