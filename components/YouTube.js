export default function YouTube({ id }) {
  return (
    <div>
      <iframe 
        width="660" 
        height="350" 
        src={`https://www.youtube.com/embed/${id}`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen={true}
        >
        </iframe>
    </div>
  );
}