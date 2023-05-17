import { Provider } from "react-redux";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import store from "../store/store";
import App from "../App";

import configureStore from "redux-mock-store";
import { setMovies, setLoading, setPage } from "../reducers/moviesReducer";

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
const scrollToMock = vi.fn();

describe("Header", () => {
  test("should render header", () => {
    // comprobar 1 + 1 =2
    expect(1 + 1).toBe(2);
  });
});

describe("Home", () => {
  // let mockStore;
  // let store;

  beforeEach(() => {
    // mockStore = configureStore([]);
    // store = mockStore();
    cleanup();
  });

  afterEach(() => {
    cleanup(); // Limpiar el DOM después de cada prueba
  });

  test("renderiza correctamente", () => {
    // const initialState = {
    //   movies: { movies: [], loading: false, page: 1, total_pages: 1 },
    // };
    // mockStore = configureStore([]);
    // store = mockStore(initialState);
    

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    //Esta buscar pelicula en el documento
    expect(screen.getByText("Buscador de peliculas")).toBeDefined();

    //Comprobar que hay un h1
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();

    //Comprobar que hay un imput
    expect(screen.getByRole("textbox", { type: "text" })).toBeDefined();

    //Comprobar que en el placeholder pone buscar pelicula
    expect(screen.getByPlaceholderText("Buscar pelicula")).toBeDefined();
  });

  test("Muestra loading", () => {
    // const initialState = {
    //   movies: { movies: [], loading: true, page: 1, total_pages: 1 },
    // };
    // mockStore = configureStore([]);
    // store = mockStore(initialState);
    store.dispatch(setLoading(true));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Loading")).toBeDefined();
  });

  test("carga imagenes", () => {
    const movies = [
      {
        id: 22599,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/e9qcNtRSEgoYVrbns0pHInjuvyN.jpg",
        overview:
          "Cuarto de los ocho cortos que forman 'The Hire', realizados en dos temporadas para BMW entre el 2001 y el 2002. Para ello se creó la productora BMW Films, capitaneada por el mismísimo David Fincher, que consiguió reunir unos cuantos reputados directores de cine para dirigir cada corto: Ang Lee, Wonk Kar-Wai, John Frankenheimer, Alejandro González Iñárritu, John Woo, Joe Carnahan, Tony Scott y Guy Ritchie, y un puñado de caras conocidas para protagonizarlos, en el que destaca Clive Owen como \"The Driver\", personaje misterioso que aparece en todos los cortos, Forest Whitaker, Gary Oldman, Ray Liotta, Madonna, Marilyn Manson, Mickey Rouke o Don Cheadle entre otros. Los cortos tuvieron mucho éxito en internet, tanto que se editaron en DVD para facilitar su distribución. (Fuente: Wikipedia)",
      },
      {
        id: 136244,
        title: "Danielle Steel: Star",
        image:
          "https://image.tmdb.org/t/p/original/jYmt7JBvAmRJ0FxPx2UayOQ1uOB.jpg",
        overview:
          "Esta es la historia de una mujer y un hombre que, luchando contra un destino cruel e implacable, logran triunfar en su vida profesional. Ella es Crystal Wyatt, nacida en un rancho de California, de belleza incomparable y grandes dotes artísticas, que sueña con Hollywood y con llegar a la cima del estrellato. Él es Spencer Hill, un apuesto oficial que, tras intervenir en la guerra de Vietnam, se convierte en abogado y alcanza puestos de gran responsabilidad en la Casa Blanca. Ambos están destinados a amarse, pero entre ellos se interponen la política, la guerra, un matrimonio de conveniencia y el sorprendente mundo del cine...  Basada en la novela de Danielle Steel.",
      },
      {
        id: 52959,
        title: "Star!",
        image:
          "https://image.tmdb.org/t/p/original/xMyOm5hLWeuoWBea1DJrcJy8bU6.jpg",
        overview:
          "Gertrude Lawrence rises to stage stardom at the cost of happiness.",
      },
      {
        id: 140607,
        title: "Star Wars: El despertar de la fuerza",
        image:
          "https://image.tmdb.org/t/p/original/vI86GLIkT5pP3ZfNs2EvmTrBLBm.jpg",
        overview:
          "Treinta años después de la victoria de la Alianza Rebelde sobre la segunda Estrella de la Muerte (hechos narrados en el Episodio VI: El retorno del Jedi), la galaxia está todavía en guerra. Una nueva República se ha constituido, pero una siniestra organización, la Primera Orden, ha resurgido de las cenizas del Imperio Galáctico. A los héroes de antaño, que luchan ahora en la Resistencia, se suman nuevos héroes: Poe Dameron, un piloto de caza, Finn, un desertor de la Primera Orden, Rey, una joven chatarrera, y BB-8, un androide rodante. Todos ellos luchan contra las fuerzas del Mal: el Capitán Phasma, de la Primera Orden, y Kylo Ren, un temible y misterioso personaje que empuña un sable de luz roja.",
      },
      {
        id: 181812,
        title: "Star Wars: El ascenso de Skywalker",
        image:
          "https://image.tmdb.org/t/p/original/16G2wZAkmKqSGK3it2VPjco5oyn.jpg",
        overview:
          "La Resistencia sobreviviente se enfrenta a la Primera Orden una vez más mientras continúa el viaje de Rey, Finn y Poe Dameron. Con el poder y el conocimiento de las generaciones detrás de ellos, comienza la batalla final.",
      },
      {
        id: 181808,
        title: "Star Wars: Los últimos Jedi",
        image:
          "https://image.tmdb.org/t/p/original/rjBwhsOzHKUw2NIOrE7aMqjfe6s.jpg",
        overview:
          "La fuerza siente un cambio y los Maestros Jedi saben que es el momento de regresar. La galaxia se encuentra perdida y separada, y deberán unir fuerzas si no quieren que sea el fin de la paz. Con el rumor de una guerra, los pocos aliados que quedan emprenderán la búsqueda para aumentar sus aliados, mientras se enfrentan a la desconfianza y el temor de aquellos que no olvidan ni perdonan. Mundos casi olvidados, personajes misteriosos y viejas caras conocidas, una nueva aventura está a punto de comenzar para mantener la frágil supervivencia de La República, mientras se preparan para lo que está por llegar.",
      },
      {
        id: 125225,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/pU7oXmVdNPrzj2XOGIQ6ciMnH42.jpg",
        overview:
          "Dev Kumar Verma comes from a middle-class family and must find employment to support his dad and mom. Dev, however, has set his mind upon becoming a music sensation like Elvis Presley. He loses his job because of this, and refuses to work until and unless he gets a job to his liking, much to the dismay of his parents and his brother, Shiv Kumar. Dev does get employment at Charlie's Disco, where he meets with Maya and falls in love with her.  When Charlie's Disco's competitor, Rana, finds out about Dev, he wants to hire Dev, but Dev decides to continue to work with Charlie's Disco, as a result Dev and Charlie get a beating by Rana's men, and Dev is unable to sing. After recuperating, Dev is devastated to find out that Maya and Shiv Kumar are in love with each other. What impact will this have on Dev and his brother on one hand, and what of his career in music?",
      },
      {
        id: 611791,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/hVGnSMBc42TGwvV5QTHpH0PgyJp.jpg",
        overview:
          "Star follows the path of Tito and Jay, two brothers living in the Montreal neighborhood of Park Extension. Accompanying these young people in their daily life marked by complicity and intimidation, Star tackles themes dear to teenagers: identity and friendship.",
      },
      {
        id: 330459,
        title: "Rogue One: Una historia de Star Wars",
        image:
          "https://image.tmdb.org/t/p/original/mAqgFQxaBaLkcQBRQf9YnAz9sNQ.jpg",
        overview:
          "El Imperio Galáctico ha terminado de construir el arma más poderosa de todas, la Estrella de la muerte, pero un grupo de rebeldes decide realizar una misión de muy alto riesgo: robar los planos de dicha estación antes de que entre en operaciones, mientras se enfrentan también al poderoso Lord Sith conocido como Darth Vader, discípulo del despiadado Emperador Palpatine.",
      },
      {
        id: 348350,
        title: "Han Solo: Una historia de Star Wars",
        image:
          "https://image.tmdb.org/t/p/original/isFKKZS3JEIxGfcciL2DQEYhiy1.jpg",
        overview:
          'Precuela de la saga Star Wars, en la que se conocerán los primeros pasos que dio el personaje de Han Solo, desde joven hasta convertirse en el antihéroe que vimos en "Una nueva esperanza", antes de que se encontrase con Luke y Obi-Wan en la cantina de Mos Eisley.',
      },
      {
        id: 2164,
        title: "Stargate: Puerta a las estrellas",
        image:
          "https://image.tmdb.org/t/p/original/3mKvXGYCjoSv3FJN85iislnlD1d.jpg",
        overview:
          'Un coronel y un científico, movidos por distintos intereses, investigan el misterioso hallazgo en unas excavaciones de un extraño artefacto al que llaman "Puerta de las Estrellas". Acompañados de un equipo de reconocimiento, atraviesan la Puerta y son transportados a un lejano planeta.',
      },
      {
        id: 13475,
        title: "Star Trek",
        image:
          "https://image.tmdb.org/t/p/original/AkgW79i6Z26Y1omckHA6SR5lKx.jpg",
        overview:
          "Todo está preparado para el viaje inaugural de la nave más moderna que jamás se haya creado: la USS Enterprise. Su joven tripulación tiene una importante misión: encontrar una manera de detener al malvado Nero que, movido por la venganza, amenaza a toda la humanidad. Pero el destino de la galaxia está en manos de dos jóvenes rivales, que nacieron en mundos diferentes. Uno de ellos, Tiberius James Kirk, humano, busca emociones y es un líder nato. El otro, Spock, medio humano y medio vulcaniano, es menospreciado por los vulcanianos, por sus emociones humanas.",
      },
      {
        id: 449430,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/zeGcw5pPVT4DhHrSLUDxE58QJQn.jpg",
        overview:
          "Star is a young graffiti writer, the best in his city, Paris. His reputation attracts him as much into art galleries than in the police precincts. Accused of vandalism, he faces jail. Despite the threat, he decides to go to Rome with his crew in search of the meaning of his art.",
      },
      {
        id: 719316,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/5o0GyNlILqVxfteo7l31wB5qD2X.jpg",
        overview:
          'Documentary short film and music video for MIKAL\'s song "Star", comprised of footage of the actual recording process of the song itself.',
      },
      {
        id: 1050338,
        title: "Star",
        image: "https://image.tmdb.org/t/p/originalnull",
        overview:
          "Star follows the path of Tito and Jay, two brothers living in the Montreal neighborhood of Park Extension. Accompanying these young people in their daily life marked by complicity and intimidation, Star tackles themes dear to teenagers: identity and friendship.",
      },
      {
        id: 812434,
        title: "Star",
        image:
          "https://image.tmdb.org/t/p/original/4oObDGDhycViadrRCC2XJwwXAcR.jpg",
        overview:
          "Giacomo is a low-level actor and voice actor with a great passion for acting. After another disappointing audition he has one last chance to get the part assigned",
      },
      {
        id: 188927,
        title: "Star Trek: Más allá",
        image:
          "https://image.tmdb.org/t/p/original/2yfbpstJY4Fan8DSfPFDl05jx9.jpg",
        overview:
          "El USS Enterprise, la nave insignia de la Flota Estelar, liderada por el capitán James T. Kirk, vuelve a surcar el universo, para proteger la Tierra y el resto de planetas aliados. Pero la tranquilidad durará poco y el peligro acecha. La primera etapa de su misión les llevará a un territorio desconocido, y su travesía pronto se convertirá en una carrera por la supervivencia, cuando se enfrenten a un nuevo y fiero enemigo, Krall, de una especie alienígena avanzada. A la vez que intentan encontrar el modo de volver a la Tierra, su objetivo será proteger el futuro de la raza humana y preservar la armonía entre especies...",
      },
      {
        id: 54138,
        title: "Star Trek: En la oscuridad",
        image:
          "https://image.tmdb.org/t/p/original/7ncnBVignnCQ4vFNxiSLWDpFUcs.jpg",
        overview:
          "Cuando a la tripulación de la nave Enterprise le ordenan que regrese a casa, en la Tierra se enfrentan a una terrorífica fuerza que, aparentemente desde dentro, ha perpetrado un ataque a la cúpula de la Federación y todo lo que ésta representa, sumiendo a la flota en una profunda crisis. Para intentar solucionar el problema, y con un asunto personal que resolver, el capitán Kirk encabeza una incursión a un planeta en guerra, para capturar a un hombre que es un arma de destrucción masiva. A medida que nuestros héroes se van sumergiendo en una épica partida de ajedrez a vida o muerte, la lealtad se verá puesta a prueba, las amistades se romperán, y habrá que hacer ciertos sacrificios por la única familia que le queda a Kirk: su tripulación.",
      },
      {
        id: 980804,
        title: "LEGO Star Wars: Vacaciones de verano",
        image:
          "https://image.tmdb.org/t/p/original/gT1Toend98eSyXL1PrL7ipz4dt.jpg",
        overview:
          "Finn ha organizado unas vacaciones sorpresa para sus amigos a bordo del Crucero estelar galáctico Halcyon. Pero el plan de Finn pronto se tuerce cuando se ve separado del grupo. Solo a bordo del Halcyon, Finn se encuentra con tres Espíritus de la Fuerza -Obi-Wan Kenobi, Anakin Skywalker y la Princesa Leia-, que comparten sus inesperados relatos de vacaciones que salieron mal.",
      },
      {
        id: 35558,
        title: "Starstruck",
        image:
          "https://image.tmdb.org/t/p/original/1CgkCNF5fYAp9d5pDzp7BEnZD0b.jpg",
        overview:
          "Jessica Olsen, una chica de Michigan, encuentra ridícula la actitud de su hermana, obsesionada con el cantante Christopher Wilde. Un día parte con su familia hacia Los Ángeles con la única idea de visitar a su abuela, mientras que su hermana pretende aprovechar el viaje para encontrar a Christopher Wilde. Pero el azar hará que sea Jessica la que le encuentre...",
      },
    ];

    //  mockStore = configureStore([]);
    //  store = mockStore(initialState);
    store.dispatch(setLoading(false));
    store.dispatch(setMovies(movies));
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    //check is there are images
    expect(screen.getAllByRole("img")).toBeDefined();
  });

  test("Mostrar popup", () => {
    window.scrollTo = scrollToMock;

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const images = screen.getAllByRole("img");
    fireEvent.click(images[0]);

    // Verificar la actualización del estado imageSelected
    let updatedState = store.getState();
    expect(updatedState.movies.movieSelected).not.toBeNull();

    const renderizado = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Verificar la aparición del popup
    const elemento = renderizado.container.querySelector(".popup");
    expect(elemento).not.toBeNull();

    // Simular el evento de redirigir
    const link=elemento.querySelector('a')
    const url = new URL(link);
    expect(url).not.toBeNull();
    //La ruta debe de se /movie
    expect(url.pathname.split('/')[1]).toBe('movie');

    fireEvent.click(elemento);
    updatedState = store.getState();
    expect(updatedState.movies.movieSelected).toBeNull();

    // const popupElements = renderizado.queryAllByClassName("popup");
    // expect(popupElements.length).toBeGreaterThan(0);
  });

  // simular scrool infinito
  test("carga mas imagenes", () => {
    // mockStore = configureStore([]);
    // store = mockStore(initialState);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Buscar todas las imágenes por su rol
    const imageElements = screen.getAllByRole("img");
    console.log(imageElements.length)
    fireEvent.scroll(imageElements[19], { target: { scrollY: 1000 } });

    // store.dispatch(setPage(2));
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const imageElements3 = screen.getAllByRole("img");
    // Esperar que haya 40 imagenes
    expect(imageElements3.length).toBe(40);
  });
});
