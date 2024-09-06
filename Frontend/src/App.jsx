import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import AiGen from './pages/AiGen/AiGen'
import Gallery from './pages/Gallery/Gallery'
import { useContext } from 'react'
import { StoreContext } from './context/storeContext'
import NotLoggedIn from './pages/NotLoggedIn/NotLoggedIn'
import ScrollToTop from './components/ScrollToTop'
import Upload from './pages/Upload/Upload'
import Myuploads from './pages/Myuploads/Myuploads'
import Favourites from './pages/Favourites/Favourites'


function App() {
  const {token} = useContext(StoreContext);
  

  return (
    <>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/ai-gen' element={!token ? <NotLoggedIn/> : <AiGen/>}/>
        <Route path='/gallery' element={!token ? <NotLoggedIn/> : <Gallery/>}/>
        <Route path='/upload' element={!token ? <NotLoggedIn/> : <Upload/>}/>
        <Route path='/my-uploads' element={!token ? <NotLoggedIn/> : <Myuploads/>}/>
        <Route path='/favourites' element={!token ? <NotLoggedIn/> : <Favourites/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
