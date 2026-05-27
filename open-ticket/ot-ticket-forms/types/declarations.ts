import { api } from "#opendiscord";
import * as discord from "discord.js";
import { ODJsonConfig_DefaultForms, OTForms_Question, OTForms_ButtonQuestion, OTForms_DropdownQuestion, OTForms_ModalQuestion, OTForms_DropdownChoice, OTForms_ButtonChoice } from "./configDefaults.js";

declare module "#opendiscord-types" {
    export interface ODPluginManagerIdMappings {
        "ot-ticket-forms":api.ODPlugin
    }
    export interface ODConfigManagerIdMappings {
        "ot-ticket-forms:config":ODJsonConfig_DefaultForms
    }
    export interface ODCheckerManagerIdMappings {
        "ot-ticket-forms:config":api.ODChecker
    }
    export interface ODSlashCommandManagerIdMappings {
        "ot-ticket-forms:form":api.ODSlashCommand
    }
    export interface ODTextCommandManagerIdMappings {
        "ot-ticket-forms:form":api.ODTextCommand
    }
    export interface ODCommandResponderManagerIdMappings {
        "ot-ticket-forms:form":{origin:"slash"|"text",params:{},workers:"ot-ticket-forms:form"|"ot-ticket-forms:logs"},
    }
    export interface ODMessageManagerIdMappings {
        "ot-ticket-forms:start-form-message": { origin: "ticket" | "slash"; params: { formId: string, formName: string, formDescription: string, formColor: discord.ColorResolvable, acceptAnswers: boolean }; workers: "ot-ticket-forms:start-form-message" };
        "ot-ticket-forms:continue-message": { origin: "button"; params: { formId: string, sessionId: string, currentSection:number, totalSections:number, formColor: discord.ColorResolvable }; workers: "ot-ticket-forms:continue-message" };
        "ot-ticket-forms:question-message": { origin: "other"; params: { formId: string, sessionId: string, question: OTForms_ButtonQuestion|OTForms_DropdownQuestion, currentSection:number, totalSections:number, formColor: discord.ColorResolvable }; workers: "ot-ticket-forms:question-message" };
        "ot-ticket-forms:answers-message": { origin: "button" | "other"; params: { formId: string, sessionId: string, type: "initial" | "partial" | "completed", currentPageNumber: number, totalPages: number, currentPage: api.ODEmbedBuildResult }; workers: "ot-ticket-forms:answers-message" };
        "ot-ticket-forms:success-message": { origin: "slash" | "other"; params: {}; workers: "ot-ticket-forms:success-message" };
    }
    export interface ODEmbedManagerIdMappings {
        "ot-ticket-forms:start-form-embed": { origin: "ticket" | "slash"; params: { formName: string, formDescription: string, formColor: discord.ColorResolvable }; workers: "ot-ticket-forms:start-form-embed" };
        "ot-ticket-forms:continue-embed": { origin: "button"; params: { currentSection:number, totalSections:number, formColor: discord.ColorResolvable }; workers: "ot-ticket-forms:continue-embed" };
        "ot-ticket-forms:question-embed": { origin: "other"; params: { question: OTForms_ButtonQuestion|OTForms_DropdownQuestion, currentSection:number, totalSections:number, formColor: discord.ColorResolvable }; workers: "ot-ticket-forms:question-embed" };
        "ot-ticket-forms:answers-embed": { origin: "button" | "other"; params: { type: "initial" | "partial" | "completed", user: discord.User, formColor: discord.ColorResolvable, fields: api.ODEmbedData["fields"], timestamp: Date }; workers: "ot-ticket-forms:answers-embed" };
    }
    export interface ODButtonManagerIdMappings {
        "ot-ticket-forms:start-form-button": { origin: "ticket" | "slash"; params: { formId: string, enabled: boolean }; workers: "ot-ticket-forms:start-form-button" };
        "ot-ticket-forms:continue-button": { origin: "button"; params: { formId: string, sessionId: string }; workers: "ot-ticket-forms:continue-button" };
        "ot-ticket-forms:question-button": { origin: "other"; params: { formId: string, sessionId: string, choice: OTForms_ButtonChoice }; workers: "ot-ticket-forms:question-button" };
        "ot-ticket-forms:delete-answers-button": { origin: "button" | "other"; params: { formId: string, sessionId: string }; workers: "ot-ticket-forms:delete-answers-button" };
        "ot-ticket-forms:next-page-button": { origin: "button" | "other"; params: { currentPageNumber: number }; workers: "ot-ticket-forms:next-page-button" };
        "ot-ticket-forms:previous-page-button": { origin: "button" | "other"; params: { currentPageNumber: number }; workers: "ot-ticket-forms:previous-page-button" };
        "ot-ticket-forms:page-number-button": { origin: "button" | "other"; params: { currentPageNumber: number, totalPages: number }; workers: "ot-ticket-forms:page-number-button" };
    }
    export interface ODButtonResponderManagerIdMappings {
        "ot-ticket-forms:start-form-button":{origin:"button",params:{},workers:"ot-ticket-forms:start-form-button"},
        "ot-ticket-forms:continue-button":{origin:"button",params:{},workers:"ot-ticket-forms:continue-button"},
        "ot-ticket-forms:question-button":{origin:"button",params:{},workers:"ot-ticket-forms:question-button"},
        "ot-ticket-forms:delete-answers-button":{origin:"button",params:{},workers:"ot-ticket-forms:delete-answers-button"},
        "ot-ticket-forms:next-page-button":{origin:"button",params:{},workers:"ot-ticket-forms:next-page-button"},
        "ot-ticket-forms:previous-page-button":{origin:"button",params:{},workers:"ot-ticket-forms:previous-page-button"},
        "ot-ticket-forms:page-number-button":{origin:"button",params:{},workers:"ot-ticket-forms:page-number-button"},
    }
    export interface ODModalManagerIdMappings {
        "ot-ticket-forms:questions-modal":{origin:"button"|"panel-button"|"panel-dropdown"|"slash"|"ticket"|"other";params:{ formId: string, sessionId: string, formName:string, questions:OTForms_ModalQuestion[], currentSection:number, totalSections:number };workers:"ot-ticket-forms:questions-modal"},
    }   
    export interface ODModalResponderManagerIdMappings {
        "ot-ticket-forms:questions-modal":{origin:"modal";params:{};workers:"ot-ticket-forms:questions-modal"},
    }
    export interface ODDropdownManagerIdMappings {
        "ot-ticket-forms:question-dropdown": { origin: "other"; params: { formId: string, sessionId: string, choices: OTForms_DropdownChoice[], minValues: number, maxValues: number, placeholder: string }; workers: "ot-ticket-forms:question-dropdown" };
    }
    export interface ODDropdownResponderManagerIdMappings {
        "ot-ticket-forms:question-dropdown": { origin: "dropdown"; params: { }; workers: "ot-ticket-forms:question-dropdown" };
    }
    export interface ODGlobalDatabaseIdMappings {
        "ot-ticket-forms:answers-manager":{formId: string,sessionId: string,messageId: string | null,origin: "button" | "other",type: "initial" | "partial" | "completed",userId: string,formColor: discord.ColorResolvable,answers: { question: OTForms_Question, answer: string | null }[],currentPage: number,timestamp: number},
    }
}