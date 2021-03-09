import React,{ useState} from 'react'
import "./Pin.css"
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function Pin(props) {
    
    let {urls} = props;
    const [isOpen, setOpen] = useState(false);
    
    
    return (
        <div className="pin__wrapper">
            <div className = "pin__wrapperContainer">
            {/* <img onClick={()=>setOpen(true)} src={urls?.regular} alt="pin"/>{isOpen && 
            (<Lightbox  mainSrc={urls?.full} onCloseRequest={()=>setOpen(false)}></Lightbox>) */}
            <img onClick={()=>props.changeView()} src={urls?.regular} alt="pin"/>
            
            
        </div>
        </div>
        
        )
    
    }

export default Pin
