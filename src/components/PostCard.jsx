import React from 'react'
import appwriteService from "../appwrite/config.js"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredImage}) {
  // console.log(featuredImage)
  
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-[200px] hover:shadow-xl hover:scale-105 transition-transform hover:opacity-65 duration-300 opacity-90 md:w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl'/>
                    {/* {console.log("Inside PostCard.jsx",appwriteService.getFilePreview(featuredImage))} */}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard