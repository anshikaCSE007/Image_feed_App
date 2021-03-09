import React,{useState} from 'react'
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import "./Header.css"
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TextsmsIcon from '@material-ui/icons/Textsms';
import FaceIcon from '@material-ui/icons/Face';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
function Header(props) {
    const[input,setInput] = useState("")

    const onSearchSubmit =(e) =>{
        e.preventDefault();
        // console.log(input)
        props.onSubmit(input);
    }

    return (
        <div>
            <div className="wrapper">
                <div className="wrapper__logo">
                    <PhotoFilterIcon/>
                </div>
                <div className="wrapper__homepageButton">
                   <a  href="/">Home</a>
                </div>
                <div  className="wrapper__followingButton">
                <a  href='/'>Following</a>
                </div>
                <div className="wrapper__searchWrapper">
                    {/* <SearchOutLined></SearchOutLined> */}
                    
                    <div className="wrapper__searchBarWrapper">
                        <IconButton>
                        <SearchIcon/>
                        </IconButton>
                        <form>
                        <input type="text" onChange={(e) => setInput(e.target.value)}/>
                        <button type="submit" onClick={onSearchSubmit}>Submit</button>
                        </form>
                        
                    

                    </div>

                </div>
                <div className="wrapper__iconWrapper">
                    <IconButton>
                        <NotificationsIcon/>
                    </IconButton>
                    <IconButton>
                        <TextsmsIcon/>
                    </IconButton>
                    <IconButton>
                        <FaceIcon/>
                    </IconButton>
                    <IconButton>
                        <KeyboardArrowDownIcon/>
                    </IconButton>
                </div>


            </div>
        </div>
    )
}

export default Header
