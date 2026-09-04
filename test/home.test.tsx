import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("panel principal de estudio", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.removeItem("vertice-estudio-v2");
  });

  it("muestra el enfoque del día, métricas y materias", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Tus cuadernos" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mis notas" })).toBeInTheDocument();
    expect(screen.getByText("Crear cuaderno")).toBeInTheDocument();
    expect(screen.getAllByText("Redes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Organización y administración").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Programación de dispositivos móviles").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Métodos numéricos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Humanidades 2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Formulación de proyectos de ingeniería").length).toBeGreaterThan(0);
  });

  it("permite abrir la biblioteca desde una tarjeta", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Redes.*Mapa de una conexión TCP/i }));
    expect(screen.getByRole("heading", { name: "Redes" })).toBeInTheDocument();
    expect(screen.getByText("2 páginas reales para estudiar y ampliar.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /PÁGINA 1 Mapa de una conexión TCP/i })).toBeInTheDocument();
  });

  it("permite buscar y crear una tarea", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Buscar" }));
    await user.type(screen.getByLabelText("Buscar en tu espacio"), "TCP");
    expect(screen.getByText("Redes")).toBeInTheDocument();
    expect(screen.queryByText("Humanidades 2")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cerrar" }));
    await user.click(screen.getByRole("button", { name: /Calendario/ }));
    await user.click(screen.getByRole("button", { name: "+ Programar tareas" }));
    await user.type(screen.getByLabelText("¿Qué vas a estudiar?"), "Repasar pruebas");
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Añadir al día" }));
    expect(JSON.parse(window.localStorage.getItem("vertice-estudio-v2") ?? "{}").tareas).toEqual(expect.arrayContaining([
      expect.objectContaining({ titulo: "Repasar pruebas" }),
    ]));
  });

  it("guarda una tarea nueva en el almacenamiento local", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Calendario/ }));
    await user.click(screen.getByRole("button", { name: "+ Programar tareas" }));
    await user.type(screen.getByLabelText("¿Qué vas a estudiar?"), "Resolver ejercicios de repaso");
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Añadir al día" }));

    expect(JSON.parse(window.localStorage.getItem("vertice-estudio-v2") ?? "{}").tareas).toEqual(expect.arrayContaining([
      expect.objectContaining({ titulo: "Resolver ejercicios de repaso" }),
    ]));
  });

  it("permite crear materias y abrir ajustes", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Añadir materia" }));
    await user.type(screen.getByLabelText("Materia"), "Matemáticas");
    await user.click(screen.getByRole("button", { name: "Crear materia" }));
    expect(screen.getAllByText("Matemáticas").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /Ajustes/ }));
    expect(screen.getByRole("heading", { name: "Ajustes de estudio" })).toBeInTheDocument();
    expect(screen.getByText("Espacio guardado en este dispositivo")).toBeInTheDocument();
  });

  it("abre las notas de la materia seleccionada", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getAllByRole("button", { name: "Redes" })[0]);

    expect(screen.getAllByRole("heading", { name: "Redes" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Biblioteca de conocimiento", { exact: false })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Mapa de una conexión TCP/i }).length).toBeGreaterThan(0);
  });

  it("permite escribir y guardar un apunte nuevo", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Mis notas/ }));
    await user.click(screen.getAllByRole("button", { name: "+ Nueva página" })[0]);
    await user.type(screen.getByLabelText("Título"), "Mi sesión de hoy");
    await user.type(screen.getByLabelText("Apuntes"), "Resumen de lo aprendido");
    await user.click(screen.getByRole("button", { name: "Guardar apunte" }));

    expect(screen.getByText("Mi sesión de hoy")).toBeInTheDocument();
    expect(screen.getByText("Resumen de lo aprendido")).toBeInTheDocument();
  });

  it("muestra una vista de calendario con planificador diario", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Calendario/ }));

    expect(screen.getByRole("heading", { name: "Calendario de estudio" })).toBeInTheDocument();
    expect(screen.getByText("Septiembre 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2 de septiembre" })).toBeInTheDocument();
  });

  it("permite programar varias tareas en un día", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Calendario/ }));
    await user.click(screen.getByRole("button", { name: "Programar tareas para el 10 de septiembre" }));
    await user.type(screen.getByLabelText("¿Qué vas a estudiar?"), "Resolver ejercicios de redes");
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Añadir al día" }));
    await user.type(screen.getByLabelText("¿Qué vas a estudiar?"), "Repasar modelo OSI");
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Añadir al día" }));

    expect(screen.getByText("2 tareas programadas para este día")).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem("vertice-estudio-v2") ?? "{}").tareas).toEqual(expect.arrayContaining([
      expect.objectContaining({ titulo: "Resolver ejercicios de redes", fecha: "10 de septiembre" }),
      expect.objectContaining({ titulo: "Repasar modelo OSI", fecha: "10 de septiembre" }),
    ]));
  });

  it("muestra gráficos de hábitos y progreso", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: /Gráficos/ }));

    expect(screen.getByRole("heading", { name: "Tus gráficos" })).toBeInTheDocument();
    expect(screen.getByText("Tiempo de estudio")).toBeInTheDocument();
    expect(screen.getByText("Progreso por materia")).toBeInTheDocument();
    expect(screen.getByLabelText("Periodo de gráficos")).toBeInTheDocument();
  });
});
