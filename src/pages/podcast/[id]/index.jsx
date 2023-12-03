import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import useGlobalStore from '@/store/globalStore';
import useStore from '@/store/useStore';
import LeftBar from '@/components/LeftBar';
import PodcastDetail from '@/components/PodcastDetail';

export default function PodcastID() {
  const podcast = useStore(useGlobalStore, (state) => state.podcast);
  const setPodcast = useGlobalStore((state) => state.setPodcast);
  const description = useStore(useGlobalStore, (state) => state.description);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) {
      router.push('/');
    }
    setPodcast(router.query.id);
  }, []);

  return (
    <Layout>
      {!podcast ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <LeftBar
              artist={podcast[0]?.artistName}
              name={podcast[0]?.collectionName}
              description={description}
              image={podcast[0]?.artworkUrl600}
            />
          </div>
          <div className="col-span-3">
            <PodcastDetail
              episodes={podcast[0]?.trackCount}
              episodesList={podcast?.map((podcast) => podcast)}
              className="col-span-3"
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
