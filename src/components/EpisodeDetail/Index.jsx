export default function EpisodeDetail({ name, description, view }) {
  return (
    <div className="grid shadow-lg shadow-slate-400 m-4">
      <h1 className="text-2xl font-bold mt-4 ml-4 ">{name}</h1>
      <p
        className="text-justify m-4"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>
      <audio controls name={name} className=" justify-self-center mb-4">
        <source src={view} type="audio/mpeg" />
      </audio>
    </div>
  );
}
