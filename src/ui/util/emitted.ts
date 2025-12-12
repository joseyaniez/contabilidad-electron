import type { Invoice } from "../../types/models/invoice";
import type { Ticket } from "../../types/models/ticket";
import { sumPrices } from "./cents";

export function totalTicket(tickets: Ticket[]): string {
  let total = tickets.reduce((acc, ticket) => sumPrices(acc, sumPrices(...ticket.productsList.map(prod => prod.importPrice))), 0)
  let [unit, decimal] = total.toString().split(".")
  let result = decimal ? unit + "." + decimal.padEnd(2, "0") : unit + ".00"
  return result
}

export function totalSingleTicket(ticket: Ticket): string {
  let total = sumPrices(...ticket.productsList.map((p) => p.importPrice))
  let [unit, decimal] = total.toString().split(".")
  let result = decimal ? unit + "." + decimal.padEnd(2, "0") : unit + ".00"
  return result
}

export function totalInvoice(tickets: Invoice[]): string {
  let total = tickets.reduce((acc, inv) => sumPrices(acc, sumPrices(...inv.productsList.map(prod => prod.importPrice))), 0)
  let [unit, decimal] = total.toString().split(".")
  let result = decimal ? unit + "." + decimal.padEnd(2, "0") : unit + ".00"
  return result
}

export function totalSingleInvoice(ticket: Invoice): string {
  let total = sumPrices(...ticket.productsList.map((p) => p.importPrice))
  let [unit, decimal] = total.toString().split(".")
  let result = decimal ? unit + "." + decimal.padEnd(2, "0") : unit + ".00"
  return result
}
