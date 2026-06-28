import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    setLoggedIn: (status) => set({ isLoggedIn: status }),
    checkUser: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/auth/status`, {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.status == 200) {
                set({ isLoggedIn: true });
            } else {
                set({ isLoggedIn: false });
            }
        } catch (error) {
            set({ isLoggedIn: false });
        }
    }
}));

export default useAuthStore;
