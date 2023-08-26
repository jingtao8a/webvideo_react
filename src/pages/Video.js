import {useLocation} from "react-router-dom"
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
const Video = ()=> {
  const videoPath = useLocation().search;
  const path = "/video" + videoPath;
  console.log(path);
//   const path = "/video?videoPath=dir2/VID_20230123_164414.mp4";
    // const path = "/video?videoPath=dir1/VID_20230109_132811.mp4";
    // const path = "/video/dir1/VID_20230109_132811/VID_20230109_132811.m3u8";
    return (
        <div className="video">
            <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" muted controls autoplay  preload="auto" width="500" height="400" data-setup='{}'>      
                <source id="source" src={path}  type="application/x-mpegURL"/>    
            </video> 

        </div>);
    
};


export default Video;