import useStore from '@/store/useStore';
import useGlobalStore from '@/store/globalStore';

export default function SearchBar() {
  const setSearchPodcast = useGlobalStore((state) => state.setSearchPodcast);
  const podcast = useStore(useGlobalStore, (state) => state.podcasts);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchPodcast(value);
  };

  return (
    <div className="flex">
      <h3 className="mr-2 font-bold text-center text-white bg-sky-500 rounded-xl w-12 ">
        {podcast?.length}
      </h3>
      <div className="border-2 rounded-md">
        <input placeholder="Filter Podcasts.." onChange={handleSearch} />
      </div>
    </div>
  );
}
