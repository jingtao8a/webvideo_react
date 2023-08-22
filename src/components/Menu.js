import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Menu = ({cat})=> {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/post?cat=${cat}`);
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
  
    return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map(post => {
            return <div className="post" key={post.id}>
                <img src={post.img} alt=""></img>
                <h2>{post.title}</h2>
                <button onClick={(e)=> {
                e.preventDefault();
                navigate(`/post/${post.id}`);
              }}>Read More</button>
            </div>;
        })}
    </div>);
};

export default Menu;