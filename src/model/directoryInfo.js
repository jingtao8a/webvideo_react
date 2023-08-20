import {
    FolderOutlined
} from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

export const items = [
    getItem('大四第一学期', 'sub1', <FolderOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('大四第二学期', 'sub2', <FolderOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('论文', 'sub3', <FolderOutlined />, [
        getItem('Option 11', '11'), 
        getItem('Option 12', '12'),
        getItem('Option 13', '13'),
        getItem('Option 14', '14'),
        getItem('Option 15', '15'),
        getItem('Option 16', '16')]),
    ]),
  ];