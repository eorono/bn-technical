import useGlobalStore from '@/store/globalStore';
import useStore from '@/store/useStore';
import Link from 'next/link';

export default function PodcastDetail({ episodes, episodesList }) {
  const loading = useStore(useGlobalStore, (state) => state.loading);
  if (episodesList[0]?.collectionId === episodesList[0]?.trackId)
    episodesList.shift();

  return (
    <>
      {!loading ? (
        <>
          <div className="m-2 p-2 ">
            <div className="border shadow-md shadow-slate-400">
              <h3 className="text-left font-bold m-2 text-lg">
                Episodes: {episodes}
              </h3>
            </div>
            <div className="flex flex-col shadow-lg shadow-slate-400">
              <div className="grid grid-cols-5 mt-4 ml-4">
                <h3 className="col-span-3 font-bold">Title</h3>
                <h3 className="font-bold">Date</h3>
                <h3 className="font-bold">Duration (Min)</h3>
              </div>
              {episodesList?.map((episode, index) => (
                <div
                  key={episode.trackId}
                  className={`grid grid-cols-5 m-2 border-2 ${
                    index % 2 === 0 ? 'bg-slate-100' : null
                  } `}
                >
                  <Link
                    href={`/podcast/${episode.collectionId}/episode/${episode.trackId}`}
                    key={episode.trackId}
                    className="text-left col-span-3 hover:text-blue-500"
                  >
                    <h3>{episode.trackName}</h3>
                  </Link>
                  <h4>{episode.releaseDate.slice(0, 10)}</h4>
                  <h4>{Math.round(episode.trackTimeMillis / 1000 / 60)}</h4>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
