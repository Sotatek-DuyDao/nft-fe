import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { getProductData } from "@utils/methods";
import Product from "@components/product/layout-01";
import axiosInstance from "../../lib/axios";

const AuthorProfileArea = ({ className }) => {
    const getMyOwnNft = async () => {
        const {
            data: { data: res },
        } = await axiosInstance.get(
            `tokens/my/${localStorage.getItem("walletId")}`
        );
        return getProductData(res);
    };
    const getCreatedNft = async () => {
        const {
            data: { data: res },
        } = await axiosInstance.get(
            `tokens/created/${localStorage.getItem("walletId")}`
        );
        return getProductData(res);
    };
    const [own, setOwn] = useState(null);
    const [created, setCreated] = useState(null);
    useEffect(() => {
        getMyOwnNft().then((res) => setOwn(res));
        getCreatedNft().then((res) => setCreated(res));
    }, []);
    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            Owned NFT
                                        </Nav.Link>
                                        {/*<Nav.Link*/}
                                        {/*    as="button"*/}
                                        {/*    eventKey="nav-liked"*/}
                                        {/*>*/}
                                        {/*    Created NFT*/}
                                        {/*</Nav.Link>*/}
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <TabContent className="tab-content rn-bid-content">
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {own ? (
                                <>
                                    {own.map((prod) => (
                                        <div
                                            key={prod.tokenId}
                                            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                        >
                                            <Product
                                                overlay
                                                placeBid={false}
                                                title={prod.name}
                                                slug={prod.tokenId.toString()}
                                                latestBid=""
                                                price={{
                                                    amount: prod.price,
                                                    currency: "ETH",
                                                }}
                                                likeCount={0}
                                                auction_date=""
                                                image={{ src: prod.image }}
                                                authors={prod.authors}
                                                bitCount={0}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div />
                            )}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            {created ? (
                                <>
                                    {created.map((prod) => (
                                        <div
                                            key={prod.id}
                                            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                        >
                                            <Product
                                                overlay
                                                placeBid
                                                title={prod.name}
                                                slug={prod.tokenId.toString()}
                                                latestBid=""
                                                price={{
                                                    amount: prod.price,
                                                    currency: "ETH",
                                                }}
                                                likeCount={0}
                                                auction_date=""
                                                image={{ src: prod.image }}
                                                authors={prod.authors}
                                                bitCount={0}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div />
                            )}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};
export default AuthorProfileArea;
