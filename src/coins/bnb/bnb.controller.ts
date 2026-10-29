import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { BNB } from '../coins.registry';

@Controller(BNB.name)
export class BNBController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, BNB.Monthly, BNB.Daily, BNB.Hourly, BNB.Values);
    }
}
