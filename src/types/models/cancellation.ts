
export interface Cancellation {
  id?: string,
  cause: string,
  cancellableType: 'B' | 'F',
  cancellableId: string
}
