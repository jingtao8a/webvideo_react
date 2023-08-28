import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { Pagination } from 'antd';
import axios from 'axios';
import {Spin } from 'antd';

const VideoPreview =  ({path, previewFiles, setM3u8Path}) => {
    const [pagination, setPagination] = useState({
        current: 1,
        defaultPageSize: 10,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (page, pageSize) => {
        setPagination({...pagination, current: page});
    };

    const showFile = ()=> {
        let index = (pagination.current - 1) * pagination.defaultPageSize;
        let range;
        if (pagination.current * pagination.defaultPageSize > previewFiles.length) {
            range = previewFiles.length - index;
        } else {
            range = pagination.defaultPageSize;
        }
        let files = [];
        for (let i = 0; i < range; ++i) {
            files.push(previewFiles[index + i]);
        }
        return files.map(item => {
            const handleClick = (e)=> {
                e.preventDefault();
                let videoPath = encodeURIComponent(path + item);
                videoPath = "/video?videoPath=" + videoPath;
                const fetchData = async () => {
                    setLoading(true);
                    try {
                      const res = await axios.get(videoPath);
                      if (res.data.code !== 200) {
                        console.log(res.data.message);
                      } else {
                        let m3u8Path = res.data.extentPack;
                        setLoading(false);
                        setM3u8Path(m3u8Path);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  };
                  fetchData();
            };
            return (<Link onClick={handleClick}><p>{item}</p></Link>);
        })
    }
    
    return (
    <div className='videoPreview'>
        <p className='path'>{path}</p>
        {
            showFile()
        }
        <Pagination showQuickJumper 
            onChange={handleChange} 
            current={pagination.current} 
            defaultPageSize={pagination.defaultPageSize} 
            total={previewFiles.length}>
        </Pagination>
        {loading ? <div className='spin'><p>video is loading</p><Spin size="large"></Spin></div>: <div></div>}
    </div>
    );
}

export default VideoPreview; 