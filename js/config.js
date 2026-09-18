/* ==========================================================================
   CONFIG — Todos los datos editables de la página
   --------------------------------------------------------------------------
   Cambiá acá horarios, teléfonos, redes, pastores y videos:
   NO hace falta tocar index.html para actualizar estos datos.
   ========================================================================== */

const CONFIG = {
  nombre: "Iglesia Peniel Buenos Aires",

  /* ------- Teléfono y WhatsApp del templo ------- */
  telefono: {
    display: "(011) 4683-3841",
    tel: "+541146833841",
    wa: "541146833841",
    waMensaje: "¡Hola! Los saludo desde la página web de la Iglesia Peniel Buenos Aires."
  },

  /* ------- Dirección ------- */
  direccion: {
    calle: "Av. Lope de Vega 346",
    barrio: "Villa Luro · CABA (CP 1407BNP)",
    mapa: "https://www.google.com/maps?q=-34.6345963,-58.5002925&z=16&output=embed"
  },

  /* ------- Horarios de reuniones ------- */
  horarios: [
    {
      dia: "Domingo",
      nombre: "Cultos Generales",
      hora: "11:00 y 18:30",
      nota: "Culto de celebración, alabanza y la Palabra"
    },
    {
      dia: "Sábado",
      nombre: "Reunión de Jóvenes",
      hora: "19:00",
      nota: "Alabanza, enseñanza y comunidad"
    },
    {
      dia: "Domingo",
      nombre: "Escuela Bíblica y Niños",
      hora: "10:30",
      nota: "Clases para todas las edades, antes del culto"
    }
  ],

  /* ------- Redes sociales ------- */
  redes: {
    facebook: "https://www.facebook.com/penielbuenosaires/",
    instagram: "https://www.instagram.com/jov.peniel",
    youtube: "https://www.youtube.com/c/IglesiaPenielBuenosAires"
  },

  /* ------- Librería Peniel (sector de la iglesia) ------- */
  libreria: {
    web: "https://libreriapeniel.com/",
    wa: "5491135851009",
    waMensaje: "¡Hola! Vi la Librería Peniel desde la página de la iglesia y quería consultar por un producto."
  },

  /* ------- Pastores -------
     Nota: las fotos son provisorias. Decime qué descripción poner y
     qué foto corresponde a cada uno y lo cambiamos acá mismo. */
  pastores: [
    {
      nombre: "Pastor Juan Carlos Faría",
      cargo: "Pastor",
      foto: "img/pastor-jc.jpg",
      mensaje: "Con el corazón puesto en el servicio a Dios, pastoreando a la congregación de Peniel Buenos Aires."
    },
    {
      nombre: "Pastora Zully Faría",
      cargo: "Pastora",
      foto: "img/pastora-zully.jpg",
      mensaje: "Acompañando a las familias de la iglesia con amor, fe y dedicación."
    }
  ],

  /* ------- Videos / prédicas -------
     Cada video tiene: id (el código de YouTube, ej: "dQw4w9WgXcQ"),
     titulo y fecha. Si id queda vacío ("") se muestra un enlace al canal. */
  videos: [
    { id: "", titulo: "Última prédica", fecha: "Domingo reciente" },
    { id: "", titulo: "Prédica destacada", fecha: "Para revivir" },
    { id: "", titulo: "Alabanza y adoración", fecha: "En vivo desde el templo" }
  ]
};