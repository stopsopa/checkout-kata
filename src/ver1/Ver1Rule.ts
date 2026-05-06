export default class Ver1Rule {
  constructor(
    public sku: string,
    public price: number,
    public countActivator: number,
  ) {
    if (price <= 0 || countActivator <= 0) {
      throw new Error("Ver1Rule constructor error: Price and countActivator must be positive");
    }
  }
}

