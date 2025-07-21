import { useState } from 'react';
import styles from './NewPhoto.module.css';
import { useNavigate } from 'react-router-dom';

const NewPhoto = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gerarId = Math.floor(Math.random() * 9000) + 1000;
    const storagePhoto = JSON.parse(localStorage.getItem('photos'));
    const location = `${city}, ${country}`;
    const photoDetails = {
      id: gerarId,
      user: { name: user },
      alternative_slugs: { pt: `${title}-${gerarId}` },
      location: { name: location },
      urls: { small: photo },
      likes: 0,
    };

    localStorage.setItem(
      'photos',
      JSON.stringify([...storagePhoto, photoDetails]),
    );

    navigate('/galeria');
  };

  return (
    <div className={styles.newPhoto}>
      <h1>Adicionar nova foto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Usuário:</label>
        <input
          type="text"
          value={user}
          name="title"
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="country">País onde foi tirado:</label>
        <input
          type="text"
          value={country}
          name="country"
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label htmlFor="city">Cidade onde foi tirada:</label>
        <input
          type="text"
          value={city}
          name="city"
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label htmlFor="photo">Foto:</label>
        <input
          type="file"
          accept="image/*"
          name="photo"
          onChange={handlePhoto}
          required
        />
        {photo && <img src={photo} alt="Pré-visualização" />}
        <div className={styles.buttons}>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate('/galeria')}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPhoto;
