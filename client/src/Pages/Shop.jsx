import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../Component/Header'
import CardsContainer from '../Component/CardsContainer'
import Cards from '../Component/Cards'
import useProductStore from '../store/useProductStore'
import Footer from '../Component/Footer'
import { CiSearch } from "react-icons/ci";


const Shop = () => {

    const { itemsData, getPosts, currentPage, totalPages } = useProductStore()
    
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Sort');
    const [page, setPage] = useState(1);

    // Debounce search slightly to avoid spamming the API
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getPosts({ page, limit: 12, search, sort });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [page, search, sort, getPosts]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-background text-on-background font-body-md selection:bg-secondary-container">
            <Header />

            <main className="max-w-container-max mx-auto px-4 md:px-margin-desktop pt-10 md:pt-16">
                {/* Collection Header */}
                <section className="text-center mb-12 md:mb-20 relative">
                    <h1 className="font-display-lg text-4xl md:text-display-lg text-primary uppercase mb-4 tracking-tighter">Shop Kurtas</h1>
                    <div className="w-24 h-px bg-outline-variant/50 mx-auto mb-6 relative diamond-divider"></div>
                    <p className="max-w-2xl mx-auto font-body-lg text-body-md md:text-body-lg text-on-surface-variant italic leading-relaxed px-4">
                        "Where ancient weaves meet contemporary silhouettes. Each thread whispers a story of heritage, meticulously crafted for the man who walks between worlds."
                    </p>
                </section>

                <div className="flex flex-col md:flex-row gap-8 md:gap-gutter">
                    {/* Sidebar Filter */}
                    <aside className="w-full md:w-64 shrink-0 space-y-8 md:space-y-10">
                        {/* Search */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline">search</span>
                            <input 
                                value={search} 
                                onChange={handleSearchChange} 
                                placeholder="Search Collection" 
                                type="search" 
                                className="w-full bg-transparent border-b border-outline-variant/50 py-2 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-0 font-body-md text-on-surface placeholder:text-outline"
                            />
                        </div>
                        
                        {/* Category (Visual only for now, can be wired up later) */}
                        <div>
                            <h3 className="font-label-sm text-label-sm uppercase text-primary border-b border-outline-variant/30 pb-2 mb-4">Category</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between group cursor-pointer">
                                    <span className="font-body-md text-body-md text-primary font-bold">All</span>
                                </li>
                                <li className="flex items-center justify-between group cursor-pointer">
                                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Classic Linen</span>
                                </li>
                                <li className="flex items-center justify-between group cursor-pointer">
                                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Hand-Loomed Silk</span>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
                            <p className="text-label-sm text-on-surface-variant">
                                Showing {itemsData.length} Items (Page {currentPage} of {totalPages})
                            </p>
                            <div className="flex gap-4 items-center">
                                <span className="text-label-sm uppercase tracking-widest text-outline">Sort By:</span>
                                <select 
                                    value={sort} 
                                    onChange={handleSortChange} 
                                    className="bg-transparent border-none font-body-md text-body-md text-primary focus:ring-0 cursor-pointer p-0"
                                >
                                    <option value="Sort">Sort</option>
                                    <option value="All">All</option>
                                    <option value="Latest">Newest Arrivals</option>
                                    <option value="lowtohigh">Price: Low to High</option>
                                    <option value="hightolow">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-gutter">
                            {itemsData.map(item => (
                                <Cards key={item.PRODUCT_id} productsdata={item} />
                            ))}
                        </div>
                        
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-16 md:mt-20 flex justify-center items-center gap-4">
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`w-10 h-10 flex items-center justify-center border border-outline-variant/30 transition-colors ${currentPage === 1 ? 'text-outline cursor-not-allowed' : 'text-primary hover:border-primary'}`}
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                
                                <span className="font-body-md text-body-md text-primary font-bold">
                                    {currentPage}
                                </span>
                                
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`w-10 h-10 flex items-center justify-center border border-outline-variant/30 transition-colors ${currentPage === totalPages ? 'text-outline cursor-not-allowed' : 'text-primary hover:border-primary'}`}
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Shop
