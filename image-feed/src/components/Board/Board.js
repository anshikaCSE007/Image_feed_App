import React,{useState} from 'react'
import "./Board.css"
import Pin from "../Pin/Pin";
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageSlider from '../ImageSlide/ImageSlider';
// import { SRLWrapper } from "simple-react-lightbox"
function Board(props) {
    const[view,setView] = useState(false)
    const[selectedPin, setSelectedPin] = useState(null);

    const changeView=(index)=>{
        setView(true)
        setSelectedPin(index)
    }
    
    const closeView=()=>{
        setView(false)
        setSelectedPin(null);
    }
    let {pins} = props;
    console.log(selectedPin, 'selectedPin')
    return (
        <div>
        <div className = "board__wrapper">
            <div>
                <InfiniteScroll 
                className="board__wrapperContainer"
                dataLength={pins.length}
                next = {props.loadMoreImage}
                hasMore={true}

                >
                {pins.map((pin,index) => {
                        let {urls, user} = pin;
                        return <Pin changeView={() => changeView(index)} key={index} urls = {urls} slides={pins} user={user}/>
                })
            }
                </InfiniteScroll>
            </div>

        
        {view && (
            <ImageSlider slides={pins} closeView={closeView} currentIndex={selectedPin} />
        )} 
        </div>
        </div>
    )
}

export default Board
