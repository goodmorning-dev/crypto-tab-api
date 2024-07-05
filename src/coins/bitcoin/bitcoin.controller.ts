import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BitcoinDaily, BitcoinHourly, BitcoinMonthly, BitcoinValues } from './bitcoin.models';
import { BaseController } from '../base.controller';

@Controller('bitcoin')
export class BitcoinController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, BitcoinMonthly.name, BitcoinDaily.name, BitcoinHourly.name, BitcoinValues.name);
    }
}
