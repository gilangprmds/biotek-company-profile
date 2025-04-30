

export default function Contact(){
    return(
        <section id="contact" className="section-area">
        <div className="container">
          <div className="row">
            <div className="col-12 xl:col-4">
              <div className="row">
                <div className="col-12 md:col-6 xl:col-12">
                  <div
                    className="scroll-revealed py-5 px-6 rounded-xl shadow-card-1 bg-body-light-1 dark:bg-primary-dark-2 flex gap-6 hover:shadow-lg"
                  >
                    <div>
                      <i
                        className="lni lni-phone w-[50px] h-[50px] inline-flex items-center justify-center rounded-lg text-[1.25rem] bg-primary text-primary-color"
                      ></i>
                    </div>
                    <div>
                      <h4 className="text-[1.25rem] text-primary mb-3">Contact</h4>
                      <p className="m-0">0984537278623</p>
                      <p className="m-0">yourmail@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 md:col-6 xl:col-12">
                  <div
                    className="scroll-revealed py-5 px-6 rounded-xl shadow-card-1 bg-body-light-1 dark:bg-primary-dark-2 flex gap-6 hover:shadow-lg"
                  >
                    <div>
                      <i
                        className="lni lni-map-marker w-[50px] h-[50px] inline-flex items-center justify-center rounded-lg text-[1.25rem] bg-primary text-primary-color"
                      ></i>
                    </div>
                    <div>
                      <h4 className="text-[1.25rem] text-primary mb-3">Address</h4>
                      <p className="m-0">175 5th Ave, New York, NY 10010</p>
                      <p className="m-0">United States</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 md:col-6 xl:col-12">
                  <div
                    className="scroll-revealed py-5 px-6 rounded-xl shadow-card-1 bg-body-light-1 dark:bg-primary-dark-2 flex gap-6 hover:shadow-lg"
                  >
                    <div>
                      <i
                        className="lni lni-alarm-clock w-[50px] h-[50px] inline-flex items-center justify-center rounded-lg text-[1.25rem] bg-primary text-primary-color"
                      ></i>
                    </div>
                    <div>
                      <h4 className="text-[1.25rem] text-primary mb-3">Schedule</h4>
                      <p className="m-0">24 Hours / 7 Days Open</p>
                      <p className="m-0">Office time: 10:00 AM - 5:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 xl:col-8">
              <div
                className="scroll-revealed bg-body-light-1 dark:bg-primary-dark-2 rounded-xl py-8 sm:py-12 px-6 sm:px-10 z-10 relative shadow-card-1 hover:shadow-lg"
              >
                <div className="text-center max-w-[550px] mx-auto mb-12">
                  <h6 className="mb-2 block text-lg font-semibold text-primary">
                    Get in Touch
                  </h6>
                  <h2 className="mb-3">Ready to Get Started</h2>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    quiblanditiis praesentium
                  </p>
                </div>

                <form action="#" method="POST" className="flex flex-col gap-6">
                  <div className="row">
                    <div className="col-12 md:col-6">
                      <input
                        type="text"
                        name="name"
                        className="block w-full px-5 py-3 rounded-md border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
                        placeholder="Name"
                        required
                      />
                    </div>

                    <div className="col-12 md:col-6">
                      <input
                        type="email"
                        name="email"
                        className="block w-full px-5 py-3 rounded-md border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="col-12 md:col-6">
                      <input
                        type="text"
                        name="phone"
                        className="block w-full px-5 py-3 rounded-md border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
                        placeholder="Phone"
                        required
                      />
                    </div>

                    <div className="col-12 md:col-6">
                      <input
                        type="text"
                        name="subject"
                        className="block w-full px-5 py-3 rounded-md border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        name="message"
                        rows="5"
                        className="block w-full px-5 py-3 rounded-md border border-solid border-alpha-light dark:border-alpha-dark text-inherit text-base focus:border-primary"
                        placeholder="Type your message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <div className="w-full text-center">
                        <button
                          type="submit"
                          className="inline-block px-5 py-3 rounded-md text-base bg-primary text-primary-color hover:bg-primary-light-10 dark:hover:bg-primary-dark-10 focus:bg-primary-light-10 dark:focus:bg-primary-dark-10"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}