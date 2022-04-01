import React from 'react';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="main">
        <a href="/">ARTUDENT</a>
      </Menu.Item>
      <Menu.Item key="exhibition">
        <a href="/exhibition">EXHIBITION</a>
      </Menu.Item>
      <Menu.Item key="artwork">
        <a href="/artwork">ARTWORK</a>
      </Menu.Item>
      <Menu.Item key="library">
        <a href="/library">LIBRARY</a>
      </Menu.Item>
  </Menu>
  )
}

export default LeftMenu