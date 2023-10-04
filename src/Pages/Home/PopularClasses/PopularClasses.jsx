import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import usePopular from '../../../hooks/usePopular';

const PopularClasses = () => {
    const [classes] = usePopular();
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className='mt-10 md:mt-10'>
        <h2 className='text-center txt-xl md:text-3xl uppercase border-y-4 py-2 md:py-4 text-yellow-400'>Popular Classes</h2>
             <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          { classes.map(each => (
          <SwiperSlide key={each._id}>
            <div className='grid md:my-4 gap-2 justify-center items-center'>
            <img className="swiper-image" src={each.picture} alt={each.name} />
            <p className='text-orange-600'>{each.name}</p>
            </div>
          </SwiperSlide>
        ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
        </div>
    );
};

export default PopularClasses;

{/* classes.map(each => (
          <SwiperSlide key={each.name}>
            <img className="swiper-image" src={each.picture} alt={each.name} />
          </SwiperSlide>
        ))}
        
   */}