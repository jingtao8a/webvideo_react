import React, { useEffect, useState } from 'react';
import VideoMenu from './VideoMenu';
import VideoPreview from './VideoPreview.js'
import axios from 'axios';
import Video from './Video.js'
import {Spin } from 'antd';

const VideoContainer = () => {
    const [m3u8Path, setM3u8Path] = useState('');
    const [path, setPath] = useState('');
    const [previewFiles, setPreviewFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [directoryStructure, setDirectoryStructure] = useState(null);

    useEffect(()=> {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/videoDirectoryStructrue`);
          if (res.data.code !== 200) {
            console.log(res.data.message);
          } else {
            console.log(res.data.extentPack);
            setDirectoryStructure(res.data.extentPack);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
    return (
    <div className='videoContainer'>
        <VideoMenu directoryStructure={directoryStructure} 
        setPath={setPath} 
        setPreviewFiles={setPreviewFiles}></VideoMenu>
        <div className='preViewAndVideo'>
          <VideoPreview path={path} previewFiles={previewFiles} setM3u8Path={setM3u8Path} setLoading={setLoading}></VideoPreview>
          {loading ? <div className='spin'><p>video is loading</p><Spin size="large"></Spin></div>: <div></div>}
          <Video path={m3u8Path}></Video>
        </div>
    </div>
    );
};

export default VideoContainer;