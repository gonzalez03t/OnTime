import create from 'zustand';
import { persist } from 'zustand/middleware';
import SecureLS from 'secure-ls';
import { NotificationManager } from 'react-notifications';
import { getImageUrl } from '../api/image';
import { getUserAppointments } from '../api/appointment';
import okResponse from '../utils/okResponse';

// e.g. aes, des, etc
const ENCRYPTION_TYPE = process.env.REACT_APP_STORE_ENCRYPTION_TYPE;
const ENCRYPTION_SECRET = process.env.REACT_APP_STORE_ENCRYPTION_SECRET;

const ls = new SecureLS({
  encodingType: ENCRYPTION_TYPE,
  encryptionSecret: ENCRYPTION_SECRET,
});

// this defines a type of storage that zustand can use. Zustand requires
// getItem and setItem methods for custom stores. I initialize the secure store
// above, and use it in the corresponding methods.
const SecureLocalStorage = {
  getItem: (key) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getting', key, 'from storage');
    }

    return ls.get(key) || null;
  },
  setItem: (key, value) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(key, 'with value', value, 'has been saved');
    }

    ls.set(key, value);
  },
};

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      appointments: null,

      isAuthenticated() {
        const user = get().user;

        return user && user.status === 'authenticated';
      },

      isCompanyOwner() {
        const user = get().user;

        return get().isAuthenticated() && user?.role === 'COMPANY_OWNER';
      },

      getFullname() {
        const user = get().user;

        if (user) {
          return `${user.firstName} ${user.lastName}`;
        }

        return null;
      },

      getUserImage() {
        const user = get().user;

        if (user && user.imageKey) {
          return getImageUrl(user.imageKey);
        } else {
          return '/User1.PNG';
        }
      },

      getUserNotificationSetting() {
        const user = get().user;

        return user?.notificationPreference;
      },

      // This just assigns the state a new user. We don't check for null/undefined
      // to allow for easy logout
      setUser: (newUser) => {
        set({ user: newUser });
      },

      setUserDetails(userDetails) {
        set({ user: { ...get().user, ...userDetails } });
      },

      setNotificationPreference(newPreference) {
        set({ user: { ...get().user, notificationPreference: newPreference } });
      },

      // this is primarily used for auth stages. I.e. on login, user status is
      // pending_otp_auth. Once they pass the 2FA, they become authenticated.
      setUserStatus(newStatus) {
        set({
          user: {
            ...get().user,
            status: newStatus,
          },
        });
      },

      /**
       *
       * @param {'info' | 'success' | 'warning' | 'error'} type
       * @param {string} message
       */
      addNotification(type, message) {
        NotificationManager[type](message);
      },

      fetchAppointments: async () => {
        if (get().isAuthenticated()) {
          const res = await getUserAppointments();

          if (okResponse(res)) {
            set({ appointments: res.data });
          } else {
            get().addNotification('error', 'Could not fetch appointments');
          }
        }
      },
    }),
    {
      name: 'ontime',
      getStorage: () => SecureLocalStorage,
    }
  )
);

export default useStore;
