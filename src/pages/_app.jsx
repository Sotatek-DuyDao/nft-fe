// Imports
// ========================================================
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { localhost } from "@wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import sal from "sal.js";
import { SSRProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const MyApp = ({ Component, pageProps, router }) => {
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });

    const { provider, chains } = configureChains(
        [localhost],
        [publicProvider()]
    );
    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({
                chains,
                options: {
                    UNSTABLE_shimOnConnectSelectAccount: true,
                    shimChainChangedDisconnect: true,
                },
            }),
        ],
        provider,
    });
    return (
        <SSRProvider>
            <ThemeProvider defaultTheme="dark">
                <WagmiConfig client={client}>
                    <Component
                        {...pageProps}
                        mode="wait"
                        initial={false}
                        key={router.asPath}
                    />
                </WagmiConfig>
                <ToastContainer autoClose={2000} />
            </ThemeProvider>
        </SSRProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    router: PropTypes.any,
};

export default MyApp;
