import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import ProductFilter from "@components/product-filter/layout-02";
import { SectionTitleType } from "@utils/types";
import axios from "axios";
import productData from "../../../data/products.json";
import axiosInstance from "../../../lib/axios";

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

const ExploreProductArea = ({ className, space, data }) => {
    const [sort, setSort] = useState(1);
    const [products, setProducts] = useState([]);
    const sortHandler = ({ value }) => {
        setSort(value);
    };
    const fetchItems = async () => {
        const res = await axiosInstance.get(`/tokens?page=1&sort=${sort}`);
        return Promise.all(
            res.data.data.map(async (i) => {
                let meta = await axios.get(i.tokenURI);
                meta = meta.data;
                const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
                return {
                    tokenId: i.id,
                    name: meta.name,
                    description: meta.description,
                    image: imageUrl.split(" ").join(""),
                    price: i.price,
                };
            })
        );
    };
    useEffect(() => {
        fetchItems().then((res) => setProducts(res));
    }, [sort]);
    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                {data?.section_title && (
                    <div className="row mb--30 align-items-center">
                        <div className="col-12">
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        </div>
                    </div>
                )}

                <ProductFilter
                    slectHandler={() => null}
                    sortHandler={sortHandler}
                    priceHandler={() => null}
                    inputs={[]}
                />
                <div className="row g-5">
                    {products.length > 0 ? (
                        <>
                            {products.map((prod) => (
                                <div
                                    key={prod.tokenId}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        title={prod.name}
                                        slug={prod.tokenId}
                                        latestBid=""
                                        price={{
                                            amount: prod.price,
                                            currency: "ETH",
                                        }}
                                        likeCount={productData[0].likeCount}
                                        image={{ src: prod.image }}
                                        authors={productData[0].authors}
                                        bitCount={productData[0].bitCount}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No item to show</p>
                    )}
                </div>
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        placeBid: PropTypes.bool,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;
