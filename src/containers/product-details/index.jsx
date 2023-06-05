import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";

// Demo Image

const ProductDetailsArea = ({ space, className, product }) => (
    <div
        className={clsx(
            "product-details-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <Sticky>
                        <GalleryTab images={[product.image]} />
                    </Sticky>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                    <div className="rn-pd-content-area">
                        <ProductTitle title={product.name} likeCount={0} />
                        <span className="bid">
                            {/* Height bid{" "} */}
                            <span
                                className="price"
                                style={{ fontSize: "16px" }}
                            >
                                {product.price}
                                ETH
                            </span>
                        </span>
                        {/* <h6 className="title-name">#22 Portal , Info bellow</h6> */}
                        {/* <div className="catagory-collection"> */}
                        {/*    <ProductCategory owner={product.owner} /> */}
                        {/*    <ProductCollection */}
                        {/*        collection={product.collection} */}
                        {/*    /> */}
                        {/* </div> */}
                        <div className="rn-bid-details">
                            <BidTab
                                desc={product.description}
                                bids={[]}
                                owner={{}}
                                properties={[]}
                                tags={[]}
                                history={[]}
                            />
                            {product.creatorId.walletId !==
                                localStorage.getItem("walletId") && (
                                <PlaceBet
                                    isOwn={product.isOwn}
                                    productName={product.name}
                                    price={product.price}
                                    tokenId={product.tokenId}
                                    // highest_bid={product.highest_bid}
                                    // auction_date={product?.auction_date}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    product: PropTypes.any,
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
