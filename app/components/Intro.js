export default function Intro() {
    return(
        <section id="intro" className="section-area">
        <div className="container">
          <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
            <h6 className="mb-2 block text-lg font-semibold text-primary">
              Intro Video
            </h6>
            <h2 className="mb-6">Watch Our Intro Video</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="scroll-revealed relative max-w-[900px] mx-auto">
            <img
              src="./assets/img/intro-video.jpg"
              alt="Intro video"
              className="w-full h-full aspect-video rounded-xl object-cover"
            />
            <a
              href="javascript:void(0)"
              className="video-popup w-[80px] h-[80px] rounded-full inline-flex items-center justify-center bg-primary text-primary-color text-[1.875rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md hover:bg-primary-color hover:text-primary hover:shadow-xl focus:bg-primary-color focus:text-primary focus:shadow-xl"
            >
              <i className="lni lni-play"></i>
            </a>
          </div>
        </div>
      </section>
    );
}