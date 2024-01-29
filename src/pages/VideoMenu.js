import React, { useState } from 'react';
import {
  FolderOutlined,
  FileOutlined
} from '@ant-design/icons';
import {Menu, Switch } from 'antd';

const getItem = (label, key, icon, children)=> {
  return {
    key,
    icon,
    children,
    label,
  };
}

const getItems = (data) => {
  if (data === null || typeof data === "undefined") {
    return null;
  }
  return data.map((dir)=> {
    if (dir.children === null || dir.children.length === 0) {
      return getItem(dir.name, dir.name, <FolderOutlined />)
    }
    let array = getItems(dir.children);
    let fileArray;
    if (dir.file !== null && dir.file.length !== 0) {
      fileArray = dir.file.map((fileName)=> {
        return getItem(fileName, fileName, <FileOutlined />);
      })
    }
    return getItem(dir.name, dir.name, <FolderOutlined />, array.concat(fileArray));
  });
};


const VideoMenu = ({directoryStructure, setPath, setPreviewFiles}) => {
  const [theme, setTheme] = useState('light');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const items = getItems(directoryStructure);

  const handleClick = (e)=> {
    let str = '';
    let findDir;
    let rootDir = directoryStructure;
    for (let i = e.keyPath.length - 1; i >= 0; --i) {
      let flag = false;
      // eslint-disable-next-line
      rootDir.map((item)=> {
        if (item.name === e.keyPath[i]) { 
          findDir = item;
          flag = true;
        }
        return item;
      });
      if (flag) {
        rootDir = findDir.children;
      } else {
        break;
      }
      str = str.concat(e.keyPath[i] + '/');
    }
    setPath(str);
    setPreviewFiles(findDir.file);
  }
  return (
    <div className='videoMenu'>
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br />
      <Menu
        onClick={handleClick}
        mode={'inline'}
        theme={theme}
        items={items}
      />
    </div>
  );
};


export default VideoMenu;