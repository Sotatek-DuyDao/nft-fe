import { ethers } from "ethers";
import axios from "axios";
import nftABI from "./NftMarketPlace.json";

export const getContract = () => {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_ADDRESS
    );
    const singer = provider.getSigner(process.env.NEXT_PUBLIC_SIGNER_ADDRESS);
    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        nftABI.abi,
        provider
    );
    return {
        provider,
        singer,
        contract,
    };
};
export const fetchNewestItem = async () => {
    const { contract } = getContract();
    let newestItem = await contract.fetchMarketItems();
    newestItem = await Promise.all(
        newestItem.map(async (i) => {
            const tokenURI = await contract.tokenURI(`${i.tokenId}`);
            let meta = await axios.get(tokenURI);
            meta = meta.data;
            const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
            return {
                tokenId: i.tokenId,
                name: meta.name,
                description: meta.description,
                image: imageUrl.split(" ").join(""),
                price: ethers.utils.formatEther(i.price),
            };
        })
    );
    return newestItem;
};
export const createMarketSale = async (tokenId) => {
    const { contract } = getContract();
    return contract.createMarketSale(tokenId);
};
