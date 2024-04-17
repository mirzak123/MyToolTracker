export interface Tool {
  id: number;
  name: string;
  barcode: string;
  price: number;
  entryDate: Date; // date when the tool was added to the database
  model: string;
  manufacturer: string;
  categoryId: number; // references category of the tool
  orderRequestId: number; // references order request that the tool was ordered from
  toolStatusId: number; // references status of the tool
}
