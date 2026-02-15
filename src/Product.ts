import { requestProduct } from "./rest.js";
import { loadProduct, saveProduct } from "./lib/cache.js";
import { type CoinbaseProduct } from "./schemas/rest.js";
import { printError } from "./lib/error.js";

class Product {
  product_id: string;
  product: CoinbaseProduct | null = null;

  constructor(product_id: string) {
    this.product_id = product_id;
  }

  get base_increment() {
    if (!this.product) {
      throw new Error("cannot read base_increment of product");
    }
    return this.product.base_increment;
  }

  get price_increment() {
    if (!this.product) {
      throw new Error("cannot read price_increment of product");
    }
    return this.product.price_increment;
  }

  async update(force: boolean = false): Promise<CoinbaseProduct> {
    this.product = await Product.getProductInfo(this.product_id, force);
    return this.product;
  }

  static async getProductInfo(
    productId: string,
    forceUpdate: boolean = false,
  ): Promise<CoinbaseProduct> {
    let data: CoinbaseProduct;

    if (forceUpdate) {
      console.info(`getProductInfo => Force update for ${productId}`);
      data = await requestProduct(productId);
      saveProduct(productId, data);
    } else {
      try {
        data = loadProduct(productId);
        console.debug(`getProductInfo => Cache hit for ${productId}`);
      } catch (e) {
        printError(e);
        console.warn(`getProductInfo => Cache miss for ${productId}, fetching from Coinbase...`);
        data = await requestProduct(productId);
        saveProduct(productId, data);
      }
    }
    return data;
  }

  /**
   * Convert product ('BTC') to product ID ('BTC-USD')
   */
  static getProductId(product: string, currency: string = "USD"): string {
    if (!product) {
      throw new Error("Product.getProductId => missing product argument");
    }
    let productId = product.toUpperCase();
    if (!productId.includes("-")) {productId = `${productId}-${currency}`;}
    return productId;
  }

  static async getProductInstance(product: string): Promise<Product> {
    const productId = Product.getProductId(product);
    const productInstance = new Product(productId);
    await productInstance.update(false);
    return productInstance;
  }

  static ensureProduct(product: string): string {
    const DEFAULT_PRODUCT = "btc";
    if (!product) {
      console.warn(`Defaulting to ${DEFAULT_PRODUCT}`);
      product = DEFAULT_PRODUCT;
    }
    return product;
  }
}

export default Product;
