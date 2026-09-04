# Metodología SDD

## 1. Qué significa SDD

En este proyecto, **SDD** significa **Specification-Driven Development** o **Desarrollo Dirigido por Especificaciones**.

La idea central es sencilla: antes de construir una funcionalidad, definimos con claridad qué problema resuelve, quién la necesita, cómo debe comportarse y cómo comprobaremos que funciona. La especificación se convierte en la fuente de verdad del producto y reduce decisiones ambiguas durante el desarrollo.

SDD no significa escribir documentación interminable. Significa crear especificaciones pequeñas, útiles y verificables que guíen el diseño, la implementación y las pruebas.

## 2. Por qué usaremos SDD

La plataforma será una herramienta de estudio con muchas piezas relacionadas: notas, documentos, tareas, calendario, búsqueda, conocimiento enlazado y posiblemente inteligencia artificial. SDD nos ayudará a:

- Mantener una visión de producto coherente.
- Priorizar funcionalidades según el valor para el estudiante.
- Evitar desarrollar pantallas sin un flujo de usuario definido.
- Convertir necesidades en criterios de aceptación comprobables.
- Alinear diseño, frontend, backend, datos, seguridad y pruebas.
- Detectar contradicciones antes de escribir código.
- Facilitar que nuevas personas entiendan el proyecto.

## 3. Principios

1. **La especificación precede al código.** Una funcionalidad no entra en desarrollo sin una definición mínima.
2. **El usuario y el problema son el punto de partida.** No diseñamos funciones solo porque sean técnicamente interesantes.
3. **Cada requisito debe poder verificarse.** Si no se puede comprobar, debe aclararse o dividirse.
4. **Las decisiones importantes quedan registradas.** Así evitamos reabrir continuamente las mismas discusiones.
5. **La especificación evoluciona.** Cuando cambia el producto, se actualiza primero la especificación y después el código.
6. **Construimos por incrementos verticales.** Cada entrega debe atravesar la experiencia completa necesaria para aportar valor.
7. **La calidad es parte del requisito.** Accesibilidad, rendimiento, seguridad y mantenibilidad se consideran desde el inicio.

## 4. Ciclo de trabajo

### Fase 1: Descubrimiento

Describir el usuario, su contexto, el problema y el resultado deseado.

**Salida:** problema definido, objetivo y alcance inicial.

### Fase 2: Especificación

Convertir el problema en una especificación breve con:

- Nombre y objetivo.
- Usuarios involucrados.
- Alcance y fuera de alcance.
- Flujo principal.
- Casos alternativos y errores.
- Requisitos funcionales.
- Requisitos no funcionales.
- Criterios de aceptación.
- Dependencias y riesgos.

**Salida:** documento listo para revisión.

### Fase 3: Revisión

Revisar la especificación desde tres perspectivas:

- **Producto:** ¿aporta valor y tiene prioridad?
- **Experiencia:** ¿el flujo es claro y accesible?
- **Técnica:** ¿es viable, seguro y mantenible?

No se implementa una especificación con dudas críticas abiertas.

### Fase 4: Diseño técnico

Definir el modelo de datos, contratos de API, componentes, estados de interfaz, permisos y estrategia de pruebas que necesita la funcionalidad.

**Salida:** diseño técnico mínimo y decisiones registradas.

### Fase 5: Implementación

Construir únicamente lo necesario para satisfacer la especificación. El código debe mantener trazabilidad con los requisitos y criterios de aceptación.

### Fase 6: Verificación

Comprobar cada criterio de aceptación con pruebas apropiadas: unitarias, integración, end-to-end, accesibilidad o revisión manual cuando corresponda.

### Fase 7: Aprendizaje y actualización

Después de probar la funcionalidad, registrar lo aprendido, actualizar la especificación si cambió el comportamiento esperado y dividir el siguiente incremento.

## 5. Plantilla de especificación

Cada nueva funcionalidad debe partir de una ficha como esta:

```md
# [Nombre de la funcionalidad]

## Objetivo

## Usuario y contexto

## Alcance

## Fuera de alcance

## Flujo principal

1.
2.
3.

## Casos alternativos y errores

## Requisitos funcionales

- RF-01:

## Requisitos no funcionales

- RNF-01:

## Criterios de aceptación

- [ ] CA-01:

## Dependencias

## Riesgos y decisiones abiertas
```

## 6. Criterios de calidad de una buena especificación

Una especificación está lista para desarrollo cuando es:

- **Clara:** se entiende sin depender de conversaciones privadas.
- **Concreta:** evita términos vagos como “rápido”, “fácil” o “moderno” sin definirlos.
- **Completa para su alcance:** contempla estados vacíos, carga, éxito, error y permisos.
- **Verificable:** incluye criterios de aceptación observables.
- **Pequeña:** puede implementarse y validarse en un incremento razonable.
- **Consistente:** no contradice otras especificaciones vigentes.
- **Trazable:** cada decisión importante se relaciona con una necesidad del usuario.

## 7. Reglas operativas del proyecto

- Toda funcionalidad nueva debe tener una especificación antes de entrar al backlog técnico.
- Los cambios de comportamiento se hacen primero en el `.md` correspondiente.
- Los pull requests deben indicar qué requisitos y criterios de aceptación cubren.
- Ninguna tarea se considera terminada sin verificación y documentación del resultado.
- Las decisiones de arquitectura se registran en una sección de decisiones o en un ADR cuando sean relevantes.
- El MVP se mantiene pequeño: primero una experiencia de estudio sólida, después extensiones avanzadas.

## 8. Definition of Ready y Definition of Done

### Definition of Ready

Una tarea está lista cuando tiene objetivo, alcance, estados principales, criterios de aceptación, dependencias conocidas y una estrategia de verificación.

### Definition of Done

Una tarea está terminada cuando la implementación cumple la especificación, pasa las pruebas definidas, funciona en los estados principales y de error, respeta accesibilidad y seguridad, y la documentación quedó actualizada.

## 9. Artefactos iniciales

- `01-metodologia-sdd.md`: reglas y ciclo de trabajo del proyecto.
- `02-especificacion-plataforma-estudio.md`: visión y alcance inicial del producto.
- Las próximas funcionalidades deberán tener sus propias especificaciones antes de implementarse.

## 10. Especificación aprobada: identidad visual y Gráficos

### Decisión visual

La interfaz usará una paleta base de **amarillo, negro y blanco**:

- **Negro:** navegación, títulos, acciones primarias y contraste.
- **Blanco:** superficies de trabajo, tarjetas y lectura prolongada.
- **Amarillo:** foco, progreso, estados destacados y llamadas a la acción secundarias.

La paleta debe mantener contraste suficiente y no usar el amarillo como texto pequeño sobre blanco. Las animaciones serán breves y funcionales: entrada escalonada del contenido, transición de vistas y realce de estados. Deben respetar `prefers-reduced-motion`.

### Especificación funcional: Gráficos

**Objetivo:** ofrecer al estudiante una vista rápida de su avance, tiempo de estudio, tareas completadas y distribución por materias.

**Flujo principal:**

1. El usuario pulsa `Gráficos` en la barra lateral.
2. La plataforma muestra el resumen del periodo seleccionado.
3. El usuario compara métricas y puede cambiar el periodo.
4. Cada gráfico comunica su título, unidad y estado vacío.

**Criterios de aceptación:**

- [ ] `Gráficos` aparece como opción visible y accesible en la barra lateral izquierda.
- [ ] Al pulsarlo se muestra una vista propia, no un ancla ni el dashboard anterior.
- [ ] La vista presenta al menos tiempo de estudio, tareas completadas y progreso por materia.
- [ ] Los datos tienen etiquetas legibles y no dependen únicamente del color.
- [ ] Existe estado vacío y estado de carga definidos para datos reales.
- [ ] La entrada de la vista no produce animaciones si el usuario solicita reducir movimiento.
- [ ] La navegación a Gráficos tiene una prueba automatizada.
