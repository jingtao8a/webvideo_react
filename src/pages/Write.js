import axios from "axios";
import moment from "moment";
import React, {useState, useContext} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authcontext"

const Write = ()=> {
    const state = useLocation().state;
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const URL = window.URL || window.webkitURL;
    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');
    console.log(value);
    console.log(title);
    console.log(cat);
    console.log(file);
    
    const uploadFile = async()=> {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await axios.post("/upload", formData);
                if (res.data.code !== 200) {
                    console.log(res.data.message);
                    return null;
                } else {
                    return res.data.extentPack;
                }
            } catch(err) {
                console.log(err);
            }
        }
        return null;
    }

    const handleClick = async (e)=> {
        e.preventDefault();
        let imgURL = await uploadFile();
        try {
            let res;
            if (state !== null) {
                res = await axios.post(`/post/${state.id}`, {
                    title,
                    desc: value.substring(3, value.length - 4),
                    cat,
                    img: file ? imgURL: "",
                });
            } else {
                res = await axios.post(`/post`, {
                    title,
                    desc: value.substring(3, value.length - 4),
                    cat,
                    img: file ? imgURL : "",
                    date: moment(Date.now()).format("YYYY-MM-DD"),
                    uid: currentUser? currentUser.extentPack.id: null,
                });
            }
            if (res.data.code !== 200) {
                console.log(res.data.message);
            } else {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return <div className="write">
        <div className="content">
            <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value}
                onChange={setValue}/>
            </div>
        </div>
        <div className="menu">
            <div className="item">
                <h1>Publish</h1>
                <span>
                    <b>Status: </b> Draft
                </span>
                <span>
                    <b>Visibility: </b> Public
                </span>
                <input style={{ display: "none" }} 
                    type="file" 
                    id="file" 
                    name="" 
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                {file && <img className="img" src={URL.createObjectURL(file)} alt=""></img>}
                <label className="file" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>Save as a draft</button>
                    <button onClick={handleClick}>Publish</button>
                </div>
            </div>
            <div className="item">
                <h1>Category</h1>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "art"}
                    name="cat"
                    value="art"
                    id="art"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="art">Art</label>
                </div>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "science"}
                    name="cat"
                    value="science"
                    id="science"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="science">Science</label>
                </div>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "technology"}
                    name="cat"
                    value="technology"
                    id="technology"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="technology">Technology</label>
                </div>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "cinema"}
                    name="cat"
                    value="cinema"
                    id="cinema"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="cinema">Cinema</label>
                </div>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "design"}
                    name="cat"
                    value="design"
                    id="design"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="design">Design</label>
                </div>
                <div className="cat">
                    <input
                    type="radio"
                    checked={cat === "food"}
                    name="cat"
                    value="food"
                    id="food"
                    onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="food">Food</label>
                </div>
            </div>
        </div>
    </div>;
};

export default Write;