import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <h3 className="navbar-brand">Data Diri</h3>
        </Link>
        <Link href="/new">
            <h3 className="create">Add Person</h3>
        </Link>
    </nav>
)

export default Navbar;