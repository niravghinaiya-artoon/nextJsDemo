'use client'

import { Toaster } from 'components/lib/npm';

export default function ToasterProvider({ children }) {

    return (
        <>

            {children}

            <Toaster
                position='top-right'
                closeButton={true}
                richColors
            />

        </>
    )
}