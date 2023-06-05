import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";

const Countdown = dynamic(() => import("@ui/countdown/layout-02"), {
    ssr: false,
});

const PlaceBet = ({ productName, price, tokenId, isOwn }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <Button
                color="primary-alta"
                className="mt--30 w-100"
                onClick={handleBidModal}
            >
                {isOwn ? "Resell item" : "Buy item"}
            </Button>
            <PlaceBidModal
                isOwn={isOwn}
                tokenId={tokenId}
                show={showBidModal}
                handleModal={handleBidModal}
                productName={productName}
                price={price}
            />
        </>
    );
};

PlaceBet.propTypes = {
    // highest_bid: PropTypes.shape({
    //     amount: PropTypes.string,
    //     bidder: PropTypes.shape({
    //         name: PropTypes.string,
    //         image: ImageType,
    //         slug: PropTypes.string,
    //     }),
    // }),
    // auction_date: PropTypes.string,
    // btnColor: PropTypes.string,
    // className: PropTypes.string,
    isOwn: PropTypes.bool.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    tokenId: PropTypes.string.isRequired,
};

export default PlaceBet;
