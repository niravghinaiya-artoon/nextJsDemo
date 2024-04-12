'use client'

import { QueryClient, QueryClientProvider } from 'components/lib/npm';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        },
    },
});

export default function ReactQueryProvider({ children }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}