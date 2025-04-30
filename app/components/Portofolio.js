export default function Portfolio(){
    return(
        <section id="portfolio" className="section-area">
        <div className="container">
          <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
            <h6 className="mb-2 block text-lg font-semibold text-primary">
              Portfolio
            </h6>
            <h2 className="mb-6">Our Recent Works</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <nav
            className="scroll-revealed portfolio-menu mb-[3.750rem] text-center"
            aria-label="Portfolio filter"
          >
            <button
              type="button"
              className="font-semibold px-5 py-2 rounded-md text-body-light-11 dark:text-body-dark-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color active"
              data-filter="all"
            >
              All Work
            </button>
            <button
              type="button"
              className="font-semibold px-5 py-2 rounded-md text-body-light-11 dark:text-body-dark-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
              data-filter="branding"
            >
              Branding
            </button>
            <button
              type="button"
              className="font-semibold px-5 py-2 rounded-md text-body-light-11 dark:text-body-dark-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
              data-filter="marketing"
            >
              Marketing
            </button>
            <button
              type="button"
              className="font-semibold px-5 py-2 rounded-md text-body-light-11 dark:text-body-dark-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
              data-filter="planning"
            >
              Planning
            </button>
            <button
              type="button"
              className="font-semibold px-5 py-2 rounded-md text-body-light-11 dark:text-body-dark-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
              data-filter="research"
            >
              Research
            </button>
          </nav>

          <div className="scroll-revealed portfolio-grid row">
            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="branding">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-1.jpg"
                    alt="Graphics Design"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-1.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >Graphics Design</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>

            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="research">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-2.jpg"
                    alt="Web Development"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-2.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >Web Development</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>

            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="marketing">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-3.jpg"
                    alt="App Development"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-3.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >App Development</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>

            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="planning">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-4.jpg"
                    alt="Digital Marketing"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-4.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >Digital Marketing</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>

            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="branding">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-5.jpg"
                    alt="SEO Services"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-5.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >SEO Services</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>

            <div className="portfolio col-12 sm:col-6 lg:col-4">
              <article className="group" data-filter="marketing">
                <div
                  className="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
                >
                  <img
                    src="./assets/img/portfolio/portfolio-6.jpg"
                    alt="Product Design"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible"
                  >
                    <div className="flex flex-wrap gap-2 p-4">
                      <div className="inline-block relative">
                        <a
                          href="./assets/img/portfolio/portfolio-6.jpg"
                          className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-zoom-in"></i>
                        </a>
                      </div>
                      <div className="portfolio-icon">
                        <a
                          href="javascript:void(0)"
                          className="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                        >
                          <i className="lni lni-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="text-[1.5rem] leading-tight text-inherit"
                      >Product Design</a
                    >
                  </h4>
                  <p>
                    Short description for the ones who look for something new.
                    Awesome!
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
}