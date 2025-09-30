import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

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
        name: "Signup",
        slug: "/signup",
        active: !authStatus
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus
    }
    ]

    return (
    <header className=' pb-4 mb-2 shadow-lg shadow-red-950/30 py-3  bg-black/60 backdrop-blur-md text-white rounded-t-xl '>
        <Container>
            <nav className='flex'>
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
    </header>
    )
}

export default Header