import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { useBalance } from "wagmi";

const UserDropdown = ({ onDisconnect, address }) => {
    const { data, isSuccess } = useBalance({
        address,
        watch: true,
    });
    return (
        <div className="icon-box">
            <Anchor path="/author">
                <Image
                    src="/images/icons/boy-avater.png"
                    alt="Images"
                    width={38}
                    height={38}
                />
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    {/* <h4 className="title"> */}
                    {/*    <Anchor path="/product">Christopher William</Anchor> */}
                    {/* </h4> */}
                    {/* <span> */}
                    {/*    <Anchor path="/product">Set Display Name</Anchor> */}
                    {/* </span> */}
                </div>
                <div className="rn-product-inner">
                    <ul className="product-list">
                        <li className="single-product-list">
                            <div className="thumbnail">
                                <Anchor path="/product">
                                    <Image
                                        src="/images/portfolio/portfolio-01.jpg"
                                        alt="Nft Product Images"
                                        width={50}
                                        height={50}
                                    />
                                </Anchor>
                            </div>
                            <div className="content">
                                <h6 className="title">
                                    <Anchor path="/product">Balance</Anchor>
                                </h6>
                                {isSuccess && (
                                    <span className="price">
                                        {data.formatted} ETH
                                    </span>
                                )}
                            </div>
                            <div className="button" />
                        </li>
                    </ul>
                </div>
                {/* <div className="add-fund-button mt--20 pb--20"> */}
                {/*   <Anchor */}
                {/*       className="btn btn-primary-alta w-100" */}
                {/*       path="/connect" */}
                {/*   > */}
                {/*       Add Your More Funds */}
                {/*   </Anchor> */}
                {/* </div> */}
                <ul className="list-inner">
                    {/* <li> */}
                    {/*    <Anchor path="/author">My Profile</Anchor> */}
                    {/* </li> */}
                    {/* <li> */}
                    {/*    <Anchor path="/edit-profile">Edit Profile</Anchor> */}
                    {/* </li> */}
                    {/* <li> */}
                    {/*    <Anchor path="/connect">Manage funds</Anchor> */}
                    {/* </li> */}
                    <li>
                        <button type="button" onClick={onDisconnect}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

UserDropdown.propTypes = {
    onDisconnect: PropTypes.func.isRequired,
    address: PropTypes.string,
};

export default UserDropdown;
