# Plataforma de Estudio: Especificación Inicial

## 1. Visión del producto

Crear una plataforma de estudio flexible y potente, inspirada en la libertad de Notion pero diseñada específicamente para aprender. Debe permitir organizar conocimiento, planificar sesiones, practicar activamente y medir el progreso desde un mismo espacio.

La plataforma no será solo un editor de páginas. Será un **sistema operativo personal para el aprendizaje**: un lugar donde una idea pueda convertirse en una nota, relacionarse con otras, transformarse en una tarea de estudio y revisarse con evidencia de progreso.

## 2. Problema

Los estudiantes suelen repartir su trabajo entre aplicaciones desconectadas: notas, PDFs, listas de tareas, calendario, temporizadores, tarjetas de memoria y herramientas de seguimiento. Esa fragmentación genera pérdida de contexto, poca visibilidad del avance y mucha organización manual.

Necesitamos una experiencia única que combine flexibilidad y estructura sin imponer una metodología de estudio concreta.

## 3. Usuario objetivo

### Usuario principal

Estudiante individual de secundaria, universidad, formación profesional o aprendizaje autodidacta que necesita:

- Organizar varias materias o áreas.
- Capturar y conectar apuntes.
- Convertir objetivos en sesiones y tareas.
- Recuperar información rápidamente.
- Estudiar de forma activa, no solo acumular notas.
- Entender su progreso y sus próximos pasos.

### Usuarios posteriores

- Docentes que preparan espacios de aprendizaje.
- Mentores o tutores.
- Pequeños grupos de estudio.

Estos perfiles quedan fuera del primer incremento del MVP.

## 4. Objetivo del MVP

Permitir que una persona cree su espacio de estudio, organice materias, escriba notas estructuradas, planifique tareas y encuentre su información sin fricción.

El MVP debe validar esta pregunta:

> ¿Puede un estudiante organizar y ejecutar su estudio diario desde un único espacio sin sentir que la herramienta le añade más trabajo?

## 5. Alcance del MVP

### Incluido

- Registro e inicio de sesión.
- Espacio personal de estudio.
- Materias o áreas de conocimiento.
- Páginas y subpáginas con editor enriquecido por bloques.
- Bloques de texto, títulos, listas, checklists, código, citas y separadores.
- Enlaces entre páginas y etiquetas.
- Tareas con estado, prioridad, fecha y materia.
- Vista general con tareas próximas y actividad reciente.
- Búsqueda de páginas, tareas y etiquetas.
- Diseño responsive para escritorio y móvil.
- Paleta visual amarilla, negra y blanca con animaciones funcionales y accesibles.
- Sección de Gráficos en la barra lateral para consultar progreso y hábitos de estudio.
- Modo claro y modo oscuro accesibles.
- Persistencia segura y sincronización básica.

### Fuera de alcance inicial

- Colaboración multiusuario en tiempo real.
- Marketplace de plantillas.
- Aplicaciones nativas para iOS y Android.
- Integraciones externas complejas.
- Tutor de inteligencia artificial autónomo.
- Analítica avanzada de aprendizaje.
- Facturación y planes comerciales.

## 6. Principios de experiencia

- **Captura rápida:** crear una nota o tarea debe requerir pocos pasos.
- **Estructura flexible:** el usuario puede organizarse por materias, proyectos o temas.
- **Contexto conectado:** las tareas deben poder enlazar a páginas y recursos.
- **Estudio activo:** el producto debe favorecer revisar, practicar y actuar.
- **Escaneable:** el usuario debe entender qué estudiar hoy al abrir la plataforma.
- **Cero pérdida de trabajo:** los cambios deben guardarse y comunicar su estado.
- **Accesible por defecto:** teclado, contraste, foco visible, etiquetas y lectores de pantalla.

## 7. Flujo principal del MVP

1. La persona crea una cuenta e inicia sesión.
2. Configura su primera materia.
3. Crea una página de apuntes desde una página vacía o plantilla básica.
4. Añade contenido y enlaza otra página o etiqueta.
5. Crea una tarea de estudio asociada a esa materia y página.
6. Desde el panel principal consulta qué tiene pendiente.
7. Marca la tarea como completada y vuelve a sus apuntes mediante el enlace.
8. Usa la búsqueda para recuperar el contenido después.

## 8. Requisitos funcionales iniciales

- **RF-01:** El usuario puede crear, editar, archivar y eliminar materias.
- **RF-02:** El usuario puede crear páginas anidadas dentro de una materia.
- **RF-03:** El editor permite añadir, editar, reordenar y eliminar bloques.
- **RF-04:** El sistema guarda automáticamente los cambios y muestra el estado de guardado.
- **RF-05:** El usuario puede convertir una selección o bloque en una tarea.
- **RF-06:** Una tarea tiene título, estado, prioridad, fecha opcional, materia y enlaces relacionados.
- **RF-07:** El panel principal muestra tareas pendientes, vencidas y próximas.
- **RF-08:** La búsqueda devuelve resultados relevantes de páginas, tareas y etiquetas.
- **RF-09:** El usuario puede enlazar páginas desde el editor.
- **RF-10:** El usuario puede cambiar el tema visual y cerrar sesión de forma segura.
- **RF-11:** El usuario puede abrir la sección `Gráficos` desde la barra lateral.
- **RF-12:** La sección `Gráficos` muestra tiempo de estudio, tareas completadas y progreso por materia.
- **RF-13:** Las animaciones de interfaz respetan la preferencia de movimiento reducido del sistema.

## 9. Requisitos no funcionales iniciales

- **RNF-01:** La interfaz debe ser responsive en resoluciones móviles y de escritorio.
- **RNF-02:** Las rutas protegidas no deben exponer datos de otros usuarios.
- **RNF-03:** Las contraseñas y sesiones deben gestionarse con mecanismos seguros del proveedor de autenticación elegido.
- **RNF-04:** Las operaciones comunes deben comunicar carga, éxito y error de forma clara.
- **RNF-05:** La aplicación debe aspirar a cumplir WCAG 2.2 nivel AA en los flujos principales.
- **RNF-06:** El código debe mantener separación clara entre interfaz, dominio y persistencia.
- **RNF-07:** Las funcionalidades críticas deben tener pruebas automatizadas.
- **RNF-08:** El contraste de la paleta amarilla, negra y blanca debe cumplir WCAG 2.2 AA en los flujos principales.
- **RNF-09:** Las métricas no deben comunicarse únicamente mediante color; deben incluir texto, valores o etiquetas.

## 10. Dirección tecnológica propuesta

La elección definitiva se hará mediante una especificación técnica posterior, pero el proyecto priorizará tecnologías con adopción sólida en el mercado:

- **Frontend:** TypeScript y React con Next.js.
- **Estilos y componentes:** Tailwind CSS junto con componentes accesibles reutilizables.
- **Backend:** TypeScript en el mismo ecosistema de Next.js para el MVP, con API bien definida.
- **Base de datos:** PostgreSQL.
- **ORM:** Prisma o Drizzle, según la evaluación técnica.
- **Autenticación:** proveedor especializado compatible con OAuth y sesiones seguras.
- **Editor:** editor por bloques basado en una librería madura como Tiptap.
- **Pruebas:** Vitest para unitarias, Testing Library para interfaz y Playwright para flujos end-to-end.
- **Calidad:** ESLint, Prettier, TypeScript estricto y CI automatizada.
- **Despliegue:** plataforma gestionada con CDN, HTTPS, variables de entorno y copias de seguridad.

Estas tecnologías son una dirección inicial, no una decisión irrevocable. Cada decisión importante deberá justificarse con SDD.

## 11. Criterios de aceptación del primer incremento

- [ ] Un usuario nuevo puede registrarse, iniciar sesión y cerrar sesión.
- [ ] Un usuario puede crear una materia y verla en su espacio personal.
- [ ] Un usuario puede crear una página con bloques y volver a abrirla conservando el contenido.
- [ ] Un usuario puede crear una tarea asociada a una materia.
- [ ] El panel muestra correctamente tareas pendientes y completadas.
- [ ] La búsqueda encuentra una página por su título o contenido indexado.
- [ ] Los estados de carga, vacío y error son comprensibles.
- [ ] Los flujos principales pueden completarse con teclado.
- [ ] Un usuario no puede consultar ni modificar datos de otra cuenta.
- [ ] Los flujos principales tienen pruebas automatizadas y pasan en CI.
- [ ] `Gráficos` abre una vista propia con métricas de estudio y progreso por materia.
- [ ] Las animaciones de entrada pueden desactivarse mediante `prefers-reduced-motion`.

## 12. Métricas de validación

Durante la validación del MVP observaremos:

- Tiempo hasta crear la primera materia y la primera página.
- Porcentaje de usuarios que completan el flujo principal.
- Número de sesiones de estudio semanales por usuario.
- Tareas creadas frente a tareas completadas.
- Tiempo necesario para encontrar una nota existente.
- Errores o abandonos en el editor.
- Comentarios cualitativos sobre organización y carga cognitiva.

## 13. Próximas especificaciones SDD

El siguiente trabajo debe dividirse en documentos pequeños y ordenados por valor:

1. Registro, autenticación y modelo de usuario.
2. Estructura de materias, páginas y bloques.
3. Editor de estudio.
4. Tareas y panel diario.
5. Gráficos y analítica de aprendizaje.
6. Búsqueda e indexación.
7. Accesibilidad, seguridad y observabilidad.
8. Arquitectura técnica y contratos de API.

Cada documento deberá seguir la plantilla definida en `01-metodologia-sdd.md` y terminar con criterios de aceptación verificables.
