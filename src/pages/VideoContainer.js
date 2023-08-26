import React, { useEffect, useState } from 'react';
import VideoMenu from './VideoMenu';
import VideoPreview from './VideoPreview.js'
import axios from 'axios';
// const directoryStructure = [
//     {
//       name: 'Folder 1',
//       children: [
//         {
//           name: 'Subfolder 1.1',
//           children: [
//             { name: 'Subfolder 1.1.1', children: [], file: [] },
//             { name: 'Subfolder 1.1.2', children: [], file: [] },
//           ],
//           file: ['4.txt']
//         },
//         { name: 'Subfolder 1.2', children: [], file: [] },
//       ],
//       file: ['1.txt'],
//     },
//     {
//       name: 'Folder 2',
//       children: [
//         {
//           name: 'Subfolder 2.1',
//           children: [
//             { name: 'Subfolder 2.1.1', children: [], file: [] },
//             { name: 'Subfolder 2.1.2', children: [], file: [] },
//           ],
//           file: []
//         },
//         { name: 'Subfolder 2.2', children: [], file: [] },
//       ],
//       file: ['2.txt', '3.txt'],
//     },
//   ];

const VideoContainer = () => {
    const [path, setPath] = useState('');
    const [previewFiles, setPreviewFiles] = useState([]);
    const [directoryStructure, setDirectoryStructure] = useState(null);
    const changePath = (newPath) => {
      setPath(newPath);
    };

    const changePreviewFiles = (newPreviewFiles) => {
      setPreviewFiles(newPreviewFiles);
    };
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
        changePath={changePath} 
        changePreviewFiles={changePreviewFiles}></VideoMenu>
        <VideoPreview path={path} previewFiles={previewFiles}></VideoPreview>
    </div>
    );
};

export default VideoContainer;