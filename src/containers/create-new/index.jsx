/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { storeNFT } from "@utils/methods";
import { useAccount, useConnect, useContract, useSigner } from "wagmi";
import abi from "@utils/NftMarketPlace.json";
import { ethers } from "ethers";

const CreateNewArea = ({ className, space }) => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const { connect, connectors } = useConnect();
    const { isConnected } = useAccount();
    const { data } = useSigner();
    const contract = useContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: abi.abi,
        signerOrProvider: data,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    // eslint-disable-next-line no-shadow
    const onSubmit = async (data, e) => {
        if (!isConnected) {
            connect({ connector: connectors[0] });
        }
        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;
        setHasImageError(!selectedImage);
        if (isPreviewBtn && selectedImage) {
            setPreviewData({ ...data, image: selectedImage });
            setShowProductModal(true);
        }
        if (!isPreviewBtn) {
            const id = toast.loading("Submitting...", { autoClose: 2000 });
            storeNFT(selectedImage, data.name, data.description).then(
                async (link) => {
                    const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(
                        7
                    )}`;
                    const price = ethers.utils.parseUnits(data.price, "ether");
                    let listingPrice = await contract.getListingPrice();
                    listingPrice = listingPrice.toString();
                    contract
                        .createToken(ipfsURL, price, { value: listingPrice })
                        .then(() => {
                            toast.update(id, {
                                render: "Your NFT submitted",
                                type: "success",
                                isLoading: false,
                                autoClose: 200,
                            });
                            reset();
                            setSelectedImage();
                        })
                        .catch((err) =>
                            toast.update(id, {
                                render: err.message,
                                type: "error",
                                isLoading: false,
                            })
                        );
                }
            );
        }
    };
    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="upload-area">
                                    <div className="upload-formate mb--30">
                                        <h6 className="title">Upload file</h6>
                                        <p className="formate">
                                            Drag or choose your file to upload
                                        </p>
                                    </div>

                                    <div className="brows-file-wrapper">
                                        <input
                                            {...register("nftThumbnail", {
                                                required: "Image is required",
                                                validate: {
                                                    lessThan10MB: (files) =>
                                                        files[0]?.size <
                                                            10000000 ||
                                                        "Max 10MB",
                                                    acceptedFormats: (files) =>
                                                        [
                                                            "image/jpeg",
                                                            "image/png",
                                                            "image/gif",
                                                        ].includes(
                                                            files[0]?.type
                                                        ) ||
                                                        "Only PNG, JPEG e GIF",
                                                },
                                            })}
                                            name="nftThumbnail"
                                            id="file"
                                            type="file"
                                            className="inputfile"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                            onChange={imageChange}
                                        />
                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="file"
                                            title="No File Chosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, WEBP, MP4 or MP3.{" "}
                                                <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Image is required</ErrorText>
                                    )}
                                </div>

                                {/* eslint-disable-next-line max-len */}
                                {/* <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block"> */}
                                {/*    <h5> Note: </h5> */}
                                {/*    <span> */}
                                {/*        {" "} */}
                                {/*        Service fee : <strong>2.5%</strong>{" "} */}
                                {/*    </span>{" "} */}
                                {/*    <br /> */}
                                {/*    <span> */}
                                {/*        {" "} */}
                                {/*        You will receive :{" "} */}
                                {/*        <strong>25.00 ETH $50,000</strong> */}
                                {/*    </span> */}
                                {/* </div> */}
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row h-100">
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    Product Name
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `Digital Awesome Game`"
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                    })}
                                                />
                                                {errors.name && (
                                                    <ErrorText>
                                                        {errors.name?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Description"
                                                    className="form-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows="3"
                                                    placeholder="e. g. “After purchasing the product you can get item...”"
                                                    {...register(
                                                        "description",
                                                        {
                                                            required:
                                                                "Description is required",
                                                        }
                                                    )}
                                                />
                                                {errors.description && (
                                                    <ErrorText>
                                                        {
                                                            errors.description
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="price"
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
                                                        required:
                                                            "Price is required",
                                                    })}
                                                />
                                                {errors.price && (
                                                    <ErrorText>
                                                        {errors.price?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    Preview
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            <div className="input-box">
                                                <Button type="submit" fullwidth>
                                                    Submit Item
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2.5%</strong>{" "}
                                </span>{" "}
                                <br />
                                <span>
                                    {" "}
                                    You will receive :{" "}
                                    <strong>25.00 ETH $50,000</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
};

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
