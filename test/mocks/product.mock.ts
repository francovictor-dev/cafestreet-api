import { CreateProductDto } from '../../src/product/dto/create-product.dto';
import { UpdateProductDto } from '../../src/product/dto/update-product.dto';

export const productCreateMock: CreateProductDto = {
  name: 'Café Express',
  amount: 20.99,
  description: '',
  photoUrl:
    'https://cdn.pixabay.com/photo/2019/12/02/11/23/drink-4667507_1280.jpg',
};

export const productUpdateMock: UpdateProductDto = {
  amount: 21.99,
};
