import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { Pagination } from 'antd';
import axios from 'axios';

const VideoPreview =  ({path, previewFiles}) => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        defaultPageSize: 10,
    });
    console.log(pagination.current);
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
            let m3u8Path;
            const handleClick = (e)=> {
                e.preventDefault();
                let videoPath = encodeURIComponent(path + item);
                videoPath = "/video?videoPath=" + videoPath;
                const fetchData = async () => {
                    try {
                      const res = await axios.get(videoPath);
                      if (res.data.code !== 200) {
                        console.log(res.data.message);
                      } else {
                        m3u8Path = res.data.extentPack;
                        navigate("/video?videoPath=" + m3u8Path);
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
        {path}
        {
            showFile()
        }
        <Pagination showQuickJumper 
            onChange={handleChange} 
            current={pagination.current} 
            defaultPageSize={pagination.defaultPageSize} 
            total={previewFiles.length}>
        </Pagination>
    </div>
    );
}

export default VideoPreview; 