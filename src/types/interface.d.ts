import type { Product } from "./models/product"

export type productResponse<T> = {success: boolean; error?: string; data?: T};

export interface IElectronAPI {
  products: {
    create: (product: Product) => Promise<productResponse<number>>,
    getAll: () => Promise<productResponse<Array<Product>>>,
    delete: (id: string) => Promise<productResponse<void>>,
  }
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
