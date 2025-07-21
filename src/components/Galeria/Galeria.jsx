import { useEffect, useState } from 'react';
import styles from './Galeria.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaImage, FaSearch } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';

const Galeria = () => {
  const token = import.meta.env.VITE_ACCESS_KEY;
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storagePhotos = localStorage.getItem('photos');

    if (storagePhotos) {
      setPhotos(JSON.parse(localStorage.getItem('photos')));
    } else {
      const fetchPhotos = async () => {
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=brazil&per_page=12&client_id=${token}`,
          );
          const data = await response.json();

          if (response.status != 200) setError('Erro as buscar foto');

          localStorage.setItem('photos', JSON.stringify(data.results));

          setPhotos(data.results);
          setError(null);
        } catch (err) {
          setError(`Erro ao buscar fotos: ${err}`);
        }
      };

      if (token) fetchPhotos();
    }
  }, [token]);

  const cleanSlug = (slug) => slug?.split('-').slice(0, -1).join(' ');
  const handleSearch = (e) => {
    e.preventDefault;
    const filtered = photos.filter((photo) =>
      cleanSlug(photo.alternative_slugs['pt'])
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    setShowAll(true);
    search == '' ? allPhotos() : setPhotos(filtered);
  };
  const allPhotos = () => {
    setPhotos(JSON.parse(localStorage.getItem('photos')));
    setSearch('');
    setShowAll(false);
  };

  const handleNewPhoto = () => {
    navigate('photo/new');
  };

  if (error) return <p>{error}</p>;

  return (
    <section className={styles.galeria}>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Digite..."
            name="inputSearch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch onClick={handleSearch} />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNewPhoto}
        >
          Adicionar <FaImage />
        </button>
      </div>

      {showAll && (
        <span className="backArrow" onClick={allPhotos}>
          <IoArrowUndoSharp /> Voltar
        </span>
      )}

      {photos.length > 0 ? (
        <div className={styles.photosList}>
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
        </div>
      ) : (
        <p className={styles.notFound}>Nehuma foto foi encontrada</p>
      )}
    </section>
  );
};

export default Galeria;
