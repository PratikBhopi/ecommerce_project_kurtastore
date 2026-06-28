import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import CardsContainer from '../Component/CardsContainer'
import { Link, useNavigate } from 'react-router-dom'
import useHomeStore from '../store/useHomeStore'
import Cards from '../Component/Cards'
import CartAnimation from '../Component/CarAnimation'
import { Helmet } from 'react-helmet'
import WhatsappChat from '../Component/WhatsappChat'

const Home = () => {

    const navigate = useNavigate()

    const { homeItemsData, homeani } = useHomeStore()






    return (
        <div className="bg-background text-on-background font-body-md selection:bg-secondary-container">
            <Helmet>
                <title>Karma Threads | Heritage Craftsmanship for the Modern Man</title>
                <meta name="description" content="Best Ethnic Kurta Wear" />
                <meta name="keywords" content={["Kurtas","Pajamas","Ethnic Wear","Aawara Ethnic"]} />
            </Helmet>
            <Header />
            <WhatsappChat />
            
            {homeani ? <CartAnimation /> : null}
            
            {/* Hero Section */}
            <header className="relative h-[80vh] md:h-[921px] overflow-hidden">
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
                    style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpmIueq1T2fi1Ck0IU7jWGKdIJQi58LlvIEtt5N_W-HRY0w8urXcGXVFi0eucMaBRyMffLcOsP25gnWfqN5_0g9emsvWbsvXkmD1S2VlH0SsRMQBFh_1x6Md7WwabwMax16HuqY-F0z1x8oEs4EqSG7uP4atkwfAOvNr_Ps42lJ7bC0xXempOhLL4e6MsbACRNm8ovjZG6NcDR_WyTSuVhaHEFXA_ae-QXOFHfBan0HOvAGC7f4IaWtML_jfc1owKCpKhDmgwbbSk')"}}
                >
                </div>
                <div className="absolute inset-0 hero-overlay flex flex-col items-center justify-center text-center px-4">
                    <p className="font-label-sm text-label-sm text-secondary-container uppercase tracking-[0.3em] mb-4">Established Heritage</p>
                    <h2 className="font-display-lg text-[40px] md:text-[80px] leading-tight text-white mb-8 max-w-4xl">Quality you can trust</h2>
                    <button 
                        onClick={() => navigate('/shop')}
                        className="bg-primary text-white px-10 py-4 font-label-sm uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300 rounded-none border border-secondary"
                    >
                        Explore the Collection
                    </button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-white/60 font-label-sm tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent"></div>
                </div>
            </header>

            {/* Section Divider */}
            <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-section-gap">
                <div className="relative w-full h-[1px] bg-outline-variant/30 gold-divider"></div>
            </div>

            {/* Latest Collection */}
            <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-section-gap">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
                    <div>
                        <h3 className="font-display-lg text-headline-lg text-primary mb-2">The Autumn Edit</h3>
                        <p className="font-body-md text-on-surface-variant">Artisanal silhouettes for the modern connoisseur.</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link to={'/shop'} className="p-3 gold-border hover:bg-surface-container transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm font-label-sm uppercase tracking-widest text-primary">View All</span>
                        </Link>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
                    {homeItemsData.slice(0, 4).filter(item => item.uploaded_at === 'Latest').map(item => (
                        <Cards animate key={item.PRODUCT_id} productsdata={item} />
                    ))}
                    {/* Fallback if less than 4 latest */}
                    {homeItemsData.filter(item => item.uploaded_at === 'Latest').length < 4 && 
                     homeItemsData.slice(0, 4 - homeItemsData.filter(item => item.uploaded_at === 'Latest').length).map(item => (
                        <Cards animate key={item.PRODUCT_id} productsdata={item} />
                    ))}
                </div>
            </section>

            {/* Curated Collections Grid (Bento Style) */}
            <section className="bg-surface-container-low py-section-gap">
                <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
                    <h3 className="font-display-lg text-headline-lg text-primary text-center mb-16 tracking-tight">The Curated Archive</h3>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[800px]">
                        {/* Main Category: Wedding */}
                        <div className="md:col-span-8 relative overflow-hidden group cursor-pointer h-[400px] md:h-auto" onClick={() => navigate('/shop')}>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqsePg5fGdFft_tUZdGyLcPrPWGH8-uv53RopKjpv8KfAehwQ-K14ur6Q5KgXAs1nh5UxI1xv5oDxKEerjkt7Aj0YzDy5dkQD4Ec6-L-2hq9RtPt9KWu4h8U0lwvZCDxGgCz0h6hZvxwTJKm056c6CHtvF7upeGaZqebu9F06WzwjOfEBUERv5l5qYf551LzwGJcpZaxSNBU8ckIX7sG04BIHFjXX1Puhoc1vU-qzTqSe1w-N1YO41QOsOTj6b0L2idXbpjZ9kRR0')"}}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                                <p className="font-label-sm text-secondary-container tracking-[0.3em] uppercase mb-2">Celebration Wear</p>
                                <h4 className="font-display-lg text-3xl md:text-5xl text-white mb-6">The Wedding Edit</h4>
                                <button className="border-b border-secondary-fixed text-white font-label-sm uppercase tracking-widest pb-1 hover:text-secondary-fixed transition-colors">Explore Gallery</button>
                            </div>
                        </div>

                        {/* Secondary Category: Ethnic */}
                        <div className="md:col-span-4 relative overflow-hidden group cursor-pointer h-[300px] md:h-auto" onClick={() => navigate('/shop')}>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8ebl40ZKC1D3a4W294GYhYANg-vIZT6MXnPZji8KEZ1QEQoDNJiDT9rUIKVNMDk1dsg6qMLH7iXXOv-nP5x5tjcqIgGUge0WhoI_RikVVVDDQn1svAKrL392lcBm8e_pg2wu5103i75-YLElKsWwhoc9AvLaOv3xnlC_RRiINVYcNWm5yqXp9CNFYShSrbVuVsLSgmenMnGJNCaQUtFvHOYERYVGwry1PrYhow4sRiac47oVUt4fXuu0PPsodhl6v4QU1xzfxXv0')"}}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-8 left-8">
                                <p className="font-label-sm text-secondary-container tracking-[0.3em] uppercase mb-2">Modern Classics</p>
                                <h4 className="font-display-lg text-2xl md:text-3xl text-white mb-4">Men's Ethnic</h4>
                                <button className="border-b border-secondary-fixed text-white font-label-sm uppercase tracking-widest pb-1 hover:text-secondary-fixed transition-colors">Shop Now</button>
                            </div>
                        </div>

                        {/* Tertiary Category: Accessories */}
                        <div className="md:col-span-4 relative overflow-hidden group cursor-pointer h-[300px] md:h-auto" onClick={() => navigate('/shop')}>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu_HqWwOkKzMduhCV0qeBZCE0-y6v_r4KIJ0_EmG8w7GOrq9ESERmH2kXopxALn_S1n5Ht9JT6qFmil4vUfCuUl140LxlbzUNa6eDdvFJ-Sf977Ivs8u1aG3jCXo1Db5prlKb1bMXasoLqdbPqicWzbWJDX8Tsu9vW8mrcXTuPEWepu5VOI8H5aJhcEUryp4cBU9TvUhw97_hi3NGj22QTg3Wb2cMs_8mQMyUijOcWfPQfj-Axdlrqds3URHditjLFkKdpyZ8ZkeM')"}}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-8 left-8">
                                <p className="font-label-sm text-secondary-container tracking-[0.3em] uppercase mb-2">The Details</p>
                                <h4 className="font-display-lg text-2xl md:text-3xl text-white mb-4">Accessories</h4>
                                <button className="border-b border-secondary-fixed text-white font-label-sm uppercase tracking-widest pb-1 hover:text-secondary-fixed transition-colors">Discover</button>
                            </div>
                        </div>

                        {/* Brand Philosophy Callout */}
                        <div className="md:col-span-8 flex flex-col justify-center items-center bg-white p-8 md:p-12 text-center border border-secondary/20 h-[400px] md:h-auto">
                            <span className="material-symbols-outlined text-4xl mb-6">workspace_premium</span>
                            <h4 className="font-display-lg text-headline-lg text-primary mb-6">Artisanal Process</h4>
                            <p className="font-body-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed italic">
                                "Every thread in our collection tells a story of heritage, hand-woven by master craftsmen who have preserved their ancestral techniques for generations."
                            </p>
                            <Link className="font-label-sm text-primary uppercase tracking-[0.2em] border-b border-primary/30 pb-1 hover:border-primary transition-all" to="/aboutus">Our Story</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artisanal Banner */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-95"></div>
                <div className="absolute inset-0 opacity-20 parallax-bg" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')"}}></div>
                <div className="relative z-10 text-center px-4">
                    <h3 className="font-display-lg text-headline-lg text-secondary-container mb-6 italic">Sustainable Heritage</h3>
                    <p className="text-white/80 font-body-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        We believe in conscious luxury. Our fabrics are sourced ethically, supporting weaving communities across the subcontinent while minimizing our environmental footprint.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-display-lg text-white">100%</span>
                            <span className="text-label-sm text-secondary uppercase tracking-widest mt-1">Hand-Loomed</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-display-lg text-white">250+</span>
                            <span className="text-label-sm text-secondary uppercase tracking-widest mt-1">Master Weavers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-display-lg text-white">Ethical</span>
                            <span className="text-label-sm text-secondary uppercase tracking-widest mt-1">Sourcing</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home
