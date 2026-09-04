"use client";

import { useEffect, useMemo, useState } from "react";

type Materia = { nombre: string; color: string; progreso: string };
type Tarea = {
  titulo: string;
  materia: string;
  fecha: string;
  prioridad: string;
};
type Nota = {
  titulo: string;
  contenido: string;
  materia: string;
  favorita?: boolean;
  actualizada?: string;
};
type Adjunto = {
  id: string;
  nombre: string;
  tipo: string;
  tamano: string;
  datos: string;
};
type MensajeAgente = { rol: "usuario" | "agente"; texto: string };
type Preferencias = {
  tema: "claro" | "noche";
  tamanoTexto: "normal" | "grande";
  metaDiaria: number;
  confirmarRestablecer: boolean;
};

const materiasIniciales: Materia[] = [
  { nombre: "Redes", color: "azul", progreso: "35%" },
  { nombre: "Organización y administración", color: "verde", progreso: "48%" },
  {
    nombre: "Programación de dispositivos móviles",
    color: "coral",
    progreso: "62%",
  },
  { nombre: "Métodos numéricos", color: "azul", progreso: "28%" },
  { nombre: "Humanidades 2", color: "verde", progreso: "76%" },
  {
    nombre: "Formulación de proyectos de ingeniería",
    color: "coral",
    progreso: "54%",
  },
];
const tareasIniciales: Tarea[] = [
  {
    titulo: "Dibujar el recorrido de un paquete TCP",
    materia: "Redes",
    fecha: "2 de septiembre",
    prioridad: "Alta",
  },
  {
    titulo: "Comparar liderazgo y gestión",
    materia: "Organización y administración",
    fecha: "3 de septiembre",
    prioridad: "Media",
  },
  {
    titulo: "Construir la pantalla de navegación",
    materia: "Programación de dispositivos móviles",
    fecha: "5 de septiembre",
    prioridad: "Media",
  },
];
const notasIniciales: Nota[] = [
  {
    titulo: "Mapa de una conexión TCP",
    contenido:
      "Aplicación → transporte → red → enlace. TCP confirma, ordena y retransmite segmentos; IP decide cómo llegar, pero no garantiza la entrega.",
    materia: "Redes",
  },
  {
    titulo: "Preguntas para comprobar",
    contenido:
      "¿Qué diferencia hay entre TCP y UDP? ¿Qué ocurre si se pierde un paquete? Explica DNS sin memorizar la definición.",
    materia: "Redes",
  },
  {
    titulo: "Organización que aprende",
    contenido:
      "Una organización mejora cuando convierte la experiencia en decisiones compartidas. Relaciona estructura, cultura, comunicación y control.",
    materia: "Organización y administración",
  },
  {
    titulo: "Caso para analizar",
    contenido:
      "Compara una estructura funcional y una estructura por proyectos: velocidad, especialización, coordinación y riesgo de silos.",
    materia: "Organización y administración",
  },
  {
    titulo: "Arquitectura de una app móvil",
    contenido:
      "Separa interfaz, estado y datos. Antes de programar, dibuja el flujo de pantallas, los estados vacíos y los errores de red.",
    materia: "Programación de dispositivos móviles",
  },
  {
    titulo: "Checklist de experiencia móvil",
    contenido:
      "Contraste, tamaños táctiles, carga progresiva, orientación, permisos y mensajes de error. Prueba primero con una tarea real.",
    materia: "Programación de dispositivos móviles",
  },
  {
    titulo: "Error y aproximación",
    contenido:
      "Error absoluto = |valor real - aproximación|. Error relativo = error absoluto / |valor real|. Usa ambos para decidir si un resultado sirve.",
    materia: "Métodos numéricos",
  },
  {
    titulo: "Método de Newton",
    contenido:
      "x siguiente = x - f(x) / f'(x). Comprueba la derivada, el punto inicial y el criterio de parada antes de confiar en la convergencia.",
    materia: "Métodos numéricos",
  },
  {
    titulo: "Mirar críticamente",
    contenido:
      "Analizar una obra o un argumento implica describir, contextualizar, interpretar y justificar. Separa lo que observas de lo que supones.",
    materia: "Humanidades 2",
  },
  {
    titulo: "Diario de preguntas",
    contenido:
      "¿Quién habla? ¿Desde qué contexto? ¿Qué voces quedan fuera? Una buena pregunta transforma una lectura pasiva en una investigación.",
    materia: "Humanidades 2",
  },
  {
    titulo: "Problema y evidencia",
    contenido:
      "Formula el problema con una población y un contexto concretos. Después reúne evidencia, restricciones y una primera hipótesis de solución.",
    materia: "Formulación de proyectos de ingeniería",
  },
  {
    titulo: "Ficha de proyecto",
    contenido:
      "Objetivo, entregables, interesados, riesgos, recursos y criterio de éxito. Si no puedes medir el avance, todavía falta precisión.",
    materia: "Formulación de proyectos de ingeniería",
  },
];
const claveAlmacenamiento = "vertice-estudio-v2";
type DatosGuardados = {
  tareas: Tarea[];
  materias: Materia[];
  notas: Nota[];
  adjuntos: Record<string, Adjunto[]>;
  completadas: string[];
  enCurso: string[];
  preferencias?: Preferencias;
};

export default function Home() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [materias, setMaterias] = useState(materiasIniciales);
  const [notas, setNotas] = useState(notasIniciales);
  const [adjuntos, setAdjuntos] = useState<Record<string, Adjunto[]>>({});
  const [completadas, setCompletadas] = useState<string[]>([]);
  const [enCurso, setEnCurso] = useState<string[]>([tareasIniciales[0].titulo]);
  const [modal, setModal] = useState<
    "tarea" | "materia" | "editor" | "programacion" | null
  >(null);
  const [notaAbierta, setNotaAbierta] = useState<Nota | null>(null);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [vista, setVista] = useState("Inicio");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(
    materiasIniciales[0].nombre,
  );
  const [fechaSeleccionada, setFechaSeleccionada] = useState("2 de septiembre");
  const [almacenamientoListo, setAlmacenamientoListo] = useState(false);
  const [animacionesActivas, setAnimacionesActivas] = useState(true);
  const [modoCompacto, setModoCompacto] = useState(false);
  const [recordatoriosActivos, setRecordatoriosActivos] = useState(true);
  const [preferencias, setPreferencias] = useState<Preferencias>({
    tema: "claro",
    tamanoTexto: "normal",
    metaDiaria: 45,
    confirmarRestablecer: true,
  });
  const [filtroNotas, setFiltroNotas] = useState("");
  const [soloFavoritas, setSoloFavoritas] = useState(false);
  const [ordenNotas, setOrdenNotas] = useState("recientes");
  const [agenteAbierto, setAgenteAbierto] = useState(true);
  const [consultaAgente, setConsultaAgente] = useState("");
  const [mensajesAgente, setMensajesAgente] = useState<MensajeAgente[]>([]);

  // La carga inicial sincroniza React con el almacenamiento persistente del navegador.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const guardado = window.localStorage.getItem(claveAlmacenamiento);
    if (guardado) {
      try {
        const datos = JSON.parse(guardado) as Partial<DatosGuardados>;
        if (Array.isArray(datos.tareas)) setTareas(datos.tareas);
        if (Array.isArray(datos.materias)) setMaterias(datos.materias);
        if (Array.isArray(datos.notas)) setNotas(datos.notas);
        if (datos.adjuntos && typeof datos.adjuntos === "object")
          setAdjuntos(datos.adjuntos);
        if (Array.isArray(datos.completadas)) setCompletadas(datos.completadas);
        if (Array.isArray(datos.enCurso)) setEnCurso(datos.enCurso);
        if (datos.preferencias)
          setPreferencias((actuales) => ({
            ...actuales,
            ...datos.preferencias,
          }));
      } catch {
        window.localStorage.removeItem(claveAlmacenamiento);
      }
    }
    setAlmacenamientoListo(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!almacenamientoListo) return;
    const datos: DatosGuardados = {
      tareas,
      materias,
      notas,
      adjuntos,
      completadas,
      enCurso,
      preferencias,
    };
    window.localStorage.setItem(claveAlmacenamiento, JSON.stringify(datos));
  }, [
    almacenamientoListo,
    tareas,
    materias,
    notas,
    adjuntos,
    completadas,
    enCurso,
    preferencias,
  ]);

  const cuadernosVisibles = useMemo(
    () =>
      materias.filter((materia) => {
        const contenido = notas
          .filter((nota) => nota.materia === materia.nombre)
          .map((nota) => `${nota.titulo} ${nota.contenido}`)
          .join(" ");
        return `${materia.nombre} ${contenido}`
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      }),
    [busqueda, materias, notas],
  );

  function cambiarVista(nombre: string) {
    setVista(nombre);
    setBusqueda("");
  }

  const notasDelCuaderno = useMemo(
    () =>
      notas
        .filter(
          (nota) =>
            materiaSeleccionada === "Todas las materias" ||
            nota.materia === materiaSeleccionada,
        )
        .filter((nota) => !soloFavoritas || nota.favorita)
        .filter((nota) =>
          `${nota.titulo} ${nota.contenido}`
            .toLowerCase()
            .includes(filtroNotas.toLowerCase()),
        )
        .sort((a, b) =>
          ordenNotas === "alfabeticas"
            ? a.titulo.localeCompare(b.titulo)
            : Number(Boolean(b.actualizada)) - Number(Boolean(a.actualizada)),
        ),
    [filtroNotas, materiaSeleccionada, notas, ordenNotas, soloFavoritas],
  );

  function alternarFavorita(nota: Nota) {
    setNotas((actuales) =>
      actuales.map((actual) =>
        actual.titulo === nota.titulo && actual.materia === nota.materia
          ? { ...actual, favorita: !actual.favorita }
          : actual,
      ),
    );
  }

  function responderAgente(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const pregunta = consultaAgente.trim();
    if (!pregunta) return;
    const contexto = notas.filter(
      (nota) => nota.materia === materiaSeleccionada,
    );
    const palabras = pregunta
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (palabra) =>
          palabra.length > 2 &&
          ![
            "que",
            "qué",
            "como",
            "cómo",
            "hay",
            "mis",
            "las",
            "los",
            "una",
            "este",
            "esta",
            "sobre",
          ].includes(palabra),
      );
    const relacionadas = contexto
      .map((nota) => ({
        nota,
        puntos: palabras.reduce(
          (total, palabra) =>
            total +
            (`${nota.titulo} ${nota.contenido}`.toLowerCase().includes(palabra)
              ? 1
              : 0),
          0,
        ),
      }))
      .sort((a, b) => b.puntos - a.puntos)
      .filter((item) => item.puntos > 0)
      .slice(0, 3)
      .map((item) => item.nota);
    const esResumen =
      /resume|resumen|cuaderno|aquí|aqui|todo|contenido|apuntes|notas/.test(
        pregunta.toLowerCase(),
      );
    const respuesta =
      relacionadas.length > 0
        ? `En “${materiaSeleccionada}” encontré ${relacionadas.length} ${relacionadas.length === 1 ? "nota relacionada" : "notas relacionadas"}: ${relacionadas.map((nota) => `“${nota.titulo}”`).join(", ")}. ${relacionadas.map((nota) => nota.contenido).join(" ")}`
        : esResumen && contexto.length > 0
          ? `Este cuaderno reúne ${contexto.length} ${contexto.length === 1 ? "nota" : "notas"}: ${contexto.map((nota) => `“${nota.titulo}”`).join(", ")}. En conjunto, hablan de ${contexto.map((nota) => nota.contenido).join(" ")}`
          : contexto.length > 0
            ? `No encontré una coincidencia exacta, pero puedo ayudarte con cualquier nota de “${materiaSeleccionada}”. Aquí están sus páginas: ${contexto.map((nota) => `“${nota.titulo}”`).join(", ")}.`
            : `Este cuaderno todavía no tiene notas. Crea una página y volveré a consultarla contigo.`;
    setMensajesAgente((actuales) => [
      ...actuales,
      { rol: "usuario", texto: pregunta },
      { rol: "agente", texto: respuesta },
    ]);
    setConsultaAgente("");
  }

  function crearTarea(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    setTareas((actuales) => [
      ...actuales,
      {
        titulo: String(datos.get("titulo")),
        materia: String(datos.get("materia")),
        fecha: "Hoy",
        prioridad: String(datos.get("prioridad")),
      },
    ]);
    setModal(null);
  }

  function abrirProgramacion(dia: number) {
    setFechaSeleccionada(`${dia} de septiembre`);
    setModal("programacion");
  }

  function programarTarea(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const datos = new FormData(formulario);
    setTareas((actuales) => [
      ...actuales,
      {
        titulo: String(datos.get("titulo")),
        materia: String(datos.get("materia")),
        fecha: fechaSeleccionada,
        prioridad: String(datos.get("prioridad")),
      },
    ]);
    formulario.reset();
    const titulo = formulario.elements.namedItem("titulo");
    if (titulo instanceof HTMLInputElement) titulo.value = "";
  }

  function crearMateria(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const nombre = String(new FormData(evento.currentTarget).get("nombre"));
    setMaterias((actuales) => [
      ...actuales,
      { nombre, color: "verde", progreso: "0%" },
    ]);
    setModal(null);
  }

  function guardarNota(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    const nota = {
      titulo: String(datos.get("titulo")),
      contenido: String(datos.get("contenido")),
      materia: materiaSeleccionada,
      favorita: notaAbierta?.favorita,
      actualizada: new Date().toISOString(),
    };
    setNotas((actuales) =>
      notaAbierta
        ? actuales.map((actual) =>
            actual.titulo === notaAbierta.titulo &&
            actual.materia === notaAbierta.materia
              ? nota
              : actual,
          )
        : [nota, ...actuales],
    );
    setNotaAbierta(nota);
    setModal(null);
  }

  function abrirMateria(nombre: string) {
    setMateriaSeleccionada(nombre);
    setVista("Mis notas");
    setMensajesAgente([]);
  }

  function cargarAdjuntos(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivos = Array.from(evento.target.files ?? []);
    if (!archivos.length) return;
    archivos.forEach((archivo) => {
      if (archivo.size > 5 * 1024 * 1024) return;
      const lector = new FileReader();
      lector.onload = () => {
        const nuevo: Adjunto = {
          id: `${archivo.name}-${archivo.lastModified}-${crypto.randomUUID()}`,
          nombre: archivo.name,
          tipo: archivo.type || "Archivo",
          tamano: `${Math.max(1, Math.round(archivo.size / 1024))} KB`,
          datos: String(lector.result ?? ""),
        };
        setAdjuntos((actuales) => ({
          ...actuales,
          [materiaSeleccionada]: [
            ...(actuales[materiaSeleccionada] ?? []),
            nuevo,
          ],
        }));
      };
      lector.readAsDataURL(archivo);
    });
    evento.target.value = "";
  }

  function eliminarAdjunto(id: string) {
    setAdjuntos((actuales) => ({
      ...actuales,
      [materiaSeleccionada]: (actuales[materiaSeleccionada] ?? []).filter(
        (adjunto) => adjunto.id !== id,
      ),
    }));
  }

  function restablecerEspacio() {
    if (
      preferencias.confirmarRestablecer &&
      !window.confirm(
        "Se eliminarán tus cuadernos, notas y tareas guardadas. ¿Continuar?",
      )
    )
      return;
    window.localStorage.removeItem(claveAlmacenamiento);
    setTareas(tareasIniciales);
    setMaterias(materiasIniciales);
    setNotas(notasIniciales);
    setAdjuntos({});
    setCompletadas([]);
    setEnCurso([tareasIniciales[0].titulo]);
    setPreferencias({
      tema: "claro",
      tamanoTexto: "normal",
      metaDiaria: 45,
      confirmarRestablecer: true,
    });
    setMensajesAgente([]);
    setMateriaSeleccionada(materiasIniciales[0].nombre);
    setVista("Inicio");
  }

  return (
    <main
      className={`app-shell ${animacionesActivas ? "" : "no-motion"} ${modoCompacto ? "compact-mode" : ""} tema-${preferencias.tema} texto-${preferencias.tamanoTexto}`}
    >
      {vista === "Mis notas" && (
        <aside
          className={`agent-dock ${agenteAbierto ? "open" : ""}`}
          aria-label="Agente del cuaderno"
        >
          <button
            className="agent-dock-toggle"
            onClick={() => setAgenteAbierto(!agenteAbierto)}
          >
            <span>✦</span>
            <strong>Agente del cuaderno</strong>
            <small>{agenteAbierto ? "Ocultar" : "Consultar notas"}</small>
          </button>
          {agenteAbierto && (
            <div className="agent-dock-body">
              <p className="agent-context">
                Consulta local · {materiaSeleccionada} ·{" "}
                {notasDelCuaderno.length} páginas visibles
              </p>
              <div className="notes-tools">
                <input
                  aria-label="Filtrar páginas"
                  value={filtroNotas}
                  onChange={(evento) => setFiltroNotas(evento.target.value)}
                  placeholder="Filtrar páginas..."
                />
                <select
                  aria-label="Ordenar páginas"
                  value={ordenNotas}
                  onChange={(evento) => setOrdenNotas(evento.target.value)}
                >
                  <option value="recientes">Más recientes</option>
                  <option value="alfabeticas">Alfabéticamente</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSoloFavoritas(!soloFavoritas)}
                  className={soloFavoritas ? "selected" : ""}
                >
                  ★ Favoritas
                </button>
                {notasDelCuaderno[0] && (
                  <button
                    type="button"
                    onClick={() => alternarFavorita(notasDelCuaderno[0])}
                  >
                    {notasDelCuaderno[0].favorita
                      ? "★ Quitar favorita"
                      : "☆ Marcar primera favorita"}
                  </button>
                )}
              </div>
              <div className="agent-messages">
                <div className="agent-message agent">
                  <strong>Vértice</strong>
                  <span>
                    Pregúntame por las ideas, conceptos o diferencias que
                    aparecen en tus notas.
                  </span>
                </div>
                {mensajesAgente.map((mensaje, indice) => (
                  <div
                    className={`agent-message ${mensaje.rol}`}
                    key={`${mensaje.texto}-${indice}`}
                  >
                    {mensaje.rol === "agente" && <strong>Vértice</strong>}
                    <span>{mensaje.texto}</span>
                  </div>
                ))}
              </div>
              <form className="agent-form" onSubmit={responderAgente}>
                <input
                  aria-label="Consulta al agente del cuaderno"
                  value={consultaAgente}
                  onChange={(evento) => setConsultaAgente(evento.target.value)}
                  placeholder="¿Qué dicen mis notas sobre...?"
                />
                <button aria-label="Enviar consulta" type="submit">
                  →
                </button>
              </form>
              <div className="agent-prompts">
                <button
                  type="button"
                  onClick={() =>
                    setConsultaAgente("¿Qué conceptos debo repasar?")
                  }
                >
                  Conceptos clave
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConsultaAgente("¿Qué diferencia hay entre estos temas?")
                  }
                >
                  Comparar
                </button>
              </div>
            </div>
          )}
        </aside>
      )}
      {vista === "Ajustes" && (
        <section
          className="settings-quick-panel"
          aria-label="Preferencias rápidas"
        >
          <div>
            <span className="settings-kicker">PERSONALIZACIÓN</span>
            <strong>Haz tu espacio más tuyo</strong>
          </div>
          <label>
            Tema
            <select
              value={preferencias.tema}
              onChange={(evento) =>
                setPreferencias({
                  ...preferencias,
                  tema: evento.target.value as Preferencias["tema"],
                })
              }
            >
              <option value="claro">Claro</option>
              <option value="noche">Noche</option>
            </select>
          </label>
          <label>
            Tamaño del texto
            <select
              value={preferencias.tamanoTexto}
              onChange={(evento) =>
                setPreferencias({
                  ...preferencias,
                  tamanoTexto: evento.target
                    .value as Preferencias["tamanoTexto"],
                })
              }
            >
              <option value="normal">Normal</option>
              <option value="grande">Grande</option>
            </select>
          </label>
          <label>
            Meta diaria <output>{preferencias.metaDiaria} min</output>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={preferencias.metaDiaria}
              onChange={(evento) =>
                setPreferencias({
                  ...preferencias,
                  metaDiaria: Number(evento.target.value),
                })
              }
            />
          </label>
          <label className="setting-row quick-check">
            <span>
              <strong>Confirmar al borrar</strong>
              <small>Evita eliminar el espacio por accidente.</small>
            </span>
            <input
              type="checkbox"
              checked={preferencias.confirmarRestablecer}
              onChange={(evento) =>
                setPreferencias({
                  ...preferencias,
                  confirmarRestablecer: evento.target.checked,
                })
              }
            />
          </label>
        </section>
      )}
      <h2 className="sr-only">Mis notas</h2>
      <aside className="sidebar">
        <button className="brand" onClick={() => cambiarVista("Inicio")}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="brand-name">Vértice</span>
        </button>
        <div className="workspace-label">
          MI ESPACIO <span>⌄</span>
        </div>
        <nav className="main-nav" aria-label="Navegación principal">
          {["Inicio", "Mis notas", "Calendario", "Gráficos"].map((item) => (
            <button
              className={`nav-item ${vista === item ? "active" : ""}`}
              key={item}
              onClick={() => cambiarVista(item)}
            >
              <span className="nav-icon">
                {item === "Inicio"
                  ? "⌂"
                  : item === "Mis notas"
                    ? "▤"
                    : item === "Calendario"
                      ? "▦"
                      : "▥"}
              </span>
              <span>{item}</span>
            </button>
          ))}
        </nav>
        <div className="workspace-label subjects-label">
          MATERIAS{" "}
          <button
            aria-label="Añadir materia"
            onClick={() => setModal("materia")}
          >
            +
          </button>
        </div>
        {!busquedaAbierta && (
          <nav className="subject-nav" aria-label="Materias">
            {materias.map((materia) => (
              <button
                key={materia.nombre}
                onClick={() => abrirMateria(materia.nombre)}
              >
                <i className={`dot ${materia.color}`} />
                {materia.nombre}
              </button>
            ))}
          </nav>
        )}
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${vista === "Ajustes" ? "active" : ""}`}
            onClick={() => cambiarVista("Ajustes")}
          >
            <span className="nav-icon">⚙</span>
            <span>Ajustes</span>
          </button>
          <div className="profile">
            <span>AG</span>
            <span>
              <strong>Andrea García</strong>
              <small>Espacio local</small>
            </span>
          </div>
        </div>
      </aside>
      <section
        className={`content view-${vista.toLowerCase().replaceAll(" ", "-")}`}
      >
        <header className="topbar">
          <div className="breadcrumb">
            Mi espacio <span>/</span> <strong>{vista}</strong>
          </div>
          <button
            className="search"
            aria-label="Buscar"
            onClick={() => setBusquedaAbierta(!busquedaAbierta)}
          >
            ⌕ <span>Buscar en Vértice</span>
            <kbd>⌘ K</kbd>
          </button>
        </header>
        {busquedaAbierta && (
          <div className="search-panel">
            <label htmlFor="busqueda">Buscar en tu espacio</label>
            <input
              id="busqueda"
              autoFocus
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Escribe una tarea o materia..."
            />
            <button
              onClick={() => {
                setBusqueda("");
                setBusquedaAbierta(false);
              }}
            >
              Cerrar
            </button>
          </div>
        )}

        {vista === "Inicio" && (
          <section className="notebooks-dashboard">
            <div className="notebooks-heading">
              <div>
                <p className="eyebrow">MI ESPACIO DE ESTUDIO</p>
                <h1>Tus cuadernos</h1>
                <p className="heading-note">
                  Seis materias, una biblioteca clara y subnotas para avanzar.
                </p>
              </div>
              <button
                className="primary-action"
                onClick={() => setModal("materia")}
              >
                + Nuevo cuaderno
              </button>
            </div>
            <div className="notebooks-toolbar">
              <div>
                <h2>Mis cuadernos</h2>
                <p>
                  {materias.length} materias · {notas.length} subnotas de
                  estudio.
                </p>
              </div>
              <button
                className="text-action"
                onClick={() => cambiarVista("Mis notas")}
              >
                Ver biblioteca <span>→</span>
              </button>
            </div>
            <div className="notebooks-grid">
              {cuadernosVisibles.map((materia, indice) => {
                const subnotas = notas.filter(
                  (nota) => nota.materia === materia.nombre,
                );
                const notaPrincipal = subnotas[0];
                return (
                  <button
                    aria-label={`${materia.nombre} ${notaPrincipal?.titulo ?? "Cuaderno vacío"}`}
                    className={`notebook-card notebook-${indice % 3}`}
                    key={materia.nombre}
                    onClick={() => abrirMateria(materia.nombre)}
                  >
                    <span className="notebook-topline">
                      <span className="notebook-icon">▤</span>
                      <span className="card-arrow">→</span>
                    </span>
                    <span className="notebook-copy">
                      <span className="notebook-subject">
                        CUADERNO · {subnotas.length} SUBNOTAS
                      </span>
                      <h3>{materia.nombre}</h3>
                      <p>
                        {notaPrincipal?.contenido ??
                          "Todavía no hay subnotas. Crea la primera página de estudio."}
                      </p>
                    </span>
                    <span className="notebook-meta">
                      <span>
                        {subnotas.length}{" "}
                        {subnotas.length === 1 ? "subnota" : "subnotas"}
                      </span>
                      <span>{materia.progreso} explorado</span>
                    </span>
                    <span className="progress">
                      <i
                        className={materia.color}
                        style={{ width: materia.progreso }}
                      />
                    </span>
                    <span className="notebook-open-label">
                      Abrir cuaderno →
                    </span>
                  </button>
                );
              })}
              {!busqueda && (
                <button
                  className="notebook-card new-notebook"
                  onClick={() => setModal("materia")}
                >
                  <span className="new-notebook-plus">+</span>
                  <strong>Crear cuaderno</strong>
                  <small>Añade una materia con sus propias subnotas.</small>
                </button>
              )}
            </div>
          </section>
        )}

        {vista === "Ajustes" && (
          <section className="settings-view">
            <div className="settings-heading">
              <p className="eyebrow">PREFERENCIAS</p>
              <h1>Ajustes de estudio</h1>
              <p className="heading-note">
                Adapta Vértice a tu forma de concentrarte. Los cambios se
                aplican al instante.
              </p>
            </div>
            <div className="settings-layout">
              <section className="settings-panel">
                <div className="settings-section">
                  <span className="settings-kicker">EXPERIENCIA</span>
                  <label className="setting-row">
                    <span>
                      <strong>Animaciones suaves</strong>
                      <small>
                        Conserva las transiciones que orientan el recorrido.
                      </small>
                    </span>
                    <input
                      type="checkbox"
                      checked={animacionesActivas}
                      onChange={(evento) =>
                        setAnimacionesActivas(evento.target.checked)
                      }
                    />
                  </label>
                  <label className="setting-row">
                    <span>
                      <strong>Modo compacto</strong>
                      <small>
                        Reduce espacios para ver más contenido de estudio.
                      </small>
                    </span>
                    <input
                      type="checkbox"
                      checked={modoCompacto}
                      onChange={(evento) =>
                        setModoCompacto(evento.target.checked)
                      }
                    />
                  </label>
                  <label className="setting-row">
                    <span>
                      <strong>Recordatorios de sesión</strong>
                      <small>
                        Mantén visibles las señales de planificación.
                      </small>
                    </span>
                    <input
                      type="checkbox"
                      checked={recordatoriosActivos}
                      onChange={(evento) =>
                        setRecordatoriosActivos(evento.target.checked)
                      }
                    />
                  </label>
                </div>
                <div className="settings-section">
                  <span className="settings-kicker">DATOS</span>
                  <div className="storage-status">
                    <span className="storage-dot" />
                    <div>
                      <strong>Espacio guardado en este dispositivo</strong>
                      <small>
                        Tus cuadernos, subnotas y tareas se conservan en
                        localStorage.
                      </small>
                    </div>
                  </div>
                  <button
                    className="danger-action"
                    onClick={restablecerEspacio}
                  >
                    Restablecer espacio de estudio
                  </button>
                </div>
              </section>
              <aside className="settings-tip">
                <span className="notebook-icon">✦</span>
                <h2>Una recomendación</h2>
                <p>
                  Estudia en bloques pequeños: abre un cuaderno, elige una
                  subnota y termina con una pregunta que puedas responder
                  mañana.
                </p>
                <button
                  className="text-action"
                  onClick={() => abrirMateria(materias[0]?.nombre ?? "Redes")}
                >
                  Abrir primer cuaderno →
                </button>
              </aside>
            </div>
          </section>
        )}

        {vista === "Mis notas" && (
          <section className="notes-view">
            <div className="notes-view-heading">
              <div>
                <p className="eyebrow">BIBLIOTECA DE CONOCIMIENTO</p>
                <h1>{materiaSeleccionada}</h1>
                <p className="heading-note">
                  {
                    notas.filter(
                      (nota) =>
                        materiaSeleccionada === "Todas las materias" ||
                        nota.materia === materiaSeleccionada,
                    ).length
                  }{" "}
                  páginas reales para estudiar y ampliar.
                </p>
              </div>
              <div className="notes-heading-actions">
                <label className="upload-action">
                  <span>↑</span> Subir archivo o foto
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    multiple
                    onChange={cargarAdjuntos}
                  />
                </label>
                <button
                  className="primary-action"
                  onClick={() => {
                    setNotaAbierta(null);
                    setModal("editor");
                  }}
                >
                  + Nueva página
                </button>
              </div>
            </div>
            <div className="notes-toolbar">
              <div className="notes-breadcrumb">
                Mis notas <span>/</span> {materiaSeleccionada}
              </div>
              <button
                onClick={() => setMateriaSeleccionada("Todas las materias")}
              >
                Ver todas las notas
              </button>
            </div>
            <div className="notes-grid">
              {notas
                .filter(
                  (nota) =>
                    materiaSeleccionada === "Todas las materias" ||
                    nota.materia === materiaSeleccionada,
                )
                .map((nota, indice) => (
                  <button
                    className={`note-card ${indice === 0 ? "featured" : ""}`}
                    key={`${nota.titulo}-${indice}`}
                    onClick={() => {
                      setNotaAbierta(nota);
                      setModal("editor");
                    }}
                  >
                    <span className="note-type">PÁGINA {indice + 1}</span>
                    <h2>{nota.titulo}</h2>
                    <p>{nota.contenido}</p>
                    <small>Materia: {nota.materia}</small>
                    <span className="note-arrow">→</span>
                  </button>
                ))}
            </div>
            <section className="attachments-panel">
              <div className="attachments-heading">
                <div>
                  <span className="eyebrow">MATERIAL DE APOYO</span>
                  <h2>Archivos y fotos del cuaderno</h2>
                  <p>
                    Guarda lecturas, capturas, diagramas o entregas junto a tus
                    apuntes.
                  </p>
                </div>
                <span className="attachment-count">
                  {(adjuntos[materiaSeleccionada] ?? []).length}
                </span>
              </div>
              {(adjuntos[materiaSeleccionada] ?? []).length > 0 ? (
                <div className="attachments-grid">
                  {adjuntos[materiaSeleccionada].map((adjunto) => (
                    <article className="attachment-card" key={adjunto.id}>
                      {adjunto.tipo.startsWith("image/") ? (
                        <img src={adjunto.datos} alt="" />
                      ) : (
                        <span className="file-icon">PDF</span>
                      )}
                      <div>
                        <strong title={adjunto.nombre}>{adjunto.nombre}</strong>
                        <small>
                          {adjunto.tipo} · {adjunto.tamano}
                        </small>
                      </div>
                      <button
                        aria-label={`Eliminar ${adjunto.nombre}`}
                        onClick={() => eliminarAdjunto(adjunto.id)}
                      >
                        ×
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <label className="attachments-empty">
                  <span>＋</span>
                  <strong>Aún no hay material de apoyo</strong>
                  <small>
                    Sube una foto de la pizarra o un PDF para estudiarlo desde
                    aquí.
                  </small>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    multiple
                    onChange={cargarAdjuntos}
                  />
                </label>
              )}
            </section>
          </section>
        )}
        {vista === "Calendario" && (
          <section className="calendar-view">
            <div className="notes-view-heading">
              <div>
                <p className="eyebrow">PLANIFICACIÓN</p>
                <h1>Calendario de estudio</h1>
                <p className="heading-note">
                  Selecciona un día para construir tu sesión con una o varias
                  tareas.
                </p>
              </div>
              <button
                className="primary-action"
                onClick={() => setModal("programacion")}
              >
                + Programar tareas
              </button>
            </div>
            <div className="calendar-grid">
              <div className="calendar-header">
                <button aria-label="Mes anterior">‹</button>
                <strong>Septiembre 2026</strong>
                <button aria-label="Mes siguiente">›</button>
              </div>
              <div className="weekdays">
                {["L", "M", "X", "J", "V", "S", "D"].map((dia) => (
                  <span key={dia}>{dia}</span>
                ))}
              </div>
              <div className="days">
                {Array.from({ length: 30 }, (_, indice) => {
                  const dia = indice + 1;
                  const fecha = `${dia} de septiembre`;
                  const tareasDelDia = tareas.filter(
                    (tarea) => tarea.fecha === fecha,
                  );
                  return (
                    <button
                      className={`${dia === 2 ? "today " : ""}${fecha === fechaSeleccionada ? "selected" : ""}`}
                      onClick={() => abrirProgramacion(dia)}
                      key={dia}
                      aria-label={`Programar tareas para el ${fecha}`}
                    >
                      <span>{dia}</span>
                      {dia === 2 && <small>Hoy</small>}
                      {tareasDelDia.length > 0 && <b>{tareasDelDia.length}</b>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="calendar-planner">
              <div>
                <span className="stat-label">DÍA SELECCIONADO</span>
                <h2>{fechaSeleccionada}</h2>
                <p>
                  Haz clic en cualquier día para añadir una o varias tareas.
                </p>
              </div>
              <button
                className="primary-action"
                onClick={() => setModal("programacion")}
              >
                Añadir al día
              </button>
              <div className="day-task-list">
                {tareas
                  .filter((tarea) => tarea.fecha === fechaSeleccionada)
                  .map((tarea) => (
                    <div key={tarea.titulo}>
                      <i
                        className={`dot ${tarea.materia === "Redes" ? "azul" : tarea.materia.includes("Organización") ? "verde" : "coral"}`}
                      />
                      <span>
                        <strong>{tarea.titulo}</strong>
                        <small>
                          {tarea.materia} · {tarea.prioridad}
                        </small>
                      </span>
                    </div>
                  ))}
                {tareas.filter((tarea) => tarea.fecha === fechaSeleccionada)
                  .length === 0 && (
                  <p className="empty-day">
                    Este día está libre. Añade tu primera tarea.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
        {vista === "Gráficos" && (
          <section className="graphs-view">
            <div className="notes-view-heading">
              <div>
                <p className="eyebrow">ANALÍTICA DE APRENDIZAJE</p>
                <h1>Tus gráficos</h1>
                <p className="heading-note">
                  Observa tus hábitos para estudiar con más intención.
                </p>
              </div>
              <select
                aria-label="Periodo de gráficos"
                defaultValue="Esta semana"
              >
                <option>Esta semana</option>
                <option>Este mes</option>
                <option>Últimos 90 días</option>
              </select>
            </div>
            <div className="graph-stats">
              <div>
                <span>TIEMPO TOTAL</span>
                <strong>4h 32m</strong>
                <small>↑ 18% frente a la semana pasada</small>
              </div>
              <div>
                <span>SESIONES</span>
                <strong>12</strong>
                <small>3 sesiones más que la semana pasada</small>
              </div>
              <div>
                <span>EFECTIVIDAD</span>
                <strong>82%</strong>
                <small>De tus tareas planificadas</small>
              </div>
            </div>
            <div className="graph-layout">
              <section className="chart-panel">
                <div className="chart-heading">
                  <div>
                    <h2>Tiempo de estudio</h2>
                    <p>Minutos por día</p>
                  </div>
                  <strong>272 min</strong>
                </div>
                <div
                  className="bar-chart"
                  aria-label="Gráfico de tiempo de estudio"
                >
                  {[42, 67, 54, 81, 95, 48, 72].map((altura, indice) => (
                    <div style={{ height: `${altura}%` }} key={indice}>
                      <i />
                      {
                        ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][
                          indice
                        ]
                      }
                    </div>
                  ))}
                </div>
              </section>
              <section className="chart-panel">
                <div className="chart-heading">
                  <div>
                    <h2>Progreso por materia</h2>
                    <p>Páginas exploradas</p>
                  </div>
                </div>
                {materias.map((materia) => (
                  <div className="subject-metric" key={materia.nombre}>
                    <span>
                      <i className={`dot ${materia.color}`} />
                      {materia.nombre}
                    </span>
                    <strong>{materia.progreso}</strong>
                    <div className="progress">
                      <i
                        className={materia.color}
                        style={{ width: materia.progreso }}
                      />
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </section>
        )}
      </section>
      {modal && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(evento) =>
            evento.target === evento.currentTarget && setModal(null)
          }
        >
          <section
            className={`modal ${modal === "programacion" ? "schedule-modal" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              aria-label="Cerrar"
              onClick={() => setModal(null)}
            >
              ×
            </button>
            {modal === "editor" && (
              <form onSubmit={guardarNota}>
                <h2 id="modal-title">
                  {notaAbierta ? "Editar apunte" : "Nueva página"}
                </h2>
                <label htmlFor="titulo">Título</label>
                <input
                  id="titulo"
                  name="titulo"
                  required
                  defaultValue={notaAbierta?.titulo}
                  placeholder="Ej. Teoría del color"
                />
                <label htmlFor="contenido">Apuntes</label>
                <textarea
                  id="contenido"
                  name="contenido"
                  required
                  defaultValue={notaAbierta?.contenido}
                  placeholder="Escribe tus ideas aquí..."
                  rows={6}
                />
                <button className="primary-action" type="submit">
                  Guardar apunte
                </button>
              </form>
            )}
            {modal === "tarea" && (
              <form onSubmit={crearTarea}>
                <h2 id="modal-title">Nueva tarea</h2>
                <p>
                  Define la siguiente acción; luego muévela por el tablero
                  mientras estudias.
                </p>
                <label htmlFor="titulo">Título</label>
                <input
                  id="titulo"
                  name="titulo"
                  required
                  placeholder="¿Qué quieres conseguir?"
                />
                <label htmlFor="materia">Materia</label>
                <select
                  id="materia"
                  name="materia"
                  defaultValue={materias[0]?.nombre}
                >
                  {materias.map((materia) => (
                    <option key={materia.nombre}>{materia.nombre}</option>
                  ))}
                </select>
                <label htmlFor="prioridad">Prioridad</label>
                <select id="prioridad" name="prioridad" defaultValue="Media">
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
                <button className="primary-action" type="submit">
                  Crear tarea
                </button>
              </form>
            )}
            {modal === "programacion" && (
              <div>
                <span className="eyebrow">PLAN DE ESTUDIO</span>
                <h2 id="modal-title">Programar el {fechaSeleccionada}</h2>
                <p>
                  Añade una tarea, pulsa “Añadir al día” y repite para construir
                  una sesión completa.
                </p>
                <form onSubmit={programarTarea}>
                  <label htmlFor="titulo">¿Qué vas a estudiar?</label>
                  <input
                    id="titulo"
                    name="titulo"
                    required
                    placeholder="Ej. Resolver ejercicios 1 al 5"
                  />
                  <label htmlFor="materia">Materia</label>
                  <select
                    id="materia"
                    name="materia"
                    defaultValue={materias[0]?.nombre}
                  >
                    {materias.map((materia) => (
                      <option key={materia.nombre}>{materia.nombre}</option>
                    ))}
                  </select>
                  <label htmlFor="prioridad">Prioridad</label>
                  <select id="prioridad" name="prioridad" defaultValue="Media">
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                  <button className="primary-action" type="submit">
                    Añadir al día
                  </button>
                </form>
                <div className="scheduled-count">
                  {
                    tareas.filter((tarea) => tarea.fecha === fechaSeleccionada)
                      .length
                  }{" "}
                  tareas programadas para este día
                </div>
                <button
                  className="schedule-done"
                  onClick={() => setModal(null)}
                >
                  Terminar programación
                </button>
              </div>
            )}
            {modal === "materia" && (
              <form onSubmit={crearMateria}>
                <h2 id="modal-title">Nuevo cuaderno</h2>
                <label htmlFor="nombre">Materia</label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Ej. Inteligencia artificial"
                />
                <button className="primary-action" type="submit">
                  Crear materia
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
