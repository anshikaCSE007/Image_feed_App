import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './TopBar.css';

function TopBar(props) {

  const location = useLocation();
  const history = useNavigate();
  const searchQuery = location.search;
  const searchParams = new URLSearchParams(searchQuery);
  const [searchInput, setSearchInput] = useState(null);

  const itemQuery = searchParams.get('item');

  const menus = [
    { key: 'current-events', imgUrl: 'https://images.unsplash.com/photo-1657299143544-f10ea56fbcd2?ixid=MnwyMTI5OTl8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTcwNDQ3Ng&ixlib=rb-1.2.1'},
    { key: 'wallpapers', imgUrl: 'https://images.unsplash.com/photo-1657299143228-f971e4887268?ixid=MnwyMTI5OTl8MXwxfGFsbHwxNnx8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1'},
    { key: '3d-render', imgUrl: 'https://images.unsplash.com/photo-1659542891330-b2969fb0741e?ixid=MnwyMTI5OTl8MHwxfGFsbHwxN3x8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1'},
    { key: 'texture-patterns', imgUrl:'https://images.unsplash.com/photo-1659686928263-5020563f143e?ixid=MnwyMTI5OTl8MHwxfGFsbHwxOHx8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1'},
    { key: 'experimental', imgUrl: 'https://images.unsplash.com/photo-1659628532474-a27063234d19?ixid=MnwyMTI5OTl8MHwxfGFsbHwxOXx8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1'},
    { key: 'architecture', imgUrl: 'https://images.unsplash.com/photo-1659637611085-71000f2278f8?ixid=MnwyMTI5OTl8MHwxfGFsbHwyMHx8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1'},
    { key: 'nature', imgUrl: 'https://images.unsplash.com/photo-1659635749909-001e5201eb7d?ixid=MnwyMTI5OTl8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTcwNjUzMQ&ixlib=rb-1.2.1'},
    { key: 'buisness-work', imgUrl: 'https://images.unsplash.com/photo-1659670989800-9b14d29d989f?ixid=MnwyMTI5OTl8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTcwNjUzMQ&ixlib=rb-1.2.1'},
    { key: 'fashion', imgUrl: 'https://images.unsplash.com/photo-1657299156710-83bba71ca119?ixid=MnwyMTI5OTl8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTcwNjUzMQ&ixlib=rb-1.2.1'},
    { key: 'film', imgUrl: 'https://images.unsplash.com/photo-1659651224643-eaa18535a483?ixid=MnwyMTI5OTl8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTcwNjUzMQ&ixlib=rb-1.2.1'},
    { key: 'food-drink', imgUrl: 'https://images.unsplash.com/photo-1659644242353-0a8f3c3e9ecf?ixid=MnwyMTI5OTl8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTcwNjUzMQ&ixlib=rb-1.2.1'},
    { key: 'health-wellness', imgUrl: 'https://images.unsplash.com/photo-1659639606747-d7b8e00d4303?ixid=MnwyMTI5OTl8MHwxfGFsbHwyNXx8fHx8fDJ8fDE2NTk3MDY4NDA&ixlib=rb-1.2.1'},
    { key: 'people', imgUrl: 'https://images.unsplash.com/photo-1659653198554-a2bbfa8c6128?ixid=MnwyMTI5OTl8MHwxfGFsbHwyOHx8fHx8fDJ8fDE2NTk3MDY4NDA&ixlib=rb-1.2.1' },
    { key: 'interiors'},
    { key: 'street-photography'},
    { key: 'travel'},
    { key: 'animals'},
    { key: 'spirituality'},
    { key: 'arts-culture'},
    { key: 'history'},
    { key: 'athlet'},
  ];

  const imageUrl = menus.filter((item) => item.key === itemQuery);

  const onSearchSubmit =(e) =>{
    e.preventDefault();
    props.onSearch([searchInput]);
    searchParams.append('query', searchInput);
    if (searchParams.has('item')) searchParams.delete('item');
    location.search = searchParams.toString();
    history({
      pathname: location.pathname,
      search: location.search,
    })
}

  return (
    <div className="topbar">
      <img alt='' src={imageUrl.length === 0
        ? 'https://images.unsplash.com/photo-1657299170935-31e068229885?ixid=MnwyMTI5OTl8MXwxfGFsbHwxMXx8fHx8fDJ8fDE2NTk3MDY1NTU&ixlib=rb-1.2.1' : imageUrl[0].imgUrl} />
      <div className="searchWrapper">
      <p>ImageFeed</p>
      <span>The internet’s source of freely-usable images.Powered by creators everywhere.</span>
      <div className="searchBarWrapper">
          <IconButton>
          <SearchIcon/>
          </IconButton>
          <form>
          <input type="text" placeholder="Search free high-resolution photos" onChange={(e) => setSearchInput(e.target.value)}/>
          <button type="submit" onClick={onSearchSubmit}>Submit</button>
          </form>
      </div>
  </div>
  </div>
  )
}

export default TopBar
