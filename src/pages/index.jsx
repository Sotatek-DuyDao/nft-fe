import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import CategoryArea from "@containers/category/layout-01";
import ServiceArea from "@containers/services/layout-01";
import NewestItmesArea from "@containers/product/layout-04";
import VideoArea from "@containers/video/layout-01";
import { normalizedData } from "@utils/methods";

// Demo Data
import ClientOnly from "@components/client-render";
import axios from "axios";
import PropTypes from "prop-types";
import homepageData from "../data/homepages/home-12.json";
import productData from "../data/products.json";
import axiosInstance from "../lib/axios";

const Home = ({ newItems }) => {
    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData.filter(
        (prod) =>
            prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    );
    const newestData = productData
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <ClientOnly>
                <Header />
            </ClientOnly>
            <main id="main-content">
                {/* <HeroArea */}
                {/*    data={{ */}
                {/*        ...content["hero-section"], */}
                {/*        product: liveAuctionData[0], */}
                {/*    }} */}
                {/* /> */}
                <CategoryArea data={content["category-section"]} />
                {/* <CollectionArea */}
                {/*    data={{ */}
                {/*        ...content["collection-section"], */}
                {/*        collections: collectionsData.slice(0, 4), */}
                {/*    }} */}
                {/* /> */}
                {/* <LiveExploreArea */}
                {/*    data={{ */}
                {/*        ...content["live-explore-section"], */}
                {/*        products: liveAuctionData, */}
                {/*    }} */}
                {/* /> */}
                <ServiceArea data={content["service-section"]} />
                <NewestItmesArea
                    newItems={newItems}
                    data={{
                        ...content["newest-section"],
                        products: newestData,
                    }}
                />
                {/* <NewsletterArea data={content["newsletter-section"]} /> */}
                {/* <TopSellerArea */}
                {/*    data={{ */}
                {/*        ...content["top-sller-section"], */}
                {/*        sellers: sellerData, */}
                {/*    }} */}
                {/* /> */}
                <VideoArea data={content["video-section"]} />
            </main>
            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};

export async function getServerSideProps(context) {
    const res = await axiosInstance.get("/tokens");
    const newItems = await Promise.all(
        res.data.data.map(async (i) => {
            // const tokenURI = await contract.tokenURI(`${i.id}`);
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
    return {
        props: { newItems, className: "template-color-1 nft-body-connect" },
    };
}

Home.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    newItems: PropTypes.array,
};
export default Home;
