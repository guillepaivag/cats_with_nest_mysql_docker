import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { Roles } from "./roles.decorator";
import { VerifyUserGuard } from "src/guards/verify-user.guard";
import { RolesGuard } from "../guard/roles.guard";

export const AuthAndRoles = (role: Role | Role[]): any => {
    return applyDecorators(
        Roles(role), 
        UseGuards(VerifyUserGuard, RolesGuard)
    )
}