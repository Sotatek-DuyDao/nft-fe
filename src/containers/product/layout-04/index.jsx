import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Anchor from "@ui/anchor";
import { ProductType, SectionTitleType } from "@utils/types";
import Product from "@components/product/layout-01";

const ProductArea = ({ space, className, data, newItems }) => (
    <div
        className={clsx(
            "rn-new-items",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row mb--50 align-items-center">
                {data?.section_title && (
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <SectionTitle
                            {...data.section_title}
                            className="mb-0 live-bidding-title"
                        />
                    </div>
                )}

                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                    <div
                        className="view-more-btn text-start text-sm-end"
                        data-sal-delay="150"
                        data-sal="slide-up"
                        data-sal-duration="800"
                    >
                        <Anchor className="btn-transparent" path="/explore">
                            VIEW ALL
                            <i className="feather feather-arrow-right" />
                        </Anchor>
                    </div>
                </div>
            </div>
            <div className="row g-5">
                {newItems &&
                    newItems.map((prod) => (
                        <div
                            key={prod.tokenId.toString()}
                            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                        >
                            <Product
                                title={prod.name}
                                slug={prod.tokenId.toString()}
                                latestBid={data.products[0].latestBid}
                                price={{
                                    amount: prod.price,
                                    currency: "ETH",
                                }}
                                likeCount={data.products[0].likeCount}
                                image={{ src: prod.image }}
                                authors={data.products[0].authors}
                                bitCount={data.products[0].bitCount}
                            />
                        </div>
                    ))}
            </div>
        </div>
    </div>
);

ProductArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    newestItemsProps: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    newItems: PropTypes.array,
};

ProductArea.defaultProps = {
    space: 1,
};

export default ProductArea;
