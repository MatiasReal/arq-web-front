import React, {useEffect, useState} from 'react';
const URL = 'http://localhost:5000/api/canchas';
import './Carrousel.css';


function Carrousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  fetch('/api/canchas')
    .then(res => res.json())
    .then(data => {
      console.log('Respuesta de la API:', data);
      setImages(data.map(c => c.img));
    });
}, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carrousel">
      {images.length > 0 && (
        <img src={images[currentIndex]} alt="Carrousel" />
      )}
      <button onClick={nextImage}>Next</button>
    </div>
  );
}

export default Carrousel;