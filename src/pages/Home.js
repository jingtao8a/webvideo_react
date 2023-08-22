import React, {useEffect, useState}  from "react";
import {Link, useLocation, useNavigate} from "react-router-dom"
import axios from "axios";
import DOMPurify from "dompurify";
const Home = ()=> {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  console.log(posts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/post${cat}`);
        if (res.data.code !== 200) {
          console.log(res.data.message);
        } else {
          setPosts(res.data.extentPack);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  
    return <div className="home">
      <div className="posts">
        {posts.map(post=> {
          return <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt=""></img>
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.desc),
          }}></p>
              <button onClick={(e)=> {
                e.preventDefault();
                navigate(`/post/${post.id}`);
              }}>Read More</button>
            </div>

          </div>
        })}
      </div>
    </div>
};

export default Home;