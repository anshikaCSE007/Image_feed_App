import React,{useState} from 'react'
import "./Board.css"
import Pin from "../Pin/Pin";
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageSlider from '../ImageSlide/ImageSlider';
// import { SRLWrapper } from "simple-react-lightbox"
function Board(props) {
    const[view,setView] = useState(false)

    const changeView=()=>{
        setView(true)
    }
    
    const closeView=()=>{
        setView(false)
    }
    let {pins} = props;
    if(view){
        return <ImageSlider slides={pins} closeView={closeView} />
    }
    return (
        <div className = "board__wrapper">
                <InfiniteScroll 
                className="board__wrapperContainer"
                dataLength={pins.length}
                next = {props.loadMoreImage}
                hasMore={true}

                >
                {pins.map((pin,index) => {
                        let {urls} = pin;
                        return <Pin changeView = {changeView} key={index} urls = {urls} slides={pins}/>
                })
            }
                </InfiniteScroll>

                
            
            
        </div>
    )
}

export default Board
