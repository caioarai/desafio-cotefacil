import { Link, useParams } from 'react-router-dom';
import styles from './Photo.module.css';
import { useEffect, useState } from 'react';
import { FaHeart, FaUserCircle } from 'react-icons/fa';

const Photo = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const token = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    async function fetchPhoto(id) {
      const response = await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=${token}`,
      );
      let json = await response.json();

      if (
        Array.isArray(json.errors) &&
        json.errors[0] === "Couldn't find Asset"
      ) {
        const storagePhoto = JSON.parse(localStorage.getItem('photos'));
        const photoFind = storagePhoto.filter((photo) => photo.id == id);

        json = photoFind[0];
      }
      setPhoto(json);
    }

    fetchPhoto(id);
  }, [id, token]);

  const cleanSlug = (slug) => slug?.split('-').slice(0, -1).join(' ');

  if (photo == null) {
    return <p>Carregando...</p>;
  }

  if (Array.isArray(photo.errors) && photo.errors.length > 0) {
    return <p>{photo.errors[0]}</p>;
  }

  return (
    <section className={styles.photo}>
      <Link to="/galeria">
        <button type="button" className={`btn ${styles.backBtn}`}>
          Voltar
        </button>
      </Link>
      <span className={styles.user}>
        <FaUserCircle /> {photo['user']['name']}
      </span>
      <img
        src={photo['urls']['small']}
        alt={cleanSlug(photo['alternative_slugs']['pt'])}
      />
      <div className={styles.description}>
        <p className={styles.likes}>
          <FaHeart /> {photo['likes']}
        </p>
        <h2>{cleanSlug(photo.alternative_slugs['pt'])}</h2>
        <p>{photo['location']['name']}</p>
      </div>
    </section>
  );
};

export default Photo;
