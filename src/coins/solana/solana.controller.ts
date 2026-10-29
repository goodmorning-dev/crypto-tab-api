import { Controller } from '@nestjs/common';
import { CoinsService } from '../coins.service';
import { BaseController } from '../base.controller';
import { Solana } from '../coins.registry';

@Controller(Solana.name)
export class SolanaController extends BaseController {
    constructor(coinsService: CoinsService) {
        super(coinsService, Solana.Monthly, Solana.Daily, Solana.Hourly, Solana.Values);
    }
}
