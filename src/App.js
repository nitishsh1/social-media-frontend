import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import {Routes ,Route , Navigate} from 'react-router-dom';
import {useSelector } from "react-redux";
import Conversation from "./pages/Conversation/Conversation";



function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  // const token = useSelector((state)=>state.authReducer.authData)
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   if(token){
  //     dispatch(sessionExpiredOrNot(token))
  //   }
    
  // },[])

  const personId = useSelector(state=>state.chatReducer?.chatUser)
  return (
    <div className="App">
        <div className="blur" style={{top:'25%' , left:"-8%"}}></div>
        <div className="blur" style={{top:'-5%' , right:"0"}}></div>
        <Routes>
          <Route path='/' element={user?<Navigate to="home"/> : <Navigate to='auth'/>} />
          <Route path='/home' element ={user ? <Home/>:<Navigate to="../auth"/>}/>
          <Route path='/auth' element={user?<Navigate to="../home"/>:<Auth/>}/>
          <Route path='/profile/:id' element ={user ? <Profile/>:<Navigate to="../auth"/>}/>
          <Route path='/messenger' element ={user ? <Conversation personId="" />:<Navigate to="../auth"/>}/>
          <Route path='/messenger/:id' element={user?<Conversation personId={personId}/>:<Navigate to="../auth" />} />
        </Routes>
        
    </div>
  );
}

export default App;
