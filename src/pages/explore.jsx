import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-03";
import Pagination from "@components/pagination-02";

// Demo data

// eslint-disable-next-line react/prop-types
const Home02 = () => (
    <Wrapper>
        <SEO pageTitle="Place Bid With Filter" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="NFT Explorer" currentPage="NFT Explorer" />
            <ExploreProductArea
                data={{
                    section_title: {
                        title: "Explore Product",
                    },
                    placeBid: false,
                }}
            />
            <Pagination
                currentPage={0}
                numberOfPages={0}
                onClick={() => null}
            />
        </main>
        <Footer />
    </Wrapper>
);

export async function getServerSideProps() {
    return {
        props: { className: "template-color-1" },
    };
}

export default Home02;
