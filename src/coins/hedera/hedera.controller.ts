import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { Hedera } from '../coins.registry';

@Controller(Hedera.name)
export class HederaController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, Hedera.Monthly, Hedera.Daily, Hedera.Hourly, Hedera.Values);
    }
}
