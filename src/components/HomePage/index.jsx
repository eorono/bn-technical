import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useGlobalStore from '../../store/globalStore';
import useStore from '@/store/useStore';
import SearchBar from '../SearchBar/Index';

export default function HomePage() {
  const podcast = useStore(useGlobalStore, (state) => state.podcasts);
  const setPodcast = useGlobalStore((state) => state.setPodcasts);
  const resetPodcast = useGlobalStore((state) => state.resetPodcast);
  const resetFilter = useGlobalStore((state) => state.resetFilter);

  useEffect(() => {
    setPodcast();
    resetPodcast();
    return () => resetFilter();
  }, []);

  return (
    <div className="grid ">
      <div className="m-3 text-lg justify-self-end ">
        <SearchBar />
      </div>
      <div className="grid grid-cols-4 justify-items-center ">
        {podcast?.map((podcast) => (
          <Link
            key={podcast.id.attributes['im:id']}
            href={`/podcast/${podcast.id.attributes['im:id']}`}
          >
            <div className="grid grid-cols-1 justify-items-center mb-6 border-slate-400 rounded-l shadow-lg shadow-slate-400 h-56 w-72 hover:scale-105 transition ease-in-out">
              <Image
                className="rounded-full"
                src={podcast['im:image'][2].label}
                alt={podcast['im:name'].label}
                width={100}
                height={100}
              />
              <h3 className="text-center text-l break-all">
                {podcast['im:name'].label}
              </h3>
              <p className="text-center text-gray-400 text-sm break-all">
                {podcast['im:artist'].label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
