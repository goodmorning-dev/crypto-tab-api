import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { WALLET } from '../coins.registry';

@Controller(WALLET.name)
export class WALLETController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, WALLET.Monthly, WALLET.Daily, WALLET.Hourly, WALLET.Values);
    }
}
