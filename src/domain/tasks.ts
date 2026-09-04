export function alternarElemento(elementos: string[], elemento: string): string[] {
  return elementos.includes(elemento)
    ? elementos.filter((actual) => actual !== elemento)
    : [...elementos, elemento];
}
