import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'

function AllTickets() {
    const [posts,setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getTickets([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='py-8 w-full'>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    {post}
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllTickets
