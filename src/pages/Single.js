import React, {useState, useEffect, useContext}  from "react";
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import {Link, useNavigate, useLocation} from "react-router-dom"
import Menu from "../components/Menu.js"
import axios from "axios";
import {AuthContext} from "../context/authcontext.js"
import moment from "moment";
import DOMPurify from "dompurify";
const Single = ()=> {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const {currentUser} = useContext(AuthContext);
    console.log(post);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/post/${postId}`);
          if (res.data.code !== 200) {
            console.log(res.data.message);
          } else {
            setPost(res.data.extentPack);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [postId]);

  const handleDelete = async() => {
    try {
      await axios.delete(`/post/${postId}`)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
    return (<div className="single">
        <div className="content">
            <img src={post?.img} alt=""></img>
            {JSON.stringify(post) !== "{}" && <div className="user">
                <img src={post.user.img} alt=""/>
                <div className="info">
                    <span>{post.user.userName}</span>
                    <p>Posted {moment(post.date).fromNow()}</p>
                </div>
                {currentUser != null && currentUser.extentPack.userName === post.user.userName && (<div className="edit">
                    <Link to="/write?edit=2" state={post}>
                        <img src={Edit} alt=""></img>
                    </Link>
                    <Link>
                        <img onClick={handleDelete} src={Delete} alt=""></img>
                    </Link>                
                </div>)}
            </div>}
            <h1>{post?.title}</h1>
            <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.desc),
          }}></p>
        </div>
        <Menu cat={post?.cat}></Menu>
    </div>);
};

export default Single;