export default class Ver1Rule {
  constructor(
    protected price: number,
    protected countActivator: number,
  ) {
    if (price <= 0 || countActivator <= 0) {
      throw new Error("Ver1Rule constructor error: Price and countActivator must be positive");
    }
    this.price = price;
    this.countActivator = countActivator;
  }
}
