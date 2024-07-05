import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { EthereumDaily, EthereumHourly, EthereumMonthly, EthereumValues } from './ethereum.models';
import { BaseController } from '../base.controller';

@Controller('ethereum')
export class EthereumController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, EthereumMonthly.name, EthereumDaily.name, EthereumHourly.name, EthereumValues.name);
    }
}
