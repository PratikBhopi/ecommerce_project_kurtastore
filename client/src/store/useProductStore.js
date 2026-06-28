import { create } from 'zustand';

const useProductStore = create((set) => ({
    itemsData: [],
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    setItemsData: (items) => set({ itemsData: items }),
    getPosts: async ({ page = 1, limit = 12, search = '', sort = 'All' } = {}) => {
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                search,
                sort
            }).toString();

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/products?${queryParams}`);
            const data = await response.json();
            set({ 
                itemsData: data.products, 
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalProducts: data.totalProducts,
            });
        } catch (error) {
            console.log(error);
        }
    }
}));

export default useProductStore;
