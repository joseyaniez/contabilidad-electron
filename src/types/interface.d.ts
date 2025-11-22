import type { Product } from "./models/product"
import type { Client } from "./models/client"

export type resourceResponse<T> = {success: boolean; error?: string; data?: T};

export interface IElectronAPI {
  products: {
    create: (product: Product) => Promise<resourceResponse<number>>,
    getAll: () => Promise<resourceResponse<Array<Product>>>,
    delete: (id: string) => Promise<resourceResponse<void>>,
    update: (product: Product) => Promise<resourceResponse<void>>,
  },
  clients: {
    create: (client: Client) => Promise<resourceResponse<Client>>,
    find: (dni: string, ruc: string, name: string) => Promise<resourceResponse<Array<Client>>>,
  }
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
