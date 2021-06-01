import Link from "next/link";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa"
import styles from '@/styles/Header.module.css'
import Search from "@/components/Search";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext";
function Header() {
    const {user,logout}=useContext(AuthContext)
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>DJ Events</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li><Link href='/events'><a>Events</a></Link></li>
                    <li><Link href='/accounts/dashboard'><a>Dashboard</a></Link></li>
                    {user ?
                        //If Logged In
                        <>
                        <li><Link href='/events/add'><a>Add Event</a></Link></li>
                            <li><button onClick={()=>logout()} className={'btn-secondary btn-icon'}>
                                <FaSignOutAlt />
                                Log Out</button></li>
                    </> :
                        //If Logged out
                        <>
                        <li><Link href='/account/login'><a className={'btn-secondary btn-icon'}>
                            <FaSignInAlt /> Login</a>
                        </Link></li>
                    </>}


                </ul>
            </nav>

        </header>
    );
}

export default Header;
