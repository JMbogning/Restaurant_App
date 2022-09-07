import React from "react";

import Loader from "../Loader";
import Message from "../Message";

const LoaderHandler = ({ loading, error, loader, render }) => {
    return (
        <div>
            {loading ? (
                loader ? (
                    loader
                ) : (
                    <Loader variable={loading} />
                )
            ) : error ? (
                <Message message={error} color={"danger"} />
            ) : render ? (
                render()
            ) : (
                <div></div>
            )}
        </div>
    );
};
export default LoaderHandler;
