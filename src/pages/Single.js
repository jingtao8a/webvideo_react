import React  from "react";
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import {Link} from "react-router-dom"
import Menu from "../components/Menu.js"

const Single = ()=> {
    return (<div className="single">
        <div className="content">
            <img src="" alt=""></img>
            <div className="user">
                <img src="" alt=""></img>
                <div className="info">
                    <span>John</span>
                    <p>Posted 2 days ago</p>
                </div>
                <div className="edit">
                    <Link to="/write?edit=2">
                        <img src={Edit} alt=""></img>
                    </Link>
                    <Link>
                        <img src={Delete} alt=""></img>
                    </Link>                
                </div>
            </div>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
        </div>
        <Menu></Menu>
    </div>);
};

export default Single;