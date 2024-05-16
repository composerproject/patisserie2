import React from 'react'

function FavoritePastryCard({img}) {
  return (
    <div className="favorite-card">
        <img src={img.image} alt={img.name}/>
        <div className="container">
            <p>{img.name}</p>
        </div>
</div>
  )
}

export default FavoritePastryCard