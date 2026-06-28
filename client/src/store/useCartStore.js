import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],
    cartTotalPrice: 0,
    totalCartItems: 0,
    isAllowedToCheckout: false,
    setIsAllowedToCheckout: (status) => set({ isAllowedToCheckout: status }),
    getCartProduct: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/cart`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json',
                    token: localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.status === 200) {
                set({ 
                    cartItems: data.cartProducts.Products,
                    cartTotalPrice: data.cartProducts.Total_Price,
                    totalCartItems: data.cartProducts.Total_Quantity
                });
            } else if (data.status === 204) {
                set({ cartItems: [], cartTotalPrice: 0, totalCartItems: 0 });
            }
        } catch (error) {
            console.error('Failed to fetch cart products:', error);
        }
    }
}));

export default useCartStore;
