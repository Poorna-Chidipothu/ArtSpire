import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import './Upload.css';
import upload_icon from '../../assets/cloud-upload.svg';
import { StoreContext } from '../../context/storeContext';
// import img_1 from '../../assets/img-1.jpg';

const Upload = () => {
    const {url} = useContext(StoreContext);
    const [dragBackground, setDragBackground] = useState({
        backgroundColor: 'transparent',
        opacity: '1',
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState("");
    const inputRef = useRef();
    const acceptedFileFormats = ["jpg", "png", "jpeg"];
    
    const handleClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    
    const handleTagsChange = (index, e) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index].tags = e.target.value;
        setSelectedImages(newSelectedImages);
    };

    const handleFileChange = (e) => {
        const newImagesArray = Array.from(e.target.files);
        processImages(newImagesArray);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newDropImagesArray = Array.from(e.dataTransfer.files);
        processImages(newDropImagesArray);
    };

    const processImages = (newImagesArray) => {
        const newSelectedImages = [...selectedImages];
        let hasError = false;
        const imageTypeRegex = new RegExp(acceptedFileFormats.join('|', 'i'));

        newImagesArray.forEach((file) => {
            if (newSelectedImages.some((f) => f.file.name === file.name)) {
                hasError = true;
                setError('Image is already uploaded or the name is already in the uploaded images.');
            } else if (!imageTypeRegex.test(file.name.split('.').pop())) {
                setError(`Only ${acceptedFileFormats.join(', ')} are allowed.`);
                hasError = true;
            } else {
                newSelectedImages.push({ file, tags: '' });
            }
        });

        if (!hasError) {
            setError('');
            setSelectedImages(newSelectedImages);
        }
    };

    const handleDelete = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const handleUpload = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            const formData = new FormData();
            selectedImages.forEach((image) => {
                formData.append('pictures', image.file);
                formData.append('tags', image.tags);
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios.post(`${url}/api/upload`, formData, config);
            console.log('Upload successful:', response.data);
            setSelectedImages([]);
        } catch (error) {
            console.error('Error uploading images:', error.response);
        }
    };

    return (
        <section className="upload">
            <div className="upload_area"
                style={dragBackground}
                onDragLeave={() => setDragBackground({ backgroundColor: 'transparent', opacity: '1' })}
                onDragOver={(e) => { e.preventDefault(); setDragBackground({ backgroundColor: '#b5ff8d', opacity: '0.7' }) }}
                onDrop={(e) => { handleDrop(e); setDragBackground({ backgroundColor: 'transparent', opacity: '1' }) }}>
                <img src={upload_icon} alt="" />
                <div className="upload_controls">
                    <span><h2>Drag & Drop</h2></span>
                    <span>or</span>
                    <span>
                        <form className='select_img'>
                            <input type="file" multiple accept='/images' hidden ref={inputRef} onChange={(e) => handleFileChange(e)} />
                            <button type='button' onClick={(e) => handleClick(e)}>Select Images</button>
                        </form>
                    </span>
                    <span className='error'>{error && <p>{error}</p>}</span>
                </div>
            </div>
            <div className="uploaded_images">
                {selectedImages && selectedImages.length > 0
                    ?
                    <>
                        <div className='uploaded_images_container'>
                            {selectedImages.map((image, index) => (
                                <div className="image_container" key={image.file.name}>
                                    <div className="image_box">
                                        <img src={URL.createObjectURL(image.file)} alt={image.file.name} />
                                        <button type='button' className='img_cls' onClick={() => handleDelete(index)}><ion-icon name="close"></ion-icon></button>
                                    </div>
                                    <div className="tags_input">
                                        <input type="text" value={image.tags} onChange={(e) => handleTagsChange(index, e)} placeholder="Enter tags separated by ','" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <span className='up_btn'><button onClick={handleUpload}>Upload All images</button></span>
                    </>
                    :
                    (<div className="images_empty">
                        <span>No Images Uploaded yet..</span>
                    </div>)
                }
            </div>
        </section>
    )
}

export default Upload;
