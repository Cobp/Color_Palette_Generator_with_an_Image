// pages/profile/[username].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<any>(null); // Puedes reemplazar `any` con el tipo de datos de tus usuarios

  useEffect(() => {
    // Aquí simularías la carga de datos del perfil desde una API o una base de datos
    // Por ejemplo, puedes hacer una solicitud a tu servidor con el nombre de usuario y cargar los datos del perfil
    // Esto es solo un ejemplo simulado
    const fetchUserData = async () => {
      try {
        // Simulación de carga de datos
        const response = await fetch(`/api/users/${username}`); // Puedes ajustar la ruta de tu API
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (!userData) {
    return <div>Cargando...</div>; // Puedes personalizar el mensaje de carga según tus necesidades
  }

  return (
    <div>
      <h1>Perfil de {username}</h1>
      {/* Aquí mostrarías la información del perfil */}
      <p>Nombre: {userData.name}</p>
      <p>Edad: {userData.age}</p>
      {/* Agrega más detalles del perfil según la estructura de tus datos */}
    </div>
  );
};

export default ProfilePage;
