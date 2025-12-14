import React, { useEffect, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


const Header = () => {

    const [showMobileMenu, setMobileMenu] = useState(false);

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const location = useLocation()

    // close mobile menu when route changes
    useEffect(() => {
        setMobileMenu(false)
    }, [location.pathname])

     // lock body scroll when mobile menu is open
    useEffect(() => {
        if (showMobileMenu) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'

        return () => { document.body.style.overflow = 'auto' }
    }, [showMobileMenu])

    const navItems = [
    {
        name: "Home",
        slug: "/",
        active: true
    },
    {
        name: "Login",
        slug: "/login",
        active: !authStatus
    },
    {
        name: "Sign up",
        slug: "/signup",
        active: !authStatus
    },
    {
        name: "My Posts",
        slug: "/my-posts",
        active: authStatus
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus
    }
    ]

    return (
    <header className='sticky top-0 z-50 pb-4 mb-2 shadow-lg shadow-red-950/30 py-3  bg-black/60 backdrop-blur-md text-white rounded-t-xl '>
        <Container>
            <nav className='md:flex hidden'>
                <div className='mr-4'>
                    <Link to="/">
                        <Logo width="70px"/>
                    </Link>
                </div>
                            
                <ul className='w-full md:w-auto md:flex-row flex-col flex ml-auto'>
                    {navItems.map((item) => 
                        item.active ? 
                        (<li key={item.name}>
                            <NavLink to={item.slug}
                                className={({isActive}) => 
                                (isActive ? "hover:bg-zinc-900 hover:text-[#60A5FA] transition bg-blue-900 m-1 font-bold inline-block px-6 py-2 duration-200 rounded-full"
                                
                                    :

                                "hover:bg-zinc-900 hover:text-[#60A5FA] transition bg-slate-900 m-1 font-bold inline-block px-6 py-2 duration-200 rounded-full")}>
                                {/* <button onClick={() => {navigate(item.slug)}}
                                className="hover:bg-zinc-900 hover:text-[#60A5FA] transition bg-slate-900 m-1 font-bold inline-block px-6 py-2 duration-200 rounded-full" */}
                                <button>
                                    {item.name}
                                </button>
                            </NavLink>
                        </li>) 
                        : 
                        null
                    )}
                    {authStatus && 
                    <li>
                        <LogoutBtn/>
                    </li>}
                </ul>
            </nav>
        </Container>
        <Container>
            <nav className='md:hidden'>
                <div className='flex justify-between items-center'>
                    <div className='mr-4'>
                        <Link to="/">
                            <Logo width="70px"/>
                        </Link>
                    </div>
                    {
                        showMobileMenu ?
                        <button onClick={()=>setMobileMenu(prev=>!prev)}>
                            <RxCross2 className='text-3xl '/>
                        </button>
                        :
                        <button onClick={()=>setMobileMenu(prev=>!prev)}>
                            <FiMenu className='text-3xl'/>
                        </button>
                    }
                </div>
                {showMobileMenu ? 
                <div className='flex items-end'>

                    {authStatus && 
                        <LogoutBtn/>
                    }

                    {/* <LogoutBtn/> */}
                    <ul className='w-full flex flex-col items-end'>
                        
                        {navItems.map((item) => 
                            item.active ? 
                            (<li key={item.name} className=''>
                                <NavLink to={item.slug}
                                className={({isActive}) => 
                                (isActive ? "bg-zinc-900 text-[#60A5FA] transition m-1 font-bold inline-block  duration-200 rounded-full py-2"
                                
                                    :

                                "transition m-1 font-bold inline-block duration-200 py-2")}>
                                {/* <button onClick={() => {navigate(item.slug)}}
                                className="hover:bg-zinc-900 hover:text-[#60A5FA] transition bg-slate-900 m-1 font-bold inline-block px-6 py-2 duration-200 rounded-full" */}
                                <button className='h-[30px] w-[100px] '>
                                    {item.name}
                                </button>
                            </NavLink>
                            </li>) 
                            : 
                            null
                        )}
                        
                    </ul>
                </div>
                :
                
                    null
                }
                    
            </nav>
        </Container>
    </header>
    )
}

export default Header