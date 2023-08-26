import React, { useState } from 'react';
import VideoMenu from './VideoMenu';
import VideoPreview from './VideoPreview.js'

const directoryStructure = [
    {
      name: 'Folder 1',
      children: [
        {
          name: 'Subfolder 1.1',
          children: [
            { name: 'Subfolder 1.1.1', children: [], file: [] },
            { name: 'Subfolder 1.1.2', children: [], file: [] },
          ],
          file: ['4.txt']
        },
        { name: 'Subfolder 1.2', children: [], file: [] },
      ],
      file: ['1.txt'],
    },
    {
      name: 'Folder 2',
      children: [
        {
          name: 'Subfolder 2.1',
          children: [
            { name: 'Subfolder 2.1.1', children: [], file: [] },
            { name: 'Subfolder 2.1.2', children: [], file: [] },
          ],
          file: []
        },
        { name: 'Subfolder 2.2', children: [], file: [] },
      ],
      file: ['2.txt', '3.txt'],
    },
  ];

const VideoContainer = () => {
    const [path, setPath] = useState('');
    const changePath = (newPath) => {
        setPath(newPath);
    }
    return (
    <div className='videoContainer'>
        <VideoMenu directoryStructure={directoryStructure} changePath={changePath}></VideoMenu>
        <VideoPreview path={path}></VideoPreview>
    </div>
    );
};

export default VideoContainer;