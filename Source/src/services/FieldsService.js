const getSoccerFields = () => {
    const mockFields = [
      {
        id: 1,
        center_id: 101,
        sfield_price: 50,
        sfield_description: "Cancha de césped sintético",
        sfield_is_active: true,
        sfield_wide: 40,
        sfield_long: 60,
        sfield_players: 10,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg", "https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 2,
        center_id: 102,
        sfield_price: 70,
        sfield_description: "Cancha techada con iluminación",
        sfield_is_active: true,
        sfield_wide: 35,
        sfield_long: 55,
        sfield_players: 8,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 3,
        center_id: 103,
        sfield_price: 30,
        sfield_description: "Cancha de tierra con gradas",
        sfield_is_active: false,
        sfield_wide: 45,
        sfield_long: 70,
        sfield_players: 12,
        sfield_pictures: []
      },
      {
        id: 4,
        center_id: 104,
        sfield_price: 65,
        sfield_description: "Cancha profesional con césped natural",
        sfield_is_active: true,
        sfield_wide: 50,
        sfield_long: 90,
        sfield_players: 11,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg", "https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 5,
        center_id: 105,
        sfield_price: 45,
        sfield_description: "Cancha estándar con vestidores",
        sfield_is_active: true,
        sfield_wide: 38,
        sfield_long: 58,
        sfield_players: 9,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 6,
        center_id: 106,
        sfield_price: 80,
        sfield_description: "Cancha con sistema de riego automático",
        sfield_is_active: true,
        sfield_wide: 55,
        sfield_long: 100,
        sfield_players: 11,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg", "https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 7,
        center_id: 107,
        sfield_price: 55,
        sfield_description: "Cancha con césped híbrido",
        sfield_is_active: true,
        sfield_wide: 42,
        sfield_long: 65,
        sfield_players: 10,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 8,
        center_id: 108,
        sfield_price: 40,
        sfield_description: "Cancha urbana con acceso 24/7",
        sfield_is_active: false,
        sfield_wide: 30,
        sfield_long: 50,
        sfield_players: 7,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 9,
        center_id: 109,
        sfield_price: 60,
        sfield_description: "Cancha con cámaras de seguridad",
        sfield_is_active: true,
        sfield_wide: 48,
        sfield_long: 80,
        sfield_players: 11,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      },
      {
        id: 10,
        center_id: 110,
        sfield_price: 75,
        sfield_description: "Cancha VIP con zona lounge",
        sfield_is_active: true,
        sfield_wide: 50,
        sfield_long: 90,
        sfield_players: 11,
        sfield_pictures: ["https://www.espaciosdeportivos.com.gt/wp-content/uploads/2021/09/Grama-sintetica-altura-1080x675.jpg"]
      }
    ];

    return mockFields;
};

module.exports = { getSoccerFields };
