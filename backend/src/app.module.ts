import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseGuard, SupabaseModule } from './supabase';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        PassportModule,
        SupabaseModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: SupabaseGuard,
        },
    ],
})
export class AppModule {}
