import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { DOGE } from '../coins.registry';

@Controller(DOGE.name)
export class DOGEController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, DOGE.Monthly, DOGE.Daily, DOGE.Hourly, DOGE.Values);
    }
}
