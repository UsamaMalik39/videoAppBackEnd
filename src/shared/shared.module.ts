import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { FileService } from './services/files/files.service';
import { QueryService } from './services/query/query.service';

const providers = [
    ConfigService,
    QueryService,
    FileService
];
@Global()
@Module({
    providers: [ConfigService,QueryService,FileService],
    exports: [...providers],
})
export class SharedModule {}
