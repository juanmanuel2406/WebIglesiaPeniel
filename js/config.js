/* ==========================================================================
   CONFIG — Todos los datos editables de la página
   --------------------------------------------------------------------------
   Cambiá acá horarios, teléfonos, redes, pastores, videos, valores y pasos:
   NO hace falta tocar index.html para actualizar estos datos.
   ========================================================================== */

const CONFIG = {
  nombre: "Iglesia Peniel Buenos Aires",

  /* ------- Video de fondo del hero -------
     id: código de YouTube. En celulares (pantallas < 769px) se muestra
     foto fija (img/hero.jpg) para que cargue más rápido. */
  videoFondo: {
    id: "o_G2Mm68pP8",
    activoMovil: false
  },

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
    barrio: "Villa Luro · CABA (CP 1407BNP)"
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

  /* ------- Espacios / sedes (tarjetas estilo CityLife) ------- */
  sedes: [
    {
      tipo: "Sede principal",
      nombre: "Templo Peniel",
      direccion: "Av. Lope de Vega 346 · Villa Luro, CABA",
      tiempo: "Domingos 11:00 y 18:30 hs",
      detalle: "Cultos de celebración con alabanza, escuela bíblica y un ambiente en el que te vas a sentir como en casa.",
      acciones: [
        { texto: "Cómo llegar", dataLink: "mapaDireccion", clase: "btn-primary" },
        { texto: "Llamar", dataLink: "telefono", clase: "btn-outline" }
      ]
    },
    {
      tipo: "Espacio de campamentos",
      nombre: "Predio La Quinta",
      direccion: "González Catán, Buenos Aires (a 25 km del templo)",
      tiempo: "Campamentos, retiros y reuniones especiales",
      detalle: "Un predio amplio para retiros y encuentros, compartido también con otras iglesias.",
      acciones: [
        { texto: "Consultar por WhatsApp", dataLink: "whatsapp", clase: "btn-wa" }
      ]
    }
  ],

  /* ------- Valores / ADN de la iglesia ------- */
  valores: [
    { inicial: "VD", texto: "Vivimos para el plan de Dios, no para el nuestro." },
    { inicial: "FA", texto: "Construimos familias y relaciones que edifican." },
    { inicial: "SE", texto: "Preferimos servir con corazón alegre antes que ser servidos." },
    { inicial: "DO", texto: "Somos dadores generosos, felices de sostener la obra." },
    { inicial: "EX", texto: "El promedio no alcanza: creemos en la excelencia en todo." }
  ],

  /* ------- Siguientes pasos (cards verticales) ------- */
  pasos: [
    {
      inicial: "SE",
      titulo: "Serví",
      texto: "Descubrí tus dones y sumate a un equipo de la iglesia.",
      boton: "Sumate a un equipo",
      dataLink: "whatsapp",
      clase: "btn-primary"
    },
    {
      inicial: "EV",
      titulo: "Eventos",
      texto: "Retiros, campamentos, festivales y noches de oración.",
      boton: "Ver eventos",
      dataLink: "facebook",
      clase: "btn-gold"
    },
    {
      inicial: "DA",
      titulo: "Dar",
      texto: "Tu generosidad impulsa la obra de Dios en nuestra ciudad.",
      boton: "Coordinar ofrenda",
      dataLink: "whatsapp",
      clase: "btn-wa"
    }
  ],

  /* ------- Redes sociales ------- */
  redes: {
    facebook: "https://www.facebook.com/penielbuenosaires/",
    instagram: "https://www.instagram.com/jov.peniel",
    youtube: "https://www.youtube.com/c/IglesiaPenielBuenosAires"
  },

  /* ------- Último mensaje (los botones de prédicas apuntan acá) ------- */
  ultimoMensaje: "https://youtu.be/EEcGg8Kd-Ew",

  /* ------- Librería Peniel (sector de la iglesia) ------- */
  libreria: {
    web: "https://libreriapeniel.com/",
    wa: "5491135851009",
    waMensaje: "¡Hola! Vi la Librería Peniel desde la página de la iglesia y quería consultar por un producto."
  },

  /* ------- Pastores -------
     Nota: las fotos son provisorias. Decime qué foto corresponde a cada uno
     y qué descripción poner, y lo cambiamos acá mismo. */
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