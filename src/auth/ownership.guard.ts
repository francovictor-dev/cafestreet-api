import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userIdFromToken = request.user.userId;
    const userIdFromParam = Number(request.params.id);

    return userIdFromToken === userIdFromParam;
  }
}
