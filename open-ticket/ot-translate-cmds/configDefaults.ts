import { api, opendiscord, utilities } from "#opendiscord"
import * as discord from "discord.js"

export interface OTTranslateCmdsConfigChoice {
    name: string,
    nameTranslations: Record<discord.Locale,string>
}

export interface OTTranslateCmdsConfigOption {
    name: string,
    type: string,
    nameTranslations: Record<discord.Locale,string>,
    descriptionTranslations: Record<discord.Locale,string>,
    choices?: OTTranslateCmdsConfigChoice[],
    options?: OTTranslateCmdsConfigOption[]
}

export class OTTranslateCmdsConfig extends api.ODJsonConfig<{
    name: string,
    type: string,
    nameTranslations: Record<discord.Locale,string>,
    descriptionTranslations: Record<discord.Locale,string>,
    options?: OTTranslateCmdsConfigOption[]
}[]> {}