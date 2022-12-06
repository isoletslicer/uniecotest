import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Tech Test Uni Eco - Har</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;