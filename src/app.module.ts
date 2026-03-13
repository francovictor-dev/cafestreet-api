import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

import { DatabaseModule } from './database/database.module';

import { AddressModule } from './address/address.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { ProfileModule } from './profile/profile.module';
import { RatingModule } from './rating/rating.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    DatabaseModule,
    ProfileModule,
    AdminModule,
    ClientModule,
    DeliverymanModule,
    RatingModule,
    OrderModule,
    OrderItemModule,
    AddressModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
