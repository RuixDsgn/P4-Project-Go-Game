import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Hero = () => (
  <Carousel autoplay>
    <div>
      <img src="https://doublejumpvideogames.com/wp-content/uploads/2022/10/MarioRabbidsBanner.png" />
    </div>
    <div>
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b80eaa72-a89b-4aff-990d-dd737cc3a56c/d78c56v-23446fcb-4c44-4f05-b7d1-d1910f7fa4ba.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4MGVhYTcyLWE4OWItNGFmZi05OTBkLWRkNzM3Y2MzYTU2Y1wvZDc4YzU2di0yMzQ0NmZjYi00YzQ0LTRmMDUtYjdkMS1kMTkxMGY3ZmE0YmEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4ZKz-d1KHhxDdPHH8NZOwlUw7A5Mxp4bO_dT_2Zy5hI" />
    </div>
    <div>
      <img src="https://pbs.twimg.com/media/FICnLr_VcAQRv2Q?format=jpg&name=4096x4096" />
    </div>
    <div>
      <img src="https://i.pinimg.com/736x/4e/02/b9/4e02b987da9d2c3a8c27abc9afb3746a--finger-video-games.jpg" />
    </div>
  </Carousel>
);
export default Hero;