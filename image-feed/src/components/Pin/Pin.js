import React,{ useState} from 'react'
import "./Pin.css";

import Avatar from '@mui/material/Avatar';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import likeIcon from '../../icons/heart.svg';
import plusIcon from '../../icons/plus.svg';

function Pin(props) {
    
    let {urls, user} = props;
    const [isOpen, setOpen] = useState(false);
    
    
    return (
        <div className="pin__wrapper">
            <div className = "pin__wrapperContainer">
                <div className="pin_wrapperContent" onClick={()=>props.changeView()}>
                {/* <img onClick={()=>setOpen(true)} src={urls?.regular} alt="pin"/>{isOpen && 
                (<Lightbox  mainSrc={urls?.full} onCloseRequest={()=>setOpen(false)}></Lightbox>) */}
                <img src={urls?.full} alt=""/>
                <div>
                    <div className="header">
                        <img src={likeIcon} alt="" />
                        <img src={plusIcon} alt="" />

                    </div>
                    <div className="footer">
                        <Avatar alt="Remy Sharp" src={user?.profile_image.small} />
                        <span>{user?.name}</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
        )
    
    }

export default Pin
