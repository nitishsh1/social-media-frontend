import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useSelector} from 'react-redux'

const Posts = () => {

  
  const {timelinePosts , loading} = useSelector((state) =>state.timelinePostReducer)


 
  return (
    <div className="Posts">
    {loading? "Fetching Posts..." :
        timelinePosts.map((post,id)=>{
            return <Post data={post} id={id}/>
        })
    }
    </div>
  )
}

export default Posts