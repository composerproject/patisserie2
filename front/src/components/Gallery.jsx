

function Gallery({images}) {
  return (
    <div className="horizontal-scroll-container">
        {images.map((img, i) => 
            <div key={i} className="gallery-card">
                <img src={img.image} alt={img.name}/>
                <div className="container">
                    <p>{img.name}</p>
                </div>
            </div>
        )}

    </div>
  )
}

export default Gallery