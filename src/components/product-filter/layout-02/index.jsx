import PropTypes from "prop-types";
import NiceSelect from "@ui/nice-select";

const ProductFilter = ({ sortHandler }) => (
    <div className="default-exp-wrapper">
        <div className="inner">
            <div className="filter-select-option">
                <h6 className="filter-leble">Sort</h6>
                <NiceSelect
                    options={[
                        { value: 1, text: "Price low to high" },
                        { value: 2, text: "Price high to low" },
                        { value: 3, text: "Newest item" },
                    ]}
                    placeholder="Price low to high"
                    onChange={sortHandler}
                    defaultCurrent={3}
                    name="Sort"
                />
            </div>
            {/* <div className="filter-select-option"> */}
            {/*    <h6 className="filter-leble">Category</h6> */}
            {/*    <NiceSelect */}
            {/*        options={[ */}
            {/*            { value: "all", text: "All Category" }, */}
            {/*            { value: "art", text: "Art" }, */}
            {/*            { value: "music", text: "Music" }, */}
            {/*            { value: "video", text: "Video" }, */}
            {/*            { value: "Collectionable", text: "Collectionable" }, */}
            {/*        ]} */}
            {/*        placeholder="Category" */}
            {/*        onChange={slectHandler} */}
            {/*        name="category" */}
            {/*    /> */}
            {/* </div> */}
            {/* <div className="filter-select-option"> */}
            {/*    <h6 className="filter-leble">Collections</h6> */}
            {/*    <NiceSelect */}
            {/*        options={[ */}
            {/*            { value: "all", text: "All Collection" }, */}
            {/*            { value: "Art Decco", text: "Art Decco" }, */}
            {/*            { */}
            {/*                value: "BoredApeYachtClub", */}
            {/*                text: "BoredApeYachtClub", */}
            {/*            }, */}
            {/*            { */}
            {/*                value: "MutantApeYachtClub", */}
            {/*                text: "MutantApeYachtClub", */}
            {/*            }, */}
            {/*            { */}
            {/*                value: "Art Blocks Factory", */}
            {/*                text: "Art Blocks Factory", */}
            {/*            }, */}
            {/*        ]} */}
            {/*        placeholder="Collections" */}
            {/*        onChange={slectHandler} */}
            {/*        name="collection" */}
            {/*    /> */}
            {/* </div> */}

            {/* <div className="filter-select-option"> */}
            {/*    <h6 className="filter-leble">Sale type</h6> */}
            {/*    <NiceSelect */}
            {/*        options={[ */}
            {/*            { value: "all", text: "All Type" }, */}
            {/*            { value: "fixed-price", text: "Fixed price" }, */}
            {/*            { value: "timed-auction", text: "Timed auction" }, */}
            {/*            { value: "not-for-sale", text: "Not for sale" }, */}
            {/*            { */}
            {/*                value: "open-for-offers", */}
            {/*                text: "Open for offers", */}
            {/*            }, */}
            {/*        ]} */}
            {/*        placeholder="Sale type" */}
            {/*        onChange={slectHandler} */}
            {/*        name="sale_type" */}
            {/*    /> */}
            {/* </div> */}
            {/* <div className="filter-select-option"> */}
            {/*    <h6 className="filter-leble">Price Range</h6> */}
            {/*    <div className="price_filter s-filter clear"> */}
            {/*        <form action="#" method="GET"> */}
            {/*            <InputRange */}
            {/*                values={inputs.price} */}
            {/*                onChange={priceHandler} */}
            {/*            /> */}
            {/*        </form> */}
            {/*    </div> */}
            {/* </div> */}
        </div>
    </div>
);

ProductFilter.displayName = "ProductFilter";

ProductFilter.propTypes = {
    sortHandler: PropTypes.func,
};
export default ProductFilter;
