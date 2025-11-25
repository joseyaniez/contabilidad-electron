import dbTicketItem from '../db/models/ticketItem.js';

export default function setupTicketItemsIPC(){
  dbTicketItem.createTicketItemTable();
}
