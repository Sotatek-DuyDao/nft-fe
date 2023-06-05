import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorProfileArea from "@containers/author-profile";
// Demo data

const Author = () => (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            {/* <AuthorIntroArea data={authorData} /> */}
            <AuthorProfileArea />
        </main>
        <Footer />
    </Wrapper>
);

export async function getServerSideProps() {
    return {
        props: {
            className: "template-color-1 nft-body-connect",
        },
    };
}

export default Author;
