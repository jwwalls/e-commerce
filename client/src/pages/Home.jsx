import React, { useState, useEffect } from 'react';
import '../css/Home.css';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const images = ["homepic.png", "homepic2.png", "homepic3.png", "homepic4.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  return (
    <div className="home">
        <div className='header'>
            <div className='header-image-container'>
                {images.map((image, index) => (
                    <img 
                        className={`header-image ${index === currentImageIndex ? "show" : ""}`} 
                        src={`/pics/${image}`} 
                        alt="homepic" 
                        key={index}
                        style={index === previousImageIndex ? {opacity: 0} : {}}
                    />
                ))}
                <div className='header-content'>
                    <h1 className='header-title'>RUN AND NEVER STOP!</h1>
                    <button className='header-button'>START SHOPPING</button>
                </div>
            </div>
        </div>
        <div className='transition-banner'>
  Stay ahead with style
</div>
      <div className='slogan-container'>
        <div className='slogan-images'>
          <img className='slogan-image' src="/pics/slogan1.png" alt="slogan1" />
          <img className='slogan-image' src="/pics/slogan2.png" alt="slogan2" />
          <img className='slogan-image' src="/pics/slogan3.png" alt="slogan3" />
          <img className='slogan-image' src="/pics/slogan4.png" alt="slogan4" />
        </div>
        <p className='slogan-phrase'><span className="first-word">Embark</span> on an extraordinary journey into the world of footwear, where you can unleash your inner fashionista and experience a sensational adventure in style. It's time to take control of your personal fashion narrative, handpick the perfect pair of shoes, and elevate each step you take in your style evolution.</p>
      </div>
      <div className='slogan-container2'>
        <div className='slogan-images'>
          <img className='slogan-image' src="/pics/slogan9.png" alt="slogan1" />
          <img className='slogan-image' src="/pics/slogan10.png" alt="slogan2" />
        <p className='slogan-phrase2'>
        <span className="first-word">Explore</span>  the latest fashion trends, experiment with bold colors, daring patterns, and innovative materials. Whether you prefer classic elegance or cutting-edge fashion statements, there is a perfect pair waiting to become an extension of your individuality. Each step you take will become an opportunity to express your creativity and redefine your style.

From casual outings to glamorous events, your footwear choices will become an essential part of your overall look. Discover the art of pairing shoes with different outfits, unlocking a realm of possibilities to enhance your ensembles. Elevate a simple jeans-and-t-shirt combo with a statement pair of heels, or exude effortless charm with a chic pair of flats paired with a flowing summer dress.

But the adventure doesn't stop at selecting the right shoes. Dive into the world of accessories to further elevate your style.</p>
      </div>
      </div>
      <div className='transition-banner'>
  FEEL THE FREEDOM OF RUNNING
</div>
      <div className='slogan-container'>
        <div className='slogan-images'>
          <img className='slogan-image' src="/pics/slogan5.png" alt="slogan1" />
          <img className='slogan-image' src="/pics/slogan6.png" alt="slogan2" />
          <img className='slogan-image' src="/pics/slogan7.png" alt="slogan3" />
          <img className='slogan-image' src="/pics/slogan8.png" alt="slogan4" />
          </div>
          <p className='slogan-phrase'><span className="first-word">Embrace</span> the excitement of fashion and let your footwear choices be a testament to your evolving style journey. With each step, you'll radiate confidence, individuality, and a passion for self-expression. So, set forth on this remarkable footwear adventure, and unlock a world of fashion possibilities that will leave a lasting impression wherever your feet may take you.


Immerse yourself in a vast selection of trendy and timeless designs, from sleek stilettos to comfortable sneakers, elegant boots to charming sandals, and everything in between. With a plethora of options at your fingertips, you have the power to curate a shoe collection that reflects your unique personality and amplifies your confidence.</p>
          
        
        
      </div>
      
    </div>
  );
}

export default Home;


