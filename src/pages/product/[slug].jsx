import PropTypes from "prop-types";
import Wrapper from "@layout/wrapper";
import SEO from "@components/seo";
import { Breadcrumb } from "react-bootstrap";
import ProductDetailsArea from "@containers/product-details";
import Footer from "@layout/footer/footer-01";
import Header from "@layout/header/header-01";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

const ProductDetails = ({ recentViewProducts, relatedProducts }) => {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const fetchProductDetail = async (id) => {
        const {
            data: { data: productData },
        } = await axiosInstance.get(`tokens/${id}`);
        let meta = await axios.get(productData.tokenURI);
        meta = meta.data;
        const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
        return {
            ...productData,
            image: imageUrl.split(" ").join(""),
            name: meta.name,
            tokenId: productData.id,
            description: meta.description,
            isOwn:
                localStorage.getItem("walletId") ===
                productData?.ownerId?.walletId,
        };
    };
    useEffect(() => {
        fetchProductDetail(router.query.slug).then((res) => setProduct(res));
    }, [router.query]);
    return (
        <Wrapper>
            <SEO pageTitle="Product Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Product Details"
                    currentPage="Product Details"
                />
                {product && <ProductDetailsArea product={product} />}
                {/* <ProductArea
                    data={{
                        section_title: { title: "Recent View" },
                        products: recentViewProducts,
                    }}
                />
                <ProductArea
                    data={{
                        section_title: { title: "Related Item" },
                        products: relatedProducts,
                    }}
                /> */}
            </main>
            <Footer />
        </Wrapper>
    );
};
export const getStaticPaths = async () => ({
    paths: [], // indicates that no page needs be created at build time
    fallback: "blocking", // indicates the type of fallback
});

export async function getStaticProps({ params }) {
    return {
        props: {
            className: "template-color-1",
            recentViewProducts: [],
            relatedProducts: [],
        }, // will be passed to the page component as props
    };
}

ProductDetails.propTypes = {
    recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
    relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductDetails;
