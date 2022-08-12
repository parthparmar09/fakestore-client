import React from 'react'

export default function Caraousel() {
  return (
    <div className="container-fluid h-lg-100 h-sm-25 ">
      <div id="caraousel" className="carousel slide mt-5 bg-dark" data-bs-ride="true">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="https://scontent-bom1-2.xx.fbcdn.net/v/t1.6435-9/74904278_104565657661635_751962603600740352_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=W4gPEVcqVW8AX-YEuI5&_nc_ht=scontent-bom1-2.xx&oh=00_AT8-BTE7yj59Rq68EsOtnTBWmR1GZh8qVneGZMuuPP8-HA&oe=630B1DAD" className=" car-image " alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://www.tnagarlks.com/images/banner_1.jpg" className=" car-image" alt="..." />
    </div>

    <div className="carousel-item">
      <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-taobao-tmall-headphones-business-home-template-image_191542.jpg" className=" car-image" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-simple-outdoor-forest-watch-banner-image_166794.jpg" className=" car-image" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#caraousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#caraousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
