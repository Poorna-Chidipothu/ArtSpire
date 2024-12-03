import { useContext, useEffect, useState } from 'react'
import './AiGen.css'
import axios from 'axios';
import load from '../../assets/load.svg';
import arrow from '../../assets/arrow.svg'
import { StoreContext } from '../../context/storeContext';



const AiGen = () => {
  const {url} = useContext(StoreContext);
  const [userPrompt,setUserPrompt] = useState('');
  const [imgQuantity,setImgQuantity] = useState(4);
  // const [loading,setLoading] = useState(false);
  const [genImg,setGenImg] = useState([]);
  const [storedAiImages,setStoredAiImages] = useState([]);

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const genAiImages = async (uPrompt, imgCount) => {
    try {
      const response = await axios.post(`${url}/api/ai-gen/generate-images`, 
        {
          userPrompt: uPrompt,
          imgCount: imgCount,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const { status_url } = response.data;

      const interval = setInterval(async () => {  // Define interval here
        try {
          const statusResponse = await axios.get(`${url}/api/ai-gen/task-status`, {
            params: { statusUrl: status_url },
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (statusResponse.data.status === 'COMPLETED') {
            clearInterval(interval);
            const images = statusResponse.data.result.output;

            // Store the images in MongoDB
            await axios.post(`${url}/api/ai-gen/store-images`, { images }, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });

            // setLoading(false);
            setLoadedImages({});
            const loadedImgCards = images.map((imgSrc, index) => (
              <div key={index} className="image_card">
                <img src={imgSrc} alt="Generated content"
                  onLoad={() => handleImageLoad(index)}
                  className={loadedImages[index] ? 'loaded' : ''}
                  loading="lazy"
                />
                <a download href={imgSrc}><span className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></span></a>
              </div>
            ))
            setGenImg(loadedImgCards);
            setTimeout(() => {
              setGenImg([]);
            }, 20000);
          } else {
            console.log('Image generation is still in progress...');
          }
        } catch (error) {
          console.error('Error fetching image status:', error);
          clearInterval(interval);  // Clear interval on error
        }
      }, 5000);

    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const prompt = form[0].value;
    const imgQuant = parseInt(form[1].value, 10);
    
    setUserPrompt(prompt);
    setImgQuantity(imgQuant);
    

    const imgCards = Array.from({ length: imgQuant }, (_, index) => (
      <div key={index} className={`image_card load`}>
        {/* <img src={load} alt="Loading" 
          onLoad={() => handleImageLoad(index)}
          className={loadedImages[index] ? 'loaded' : ''}
          loading="lazy"
        /> */}
        
      </div>
    ));

    setGenImg(imgCards);
    await genAiImages(userPrompt,imgQuantity);
  }

  const handleClose = () => {
    setUserPrompt('');
  }


  useEffect(() => {
    const fetchAIImages = async()=> {
      const result = await axios.get(`${url}/api/get-media/get-aigen-images`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStoredAiImages(result.data.images);
  }
  fetchAIImages();
  },[storedAiImages]);


  return (
    <section className="ai-gen">
      <div className="ai-gen_hero">
        <h1 className="ai-gen_hero-title">AI Generated Art</h1>
        <p className="ai-gen_hero_subtitle">Unleashing Boundless Creativity through Artificial Intelligence</p>
        <p className="ai-gen_hero-des">Convert your text into stunning images in seconds with our AI-powered Image Generator. Experience the fusion of technology and artistry, transforming words into captivating visuals.</p>
        <div className="search_box">
          <form className='input_form' onSubmit={(e) => handleSubmit(e)}>
            <ion-icon name="bulb-outline"></ion-icon>
            <input type="text" className='input_data' placeholder='Enter your idea in text...' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
            {userPrompt.length >0 ? <ion-icon name="close-outline" onClick={handleClose}></ion-icon> : <></>}
            <select value={imgQuantity} onChange={(e) => setImgQuantity(parseInt(e.target.value))}>
              <option value={1}>1 Image</option>
              <option value={2}>2 Images</option>
              <option value={3}>3 Images</option>
              <option value={4}>4 Images</option>
            </select>
            <button className='generate_btn' type='submit'><i className="ri-sparkling-2-line"></i> <span>Generate</span></button>
          </form>
        </div>
      </div>
      <div className="ai-gen_images">
        {genImg}
      </div>
      <div className="generated">
        {storedAiImages.length > 0 || genImg.length > 0
          ?
            <>
              {storedAiImages.length > 0 ? <h2 className='gen_title'>Your creations</h2> : <></>} 
              <div className="ai-gen_images">
                {storedAiImages.map((item,index)=>(
                  <div className="image_card" key={index}>
                    <img src={item.aigen_picture_url}
                       onLoad={() => handleImageLoad(index)}
                       className={loadedImages[index] ? 'loaded' : ''}
                       loading="lazy"
                    />
                    {/* <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span> */}
                    <a download href={item.aigen_picture_url}><span className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></span></a>
                  </div>
                ))}
              </div>
            </>
          :
            <div className='not_created'>
              <img src={arrow} className='arrow' />
              <h3>You have not created your art yet!</h3>
              <p>Enter the idea above, we will generate it for you....</p>
            </div>
        }
        
      </div>
    </section>
  )
}

export default AiGen
