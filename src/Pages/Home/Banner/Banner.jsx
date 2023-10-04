import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src="https://blog.grinfer.com/wp-content/uploads/2020/02/How-to-Learn-Computer-Programming-Languages-1024x512.png" />
            </div>
            <div>
            
            <img src="https://www.educative.io/api/page/6096075812241408/image/download/6443342641496064" />
            </div>
            
            <div>
            
            <img src="https://miro.medium.com/v2/resize:fit:1024/0*gNukt0Pmj8ibj9wh" />
            </div>
            
        </Carousel>
    );
};

export default Banner;