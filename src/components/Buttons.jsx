import React from 'react';

export default function Buttons() {
  return (
    <div>
      <button type="button" id="share" data-testid="share-btn">Compartilhar</button>
      <button type="button" id="favorite" data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}
