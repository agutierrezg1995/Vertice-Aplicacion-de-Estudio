import { describe, expect, it } from "vitest";
import { alternarElemento } from "@/domain/tasks";

describe("alternarElemento", () => {
  it("añade un elemento que no estaba seleccionado", () => {
    expect(alternarElemento([], "tarea-1")).toEqual(["tarea-1"]);
  });

  it("quita un elemento que ya estaba seleccionado", () => {
    expect(alternarElemento(["tarea-1", "tarea-2"], "tarea-1")).toEqual(["tarea-2"]);
  });

  it("no modifica la lista original", () => {
    const actuales = ["tarea-1"];
    alternarElemento(actuales, "tarea-2");
    expect(actuales).toEqual(["tarea-1"]);
  });
});
