import { useEffect, useState } from 'react';
import styles from './Galeria.module.css';
import { Link } from 'react-router-dom';

const Galeria = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const token = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=brazil&per_page=12&client_id=${token}`,
        );
        const data = await response.json();

        if (response.status != 200) setError('Erro as buscar foto');
        setPhotos(data.results);
        setError(null);
      } catch (err) {
        setError(`Erro ao buscar fotos: ${err}`);
      }
    };

    if (token) fetchPhotos();
  }, [token]);

  const cleanSlug = (slug) => slug?.split('-').slice(0, -1).join(' ');

  if (error || photos.length == 0) return <p>{error}</p>;

  return (
    <section className={styles.galeria}>
      {photos.map((photo) => (
        <div key={photo.id} className={styles.card}>
          <Link to={`photo/${photo.id}`}>
            <img
              src={photo.urls['small']}
              alt={cleanSlug(photo.alternative_slugs['pt'])}
            />
            <h2 className={styles.title}>
              {cleanSlug(photo.alternative_slugs['pt'])}
            </h2>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Galeria;
