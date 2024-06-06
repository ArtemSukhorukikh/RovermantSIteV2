import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    id: null
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      const { id, token }: any = await $fetch('/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: username,
          password: password,
        },
      });
      this.loading = false;

      if (id) {
        const tokenCookie = useCookie('token');
        tokenCookie.value = token;
        console.log(tokenCookie)
        this.authenticated = true;
        this.id = id
      }
    },

    async registrateUser({ username, password, name, patronymic, surname }: UserPayloadInterface) {
      const { id, token }: any = await $fetch('/api/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: username,
          password: password,
          name: name,
          surname: surname,
          patronymic: patronymic ?? null
        },
      });
      this.loading = false;

      if (id) {
        const tokenCookie = useCookie('token');
        tokenCookie.value = token;
        this.authenticated = true;
        this.id = id
      }
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      this.id = null;
      token.value = null;
    },
  },
});