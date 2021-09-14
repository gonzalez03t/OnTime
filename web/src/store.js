import create from 'zustand';

const useStore = create((set, get) => ({
  user: null,

  fullname: () => `${get().user['firstName']} ${get().user['lastName']}`,

  setUser: (newUser) => {
    if (!newUser) {
      console.error('State not updated. User object is empty.');
    } else {
      set((state) => ({
        ...state,
        user: newUser,
      }));
    }
  },
}));

export default useStore;
