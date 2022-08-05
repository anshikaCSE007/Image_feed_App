import './App.css';
import React,{useState,useEffect} from "react";
import { isEmpty } from 'lodash';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/Header/Header'
import Board from "./components/Board/Board";
import unsplash from "./api/unsplash"
import "./components/Board/Board.css"
import "./components/Board/Board.css"
import NavBar from './components/NavBar/NavBar';
import TopBar from './components/TopBar/TopBar';

function App() {
  const[pins,setNewPins] = useState([
    "https://images.unsplash.com/photo-1547656807-9733c2b738c2?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1615015456252-4f59c634ea6b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1615168177858-510a597241eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
"https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
"https://images.unsplash.com/photo-1507206130118-b5907f817163?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60",
"https://images.unsplash.com/photo-1615146919563-70db4a72f100?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
  ])
  const location = useLocation();
  const history = useNavigate();
  const searchQuery = location.search;
  const searchParams = new URLSearchParams(searchQuery);
  const[page,setPage] = useState(1);
  const[isLoading,setIsLoading] = useState(false)
  const[errors,setErrors] = useState([])
  const query = searchParams.getAll('query');
  const orientation = searchParams.get('item');

  console.log(query, orientation, 'queries');
  
  const increasePage =()=>{
      setPage(page+1)
  }

  const getMoreImage =()=>{
    increasePage();
    var url = `https://api.unsplash.com/photos?page=${page}`;
    var params = {};
    if(query?.length > 0 || orientation?.length > 0) {
      const arg = !isEmpty(query) ? query[0] : orientation;
      url = `https://api.unsplash.com/search/photos?page=${page}`;
      params['query'] = arg;
    }
    
    return unsplash.get(url, {
      params
    });

  }

  const loadMoreImage =()=>{
    setIsLoading(true);
    getMoreImage().then((res)=>{
      let results = res.data;
      let newPins  = [
        ...results,
        ...pins
      ]
      newPins.sort(function(a,b){
        return 0.5 - Math.random();
      });
      
      setNewPins(newPins);
      setIsLoading(false);
      
    })
    .catch((e)=>{
      console.log(e.response?.data)
      setErrors(e.response?.data)
      setIsLoading(false);
      console.log(errors)
    })
    

  }

  const getNewPins =(items) =>{
    setIsLoading(true)
    setNewPins([]);
    let promises = [];
    let pinData = [];
    let pins = [...items];
    pins.forEach((pinTerm)=>{
      promises.push(
        getImages(pinTerm).then((res)=>{
          let results = res.data.results;
          pinData = pinData.concat(results);
            pinData.sort(function(a,b){
              return 0.5 - Math.random();
          })
        })
      )
    })
    Promise.all(promises).then(()=>{
      setNewPins(pinData)
    })
    .catch((e)=>{
      console.log(e.response.data)
      setErrors(e.response.data)
    })
  }

  useEffect(() => {
		// getNewPins();
    if(isEmpty(query) && isEmpty(orientation)) {
      unsplash.get("https://api.unsplash.com/photos")
    .then((res) => {
       console.log(res.data)
       setNewPins(res.data)
    })
    .catch((e)=>{
      console.log(e.response.data)
      setErrors(e.response.data)
    });
    } else { 
      const arg = !isEmpty(query) ? query : orientation;
      getImages(arg).then((res)=>{
        let results = res.data.results;
        let newPins  = [
          ...results,
        ]
        // newPins.sort(function(a,b){
        //   return 0.5 - Math.random();
        // });
        setNewPins(newPins);
        
      })
    }
    
  },[]);

  const getImages =(term) =>{
    console.log(term, 'term')
    return unsplash.get("https://api.unsplash.com/search/photos",{
      params:{
        query : term,
      }
    });
    
  }

  const onSearchSubmit =(term) =>{
      console.log("onSearch submit", term)
      
      getImages(term).then((res)=>{
        let results = res.data.results;
        let newPins  = [
          ...results,
          ...pins
        ]
        // newPins.sort(function(a,b){
        //   return 0.5 - Math.random();
        // });
        setNewPins(newPins);
        
      })
      
  }
 
  return (
    <div className="app">
      <Header onSubmit = {onSearchSubmit}/>
      <NavBar/>
      {!searchParams.has('query') && <TopBar onSearch={getNewPins}/>}
      <Board pins={pins} loadMoreImage={loadMoreImage}/>
      { isLoading && (
      <div className="loader"> 
        <CircularProgress />
        </div>
      )}
      
    </div>
  );
}

export default App;
