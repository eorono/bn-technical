import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      allPodcasts: [],
      podcasts: [],
      podcast: [],
      date: '',
      loading: false,
      description: '',

      fetchPodcasts: async () => {
        const response = await fetch(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        const { feed } = await response.json();
        set({ podcasts: feed.entry, allPodcasts: feed.entry });
        const now = new Date();
        set({ date: now });
        get().setLoading(false);
      },

      setPodcasts: async () => {
        get().setLoading(true);
        try {
          if (get().podcasts.length > 0) {
            const date = new Date(get().date);
            const now = new Date();
            const diffTime = now - date;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            if (diffDays < 1) {
              get().setLoading(false);
              return;
            } else {
              console.log('days');
              get().fetchPodcasts();
              return;
            }
          } else {
            get().fetchPodcasts();
            return;
          }
        } catch (error) {
          console.error(error);
        }
      },

      fetchPodcast: async (id) => {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
          )}`
        );
        const data = await response.json();
        const dataParse = JSON.parse(data.contents);
        const now = new Date();
        dataParse.date = now;
        set({ podcast: dataParse.results });
        localStorage.setItem(id, JSON.stringify(dataParse));
        get().setLoading(false);
      },

      setPodcast: async (id) => {
        get().setLoading(true);
        try {
          if (!id) throw new Error('No id');
          if (localStorage.getItem(id) === null) {
            get().fetchPodcast(id);
            get().setDescription(id);
            return;
          } else {
            const data = JSON.parse(localStorage.getItem(id));
            const date = new Date(data.date);
            const now = new Date();
            const diffTime = now - date;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            if (diffDays < 1) {
              set({ podcast: data.results });
              get().setDescription(id);
              get().setLoading(false);
              return;
            } else {
              get().fetchPodcast(id);
              get().setDescription(id);
              return;
            }
          }
        } catch (error) {
          console.error(error);
        }
      },

      setSearchPodcast: async (search) => {
        if (search === '') {
          set({ podcasts: get().allPodcasts });
          return;
        } else {
          const podcasts = get().allPodcasts.filter(
            (podcast) =>
              podcast['im:name'].label
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              podcast['im:artist'].label
                .toLowerCase()
                .includes(search.toLowerCase())
          );
          set({ podcasts });
        }
      },

      setDescription: (id) => {
        const filtered = get().podcasts.filter(
          (podcast) => podcast.id.attributes['im:id'] === id
        );
        set({ description: filtered[0].summary.label });
      },

      resetFilter: () => set({ podcasts: get().allPodcasts }),

      resetPodcast: () => set({ podcast: [], description: '' }),

      setLoading: (value) => set({ loading: value }),
    }),
    {
      name: 'global-storage',
    }
  )
);

export default useGlobalStore;
