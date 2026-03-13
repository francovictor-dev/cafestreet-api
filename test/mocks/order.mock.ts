import { CreateOrderDto } from '../../src/order/dto/create-order.dto';
import { UpdateProductDto } from '../../src/product/dto/update-product.dto';

export const orderCreateMock: CreateOrderDto = {
  clientId: 1,
  deliverymanId: 1,
  items: [
    {
      quantity: 2,
      //productId: 1,
    },
  ],
};

export const orderUpdateMock: UpdateProductDto = {
  amount: 21.99,
};
