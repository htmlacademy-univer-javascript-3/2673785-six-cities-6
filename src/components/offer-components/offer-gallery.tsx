import { FC } from 'react';

interface OfferGalleryProps {
  images: string[];
}

export const OfferGallery: FC<OfferGalleryProps> = ({ images }) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {images.slice(0, 6).map((image, index) => (
        <div className="offer__image-wrapper" key={image}>
          <img
            className="offer__image"
            src={image}
            alt={`Photo studio ${index + 1}`}
          />
        </div>
      ))}
    </div>
  </div>
);
