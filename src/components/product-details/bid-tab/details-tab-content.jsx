import PropTypes from "prop-types";

const DetailsTabContent = ({ desc }) => (
    <div className="rn-pd-bd-wrapper">
        {/* <TopSeller */}
        {/*    name={owner.name} */}
        {/*    total_sale={owner.total_sale} */}
        {/*    slug={owner.slug} */}
        {/*    image={owner.image} */}
        {/* /> */}
        {desc && (
            <div className="rn-pd-sm-property-wrapper">
                <div className="property-wrapper">
                    <div key="1" className="pd-property-inner">
                        <span className="color-body type">Description</span>
                        <span className="color-white value">{desc}</span>
                    </div>
                </div>
            </div>
        )}
    </div>
);

DetailsTabContent.propTypes = {
    // owner: PropTypes.shape({
    //     name: PropTypes.string,
    //     total_sale: PropTypes.number,
    //     slug: PropTypes.string,
    //     image: ImageType,
    // }),
    // properties: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: IDType,
    //         type: PropTypes.string,
    //         value: PropTypes.string,
    //     })
    // ),
    // tags: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: IDType,
    //         type: PropTypes.string,
    //         value: PropTypes.string,
    //     })
    // ),
    desc: PropTypes.string,
};

export default DetailsTabContent;
