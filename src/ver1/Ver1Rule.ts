export default class Ver1Rule {
  public sku: string;
  public price: number;
  public countActivator: number;
  constructor(sku: string, price: number, countActivator: number) {
    this.sku = sku;
    this.price = price;
    this.countActivator = countActivator;
    if (price <= 0 || countActivator <= 0) {
      throw new Error("Ver1Rule constructor error: Price and countActivator must be positive");
    }
  }
}
