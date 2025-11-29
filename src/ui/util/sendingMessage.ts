import { PaymentStatus } from "./paymentStatus";

export function obtainSendingText(paymentStatus: PaymentStatus): string {
  switch(paymentStatus){
    case PaymentStatus.Blank:
      return 'Ticket vació'
    case PaymentStatus.Validation:
      return 'Validando el comprobante...'
    case PaymentStatus.Sending:
      return 'Enviando el comprobante a SUNAT...'
    case PaymentStatus.Success:
      return 'Se envió el comprobante correctamente'
    case PaymentStatus.GeneratingPDF:
      return 'Generando PDF'
    case PaymentStatus.Error:
      return 'Ocurrió un error al enviar el comprobante'
  }
}
