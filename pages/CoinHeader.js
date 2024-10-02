import React from 'react'
import Head from "next/head";

function CoinHeader({title, description}) {
    const header = () => {
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="description" content={description}/>
                </Head>
            </>
        );
    }
}

export default CoinHeader;