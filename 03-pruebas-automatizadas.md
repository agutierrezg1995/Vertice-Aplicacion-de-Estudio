# Pruebas automatizadas

## Propósito

Este documento registra la estrategia de pruebas del primer incremento de Nómada. Las pruebas se ejecutan con Vitest, jsdom, Testing Library y `user-event`.

El objetivo es detectar regresiones en los criterios de aceptación que ya tienen comportamiento implementado. Ninguna suite puede demostrar que una aplicación es utilizable al 100 % en todos los dispositivos, navegadores, usuarios o escenarios; sí puede establecer una barrera automatizada y repetible para el alcance cubierto.

## Ejecución

```bash
npm test
```

Para trabajar en modo observación durante el desarrollo:

```bash
npm run test:watch
```

## Cobertura actual

### `test/tasks.test.ts`

Pruebas unitarias de la lógica de dominio:

- Añadir una tarea seleccionada.
- Quitar una tarea ya seleccionada.
- Mantener inmutable la lista original.

### `test/home.test.tsx`

Pruebas de componente y flujo de usuario:

- Renderizar el saludo, las métricas, el enfoque del día y las materias.
- Completar una tarea desde la interfaz.
- Descompletar la misma tarea desde la interfaz.
- Abrir una materia y consultar su biblioteca de notas.
- Escribir y guardar un apunte nuevo.
- Abrir el calendario con su agenda.
- Abrir Gráficos con métricas de hábitos y progreso.

## Relación con la especificación SDD

| Requisito | Cobertura |
| --- | --- |
| RF-07: mostrar tareas pendientes | Verificado por el renderizado del panel principal |
| RF-10: cambiar el estado de una tarea | Verificado con interacción de usuario |
| CA-05: mostrar tareas en el panel | Verificado en `home.test.tsx` |
| CA-06: estados de interacción comprensibles | Verificado mediante la clase `done` y la marca visual |
| RF-11/RF-12: abrir Gráficos y consultar métricas | Verificado con la vista y sus indicadores principales |
| Gráficos: navegación y contenido visible | Verificado con prueba de componente |

## Límites conocidos

Todavía no están implementados ni cubiertos por pruebas automatizadas:

- Registro, autenticación y cierre de sesión reales.
- Persistencia en PostgreSQL y recuperación tras recargar.
- Editor de páginas y bloques.
- Búsqueda e indexación.
- API, permisos entre usuarios y seguridad de datos.
- Pruebas end-to-end en navegadores reales.
- Auditoría automatizada completa de accesibilidad.
- Rendimiento, sincronización y funcionamiento offline.

Estos puntos deben convertirse en especificaciones SDD y pruebas antes de considerarlos terminados.

## Definition of Done para pruebas

Una funcionalidad se considera verificada cuando:

- Tiene casos de éxito, error y estado vacío según corresponda.
- Sus criterios de aceptación tienen al menos una prueba o justificación explícita.
- `npm test`, `npm run lint` y `npm run build` pasan.
- La prueba usa roles, texto o comportamiento observable, evitando depender de detalles internos innecesarios.
- Los límites de cobertura quedan registrados en este documento.
