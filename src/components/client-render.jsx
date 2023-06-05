"use client";

import PropTypes from "prop-types";
// Imports
// ========================================================
import React, { useEffect, useState } from "react";

// Page
// ========================================================
const ClientOnly = ({ children }) => {
    // State / Props
    const [hasMounted, setHasMounted] = useState(false);

    // Hooks
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Render
    if (!hasMounted) return null;

    return <div>{children}</div>;
};
ClientOnly.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ClientOnly;
