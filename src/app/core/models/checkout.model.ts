export interface CheckoutPayload {
    client: {
      first_name: string;
      last_name: string;
      doc_type: string;
      doc_number: string;
      phone: string;
      email: string;
    };
    voucher_type: string; // "B" o "F"
    cart: {
      book_id: number;
      quantity: number;
    }[];
  }