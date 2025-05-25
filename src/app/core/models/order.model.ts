export interface Order {
  id: number;
  voucher_type: string;
  voucher_number: string | null;
  voucher_pdf: string | null;
  client: {
    doc_type: string;
    doc_number: string;
    full_name: string;
    phone: string;
    email: string;
  };
  details: {
    book_id: number;
    title: string;
    price: string;
    quantity: number;
    subtotal: string;
  }[];
}