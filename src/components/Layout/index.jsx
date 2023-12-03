import useGlobalStore from '@/store/globalStore';
import useStore from '@/store/useStore';
import Link from 'next/link';

export default function Layout({ children }) {
  const loading = useStore(useGlobalStore, (state) => state.loading);
  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={`/`}>
          <h1 className="text-2xl text-left text ml-3 font-bold text-sky-600">
            Podcaster
          </h1>
        </Link>
        {loading && <h1 className="bg-cyan-500 rounded-full mr-3">🌀</h1>}
      </div>
      <hr />
      <div>{children}</div>
    </>
  );
}
