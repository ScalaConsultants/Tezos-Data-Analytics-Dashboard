export const loadBlockchain = () => {
  try {
    const serializeBlockchain = localStorage.getItem('blockchain');
    if (serializeBlockchain === null) {
      return undefined;
    }
    return JSON.parse(serializeBlockchain);
  } catch (err) {
    return undefined;
  }
};

export const saveBlockchain = (blockchain: any) => {
  try {
    const serializedBlockchain = JSON.stringify(blockchain.slice(0, 25000));
    localStorage.setItem('blockchain', serializedBlockchain);
  } catch (err) {
    console.error(err);
  }
};
