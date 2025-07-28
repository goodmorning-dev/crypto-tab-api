import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { Ethereum } from '../coins.registry';

@Controller(Ethereum.name)
export class EthereumController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, Ethereum.Monthly, Ethereum.Daily, Ethereum.Hourly, Ethereum.Values);
    }
}
