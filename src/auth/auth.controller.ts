import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ReqeustLink } from "./dto/requestlink.dto";
import { ClientInfoDecorator } from "src/common/decorators/client-info.decorator";
import type { ClientInfo } from "src/common/interfaces/client-info.interface";
import { VerifyLink } from "./dto/verifylink.dto";

@Controller('api/auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/request-authlink')
    RequestAuthLink(
        @Body() dto: ReqeustLink,
        @ClientInfoDecorator() client: ClientInfo,
    ) {
        return this.authService.CreateLoginLink(
            dto.email,
            client.ipAddress,
            client.userAgent
        )
    }

    @Post('/verify-authlink')
    VerifyAuthLink(
        @Body() dto: VerifyLink,
        @ClientInfoDecorator() client: ClientInfo,
    ) {
        return this.authService.verifyAuthLink(
            dto.email,
            dto.token,
            client.ipAddress,
            client.userAgent
        )
    }

}