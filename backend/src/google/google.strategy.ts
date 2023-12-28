import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth2'

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ['email', 'profile'],
            callbackURL: 'http://localhost:8000/api/v1/auth/google/callback'
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log("🚀 ~ profile:", profile)
        console.log("🚀 ~ refreshToken:", refreshToken)
        console.log("🚀 ~ accessToken:", accessToken)

        done(null, profile)
    }
}