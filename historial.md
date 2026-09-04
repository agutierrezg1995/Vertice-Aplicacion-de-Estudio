# Historial y checkpoint del proyecto

**Fecha del checkpoint:** 2 de septiembre de 2026
**Estado:** MVP visual y funcional en progreso
**Última URL local:** http://localhost:3000

## 1. Objetivo del proyecto

Nómada es una plataforma de estudio inspirada en Notion, pero orientada específicamente a organizar conocimiento, tomar apuntes, planificar tareas, consultar el calendario y analizar hábitos de estudio.

El proyecto se desarrolla siguiendo la metodología **SDD (Specification-Driven Development)**.

## 2. Documentación existente

- `01-metodologia-sdd.md`: definición de SDD, ciclo de trabajo, criterios de calidad, Definition of Ready y Definition of Done. También contiene la decisión visual y la especificación de Gráficos.
- `02-especificacion-plataforma-estudio.md`: visión del producto, alcance del MVP, requisitos funcionales/no funcionales, tecnología propuesta y criterios de aceptación.
- `03-pruebas-automatizadas.md`: estrategia de pruebas, cobertura actual y límites conocidos.
- `historial.md`: este checkpoint para retomar el trabajo.

## 3. Stack instalado

- Next.js `16.3.4`
- React `19.2.8`
- TypeScript
- Tailwind CSS
- ESLint
- Turbopack
- Vitest
- jsdom
- Testing Library
- user-event

## 4. Funcionalidades implementadas

### Dashboard

- Inicio con métricas de racha, tiempo y tareas completadas.
- Materias visibles con progreso.
- Lista de tareas interactivas.
- Completar y descompletar tareas.
- Crear tareas desde un formulario.
- Crear materias desde un formulario.
- Buscar tareas y materias.
- Ordenar tareas por prioridad o fecha.
- Notificaciones visibles.
- Menú de perfil.
- Cita del día rotatoria.

### Notas

- Entrada a `Mis notas` desde la barra lateral.
- Entrada a una materia concreta.
- Biblioteca de notas por materia.
- Creación de páginas/apuntes.
- Editor con título y contenido.
- Guardado del apunte durante la sesión.
- Apertura y edición de notas existentes.

### Calendario

- Vista propia de calendario.
- Mes de septiembre de 2026.
- Día actual destacado.
- Agenda con próximos pasos.
- Botón para crear una nueva tarea.

### Gráficos

- Nueva sección `Gráficos` en la barra lateral izquierda.
- Métrica de tiempo total.
- Métrica de sesiones.
- Métrica de efectividad.
- Gráfico de barras de tiempo de estudio.
- Progreso por materia.
- Selector de periodo visual.

### Diseño

- Paleta principal amarilla, negra y blanca.
- Animaciones de entrada escalonadas.
- Animación de barras de progreso.
- Soporte para `prefers-reduced-motion`.
- Diseño responsive para escritorio, tablet y móvil.

## 5. Archivos principales de implementación

- `src/app/page.tsx`: dashboard, navegación, vistas de notas, calendario y gráficos.
- `src/app/globals.css`: identidad visual, responsive, animaciones y estilos de vistas.
- `src/app/layout.tsx`: idioma español y metadatos de Nómada.
- `src/domain/tasks.ts`: lógica pura para alternar el estado de tareas.
- `vitest.config.mts`: configuración del runner de pruebas.
- `test/setup.ts`: configuración y limpieza automática entre pruebas.
- `test/tasks.test.ts`: pruebas unitarias de dominio.
- `test/home.test.tsx`: pruebas de interfaz y flujos del MVP.

## 6. Validación realizada

Última validación conocida:

- `npm test`: **11 pruebas exitosas**.
- `npm run lint`: correcto, sin errores ni warnings.
- `npm run build`: compilación de producción correcta.
- Comprobación manual en navegador: notas, creación de apunte, calendario y gráficos abiertos correctamente.

## 7. Decisiones importantes

- La aplicación se inicializó con Next.js porque el directorio original tenía espacios y mayúsculas, lo que impedía usarlo directamente como nombre npm.
- Se creó el proyecto temporal `plataforma-estudio-base` y luego se integró su contenido en la raíz. La carpeta temporal fue eliminada.
- Los datos actuales viven en estado React y se pierden al recargar. Todavía no existe backend, autenticación ni base de datos.
- La paleta anterior verde/coral/azul fue reemplazada por amarillo/negro/blanco.
- El módulo de Gráficos está implementado con datos de demostración, todavía no con datos persistidos.

## 8. Limitaciones pendientes

- No hay registro ni inicio de sesión real.
- No hay PostgreSQL ni persistencia permanente.
- Los apuntes, materias y tareas se pierden al recargar.
- El editor todavía es un formulario simple, no un editor por bloques.
- El calendario no cambia de mes todavía.
- El selector de periodo de Gráficos todavía no recalcula los datos.
- No hay API, permisos multiusuario ni sincronización.
- No hay pruebas end-to-end con Playwright integradas como comando del proyecto.
- Falta auditoría de accesibilidad y rendimiento en navegadores reales.

## 9. Próximo incremento recomendado según SDD

1. Crear la especificación técnica de persistencia y modelo de datos.
2. Elegir y configurar PostgreSQL con Prisma o Drizzle.
3. Implementar autenticación y usuarios.
4. Persistir materias, tareas y apuntes.
5. Convertir el editor en editor por bloques.
6. Persistir métricas para que Gráficos use datos reales.
7. Añadir pruebas de integración y end-to-end.
8. Revisar accesibilidad con una auditoría automatizada.

## 10. Comandos para retomar

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Abrir después:

```text
http://localhost:3000
```

## 11. Definition of Done del checkpoint

- La documentación SDD está creada y actualizada.
- El MVP visual tiene navegación funcional.
- Notas, calendario y gráficos tienen vistas propias.
- Las pruebas automatizadas pasan.
- Lint y build pasan.
- Las limitaciones están documentadas para evitar confundir datos de demostración con funcionalidades persistentes.
