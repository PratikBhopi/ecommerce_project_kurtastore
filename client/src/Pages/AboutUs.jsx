import React from 'react'
import Header from '../Component/Header'

const AboutUs = () => {
    return (
        <>
            <div className='realtive  scrollbar-track-[#ffffff00] scrollbar-thumb-yellow-800  scrollbar'>
                <div className='fixed w-screen z-[9999]'><Header /></div>
                <div className=' bg-stone-300'>
                    <div className='h-[74px] bg-white'></div>
                    {/* <div className=' h-20'></div> */}
                </div>
                <div className='px-2 pt-2'>
                    <div className="bg-gray-100 py-12 border">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    About Us
                                </h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Welcome to Karma Threads, where elegance meets tradition. Nestled in the heart of Surat, we specialize in offering a diverse range of meticulously crafted kurtas and ethnic wear that blend timeless traditions with contemporary styles.
                                </p>
                            </div>
                            <div className="mt-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center justify-center">
                                        {/* <img className="h-80 rounded-lg shadow-lg object-cover" src="/aawaralogo.jpg" alt="About Us Image" /> */}
                                        <div className='h-80 bg-gradient-to-b  QuoteLines text-yellow-800 text-[90px] font-[500] w-full shadow-lg flex justify-center flex-col items-center '>
                                            <div className='translate-y-10 -translate-x-10'>K</div>
                                            <div className='-translate-y-14 translate-x-6'>T</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-lg text-gray-600">
                                            Our passion for quality craftsmanship and dedication to showcasing the rich heritage of Indian textiles drive us to curate collections that resonate with authenticity and charm.
                                        </div>
                                        <div className="mt-4 text-lg text-gray-600">
                                            At Karma Threads, we believe in celebrating individuality through fashion that speaks volumes about cultural pride and personal expression. Each piece in our collection is carefully selected to reflect the essence of Indian craftsmanship, ensuring that every customer finds something that resonates with their unique sense of style.
                                        </div>
                                        <div className="mt-4 text-lg text-gray-600">
                                            Our commitment extends beyond just providing beautiful clothing; we strive to create a seamless shopping experience where quality, reliability, and customer satisfaction are paramount. Whether you're searching for the perfect kurta for a festive occasion or seeking to enrich your wardrobe with timeless ethnic wear, Karma Threads promises to exceed your expectations.
                                        </div>
                                        <div className="mt-4 text-lg text-gray-600">
                                            Explore our online store and discover the allure of traditional Indian attire reinvented for the modern discerning individual. Join us in celebrating the beauty of cultural diversity and embark on a journey of sartorial elegance with Karma Threads.
                                        </div>
                                        <div className="mt-4 text-lg text-gray-600">
                                            For any inquiries or assistance, please don't hesitate to reach out to us at <a href="mailto:aawaraethnic@gmail.com" className="text-blue-500">karmathreads@gmail.com</a> <p>Contact:- +91 XXXXXXXXXX</p> or visit us at KarmaThreads .. Pune - 401215.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AboutUs
