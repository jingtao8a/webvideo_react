import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { Pagination } from 'antd';

const VideoPreview =  ({path, previewFiles}) => {
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
            return (<Link to={"/video?videoPath=" + path + item}><p>{item}</p></Link>);
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