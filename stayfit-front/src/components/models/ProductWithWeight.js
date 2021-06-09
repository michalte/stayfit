export class ProductWithWeight{
    product;
    meal = null;
    productWeight;


/*    get getProductId() {
        return this.productId;
    }

    set setProductId(value) {
        this.productId = value;
    }

    get getProductWeight() {
        return this.productWeight;
    }

    set setProductWeight(value) {
        this.productWeight = value;
    }*/


    constructor(product, productWeight) {
        this.product = product;
        this.productWeight = productWeight;
    }
}