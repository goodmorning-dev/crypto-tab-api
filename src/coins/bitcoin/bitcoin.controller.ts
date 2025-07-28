import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { Bitcoin } from '../coins.registry';

@Controller(Bitcoin.name)
export class BitcoinController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, Bitcoin.Monthly, Bitcoin.Daily, Bitcoin.Hourly, Bitcoin.Values);
    }
}
