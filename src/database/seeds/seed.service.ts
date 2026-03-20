import { Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { DataSource, EntityManager } from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { Client } from '../../client/entities/client.entity';
import { Deliveryman } from '../../deliveryman/entities/deliveryman.entity';
import { Order } from '../../order/entities/order.entity';
import { OrderItem } from '../../order_item/entities/order_item.entity';
import { Product } from '../../product/entities/product.entity';
import { Profile, UserType } from '../../profile/entity/profile.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { User } from '../../user/entities/user.entity';
//@ts-ignore
import * as users from './data/users.json';
//@ts-ignore
import * as products from './data/products.json';
//@ts-ignore
import * as orders from './data/orders.json';
//@ts-ignore
import * as ratings from './data/rating.json';

@Injectable()
export class SeedService {
  constructor(private dataSource: DataSource) {}

  async userSeeds(manager: EntityManager) {
    for (const user of users) {
      const passwordHash = await argon2.hash(user.password);

      user.password = passwordHash;
      const userData = manager.create(User, {
        email: user.email,
        password: user.password,
      });

      await manager.save(User, userData);

      const profileData = manager.create(Profile, {
        userId: userData.id,
        userName: user.profile.userName,
        userType: user.profile.userType,
        ...userData,
      });

      await manager.save(Profile, profileData);

      for (const address of user.profile.addresses) {
        const addressesData = manager.create(Address, {
          ...address,
          profile: { userId: profileData.userId },
        });
        await manager.save(Address, addressesData);
      }

      if (profileData.userType == UserType.CLIENT) {
        const data = manager.create(Client, {
          userId: profileData.userId,
          profile: { userId: profileData.userId },
        });
        await manager.save(Client, data);
      }

      if (profileData.userType == UserType.DELIVERYMAN) {
        const data = manager.create(Deliveryman, {
          userId: profileData.userId,
          profile: { userId: profileData.userId },
        });
        await manager.save(Deliveryman, data);
      }

      if (profileData.userType == UserType.ADMIN) {
        const data = manager.create(Admin, {
          userId: profileData.userId,
          profile: { userId: profileData.userId },
        });
        await manager.save(Admin, data);
      }
    }
  }

  async productSeeds(manager: EntityManager) {
    for (const product of products) {
      const productData = manager.create(Product, product);
      await manager.save(Product, productData);
    }
  }

  async orderSeeds(manager: EntityManager) {
    for (const order of orders) {
      const orderData = manager.create(Order, {
        client: { userId: order.clientId },
        deliveryman: { userId: order.deliverymanId },
      });
      await manager.save(Order, orderData);

      for (const orderItem of order.orderItems) {
        const orderItemData = manager.create(OrderItem, {
          order: { id: orderData.id },
          product: { id: orderItem.productId },
          quantity: orderItem.quantity,
        });
        await manager.save(OrderItem, orderItemData);
      }
    }
  }

  async ratingSeeds(manager: EntityManager) {
    for (const rating of ratings) {
      const rationgData = manager.create(Rating, {
        client: { userId: rating.clientId },
        product: { id: rating.productId },
        message: rating.message,
        star: rating.star,
      });
      await manager.save(Rating, rationgData);
    }
  }

  async run() {
    const logger = new Logger('SEEDS');
    await this.dataSource.transaction(async (manager) => {
      await this.userSeeds(manager);
      logger.log('User seeds completeds');
      await this.productSeeds(manager);
      logger.log('Product seeds completeds');
      await this.orderSeeds(manager);
      logger.log('Order seeds completeds');
      await this.ratingSeeds(manager);
      logger.log('Rating seeds completeds');
    });
  }
}
