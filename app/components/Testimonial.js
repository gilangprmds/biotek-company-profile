

export default function Testimonial() {
    return(
        <section id="testimonials" className="section-area">
        <div className="container">
          <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
            <h6 className="mb-2 block text-lg font-semibold text-primary">
              Client Reviews
            </h6>
            <h2 className="mb-6">Our Testimonials</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div
            className="swiper testimonial-carousel common-carousel scroll-revealed"
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8"
                >
                  <p
                    className="mb-6 text-base text-body-light-11 dark:text-body-dark-11"
                  >
                    "Our members are so impressed. It's intuitive. It's clean.
                    It's distraction free. If you're building a community."
                  </p>
                  <figure className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden">
                      <img
                        src="./assets/img/avatar/avatar-4.jpg"
                        alt="Testimonial picture"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <figcaption className="flex-grow">
                      <h3
                        className="text-sm font-semibold text-body-light-11 dark:text-body-dark-11"
                      >
                        Ralf Nacht
                      </h3>
                      <p
                        className="text-xs text-body-light-10 dark:text-body-dark-10"
                      >
                        Web Entrepreneur
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8"
                >
                  <p
                    className="mb-6 text-base text-body-light-11 dark:text-body-dark-11"
                  >
                    "Our members are so impressed. It's intuitive. It's clean.
                    It's distraction free. If you're building a community."
                  </p>
                  <figure className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden">
                      <img
                        src="./assets/img/avatar/avatar-5.jpg"
                        alt="Testimonial picture"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <figcaption className="flex-grow">
                      <h3
                        className="text-sm font-semibold text-body-light-11 dark:text-body-dark-11"
                      >
                        Sebastian Toft
                      </h3>
                      <p
                        className="text-xs text-body-light-10 dark:text-body-dark-10"
                      >
                        Web Developer
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8"
                >
                  <p
                    className="mb-6 text-base text-body-light-11 dark:text-body-dark-11"
                  >
                    "Our members are so impressed. It's intuitive. It's clean.
                    It's distraction free. If you're building a community."
                  </p>
                  <figure className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden">
                      <img
                        src="./assets/img/avatar/avatar-6.jpg"
                        alt="Testimonial picture"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <figcaption className="flex-grow">
                      <h3
                        className="text-sm font-semibold text-body-light-11 dark:text-body-dark-11"
                      >
                        Bao Shen
                      </h3>
                      <p
                        className="text-xs text-body-light-10 dark:text-body-dark-10"
                      >
                        UI/UX Designer
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8"
                >
                  <p
                    className="mb-6 text-base text-body-light-11 dark:text-body-dark-11"
                  >
                    "Our members are so impressed. It's intuitive. It's clean.
                    It's distraction free. If you're building a community."
                  </p>
                  <figure className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden">
                      <img
                        src="./assets/img/avatar/avatar-7.jpg"
                        alt="Testimonial picture"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <figcaption className="flex-grow">
                      <h3
                        className="text-sm font-semibold text-body-light-11 dark:text-body-dark-11"
                      >
                        Emanuel Velzeboer
                      </h3>
                      <p
                        className="text-xs text-body-light-10 dark:text-body-dark-10"
                      >
                        Graphics Designer
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <div className="mt-[60px] flex items-center justify-center gap-1">
              <div className="swiper-button-prev">
                <i className="lni lni-arrow-left"></i>
              </div>
              <div className="swiper-button-next">
                <i className="lni lni-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}