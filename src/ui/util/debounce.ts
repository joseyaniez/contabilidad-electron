/**
 * Retrasa la ejecución de una función hasta que haya transcurrido 
 * un tiempo de 'delay' sin que se vuelva a llamar.
 * * @param fn La función a ejecutar (generalmente tu llamada a la API o DB).
 * @param delay El tiempo de espera en milisegundos.
 * @returns Una nueva función que solo ejecuta `fn` después del `delay` sin más llamadas.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // La función devuelta tiene la misma firma de argumentos que la original (Parameters<T>)
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    
    // 1. Limpia el temporizador anterior.
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // 2. Establece un nuevo temporizador.
    timeoutId = setTimeout(() => {
      // Usamos .apply para asegurar que el 'this' y los argumentos se pasen correctamente
      fn.apply(this, args);
    }, delay);
  };
}
