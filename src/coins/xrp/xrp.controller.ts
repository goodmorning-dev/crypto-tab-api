import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { XRP } from '../coins.registry';

@Controller(XRP.name)
export class XRPController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, XRP.Monthly, XRP.Daily, XRP.Hourly, XRP.Values);
    }
}
