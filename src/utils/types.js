import PropTypes from "prop-types";

export const IDType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const HeadingType = PropTypes.shape({
    id: IDType,
    content: PropTypes.string.isRequired,
});

export const TextType = PropTypes.shape({
    id: IDType,
    content: PropTypes.string.isRequired,
});

export const ImageType = PropTypes.shape({
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
        .isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    layout: PropTypes.string,
});

export const ButtonComponentType = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    path: PropTypes.string,
    size: PropTypes.oneOf(["large", "small", "medium"]),
    color: PropTypes.oneOf(["primary", "primary-alta"]),
    fullwidth: PropTypes.bool,
};

// eslint-disable-next-line no-unused-vars
const { children, ...restButtonTypes } = ButtonComponentType;

export const ButtonType = PropTypes.shape({
    content: PropTypes.string.isRequired,
    ...restButtonTypes,
});

export const SectionTitleType = PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
});

export const ItemType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    path: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(ImageType),
    image: ImageType,
});

export const ProductType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number,
    image: ImageType,
    auction_date: PropTypes.string,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType,
        })
    ),
    bitCount: PropTypes.number,
});

export const SellerType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    total_sale: PropTypes.number.isRequired,
    image: ImageType.isRequired,
    top_since: PropTypes.string,
    isVarified: PropTypes.bool,
});

export const CollectionType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    image: ImageType.isRequired,
    thumbnails: PropTypes.arrayOf(ImageType).isRequired,
    profile_image: ImageType.isRequired,
});

export const FeatureProductsType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string,
    }),
    image: ImageType.isRequired,
});

export const NotifactionType = PropTypes.shape({
    id: IDType,
    title: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    image: ImageType,
});
export const productsJsonTemplate = JSON.stringify({
    _id: "{{objectId()}}",
    slug: "{{index()}}",
    published_at: '{{date(new Date(), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latestBid: "{{lorem()}}",
    likeCount: '{{floating(1000, 4000, 2, "0,0.00")}}',
    categories: ["{{repeat(3)}}", '{{lorem(1, "words")}}'],
    auction_date: '{{date(new Date(), new Date(), "YYYY-MM-dd")}}',
    authors: [
        "{{repeat(3)}}",
        {
            slug: "/author",
            name: "{{firstName()}} {{surname()}}",
            image: {
                src: "/images/client/client-3.png",
            },
        },
    ],
    bitCount: "{{integer(20, 1000)}}",
    owner: [
        "{{repeat(3)}}",
        {
            slug: "/author",
            name: "{{firstName()}} {{surname()}}",
            image: {
                src: "/images/client/client-3.png",
            },
        },
    ],
    collection: [
        "{{repeat(3)}}",
        {
            slug: "/collection",
            name: "{{firstName()}} {{surname()}}",
            image: {
                src: "/images/client/client-3.png",
            },
            total_sale: '{{floating(1000, 4000, 2, "0,0")}}',
        },
    ],
    bids: [
        "{{repeat(3)}}",
        {
            id: "{{index()}}",
            user: {
                slug: "/author",
                name: "{{firstName()}} {{surname()}}",
                image: {
                    src: "/images/client/client-3.png",
                },
            },
            amount: '{{floating(1000, 4000, 2, "0,0.00MATIC")}}',
            bidAt: "1 hours ago",
        },
    ],
    properties: [
        "{{repeat(3)}}",
        {
            id: "{{index()}}",
            type: "{{firstName()}} {{surname()}}",
            value: "{{firstName()}} {{surname()}}",
        },
    ],
    tags: [
        "{{repeat(3)}}",
        {
            id: "{{index()}}",
            type: "{{firstName()}} {{surname()}}",
            value: "{{firstName()}} {{surname()}}",
        },
    ],
    history: [
        "{{repeat(3)}}",
        {
            id: "{{index()}}",
            user: {
                slug: "/author",
                name: "{{firstName()}} {{surname()}}",
                image: {
                    src: "/images/client/client-3.png",
                },
            },
            amount: '{{floating(1000, 4000, 2, "0,0.00MATIC")}}',
            bidAt: "1 hours ago",
        },
    ],
    highest_bid: {
        amount: '{{floating(1000, 4000, 2, "0,0.00MATIC")}}',
        bidder: {
            name: "{{firstName()}} {{surname()}}",
            slug: "/author",
            image: {
                src: "/images/client/client-3.png",
            },
        },
    },
    sale_type: "fixed-price",
    level: "Intermediate",
    language: "English",
    rating: "{{integer(2, 5)}}",
});
