import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({path})=> {
    console.log(path);
    if (path === '' || path == null) {
        return <div></div>;
    }
    return (
        <div className="video">
            <ReactPlayer url={path} controls={true}></ReactPlayer>
        </div>);
};


export default Video;