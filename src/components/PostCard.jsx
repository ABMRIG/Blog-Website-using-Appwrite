import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config.js"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredImage, userId}) {
//   console.log(userId)
    // console.log(appwriteService.getFullNameByUserId(userId))
    const [fullName, setFullName] = useState("");

    useEffect(()=>{
        async function fetchName (){
            const fname = await appwriteService.getFullNameByUserId(userId);
            setFullName(fname);
        }
        if (userId) {
            fetchName();
        }
            // const fname = appwriteService.getFullNameByUserId(userId);
            // setFullName(fname);
        
    },[userId])
  
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-[200px] hover:shadow-xl hover:scale-105 transition-transform hover:opacity-65 duration-300 opacity-90 md:w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl'/>
                    {/* {console.log("Inside PostCard.jsx",appwriteService.getFilePreview(featuredImage))} */}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
                <h2 className='text-[12px] font-semibold mt-2 text-[#6288a7]'>Post by: <span className='text-[12px] font-semibold mt-2 text-[#0e2c45]'>{fullName}</span></h2>
                {/* {console.log(appwriteService.getFullNameByUserId(userId))} */}
            </div>
        </Link>
    )
}

export default PostCard