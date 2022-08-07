import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './NavBar.css'

const NavBar = (props) => {
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
    // { label: 'People', key: 'people'},
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
  const history = useNavigate();
  const searchQuery = location.search;
  const searchParams = new URLSearchParams(searchQuery);
  const screen = Screen;

  const itemQuery = searchParams.get('item');
  const initMenu = JSON.parse(localStorage.getItem( 'currentMenu' ));
  const [currMenu, setCurrMenu] = useState(initMenu || menus);
  const [pinned, setPinned] = useState(itemQuery);

  useEffect(() => {
    setPinned(itemQuery)
  }, [itemQuery]);

  const navBarStyle  = {
    width: screen.availWidth,
  };

  const onSelectPin =(item) =>{
    setPinned(item.key)
};


  const onScrollRight = () => {
    let newMenu = [currMenu[currMenu.length-1]].concat(currMenu.slice(0,currMenu.length-1));
    const jsonString = JSON.stringify(newMenu)
    localStorage.setItem('currentMenu', jsonString);
    setCurrMenu(newMenu);
  }

  const onSrollLeft = () => {
    let newMenu = currMenu.slice(1, currMenu.length).concat(currMenu[0]);
    const jsonString = JSON.stringify(newMenu)
    localStorage.setItem('currentMenu', jsonString);
    setCurrMenu(newMenu);
    
  }
  
  return (
    <div className="navbar_wrapper">
      <div><a href="/" className={!pinned ? cx('menu','activeMenu') : 'menu'}>Editorials </a></div>
      <ArrowBackIosIcon fontSize="small" className='arrowIcon' onClick={() => onSrollLeft()} />
      <div className='menuBar'>
      {currMenu.map((item) => (
      <a className={pinned===item.key ? cx('menu','activeMenu') : 'menu'} href={`?item=${item.key}`} onClick={() => onSelectPin(item)}>
        {item.label}
      </a>
      ))}
      </div>
      <ArrowForwardIosIcon fontSize="small" className='arrowIcon' onClick={() => onScrollRight()} />
    </div>
  )
}

export default NavBar
