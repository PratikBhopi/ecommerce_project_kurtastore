import { create } from 'zustand';

const useHomeStore = create((set) => ({
    homeItemsData: [],
    homeani: true,
    getHomePosts: async () => {
        set({ homeani: true });
        try {
            // Fetch default items for the homepage
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/products?limit=12&sort=All`);
            const data = await response.json();
            set({ homeItemsData: data.products, homeani: false });
        } catch (error) {
            console.log(error);
            set({ homeani: false });
        }
    }
}));

export default useHomeStore;
