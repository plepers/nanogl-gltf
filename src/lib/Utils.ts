
/**
 * Check if all elements of an array are 1
 * @param a Array to check
 */
export function isAllOnes( a : ArrayLike<number> ) : boolean {
  for (let i = 0; i < a.length; i++) {
    if( a[i] !== 1 ) return false;
  }
  return true;
}

/**
 * Check if all elements of an array are 0
 * @param a Array to check
 */
export function isAllZeros( a : ArrayLike<number> ) : boolean {
  for (let i = 0; i < a.length; i++) {
    if( a[i] !== 0 ) return false;
  }
  return true;
}
