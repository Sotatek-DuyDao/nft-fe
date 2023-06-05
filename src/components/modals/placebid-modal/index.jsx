import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { useAccount, useBalance, useContract, useSigner } from "wagmi";
import { ethers } from "ethers";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import nftAbi from "../../../utils/NftMarketPlace.json";

const PlaceBidModal = ({
    show,
    handleModal,
    productName,
    price,
    tokenId,
    isOwn,
}) => {
    const { data: signer } = useSigner();
    const contract = useContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: nftAbi.abi,
        signerOrProvider: signer,
    });
    const { address } = useAccount();
    const { data, isSuccess } = useBalance({
        address,
        watch: true,
    });
    const onBuyItem = async () => {
        try {
            const priceParse = ethers.utils.parseUnits(price, "ether");
            const transaction = await contract.createMarketSale(tokenId, {
                value: priceParse,
            });
            await transaction.wait();
        } catch (e) {
            console.log("error", e.toString());
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const onResell = async (values) => {
        const priceResell = getValues("price");
        const priceParse = ethers.utils.parseUnits(
            priceResell.toString(),
            "ether"
        );
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();
        const transaction = await contract.resellToken(tokenId, priceParse, {
            value: listingPrice,
        });
        await toast.promise(
            transaction.wait(),
            {
                pending: "Reselling",
                success: "Resell success",
            },
            { autoClose: 2000 }
        );
    };
    return (
        <Modal
            className="rn-popup-modal placebid-modal-wrapper"
            show={show}
            onHide={handleModal}
            centered
        >
            {show && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleModal}
                >
                    <i className="feather-x" />
                </button>
            )}
            <Modal.Header>
                <h3 className="modal-title">
                    {isOwn ? "Resell item" : "Buy item"}
                </h3>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You are about to {isOwn ? "resell item" : "buy item"}{" "}
                    {productName}
                </p>
                <div className="placebid-form-box">
                    <div className="bid-content">
                        <div className="bid-content-mid">
                            {isOwn ? (
                                <form
                                    action="#"
                                    style={{ width: "100%" }}
                                    onSubmit={handleSubmit(onResell)}
                                >
                                    <label
                                        htmlFor="pric
                                        e"
                                        className="form-label"
                                    >
                                        Item Price in $
                                    </label>
                                    <input
                                        id="price"
                                        placeholder="e. g. `20$`"
                                        {...register("price", {
                                            pattern: {
                                                value: /^[+-]?\d+(\.\d+)?$/,
                                                message:
                                                    "Please enter a number",
                                            },
                                            required: "Price is required",
                                        })}
                                    />
                                    {errors.price && (
                                        <ErrorText>
                                            {errors.price?.message}
                                        </ErrorText>
                                    )}
                                </form>
                            ) : (
                                <>
                                    <div className="bid-content-left">
                                        <span>NFT price</span>
                                        <span>Your Balance</span>
                                        {/* <span>Service fee</span> */}
                                        {/* <span>Total bid amount</span> */}
                                    </div>
                                    <div className="bid-content-right">
                                        <span>{price} ETH</span>
                                        {isSuccess && (
                                            <span>{data.formatted} ETH</span>
                                        )}
                                        {/* <span>10 wETH</span> */}
                                        {/* <span>9588 wETH</span> */}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="bit-continue-button">
                        <Button
                            onClick={isOwn ? onResell : onBuyItem}
                            size="medium"
                            fullwidth
                        >
                            {isOwn ? "Resell" : "Buy"}
                        </Button>
                        <Button
                            color="primary-alta"
                            size="medium"
                            className="mt--10 w-100"
                            onClick={handleModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

PlaceBidModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    productName: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    price: PropTypes.any,
    tokenId: PropTypes.string.isRequired,
};
export default PlaceBidModal;
