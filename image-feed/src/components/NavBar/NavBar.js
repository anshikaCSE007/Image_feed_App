import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import cx from 'classnames';

import './NavBar.css'

const NavBar = () => {
  const menus = [
    { label: 'Current Events', key: 'current-events'},
    { label: 'Wallpapers', key: 'wallpapers'},
    { label: '3D Renders', key: '3d-render'},
    { label: 'Textures & Patterns', key: 'texture-patterns'},
    { label: 'Experimental', key: 'experimental'},
    { label: 'Architecture', key: 'architecture'},
    { label: 'Nature', key: 'nature'},
    { label: 'Buisness & Work', key: 'buisness-work'},
    { label: 'Fashion', key: 'fashion'},
    { label: 'Film', key: 'film'},
    { label: 'Food & Drink', key: 'food-drink'},
    { label: 'Health & Wellness', key: 'health-wellness'},
    { label: 'People', key: 'people'},
    // { label: 'Interiors', key: 'interiors'},
    // { label: 'Street Photography', key: 'street-photography'},
    // { label: 'Travel', key: 'travel'},
    // { label: 'Animals', key: 'animals'},
    // { label: 'Spirituality', key: 'spirituality'},
    // { label: 'Arts & Culture', key: 'arts-culture'},
    // { label: 'History', key: 'history'},
    // { label: 'Athletics', key: 'athlet'},
  ];
  const location = useLocation();
  const searchQuery = location.search;
  const searchParams = new URLSearchParams(searchQuery);

  const itemQuery = searchParams.get('item');
  const [pinned, setPinned] = useState(itemQuery);

  useEffect(() => {
    setPinned(itemQuery)
  }, [itemQuery]);

  return (
    <div className="navbar_wrapper">
      <a href="/" className={!pinned ? cx('menu','activeMenu') : 'menu'}>Editorials</a>
      {menus.map((item) => (
      <a className={pinned===item.key ? cx('menu','activeMenu') : 'menu'} href={`?item=${item.key}`} onClick={() => setPinned(item.key)}>
        {item.label}
      </a>
      ))
    }
    </div>
  )
}

export default NavBar
