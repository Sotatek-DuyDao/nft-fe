import PropTypes from "prop-types";
import clsx from "clsx";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import DetailsTabContent from "./details-tab-content";

const BidTab = ({
    className,
    bids,
    owner,
    properties,
    tags,
    history,
    desc,
}) => {
    console.log("desc", desc);
    return (
        <TabContainer defaultActiveKey="nav-profile">
            <div className={clsx("tab-wrapper-one", className)}>
                <nav className="tab-button-one">
                    <Nav as="div" className="nav-tabs">
                        <Nav.Link as="button" eventKey="nav-profile">
                            Details
                        </Nav.Link>
                    </Nav>
                </nav>
                <TabContent className="rn-bid-content">
                    <TabPane eventKey="nav-profile">
                        <DetailsTabContent
                            desc={desc}
                            owner={owner}
                            properties={properties}
                            tags={tags}
                        />
                    </TabPane>
                </TabContent>
            </div>
        </TabContainer>
    );
};

BidTab.propTypes = {
    className: PropTypes.string,
    bids: PropTypes.arrayOf(PropTypes.shape({})),
    owner: PropTypes.shape({}),
    properties: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.arrayOf(PropTypes.shape({})),
    desc: PropTypes.string,
};

export default BidTab;
