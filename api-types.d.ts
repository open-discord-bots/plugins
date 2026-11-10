import * as discord from 'discord.js';
import * as fjs from 'formatted-json-stringify';

export declare namespace api {
    export {
        ODOpenTicketMain,
        ODMainManagers,
        ODMain,
        ODActionImplementation,
        ODActionManagerIdConstraint,
        ODActionManager,
        ODAction,
        ODPromiseVoid,
        ODOptionalPromise,
        ODValidButtonColor,
        ODProjectType,
        ODValidId,
        ODValidJsonType,
        ODInterfaceWithPartialProperty,
        ODDiscordIdType,
        ODNoGeneric,
        ODId,
        ODManagerChangeHelper,
        ODManagerData,
        ODManagerCallback,
        ODManagerAddCallback,
        ODManager,
        ODManagerWithSafety,
        ODVersionManagerIdConstraint,
        ODVersionManager,
        ODVersion,
        ODVersionMigrationFunctions,
        ODVersionMigration,
        ODHTTPGetRequest,
        ODHTTPPostRequest,
        ODEnvHelper,
        ODSystemError,
        ODPluginError,
        ODEasterEggs,
        ODBuilderImplementation,
        ODBuilderManager,
        ODComponentBuildResult,
        ODButtonManagerIdConstraint,
        ODButtonManager,
        ODButtonData,
        ODButtonInstance,
        ODButton,
        ODQuickButton,
        ODDropdownManagerIdConstraint,
        ODDropdownManager,
        ODDropdownData,
        ODDropdownInstance,
        ODDropdown,
        ODQuickDropdown,
        ODFileManagerIdConstraint,
        ODFileManager,
        ODFileData,
        ODFileBuildResult,
        ODFileInstance,
        ODFile,
        ODQuickFile,
        ODEmbedManagerIdConstraint,
        ODEmbedManager,
        ODEmbedData,
        ODEmbedBuildResult,
        ODEmbedInstance,
        ODEmbed,
        ODQuickEmbed,
        ODMessageManagerIdConstraint,
        ODMessageManager,
        ODMessageData,
        ODMessageBuildResult,
        ODMessageInstance,
        ODMessage,
        ODQuickMessage,
        ODModalManagerIdConstraint,
        ODModalManager,
        ODModalDataQuestion,
        ODModalData,
        ODModalBuildResult,
        ODModalInstance,
        ODModal,
        ODCheckerResult,
        ODCheckerManagerIdConstraint,
        ODCheckerManager,
        ODCheckerStorage,
        ODCheckerRenderer,
        ODDefaultCheckerRendererTranslations,
        ODDefaultCheckerRenderer,
        ODCheckerTranslationRegister,
        ODCheckerFunctionCallback,
        ODCheckerFunction,
        ODCheckerFunctionManagerIdConstraint,
        ODCheckerFunctionManager,
        ODCheckerLocationTrace,
        ODCheckerOptions,
        ODChecker,
        ODCheckerMessage,
        ODCheckerStructureOptions,
        ODCheckerStructure,
        ODCheckerObjectStructureOptions,
        ODCheckerObjectStructure,
        ODCheckerStringStructureOptions,
        ODCheckerStringStructure,
        ODCheckerNumberStructureOptions,
        ODCheckerNumberStructure,
        ODCheckerBooleanStructureOptions,
        ODCheckerBooleanStructure,
        ODCheckerArrayStructureOptions,
        ODCheckerArrayStructure,
        ODCheckerNullStructureOptions,
        ODCheckerNullStructure,
        ODCheckerTypeSwitchStructureOptions,
        ODCheckerTypeSwitchStructure,
        ODCheckerObjectSwitchStructureOptions,
        ODCheckerObjectSwitchStructure,
        ODCheckerEnabledObjectStructureOptions,
        ODCheckerEnabledObjectStructure,
        ODCheckerCustomStructure_DiscordId,
        ODCheckerCustomStructure_DiscordIdArray,
        ODCheckerCustomStructure_DiscordToken,
        ODCheckerCustomStructure_HexColor,
        ODCheckerCustomStructure_EmojiString,
        ODCheckerCustomStructureOptions_UrlString,
        ODCheckerCustomStructure_UrlString,
        ODCheckerCustomStructure_UniqueId,
        ODCheckerCustomStructure_UniqueIdArray,
        ODClientIntents,
        ODClientPriviligedIntents,
        ODClientPartials,
        ODClientPermissions,
        ODClientManager,
        ODClientActivityType,
        ODClientActivityMode,
        ODClientActivityManager,
        ODSlashCommandUniversalTranslation,
        ODSlashCommandUniversalOptionChoice,
        ODSlashCommandUniversalOption,
        ODSlashCommandUniversalCommand,
        ODSlashCommandBuilder,
        ODSlashCommandComparator,
        ODSlashCommandInteractionCallback,
        ODSlashCommandRegisteredResult,
        ODSlashCommandManagerIdConstraint,
        ODSlashCommandManager,
        ODSlashCommandUpdateFunction,
        ODSlashCommand,
        ODTextCommandBuilderBaseOptionType,
        ODTextCommandBuilderBaseOption,
        ODTextCommandBuilderStringOption,
        ODTextCommandBuilderNumberOption,
        ODTextCommandBuilderBooleanOption,
        ODTextCommandBuilderChannelOption,
        ODTextCommandBuilderRoleOption,
        ODTextCommandBuilderUserOption,
        ODTextCommandBuilderGuildMemberOption,
        ODTextCommandBuilderMentionableOption,
        ODTextCommandBuilderOption,
        ODTextCommandBuilder,
        ODTextCommand,
        ODTextCommandInteractionOptionBase,
        ODTextCommandInteractionOption,
        ODTextCommandInteractionCallback,
        ODTextCommandErrorBase,
        ODTextCommandErrorUnknownPrefix,
        ODTextCommandErrorUnknownCommand,
        ODTextCommandErrorInvalidOptionReason,
        ODTextCommandErrorInvalidOption,
        ODTextCommandErrorMissingOption,
        ODTextCommandError,
        ODTextCommandErrorCallback,
        ODTextCommandManagerIdConstraint,
        ODTextCommandManager,
        ODContextMenuUniversalMenu,
        ODContextMenuBuilderMessage,
        ODContextMenuBuilderUser,
        ODContextMenuBuilder,
        ODContextMenuComparator,
        ODContextMenuInteractionCallback,
        ODContextMenuRegisteredResult,
        ODContextMenuManagerIdConstraint,
        ODContextMenuManager,
        ODContextMenuUpdateFunction,
        ODContextMenu,
        ODAutocompleteInteractionCallback,
        ODAutocompleteManager,
        ODComponentFactoryInstance,
        ODComponentFactory,
        ODComponentManagerIdConstraint,
        ODBaseComponentManager,
        ODComponentModifierManagerIdConstraint,
        ODComponentModifierManager,
        ODSharedComponentManagerIdConstraint,
        ODSharedComponentManager,
        ODMessageComponentManager,
        ODModalComponentManager,
        ODComponentManager,
        ODComponentInferBuildResult,
        ODComponentType,
        ODComponentForType,
        ODComponent,
        ODGroupComponent,
        ODParentComponent,
        ODMessageComponentModifier,
        ODMessageComponentData,
        ODValidMessageComponents,
        ODMessageComponentBuildResult,
        ODMessageComponent,
        ODSimpleMessageComponentData,
        ODValidSimpleMessageComponents,
        ODSimpleMessageComponent,
        ODModalComponentData,
        ODValidModalComponents,
        ODModalComponent,
        ODActionRowComponentData,
        ODValidActionRowComponents,
        ODActionRowComponent,
        ODContainerComponentData,
        ODValidContainerComponents,
        ODContainerComponent,
        ODSectionComponentData,
        ODSectionComponent,
        ODLabelComponentData,
        ODValidLabelComponents,
        ODLabelComponent,
        ODSeparatorComponentData,
        ODSeparatorComponent,
        ODTextComponentData,
        ODTextComponent,
        ODFileComponentData,
        ODFileComponent,
        ODGalleryComponentData,
        ODGalleryComponent,
        ODThumbnailComponentData,
        ODThumbnailComponent,
        ODContentComponentData,
        ODContentComponent,
        ODEmbedComponentData,
        ODEmbedComponent,
        ODPollComponentData,
        ODPollComponent,
        ODButtonComponentData,
        ODButtonComponent,
        ODShortInputComponentData,
        ODShortInputComponent,
        ODParagraphInputComponentData,
        ODParagraphInputComponent,
        ODDropdownComponentData,
        ODDropdownComponent,
        ODRadioGroupComponentData,
        ODRadioGroupComponent,
        ODCheckboxGroupComponentData,
        ODCheckboxGroupComponent,
        ODCheckboxComponentData,
        ODCheckboxComponent,
        ODFileUploadComponentData,
        ODFileUploadComponent,
        ODConfigManagerIdConstraint,
        ODConfigManager,
        ODConfig,
        ODJsonConfig,
        ODJsonCommentsConfig,
        ODMemoryConfig,
        ODValidConsoleColor,
        ODConsoleMessageParam,
        ODConsoleMessage,
        ODInfoConsoleMessage,
        ODSystemConsoleMessage,
        ODPluginConsoleMessage,
        ODDebugConsoleMessage,
        ODWarningConsoleMessage,
        ODErrorConsoleMessage,
        ODError,
        ODConsoleMessageTypes,
        ODConsoleManager,
        ODDebugFileManager,
        ODDebugger,
        ODLiveStatusColor,
        ODLiveStatusSourceData,
        ODLiveStatusSource,
        ODLiveStatusFileSource,
        ODLiveStatusUrlSource,
        ODLiveStatusManagerIdConstraint,
        ODLiveStatusManager,
        ODLiveStatusRenderer,
        ODCooldownManagerIdConstraint,
        ODCooldownManager,
        ODCooldownData,
        ODCooldown,
        ODCounterCooldown,
        ODIncrementalCounterCooldown,
        ODTimeoutCooldown,
        ODIncrementalTimeoutCooldown,
        ODDatabaseManagerIdConstraint,
        ODDatabaseManager,
        ODDatabaseIdConstraint,
        ODDatabase,
        ODJsonDatabaseStructure,
        ODJsonDatabase,
        ODFormattedJsonDatabase,
        ODEventCallback,
        ODEvent,
        ODEventManagerIdConstraint,
        ODEventManager,
        ODFlag,
        ODFlagManagerIdConstraint,
        ODFlagManager,
        ODFuseBooleans,
        ODFuseStrings,
        ODFuseNumbers,
        ODFuseStringArray,
        ODFuseManager,
        ODSharedFuseList,
        ODSharedFuseManager,
        ODHelpMenuComponent,
        ODHelpMenuTextComponent,
        ODHelpMenuCommandComponentOption,
        ODHelpMenuCommandComponentSettings,
        ODHelpMenuCommandComponent,
        ODHelpMenuCategoryIdConstraint,
        ODHelpMenuCategory,
        ODHelpMenuRenderResult,
        ODHelpMenuManagerIdConstraint,
        ODHelpMenuManager,
        ODLanguageMetadata,
        ODLanguageManagerIdConstraint,
        ODLanguageManager,
        ODLanguage,
        ODJsonLanguage,
        ODPermissionType,
        ODPermissionScope,
        ODPermissionResult,
        ODPermissionLevel,
        ODPermission,
        ODPermissionSettings,
        ODPermissionCalculationCallback,
        ODPermissionCommandResult,
        ODPermissionManagerIdConstraint,
        ODPermissionManager,
        ODUnknownCrashedPlugin,
        ODPluginManagerIdConstraint,
        ODPluginManager,
        ODPluginData,
        ODPluginDetails,
        ODPlugin,
        ODPluginClassManagerIdConstraint,
        ODPluginClassManager,
        ODPostManagerIdConstraint,
        ODPostManager,
        ODPost,
        ODProgressBarRendererManagerIdConstraint,
        ODProgressBarRendererManager,
        ODProgressBarManagerIdConstraint,
        ODProgressBarManager,
        ODProgressBarRenderFunc,
        ODProgressBarRenderer,
        ODProgressBar,
        ODTimedProgressBar,
        ODManualProgressBar,
        ODDefaultProgressBarRendererLabel,
        ODDefaultProgressBarRendererSettings,
        ODDefaultProgressBarRenderer,
        ODResponderImplementation,
        ODResponderTimeoutErrorCallback,
        ODResponderSendResult,
        ODResponderManager,
        ODBaseResponderInstance,
        ODCommandResponderManagerIdConstraint,
        ODCommandResponderManager,
        ODCommandResponderInstanceOptions,
        ODCommandResponderInstance,
        ODCommandResponder,
        ODButtonResponderManagerIdConstraint,
        ODButtonResponderManager,
        ODButtonResponderInstance,
        ODButtonResponder,
        ODDropdownResponderManagerIdConstraint,
        ODDropdownResponderManager,
        ODDropdownResponderInstanceValues,
        ODDropdownResponderInstance,
        ODDropdownResponder,
        ODModalResponderManagerIdConstraint,
        ODModalResponderManager,
        ODModalResponderInstanceValues,
        ODModalResponderInstance,
        ODModalResponder,
        ODContextMenuResponderManagerIdConstraint,
        ODContextMenuResponderManager,
        ODContextMenuResponderInstance,
        ODContextMenuResponder,
        ODAutocompleteResponderManagerIdConstraint,
        ODAutocompleteResponderManager,
        ODAutocompleteResponderInstance,
        ODAutocompleteResponder,
        ODSessionManagerIdConstraint,
        ODSessionManager,
        ODSessionInstance,
        ODSessionTimeoutCallback,
        ODSession,
        ODStartScreenComponentRenderCallback,
        ODStartScreenManagerIdConstraint,
        ODStartScreenManager,
        ODStartScreenComponent,
        ODStartScreenProperty,
        ODStartScreenLogoComponent,
        ODStartScreenHeaderAlignmentSettings,
        ODStartScreenHeaderComponent,
        ODStartScreenCategoryComponent,
        ODStartScreenPropertiesCategoryComponent,
        ODStartScreenFlagsCategoryComponent,
        ODStartScreenPluginsCategoryComponent,
        ODStartScreenLiveStatusCategoryComponent,
        ODStartScreenLogCategoryComponent,
        ODStateKey,
        ODStateData,
        ODStateSettings,
        ODState,
        ODStateManagerIdConstraint,
        ODStateManager,
        ODValidStatisticValue,
        ODStatisticManagerInitCallback,
        ODStatisticScopeSetMode,
        ODStatisticManagerIdConstraint,
        ODStatisticManager,
        ODStatisticScopeIdConstraint,
        ODStatisticScope,
        ODStatisticGlobalScope,
        ODStatisticRenderer,
        ODStatistic,
        ODBaseStatistic,
        ODDynamicStatisticRenderer,
        ODDynamicStatistic,
        ODTask,
        ODTaskManagerIdConstraint,
        ODTaskManager,
        ODVerifyBar,
        ODVerifyBarManagerIdConstraint,
        ODVerifyBarManager,
        ODWorkerCallback,
        ODWorker,
        ODWorkerManager,
        ODActionManagerIdMappings,
        ODMappedActionManager,
        ODVersionManagerIdMappings,
        ODMappedVersionManager,
        ODButtonManagerIdMappings,
        ODDropdownManagerIdMappings,
        ODFileManagerIdMappings,
        ODEmbedManagerIdMappings,
        ODMessageManagerIdMappings,
        ODModalManagerIdMappings,
        ODMappedButtonManager,
        ODMappedDropdownManager,
        ODMappedFileManager,
        ODMappedEmbedManager,
        ODMappedMessageManager,
        ODMappedModalManager,
        ODMappedBuilderManager,
        ODCheckerManagerIdMappings,
        ODCheckerTranslationRegisterOtherIdMappings,
        ODCheckerTranslationRegisterMessageIdMappings,
        ODCheckerFunctionManagerIdMappings,
        ODMappedCheckerManager,
        ODMappedCheckerFunctionManager,
        ODMappedCheckerTranslationRegister,
        ODSlashCommandManagerIdMappings,
        ODTextCommandManagerIdMappings,
        ODContextMenuManagerIdMappings,
        ODMappedClientManager,
        ODMappedSlashCommandManager,
        ODMappedTextCommandManager,
        ODMappedContextMenuManager,
        ODSharedComponentManagerIdMappings,
        ODMessageComponentManagerIdMappings,
        ODModalComponentManagerIdMappings,
        ODComponentModifierManagerIdMappings,
        ODMappedSharedComponentManager,
        ODMappedMessageComponentManager,
        ODMappedModalComponentManager,
        ODMappedComponentModifierManager,
        ODMappedComponentManager,
        ODConfigManagerIdMappings,
        ODGeneralJsonConfig_Status,
        ODGeneralJsonConfig_MessageSettings,
        ODGeneralJsonConfig_CmdPermissionSettingsType,
        ODGeneralJsonConfig_SystemLogs,
        ODGeneralJsonConfig_SystemLimits,
        ODGeneralJsonConfig_SystemChannelTopic,
        ODGeneralJsonConfig_SystemPermissions,
        ODGeneralJsonConfig_LogMessages,
        ODGeneralJsonConfig_TicketSystem,
        ODGeneralJsonConfig_GeneralData,
        ODOptionsJsonConfig_BaseOption,
        ODOptionsJsonConfig_OptionButtonSettings,
        ODOptionsJsonConfig_TicketOptionEmbedSettings,
        ODOptionsJsonConfig_TicketOptionPingSettings,
        ODOptionsJsonConfig_TicketOptionChannelSettings,
        ODOptionsJsonConfig_TicketOption,
        ODOptionsJsonConfig_WebsiteOption,
        ODOptionsJsonConfig_RoleOption,
        ODOptionsJsonConfig_SubPanelOption,
        ODOptionsJsonConfig_OptionsData,
        ODPanelsJsonConfig_PanelEmbedSettings,
        ODPanelsJsonConfig_PanelSettings,
        ODPanelsJsonConfig_Panel,
        ODPanelsJsonConfig_PanelsData,
        ODQuestionsJsonConfig_TextLengthLimits,
        ODQuestionsJsonConfig_CheckboxLimits,
        ODQuestionsJsonConfig_FileUploadLimits,
        ODQuestionsJsonConfig_DropdownChoice,
        ODQuestionsJsonConfig_RadioCheckboxChoice,
        ODQuestionsJsonConfig_BaseQuestion,
        ODQuestionsJsonConfig_TextDisplayQuestion,
        ODQuestionsJsonConfig_ShortQuestion,
        ODQuestionsJsonConfig_ParagraphQuestion,
        ODQuestionsJsonConfig_DropdownQuestion,
        ODQuestionsJsonConfig_RadioSelectQuestion,
        ODQuestionsJsonConfig_CheckboxSelectQuestion,
        ODQuestionsJsonConfig_FileUploadQuestion,
        ODQuestionsJsonConfig_QuestionsData,
        ODTranscriptsJsonConfig_TranscriptsTextLayout,
        ODTranscriptsJsonConfig_TranscriptsHtmlLayout,
        ODTranscriptsJsonConfig_TranscriptsData,
        ODMappedConfigManager,
        ODGeneralJsonCommentsConfig,
        ODQuestionsJsonCommentsConfig,
        ODOptionsJsonCommentsConfig,
        ODPanelsJsonCommentsConfig,
        ODTranscriptsJsonCommentsConfig,
        ODLiveStatusManagerIdMappings,
        ODMappedLiveStatusManager,
        ODCooldownManagerIdMappings,
        ODMappedCooldownManager,
        ODDatabaseManagerIdMappings,
        ODGlobalDatabaseIdMappings,
        ODTicketsDatabaseIdMappings,
        ODUsersDatabaseIdMappings,
        ODOptionsDatabaseIdMappings,
        ODTranscriptsDatabaseIdMappings,
        ODMappedDatabaseManager,
        ODGlobalDatabase,
        ODStatsDatabase,
        ODTicketsDatabase,
        ODUsersDatabase,
        ODOptionsDatabase,
        ODTranscriptsDatabase,
        ODMessageStatesDatabase,
        ODEventManagerIdMappings,
        ODMappedEventManager,
        ODFlagManagerIdMappings,
        ODMappedFlagManager,
        ODOpenTicketFuseList,
        ODHelpMenuManagerIdMappings,
        ODGeneralHelpMenuCategoryIdMappings,
        ODBasicTicketHelpMenuCategoryIdMappings,
        ODAdvancedTicketHelpMenuCategoryIdMappings,
        ODUserTicketHelpMenuCategoryIdMappings,
        ODAdminHelpMenuCategoryIdMappings,
        ODAdvancedHelpMenuCategoryIdMappings,
        ODExtraHelpMenuCategoryIdMappings,
        ODMappedHelpMenuManager,
        ODGeneralHelpMenuCategory,
        ODBasicTicketHelpMenuCategory,
        ODAdvancedTicketHelpMenuCategory,
        ODUserTicketHelpMenuCategory,
        ODAdminHelpMenuCategory,
        ODAdvancedHelpMenuCategory,
        ODExtraHelpMenuCategory,
        ODLanguageManagerIdMappings,
        ODLanguageManagerTranslationIdMappings,
        ODMappedLanguageManager,
        ODPermissionManagerIdMappings,
        ODPermissionEmbedType,
        ODMappedPermissionManager,
        ODPluginManagerIdMappings,
        ODPluginClassManagerIdMappings,
        ODMappedPluginManager,
        ODMappedPluginClassManager,
        ODPostManagerIdMappings,
        ODMappedPostManager,
        ODProgressBarManagerIdMappings,
        ODProgressBarRendererManagerIdMappings,
        ODMappedProgressBarManager,
        ODMappedProgressBarRendererManager,
        ODCommandResponderManagerIdMappings,
        ODButtonResponderManagerIdMappings,
        ODDropdownResponderManagerIdMappings,
        ODModalResponderManagerIdMappings,
        ODContextMenuResponderManagerIdMappings,
        ODAutocompleteResponderManagerIdMappings,
        ODMappedCommandResponderManager,
        ODMappedButtonResponderManager,
        ODMappedDropdownResponderManager,
        ODMappedModalResponderManager,
        ODMappedContextMenuResponderManager,
        ODMappedAutocompleteResponderManager,
        ODMappedResponderManager,
        ODSessionManagerIdMappings,
        ODMappedSessionManager,
        ODStartScreenManagerIdMappings,
        ODMappedStartScreenManager,
        ODStateManagerIdMappings,
        ODMappedStateManager,
        ODInteractiveMessageState,
        ODClearMessageState,
        ODPanelMessageState,
        ODStatisticManagerIdMappings,
        ODGlobalStatisticScopeIdMappings,
        ODSystemStatisticScopeIdMappings,
        ODUserStatisticScopeIdMappings,
        ODTicketStatisticScopeIdMappings,
        ODParticipantsStatisticScopeIdMappings,
        ODMessagesStatisticScopeIdMappings,
        ODMappedStatisticManager,
        ODGlobalStatisticScope,
        ODSystemStatisticScope,
        ODUserStatisticScope,
        ODTicketStatisticScope,
        ODParticipantsStatisticScope,
        ODMessagesStatisticScope,
        ODTaskManagerIdMappings,
        ODMappedTaskManager,
        ODVerifyBarManagerIdMappings,
        ODVerifyButtonId,
        ODMappedVerifyBarManager,
        ODBlacklist,
        ODBlacklistManager,
        ODOptionIdConstraint,
        ODTicketOptionIdMappings,
        ODWebsiteOptionIdMappings,
        ODRoleOptionIdMappings,
        ODSubPanelOptionIdMappings,
        ODOptionManager,
        ODOptionDataJson,
        ODOptionJson,
        ODOption,
        ODOptionData,
        ODTicketOption,
        ODWebsiteOption,
        ODRoleOption,
        ODSubPanelOption,
        ODOptionSuffixManager,
        ODOptionSuffix,
        ODOptionUserNameSuffix,
        ODOptionUserNicknameSuffix,
        ODOptionUserIdSuffix,
        ODOptionCounterDynamicSuffix,
        ODOptionCounterFixedSuffix,
        ODOptionRandomNumberSuffix,
        ODOptionRandomHexSuffix,
        ODPanelIdConstraint,
        ODPanelIdMappings,
        ODPanelManager,
        ODPanelDataJson,
        ODPanelJson,
        ODPanel,
        ODPanelData,
        ODPriorityManagerIdConstraint,
        ODPriorityManagerIdMappings,
        ODPriorityManager,
        ODMappedPriorityManager,
        ODPriorityLevel,
        ODQuestionIdConstraint,
        ODShortQuestionIdMappings,
        ODParagraphQuestionIdMappings,
        ODDropdownQuestionIdMappings,
        ODRadioSelectQuestionIdMappings,
        ODCheckboxSelectQuestionIdMappings,
        ODFileUploadQuestionIdMappings,
        ODTextDisplayQuestionIdMappings,
        ODQuestionManager,
        ODQuestionDataJson,
        ODQuestionJson,
        ODQuestion,
        ODQuestionData,
        ODQuestionAnswer,
        ODShortQuestion,
        ODParagraphQuestion,
        ODDropdownQuestion,
        ODRadioSelectQuestion,
        ODCheckboxSelectQuestion,
        ODFileUploadQuestion,
        ODTextDisplayQuestion,
        ODRoleIdConstraint,
        ODRoleIdMappings,
        ODRoleManager,
        ODRoleDataJson,
        ODRoleJson,
        ODRole,
        ODRoleData,
        ODRoleUpdateResult,
        ODRoleUpdateMode,
        ODTicketIdConstraint,
        ODTicketIdMappings,
        ODTicketManager,
        ODTicketDataJson,
        ODTicketJson,
        ODTicket,
        ODTicketData,
        ODTicketClearFilter,
        ODTranscriptManagerIdConstraint,
        ODTranscriptManagerIdMappings,
        ODTranscriptManager,
        ODTranscriptHistoryData,
        ODMappedTranscriptManager,
        ODTranscriptCompilerInitFunction,
        ODTranscriptCompilerCompileFunction,
        ODTranscriptCompilerReadyFunction,
        ODTranscriptCompilerInitResult,
        ODTranscriptCompilerCompileResult,
        ODTranscriptCompilerReadyResult,
        ODTranscriptCompiler,
        ODTranscriptCollector,
        ODTranscriptCollectorIncludeSettings,
        ODTranscriptMessageData,
        ODTranscriptMessageType,
        ODTranscriptUserData,
        ODTranscriptEmbedData,
        ODTranscriptEmbedFieldData,
        ODTranscriptFileData,
        ODTranscriptComponentRowData,
        ODTranscriptComponentData,
        ODTranscriptButtonComponentData,
        ODTranscriptDropdownComponentData,
        ODTranscriptDropdownComponentOptionData,
        ODTranscriptReplyData,
        ODTranscriptInteractionReplyData,
        ODTranscriptMessageReplyData,
        ODTranscriptEmojiData,
        ODTranscriptReactionData,
        ODTranscriptHtmlV2Data,
        ODTranscriptHtmlV2Response
    }
}

declare namespace api_2 {
    export {
        ODMainManagers,
        ODMain,
        ODActionImplementation,
        ODActionManagerIdConstraint,
        ODActionManager,
        ODAction,
        ODPromiseVoid,
        ODOptionalPromise,
        ODValidButtonColor,
        ODProjectType,
        ODValidId,
        ODValidJsonType,
        ODInterfaceWithPartialProperty,
        ODDiscordIdType,
        ODNoGeneric,
        ODId,
        ODManagerChangeHelper,
        ODManagerData,
        ODManagerCallback,
        ODManagerAddCallback,
        ODManager,
        ODManagerWithSafety,
        ODVersionManagerIdConstraint,
        ODVersionManager,
        ODVersion,
        ODVersionMigrationFunctions,
        ODVersionMigration,
        ODHTTPGetRequest,
        ODHTTPPostRequest,
        ODEnvHelper,
        ODSystemError,
        ODPluginError,
        ODEasterEggs,
        ODBuilderImplementation,
        ODBuilderManager,
        ODComponentBuildResult,
        ODButtonManagerIdConstraint,
        ODButtonManager,
        ODButtonData,
        ODButtonInstance,
        ODButton,
        ODQuickButton,
        ODDropdownManagerIdConstraint,
        ODDropdownManager,
        ODDropdownData,
        ODDropdownInstance,
        ODDropdown,
        ODQuickDropdown,
        ODFileManagerIdConstraint,
        ODFileManager,
        ODFileData,
        ODFileBuildResult,
        ODFileInstance,
        ODFile,
        ODQuickFile,
        ODEmbedManagerIdConstraint,
        ODEmbedManager,
        ODEmbedData,
        ODEmbedBuildResult,
        ODEmbedInstance,
        ODEmbed,
        ODQuickEmbed,
        ODMessageManagerIdConstraint,
        ODMessageManager,
        ODMessageData,
        ODMessageBuildResult,
        ODMessageInstance,
        ODMessage,
        ODQuickMessage,
        ODModalManagerIdConstraint,
        ODModalManager,
        ODModalDataQuestion,
        ODModalData,
        ODModalBuildResult,
        ODModalInstance,
        ODModal,
        ODCheckerResult,
        ODCheckerManagerIdConstraint,
        ODCheckerManager,
        ODCheckerStorage,
        ODCheckerRenderer,
        ODDefaultCheckerRendererTranslations,
        ODDefaultCheckerRenderer,
        ODCheckerTranslationRegister,
        ODCheckerFunctionCallback,
        ODCheckerFunction,
        ODCheckerFunctionManagerIdConstraint,
        ODCheckerFunctionManager,
        ODCheckerLocationTrace,
        ODCheckerOptions,
        ODChecker,
        ODCheckerMessage,
        ODCheckerStructureOptions,
        ODCheckerStructure,
        ODCheckerObjectStructureOptions,
        ODCheckerObjectStructure,
        ODCheckerStringStructureOptions,
        ODCheckerStringStructure,
        ODCheckerNumberStructureOptions,
        ODCheckerNumberStructure,
        ODCheckerBooleanStructureOptions,
        ODCheckerBooleanStructure,
        ODCheckerArrayStructureOptions,
        ODCheckerArrayStructure,
        ODCheckerNullStructureOptions,
        ODCheckerNullStructure,
        ODCheckerTypeSwitchStructureOptions,
        ODCheckerTypeSwitchStructure,
        ODCheckerObjectSwitchStructureOptions,
        ODCheckerObjectSwitchStructure,
        ODCheckerEnabledObjectStructureOptions,
        ODCheckerEnabledObjectStructure,
        ODCheckerCustomStructure_DiscordId,
        ODCheckerCustomStructure_DiscordIdArray,
        ODCheckerCustomStructure_DiscordToken,
        ODCheckerCustomStructure_HexColor,
        ODCheckerCustomStructure_EmojiString,
        ODCheckerCustomStructureOptions_UrlString,
        ODCheckerCustomStructure_UrlString,
        ODCheckerCustomStructure_UniqueId,
        ODCheckerCustomStructure_UniqueIdArray,
        ODClientIntents,
        ODClientPriviligedIntents,
        ODClientPartials,
        ODClientPermissions,
        ODClientManager,
        ODClientActivityType,
        ODClientActivityMode,
        ODClientActivityManager,
        ODSlashCommandUniversalTranslation,
        ODSlashCommandUniversalOptionChoice,
        ODSlashCommandUniversalOption,
        ODSlashCommandUniversalCommand,
        ODSlashCommandBuilder,
        ODSlashCommandComparator,
        ODSlashCommandInteractionCallback,
        ODSlashCommandRegisteredResult,
        ODSlashCommandManagerIdConstraint,
        ODSlashCommandManager,
        ODSlashCommandUpdateFunction,
        ODSlashCommand,
        ODTextCommandBuilderBaseOptionType,
        ODTextCommandBuilderBaseOption,
        ODTextCommandBuilderStringOption,
        ODTextCommandBuilderNumberOption,
        ODTextCommandBuilderBooleanOption,
        ODTextCommandBuilderChannelOption,
        ODTextCommandBuilderRoleOption,
        ODTextCommandBuilderUserOption,
        ODTextCommandBuilderGuildMemberOption,
        ODTextCommandBuilderMentionableOption,
        ODTextCommandBuilderOption,
        ODTextCommandBuilder,
        ODTextCommand,
        ODTextCommandInteractionOptionBase,
        ODTextCommandInteractionOption,
        ODTextCommandInteractionCallback,
        ODTextCommandErrorBase,
        ODTextCommandErrorUnknownPrefix,
        ODTextCommandErrorUnknownCommand,
        ODTextCommandErrorInvalidOptionReason,
        ODTextCommandErrorInvalidOption,
        ODTextCommandErrorMissingOption,
        ODTextCommandError,
        ODTextCommandErrorCallback,
        ODTextCommandManagerIdConstraint,
        ODTextCommandManager,
        ODContextMenuUniversalMenu,
        ODContextMenuBuilderMessage,
        ODContextMenuBuilderUser,
        ODContextMenuBuilder,
        ODContextMenuComparator,
        ODContextMenuInteractionCallback,
        ODContextMenuRegisteredResult,
        ODContextMenuManagerIdConstraint,
        ODContextMenuManager,
        ODContextMenuUpdateFunction,
        ODContextMenu,
        ODAutocompleteInteractionCallback,
        ODAutocompleteManager,
        ODComponentFactoryInstance,
        ODComponentFactory,
        ODComponentManagerIdConstraint,
        ODBaseComponentManager,
        ODComponentModifierManagerIdConstraint,
        ODComponentModifierManager,
        ODSharedComponentManagerIdConstraint,
        ODSharedComponentManager,
        ODMessageComponentManager,
        ODModalComponentManager,
        ODComponentManager,
        ODComponentInferBuildResult,
        ODComponentType,
        ODComponentForType,
        ODComponent,
        ODGroupComponent,
        ODParentComponent,
        ODMessageComponentModifier,
        ODMessageComponentData,
        ODValidMessageComponents,
        ODMessageComponentBuildResult,
        ODMessageComponent,
        ODSimpleMessageComponentData,
        ODValidSimpleMessageComponents,
        ODSimpleMessageComponent,
        ODModalComponentData,
        ODValidModalComponents,
        ODModalComponent,
        ODActionRowComponentData,
        ODValidActionRowComponents,
        ODActionRowComponent,
        ODContainerComponentData,
        ODValidContainerComponents,
        ODContainerComponent,
        ODSectionComponentData,
        ODSectionComponent,
        ODLabelComponentData,
        ODValidLabelComponents,
        ODLabelComponent,
        ODSeparatorComponentData,
        ODSeparatorComponent,
        ODTextComponentData,
        ODTextComponent,
        ODFileComponentData,
        ODFileComponent,
        ODGalleryComponentData,
        ODGalleryComponent,
        ODThumbnailComponentData,
        ODThumbnailComponent,
        ODContentComponentData,
        ODContentComponent,
        ODEmbedComponentData,
        ODEmbedComponent,
        ODPollComponentData,
        ODPollComponent,
        ODButtonComponentData,
        ODButtonComponent,
        ODShortInputComponentData,
        ODShortInputComponent,
        ODParagraphInputComponentData,
        ODParagraphInputComponent,
        ODDropdownComponentData,
        ODDropdownComponent,
        ODRadioGroupComponentData,
        ODRadioGroupComponent,
        ODCheckboxGroupComponentData,
        ODCheckboxGroupComponent,
        ODCheckboxComponentData,
        ODCheckboxComponent,
        ODFileUploadComponentData,
        ODFileUploadComponent,
        ODConfigManagerIdConstraint,
        ODConfigManager,
        ODConfig,
        ODJsonConfig,
        ODJsonCommentsConfig,
        ODMemoryConfig,
        ODValidConsoleColor,
        ODConsoleMessageParam,
        ODConsoleMessage,
        ODInfoConsoleMessage,
        ODSystemConsoleMessage,
        ODPluginConsoleMessage,
        ODDebugConsoleMessage,
        ODWarningConsoleMessage,
        ODErrorConsoleMessage,
        ODError,
        ODConsoleMessageTypes,
        ODConsoleManager,
        ODDebugFileManager,
        ODDebugger,
        ODLiveStatusColor,
        ODLiveStatusSourceData,
        ODLiveStatusSource,
        ODLiveStatusFileSource,
        ODLiveStatusUrlSource,
        ODLiveStatusManagerIdConstraint,
        ODLiveStatusManager,
        ODLiveStatusRenderer,
        ODCooldownManagerIdConstraint,
        ODCooldownManager,
        ODCooldownData,
        ODCooldown,
        ODCounterCooldown,
        ODIncrementalCounterCooldown,
        ODTimeoutCooldown,
        ODIncrementalTimeoutCooldown,
        ODDatabaseManagerIdConstraint,
        ODDatabaseManager,
        ODDatabaseIdConstraint,
        ODDatabase,
        ODJsonDatabaseStructure,
        ODJsonDatabase,
        ODFormattedJsonDatabase,
        ODEventCallback,
        ODEvent,
        ODEventManagerIdConstraint,
        ODEventManager,
        ODFlag,
        ODFlagManagerIdConstraint,
        ODFlagManager,
        ODFuseBooleans,
        ODFuseStrings,
        ODFuseNumbers,
        ODFuseStringArray,
        ODFuseManager,
        ODSharedFuseList,
        ODSharedFuseManager,
        ODHelpMenuComponent,
        ODHelpMenuTextComponent,
        ODHelpMenuCommandComponentOption,
        ODHelpMenuCommandComponentSettings,
        ODHelpMenuCommandComponent,
        ODHelpMenuCategoryIdConstraint,
        ODHelpMenuCategory,
        ODHelpMenuRenderResult,
        ODHelpMenuManagerIdConstraint,
        ODHelpMenuManager,
        ODLanguageMetadata,
        ODLanguageManagerIdConstraint,
        ODLanguageManager,
        ODLanguage,
        ODJsonLanguage,
        ODPermissionType,
        ODPermissionScope,
        ODPermissionResult,
        ODPermissionLevel,
        ODPermission,
        ODPermissionSettings,
        ODPermissionCalculationCallback,
        ODPermissionCommandResult,
        ODPermissionManagerIdConstraint,
        ODPermissionManager,
        ODUnknownCrashedPlugin,
        ODPluginManagerIdConstraint,
        ODPluginManager,
        ODPluginData,
        ODPluginDetails,
        ODPlugin,
        ODPluginClassManagerIdConstraint,
        ODPluginClassManager,
        ODPostManagerIdConstraint,
        ODPostManager,
        ODPost,
        ODProgressBarRendererManagerIdConstraint,
        ODProgressBarRendererManager,
        ODProgressBarManagerIdConstraint,
        ODProgressBarManager,
        ODProgressBarRenderFunc,
        ODProgressBarRenderer,
        ODProgressBar,
        ODTimedProgressBar,
        ODManualProgressBar,
        ODDefaultProgressBarRendererLabel,
        ODDefaultProgressBarRendererSettings,
        ODDefaultProgressBarRenderer,
        ODResponderImplementation,
        ODResponderTimeoutErrorCallback,
        ODResponderSendResult,
        ODResponderManager,
        ODBaseResponderInstance,
        ODCommandResponderManagerIdConstraint,
        ODCommandResponderManager,
        ODCommandResponderInstanceOptions,
        ODCommandResponderInstance,
        ODCommandResponder,
        ODButtonResponderManagerIdConstraint,
        ODButtonResponderManager,
        ODButtonResponderInstance,
        ODButtonResponder,
        ODDropdownResponderManagerIdConstraint,
        ODDropdownResponderManager,
        ODDropdownResponderInstanceValues,
        ODDropdownResponderInstance,
        ODDropdownResponder,
        ODModalResponderManagerIdConstraint,
        ODModalResponderManager,
        ODModalResponderInstanceValues,
        ODModalResponderInstance,
        ODModalResponder,
        ODContextMenuResponderManagerIdConstraint,
        ODContextMenuResponderManager,
        ODContextMenuResponderInstance,
        ODContextMenuResponder,
        ODAutocompleteResponderManagerIdConstraint,
        ODAutocompleteResponderManager,
        ODAutocompleteResponderInstance,
        ODAutocompleteResponder,
        ODSessionManagerIdConstraint,
        ODSessionManager,
        ODSessionInstance,
        ODSessionTimeoutCallback,
        ODSession,
        ODStartScreenComponentRenderCallback,
        ODStartScreenManagerIdConstraint,
        ODStartScreenManager,
        ODStartScreenComponent,
        ODStartScreenProperty,
        ODStartScreenLogoComponent,
        ODStartScreenHeaderAlignmentSettings,
        ODStartScreenHeaderComponent,
        ODStartScreenCategoryComponent,
        ODStartScreenPropertiesCategoryComponent,
        ODStartScreenFlagsCategoryComponent,
        ODStartScreenPluginsCategoryComponent,
        ODStartScreenLiveStatusCategoryComponent,
        ODStartScreenLogCategoryComponent,
        ODStateKey,
        ODStateData,
        ODStateSettings,
        ODState,
        ODStateManagerIdConstraint,
        ODStateManager,
        ODValidStatisticValue,
        ODStatisticManagerInitCallback,
        ODStatisticScopeSetMode,
        ODStatisticManagerIdConstraint,
        ODStatisticManager,
        ODStatisticScopeIdConstraint,
        ODStatisticScope,
        ODStatisticGlobalScope,
        ODStatisticRenderer,
        ODStatistic,
        ODBaseStatistic,
        ODDynamicStatisticRenderer,
        ODDynamicStatistic,
        ODTask,
        ODTaskManagerIdConstraint,
        ODTaskManager,
        ODVerifyBar,
        ODVerifyBarManagerIdConstraint,
        ODVerifyBarManager,
        ODWorkerCallback,
        ODWorker,
        ODWorkerManager
    }
}

declare namespace api_3 {
    export {
        ODOpenTicketMain,
        ODMainManagers,
        ODMain,
        ODActionImplementation,
        ODActionManagerIdConstraint,
        ODActionManager,
        ODAction,
        ODPromiseVoid,
        ODOptionalPromise,
        ODValidButtonColor,
        ODProjectType,
        ODValidId,
        ODValidJsonType,
        ODInterfaceWithPartialProperty,
        ODDiscordIdType,
        ODNoGeneric,
        ODId,
        ODManagerChangeHelper,
        ODManagerData,
        ODManagerCallback,
        ODManagerAddCallback,
        ODManager,
        ODManagerWithSafety,
        ODVersionManagerIdConstraint,
        ODVersionManager,
        ODVersion,
        ODVersionMigrationFunctions,
        ODVersionMigration,
        ODHTTPGetRequest,
        ODHTTPPostRequest,
        ODEnvHelper,
        ODSystemError,
        ODPluginError,
        ODEasterEggs,
        ODBuilderImplementation,
        ODBuilderManager,
        ODComponentBuildResult,
        ODButtonManagerIdConstraint,
        ODButtonManager,
        ODButtonData,
        ODButtonInstance,
        ODButton,
        ODQuickButton,
        ODDropdownManagerIdConstraint,
        ODDropdownManager,
        ODDropdownData,
        ODDropdownInstance,
        ODDropdown,
        ODQuickDropdown,
        ODFileManagerIdConstraint,
        ODFileManager,
        ODFileData,
        ODFileBuildResult,
        ODFileInstance,
        ODFile,
        ODQuickFile,
        ODEmbedManagerIdConstraint,
        ODEmbedManager,
        ODEmbedData,
        ODEmbedBuildResult,
        ODEmbedInstance,
        ODEmbed,
        ODQuickEmbed,
        ODMessageManagerIdConstraint,
        ODMessageManager,
        ODMessageData,
        ODMessageBuildResult,
        ODMessageInstance,
        ODMessage,
        ODQuickMessage,
        ODModalManagerIdConstraint,
        ODModalManager,
        ODModalDataQuestion,
        ODModalData,
        ODModalBuildResult,
        ODModalInstance,
        ODModal,
        ODCheckerResult,
        ODCheckerManagerIdConstraint,
        ODCheckerManager,
        ODCheckerStorage,
        ODCheckerRenderer,
        ODDefaultCheckerRendererTranslations,
        ODDefaultCheckerRenderer,
        ODCheckerTranslationRegister,
        ODCheckerFunctionCallback,
        ODCheckerFunction,
        ODCheckerFunctionManagerIdConstraint,
        ODCheckerFunctionManager,
        ODCheckerLocationTrace,
        ODCheckerOptions,
        ODChecker,
        ODCheckerMessage,
        ODCheckerStructureOptions,
        ODCheckerStructure,
        ODCheckerObjectStructureOptions,
        ODCheckerObjectStructure,
        ODCheckerStringStructureOptions,
        ODCheckerStringStructure,
        ODCheckerNumberStructureOptions,
        ODCheckerNumberStructure,
        ODCheckerBooleanStructureOptions,
        ODCheckerBooleanStructure,
        ODCheckerArrayStructureOptions,
        ODCheckerArrayStructure,
        ODCheckerNullStructureOptions,
        ODCheckerNullStructure,
        ODCheckerTypeSwitchStructureOptions,
        ODCheckerTypeSwitchStructure,
        ODCheckerObjectSwitchStructureOptions,
        ODCheckerObjectSwitchStructure,
        ODCheckerEnabledObjectStructureOptions,
        ODCheckerEnabledObjectStructure,
        ODCheckerCustomStructure_DiscordId,
        ODCheckerCustomStructure_DiscordIdArray,
        ODCheckerCustomStructure_DiscordToken,
        ODCheckerCustomStructure_HexColor,
        ODCheckerCustomStructure_EmojiString,
        ODCheckerCustomStructureOptions_UrlString,
        ODCheckerCustomStructure_UrlString,
        ODCheckerCustomStructure_UniqueId,
        ODCheckerCustomStructure_UniqueIdArray,
        ODClientIntents,
        ODClientPriviligedIntents,
        ODClientPartials,
        ODClientPermissions,
        ODClientManager,
        ODClientActivityType,
        ODClientActivityMode,
        ODClientActivityManager,
        ODSlashCommandUniversalTranslation,
        ODSlashCommandUniversalOptionChoice,
        ODSlashCommandUniversalOption,
        ODSlashCommandUniversalCommand,
        ODSlashCommandBuilder,
        ODSlashCommandComparator,
        ODSlashCommandInteractionCallback,
        ODSlashCommandRegisteredResult,
        ODSlashCommandManagerIdConstraint,
        ODSlashCommandManager,
        ODSlashCommandUpdateFunction,
        ODSlashCommand,
        ODTextCommandBuilderBaseOptionType,
        ODTextCommandBuilderBaseOption,
        ODTextCommandBuilderStringOption,
        ODTextCommandBuilderNumberOption,
        ODTextCommandBuilderBooleanOption,
        ODTextCommandBuilderChannelOption,
        ODTextCommandBuilderRoleOption,
        ODTextCommandBuilderUserOption,
        ODTextCommandBuilderGuildMemberOption,
        ODTextCommandBuilderMentionableOption,
        ODTextCommandBuilderOption,
        ODTextCommandBuilder,
        ODTextCommand,
        ODTextCommandInteractionOptionBase,
        ODTextCommandInteractionOption,
        ODTextCommandInteractionCallback,
        ODTextCommandErrorBase,
        ODTextCommandErrorUnknownPrefix,
        ODTextCommandErrorUnknownCommand,
        ODTextCommandErrorInvalidOptionReason,
        ODTextCommandErrorInvalidOption,
        ODTextCommandErrorMissingOption,
        ODTextCommandError,
        ODTextCommandErrorCallback,
        ODTextCommandManagerIdConstraint,
        ODTextCommandManager,
        ODContextMenuUniversalMenu,
        ODContextMenuBuilderMessage,
        ODContextMenuBuilderUser,
        ODContextMenuBuilder,
        ODContextMenuComparator,
        ODContextMenuInteractionCallback,
        ODContextMenuRegisteredResult,
        ODContextMenuManagerIdConstraint,
        ODContextMenuManager,
        ODContextMenuUpdateFunction,
        ODContextMenu,
        ODAutocompleteInteractionCallback,
        ODAutocompleteManager,
        ODComponentFactoryInstance,
        ODComponentFactory,
        ODComponentManagerIdConstraint,
        ODBaseComponentManager,
        ODComponentModifierManagerIdConstraint,
        ODComponentModifierManager,
        ODSharedComponentManagerIdConstraint,
        ODSharedComponentManager,
        ODMessageComponentManager,
        ODModalComponentManager,
        ODComponentManager,
        ODComponentInferBuildResult,
        ODComponentType,
        ODComponentForType,
        ODComponent,
        ODGroupComponent,
        ODParentComponent,
        ODMessageComponentModifier,
        ODMessageComponentData,
        ODValidMessageComponents,
        ODMessageComponentBuildResult,
        ODMessageComponent,
        ODSimpleMessageComponentData,
        ODValidSimpleMessageComponents,
        ODSimpleMessageComponent,
        ODModalComponentData,
        ODValidModalComponents,
        ODModalComponent,
        ODActionRowComponentData,
        ODValidActionRowComponents,
        ODActionRowComponent,
        ODContainerComponentData,
        ODValidContainerComponents,
        ODContainerComponent,
        ODSectionComponentData,
        ODSectionComponent,
        ODLabelComponentData,
        ODValidLabelComponents,
        ODLabelComponent,
        ODSeparatorComponentData,
        ODSeparatorComponent,
        ODTextComponentData,
        ODTextComponent,
        ODFileComponentData,
        ODFileComponent,
        ODGalleryComponentData,
        ODGalleryComponent,
        ODThumbnailComponentData,
        ODThumbnailComponent,
        ODContentComponentData,
        ODContentComponent,
        ODEmbedComponentData,
        ODEmbedComponent,
        ODPollComponentData,
        ODPollComponent,
        ODButtonComponentData,
        ODButtonComponent,
        ODShortInputComponentData,
        ODShortInputComponent,
        ODParagraphInputComponentData,
        ODParagraphInputComponent,
        ODDropdownComponentData,
        ODDropdownComponent,
        ODRadioGroupComponentData,
        ODRadioGroupComponent,
        ODCheckboxGroupComponentData,
        ODCheckboxGroupComponent,
        ODCheckboxComponentData,
        ODCheckboxComponent,
        ODFileUploadComponentData,
        ODFileUploadComponent,
        ODConfigManagerIdConstraint,
        ODConfigManager,
        ODConfig,
        ODJsonConfig,
        ODJsonCommentsConfig,
        ODMemoryConfig,
        ODValidConsoleColor,
        ODConsoleMessageParam,
        ODConsoleMessage,
        ODInfoConsoleMessage,
        ODSystemConsoleMessage,
        ODPluginConsoleMessage,
        ODDebugConsoleMessage,
        ODWarningConsoleMessage,
        ODErrorConsoleMessage,
        ODError,
        ODConsoleMessageTypes,
        ODConsoleManager,
        ODDebugFileManager,
        ODDebugger,
        ODLiveStatusColor,
        ODLiveStatusSourceData,
        ODLiveStatusSource,
        ODLiveStatusFileSource,
        ODLiveStatusUrlSource,
        ODLiveStatusManagerIdConstraint,
        ODLiveStatusManager,
        ODLiveStatusRenderer,
        ODCooldownManagerIdConstraint,
        ODCooldownManager,
        ODCooldownData,
        ODCooldown,
        ODCounterCooldown,
        ODIncrementalCounterCooldown,
        ODTimeoutCooldown,
        ODIncrementalTimeoutCooldown,
        ODDatabaseManagerIdConstraint,
        ODDatabaseManager,
        ODDatabaseIdConstraint,
        ODDatabase,
        ODJsonDatabaseStructure,
        ODJsonDatabase,
        ODFormattedJsonDatabase,
        ODEventCallback,
        ODEvent,
        ODEventManagerIdConstraint,
        ODEventManager,
        ODFlag,
        ODFlagManagerIdConstraint,
        ODFlagManager,
        ODFuseBooleans,
        ODFuseStrings,
        ODFuseNumbers,
        ODFuseStringArray,
        ODFuseManager,
        ODSharedFuseList,
        ODSharedFuseManager,
        ODHelpMenuComponent,
        ODHelpMenuTextComponent,
        ODHelpMenuCommandComponentOption,
        ODHelpMenuCommandComponentSettings,
        ODHelpMenuCommandComponent,
        ODHelpMenuCategoryIdConstraint,
        ODHelpMenuCategory,
        ODHelpMenuRenderResult,
        ODHelpMenuManagerIdConstraint,
        ODHelpMenuManager,
        ODLanguageMetadata,
        ODLanguageManagerIdConstraint,
        ODLanguageManager,
        ODLanguage,
        ODJsonLanguage,
        ODPermissionType,
        ODPermissionScope,
        ODPermissionResult,
        ODPermissionLevel,
        ODPermission,
        ODPermissionSettings,
        ODPermissionCalculationCallback,
        ODPermissionCommandResult,
        ODPermissionManagerIdConstraint,
        ODPermissionManager,
        ODUnknownCrashedPlugin,
        ODPluginManagerIdConstraint,
        ODPluginManager,
        ODPluginData,
        ODPluginDetails,
        ODPlugin,
        ODPluginClassManagerIdConstraint,
        ODPluginClassManager,
        ODPostManagerIdConstraint,
        ODPostManager,
        ODPost,
        ODProgressBarRendererManagerIdConstraint,
        ODProgressBarRendererManager,
        ODProgressBarManagerIdConstraint,
        ODProgressBarManager,
        ODProgressBarRenderFunc,
        ODProgressBarRenderer,
        ODProgressBar,
        ODTimedProgressBar,
        ODManualProgressBar,
        ODDefaultProgressBarRendererLabel,
        ODDefaultProgressBarRendererSettings,
        ODDefaultProgressBarRenderer,
        ODResponderImplementation,
        ODResponderTimeoutErrorCallback,
        ODResponderSendResult,
        ODResponderManager,
        ODBaseResponderInstance,
        ODCommandResponderManagerIdConstraint,
        ODCommandResponderManager,
        ODCommandResponderInstanceOptions,
        ODCommandResponderInstance,
        ODCommandResponder,
        ODButtonResponderManagerIdConstraint,
        ODButtonResponderManager,
        ODButtonResponderInstance,
        ODButtonResponder,
        ODDropdownResponderManagerIdConstraint,
        ODDropdownResponderManager,
        ODDropdownResponderInstanceValues,
        ODDropdownResponderInstance,
        ODDropdownResponder,
        ODModalResponderManagerIdConstraint,
        ODModalResponderManager,
        ODModalResponderInstanceValues,
        ODModalResponderInstance,
        ODModalResponder,
        ODContextMenuResponderManagerIdConstraint,
        ODContextMenuResponderManager,
        ODContextMenuResponderInstance,
        ODContextMenuResponder,
        ODAutocompleteResponderManagerIdConstraint,
        ODAutocompleteResponderManager,
        ODAutocompleteResponderInstance,
        ODAutocompleteResponder,
        ODSessionManagerIdConstraint,
        ODSessionManager,
        ODSessionInstance,
        ODSessionTimeoutCallback,
        ODSession,
        ODStartScreenComponentRenderCallback,
        ODStartScreenManagerIdConstraint,
        ODStartScreenManager,
        ODStartScreenComponent,
        ODStartScreenProperty,
        ODStartScreenLogoComponent,
        ODStartScreenHeaderAlignmentSettings,
        ODStartScreenHeaderComponent,
        ODStartScreenCategoryComponent,
        ODStartScreenPropertiesCategoryComponent,
        ODStartScreenFlagsCategoryComponent,
        ODStartScreenPluginsCategoryComponent,
        ODStartScreenLiveStatusCategoryComponent,
        ODStartScreenLogCategoryComponent,
        ODStateKey,
        ODStateData,
        ODStateSettings,
        ODState,
        ODStateManagerIdConstraint,
        ODStateManager,
        ODValidStatisticValue,
        ODStatisticManagerInitCallback,
        ODStatisticScopeSetMode,
        ODStatisticManagerIdConstraint,
        ODStatisticManager,
        ODStatisticScopeIdConstraint,
        ODStatisticScope,
        ODStatisticGlobalScope,
        ODStatisticRenderer,
        ODStatistic,
        ODBaseStatistic,
        ODDynamicStatisticRenderer,
        ODDynamicStatistic,
        ODTask,
        ODTaskManagerIdConstraint,
        ODTaskManager,
        ODVerifyBar,
        ODVerifyBarManagerIdConstraint,
        ODVerifyBarManager,
        ODWorkerCallback,
        ODWorker,
        ODWorkerManager,
        ODActionManagerIdMappings,
        ODMappedActionManager,
        ODVersionManagerIdMappings,
        ODMappedVersionManager,
        ODButtonManagerIdMappings,
        ODDropdownManagerIdMappings,
        ODFileManagerIdMappings,
        ODEmbedManagerIdMappings,
        ODMessageManagerIdMappings,
        ODModalManagerIdMappings,
        ODMappedButtonManager,
        ODMappedDropdownManager,
        ODMappedFileManager,
        ODMappedEmbedManager,
        ODMappedMessageManager,
        ODMappedModalManager,
        ODMappedBuilderManager,
        ODCheckerManagerIdMappings,
        ODCheckerTranslationRegisterOtherIdMappings,
        ODCheckerTranslationRegisterMessageIdMappings,
        ODCheckerFunctionManagerIdMappings,
        ODMappedCheckerManager,
        ODMappedCheckerFunctionManager,
        ODMappedCheckerTranslationRegister,
        ODSlashCommandManagerIdMappings,
        ODTextCommandManagerIdMappings,
        ODContextMenuManagerIdMappings,
        ODMappedClientManager,
        ODMappedSlashCommandManager,
        ODMappedTextCommandManager,
        ODMappedContextMenuManager,
        ODSharedComponentManagerIdMappings,
        ODMessageComponentManagerIdMappings,
        ODModalComponentManagerIdMappings,
        ODComponentModifierManagerIdMappings,
        ODMappedSharedComponentManager,
        ODMappedMessageComponentManager,
        ODMappedModalComponentManager,
        ODMappedComponentModifierManager,
        ODMappedComponentManager,
        ODConfigManagerIdMappings,
        ODGeneralJsonConfig_Status,
        ODGeneralJsonConfig_MessageSettings,
        ODGeneralJsonConfig_CmdPermissionSettingsType,
        ODGeneralJsonConfig_SystemLogs,
        ODGeneralJsonConfig_SystemLimits,
        ODGeneralJsonConfig_SystemChannelTopic,
        ODGeneralJsonConfig_SystemPermissions,
        ODGeneralJsonConfig_LogMessages,
        ODGeneralJsonConfig_TicketSystem,
        ODGeneralJsonConfig_GeneralData,
        ODOptionsJsonConfig_BaseOption,
        ODOptionsJsonConfig_OptionButtonSettings,
        ODOptionsJsonConfig_TicketOptionEmbedSettings,
        ODOptionsJsonConfig_TicketOptionPingSettings,
        ODOptionsJsonConfig_TicketOptionChannelSettings,
        ODOptionsJsonConfig_TicketOption,
        ODOptionsJsonConfig_WebsiteOption,
        ODOptionsJsonConfig_RoleOption,
        ODOptionsJsonConfig_SubPanelOption,
        ODOptionsJsonConfig_OptionsData,
        ODPanelsJsonConfig_PanelEmbedSettings,
        ODPanelsJsonConfig_PanelSettings,
        ODPanelsJsonConfig_Panel,
        ODPanelsJsonConfig_PanelsData,
        ODQuestionsJsonConfig_TextLengthLimits,
        ODQuestionsJsonConfig_CheckboxLimits,
        ODQuestionsJsonConfig_FileUploadLimits,
        ODQuestionsJsonConfig_DropdownChoice,
        ODQuestionsJsonConfig_RadioCheckboxChoice,
        ODQuestionsJsonConfig_BaseQuestion,
        ODQuestionsJsonConfig_TextDisplayQuestion,
        ODQuestionsJsonConfig_ShortQuestion,
        ODQuestionsJsonConfig_ParagraphQuestion,
        ODQuestionsJsonConfig_DropdownQuestion,
        ODQuestionsJsonConfig_RadioSelectQuestion,
        ODQuestionsJsonConfig_CheckboxSelectQuestion,
        ODQuestionsJsonConfig_FileUploadQuestion,
        ODQuestionsJsonConfig_QuestionsData,
        ODTranscriptsJsonConfig_TranscriptsTextLayout,
        ODTranscriptsJsonConfig_TranscriptsHtmlLayout,
        ODTranscriptsJsonConfig_TranscriptsData,
        ODMappedConfigManager,
        ODGeneralJsonCommentsConfig,
        ODQuestionsJsonCommentsConfig,
        ODOptionsJsonCommentsConfig,
        ODPanelsJsonCommentsConfig,
        ODTranscriptsJsonCommentsConfig,
        ODLiveStatusManagerIdMappings,
        ODMappedLiveStatusManager,
        ODCooldownManagerIdMappings,
        ODMappedCooldownManager,
        ODDatabaseManagerIdMappings,
        ODGlobalDatabaseIdMappings,
        ODTicketsDatabaseIdMappings,
        ODUsersDatabaseIdMappings,
        ODOptionsDatabaseIdMappings,
        ODTranscriptsDatabaseIdMappings,
        ODMappedDatabaseManager,
        ODGlobalDatabase,
        ODStatsDatabase,
        ODTicketsDatabase,
        ODUsersDatabase,
        ODOptionsDatabase,
        ODTranscriptsDatabase,
        ODMessageStatesDatabase,
        ODEventManagerIdMappings,
        ODMappedEventManager,
        ODFlagManagerIdMappings,
        ODMappedFlagManager,
        ODOpenTicketFuseList,
        ODHelpMenuManagerIdMappings,
        ODGeneralHelpMenuCategoryIdMappings,
        ODBasicTicketHelpMenuCategoryIdMappings,
        ODAdvancedTicketHelpMenuCategoryIdMappings,
        ODUserTicketHelpMenuCategoryIdMappings,
        ODAdminHelpMenuCategoryIdMappings,
        ODAdvancedHelpMenuCategoryIdMappings,
        ODExtraHelpMenuCategoryIdMappings,
        ODMappedHelpMenuManager,
        ODGeneralHelpMenuCategory,
        ODBasicTicketHelpMenuCategory,
        ODAdvancedTicketHelpMenuCategory,
        ODUserTicketHelpMenuCategory,
        ODAdminHelpMenuCategory,
        ODAdvancedHelpMenuCategory,
        ODExtraHelpMenuCategory,
        ODLanguageManagerIdMappings,
        ODLanguageManagerTranslationIdMappings,
        ODMappedLanguageManager,
        ODPermissionManagerIdMappings,
        ODPermissionEmbedType,
        ODMappedPermissionManager,
        ODPluginManagerIdMappings,
        ODPluginClassManagerIdMappings,
        ODMappedPluginManager,
        ODMappedPluginClassManager,
        ODPostManagerIdMappings,
        ODMappedPostManager,
        ODProgressBarManagerIdMappings,
        ODProgressBarRendererManagerIdMappings,
        ODMappedProgressBarManager,
        ODMappedProgressBarRendererManager,
        ODCommandResponderManagerIdMappings,
        ODButtonResponderManagerIdMappings,
        ODDropdownResponderManagerIdMappings,
        ODModalResponderManagerIdMappings,
        ODContextMenuResponderManagerIdMappings,
        ODAutocompleteResponderManagerIdMappings,
        ODMappedCommandResponderManager,
        ODMappedButtonResponderManager,
        ODMappedDropdownResponderManager,
        ODMappedModalResponderManager,
        ODMappedContextMenuResponderManager,
        ODMappedAutocompleteResponderManager,
        ODMappedResponderManager,
        ODSessionManagerIdMappings,
        ODMappedSessionManager,
        ODStartScreenManagerIdMappings,
        ODMappedStartScreenManager,
        ODStateManagerIdMappings,
        ODMappedStateManager,
        ODInteractiveMessageState,
        ODClearMessageState,
        ODPanelMessageState,
        ODStatisticManagerIdMappings,
        ODGlobalStatisticScopeIdMappings,
        ODSystemStatisticScopeIdMappings,
        ODUserStatisticScopeIdMappings,
        ODTicketStatisticScopeIdMappings,
        ODParticipantsStatisticScopeIdMappings,
        ODMessagesStatisticScopeIdMappings,
        ODMappedStatisticManager,
        ODGlobalStatisticScope,
        ODSystemStatisticScope,
        ODUserStatisticScope,
        ODTicketStatisticScope,
        ODParticipantsStatisticScope,
        ODMessagesStatisticScope,
        ODTaskManagerIdMappings,
        ODMappedTaskManager,
        ODVerifyBarManagerIdMappings,
        ODVerifyButtonId,
        ODMappedVerifyBarManager,
        ODBlacklist,
        ODBlacklistManager,
        ODOptionIdConstraint,
        ODTicketOptionIdMappings,
        ODWebsiteOptionIdMappings,
        ODRoleOptionIdMappings,
        ODSubPanelOptionIdMappings,
        ODOptionManager,
        ODOptionDataJson,
        ODOptionJson,
        ODOption,
        ODOptionData,
        ODTicketOption,
        ODWebsiteOption,
        ODRoleOption,
        ODSubPanelOption,
        ODOptionSuffixManager,
        ODOptionSuffix,
        ODOptionUserNameSuffix,
        ODOptionUserNicknameSuffix,
        ODOptionUserIdSuffix,
        ODOptionCounterDynamicSuffix,
        ODOptionCounterFixedSuffix,
        ODOptionRandomNumberSuffix,
        ODOptionRandomHexSuffix,
        ODPanelIdConstraint,
        ODPanelIdMappings,
        ODPanelManager,
        ODPanelDataJson,
        ODPanelJson,
        ODPanel,
        ODPanelData,
        ODPriorityManagerIdConstraint,
        ODPriorityManagerIdMappings,
        ODPriorityManager,
        ODMappedPriorityManager,
        ODPriorityLevel,
        ODQuestionIdConstraint,
        ODShortQuestionIdMappings,
        ODParagraphQuestionIdMappings,
        ODDropdownQuestionIdMappings,
        ODRadioSelectQuestionIdMappings,
        ODCheckboxSelectQuestionIdMappings,
        ODFileUploadQuestionIdMappings,
        ODTextDisplayQuestionIdMappings,
        ODQuestionManager,
        ODQuestionDataJson,
        ODQuestionJson,
        ODQuestion,
        ODQuestionData,
        ODQuestionAnswer,
        ODShortQuestion,
        ODParagraphQuestion,
        ODDropdownQuestion,
        ODRadioSelectQuestion,
        ODCheckboxSelectQuestion,
        ODFileUploadQuestion,
        ODTextDisplayQuestion,
        ODRoleIdConstraint,
        ODRoleIdMappings,
        ODRoleManager,
        ODRoleDataJson,
        ODRoleJson,
        ODRole,
        ODRoleData,
        ODRoleUpdateResult,
        ODRoleUpdateMode,
        ODTicketIdConstraint,
        ODTicketIdMappings,
        ODTicketManager,
        ODTicketDataJson,
        ODTicketJson,
        ODTicket,
        ODTicketData,
        ODTicketClearFilter,
        ODTranscriptManagerIdConstraint,
        ODTranscriptManagerIdMappings,
        ODTranscriptManager,
        ODTranscriptHistoryData,
        ODMappedTranscriptManager,
        ODTranscriptCompilerInitFunction,
        ODTranscriptCompilerCompileFunction,
        ODTranscriptCompilerReadyFunction,
        ODTranscriptCompilerInitResult,
        ODTranscriptCompilerCompileResult,
        ODTranscriptCompilerReadyResult,
        ODTranscriptCompiler,
        ODTranscriptCollector,
        ODTranscriptCollectorIncludeSettings,
        ODTranscriptMessageData,
        ODTranscriptMessageType,
        ODTranscriptUserData,
        ODTranscriptEmbedData,
        ODTranscriptEmbedFieldData,
        ODTranscriptFileData,
        ODTranscriptComponentRowData,
        ODTranscriptComponentData,
        ODTranscriptButtonComponentData,
        ODTranscriptDropdownComponentData,
        ODTranscriptDropdownComponentOptionData,
        ODTranscriptReplyData,
        ODTranscriptInteractionReplyData,
        ODTranscriptMessageReplyData,
        ODTranscriptEmojiData,
        ODTranscriptReactionData,
        ODTranscriptHtmlV2Data,
        ODTranscriptHtmlV2Response
    }
}

/**## asyncReplace `utility function`
 * Same as `string.replace(search, value)` but with async compatibility
 */
declare function asyncReplace(text: string, regex: RegExp, func: (value: string, ...args: any[]) => Promise<string>): Promise<string>;

/**## checkNodeVersion `utility function`
 * Check if the node.js version is v20 or higher.
 */
declare function checkNodeVersion(project: api_2.ODProjectType): void;

/**Check the ticket creation permissions like: cooldown, limits, blacklist, ... */
declare function checkTicketCreationPerms(instance: api.ODButtonResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance | api.ODCommandResponderInstance, origin: api.ODActionManagerIdMappings["opendiscord:create-ticket-permissions"]["origin"], guild: discord.Guild, user: discord.User, option: api.ODTicketOption): Promise<boolean>;

/**## dateString `utility function`
 * Use this function to create a short date string in the following format: `DD/MM/YYYY HH:MM:SS`
 */
declare function dateString(date: Date): string;

/**## easterEggs `utility object`
 * Object containing data for Open Ticket easter eggs.
 */
declare const easterEggs: api_2.ODEasterEggs;

/**## emojiTitle `utility function`
 * Use this function to create a title with an emoji before/after the text. The style & divider are set in `opendiscord.sharedFuses`
 * @example utilities.emojiTitle("📎","Links") //create a title with an emoji based on the bot emoji style
 */
declare function emojiTitle(emoji: string, text: string): string;

/**## getLongestLength `utility function`
 * Get the length of the longest string in the array.
 */
declare function getLongestLength(texts: string[]): number;

/**## getMessageFromBuildResult `utility function`
 * Get the final `messageCreateOptions` from a returned build result from builders/components.
 */
declare function getMessageFromBuildResult(build: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult, type: "interaction" | "message"): discord.MessageCreateOptions & {
    flags: number[];
};

/**## initialStartupLogs `utility function`
 * Use this function to check if an npm package is installed or not!
 * @example utilities.moduleInstalled("discord.js") //check if discord.js is installed
 */
declare function initialStartupLogs(opendiscord: api_2.ODMain, project: api_2.ODProjectType): void;

/**## moduleInstalled `utility function`
 * Use this function to check if an npm package is installed or not!
 * @example utilities.moduleInstalled("discord.js") //check if discord.js is installed
 */
declare function moduleInstalled(id: string, throwError?: boolean): boolean;

/**## ODAction `class`
 * This is an Open Discord action.
 *
 * It is a collection of functions/workers to execute a complex workflow (e.g. creating a ticket, banning a user, ...).
 *
 * Can be used standalone.
 */
declare class ODAction<Origin extends string, Params extends object, Result extends object, WorkerIds extends string = string> extends ODActionImplementation<Origin, Params, Result, WorkerIds> {
    /**Run this action */
    run(origin: Origin, params: Params): Promise<Partial<Result>>;
}

/**## ODActionImplementation `class`
 * This is an Open Discord action implementation.
 *
 * It is a basic implementation of the `ODWorkerManager` used by all `ODAction` classes.
 *
 * This class can't be used stand-alone & needs to be extended from!
 */
declare abstract class ODActionImplementation<Origin extends string, Params extends object, Result extends object, WorkerIds extends string = string> extends ODManagerData {
    /**The manager that has all workers of this implementation */
    workers: ODWorkerManager<Partial<Result>, Origin, Params, WorkerIds>;
    constructor(id: ODValidId, callback?: ODWorkerCallback<Partial<Result>, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Execute all workers & return the result. */
    abstract run(origin: Origin, params: Params): Promise<Partial<Result>>;
}

/**## ODActionManager `class`
 * This is an Open Discord action manager.
 *
 * It contains all Open Discord actions. You can compare actions with some sort of "procedure".
 * It's a complicated task that is divided into multiple functions.
 *
 * Some examples are `ticket-creation`, `ticket-closing`, `ticket-claiming`, ...
 *
 * It's recommended to use this system in combination with Open Discord responders!
 */
declare class ODActionManager<IdList extends ODActionManagerIdConstraint = ODActionManagerIdConstraint> extends ODManager<ODAction<string, {}, {}, string>> {
    constructor(debug: ODDebugger);
    get<ActionId extends keyof ODNoGeneric<IdList>>(id: ActionId): ODAction<IdList[ActionId]["origin"], IdList[ActionId]["params"], IdList[ActionId]["result"], IdList[ActionId]["workers"]>;
    get(id: ODValidId): ODAction<string, {}, {}, string> | null;
    remove<ActionId extends keyof ODNoGeneric<IdList>>(id: ActionId): ODAction<IdList[ActionId]["origin"], IdList[ActionId]["params"], IdList[ActionId]["result"], IdList[ActionId]["workers"]>;
    remove(id: ODValidId): ODAction<string, {}, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODActionManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODActionManager` class.
 */
declare type ODActionManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    result: object;
    workers: string;
}>;

/**## ODActionManagerIdMappings `interface`
 * A list of all available IDs in the default `ODActionManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODActionManagerIdMappings extends api_2.ODActionManagerIdConstraint {
    "opendiscord:create-ticket-permissions": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            option: ODTicketOption;
        };
        result: {
            valid: boolean;
            reason: "blacklist" | "cooldown" | "global-limit" | "global-user-limit" | "option-limit" | "option-user-limit" | "custom" | null;
            cooldownUntil?: Date;
            customReason?: string;
        };
        workers: "opendiscord:check-blacklist" | "opendiscord:check-cooldown" | "opendiscord:check-global-limits" | "opendiscord:check-option-limits" | "opendiscord:valid";
    };
    "opendiscord:create-transcript": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        result: {
            compiler: ODTranscriptCompiler<any, object | null>;
            success: boolean;
            result: ODTranscriptCompilerCompileResult<any>;
            errorReason: string | null;
            pendingMessage: api_2.ODResponderSendResult<true> | null;
            initData: object | null;
            participants: {
                user: discord.User;
                role: "creator" | "participant" | "admin";
            }[];
        };
        workers: "opendiscord:select-compiler" | "opendiscord:init-transcript" | "opendiscord:compile-transcript" | "opendiscord:ready-transcript" | "opendiscord:logs";
    };
    "opendiscord:create-ticket": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            option: ODTicketOption;
            answers: ODQuestionAnswer[];
        };
        result: {
            channel: discord.GuildTextBasedChannel;
            ticket: ODTicket;
        };
        workers: "opendiscord:create-ticket" | "opendiscord:send-ticket-message" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:close-ticket": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "autoclose" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            allowCategoryChange?: boolean;
        };
        result: {};
        workers: "opendiscord:close-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:delete-ticket": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            withoutTranscript: boolean;
        };
        result: {};
        workers: "opendiscord:delete-ticket" | "opendiscord:discord-logs" | "opendiscord:delete-channel" | "opendiscord:logs";
    };
    "opendiscord:reopen-ticket": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "autoclose-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            allowCategoryChange?: boolean;
        };
        result: {};
        workers: "opendiscord:reopen-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:claim-ticket": {
        origin: "slash" | "text" | "ticket-message" | "unclaim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            allowCategoryChange?: boolean;
        };
        result: {};
        workers: "opendiscord:claim-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:unclaim-ticket": {
        origin: "slash" | "text" | "ticket-message" | "claim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            allowCategoryChange?: boolean;
        };
        result: {};
        workers: "opendiscord:unclaim-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:pin-ticket": {
        origin: "slash" | "text" | "ticket-message" | "unpin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
        };
        result: {};
        workers: "opendiscord:pin-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:unpin-ticket": {
        origin: "slash" | "text" | "ticket-message" | "pin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
        };
        result: {};
        workers: "opendiscord:unpin-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:rename-ticket": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            data: string;
        };
        result: {};
        workers: "opendiscord:rename-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:move-ticket": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            data: ODTicketOption;
        };
        result: {};
        workers: "opendiscord:move-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:add-ticket-user": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            data: discord.User;
        };
        result: {};
        workers: "opendiscord:add-ticket-user" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:remove-ticket-user": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            sendMessage: boolean;
            data: discord.User;
        };
        result: {};
        workers: "opendiscord:remove-ticket-user" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:reaction-role": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            option: ODRoleOption;
            overwriteMode: ODRoleUpdateMode | null;
        };
        result: {
            result: ODRoleUpdateResult[];
            role: ODRole;
        };
        workers: "opendiscord:reaction-role" | "opendiscord:logs";
    };
    "opendiscord:clear-tickets": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: ODTicket[];
        };
        result: {
            list: string[];
        };
        workers: "opendiscord:clear-tickets" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:update-ticket-topic": {
        origin: "slash" | "text" | "ticket-action" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            newTopic: string | null;
            sendMessage: boolean;
        };
        result: {};
        workers: "opendiscord:update-ticket-topic" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:update-ticket-priority": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            newPriority: ODPriorityLevel;
            reason: string | null;
            sendMessage: boolean;
        };
        result: {};
        workers: "opendiscord:update-ticket-priority" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:transfer-ticket": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            newCreator: discord.User;
            reason: string | null;
            sendMessage: boolean;
        };
        result: {};
        workers: "opendiscord:transfer-ticket" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:calculate-ticket-category": {
        origin: "create-ticket" | "close-ticket" | "reopen-ticket" | "claim-ticket" | "unclaim-ticket" | "move-ticket" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel | null;
            user: discord.User;
            option: ODTicketOption;
            ticket: ODTicket | null;
            currentCategoryId: string | null;
        };
        result: {
            newCategoryId: string | null;
            newCategoryMode: string | null;
            newCategory: discord.CategoryChannel | null;
            shouldChangeCategory: boolean;
        };
        workers: "opendiscord:default-category" | "opendiscord:close-category" | "opendiscord:claim-category" | "opendiscord:backup-category";
    };
    "opendiscord:calculate-ticket-name": {
        origin: "create-ticket" | "close-ticket" | "reopen-ticket" | "claim-ticket" | "unclaim-ticket" | "move-ticket" | "pin-ticket" | "unpin-ticket" | "rename-ticket" | "transfer-ticket" | "priority-change" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel | null;
            user: discord.User;
            option: ODTicketOption;
            ticket: ODTicket | null;
            currentChannelName: string | null;
        };
        result: {
            newChannelName: string;
            newChannelSuffix: string;
            shouldChangeName: boolean;
        };
        workers: "opendiscord:calculate-ticket-name";
    };
}

/**## ODActionRowComponent `class`
 * An actionrow component which is a container for buttons, a select menu or inputs in a message or modal.
 */
declare class ODActionRowComponent extends ODGroupComponent<ODActionRowComponentData, ODValidActionRowComponents, discord.ActionRowBuilder<discord.MessageActionRowComponentBuilder>> {
    constructor(id: ODValidId, data?: Partial<ODActionRowComponentData>);
    build(): Promise<discord.ActionRowBuilder<discord.MessageActionRowComponentBuilder>>;
}

/**## ODActionRowComponentData `type`
 * The configurable settings/options for the `ODActionRowComponent`.
 */
declare interface ODActionRowComponentData {
}

/**## ODAdminHelpMenuCategory `class
 * A special class with types for the Open Ticket `Admin Commands` help menu category.
 */
declare class ODAdminHelpMenuCategory extends api_2.ODHelpMenuCategory<ODAdminHelpMenuCategoryIdMappings> {
}

/**## ODAdminHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODAdminHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODAdminHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:panel": api_2.ODHelpMenuCommandComponent;
    "opendiscord:blacklist-view": api_2.ODHelpMenuCommandComponent;
    "opendiscord:blacklist-add": api_2.ODHelpMenuCommandComponent;
    "opendiscord:blacklist-remove": api_2.ODHelpMenuCommandComponent;
    "opendiscord:blacklist-get": api_2.ODHelpMenuCommandComponent;
}

/**## ODAdvancedHelpMenuCategory `class
 * A special class with types for the Open Ticket `Advanced Commands` help menu category.
 */
declare class ODAdvancedHelpMenuCategory extends api_2.ODHelpMenuCategory<ODAdvancedHelpMenuCategoryIdMappings> {
}

/**## ODAdvancedHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODAdvancedHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODAdvancedHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:stats-global": api_2.ODHelpMenuCommandComponent;
    "opendiscord:stats-reset": api_2.ODHelpMenuCommandComponent;
    "opendiscord:stats-ticket": api_2.ODHelpMenuCommandComponent;
    "opendiscord:stats-user": api_2.ODHelpMenuCommandComponent;
    "opendiscord:autoclose-disable": api_2.ODHelpMenuCommandComponent;
    "opendiscord:autoclose-enable": api_2.ODHelpMenuCommandComponent;
    "opendiscord:autodelete-disable": api_2.ODHelpMenuCommandComponent;
    "opendiscord:autodelete-enable": api_2.ODHelpMenuCommandComponent;
    "opendiscord:topic-set": api_2.ODHelpMenuCommandComponent;
    "opendiscord:priority-set": api_2.ODHelpMenuCommandComponent;
    "opendiscord:transcripts": api_2.ODHelpMenuCommandComponent;
}

/**## ODAdvancedTicketHelpMenuCategory `class
 * A special class with types for the Open Ticket `Advanced Ticket Commands` help menu category.
 */
declare class ODAdvancedTicketHelpMenuCategory extends api_2.ODHelpMenuCategory<ODAdvancedTicketHelpMenuCategoryIdMappings> {
}

/**## ODAdvancedTicketHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODAdvancedTicketHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODAdvancedTicketHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:pin": api_2.ODHelpMenuCommandComponent;
    "opendiscord:unpin": api_2.ODHelpMenuCommandComponent;
    "opendiscord:move": api_2.ODHelpMenuCommandComponent;
    "opendiscord:rename": api_2.ODHelpMenuCommandComponent;
}

/**## ODAutocompleteInteractionCallback `type`
 * Callback for the autocomplete interaction listener.
 */
declare type ODAutocompleteInteractionCallback = (interaction: discord.AutocompleteInteraction) => void;

/**## ODAutocompleteManager `class`
 * This is an Open Discord client autocomplete interaction manager.
 *
 * It's responsible for managing all the autocomplete interactions from the client.
 */
declare class ODAutocompleteManager {
    /**Alias to Open Discord debugger. */
    protected debug: ODDebugger;
    /**Refrerence to discord.js client. */
    protected client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>;
    /**Discord.js application commands manager. */
    commandManager: discord.ApplicationCommandManager | null;
    /**Collection of all interaction listeners. */
    protected interactionListeners: {
        cmdName: string | RegExp;
        optName: string | RegExp;
        callback: ODAutocompleteInteractionCallback;
    }[];
    /**Set the soft limit for maximum amount of listeners. A warning will be shown when there are more listeners than this limit. */
    listenerLimit: number;
    constructor(debug: ODDebugger, client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>);
    /**Start listening to the discord.js client `interactionCreate` event. */
    startListeningToInteractions(): void;
    /**Callback on interaction from one or multiple autocompletes. */
    onInteraction(cmdName: string | RegExp, optName: string | RegExp, callback: ODAutocompleteInteractionCallback): void;
}

/**## ODAutocompleteResponder `class`
 * This is an Open Discord autocomplete responder.
 *
 * This class manages all workers which are executed when the related autocomplete is triggered.
 */
declare class ODAutocompleteResponder<Origin extends string, Params, WorkerIds extends string = string> extends ODResponderImplementation<ODAutocompleteResponderInstance, Origin, Params, WorkerIds> {
    /**The slash command of the autocomplete should match the following regex. */
    cmdMatch: string | RegExp;
    constructor(id: ODValidId, cmdMatch: string | RegExp, match: string | RegExp, callback?: ODWorkerCallback<ODAutocompleteResponderInstance, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Respond to this autocomplete interaction. */
    respond(instance: ODAutocompleteResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODAutocompleteResponderInstance `class`
 * This is an Open Discord autocomplete responder instance.
 *
 * An instance is an active autocomplete interaction. You can reply to the autocomplete using `reply()`.
 */
declare class ODAutocompleteResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.AutocompleteInteraction;
    /**Did a worker already respond to this instance/interaction? */
    didRespond: boolean;
    /**The user who triggered this autocomplete. */
    user: discord.User;
    /**The guild member who triggered this autocomplete. */
    member: discord.GuildMember | null;
    /**The guild where this autocomplete was triggered. */
    guild: discord.Guild | null;
    /**The channel where this autocomplete was triggered. */
    channel: discord.TextBasedChannel;
    /**The target slash command option of this autocomplete. */
    target: discord.AutocompleteFocusedOption;
    constructor(interaction: discord.AutocompleteInteraction, errorCallback: ODResponderTimeoutErrorCallback<ODAutocompleteResponderInstance, "autocomplete"> | null, timeoutMs: number | null);
    /**Reply to this autocomplete. */
    autocomplete(choices: (string | discord.ApplicationCommandOptionChoiceData)[]): Promise<{
        success: boolean;
    }>;
    /**Reply to this autocomplete, but filter choices based on the input of the user. */
    filteredAutocomplete(choices: (string | discord.ApplicationCommandOptionChoiceData)[]): Promise<{
        success: boolean;
    }>;
}

/**## ODAutocompleteResponderManager `class`
 * This is an Open Discord autocomplete responder manager.
 *
 * It contains all Open Discord autocomplete responders. These can respond to autocomplete interactions.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - know where the request came from!
 * - And so much more!
 */
declare class ODAutocompleteResponderManager<IdList extends ODAutocompleteResponderManagerIdConstraint = ODAutocompleteResponderManagerIdConstraint> extends ODManager<ODAutocompleteResponder<"autocomplete", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODAutocompleteResponderInstance, "autocomplete"> | null, ms: number | null): void;
    add(data: ODAutocompleteResponder<"autocomplete", any>, overwrite?: boolean): boolean;
    get<AutocompleteResponderId extends keyof ODNoGeneric<IdList>>(id: AutocompleteResponderId): ODAutocompleteResponder<IdList[AutocompleteResponderId]["origin"], IdList[AutocompleteResponderId]["params"], IdList[AutocompleteResponderId]["workers"]>;
    get(id: ODValidId): ODAutocompleteResponder<"autocomplete", any> | null;
    remove<AutocompleteResponderId extends keyof ODNoGeneric<IdList>>(id: AutocompleteResponderId): ODAutocompleteResponder<IdList[AutocompleteResponderId]["origin"], IdList[AutocompleteResponderId]["params"], IdList[AutocompleteResponderId]["workers"]>;
    remove(id: ODValidId): ODAutocompleteResponder<"autocomplete", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODAutocompleteResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODAutocompleteResponderManager` class.
 */
declare type ODAutocompleteResponderManagerIdConstraint = Record<string, {
    origin: "autocomplete";
    params: object;
    workers: string;
}>;

/**## ODAutocompleteResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODAutocompleteResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODAutocompleteResponderManagerIdMappings extends api_2.ODAutocompleteResponderManagerIdConstraint {
    "opendiscord:panel-id": {
        origin: "autocomplete";
        params: {};
        workers: "opendiscord:panel-id";
    };
    "opendiscord:option-id": {
        origin: "autocomplete";
        params: {};
        workers: "opendiscord:option-id";
    };
}

/**## ODBaseComponentManager `class`
 * A generic Open Discord component manager.
 *
 * It contains a collection of all Open Discord component factories. You can:
 * - Add your own message/modal component factories
 * - Modify existing message/modal component factories
 *
 * Messages created using this system are not compatible with `ODBuilder` messages!
 */
declare class ODBaseComponentManager<IdList extends ODComponentManagerIdConstraint = ODComponentManagerIdConstraint, Component extends ODComponent<object, any> = ODComponent<object, any>> extends ODManager<ODComponentFactory<Component, string, {}, string>> {
    get<FactoryId extends keyof ODNoGeneric<IdList>>(id: FactoryId): ODComponentFactory<Component, IdList[FactoryId]["origin"], IdList[FactoryId]["params"], IdList[FactoryId]["workers"]>;
    get(id: ODValidId): ODComponentFactory<Component, string, {}, string> | null;
    remove<FactoryId extends keyof ODNoGeneric<IdList>>(id: FactoryId): ODComponentFactory<Component, IdList[FactoryId]["origin"], IdList[FactoryId]["params"], IdList[FactoryId]["workers"]>;
    remove(id: ODValidId): ODComponentFactory<Component, string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODBaseResponderInstance `class`
 * A base class for creating responder instances.
 */
declare abstract class ODBaseResponderInstance {
    /**Get the final `messageCreateOptions` from a returned build result from builders/components. */
    protected getMessageFromBuildResult(build: ODMessageBuildResult | ODMessageComponentBuildResult, type: "interaction" | "message"): discord.MessageCreateOptions & {
        flags: number[];
    };
}

/**## ODBaseStatistic `class`
 * This is an Open Discord basic statistic.
 *
 * This single statistic will store a number, boolean or string in the database.
 * Use it to create a simple statistic for any statistics scope.
 */
declare class ODBaseStatistic extends ODStatistic {
    /**The name of this statistic. Rendered in discord embeds/messages. */
    name: string;
    constructor(id: ODValidId, priority: number, name: string, value: ODValidStatisticValue);
}

/**## ODBasicTicketHelpMenuCategory `class
 * A special class with types for the Open Ticket `Basic Ticket Commands` help menu category.
 */
declare class ODBasicTicketHelpMenuCategory extends api_2.ODHelpMenuCategory<ODBasicTicketHelpMenuCategoryIdMappings> {
}

/**## ODBasicTicketHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODBasicTicketHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODBasicTicketHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:close": api_2.ODHelpMenuCommandComponent;
    "opendiscord:delete": api_2.ODHelpMenuCommandComponent;
    "opendiscord:reopen": api_2.ODHelpMenuCommandComponent;
}

/**## ODBlacklist `class`
 * This is an Open Ticket blacklisted user.
 *
 * This class contains the id of the user this class belongs to & an optional reason for being blacklisted.
 *
 * Create this class & add it to the `ODBlacklistManager` to blacklist someone!
 */
declare class ODBlacklist extends api_2.ODManagerData {
    /**The reason why this user got blacklisted. (optional) */
    private rawReason;
    constructor(id: api_2.ODValidId, reason: string | null);
    /**The reason why this user got blacklisted. (optional) */
    set reason(reason: string | null);
    get reason(): string | null;
}

/**## ODBlacklistManager `class`
 * This is an Open Ticket blacklist manager.
 *
 * This class manages all blacklisted users & their reason. Check if someone is blacklisted using their ID in the `exists()` method.
 *
 * All `ODBlacklist`'s added, removed & edited in this list will be synced automatically with the database.
 */
declare class ODBlacklistManager extends api_2.ODManager<ODBlacklist> {
    constructor(debug: api_2.ODDebugger);
}

/**## ODBuilderImplementation `class`
 * This is an Open Discord builder implementation.
 *
 * It is a basic implementation of the `ODWorkerManager` used by all `ODBuilder` classes.
 *
 * This class can't be used stand-alone & needs to be extended from!
 */
declare abstract class ODBuilderImplementation<Instance, Origin extends string, Params, BuildType extends {
    id: ODId;
}, WorkerIds extends string = string> extends ODManagerData {
    /**The manager that has all workers of this implementation */
    workers: ODWorkerManager<Instance, Origin, Params, WorkerIds>;
    /**Cache a build or create it every time from scratch when this.build() gets executed. */
    allowCache: boolean;
    /**Did the build already got created/cached? */
    didCache: boolean;
    /**The cache of this build. */
    cache: BuildType | null;
    constructor(id: ODValidId, callback?: ODWorkerCallback<Instance, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Set if caching is allowed */
    setCacheMode(allowed: boolean): this;
    /**Reset the current cache */
    resetCache(): this;
    /**Execute all workers & return the result. */
    abstract build(origin: Origin, params: Params): Promise<BuildType>;
}

/**## ODBuilderManager `class`
 * This is an Open Discord builder manager.
 *
 * It contains all Open Discord builders. You can find messages, embeds, files & dropdowns, buttons & modals all here!
 *
 * Using the Open Discord builder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit messages
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - cache frequently used objects
 * - get to know the origin of the build request for a specific message, button, etc
 * - And so much more!
 */
declare class ODBuilderManager<ButtonIdList extends ODButtonManagerIdConstraint = ODButtonManagerIdConstraint, DropdownIdList extends ODDropdownManagerIdConstraint = ODDropdownManagerIdConstraint, FileIdList extends ODFileManagerIdConstraint = ODFileManagerIdConstraint, EmbedIdList extends ODEmbedManagerIdConstraint = ODEmbedManagerIdConstraint, MessageIdList extends ODMessageManagerIdConstraint = ODMessageManagerIdConstraint, ModalIdList extends ODModalManagerIdConstraint = ODModalManagerIdConstraint> {
    /**The manager for all button builders */
    buttons: ODButtonManager<ButtonIdList>;
    /**The manager for all dropdown builders */
    dropdowns: ODDropdownManager<DropdownIdList>;
    /**The manager for all file/attachment builders */
    files: ODFileManager<FileIdList>;
    /**The manager for all embed builders */
    embeds: ODEmbedManager<EmbedIdList>;
    /**The manager for all message builders */
    messages: ODMessageManager<MessageIdList>;
    /**The manager for all modal builders */
    modals: ODModalManager<ModalIdList>;
    constructor(debug: ODDebugger);
}

/**## ODButton `class`
 * This is an Open Discord button builder.
 *
 * With this class, you can create a button to use in a message.
 * The only difference with normal buttons is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODButton<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODButtonInstance, Origin, Params, ODComponentBuildResult, WorkerIds> {
    /**Build this button & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODComponentBuildResult>;
}

/**## ODButtonComponent `class`
 * A button component which renders an interactive button inside the message.
 * A reply can be sent using Open Discord responders.
 */
declare class ODButtonComponent extends ODComponent<ODButtonComponentData, discord.ButtonBuilder> {
    constructor(id: ODValidId, data: Partial<ODButtonComponentData>);
    build(): Promise<discord.ButtonBuilder>;
    /**Get the `discord.ButtonStyle` for the specified `ODValidButtonColor` */
    protected getButtonStyle(): discord.ButtonStyle;
    /**Set the custom id of this button. Ignored when `setUrl()` is used. */
    setCustomId(id: string | null): this;
    /**Set the url of this button. */
    setUrl(url: string | null): this;
    /**Set the color of this button. Ignored when `setUrl()` is used. */
    setColor(color: ODValidButtonColor): this;
    /**Set the label of this button. */
    setLabel(label: string | null): this;
    /**Set the emoji of this button. */
    setEmoji(emoji: string | null): this;
    /**Disable this button. */
    setDisabled(disabled: boolean): this;
}

/**## ODButtonComponentData `type`
 * The configurable settings/options for the `ODButtonComponent`.
 */
declare interface ODButtonComponentData {
    /**The custom id of this button. Ignored when `url` is specified. */
    customId?: string;
    /**The url of this button. Disables interactions & customId */
    url?: string;
    /**The button color. Ignored when `url` is specified. */
    color: ODValidButtonColor;
    /**The button label */
    label?: string;
    /**The button emoji */
    emoji?: string;
    /**Is the button disabled? */
    disabled: boolean;
}

/**## ODButtonData `interface`
 * This interface contains the data to build a button.
 */
declare interface ODButtonData {
    /**The custom id of this button */
    customId: string;
    /**The mode of this button */
    mode: "button" | "url";
    /**The url for when the mode is set to "url" */
    url: string | null;
    /**The button color */
    color: ODValidButtonColor | null;
    /**The button label */
    label: string | null;
    /**The button emoji */
    emoji: string | null;
    /**Is the button disabled? */
    disabled: boolean;
}

/**## ODButtonInstance `class`
 * This is an Open Discord button instance.
 *
 * It contains all properties & functions to build a button!
 */
declare class ODButtonInstance {
    /**The current data of this button */
    data: ODButtonData;
    /**Set the custom id of this button */
    setCustomId(id: ODButtonData["customId"]): this;
    /**Set the mode of this button */
    setMode(mode: ODButtonData["mode"]): this;
    /**Set the url of this button */
    setUrl(url: ODButtonData["url"]): this;
    /**Set the color of this button */
    setColor(color: ODButtonData["color"]): this;
    /**Set the label of this button */
    setLabel(label: ODButtonData["label"]): this;
    /**Set the emoji of this button */
    setEmoji(emoji: ODButtonData["emoji"]): this;
    /**Disable this button */
    setDisabled(disabled: ODButtonData["disabled"]): this;
}

/**## ODButtonManager `class`
 * This is an Open Discord button manager.
 *
 * It contains all Open Discord button builders. Here, you can add your own buttons or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODButtonManager<IdList extends ODButtonManagerIdConstraint = ODButtonManagerIdConstraint> extends ODManagerWithSafety<ODButton<string, {}, string>> {
    constructor(debug: ODDebugger);
    /**Get a newline component for buttons & dropdowns! */
    getNewLine(id: ODValidId): ODComponentBuildResult;
    get<ButtonId extends keyof ODNoGeneric<IdList>>(id: ButtonId): ODButton<IdList[ButtonId]["origin"], IdList[ButtonId]["params"], IdList[ButtonId]["workers"]>;
    get(id: ODValidId): ODButton<string, {}, string> | null;
    remove<ButtonId extends keyof ODNoGeneric<IdList>>(id: ButtonId): ODButton<IdList[ButtonId]["origin"], IdList[ButtonId]["params"], IdList[ButtonId]["workers"]>;
    remove(id: ODValidId): ODButton<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<ButtonId extends keyof ODNoGeneric<IdList>>(id: ButtonId): ODButton<IdList[ButtonId]["origin"], IdList[ButtonId]["params"], IdList[ButtonId]["workers"]>;
    getSafe(id: ODValidId): ODButton<string, {}, string>;
}

/**## ODButtonManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODButtonManager` class.
 */
declare type ODButtonManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODButtonManagerIdMappings `interface`
 * A list of all available IDs in the default `ODButtonManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODButtonManagerIdMappings extends api_2.ODButtonManagerIdConstraint {
    "opendiscord:verifybar-button": {
        origin: "verifybar" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            verifybar: api_2.ODVerifyBar<string>;
            verifyButtonId: string;
            defaultButtonType: "✅" | "❌";
            useDefaultLabels: boolean;
            customLabel?: string;
            customColor?: api_2.ODValidButtonColor;
            customEmoji?: string;
        };
        workers: "opendiscord:verifybar-button";
    };
    "opendiscord:error-ticket-deprecated-transcript": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {};
        workers: "opendiscord:error-ticket-deprecated-transcript";
    };
    "opendiscord:help-menu-previous": {
        origin: "text" | "slash" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu-previous";
    };
    "opendiscord:help-menu-next": {
        origin: "text" | "slash" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu-next";
    };
    "opendiscord:help-menu-page": {
        origin: "text" | "slash" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu-page";
    };
    "opendiscord:help-menu-switch": {
        origin: "text" | "slash" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu-switch";
    };
    "opendiscord:ticket-option": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            option: ODTicketOption;
        };
        workers: "opendiscord:ticket-option";
    };
    "opendiscord:website-option": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            option: ODWebsiteOption;
        };
        workers: "opendiscord:website-option";
    };
    "opendiscord:role-option": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            option: ODRoleOption;
        };
        workers: "opendiscord:role-option";
    };
    "opendiscord:subpanel-option": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            option: ODSubPanelOption;
        };
        workers: "opendiscord:subpanel-option";
    };
    "opendiscord:visit-ticket": {
        origin: "ticket-created" | "dm" | "logs" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:visit-ticket";
    };
    "opendiscord:close-ticket": {
        origin: "ticket-message" | "reopen-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:close-ticket";
    };
    "opendiscord:delete-ticket": {
        origin: "ticket-message" | "close-message" | "autoclose-message" | "reopen-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:delete-ticket";
    };
    "opendiscord:reopen-ticket": {
        origin: "ticket-message" | "close-message" | "autoclose-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:reopen-ticket";
    };
    "opendiscord:claim-ticket": {
        origin: "ticket-message" | "unclaim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:claim-ticket";
    };
    "opendiscord:unclaim-ticket": {
        origin: "ticket-message" | "claim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:unclaim-ticket";
    };
    "opendiscord:pin-ticket": {
        origin: "ticket-message" | "unpin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:pin-ticket";
    };
    "opendiscord:unpin-ticket": {
        origin: "ticket-message" | "pin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:unpin-ticket";
    };
    "opendiscord:transcript-html-visit": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                url: string;
                availableUntil: Date;
            }, {
                auth: string;
            }>;
            result: ODTranscriptCompilerCompileResult<{
                url: string;
                availableUntil: Date;
            }>;
        };
        workers: "opendiscord:transcript-html-visit";
    };
    "opendiscord:transcript-error-retry": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<any, object | null>;
            reason: string | null;
        };
        workers: "opendiscord:transcript-error-retry";
    };
    "opendiscord:transcript-error-continue": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<any, object | null>;
            reason: string | null;
        };
        workers: "opendiscord:transcript-error-continue";
    };
    "opendiscord:clear-continue": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
            inProgress: boolean;
        };
        workers: "opendiscord:clear-continue";
    };
}

/**## ODButtonResponder `class`
 * This is an Open Discord button responder.
 *
 * This class manages all workers which are executed when the related button is triggered.
 */
declare class ODButtonResponder<Origin extends string, Params, WorkerIds extends string = string> extends ODResponderImplementation<ODButtonResponderInstance, Origin, Params, WorkerIds> {
    /**Respond to this button */
    respond(instance: ODButtonResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODButtonResponderInstance `class`
 * This is an Open Discord button responder instance.
 *
 * An instance is an active button interaction. You can reply to the button using `reply()`.
 */
declare class ODButtonResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.ButtonInteraction;
    /**Switches to `true` when a worker replies, edits or defers interaction. Will stop the timeout error from being shown. */
    protected ignoreResponderTimeout: boolean;
    /**The user who triggered this button. */
    user: discord.User;
    /**The guild member who triggered this button. */
    member: discord.GuildMember | null;
    /**The guild where this button was triggered. */
    guild: discord.Guild | null;
    /**The channel where this button was triggered. */
    channel: discord.TextBasedChannel;
    /**The message this button originates from. */
    message: discord.Message;
    constructor(interaction: discord.ButtonInteraction, errorCallback: ODResponderTimeoutErrorCallback<ODButtonResponderInstance, "button"> | null, timeoutMs: number | null);
    /**Reply to this button. */
    reply(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Update the message of this button. */
    update(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Defer this button. */
    defer(type: "reply" | "update", ephemeral: boolean): Promise<boolean>;
    /**Show a modal as reply to this button. */
    modal(modal: ODModalBuildResult): Promise<boolean>;
    /**Get a component from the original message of this button. */
    getMessageComponent(type: "button", id: string | RegExp): discord.ButtonComponent | null;
    getMessageComponent(type: "string-dropdown", id: string | RegExp): discord.StringSelectMenuComponent | null;
    getMessageComponent(type: "user-dropdown", id: string | RegExp): discord.UserSelectMenuComponent | null;
    getMessageComponent(type: "channel-dropdown", id: string | RegExp): discord.ChannelSelectMenuComponent | null;
    getMessageComponent(type: "role-dropdown", id: string | RegExp): discord.RoleSelectMenuComponent | null;
    getMessageComponent(type: "mentionable-dropdown", id: string | RegExp): discord.MentionableSelectMenuComponent | null;
    /**Get the first embed of the original message if it exists. */
    getMessageEmbed(): discord.Embed | null;
}

/**## ODButtonResponderManager `class`
 * This is an Open Discord button responder manager.
 *
 * It contains all Open Discord button responders. These can respond to button interactions.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - know where the request came from!
 * - And so much more!
 */
declare class ODButtonResponderManager<IdList extends ODButtonResponderManagerIdConstraint = ODButtonResponderManagerIdConstraint> extends ODManager<ODButtonResponder<"button", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    /**A list of listeners which will listen to the raw interactionCreate event from discord.js */
    private listeners;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODButtonResponderInstance, "button"> | null, ms: number | null): void;
    add(data: ODButtonResponder<"button", any>, overwrite?: boolean): boolean;
    get<ButtonResponderId extends keyof ODNoGeneric<IdList>>(id: ButtonResponderId): ODButtonResponder<IdList[ButtonResponderId]["origin"], IdList[ButtonResponderId]["params"], IdList[ButtonResponderId]["workers"]>;
    get(id: ODValidId): ODButtonResponder<"button", any> | null;
    remove<ButtonResponderId extends keyof ODNoGeneric<IdList>>(id: ButtonResponderId): ODButtonResponder<IdList[ButtonResponderId]["origin"], IdList[ButtonResponderId]["params"], IdList[ButtonResponderId]["workers"]>;
    remove(id: ODValidId): ODButtonResponder<"button", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODButtonResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODButtonResponderManager` class.
 */
declare type ODButtonResponderManagerIdConstraint = Record<string, {
    origin: "button";
    params: object;
    workers: string;
}>;

/**## ODButtonResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODButtonResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODButtonResponderManagerIdMappings extends api_2.ODButtonResponderManagerIdConstraint {
    "opendiscord:verifybar-button": {
        origin: "button";
        params: {};
        workers: "opendiscord:verifybar-button";
    };
    "opendiscord:help-menu-switch": {
        origin: "button";
        params: {};
        workers: "opendiscord:update-help-menu";
    };
    "opendiscord:help-menu-previous": {
        origin: "button";
        params: {};
        workers: "opendiscord:update-help-menu";
    };
    "opendiscord:help-menu-next": {
        origin: "button";
        params: {};
        workers: "opendiscord:update-help-menu";
    };
    "opendiscord:ticket-option": {
        origin: "button";
        params: {};
        workers: "opendiscord:ticket-option";
    };
    "opendiscord:role-option": {
        origin: "button";
        params: {};
        workers: "opendiscord:role-option";
    };
    "opendiscord:subpanel-option": {
        origin: "button";
        params: {};
        workers: "opendiscord:subpanel-option";
    };
    "opendiscord:claim-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:claim-ticket";
    };
    "opendiscord:unclaim-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:unclaim-ticket";
    };
    "opendiscord:pin-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:pin-ticket";
    };
    "opendiscord:unpin-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:unpin-ticket";
    };
    "opendiscord:close-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:close-ticket";
    };
    "opendiscord:reopen-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:reopen-ticket";
    };
    "opendiscord:delete-ticket": {
        origin: "button";
        params: {};
        workers: "opendiscord:delete-ticket";
    };
    "opendiscord:transcript-error-retry": {
        origin: "button";
        params: {};
        workers: "opendiscord:delete-ticket" | "opendiscord:logs";
    };
    "opendiscord:transcript-error-continue": {
        origin: "button";
        params: {};
        workers: "opendiscord:delete-ticket" | "opendiscord:logs";
    };
    "opendiscord:clear-continue": {
        origin: "button";
        params: {};
        workers: "opendiscord:clear-continue";
    };
}

/**## ODCheckboxComponent `class`
 * A checkbox component which renders an interactive checkbox input inside a modal.
 * The label & description should be set via an `ODLabelComponent`
 */
declare class ODCheckboxComponent extends ODComponent<ODCheckboxComponentData, discord.CheckboxBuilder> {
    constructor(id: ODValidId, data: Partial<ODCheckboxComponentData>);
    build(): Promise<discord.CheckboxBuilder>;
    /**Set the custom id of this checkbox. */
    setCustomId(id: string | null): this;
    /**Mark this checkbox as enabled by default. */
    setDefault(enabledByDefault: boolean): this;
}

/**## ODCheckboxComponentData `type`
 * The configurable settings/options for the `ODCheckboxComponent`.
 */
declare interface ODCheckboxComponentData {
    /**The custom id of this checkbox. */
    customId?: string;
    /**Is this checkbox enabled by default? */
    default: boolean;
}

/**## ODCheckboxGroupComponent `class`
 * A checkbox group component which renders an interactive checkbox group input inside a modal.
 */
declare class ODCheckboxGroupComponent extends ODComponent<ODCheckboxGroupComponentData, discord.CheckboxGroupBuilder> {
    constructor(id: ODValidId, data: Partial<ODCheckboxGroupComponentData>);
    build(): Promise<discord.CheckboxGroupBuilder>;
    /**Set the custom id of this checkbox group. */
    setCustomId(id: string | null): this;
    /**Mark this checkbox group as required (At least one option must be selected). */
    setRequired(required: boolean): this;
    /**Set the available checkbox options (min 2, max 10) */
    setOptions(options: discord.APICheckboxGroupOption[]): this;
    /**Set the minimum amount of selected checkboxes. */
    setMinValues(amount: number | null): this;
    /**Set the maximum amount of selected checkboxes. */
    setMaxValues(amount: number | null): this;
}

/**## ODCheckboxGroupComponentData `type`
 * The configurable settings/options for the `ODCheckboxGroupComponent`.
 */
declare interface ODCheckboxGroupComponentData {
    /**The custom id of this checkbox group. */
    customId?: string;
    /**Is this checkbox group required? (At least one option must be selected) */
    required: boolean;
    /**The available checkbox options. (min 1, max 10) */
    options: discord.APICheckboxGroupOption[];
    /**The minimum amount of checkboxes to be selected. */
    minValues?: number;
    /**The maximum amount of checkboxes to be selected. */
    maxValues?: number;
}

/**## ODCheckboxSelectQuestion `class`
 * An Open Ticket checkbox-select question. It contains all config properties of the checkbox-select question type.
 */
declare class ODCheckboxSelectQuestion extends ODQuestion<ODCheckboxSelectQuestionIdMappings> {
    readonly type: "opendiscord:checkbox-select";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODCheckboxSelectQuestion;
}

/**## ODCheckboxSelectQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODCheckboxSelectQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODCheckboxSelectQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:limits-enabled": ODQuestionData<boolean>;
    "opendiscord:limits-min": ODQuestionData<number>;
    "opendiscord:limits-max": ODQuestionData<number>;
    "opendiscord:choices": ODQuestionData<ODQuestionsJsonConfig_RadioCheckboxChoice[]>;
}

/**## ODChecker `class`
 * This is an Open Discord config checker.
 *
 * It checks a specific config file for invalid/missing configurations. This data can then be used to show to the user what's wrong!
 * You can check for example if a string is longer/shorter than a certain amount of characters & more!
 *
 * You can use this class when you create your own custom config file & you want to check it for syntax errors.
 */
declare class ODChecker extends ODManagerData {
    /**The storage of this checker (reference for `ODCheckerManager.storage`) */
    storage: ODCheckerStorage;
    /**The higher the priority, the faster it gets checked! */
    priority: number;
    /**The config file that needs to be checked */
    config: ODConfig<any>;
    /**The structure of the config file */
    structure: ODCheckerStructure;
    /**Temporary storage for all error messages from the check() method (not recommended to use) */
    messages: ODCheckerMessage[];
    /**Temporary storage for the quit status from the check() method (not recommended to use) */
    quit: boolean;
    /**All additional properties of this config checker. */
    options: ODCheckerOptions;
    constructor(id: ODValidId, storage: ODCheckerStorage, priority: number, config: ODConfig<any>, structure: ODCheckerStructure, options?: ODCheckerOptions);
    /**Get a human-readable number string. */
    protected ordinalNumber(num: number): string;
    /**Run this checker. Returns all errors*/
    check(): ODCheckerResult;
    /**Create a string from the location trace/path in a human readable format. */
    locationTraceToString(trace: ODCheckerLocationTrace): string;
    /**De-reference the locationTrace array. Use this before adding a value to the array*/
    locationTraceDeref(trace: ODCheckerLocationTrace): ODCheckerLocationTrace;
    /**A shortcut to create a warning, info or error message */
    createMessage(id: ODValidId, type: "info" | "warning" | "error", message: string, locationTrace: ODCheckerLocationTrace, docs: string | null, translationParams: string[], locationId: ODId, locationDocs: string | null): void;
}

/**## ODCheckerArrayStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for an array variable in a config file, customise it in the settings!
 */
declare class ODCheckerArrayStructure extends ODCheckerStructure {
    options: ODCheckerArrayStructureOptions;
    constructor(id: ODValidId, options: ODCheckerArrayStructureOptions);
    check(checker: ODChecker, value: Array<any>, locationTrace: ODCheckerLocationTrace): boolean;
    /**Check this array for the allowed types */
    protected arrayAllowedTypesCheck(array: any[], allowedTypes: ("string" | "number" | "boolean" | "null" | "array" | "object" | "other")[]): boolean;
    /**Check this array for doubles */
    protected arrayHasDoubles(array: any[]): boolean;
}

/**## ODCheckerArrayStructureOptions `interface`
 * This interface has the options for `ODCheckerArrayStructure`!
 */
declare interface ODCheckerArrayStructureOptions extends ODCheckerStructureOptions {
    /**The checker for all the properties in this array */
    propertyChecker?: ODCheckerStructure;
    /**Don't allow this array to be empty */
    disableEmpty?: boolean;
    /**This array is required to be empty */
    emptyRequired?: boolean;
    /**The minimum length of this array */
    minLength?: number;
    /**The maximum length of this array */
    maxLength?: number;
    /**The length of the array needs to be the same as this value */
    length?: number;
    /**Allow double values (only for `string`, `number` & `boolean`) */
    allowDoubles?: boolean;
    /**Only allow these types in the array (for multi-type propertyCheckers) */
    allowedTypes?: ("string" | "number" | "boolean" | "null" | "array" | "object" | "other")[];
    /**The name of the properties inside this array. Used in the GUI of the Interactive Setup CLI. */
    cliDisplayPropertyName?: string;
}

/**## ODCheckerBooleanStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for a boolean variable in a config file, customise it in the settings!
 */
declare class ODCheckerBooleanStructure extends ODCheckerStructure {
    options: ODCheckerBooleanStructureOptions;
    constructor(id: ODValidId, options: ODCheckerBooleanStructureOptions);
    check(checker: ODChecker, value: boolean, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerBooleanStructureOptions `interface`
 * This interface has the options for `ODCheckerBooleanStructure`!
 */
declare interface ODCheckerBooleanStructureOptions extends ODCheckerStructureOptions {
    /**Is `true` allowed? */
    trueAllowed?: boolean;
    /**Is `false` allowed? */
    falseAllowed?: boolean;
}

/**## ODCheckerCustomStructure_DiscordId `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for discord ids (channel, user, role, ...)**
 */
declare class ODCheckerCustomStructure_DiscordId extends ODCheckerStringStructure {
    /**The type of id (used in rendering) */
    readonly type: ODDiscordIdType;
    /**Is this id allowed to be empty */
    readonly emptyAllowed: boolean;
    /**Extra matches (value will also be valid when one of these options match) */
    readonly extraOptions: string[];
    constructor(id: ODValidId, type: ODDiscordIdType, emptyAllowed: boolean, extraOptions: string[], options?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_DiscordIdArray `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for discord id arrays (channel, user, role, ...)**
 */
declare class ODCheckerCustomStructure_DiscordIdArray extends ODCheckerArrayStructure {
    /**The type of id (used in rendering) */
    readonly type: ODDiscordIdType;
    /**Extra matches (value will also be valid when one of these options match) */
    readonly extraOptions: string[];
    constructor(id: ODValidId, type: ODDiscordIdType, extraOptions: string[], options?: ODCheckerArrayStructureOptions, idOptions?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_DiscordToken `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for a discord (auth) token**
 */
declare class ODCheckerCustomStructure_DiscordToken extends ODCheckerStringStructure {
    constructor(id: ODValidId, options?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_EmojiString `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for an emoji (string)**
 */
declare class ODCheckerCustomStructure_EmojiString extends ODCheckerStringStructure {
    /**The minimum amount of emojis required (0 to allow empty) */
    readonly minLength: number;
    /**The maximum amount of emojis allowed */
    readonly maxLength: number;
    /**Allow custom discord emoji ids (`<:12345678910:emoji_name>`) */
    readonly allowCustomDiscordEmoji: boolean;
    constructor(id: ODValidId, minLength: number, maxLength: number, allowCustomDiscordEmoji: boolean, options?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_DiscordToken `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for a hex color**
 */
declare class ODCheckerCustomStructure_HexColor extends ODCheckerStringStructure {
    /**When enabled, you are also allowed to use `#fff` instead of `#ffffff` */
    readonly allowShortForm: boolean;
    /**Allow this hex color to be empty. */
    readonly emptyAllowed: boolean;
    constructor(id: ODValidId, allowShortForm: boolean, emptyAllowed: boolean, options?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_UniqueId `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for a unique id (per source & scope)**
 */
declare class ODCheckerCustomStructure_UniqueId extends ODCheckerStringStructure {
    /**The source of this unique id (generally the plugin name or `opendiscord`) */
    readonly source: string;
    /**The scope of this unique id (id needs to be unique in this scope) */
    readonly scope: string;
    constructor(id: ODValidId, source: string, scope: string, options?: ODCheckerStringStructureOptions);
}

/**## ODCheckerCustomStructure_UniqueIdArray `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for a unique id array (per source & scope)**
 */
declare class ODCheckerCustomStructure_UniqueIdArray extends ODCheckerArrayStructure {
    /**The source to read unique ids (generally the plugin name or `opendiscord`) */
    readonly source: string;
    /**The scope to read unique ids (id needs to be unique in this scope) */
    readonly scope: string;
    /**The scope to push unique ids when used in this array! */
    readonly usedScope: string | null;
    constructor(id: ODValidId, source: string, scope: string, usedScope?: string, options?: ODCheckerArrayStructureOptions, idOptions?: Omit<ODCheckerStringStructureOptions, "minLength" | "custom">);
}

/**## ODCheckerCustomStructure_UrlString `class`
 * This is an Open Discord custom checker structure.
 *
 * This class extends a primitive config checker & adds another layer of checking in the `custom` function.
 * You can compare it to a blueprint for a specific checker.
 *
 * **This custom checker is made for a URL (string)**
 */
declare class ODCheckerCustomStructure_UrlString extends ODCheckerStringStructure {
    /**The settings for this url */
    readonly urlSettings: ODCheckerCustomStructureOptions_UrlString;
    /**Is this url allowed to be empty? */
    readonly emptyAllowed: boolean;
    constructor(id: ODValidId, emptyAllowed: boolean, urlSettings: ODCheckerCustomStructureOptions_UrlString, options?: ODCheckerStringStructureOptions);
    /**Check for the hostname */
    protected urlHasValidHostname(url: string, hostnames: (string | RegExp)[]): boolean;
    /**Check for the extension */
    protected urlHasValidExtension(url: string, extensions: string[]): boolean;
    /**Check for the path */
    protected urlHasValidPath(url: string, paths: (string | RegExp)[]): boolean;
    /**Do general syntax check on url */
    protected urlIsValid(url: string): boolean;
}

/**## ODCheckerCustomStructureOptions_UrlString `interface`
 * This interface has the options for `ODCheckerCustomStructure_UrlString`!
 */
declare interface ODCheckerCustomStructureOptions_UrlString {
    /**Allow urls with `http://` instead of `https://` */
    allowHttp?: boolean;
    /**Allowed hostnames (string or regex) => will match domain + subdomain */
    allowedHostnames?: (string | RegExp)[];
    /**Allowed extentions (string) => will match the end of the url (`.png`,`.svg`,...) */
    allowedExtensions?: string[];
    /**Allowed paths (string or regex) => will match path + extension (not domain + subdomain) */
    allowedPaths?: (string | RegExp)[];
    /**A regex that will be executed on the entire url (including search params, protcol, domain, ...) */
    regex?: RegExp;
}

/**## ODCheckerEnabledObjectStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will enable an object checker based on a variable match in the object, customise it in the settings!
 */
declare class ODCheckerEnabledObjectStructure extends ODCheckerStructure {
    options: ODCheckerEnabledObjectStructureOptions;
    constructor(id: ODValidId, options: ODCheckerEnabledObjectStructureOptions);
    check(checker: ODChecker, value: Record<string, any>, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerEnabledObjectStructureOptions `interface`
 * This interface has the options for `ODCheckerEnabledObjectStructure`!
 */
declare interface ODCheckerEnabledObjectStructureOptions extends ODCheckerStructureOptions {
    /**The name of the property to match the `enabledValue`. */
    property: string;
    /**The value of the property to be enabled. (e.g. `true`) */
    enabledValue: boolean | string | number;
    /**The object checker to use once the property has been matched. */
    checker: ODCheckerObjectStructure;
    /**Ignore the `checker` if the object is disabled (`property` doesn't match `enabledValue`) */
    ignoreCheckIfDisabled?: boolean;
}

/**## ODCheckerFunction `class`
 * This is an Open Discord config checker function.
 *
 * It is a global function that will be executed after all config checkers. It can do additional checks for invalid/missing configurations.
 * It's mostly used for things that need to be checked globally!
 */
declare class ODCheckerFunction extends ODManagerData {
    /**The function which will be executed globally after all config checkers. */
    func: ODCheckerFunctionCallback;
    constructor(id: ODValidId, func: ODCheckerFunctionCallback);
}

/**## ODCheckerFunctionCallback `type`
 * This is the function used in the `ODCheckerFunction` class.
 */
declare type ODCheckerFunctionCallback = (manager: ODCheckerManager<ODCheckerManagerIdConstraint, ODCheckerFunctionManagerIdConstraint, ODCheckerRenderer, string, string>, functions: ODCheckerFunctionManager<ODCheckerFunctionManagerIdConstraint>) => ODCheckerResult;

/**## ODCheckerFunctionManager `class`
 * This is an Open Discord config checker function manager.
 *
 * It manages all `ODCheckerFunction`'s and it has some extra shortcuts for frequently used methods.
 */
declare class ODCheckerFunctionManager<IdList extends ODCheckerFunctionManagerIdConstraint = ODCheckerFunctionManagerIdConstraint> extends ODManager<ODCheckerFunction> {
    constructor(debug: ODDebugger);
    /**Get a human-readable number string. */
    protected ordinalNumber(num: number): string;
    /**A shortcut to create a warning, info or error message */
    createMessage(checkerId: ODValidId, id: ODValidId, filepath: string, type: "info" | "warning" | "error", message: string, locationTrace: ODCheckerLocationTrace, docs: string | null, translationParams: string[], locationId: ODId, locationDocs: string | null): ODCheckerMessage;
    /**Create a string from the location trace (path)*/
    locationTraceToString(trace: ODCheckerLocationTrace): string;
    /**De-reference the locationTrace array. Use this before adding a value to the array*/
    locationTraceDeref(trace: ODCheckerLocationTrace): ODCheckerLocationTrace;
    get<CheckerFunctionId extends keyof ODNoGeneric<IdList>>(id: CheckerFunctionId): IdList[CheckerFunctionId];
    get(id: ODValidId): ODCheckerFunction | null;
    remove<CheckerFunctionId extends keyof ODNoGeneric<IdList>>(id: CheckerFunctionId): IdList[CheckerFunctionId];
    remove(id: ODValidId): ODCheckerFunction | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODCheckerFunctionManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODCheckerFunctionManager` class.
 */
declare type ODCheckerFunctionManagerIdConstraint = Record<string, ODCheckerFunction>;

/**## ODCheckerFunctionManagerIdMappings `type`
 * A list of all available IDs in the default `ODCheckerFunctionManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODCheckerFunctionManagerIdMappings extends api_2.ODCheckerFunctionManagerIdConstraint {
    "opendiscord:unused-options": api_2.ODCheckerFunction;
    "opendiscord:unused-questions": api_2.ODCheckerFunction;
    "opendiscord:dropdown-options": api_2.ODCheckerFunction;
}

/**## ODCheckerLocationTrace `type`
 * This type is an array of strings & numbers which represents the location trace from the config checker.
 * It's used to generate a path to the error (e.g. `"abc"."efg".1."something"`)
 */
declare type ODCheckerLocationTrace = (string | number)[];

/**## ODCheckerManager `class`
 * This is an Open Discord checker manager.
 *
 * It manages all config checkers in the bot and allows plugins to access config checkers from Open Discord & other plugins!
 *
 * You can use this class to get/add a config checker (`ODChecker`) in your plugin!
 */
declare class ODCheckerManager<IdList extends ODCheckerManagerIdConstraint = ODCheckerManagerIdConstraint, FunctionIdList extends ODCheckerFunctionManagerIdConstraint = ODCheckerFunctionManagerIdConstraint, Renderer extends ODCheckerRenderer = ODCheckerRenderer, TranslationMessageIds extends string = string, TranslationOtherIds extends string = string> extends ODManager<ODChecker> {
    /**The global temporary storage shared between all config checkers. */
    storage: ODCheckerStorage;
    /**The class responsible for rendering the config checker report. */
    renderer: Renderer;
    /**The class responsible for translating the config checker report. */
    translation: ODCheckerTranslationRegister<TranslationMessageIds, TranslationOtherIds>;
    /**Final functions are global functions executed just before the report is created. */
    functions: ODCheckerFunctionManager<FunctionIdList>;
    /**A variable containing the last result returned from `checkAll()` */
    lastResult: ODCheckerResult | null;
    constructor(debug: ODDebugger, storage: ODCheckerStorage, renderer: Renderer, translation: ODCheckerTranslationRegister<TranslationMessageIds, TranslationOtherIds>, functions: ODCheckerFunctionManager<FunctionIdList>);
    /**Check all config checkers registered in this manager.*/
    checkAll(sort: boolean): ODCheckerResult;
    /**Create temporary and unlisted `ODConfig`, `ODChecker` & `ODCheckerStorage` classes. This will help you use a `ODCheckerStructure` validator without officially registering it in `opendiscord.checkers`. */
    createTemporaryCheckerEnvironment(): ODChecker;
    get<CheckerId extends keyof ODNoGeneric<IdList>>(id: CheckerId): IdList[CheckerId];
    get(id: ODValidId): ODChecker | null;
    remove<CheckerId extends keyof ODNoGeneric<IdList>>(id: CheckerId): IdList[CheckerId];
    remove(id: ODValidId): ODChecker | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODCheckerManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODCheckerManager` class.
 */
declare type ODCheckerManagerIdConstraint = Record<string, ODChecker>;

/**## ODBCheckerManagerIdMappings `interface`
 * A list of all available IDs in the default `ODBCheckerManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODCheckerManagerIdMappings extends api_2.ODCheckerManagerIdConstraint {
    "opendiscord:general": api_2.ODChecker;
    "opendiscord:questions": api_2.ODChecker;
    "opendiscord:options": api_2.ODChecker;
    "opendiscord:panels": api_2.ODChecker;
    "opendiscord:transcripts": api_2.ODChecker;
}

/**## ODCheckerMessage `interface`
 * This interface is an object which has all variables required for a config checker message!
 */
declare interface ODCheckerMessage {
    checkerId: ODId;
    messageId: ODId;
    locationId: ODId;
    type: "info" | "warning" | "error";
    message: string;
    path: string;
    filepath: string;
    translationParams: string[];
    messageDocs: string | null;
    locationDocs: string | null;
}

/**## ODCheckerNullStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for a null variable in a config file, customise it in the settings!
 */
declare class ODCheckerNullStructure extends ODCheckerStructure {
    options: ODCheckerNullStructureOptions;
    constructor(id: ODValidId, options: ODCheckerNullStructureOptions);
    check(checker: ODChecker, value: null, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerNullStructureOptions `interface`
 * This interface has the options for `ODCheckerNullStructure`!
 */
declare interface ODCheckerNullStructureOptions extends ODCheckerStructureOptions {
    /**Is the value allowed to be null */
    nullAllowed?: boolean;
}

/**## ODCheckerNumberStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for a number variable in a config file, customise it in the settings!
 */
declare class ODCheckerNumberStructure extends ODCheckerStructure {
    options: ODCheckerNumberStructureOptions;
    constructor(id: ODValidId, options: ODCheckerNumberStructureOptions);
    check(checker: ODChecker, value: number, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerNumberStructureOptions `interface`
 * This interface has the options for `ODCheckerNumberStructure`!
 */
declare interface ODCheckerNumberStructureOptions extends ODCheckerStructureOptions {
    /**Is `NaN` (not a number) allowed? (`false` by default) */
    nanAllowed?: boolean;
    /**The minimum length of this number */
    minLength?: number;
    /**The maximum length of this number */
    maxLength?: number;
    /**Set the required length of this number */
    length?: number;
    /**The minimum value of this number */
    min?: number;
    /**The maximum value of this number */
    max?: number;
    /**This number is required to match the value */
    is?: number;
    /**Only allow a multiple of ... starting at `this.offset` or 0 */
    step?: number;
    /**The offset for the step function. */
    offset?: number;
    /**This number needs to start with ... */
    startsWith?: string;
    /**This number needs to end with ... */
    endsWith?: string;
    /**This number needs to contain ... */
    contains?: string;
    /**This number is not allowed to contain ... */
    invertedContains?: string;
    /**You need to choose between ... */
    choices?: number[];
    /**Are numbers with a decimal value allowed? */
    floatAllowed?: boolean;
    /**Are negative numbers allowed (without zero) */
    negativeAllowed?: boolean;
    /**Are positive numers allowed (without zero) */
    positiveAllowed?: boolean;
    /**Is zero allowed? */
    zeroAllowed?: boolean;
}

/**## ODCheckerObjectStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for an object variable in a config file, customise it in the settings!
 * A checker for the children can be set in the settings.
 */
declare class ODCheckerObjectStructure extends ODCheckerStructure {
    options: ODCheckerObjectStructureOptions;
    constructor(id: ODValidId, options: ODCheckerObjectStructureOptions);
    check(checker: ODChecker, value: Record<string, any>, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerObjectStructureOptions `interface`
 * This interface has the options for `ODCheckerObjectStructure`!
 */
declare interface ODCheckerObjectStructureOptions extends ODCheckerStructureOptions {
    /**Add a checker for a property in an object (can also be optional) */
    children: {
        key: string;
        priority?: number;
        optional?: boolean;
        cliHideInEditMode?: boolean;
        checker: ODCheckerStructure;
    }[];
    /**A list of keys to skip when creating this object with the Interactive Setup CLI. The default value of these properties will be used instead. */
    cliInitSkipKeys?: string[];
    /**The key of a (primitive) property in this object to show the value of in the Interactive Setup CLI when listed in an array. */
    cliDisplayKeyInParentArray?: string;
    /**A list of additional (primitive) property keys in this object to show the value of in the Interactive Setup CLI when listed in an array. */
    cliDisplayAdditionalKeysInParentArray?: string[];
}

/**## ODCheckerObjectSwitchStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will switch object checkers based on a variable match in one of the objects, customise it in the settings!
 */
declare class ODCheckerObjectSwitchStructure extends ODCheckerStructure {
    options: ODCheckerObjectSwitchStructureOptions;
    constructor(id: ODValidId, options: ODCheckerObjectSwitchStructureOptions);
    check(checker: ODChecker, value: Record<string, any>, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerObjectSwitchStructureOptions `interface`
 * This interface has the options for `ODCheckerObjectSwitchStructure`!
 */
declare interface ODCheckerObjectSwitchStructureOptions extends ODCheckerStructureOptions {
    /**An array of object checkers with their name, properties & priority. */
    objects: {
        /**The properties to match for this checker to be used. */
        properties: {
            key: string;
            value: boolean | string | number;
        }[];
        /**The name for this object type (used in rendering) */
        name: string;
        /**The higher the priority, the earlier this checker will be tested. */
        priority: number;
        /**The object checker used once the properties have been matched. */
        checker: ODCheckerObjectStructure;
    }[];
}

/**## ODCheckerOptions `interface`
 * This interface contains all optional properties to customise in the `ODChecker` class.
 */
declare interface ODCheckerOptions {
    /**The name of this config in the Interactive Setup CLI. */
    cliDisplayName?: string;
    /**The description of this config in the Interactive Setup CLI. */
    cliDisplayDescription?: string;
}

/**## ODCheckerRenderer `class`
 * This is an Open Discord checker renderer.
 *
 * It's responsible for rendering the config checker result in the console.
 * This class doesn't provide any components! Create new ones by extending this class.
 *
 * Use this class to change the config checker looks!
 */
declare abstract class ODCheckerRenderer {
    /**Get all config checker render components. These can be combined and rendered to the console. */
    abstract getComponents(compact: boolean, renderEmpty: boolean, translation: ODCheckerTranslationRegister<string, string>, data: ODCheckerResult): string[];
    /**Render all config checker render components to the console. */
    render(components: string[]): void;
}

/**## ODCheckerResult `interface`
 * This interface is the result from a config checker check() function.
 */
declare interface ODCheckerResult {
    valid: boolean;
    messages: ODCheckerMessage[];
}

/**## ODCheckerStorage `class`
 * This is an Open Discord checker storage.
 *
 * It stores temporary data to share between config checkers!
 * (e.g. The `messages.json` needs to access the `"id"` from `options.json`)
 *
 *
 * You can use this class when you create your own config checker implementation! (not required for using the built-in config checker)
 */
declare class ODCheckerStorage {
    /**This is the array that stores all the data. ❌ **(don't edit unless really needed!)***/
    storage: {
        source: ODId;
        key: string;
        value: any;
    }[];
    /**Get data from the database (`source` => id of `ODChecker`) */
    get(source: ODValidId, key: string): any | null;
    /**Add data to the database (`source` => id of `ODChecker`). This function also overwrites existing data!*/
    set(source: ODValidId, key: string, value: any): boolean;
    /**Delete data from the database (`source` => id of `ODChecker`) */
    delete(source: ODValidId, key: string): boolean;
    /**Reset the entire database */
    reset(): void;
}

/**## ODCheckerStringStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for a string variable in a config file, customise it in the settings!
 */
declare class ODCheckerStringStructure extends ODCheckerStructure {
    options: ODCheckerStringStructureOptions;
    constructor(id: ODValidId, options: ODCheckerStringStructureOptions);
    check(checker: ODChecker, value: string, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerStringStructureOptions `interface`
 * This interface has the options for `ODCheckerStringStructure`!
 */
declare interface ODCheckerStringStructureOptions extends ODCheckerStructureOptions {
    /**The minimum length of this string */
    minLength?: number;
    /**The maximum length of this string */
    maxLength?: number;
    /**Set the required length of this string */
    length?: number;
    /**This string needs to start with ... */
    startsWith?: string;
    /**This string needs to end with ... */
    endsWith?: string;
    /**This string needs to contain ... */
    contains?: string;
    /**This string is not allowed to contain ... */
    invertedContains?: string;
    /**You need to choose between ... */
    choices?: string[];
    /**This string needs to be in lowercase. */
    lowercaseOnly?: boolean;
    /**This string needs to be in uppercase. */
    uppercaseOnly?: boolean;
    /**This string shouldn't contain any special characters (allowed: A-Z, a-z, 0-9, space, a few punctuation marks, ...). */
    noSpecialCharacters?: boolean;
    /**Do not allow any spaces in this string. */
    withoutSpaces?: boolean;
    /**Give a warning when a sentence doesn't start with a capital letter. Or require every word to start with a capital letter. (Ignores numbers, unicode characters, ...) */
    capitalLetterWarning?: false | "sentence" | "word";
    /**Give a warning when a sentence doesn't end with a punctuation letter (.,?!) */
    punctuationWarning?: boolean;
    /**The string needs to match this regex */
    regex?: RegExp;
    /**Provide an optional list for autocomplete when using the Interactive Setup CLI. Defaults to the `choices` option. */
    cliAutocompleteList?: string[];
    /**Dynamically provide a list for autocomplete items when using the Interactive Setup CLI. */
    cliAutocompleteFunc?: () => Promise<string[] | null>;
}

/**## ODCheckerStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will check for a single variable in a config file, customise it in the settings!
 * If you want prebuilt checkers (for strings, booleans, numbers, ...), check the other `ODCheckerStructure`'s!
 *
 * **Not recommended to use!** It's recommended to extend from another `ODConfigCheckerStructure` class!
 */
declare class ODCheckerStructure {
    /**The id of this checker structure */
    id: ODId;
    /**The options for this checker structure */
    options: ODCheckerStructureOptions;
    constructor(id: ODValidId, options: ODCheckerStructureOptions);
    /**Check a variable if it matches all settings in this checker. This function is automatically executed by Open Discord! */
    check(checker: ODChecker, value: ODValidJsonType, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerStructureOptions `interface`
 * This interface has the basic options for the `ODCheckerStructure`!
 */
declare interface ODCheckerStructureOptions {
    /**Add a custom checker function. Returns `true` when valid. */
    custom?: (checker: ODChecker, value: ODValidJsonType, locationTrace: ODCheckerLocationTrace, locationId: ODId, locationDocs: string | null) => boolean;
    /**Set the url to the documentation of this variable. */
    docs?: string;
    /**The name of this config in the Interactive Setup CLI. */
    cliDisplayName?: string;
    /**The description of this config in the Interactive Setup CLI. */
    cliDisplayDescription?: string;
    /**Hide the description of this config in the Interactive Setup CLI parent view/list. */
    cliHideDescriptionInParent?: boolean;
    /**The default value of this variable when creating it in the Interactive Setup CLI. When not specified, the user will be asked to insert a value. */
    cliInitDefaultValue?: ODValidJsonType;
}

/**## ODCheckerTranslationRegister `class`
 * This is an Open Discord checker translation register.
 *
 * It's used to store & manage the translation for each message from the config checker!
 * Most translations are stored by message id, but there are some exceptions like the additional text on the checker report.
 *
 * You can use this class if you want to translate your config checker messages! **This is optional & isn't required for the checker to work!**
 */
declare class ODCheckerTranslationRegister<MessageIds extends string = string, OtherIds extends string = string> {
    /**This is the array that stores all the data. ❌ **(don't edit unless really needed!)***/
    protected translations: {
        type: "message" | "other";
        id: string;
        translation: string;
    }[];
    /**Get the translation from a config checker message/sentence */
    get(type: "other", id: OtherIds): string;
    get(type: "message", id: MessageIds): string;
    get(type: "message" | "other", id: string): string | null;
    /**Set the translation for a config checker message/sentence. This function also overwrites existing translations!*/
    set(type: "other", id: OtherIds, translation: string): boolean;
    set(type: "message", id: MessageIds, translation: string): boolean;
    set(type: "message" | "other", id: string, translation: string): boolean;
    /**Delete the translation for a config checker message/sentence. */
    delete(type: "other", id: OtherIds): boolean;
    delete(type: "message", id: MessageIds): boolean;
    delete(type: "message" | "other", id: string): boolean;
    /**Get all translations */
    getAll(): {
        type: "message" | "other";
        id: string;
        translation: string;
    }[];
    /**Insert the translation params into the text. */
    insertTranslationParams(text: string, translationParams: string[]): string;
    /**A shortcut to copy translations from the `ODLanguageManager` to `ODCheckerTranslationRegister` */
    quickTranslate(manager: ODLanguageManager, translationId: string, type: "other" | "message", id: OtherIds | MessageIds): void;
    quickTranslate(manager: ODLanguageManager, translationId: string, type: "other" | "message", id: string): void;
}

/**## ODCheckerTranslationRegisterMessageIdMappings `type`
 * A list of all available IDs in the default `ODCheckerTranslationRegister` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare type ODCheckerTranslationRegisterMessageIdMappings = ("opendiscord:invalid-type" | "opendiscord:property-missing" | "opendiscord:property-optional" | "opendiscord:object-disabled" | "opendiscord:null-invalid" | "opendiscord:switch-invalid-type" | "opendiscord:object-switch-invalid-type" | "opendiscord:string-too-short" | "opendiscord:string-too-long" | "opendiscord:string-length-invalid" | "opendiscord:string-starts-with" | "opendiscord:string-ends-with" | "opendiscord:string-contains" | "opendiscord:string-inverted-contains" | "opendiscord:string-choices" | "opendiscord:string-lowercase" | "opendiscord:string-uppercase" | "opendiscord:string-special-characters" | "opendiscord:string-no-spaces" | "opendiscord:string-regex" | "opendiscord:string-capital-word" | "opendiscord:string-capital-sentence" | "opendiscord:string-punctuation" | "opendiscord:number-nan" | "opendiscord:number-too-short" | "opendiscord:number-too-long" | "opendiscord:number-length-invalid" | "opendiscord:number-too-small" | "opendiscord:number-too-large" | "opendiscord:number-not-equal" | "opendiscord:number-step" | "opendiscord:number-step-offset" | "opendiscord:number-starts-with" | "opendiscord:number-ends-with" | "opendiscord:number-contains" | "opendiscord:number-inverted-contains" | "opendiscord:number-choices" | "opendiscord:number-float" | "opendiscord:number-negative" | "opendiscord:number-positive" | "opendiscord:number-zero" | "opendiscord:boolean-true" | "opendiscord:boolean-false" | "opendiscord:array-empty-disabled" | "opendiscord:array-empty-required" | "opendiscord:array-too-short" | "opendiscord:array-too-long" | "opendiscord:array-length-invalid" | "opendiscord:array-invalid-types" | "opendiscord:array-double" | "opendiscord:discord-invalid-id" | "opendiscord:discord-invalid-id-options" | "opendiscord:discord-invalid-token" | "opendiscord:color-invalid" | "opendiscord:emoji-too-short" | "opendiscord:emoji-too-long" | "opendiscord:emoji-custom" | "opendiscord:emoji-invalid" | "opendiscord:url-invalid" | "opendiscord:url-invalid-http" | "opendiscord:url-invalid-protocol" | "opendiscord:url-invalid-hostname" | "opendiscord:url-invalid-extension" | "opendiscord:url-invalid-path" | "opendiscord:id-not-unique" | "opendiscord:id-non-existent" | "opendiscord:invalid-language" | "opendiscord:invalid-button" | "opendiscord:unused-option" | "opendiscord:unused-question" | "opendiscord:dropdown-option");

/**## ODCheckerTranslationRegisterOtherIdMappings `type`
 * A list of all available IDs in the default `ODCheckerTranslationRegister` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare type ODCheckerTranslationRegisterOtherIdMappings = ("opendiscord:header-openticket" | "opendiscord:header-configchecker" | "opendiscord:header-description" | "opendiscord:type-error" | "opendiscord:type-warning" | "opendiscord:type-info" | "opendiscord:data-path" | "opendiscord:data-docs" | "opendiscord:data-message" | "opendiscord:compact-information" | "opendiscord:footer-error" | "opendiscord:footer-warning" | "opendiscord:footer-support");

/**## ODCheckerTypeSwitchStructure `class`
 * This is an Open Discord config checker structure.
 *
 * This class will switch checkers based on the type of the variable in a config file, customise it in the settings!
 */
declare class ODCheckerTypeSwitchStructure extends ODCheckerStructure {
    options: ODCheckerTypeSwitchStructureOptions;
    constructor(id: ODValidId, options: ODCheckerTypeSwitchStructureOptions);
    check(checker: ODChecker, value: any, locationTrace: ODCheckerLocationTrace): boolean;
}

/**## ODCheckerTypeSwitchStructureOptions `interface`
 * This interface has the options for `ODCheckerTypeSwitchStructure`!
 */
declare interface ODCheckerTypeSwitchStructureOptions extends ODCheckerStructureOptions {
    /**A checker that will always run (replaces all other checkers) */
    all?: ODCheckerStructure;
    /**A checker when the property is a string */
    string?: ODCheckerStringStructure;
    /**A checker when the property is a number */
    number?: ODCheckerNumberStructure;
    /**A checker when the property is a boolean */
    boolean?: ODCheckerBooleanStructure;
    /**A checker when the property is null */
    null?: ODCheckerNullStructure;
    /**A checker when the property is an array */
    array?: ODCheckerArrayStructure;
    /**A checker when the property is an object */
    object?: ODCheckerObjectStructure;
    /**A checker when the property is something else */
    other?: ODCheckerStructure;
    /**A list of allowed types */
    allowedTypes: ("string" | "number" | "boolean" | "null" | "array" | "object" | "other")[];
}

/**## ODClearMessageState `class
 * A special class with state types for the Open Ticket clear tickets message.
 */
declare class ODClearMessageState extends api_2.ODState<{
    /**The method this message was generated with. */
    messageOrigin: "slash" | "text" | "other";
    /**The clear filters. */
    clearFilter: ODTicketClearFilter;
    /**The list of ticket channel names (e.g. `#ticket-1`) to be cleared. */
    clearChannelNameList: string[];
}, false, true> {
    constructor(id: api_2.ODValidId, client: api_2.ODClientManager, database: api_2.ODDatabase);
}

/**## ODClientActivityManager `class`
 * This is an Open Discord client activity manager.
 *
 * It's responsible for managing the client status. Here, you can set the activity & status of the bot.
 *
 * It also has a built-in refresh function, so the status will refresh every 10 minutes to keep it visible.
 */
declare class ODClientActivityManager {
    /**Alias to Open Discord debugger. */
    protected debug: ODDebugger;
    /**Copy of discord.js client */
    protected client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>;
    /**The current status type */
    type: ODClientActivityType;
    /**The current status text */
    text: string;
    /**The current status mode */
    mode: ODClientActivityMode;
    /**Additional state text */
    state: string;
    /**The timer responsible for refreshing the status. Stop it using `clearInterval(interval)` */
    interval?: NodeJS.Timeout;
    /**status refresh interval in seconds (5 minutes by default)*/
    refreshInterval: number;
    /**Is the status already initiated? */
    initiated: boolean;
    constructor(debug: ODDebugger, client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>);
    /**Update the status. When already initiated, it can take up to 10min to see the updated status in discord. */
    setStatus(type: ODClientActivityType, text: string, mode: ODClientActivityMode, state: string, forceUpdate?: boolean): void;
    /**When initiating the status, the bot starts updating the status using `discord.js`. Returns `true` when successfull. */
    initStatus(): boolean;
    /**Update the client status */
    private updateClientActivity;
    /**Get the enum that links to the correct type */
    private getStatusTypeEnum;
    /**Get the status type (for displaying the status) */
    getStatusType(): "listening " | "playing " | "watching " | "";
}

/**## ODClientActivityMode `type`
 * Possible activity statuses for the bot.
 */
declare type ODClientActivityMode = ("online" | "invisible" | "idle" | "dnd");

/**## ODClientActivityType `type`
 * Possible activity types for the bot.
 */
declare type ODClientActivityType = ("playing" | "listening" | "watching" | "custom" | false);

/**## ODClientIntents `type`
 * A list of intents required when inviting the bot.
 */
declare type ODClientIntents = ("Guilds" | "GuildMembers" | "GuildModeration" | "GuildEmojisAndStickers" | "GuildIntegrations" | "GuildWebhooks" | "GuildInvites" | "GuildVoiceStates" | "GuildPresences" | "GuildMessages" | "GuildMessageReactions" | "GuildMessageTyping" | "DirectMessages" | "DirectMessageReactions" | "DirectMessageTyping" | "MessageContent" | "GuildScheduledEvents" | "AutoModerationConfiguration" | "AutoModerationExecution");

/**## ODClientManager `class`
 * This is an Open Discord client manager.
 *
 * It is responsible for managing the discord.js client. Here, you can set the status, register slash commands and much more!
 *
 * If you want, you can also listen for custom events on the `ODClientManager.client` variable (`discord.Client`)
 */
declare class ODClientManager<SlashIdList extends ODSlashCommandManagerIdConstraint = ODSlashCommandManagerIdConstraint, TextIdList extends ODTextCommandManagerIdConstraint = ODTextCommandManagerIdConstraint, ContextMenuIdList extends ODContextMenuManagerIdConstraint = ODContextMenuManagerIdConstraint> {
    /**Alias to Open Discord debugger. */
    protected debug: ODDebugger;
    /**List of required bot intents. Add intents to this list using the `onClientLoad` event. */
    intents: ODClientIntents[];
    /**List of required bot privileged intents. Add intents to this list using the `onClientLoad` event. */
    privileges: ODClientPriviligedIntents[];
    /**List of required bot partials. Add intents to this list using the `onClientLoad` event. **❌ Only use when neccessery!** */
    partials: ODClientPartials[];
    /**List of required bot permissions. Add permissions to this list using the `onClientLoad` event. */
    permissions: ODClientPermissions[];
    /**The discord bot token, empty by default. */
    set token(value: string);
    get token(): string;
    /**The discord  bot token. **DON'T USE THIS!!!** (use `ODClientManager.token` instead) */
    private rawBotToken;
    /**The discord.js `discord.Client`. Only use it when initiated! */
    client: discord.Client<true>;
    /**The discord.js REST client. Used for stuff that discord.js can't handle :) */
    rest: discord.REST;
    /**Is the bot initiated? */
    initiated: boolean;
    /**Is the bot logged in? */
    loggedIn: boolean;
    /**Is the bot ready? */
    ready: boolean;
    /**The main server of the bot. Provided by serverId in the config */
    mainServer: discord.Guild | null;
    /**(❌ DO NOT OVERWRITE ❌) Internal Open Discord function to continue the startup when the client is ready! */
    readyListener: (() => Promise<void>) | null;
    /**The status manager is responsible for setting the bot status. */
    activity: ODClientActivityManager;
    /**The slash command manager is responsible for all slash commands & their events inside the bot. */
    slashCommands: ODSlashCommandManager<SlashIdList>;
    /**The text command manager is responsible for all text commands & their events inside the bot. */
    textCommands: ODTextCommandManager<TextIdList>;
    /**The context menu manager is responsible for all context menus & their events inside the bot. */
    contextMenus: ODContextMenuManager<ContextMenuIdList>;
    /**The autocomplete manager is responsible for all autocomplete events inside the bot. */
    autocompletes: ODAutocompleteManager;
    constructor(debug: ODDebugger);
    /**Initiate the `client` variable & add the intents & partials to the bot. */
    initClient(): void;
    /**Get all servers the bot is part of. */
    getGuilds(): Promise<discord.Guild[]>;
    /**Check if the bot is in a specific guild */
    checkBotInGuild(guild: discord.Guild): boolean;
    /**Check if a specific guild has all required permissions (or `Administrator`) */
    checkGuildPerms(guild: discord.Guild): boolean;
    /**Log-in with a discord auth token. Rejects returns `false` using 'softErrors' on failure. */
    login(softErrors?: boolean): Promise<boolean>;
    /**A simplified shortcut to get a `discord.User`. */
    fetchUser(id: string): Promise<discord.User | null>;
    /**A simplified shortcut to get a `discord.Guild`. */
    fetchGuild(id: string): Promise<discord.Guild | null>;
    /**A simplified shortcut to get a `discord.Channel`. */
    fetchChannel(id: string): Promise<discord.Channel | null>;
    /**A simplified shortcut to get a `discord.TextChannel` (guild or DM). */
    fetchTextChannel(id: string): Promise<discord.TextChannel | discord.DMChannel | discord.PartialDMChannel | null>;
    /**A simplified shortcut to get a `discord.GuildBasedChannel`. */
    fetchGuildChannel(guildId: string | discord.Guild, id: string): Promise<discord.GuildBasedChannel | null>;
    /**A simplified shortcut to get a `discord.TextChannel`. */
    fetchGuildTextChannel(guildId: string | discord.Guild, id: string): Promise<discord.TextChannel | null>;
    /**A simplified shortcut to get a `discord.CategoryChannel`. */
    fetchGuildCategoryChannel(guildId: string | discord.Guild, id: string): Promise<discord.CategoryChannel | null>;
    /**A simplified shortcut to get a `discord.GuildMember`. */
    fetchGuildMember(guildId: string | discord.Guild, id: string): Promise<discord.GuildMember | null>;
    /**A simplified shortcut to get a `discord.Role`. */
    fetchGuildRole(guildId: string | discord.Guild, id: string): Promise<discord.Role | null>;
    /**A simplified shortcut to get a `discord.Message`. */
    fetchChannelMessage(channelId: string | discord.TextChannel | discord.DMChannel, id: string): Promise<discord.Message<boolean> | null>;
    /**A simplified shortcut to send a DM to a user. */
    sendUserDm(user: string | discord.User, build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<false>>;
}

/**## ODClientPartials `type`
 * A list of partials required for the bot to work. (`Message` & `Channel` are for receiving DM messages from uncached channels)
 */
declare type ODClientPartials = ("User" | "Channel" | "GuildMember" | "Message" | "Reaction" | "GuildScheduledEvent" | "ThreadMember");

/**## ODClientPermissions `type`
 * A list of permissions required in the server that the bot is active in.
 */
declare type ODClientPermissions = ("CreateInstantInvite" | "KickMembers" | "BanMembers" | "Administrator" | "ManageChannels" | "ManageGuild" | "AddReactions" | "ViewAuditLog" | "PrioritySpeaker" | "Stream" | "ViewChannel" | "SendMessages" | "SendTTSMessages" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "ReadMessageHistory" | "MentionEveryone" | "UseExternalEmojis" | "ViewGuildInsights" | "Connect" | "Speak" | "MuteMembers" | "DeafenMembers" | "MoveMembers" | "UseVAD" | "ChangeNickname" | "ManageNicknames" | "ManageRoles" | "ManageWebhooks" | "ManageGuildExpressions" | "UseApplicationCommands" | "RequestToSpeak" | "ManageEvents" | "ManageThreads" | "CreatePublicThreads" | "CreatePrivateThreads" | "UseExternalStickers" | "SendMessagesInThreads" | "UseEmbeddedActivities" | "ModerateMembers" | "ViewCreatorMonetizationAnalytics" | "UseSoundboard" | "UseExternalSounds" | "SendVoiceMessages");

/**## ODClientPriviligedIntents `type`
 * A list of priviliged intents required to be enabled in the developer portal.
 */
declare type ODClientPriviligedIntents = ("GuildMembers" | "MessageContent" | "Presence");

/**## ODCommandResponder `class`
 * This is an Open Discord command responder.
 *
 * This class manages all workers which are executed when the related command is triggered.
 */
declare class ODCommandResponder<Origin extends "slash" | "text", Params, WorkerIds extends string = string> extends ODResponderImplementation<ODCommandResponderInstance, Origin, Params, WorkerIds> {
    /**The prefix of the text command needs to match this */
    prefix: string;
    constructor(id: ODValidId, prefix: string, match: string | RegExp, callback?: ODWorkerCallback<ODCommandResponderInstance, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Respond to this command */
    respond(instance: ODCommandResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODCommandResponderInstance `class`
 * This is an Open Discord command responder instance.
 *
 * An instance is an active slash interaction or used text command. You can reply to the command using `reply()` for both slash & text commands.
 */
declare class ODCommandResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.ChatInputCommandInteraction | discord.Message;
    /**The command wich is the source of this instance. */
    cmd: ODSlashCommand | ODTextCommand;
    /**The type/source of instance. (from text or slash command) */
    type: "message" | "interaction";
    /**Switches to `true` when a worker replies, edits or defers interaction. Will stop the timeout error from being shown. */
    protected ignoreResponderTimeout: boolean;
    /**The manager for all options of this command. */
    options: ODCommandResponderInstanceOptions;
    /**The user who triggered this command. */
    user: discord.User;
    /**The guild member who triggered this command. */
    member: discord.GuildMember | null;
    /**The guild where this command was triggered. */
    guild: discord.Guild | null;
    /**The channel where this command was triggered. */
    channel: discord.TextBasedChannel;
    constructor(interaction: discord.ChatInputCommandInteraction | discord.Message, cmd: ODSlashCommand | ODTextCommand, errorCallback: ODResponderTimeoutErrorCallback<ODCommandResponderInstance, "slash" | "text"> | null, timeoutMs: number | null, options?: ODTextCommandInteractionOption[]);
    /**Reply to this command. */
    reply(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Defer this command. */
    defer(ephemeral: boolean): Promise<boolean>;
    /**Show a modal as reply to this command. */
    modal(modal: ODModalBuildResult): Promise<boolean>;
}

/**## ODCommandResponderInstanceOptions `class`
 * This is an Open Discord command responder instance options manager.
 *
 * This class will manage all options & subcommands from slash & text commands.
 */
declare class ODCommandResponderInstanceOptions {
    /**The interaction to get data from. */
    private interaction;
    /**The command which is related to the interaction. */
    private cmd;
    /**A list of options which have been parsed by the text command parser. */
    private options;
    constructor(interaction: discord.ChatInputCommandInteraction | discord.Message, cmd: ODSlashCommand | ODTextCommand, options?: ODTextCommandInteractionOption[]);
    /**Get a string option. */
    getString(name: string, required: true): string;
    getString(name: string, required: false): string | null;
    /**Get a boolean option. */
    getBoolean(name: string, required: true): boolean;
    getBoolean(name: string, required: false): boolean | null;
    /**Get a number option. */
    getNumber(name: string, required: true): number;
    getNumber(name: string, required: false): number | null;
    /**Get a channel option. */
    getChannel(name: string, required: true): discord.TextChannel | discord.VoiceChannel | discord.StageChannel | discord.NewsChannel | discord.MediaChannel | discord.ForumChannel | discord.CategoryChannel;
    getChannel(name: string, required: false): discord.TextChannel | discord.VoiceChannel | discord.StageChannel | discord.NewsChannel | discord.MediaChannel | discord.ForumChannel | discord.CategoryChannel | null;
    /**Get a role option. */
    getRole(name: string, required: true): discord.Role;
    getRole(name: string, required: false): discord.Role | null;
    /**Get a user option. */
    getUser(name: string, required: true): discord.User;
    getUser(name: string, required: false): discord.User | null;
    /**Get a guild member option. */
    getGuildMember(name: string, required: true): discord.GuildMember;
    getGuildMember(name: string, required: false): discord.GuildMember | null;
    /**Get a mentionable option. */
    getMentionable(name: string, required: true): discord.User | discord.GuildMember | discord.Role;
    getMentionable(name: string, required: false): discord.User | discord.GuildMember | discord.Role | null;
    /**Get a subgroup. */
    getSubGroup(): string | null;
    /**Get a subcommand. */
    getSubCommand(): string | null;
}

/**## ODCommandResponderManager `class`
 * This is an Open Discord command responder manager.
 *
 * It contains all Open Discord command responders. These can respond to text & slash commands.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - write code once => reply to both slash & text commands at the same time!
 * - know where the request came from & parse options/subcommands & without errors!
 * - And so much more!
 */
declare class ODCommandResponderManager<IdList extends ODCommandResponderManagerIdConstraint = ODCommandResponderManagerIdConstraint> extends ODManager<ODCommandResponder<"slash" | "text", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODCommandResponderInstance, "slash" | "text"> | null, ms: number | null): void;
    add(data: ODCommandResponder<"slash" | "text", any>, overwrite?: boolean): boolean;
    get<CommandResponderId extends keyof ODNoGeneric<IdList>>(id: CommandResponderId): ODCommandResponder<IdList[CommandResponderId]["origin"], IdList[CommandResponderId]["params"], IdList[CommandResponderId]["workers"]>;
    get(id: ODValidId): ODCommandResponder<"slash" | "text", any> | null;
    remove<CommandResponderId extends keyof ODNoGeneric<IdList>>(id: CommandResponderId): ODCommandResponder<IdList[CommandResponderId]["origin"], IdList[CommandResponderId]["params"], IdList[CommandResponderId]["workers"]>;
    remove(id: ODValidId): ODCommandResponder<"slash" | "text", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODCommandResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODCommandResponderManager` class.
 */
declare type ODCommandResponderManagerIdConstraint = Record<string, {
    origin: "slash" | "text";
    params: object;
    workers: string;
}>;

/**## ODCommandResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODCommandResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODCommandResponderManagerIdMappings extends api_2.ODCommandResponderManagerIdConstraint {
    "opendiscord:help": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:help" | "opendiscord:logs";
    };
    "opendiscord:stats": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:stats" | "opendiscord:logs";
    };
    "opendiscord:panel": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:panel" | "opendiscord:logs";
    };
    "opendiscord:ticket": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:ticket" | "opendiscord:logs";
    };
    "opendiscord:blacklist": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:blacklist" | "opendiscord:discord-logs" | "opendiscord:logs";
    };
    "opendiscord:close": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:close" | "opendiscord:logs";
    };
    "opendiscord:reopen": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:reopen" | "opendiscord:logs";
    };
    "opendiscord:delete": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:delete" | "opendiscord:logs";
    };
    "opendiscord:claim": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:claim" | "opendiscord:logs";
    };
    "opendiscord:unclaim": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:unclaim" | "opendiscord:logs";
    };
    "opendiscord:pin": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:pin" | "opendiscord:logs";
    };
    "opendiscord:unpin": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:unpin" | "opendiscord:logs";
    };
    "opendiscord:rename": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:rename" | "opendiscord:logs";
    };
    "opendiscord:move": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:move" | "opendiscord:logs";
    };
    "opendiscord:add": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:add" | "opendiscord:logs";
    };
    "opendiscord:remove": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:remove" | "opendiscord:logs";
    };
    "opendiscord:clear": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:clear" | "opendiscord:logs";
    };
    "opendiscord:topic": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:topic" | "opendiscord:logs";
    };
    "opendiscord:priority": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:priority" | "opendiscord:logs";
    };
    "opendiscord:transfer": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:transfer" | "opendiscord:logs";
    };
    "opendiscord:transcripts": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:transcripts" | "opendiscord:logs";
    };
    "opendiscord:autoclose": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:autoclose" | "opendiscord:logs";
    };
    "opendiscord:autodelete": {
        origin: "slash" | "text";
        params: {};
        workers: "opendiscord:autodelete" | "opendiscord:logs";
    };
}

/**## ODComponent `class`
 * An Open Discord message/modal component.
 *
 * This class itself doesn't do anything, but is a blueprint for other
 * `ODComponent` classes which represent the new Discord message/modal components.
 */
declare abstract class ODComponent<Data extends object, BuildResult, Type extends ODComponentType = ODComponentType> {
    /**The id of this message/modal component. */
    id: ODId;
    /**The data or configuration of this message/modal component. */
    readonly data: Data;
    /**The type of this component. */
    readonly type: Type;
    constructor(id: ODValidId, type: Type, data: Data);
    /**Build this component. Returns `null` when invalid. */
    abstract build(): Promise<BuildResult | null> | BuildResult | null;
}

/**## ODComponentBuildResult `interface`
 * This interface contains the result from a built component (button/dropdown). This can be used in the `ODMessage` builder!
 */
declare interface ODComponentBuildResult {
    /**The id of this component (button or dropdown) */
    id: ODId;
    /**The discord component or `\n` when it is a spacer between action rows */
    component: discord.MessageActionRowComponentBuilder | "\n" | null;
}

/**## ODComponentFactory `class`
 * An Open Discord component factory.
 *
 * It is a collection of functions/workers/hooks which will build a Discord message/modal component from scratch.
 * Plugins can intercept and modify these workers to replace default behaviour or layout.
 */
declare class ODComponentFactory<Component extends ODComponent<object, any>, Origin extends string, Params, WorkerIds extends string = string> extends ODManagerData {
    /**A collection of all workers for this component factory.  */
    workers: ODWorkerManager<ODComponentFactoryInstance<Component>, Origin, Params, WorkerIds>;
    constructor(id: ODValidId, callback?: ODWorkerCallback<ODComponentFactoryInstance<Component>, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Run all workers and return the resulting discord.js builder. */
    build(origin: Origin, params: Params): Promise<ODComponentInferBuildResult<Component>>;
    /**Run all workers and return the resulting Open Discord `ODComponent`. */
    buildComponent(origin: Origin, params: Params): Promise<Component>;
    /**Duplicate this component factory. Warning: If workers access external variables (outside parameters), the clone will still use those variables. This might result in unexpected behaviour! */
    duplicate(newId?: ODValidId): ODComponentFactory<Component, Origin, Params, WorkerIds>;
}

/**## ODComponentFactoryInstance `class`
 * An Open Discord component factory instance.
 *
 * It will contain the final root component which is returned by an `ODComponentFactory`.
 * This component can be used in another `ODComponentFactory` or rendered to a message/modal.
 */
declare class ODComponentFactoryInstance<Component extends ODComponent<object, any>> {
    /**The root component of this factory. */
    private rootComponent;
    /**The root component of this factory. */
    getComponent(): Component | null;
    /**Set the root component of this factory. */
    setComponent<SetComponent extends Component | null>(c: SetComponent): SetComponent;
}

/**## ODComponentType `type`
 * Get the `ODComponent` class for a specific `ODComponentType`.
 */
declare interface ODComponentForType {
    "message": ODMessageComponent;
    "simple-message": ODSimpleMessageComponent;
    "modal": ODModalComponent;
    "action-row": ODActionRowComponent;
    "container": ODContainerComponent;
    "section": ODSectionComponent;
    "label": ODLabelComponent;
    "separator": ODSeparatorComponent;
    "text": ODTextComponent;
    "file": ODFileComponent;
    "gallery": ODGalleryComponent;
    "thumbnail": ODThumbnailComponent;
    "simple-content": ODContentComponent;
    "simple-embed": ODEmbedComponent;
    "simple-poll": ODPollComponent;
    "button": ODButtonComponent;
    "short-input": ODShortInputComponent;
    "paragraph-input": ODParagraphInputComponent;
    "dropdown": ODDropdownComponent;
    "radio-group": ODRadioGroupComponent;
    "checkbox-group": ODCheckboxGroupComponent;
    "checkbox": ODCheckboxComponent;
    "file-upload": ODFileUploadComponent;
}

/**## ODComponentInferBuildResult `type`
 * Infer the build result of a certain component.
 */
declare type ODComponentInferBuildResult<Component> = Component extends ODComponent<object, infer BuildResult> ? BuildResult : never;

/**## ODComponentManager `class`
 * An Open Discord component manager.
 *
 * Create message & modal templates, re-use components and design all visual elements of the bot.
 *
 * Using the Open Discord component system has many advantages compared to vanilla `discord.js`:
 * - Plugins can extend, edit & replace messages & components
 * - Includes automatic error handling
 * - Independent workers/hooks (with priority)
 * - Fail-safe design using try-catch
 * - Automatic switch between components v2 and legacy components depending on message requirements
 * - Get to know the origin of the request (e.g. button, dropdown, modal, ...)
 * - And so much more!
 */
declare class ODComponentManager<SharedIdList extends ODSharedComponentManagerIdConstraint = ODSharedComponentManagerIdConstraint, MessageIdList extends ODComponentManagerIdConstraint = ODComponentManagerIdConstraint, ModalIdList extends ODComponentManagerIdConstraint = ODComponentManagerIdConstraint, ModifierIdList extends ODComponentModifierManagerIdConstraint = ODComponentModifierManagerIdConstraint> {
    /**The manager for all shared components. */
    shared: ODSharedComponentManager<SharedIdList>;
    /**The manager for all messages components. */
    messages: ODMessageComponentManager<MessageIdList>;
    /**The manager for all modals components. */
    modals: ODModalComponentManager<ModalIdList>;
    /**The collection of all component modifiers. */
    modifiers: ODComponentModifierManager<ModifierIdList>;
    constructor(debug: ODDebugger);
}

/**## ODComponentManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODComponentManager` class.
 */
declare type ODComponentManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODComponentModifierManager `class`
 * An Open Discord component modifier manager.
 *
 * It contains a collection of all `ODMessageComponentModifier`'s. You can:
 * - Patch, modify, expand or update existing messages
 * - It Does not affect the original message (cloned)
 */
declare class ODComponentModifierManager<IdList extends ODComponentModifierManagerIdConstraint = ODComponentModifierManagerIdConstraint> extends ODManager<ODMessageComponentModifier<string, {}, string>> {
    constructor(debug: ODDebugger);
    get<ModifierId extends keyof ODNoGeneric<IdList>>(id: ModifierId): IdList[ModifierId];
    get(id: ODValidId): ODMessageComponentModifier<string, {}, string> | null;
    remove<ModifierId extends keyof ODNoGeneric<IdList>>(id: ModifierId): IdList[ModifierId];
    remove(id: ODValidId): ODMessageComponentModifier<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODComponentModifierManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODComponentModifierManager` class.
 */
declare type ODComponentModifierManagerIdConstraint = Record<string, ODMessageComponentModifier<string, {}, string>>;

/**## ODComponentModifierManagerIdMappings `interface`
 * A list of all available IDs in the default `ODComponentModifierManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODComponentModifierManagerIdMappings extends api_2.ODComponentModifierManagerIdConstraint {
    "opendiscord:close-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "reopen-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:reopen-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "close-message" | "autoclose-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:delete-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "close-message" | "autoclose-message" | "reopen-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:claim-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "unclaim-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:unclaim-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "claim-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:pin-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "unpin-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
    "opendiscord:unpin-ticket-verifybar": api_2.ODMessageComponentModifier<"ticket-message" | "pin-message", {
        guild: discord.Guild | null;
        channel: discord.TextBasedChannel;
        user: discord.User;
        verifybar: api_2.ODVerifyBar<string>;
    }, string>;
}

/**## ODComponentType `type`
 * The type of an `ODComponent`.
 */
declare type ODComponentType = "message" | "simple-message" | "modal" | "action-row" | "container" | "section" | "label" | "separator" | "text" | "file" | "gallery" | "thumbnail" | "simple-content" | "simple-embed" | "simple-poll" | "button" | "short-input" | "paragraph-input" | "dropdown" | "radio-group" | "checkbox-group" | "checkbox" | "file-upload";

/**## ODConfig `class`
 * This is an Open Discord config helper.
 * This class doesn't do anything at all, it just gives a template & basic methods for a config. Use `ODJsonConfig` instead!
 *
 * You can use this class if you want to create your own config implementation (e.g. `yml`, `xml`,...)!
 */
declare abstract class ODConfig<Data extends any> extends ODManagerData {
    /**The name of the file with extension. */
    file: string;
    /**The path to the file relative to the main directory. */
    path: string;
    /**An object/array of the entire config file! Variables inside it can be edited while the bot is running! */
    data: Data;
    /**Is this config already initiated? */
    initiated: boolean;
    /**An array of listeners to run when the config gets reloaded. These are not executed on the initial loading. */
    protected reloadListeners: Function[];
    /**Alias to Open Discord debugger. */
    protected debug: ODDebugger | null;
    constructor(id: ODValidId, data: any);
    /**Use the Open Discord debugger for logs. */
    useDebug(debug: ODDebugger | null): void;
    /**Init the config. */
    init(): ODPromiseVoid;
    /**Reload the config. Be aware that this doesn't update the config data everywhere in the bot! */
    reload(): ODPromiseVoid;
    /**Save the edited config to the filesystem. This is used by the Interactive Setup CLI. It's not recommended to use this while the bot is running. */
    save(): ODPromiseVoid;
    /**Listen for a reload of this JSON file! */
    onReload(cb: Function): void;
    /**Remove all reload listeners. Not recommended! */
    removeAllReloadListeners(): void;
}

/**## ODConfigManager `class`
 * This is an Open Discord config manager.
 *
 * It manages all config files in the bot and allows plugins to access config files from Open Discord & other plugins!
 *
 * You can use this class to get/change/add a config file (`ODConfig`) in your plugin!
 */
declare class ODConfigManager<IdList extends ODConfigManagerIdConstraint = ODConfigManagerIdConstraint> extends ODManager<ODConfig<any>> {
    constructor(debug: ODDebugger);
    add(data: ODConfig<any> | ODConfig<any>[], overwrite?: boolean): boolean;
    /**Init all config files. */
    init(): Promise<void>;
    get<ConfigId extends keyof ODNoGeneric<IdList>>(id: ConfigId): IdList[ConfigId];
    get(id: ODValidId): ODConfig<any> | null;
    remove<ConfigId extends keyof ODNoGeneric<IdList>>(id: ConfigId): IdList[ConfigId];
    remove(id: ODValidId): ODConfig<any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODConfigManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODConfigManager` class.
 */
declare type ODConfigManagerIdConstraint = Record<string, ODConfig<any>>;

/**## ODConfigManagerIdMappings `interface`
 * A list of all available IDs in the default `ODConfigManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODConfigManagerIdMappings extends api_2.ODConfigManagerIdConstraint {
    "opendiscord:general": ODGeneralJsonCommentsConfig;
    "opendiscord:questions": ODQuestionsJsonCommentsConfig;
    "opendiscord:options": ODOptionsJsonCommentsConfig;
    "opendiscord:panels": ODPanelsJsonCommentsConfig;
    "opendiscord:transcripts": ODTranscriptsJsonCommentsConfig;
}

/**## ODConsoleManager `class`
 * This is the Open Discord console manager.
 *
 * It handles the entire console system of Open Discord. It's also the place where you need to log `ODConsoleMessage`'s.
 * This manager keeps a short history of messages sent to the console which is configurable by plugins.
 *
 * The debug file (`debug.txt`) is handled in a sub-manager!
 */
declare class ODConsoleManager {
    /**The history of `ODConsoleMessage`'s and `ODError`'s since startup */
    history: (ODConsoleMessage | ODError)[];
    /**The max length of the history. The oldest messages will be removed when over the limit */
    historylength: number;
    /**An alias to the debugfile manager. (`debug.txt`) */
    debugfile: ODDebugFileManager;
    /**Is silent mode enabled? */
    silent: boolean;
    constructor(historylength: number, debugfile: ODDebugFileManager);
    /**Log a message to the console ... But in the Open Discord way :) */
    log(message: ODConsoleMessage): void;
    log(message: ODError): void;
    log(message: string, type?: ODConsoleMessageTypes, params?: ODConsoleMessageParam[]): void;
    /**Shorten the history when it exceeds the max history length! */
    protected purgeHistory(): void;
}

/**## ODConsoleMessage `class`
 * This is an Open Discord console message.
 *
 * It is used to create beautiful & styled logs in the console with a prefix, message & parameters.
 * It also has full color support using `ansis` and parameters are parsed for you!
 */
declare class ODConsoleMessage {
    /**The main message sent in the console */
    message: string;
    /**An array of all the parameters in this message */
    params: ODConsoleMessageParam[];
    /**The prefix of this message (!uppercase recommended!) */
    prefix: string;
    /**The color of the prefix of this message */
    color: ODValidConsoleColor;
    constructor(message: string, prefix: string, color: ODValidConsoleColor, params?: ODConsoleMessageParam[]);
    /**Render this message to the console using `console.log`! Returns `false` when something went wrong. */
    render(): boolean;
    /**Create a more-detailed, non-colored version of this message to store it in the `debug.txt` file! */
    toDebugString(): string;
    /**Render the parameters of this message in a specific color. */
    createParamsString(color: ODValidConsoleColor): string;
    /**Set the message */
    setMessage(message: string): this;
    /**Set the params */
    setParams(params: ODConsoleMessageParam[]): this;
    /**Set the prefix */
    setPrefix(prefix: string): this;
    /**Set the prefix color */
    setColor(color: ODValidConsoleColor): this;
}

/**## ODConsoleMessageParam `type`
 * This interface contains all data required for a console log parameter within Open Discord.
 */
declare interface ODConsoleMessageParam {
    /**The key of this parameter. */
    key: string;
    /**The value of this parameter. */
    value: string;
    /**When enabled, this parameter will only be shown in the debug file. */
    hidden?: boolean;
}

/**## ODConsoleMessageTypes `type`
 * This is a collection of all the default console message types within Open Discord.
 */
declare type ODConsoleMessageTypes = "info" | "system" | "plugin" | "debug" | "warning" | "error";

/**## ODContainerComponent `class`
 * An embed-like container for text, titles, buttons, sections, separators and other components.
 */
declare class ODContainerComponent extends ODGroupComponent<ODContainerComponentData, ODValidContainerComponents, {
    container: discord.ContainerBuilder;
    attachments: discord.AttachmentBuilder[];
}> {
    constructor(id: ODValidId, data?: Partial<ODContainerComponentData>);
    build(): Promise<{
        container: discord.ContainerBuilder;
        attachments: discord.AttachmentBuilder[];
    }>;
    /**Set the accent color of this embed-like container. */
    setColor(color: discord.ColorResolvable | null): this;
    /**Mark the contents of this container as spoiler. */
    setSpoiler(spoiler: boolean): this;
}

/**## ODContainerComponentData `type`
 * The configurable settings/options for the `ODContainerComponent`.
 */
declare interface ODContainerComponentData {
    /**The color of this container. */
    color?: discord.ColorResolvable;
    /**Mark the contents of this container as spoiler. */
    spoiler: boolean;
}

/**## ODContentComponent `class`
 * A text component which renders markdown text in a message without `Components V2` enabled. (Old behaviour)
 */
declare class ODContentComponent extends ODComponent<ODContentComponentData, {
    content: string;
}> {
    constructor(id: ODValidId, data: Partial<ODContentComponentData>);
    build(): Promise<{
        content: string;
    }>;
    /**Set the text to display. */
    setContent(value: string): this;
}

/**## ODContentComponentData `type`
 * The configurable settings/options for the `ODContentComponent`.
 */
declare interface ODContentComponentData {
    /**The text to display. */
    content: string;
}

/**## ODContextMenu `class`
 * This is an Open Discord context menu.
 *
 * When registered, you can listen for this context menu using the `ODContextResponder`. The advantages of using this class for creating a context menu are:
 * - automatic registration in discord.js
 * - error reporting to the user when the bot fails to respond
 * - plugins can extend this context menu
 * - the bot won't re-register the context menu when it already exists (except when requested)!
 *
 * And more!
 */
declare class ODContextMenu extends ODManagerData {
    /**The discord.js builder for this context menu. */
    builder: ODContextMenuBuilder;
    /**The id of the guild this context menu is for. `null` when not set. */
    guildId: string | null;
    /**Function to check if the context menu requires to be updated (when it already exists). */
    requiresUpdate: ODContextMenuUpdateFunction | null;
    constructor(id: ODValidId, builder: ODContextMenuBuilder, requiresUpdate?: ODContextMenuUpdateFunction, guildId?: string);
    /**The name of this context menu. */
    get name(): string;
    set name(name: string);
}

/**## ODContextMenuBuilderUser `interface`
 * The builder for context menus.
 */
declare type ODContextMenuBuilder = (ODContextMenuBuilderMessage | ODContextMenuBuilderUser);

/**## ODContextMenuBuilderMessage `interface`
 * The builder for message context menus.
 */
declare interface ODContextMenuBuilderMessage extends discord.MessageApplicationCommandData {
    /**This field is required in Open Discord for future compatibility. */
    integrationTypes: discord.ApplicationIntegrationType[];
    /**This field is required in Open Discord for future compatibility. */
    contexts: discord.InteractionContextType[];
}

/**## ODContextMenuBuilderUser `interface`
 * The builder for user context menus.
 */
declare interface ODContextMenuBuilderUser extends discord.UserApplicationCommandData {
    /**This field is required in Open Discord for future compatibility. */
    integrationTypes: discord.ApplicationIntegrationType[];
    /**This field is required in Open Discord for future compatibility. */
    contexts: discord.InteractionContextType[];
}

/**## ODContextMenuComparator `class`
 * A utility class to compare existing context menu's with newly registered ones.
 */
declare class ODContextMenuComparator {
    /**Convert a `ODContextMenuBuilder` to a universal Open Discord context menu object for comparison. */
    convertBuilder(builder: ODContextMenuBuilder, guildId: string | null): ODContextMenuUniversalMenu | null;
    /**Convert a `discord.ApplicationCommand` to a universal Open Discord context menu object for comparison. */
    convertMenu(cmd: discord.ApplicationCommand): ODContextMenuUniversalMenu | null;
    /**Returns `true` when the 2 context menus are the same. */
    compare(ctxA: ODContextMenuUniversalMenu, ctxB: ODContextMenuUniversalMenu): boolean;
}

/**## ODContextMenuInteractionCallback `type`
 * Callback for the context menu interaction listener.
 */
declare type ODContextMenuInteractionCallback = (interaction: discord.ContextMenuCommandInteraction, cmd: ODContextMenu) => void;

/**## ODContextMenuManager `class`
 * This is an Open Discord client context menu manager.
 *
 * It's responsible for managing all the context interactions from the client.
 *
 * Here, you can add & remove context interactions & the bot will do the (de)registering.
 */
declare class ODContextMenuManager<IdList extends ODContextMenuManagerIdConstraint = ODContextMenuManagerIdConstraint> extends ODManager<ODContextMenu> {
    /**Refrerence to discord.js client. */
    protected client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>;
    /**Discord.js application commands manager. */
    commandManager: discord.ApplicationCommandManager | null;
    /**Collection of all interaction listeners. */
    protected interactionListeners: {
        name: string | RegExp;
        callback: ODContextMenuInteractionCallback;
    }[];
    /**Set the soft limit for maximum amount of listeners. A warning will be shown when there are more listeners than this limit. */
    listenerLimit: number;
    /**A utility class used to compare 2 context menus with each other. */
    comparator: ODContextMenuComparator;
    constructor(debug: ODDebugger, client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>);
    /**Get all registered & unregistered message context menu commands. */
    getAllRegisteredMenus(guildId?: string): Promise<ODContextMenuRegisteredResult>;
    /**Create all context menus that are not registered yet.*/
    createNewMenus(instances: ODContextMenu[], progress?: ODManualProgressBar): Promise<void>;
    /**Update all context menus that are already registered. */
    updateExistingMenus(instances: ODContextMenu[], progress?: ODManualProgressBar): Promise<void>;
    /**Remove all context menus that are registered but unused by Open Discord. */
    removeUnusedMenus(instances: ODContextMenuUniversalMenu[], guildId?: string, progress?: ODManualProgressBar): Promise<void>;
    /**Create a context menu. **(SYSTEM ONLY)** => Use `ODContextMenuManager` for registering context menu's the default way! */
    createMenu(menu: ODContextMenu): Promise<void>;
    /**Start listening to the discord.js client `interactionCreate` event. */
    startListeningToInteractions(): void;
    /**Callback on interaction from one or multiple context menu's. */
    onInteraction(menuName: keyof ODNoGeneric<IdList>, callback: ODContextMenuInteractionCallback): void;
    onInteraction(menuName: string | RegExp, callback: ODContextMenuInteractionCallback): void;
    get<ContextMenuId extends keyof ODNoGeneric<IdList>>(id: ContextMenuId): IdList[ContextMenuId];
    get(id: ODValidId): ODContextMenu | null;
    remove<ContextMenuId extends keyof ODNoGeneric<IdList>>(id: ContextMenuId): IdList[ContextMenuId];
    remove(id: ODValidId): ODContextMenu | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODContextMenuManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODContextMenuManager` class.
 */
declare type ODContextMenuManagerIdConstraint = Record<string, ODContextMenu>;

/**## ODContextMenuManagerIdMappings `interface`
 * A list of all available IDs in the default `ODContextMenuManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODContextMenuManagerIdMappings extends api_2.ODContextMenuManagerIdConstraint {
}

/**## ODContextMenuRegisteredResult `type`
 * The result which will be returned when getting all (un)registered user context menu's from the manager.
 */
declare type ODContextMenuRegisteredResult = {
    /**A list of all registered context menus. */
    registered: {
        /**The instance (`ODContextMenu`) from this context menu. */
        instance: ODContextMenu;
        /**The universal object/template/builder of this context menu. */
        menu: ODContextMenuUniversalMenu;
        /**Does this context menu require an update? */
        requiresUpdate: boolean;
    }[];
    /**A list of all unregistered context menus. */
    unregistered: {
        /**The instance (`ODContextMenu`) from this context menu. */
        instance: ODContextMenu;
        /**The universal object/template/builder of this context menu. */
        menu: null;
        /**Does this context menu require an update? */
        requiresUpdate: true;
    }[];
    /**A list of all unused context menus (not found in `ODContextMenuManager`). */
    unused: {
        /**The instance (`ODContextMenu`) from this context menu. */
        instance: null;
        /**The universal object/template/builder of this context menu. */
        menu: ODContextMenuUniversalMenu;
        /**Does this context menu require an update? */
        requiresUpdate: false;
    }[];
};

/**## ODContextMenuResponder `class`
 * This is an Open Discord context menu responder.
 *
 * This class manages all workers which are executed when the related context menu is triggered.
 */
declare class ODContextMenuResponder<Origin extends string, Params, WorkerIds extends string = string> extends ODResponderImplementation<ODContextMenuResponderInstance, Origin, Params, WorkerIds> {
    /**Respond to this button */
    respond(instance: ODContextMenuResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODContextMenuResponderInstance `class`
 * This is an Open Discord context menu responder instance.
 *
 * An instance is an active context menu interaction. You can reply to the context menu using `reply()`.
 */
declare class ODContextMenuResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.ContextMenuCommandInteraction;
    /**Switches to `true` when a worker replies, edits or defers interaction. Will stop the timeout error from being shown. */
    protected ignoreResponderTimeout: boolean;
    /**The context menu wich is the source of this instance. */
    menu: ODContextMenu;
    /**The user who triggered this context menu. */
    user: discord.User;
    /**The guild member who triggered this context menu. */
    member: discord.GuildMember | null;
    /**The guild where this context menu was triggered. */
    guild: discord.Guild | null;
    /**The channel where this context menu was triggered. */
    channel: discord.TextBasedChannel;
    /**The target of this context menu (user or message). */
    target: discord.Message | discord.User;
    constructor(interaction: discord.ContextMenuCommandInteraction, menu: ODContextMenu, errorCallback: ODResponderTimeoutErrorCallback<ODContextMenuResponderInstance, "context-menu"> | null, timeoutMs: number | null);
    /**Reply to this context menu. */
    reply(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Update the message of this context menu. */
    update(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Defer this context menu. */
    defer(type: "reply", ephemeral: boolean): Promise<boolean>;
    /**Show a modal as reply to this context menu. */
    modal(modal: ODModalBuildResult): Promise<boolean>;
}

/**## ODContextMenuResponderManager `class`
 * This is an Open Discord context menu responder manager.
 *
 * It contains all Open Discord context menu responders. These can respond to user/message context menu interactions.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - know where the request came from!
 * - And so much more!
 */
declare class ODContextMenuResponderManager<IdList extends ODContextMenuResponderManagerIdConstraint = ODContextMenuResponderManagerIdConstraint> extends ODManager<ODContextMenuResponder<"context-menu", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODContextMenuResponderInstance, "context-menu"> | null, ms: number | null): void;
    add(data: ODContextMenuResponder<"context-menu", any>, overwrite?: boolean): boolean;
    get<ModalResponderId extends keyof ODNoGeneric<IdList>>(id: ModalResponderId): ODContextMenuResponder<IdList[ModalResponderId]["origin"], IdList[ModalResponderId]["params"], IdList[ModalResponderId]["workers"]>;
    get(id: ODValidId): ODContextMenuResponder<"context-menu", any> | null;
    remove<ModalResponderId extends keyof ODNoGeneric<IdList>>(id: ModalResponderId): ODContextMenuResponder<IdList[ModalResponderId]["origin"], IdList[ModalResponderId]["params"], IdList[ModalResponderId]["workers"]>;
    remove(id: ODValidId): ODContextMenuResponder<"context-menu", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODContextMenuResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODContextMenuResponderManager` class.
 */
declare type ODContextMenuResponderManagerIdConstraint = Record<string, {
    origin: "context-menu";
    params: object;
    workers: string;
}>;

/**## ODContextMenuResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODContextMenuResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODContextMenuResponderManagerIdMappings extends api_2.ODContextMenuResponderManagerIdConstraint {
}

/**## ODContextMenuUniversalMenu `interface`
 * A universal template for a context menu.
 *
 * Why universal? Both **existing context menus** & **unregistered templates** can be converted to this type.
 */
declare interface ODContextMenuUniversalMenu {
    /**The type of this context menu. (required => `Message`|`User`) */
    type: discord.ApplicationCommandType.Message | discord.ApplicationCommandType.User;
    /**The name of this context menu. */
    name: string;
    /**All localized names of this context menu. */
    nameLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**The id of the guild this context menu is registered in. */
    guildId: string | null;
    /**Is this context menu for 18+ users only? */
    nsfw: boolean;
    /**A bitfield of the user permissions required to use this context menu. */
    defaultMemberPermissions: bigint;
    /**Is this context menu available in DM? */
    dmPermission: boolean;
    /**A list of contexts where you can install this context menu. */
    integrationTypes: readonly discord.ApplicationIntegrationType[];
    /**A list of contexts where you can use this context menu. */
    contexts: readonly discord.InteractionContextType[];
}

/**## ODContextMenuUpdateFunction `type`
 * The function responsible for updating context menu's when they already exist.
 */
declare type ODContextMenuUpdateFunction = (menu: ODContextMenuUniversalMenu) => boolean;

/**## ODCooldown `class`
 * This is an Open Discord cooldown.
 *
 * It doesn't do anything on it's own, but it provides the methods that are used to interact with a cooldown.
 * This class can be extended from to create a working cooldown.
 *
 * There are also premade cooldowns available in the bot!
 */
declare abstract class ODCooldown<Data extends object> extends ODManagerData {
    data: ODManager<ODCooldownData<Data>>;
    /**Is this cooldown already initialized? */
    ready: boolean;
    constructor(id: ODValidId);
    /**Check this id and start cooldown when it exeeds the limit! Returns `true` when on cooldown! */
    abstract use(id: string): boolean;
    /**Check this id without starting or updating the cooldown. Returns `true` when on cooldown! */
    abstract check(id: string): boolean;
    /**Remove the cooldown for an id when available.*/
    abstract delete(id: string): void;
    /**Initialize the internal systems of this cooldown. */
    abstract init(): Promise<void> | void;
}

/**## ODCooldownData `class`
 * This is Open Discord cooldown data.
 *
 * It contains the instance of an active cooldown (e.g. for a user). It is handled by the cooldown itself.
 */
declare class ODCooldownData<Data extends object> extends ODManagerData {
    /**Is this cooldown active? */
    active: boolean;
    /**Additional data of this cooldown instance. (different for each cooldown type) */
    data: Data;
    constructor(id: ODValidId, active: boolean, data: Data);
}

/**## ODCooldownManager `class`
 * This is an Open Discord cooldown manager.
 *
 * It is responsible for managing all cooldowns in Open Discord. An example of this is the ticket creation cooldown.
 *
 * There are many types of cooldowns available, but you can also create your own!
 */
declare class ODCooldownManager<IdList extends ODCooldownManagerIdConstraint = ODCooldownManagerIdConstraint> extends ODManager<ODCooldown<object>> {
    constructor(debug: ODDebugger);
    /**Initiate all cooldowns in this manager. */
    init(): Promise<void>;
    get<CooldownId extends keyof ODNoGeneric<IdList>>(id: CooldownId): IdList[CooldownId];
    get(id: ODValidId): ODCooldown<object> | null;
    remove<CooldownId extends keyof ODNoGeneric<IdList>>(id: CooldownId): IdList[CooldownId];
    remove(id: ODValidId): ODCooldown<object> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODCooldownManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODCooldownManager` class.
 */
declare type ODCooldownManagerIdConstraint = Record<string, ODCooldown<object>>;

/**## ODCooldownManagerIdMappings `interface`
 * A list of all available IDs in the default `ODCooldownManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODCooldownManagerIdMappings extends api_2.ODCooldownManagerIdConstraint {
}

/**## ODCounterCooldown `class`
 * This is an Open Discord counter cooldown.
 *
 * It is is a cooldown based on a counter. When the number exceeds the limit, the cooldown is activated.
 * The number will automatically be decreased with a set amount & interval.
 */
declare class ODCounterCooldown extends ODCooldown<{
    value: number;
}> {
    /**The cooldown will activate when exceeding this limit. */
    activeLimit: number;
    /**The cooldown will deactivate when below this limit. */
    cancelLimit: number;
    /**The amount to increase the counter with everytime the cooldown is triggered/updated. */
    increment: number;
    /**The amount to decrease the counter over time. */
    decrement: number;
    /**The interval between decrements in milliseconds. */
    invervalMs: number;
    constructor(id: ODValidId, activeLimit: number, cancelLimit: number, increment: number, decrement: number, intervalMs: number);
    use(id: string): boolean;
    check(id: string): boolean;
    delete(id: string): void;
    init(): Promise<void>;
}

/**## ODDatabase `class`
 * This is an Open Discord database template.
 * This class doesn't do anything at all, it just gives a template & basic methods for a database. Use `ODJsonDatabase` instead!
 *
 * You can use this class if you want to create your own database implementation (e.g. `mongodb`, `mysql`,...)!
 */
declare abstract class ODDatabase<IdList extends ODDatabaseIdConstraint = ODDatabaseIdConstraint> extends ODManagerData {
    /**The name of the file with extension. */
    file: string;
    /**The path to the file relative to the main directory. */
    path: string;
    /**Init the database. */
    abstract init(): ODPromiseVoid;
    /**Add/Overwrite a specific category & key in the database. Returns `true` when overwritten. */
    abstract set<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string, value: IdList[CategoryId]): ODOptionalPromise<boolean>;
    abstract set(category: string, key: string, value: ODValidJsonType): ODOptionalPromise<boolean>;
    abstract set(category: string, key: string, value: ODValidJsonType): ODOptionalPromise<boolean>;
    /**Get a specific category & key in the database */
    abstract get<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<IdList[CategoryId] | undefined>;
    abstract get(category: string, key: string): ODOptionalPromise<ODValidJsonType | undefined>;
    abstract get(category: string, key: string): ODOptionalPromise<ODValidJsonType | undefined>;
    /**Delete a specific category & key in the database. Returns `true` when deleted. */
    abstract delete<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<boolean>;
    abstract delete(category: string, key: string): ODOptionalPromise<boolean>;
    abstract delete(category: string, key: string): ODOptionalPromise<boolean>;
    /**Check if a specific category & key exists in the database */
    abstract exists(category: keyof ODNoGeneric<IdList>, key: string): ODOptionalPromise<boolean>;
    abstract exists(category: string, key: string): ODOptionalPromise<boolean>;
    abstract exists(category: string, key: string): ODOptionalPromise<boolean>;
    /**Get a specific category in the database */
    abstract getCategory<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId): ODOptionalPromise<{
        key: string;
        value: IdList[CategoryId];
    }[] | undefined>;
    abstract getCategory(category: string): ODOptionalPromise<{
        key: string;
        value: ODValidJsonType;
    }[] | undefined>;
    abstract getCategory(category: string): ODOptionalPromise<{
        key: string;
        value: ODValidJsonType;
    }[] | undefined>;
    /**Get all values in the database */
    abstract getAll(): ODOptionalPromise<ODJsonDatabaseStructure>;
}

/**## ODDatabaseIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODDatabase` class.
 */
declare type ODDatabaseIdConstraint = Record<string, ODValidJsonType>;

/**## ODDatabaseManager `class`
 * This is an Open Discord database manager.
 *
 * It manages all databases in the bot and allows to permanently store data from the bot!
 *
 * You can use this class to get/add a database (`ODDatabase`) in your plugin!
 */
declare class ODDatabaseManager<IdList extends ODDatabaseManagerIdConstraint = ODDatabaseManagerIdConstraint> extends ODManager<ODDatabase<{}>> {
    constructor(debug: ODDebugger);
    /**Init all database files. */
    init(): Promise<void>;
    get<DatabaseId extends keyof ODNoGeneric<IdList>>(id: DatabaseId): IdList[DatabaseId];
    get(id: ODValidId): ODDatabase<{}> | null;
    remove<DatabaseId extends keyof ODNoGeneric<IdList>>(id: DatabaseId): IdList[DatabaseId];
    remove(id: ODValidId): ODDatabase<{}> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODDatabaseManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODDatabaseManager` class.
 */
declare type ODDatabaseManagerIdConstraint = Record<string, ODDatabase<{}>>;

/**## ODDatabaseManagerIdMappings `interface`
 * A list of all available IDs in the default `ODDatabaseManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODDatabaseManagerIdMappings extends api_2.ODDatabaseManagerIdConstraint {
    "opendiscord:global": ODGlobalDatabase;
    "opendiscord:stats": ODStatsDatabase;
    "opendiscord:tickets": ODTicketsDatabase;
    "opendiscord:users": ODUsersDatabase;
    "opendiscord:options": ODOptionsDatabase;
    "opendiscord:transcripts": ODTranscriptsDatabase;
    "opendiscord:message-states": ODMessageStatesDatabase;
}

/**## ODDebugConsoleMessage `class`
 * This is an Open Discord console debug message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "DEBUG" messages!
 */
declare class ODDebugConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODDebugFileManager `class`
 * This is the Open Discord debug file manager.
 *
 * It manages the Open Discord debug file (`debug.txt`) which keeps a history of all system logs.
 * There are even internal logs that aren't logged to the console which are available in this file!
 *
 * Using this class, you can change the max length of this file and some other cool things!
 */
declare class ODDebugFileManager {
    /**The path to the debugfile (`./debug.txt` by default) */
    path: string;
    /**The filename of the debugfile (`debug.txt` by default) */
    filename: string;
    /**The current version of the bot used in the debug file. */
    version: ODVersion;
    /**The max length of the debug file. */
    maxlines: number;
    constructor(path: string, filename: string, maxlines: number, version: ODVersion);
    /**Check if the debug file exists */
    protected existsDebugFile(): boolean;
    /**Read from the debug file */
    protected readDebugFile(): string | false;
    /**Write to the debug file and shorten it when needed. */
    protected writeDebugFile(text: string): void;
    /**Generate the statistics/header of the debug file (containing the version) */
    protected createStatsText(): string;
    /**Write the statistics/header to the debug file on startup */
    protected writeStartupStats(): void;
    /**Write an `ODConsoleMessage` to the debug file */
    writeConsoleMessage(message: ODConsoleMessage): void;
    /**Write an `ODError` to the debug file */
    writeErrorMessage(error: ODError): void;
    /**Write custom text to the debug file */
    writeText(text: string): void;
    /**Write a custom note to the debug file (starting with `[NOTE]:`) */
    writeNote(text: string): void;
}

/**## ODDebugger `class`
 * This is the Open Discord debugger.
 *
 * It is a simple wrapper around the `ODConsoleManager` to handle debugging (primarily for `ODManagers`).
 * Messages created using this debugger are only logged to the debug file unless specified otherwise.
 *
 * You will probably notice this class being used in the `ODManager` constructor.
 *
 * Using this system, all additions & removals inside a manager are logged to the debug file. This makes searching for errors a lot easier!
 */
declare class ODDebugger {
    /**An alias to the Open Discord console manager. */
    console: ODConsoleManager;
    /**When enabled, debug logs are also shown in the console. */
    visible: boolean;
    constructor(console: ODConsoleManager);
    /**Create a debug message. This will always be logged to `debug.txt` & sometimes to the console (when enabled). Returns `true` when visible */
    debug(message: string, params?: {
        key: string;
        value: string;
    }[]): boolean;
}

/**## ODDefaultCheckerRenderer `class`
 * This is the default render class which renders the config checkers in the console for most Open Discord projects.
 *
 * This class can be found in the global variable `opendiscord.checkers.renderer`!
 */
declare class ODDefaultCheckerRenderer extends ODCheckerRenderer {
    /**The main color used when rendering the config checker. */
    mainColor: `#${string}`;
    /**The url to the discord support server. */
    supportUrl: string;
    /**The url to the bot documentation. */
    docsUrl: string;
    /**Add additional header text. */
    extraHeaderText: string[];
    /**Add additional footer text. */
    extraFooterText: string[];
    /**Add additional top text. */
    extraTopText: string[];
    /**Add additional bottom text. */
    extraBottomText: string[];
    /**Set the character used for horizontal lines. */
    horizontalFiller: string;
    /**Set the character used for vertical lines. */
    verticalFiller: string;
    /**Set the prefix used for the description. */
    descriptionSeparator: string;
    /**Set the prefix used for the header.. */
    headerSeparator: string;
    /**Set the prefix used for the footer. */
    footerTipPrefix: string;
    /**Disable rendering the header. */
    disableHeader: boolean;
    /**Disable rendering the footer. */
    disableFooter: boolean;
    constructor(mainColor: `#${string}`, supportUrl: string, docsUrl: string);
    getComponents(compact: boolean, renderEmpty: boolean, translation: ODCheckerTranslationRegister<string, string>, data: ODCheckerResult): string[];
    /**Get the length of the longest string in the array. */
    private getLongestLength;
    /**Get a horizontal divider used between different parts of the config checker result. */
    private getHorizontalDivider;
    /**Create a block of text with a vertical divider on the left & right side. */
    private createBlockFromText;
}

/**## ODDefaultCheckerRendererTranslations `interface`
 * The required translation sentences for the default checker renderer.
 */
declare interface ODDefaultCheckerRendererTranslations {
    /**Example: `OPEN DISCORD`*/
    headerProjectName: string;
    /**Example: `CONFIG CHECKER`*/
    headerConfigchecker: string;
    /**Example: `check for errors in your config files!`*/
    headerDescription: string;
    /**Example: `the bot won't start until all {0}'s are fixed!`*/
    footerError: string;
    /**Example: `it's recommended to fix all {0}'s before starting!`*/
    footerWarning: string;
    /**Example: `SUPPORT: {0} - DOCS: {1}`*/
    footerSupport: string;
    /**Example: `[ERROR]`*/
    error: string;
    /**Example: `[WARNING]`*/
    warning: string;
    /**Example: `[INFO]`*/
    info: string;
    /**Example: `use {0} for more information!`*/
    compactInfo: string;
    /**Example: `path`*/
    dataPath: string;
    /**Example: `docs`*/
    dataDocs: string;
    /**Example: `message`*/
    dataMessage: string;
}

declare class ODDefaultProgressBarRenderer extends ODProgressBarRenderer<ODDefaultProgressBarRendererSettings> {
    constructor(id: ODValidId, settings: ODDefaultProgressBarRendererSettings);
    /**Switch between Ansis functions based on the specified color. */
    private switchColorAnsis;
}

/**## ODDefaultProgressBarRendererLabel `type`
 * All available label types for the default progress bar renderer
 */
declare type ODDefaultProgressBarRendererLabel = "value" | "percentage" | "fraction" | "time-ms" | "time-sec" | "time-min";

/**## ODDefaultProgressBarRendererSettings `interface`
 * All settings for the default progress bar renderer.
 */
declare interface ODDefaultProgressBarRendererSettings {
    /**The color of the progress bar border. */
    borderColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The color of the progress bar (filled side). */
    filledBarColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The color of the progress bar (empty side). */
    emptyBarColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The color of the text before the progress bar. */
    prefixColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The color of the text after the progress bar. */
    suffixColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The color of the progress bar label. */
    labelColor: ODValidConsoleColor | "openticket" | "openmoderation";
    /**The character used in the left border. */
    leftBorderChar: string;
    /**The character used in the right border. */
    rightBorderChar: string;
    /**The character used in the filled side of the progress bar. */
    filledBarChar: string;
    /**The character used in the empty side of the progress bar. */
    emptyBarChar: string;
    /**The label type. (will show a number related to the progress) */
    labelType: ODDefaultProgressBarRendererLabel;
    /**The position of the label. */
    labelPosition: "start" | "end";
    /**The width of the bar. (50 characters by default) */
    barWidth: number;
    /**Show the bar. */
    showBar: boolean;
    /**Show the label. */
    showLabel: boolean;
    /**Show the border. */
    showBorder: boolean;
}

/**## ODDiscordIdType `type`
 * A list of all available discord ID types. Used in the config checker.
 */
declare type ODDiscordIdType = "role" | "server" | "channel" | "category" | "user" | "member" | "interaction" | "message";

/**## ODDropdown `class`
 * This is an Open Discord dropdown builder.
 *
 * With this class, you can create a dropdown to use in a message.
 * The only difference with normal dropdowns is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODDropdown<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODDropdownInstance, Origin, Params, ODComponentBuildResult, WorkerIds> {
    /**Build this dropdown & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODComponentBuildResult>;
}

/**## ODDropdownComponent `class`
 * A dropdown component which renders an interactive dropdown inside the message/modal.
 * A reply can be sent using Open Discord responders.
 */
declare class ODDropdownComponent extends ODComponent<ODDropdownComponentData, discord.BaseSelectMenuBuilder<discord.APISelectMenuComponent>> {
    constructor(id: ODValidId, data: Partial<ODDropdownComponentData>);
    build(): Promise<discord.StringSelectMenuBuilder | discord.UserSelectMenuBuilder | discord.RoleSelectMenuBuilder | discord.MentionableSelectMenuBuilder | discord.ChannelSelectMenuBuilder>;
    /**Set the custom id of this dropdown. */
    setCustomId(id: string | null): this;
    /**Set the type of this dropdown. */
    setType(type: "string" | "role" | "channel" | "user" | "mentionable"): this;
    /**Set the minimum selection amount of this dropdown. */
    setMinValues(amount: number | null): this;
    /**Set the maximum selection amount of this dropdown. */
    setMaxValues(amount: number | null): this;
    /**Set the placeholder of this dropdown. */
    setPlaceholder(placeholder: string | null): this;
    /**Disable this dropdown. */
    setDisabled(disabled: boolean): this;
    /**Mark this dropdown as required in modals. */
    setRequired(required: boolean): this;
    /**Set the available channel types of this dropdown. */
    setChannelTypes(channelTypes: discord.ChannelType[]): this;
    /**Set the options of this dropdown (when `type == "string"`) */
    setOptions(options: discord.SelectMenuComponentOptionData[]): this;
    /**Set the users of this dropdown (when `type == "user"`) */
    setUsers(users: discord.User[]): this;
    /**Set the roles of this dropdown (when `type == "role"`) */
    setRoles(roles: discord.Role[]): this;
    /**Set the channels of this dropdown (when `type == "channel"`) */
    setChannels(channels: discord.Channel[]): this;
    /**Set the mentionables of this dropdown (when `type == "mentionable"`) */
    setMentionables(mentionables: (discord.User | discord.Role)[]): this;
}

/**## ODDropdownComponentData `type`
 * The configurable settings/options for the `ODDropdownComponent`.
 */
declare interface ODDropdownComponentData {
    /**The type of this dropdown. */
    type: "string" | "role" | "channel" | "user" | "mentionable";
    /**The custom id of this dropdown. */
    customId?: string;
    /**The placeholder of this dropdown. */
    placeholder?: string;
    /**The minimum amount of items to be selected in this dropdown. */
    minValues?: number;
    /**The maximum amount of items to be selected in this dropdown. */
    maxValues?: number;
    /**Is this dropdown disabled? */
    disabled?: boolean;
    /**Is this dropdown required? (MODAL ONLY) */
    required?: boolean;
    /**Allowed channel types when the type is "channel" */
    channelTypes?: discord.ChannelType[];
    /**The options when the type is "string" */
    options?: discord.SelectMenuComponentOptionData[];
    /**The options when the type is "user" */
    users?: discord.User[];
    /**The options when the type is "role" */
    roles?: discord.Role[];
    /**The options when the type is "channel" */
    channels?: discord.Channel[];
    /**The options when the type is "mentionable" */
    mentionables?: (discord.User | discord.Role)[];
}

/**## ODDropdownData `interface`
 * This interface contains the data to build a dropdown.
 */
declare interface ODDropdownData {
    /**The custom id of this dropdown */
    customId: string;
    /**The type of this dropdown */
    type: "string" | "role" | "channel" | "user" | "mentionable";
    /**The placeholder of this dropdown */
    placeholder: string | null;
    /**The minimum amount of items to be selected in this dropdown */
    minValues: number | null;
    /**The maximum amount of items to be selected in this dropdown */
    maxValues: number | null;
    /**Is this dropdown disabled? */
    disabled: boolean;
    /**Allowed channel types when the type is "channel" */
    channelTypes: discord.ChannelType[];
    /**The options when the type is "string" */
    options: discord.SelectMenuComponentOptionData[];
    /**The options when the type is "user" */
    users: discord.User[];
    /**The options when the type is "role" */
    roles: discord.Role[];
    /**The options when the type is "channel" */
    channels: discord.Channel[];
    /**The options when the type is "mentionable" */
    mentionables: (discord.User | discord.Role)[];
}

/**## ODDropdownInstance `class`
 * This is an Open Discord dropdown instance.
 *
 * It contains all properties & functions to build a dropdown!
 */
declare class ODDropdownInstance {
    /**The current data of this dropdown */
    data: ODDropdownData;
    /**Set the custom id of this dropdown */
    setCustomId(id: ODDropdownData["customId"]): this;
    /**Set the type of this dropdown */
    setType(type: ODDropdownData["type"]): this;
    /**Set the placeholder of this dropdown */
    setPlaceholder(placeholder: ODDropdownData["placeholder"]): this;
    /**Set the minimum amount of values in this dropdown */
    setMinValues(minValues: ODDropdownData["minValues"]): this;
    /**Set the maximum amount of values ax this dropdown */
    setMaxValues(maxValues: ODDropdownData["maxValues"]): this;
    /**Set the disabled of this dropdown */
    setDisabled(disabled: ODDropdownData["disabled"]): this;
    /**Set the channel types of this dropdown */
    setChannelTypes(channelTypes: ODDropdownData["channelTypes"]): this;
    /**Set the options of this dropdown (when `type == "string"`) */
    setOptions(options: ODDropdownData["options"]): this;
    /**Set the users of this dropdown (when `type == "user"`) */
    setUsers(users: ODDropdownData["users"]): this;
    /**Set the roles of this dropdown (when `type == "role"`) */
    setRoles(roles: ODDropdownData["roles"]): this;
    /**Set the channels of this dropdown (when `type == "channel"`) */
    setChannels(channels: ODDropdownData["channels"]): this;
    /**Set the mentionables of this dropdown (when `type == "mentionable"`) */
    setMentionables(mentionables: ODDropdownData["mentionables"]): this;
}

/**## ODDropdownManager `class`
 * This is an Open Discord dropdown manager.
 *
 * It contains all Open Discord dropdown builders. Here, you can add your own dropdowns or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODDropdownManager<IdList extends ODDropdownManagerIdConstraint = ODDropdownManagerIdConstraint> extends ODManagerWithSafety<ODDropdown<string, {}, string>> {
    constructor(debug: ODDebugger);
    /**Get a newline component for buttons & dropdowns! */
    getNewLine(id: ODValidId): ODComponentBuildResult;
    get<DropdownId extends keyof ODNoGeneric<IdList>>(id: DropdownId): ODDropdown<IdList[DropdownId]["origin"], IdList[DropdownId]["params"], IdList[DropdownId]["workers"]>;
    get(id: ODValidId): ODDropdown<string, {}, string> | null;
    remove<DropdownId extends keyof ODNoGeneric<IdList>>(id: DropdownId): ODDropdown<IdList[DropdownId]["origin"], IdList[DropdownId]["params"], IdList[DropdownId]["workers"]>;
    remove(id: ODValidId): ODDropdown<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<DropdownId extends keyof ODNoGeneric<IdList>>(id: DropdownId): ODDropdown<IdList[DropdownId]["origin"], IdList[DropdownId]["params"], IdList[DropdownId]["workers"]>;
    getSafe(id: ODValidId): ODDropdown<string, {}, string>;
}

/**## ODDropdownManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODDropdownManager` class.
 */
declare type ODDropdownManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODDropdownManagerIdMappings `interface`
 * A list of all available IDs in the default `ODDropdownManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODDropdownManagerIdMappings extends api_2.ODDropdownManagerIdConstraint {
    "opendiscord:panel-dropdown": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            options: (ODTicketOption | ODRoleOption | ODSubPanelOption)[];
        };
        workers: "opendiscord:panel-dropdown";
    };
    "opendiscord:priority-dropdown": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:priority-dropdown";
    };
}

/**## ODDropdownQuestion `class`
 * An Open Ticket dropdown question. It contains all config properties of the dropdown question type.
 */
declare class ODDropdownQuestion extends ODQuestion<ODDropdownQuestionIdMappings> {
    readonly type: "opendiscord:dropdown";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODDropdownQuestion;
}

/**## ODDropdownQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODDropdownQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODDropdownQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:placeholder": ODQuestionData<string>;
    "opendiscord:choices": ODQuestionData<ODQuestionsJsonConfig_DropdownChoice[]>;
}

/**## ODDropdownResponder `class`
 * This is an Open Discord dropdown responder.
 *
 * This class manages all workers which are executed when the related dropdown is triggered.
 */
declare class ODDropdownResponder<Origin extends string, Params, WorkerIds extends string = string> extends ODResponderImplementation<ODDropdownResponderInstance, Origin, Params, WorkerIds> {
    /**Respond to this dropdown */
    respond(instance: ODDropdownResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODDropdownResponderInstance `class`
 * This is an Open Discord dropdown responder instance.
 *
 * An instance is an active dropdown interaction. You can reply to the dropdown using `reply()`.
 */
declare class ODDropdownResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.AnySelectMenuInteraction;
    /**Switches to `true` when a worker replies, edits or defers interaction. Will stop the timeout error from being shown. */
    protected ignoreResponderTimeout: boolean;
    /**The dropdown type. */
    type: ODDropdownData["type"];
    /**The manager for all values of this dropdown. */
    values: ODDropdownResponderInstanceValues;
    /**The user who triggered this dropdown. */
    user: discord.User;
    /**The guild member who triggered this dropdown. */
    member: discord.GuildMember | null;
    /**The guild where this dropdown was triggered. */
    guild: discord.Guild | null;
    /**The channel where this dropdown was triggered. */
    channel: discord.TextBasedChannel;
    /**The message this dropdown originates from. */
    message: discord.Message;
    constructor(interaction: discord.AnySelectMenuInteraction, errorCallback: ODResponderTimeoutErrorCallback<ODDropdownResponderInstance, "dropdown"> | null, timeoutMs: number | null);
    /**Reply to this dropdown. */
    reply(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Update the message of this dropdown. */
    update(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Defer this dropdown. */
    defer(type: "reply" | "update", ephemeral: boolean): Promise<boolean>;
    /**Show a modal as reply to this dropdown. */
    modal(modal: ODModalBuildResult): Promise<boolean>;
    /**Get a component from the original message of this dropdown. */
    getMessageComponent(type: "button", id: string | RegExp): discord.ButtonComponent | null;
    getMessageComponent(type: "string-dropdown", id: string | RegExp): discord.StringSelectMenuComponent | null;
    getMessageComponent(type: "user-dropdown", id: string | RegExp): discord.UserSelectMenuComponent | null;
    getMessageComponent(type: "channel-dropdown", id: string | RegExp): discord.ChannelSelectMenuComponent | null;
    getMessageComponent(type: "role-dropdown", id: string | RegExp): discord.RoleSelectMenuComponent | null;
    getMessageComponent(type: "mentionable-dropdown", id: string | RegExp): discord.MentionableSelectMenuComponent | null;
    /**Get the first embed of the original message if it exists. */
    getMessageEmbed(): discord.Embed | null;
}

/**## ODDropdownResponderInstanceValues `class`
 * This is an Open Discord dropdown responder instance values manager.
 *
 * This class will manage all values from the dropdowns & select menus.
 */
declare class ODDropdownResponderInstanceValues {
    /**The interaction to get data from. */
    private interaction;
    /**The type of this dropdown. */
    private type;
    constructor(interaction: discord.AnySelectMenuInteraction, type: ODDropdownData["type"]);
    /**Get the selected values. */
    getStringValues(): string[];
    /**Get the selected roles. */
    getRoleValues(): Promise<discord.Role[]>;
    /**Get the selected users. */
    getUserValues(): Promise<discord.User[]>;
    /**Get the selected channels. */
    getChannelValues(): Promise<discord.Channel[]>;
    /**Get the selected mentionables. */
    getMentionableValues(): Promise<(discord.User | discord.Role)[]>;
}

/**## ODDropdownResponderManager `class`
 * This is an Open Discord dropdown responder manager.
 *
 * It contains all Open Discord dropdown responders. These can respond to dropdown interactions.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - know where the request came from!
 * - And so much more!
 */
declare class ODDropdownResponderManager<IdList extends ODDropdownResponderManagerIdConstraint = ODDropdownResponderManagerIdConstraint> extends ODManager<ODDropdownResponder<"dropdown", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    /**A list of listeners which will listen to the raw interactionCreate event from discord.js */
    private listeners;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODDropdownResponderInstance, "dropdown"> | null, ms: number | null): void;
    add(data: ODDropdownResponder<"dropdown", any>, overwrite?: boolean): boolean;
    get<DropdownResponderId extends keyof ODNoGeneric<IdList>>(id: DropdownResponderId): ODDropdownResponder<IdList[DropdownResponderId]["origin"], IdList[DropdownResponderId]["params"], IdList[DropdownResponderId]["workers"]>;
    get(id: ODValidId): ODDropdownResponder<"dropdown", any> | null;
    remove<DropdownResponderId extends keyof ODNoGeneric<IdList>>(id: DropdownResponderId): ODDropdownResponder<IdList[DropdownResponderId]["origin"], IdList[DropdownResponderId]["params"], IdList[DropdownResponderId]["workers"]>;
    remove(id: ODValidId): ODDropdownResponder<"dropdown", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODDropdownResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODDropdownResponderManager` class.
 */
declare type ODDropdownResponderManagerIdConstraint = Record<string, {
    origin: "dropdown";
    params: object;
    workers: string;
}>;

/**## ODDropdownResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODDropdownResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODDropdownResponderManagerIdMappings extends api_2.ODDropdownResponderManagerIdConstraint {
    "opendiscord:panel-dropdown": {
        origin: "dropdown";
        params: {};
        workers: "opendiscord:dropdown-ticket" | "opendiscord:dropdown-role" | "opendiscord:dropdown-subpanel";
    };
    "opendiscord:priority-dropdown": {
        origin: "dropdown";
        params: {};
        workers: "opendiscord:priority-dropdown";
    };
}

/**## ODDynamicStatistic `class`
 * This is an Open Discord dynamic statistic.
 *
 * A dynamic statistic does not store anything in the database! Instead, it will execute a function to return a custom result.
 * This can be used to show statistics which are not stored in the database.
 *
 * This is used in Open Discord for the live ticket status, participants & system status.
 */
declare class ODDynamicStatistic extends ODStatistic {
    constructor(id: ODValidId, priority: number, render: ODDynamicStatisticRenderer);
}

/**## ODDynamicStatisticRenderer `type`
 * This callback will render a single dynamic statistic for a discord embed/message.
 */
declare type ODDynamicStatisticRenderer = (scopeId: string, guild: discord.Guild, channel: discord.TextBasedChannel, user: discord.User) => string | Promise<string>;

/**Oh, what could this be `¯\_(ツ)_/¯` */
declare interface ODEasterEggs {
    creator: string;
    translators: string[];
}

/**## ODEmbed `class`
 * This is an Open Discord embed builder.
 *
 * With this class, you can create a embed to use in a message.
 * The only difference with normal embeds is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODEmbed<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODEmbedInstance, Origin, Params, ODEmbedBuildResult, WorkerIds> {
    /**Build this embed & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODEmbedBuildResult>;
}

/**## ODEmbedBuildResult `interface`
 * This interface contains the result from a built embed. This can be used in the `ODMessage` builder!
 */
declare interface ODEmbedBuildResult {
    /**The id of this embed */
    id: ODId;
    /**The discord embed */
    embed: discord.EmbedBuilder | null;
}

/**## ODEmbedComponent `class`
 * An embed component which renders an embed in a message without `Components V2` enabled. (Old behaviour)
 */
declare class ODEmbedComponent extends ODComponent<ODEmbedComponentData, discord.EmbedBuilder> {
    constructor(id: ODValidId, data: Partial<ODEmbedComponentData>);
    build(): Promise<discord.EmbedBuilder>;
    /**Set the title of this embed */
    setTitle(title: string | null): this;
    /**Set the color of this embed */
    setColor(color: discord.ColorResolvable | null): this;
    /**Set the url of this embed */
    setUrl(url: string | null): this;
    /**Set the description of this embed */
    setDescription(description: string | null): this;
    /**Set the author of this embed */
    setAuthor(text: string | null, image?: string | null, url?: string | null): this;
    /**Set the footer of this embed */
    setFooter(text: string | null, image?: string | null): this;
    /**Set the image of this embed */
    setImage(image: string | null): this;
    /**Set the thumbnail of this embed */
    setThumbnail(thumbnail: string | null): this;
    /**Set the fields of this embed */
    setFields(fields: ODInterfaceWithPartialProperty<discord.EmbedField, "inline">[]): this;
    /**Add fields to this embed */
    addFields(...fields: ODInterfaceWithPartialProperty<discord.EmbedField, "inline">[]): this;
    /**Clear all fields from this embed */
    clearFields(): this;
    /**Set the timestamp of this embed. When set to `true`, the current timestamp is used. */
    setTimestamp(timestamp: number | Date | true | null): this;
}

/**## ODEmbedComponentData `type`
 * The configurable settings/options for the `ODEmbedComponent`.
 */
declare interface ODEmbedComponentData {
    /**The title of the embed. */
    title?: string;
    /**The color of the embed. */
    color?: discord.ColorResolvable;
    /**The url of the embed. */
    url?: string;
    /**The description of the embed. */
    description?: string;
    /**The author text of the embed. */
    authorText?: string;
    /**The author image of the embed. */
    authorImage?: string;
    /**The author url of the embed. */
    authorUrl?: string;
    /**The footer text of the embed. */
    footerText?: string;
    /**The footer image of the embed. */
    footerImage?: string;
    /**The image of the embed. */
    image?: string;
    /**The thumbnail of the embed. */
    thumbnail?: string;
    /**The fields of the embed. */
    fields?: ODInterfaceWithPartialProperty<discord.EmbedField, "inline">[];
    /**The timestamp of the embed. */
    timestamp?: number | Date;
}

/**## ODEmbedData `interface`
 * This interface contains the data to build an embed.
 */
declare interface ODEmbedData {
    /**The title of the embed */
    title: string | null;
    /**The color of the embed */
    color: discord.ColorResolvable | string | null;
    /**The url of the embed */
    url: string | null;
    /**The description of the embed */
    description: string | null;
    /**The author text of the embed */
    authorText: string | null;
    /**The author image of the embed */
    authorImage: string | null;
    /**The author url of the embed */
    authorUrl: string | null;
    /**The footer text of the embed */
    footerText: string | null;
    /**The footer image of the embed */
    footerImage: string | null;
    /**The image of the embed */
    image: string | null;
    /**The thumbnail of the embed */
    thumbnail: string | null;
    /**The fields of the embed */
    fields: ODInterfaceWithPartialProperty<discord.EmbedField, "inline">[];
    /**The timestamp of the embed */
    timestamp: number | Date | null;
}

/**## ODEmbedInstance `class`
 * This is an Open Discord embed instance.
 *
 * It contains all properties & functions to build an embed!
 */
declare class ODEmbedInstance {
    /**The current data of this embed */
    data: ODEmbedData;
    /**Set the title of this embed */
    setTitle(title: ODEmbedData["title"]): this;
    /**Set the color of this embed */
    setColor(color: ODEmbedData["color"]): this;
    /**Set the url of this embed */
    setUrl(url: ODEmbedData["url"]): this;
    /**Set the description of this embed */
    setDescription(description: ODEmbedData["description"]): this;
    /**Set the author of this embed */
    setAuthor(text: ODEmbedData["authorText"], image?: ODEmbedData["authorImage"], url?: ODEmbedData["authorUrl"]): this;
    /**Set the footer of this embed */
    setFooter(text: ODEmbedData["footerText"], image?: ODEmbedData["footerImage"]): this;
    /**Set the image of this embed */
    setImage(image: ODEmbedData["image"]): this;
    /**Set the thumbnail of this embed */
    setThumbnail(thumbnail: ODEmbedData["thumbnail"]): this;
    /**Set the fields of this embed */
    setFields(fields: ODEmbedData["fields"]): this;
    /**Add fields to this embed */
    addFields(...fields: ODEmbedData["fields"]): this;
    /**Clear all fields from this embed */
    clearFields(): this;
    /**Set the timestamp of this embed */
    setTimestamp(timestamp: ODEmbedData["timestamp"]): this;
}

/**## ODEmbedManager `class`
 * This is an Open Discord embed manager.
 *
 * It contains all Open Discord embed builders. Here, you can add your own embeds or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODEmbedManager<IdList extends ODEmbedManagerIdConstraint = ODEmbedManagerIdConstraint> extends ODManagerWithSafety<ODEmbed<string, {}, string>> {
    constructor(debug: ODDebugger);
    get<EmbedId extends keyof ODNoGeneric<IdList>>(id: EmbedId): ODEmbed<IdList[EmbedId]["origin"], IdList[EmbedId]["params"], IdList[EmbedId]["workers"]>;
    get(id: ODValidId): ODEmbed<string, {}, string> | null;
    remove<EmbedId extends keyof ODNoGeneric<IdList>>(id: EmbedId): ODEmbed<IdList[EmbedId]["origin"], IdList[EmbedId]["params"], IdList[EmbedId]["workers"]>;
    remove(id: ODValidId): ODEmbed<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<EmbedId extends keyof ODNoGeneric<IdList>>(id: EmbedId): ODEmbed<IdList[EmbedId]["origin"], IdList[EmbedId]["params"], IdList[EmbedId]["workers"]>;
    getSafe(id: ODValidId): ODEmbed<string, {}, string>;
}

/**## ODEmbedManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODEmbedManager` class.
 */
declare type ODEmbedManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODEmbedManagerIdMappings `interface`
 * A list of all available IDs in the default `ODEmbedManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODEmbedManagerIdMappings extends api_2.ODEmbedManagerIdConstraint {
    "opendiscord:error": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: string;
            layout: "simple" | "advanced";
            customTitle?: string;
        };
        workers: "opendiscord:error";
    };
    "opendiscord:error-option-missing": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorMissingOption;
        };
        workers: "opendiscord:error-option-missing";
    };
    "opendiscord:error-option-invalid": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorInvalidOption;
        };
        workers: "opendiscord:error-option-invalid";
    };
    "opendiscord:error-unknown-command": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorUnknownCommand;
        };
        workers: "opendiscord:error-unknown-command";
    };
    "opendiscord:error-no-permissions": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            permissions: ODPermissionEmbedType[];
        };
        workers: "opendiscord:error-no-permissions";
    };
    "opendiscord:error-no-permissions-cooldown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            until?: Date;
        };
        workers: "opendiscord:error-no-permissions-cooldown";
    };
    "opendiscord:error-no-permissions-blacklisted": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-no-permissions-blacklisted";
    };
    "opendiscord:error-no-permissions-limits": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            limit: "global" | "global-user" | "option" | "option-user";
        };
        workers: "opendiscord:error-no-permissions-limits";
    };
    "opendiscord:error-responder-timeout": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-responder-timeout";
    };
    "opendiscord:error-ticket-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-unknown";
    };
    "opendiscord:error-ticket-deprecated": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-deprecated";
    };
    "opendiscord:error-option-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-option-unknown";
    };
    "opendiscord:error-panel-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-panel-unknown";
    };
    "opendiscord:error-not-in-guild": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-not-in-guild";
    };
    "opendiscord:error-channel-rename": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "ticket-pin" | "ticket-unpin" | "ticket-close" | "ticket-reopen" | "ticket-rename" | "ticket-move" | "ticket-priority" | "ticket-transfer" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            originalName: string;
            newName: string;
        };
        workers: "opendiscord:error-channel-rename";
    };
    "opendiscord:error-channel-category": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "ticket-create" | "ticket-close" | "ticket-reopen" | "ticket-claim" | "ticket-unclaim" | "ticket-move" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            originalCategory: string;
            newCategory: string;
        };
        workers: "opendiscord:error-channel-category";
    };
    "opendiscord:error-ticket-busy": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-busy";
    };
    "opendiscord:help-menu": {
        origin: "text" | "slash" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu";
    };
    "opendiscord:stats-global": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:stats-global";
    };
    "opendiscord:stats-ticket": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            scopeData: ODTicket;
        };
        workers: "opendiscord:stats-ticket";
    };
    "opendiscord:stats-user": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            scopeData: discord.User;
        };
        workers: "opendiscord:stats-user" | "opendiscord:easter-egg";
    };
    "opendiscord:stats-reset": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:stats-reset";
    };
    "opendiscord:stats-ticket-unknown": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            id: string;
        };
        workers: "opendiscord:stats-ticket-unknown";
    };
    "opendiscord:panel": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            isSubPanel: boolean;
        };
        workers: "opendiscord:panel";
    };
    "opendiscord:ticket-created": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created";
    };
    "opendiscord:ticket-created-dm": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created-dm";
    };
    "opendiscord:ticket-created-logs": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created-logs";
    };
    "opendiscord:ticket-message": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-message";
    };
    "opendiscord:close-message": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "autoclose" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:close-message";
    };
    "opendiscord:reopen-message": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "autoclose-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:reopen-message";
    };
    "opendiscord:delete-message": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:delete-message";
    };
    "opendiscord:claim-message": {
        origin: "slash" | "text" | "ticket-message" | "unclaim-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:claim-message";
    };
    "opendiscord:unclaim-message": {
        origin: "slash" | "text" | "ticket-message" | "claim-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:unclaim-message";
    };
    "opendiscord:pin-message": {
        origin: "slash" | "text" | "ticket-message" | "unpin-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:pin-message";
    };
    "opendiscord:unpin-message": {
        origin: "slash" | "text" | "ticket-message" | "pin-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:unpin-message";
    };
    "opendiscord:rename-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: string;
        };
        workers: "opendiscord:rename-message";
    };
    "opendiscord:move-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: ODTicketOption;
        };
        workers: "opendiscord:move-message";
    };
    "opendiscord:add-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: discord.User;
        };
        workers: "opendiscord:add-message";
    };
    "opendiscord:remove-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: discord.User;
        };
        workers: "opendiscord:remove-message";
    };
    "opendiscord:ticket-action-dm": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "reopen-message" | "delete-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message" | "autoclose-message" | "priority-message" | "topic-message" | "transfer-message" | "autoclose" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "close" | "reopen" | "delete" | "claim" | "unclaim" | "pin" | "unpin" | "rename" | "move" | "add" | "remove" | "priority" | "transfer" | "topic";
            ticket: ODTicket;
            reason: string | null;
            additionalData: null | string | discord.User | ODTicketOption;
            additionalData2?: discord.User;
        };
        workers: "opendiscord:ticket-action-dm";
    };
    "opendiscord:ticket-action-logs": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "reopen-message" | "delete-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message" | "autoclose-message" | "priority-message" | "topic-message" | "transfer-message" | "autoclose" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "close" | "reopen" | "delete" | "claim" | "unclaim" | "pin" | "unpin" | "rename" | "move" | "add" | "remove" | "priority" | "transfer" | "topic";
            ticket: ODTicket;
            reason: string | null;
            additionalData: null | string | discord.User | ODTicketOption;
            additionalData2?: discord.User;
        };
        workers: "opendiscord:ticket-action-logs";
    };
    "opendiscord:blacklist-view": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:blacklist-view";
    };
    "opendiscord:blacklist-get": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
        };
        workers: "opendiscord:blacklist-get";
    };
    "opendiscord:blacklist-add": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-add";
    };
    "opendiscord:blacklist-remove": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-remove";
    };
    "opendiscord:blacklist-dm": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "add" | "remove";
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-dm";
    };
    "opendiscord:blacklist-logs": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "add" | "remove";
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-logs";
    };
    "opendiscord:transcript-text-ready": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                contents: string;
            }, null>;
            result: ODTranscriptCompilerCompileResult<{
                contents: string;
            }>;
        };
        workers: "opendiscord:transcript-text-ready";
    };
    "opendiscord:transcript-html-ready": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                url: string;
                availableUntil: Date;
            }, {
                auth: string;
            }>;
            result: ODTranscriptCompilerCompileResult<{
                url: string;
                availableUntil: Date;
            }>;
        };
        workers: "opendiscord:transcript-html-ready";
    };
    "opendiscord:transcript-html-progress": {
        origin: "channel" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                url: string;
                availableUntil: Date;
            }, {
                auth: string;
            }>;
            remaining: number;
        };
        workers: "opendiscord:transcript-html-progress";
    };
    "opendiscord:transcript-error": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<any, object | null>;
            reason: string | null;
        };
        workers: "opendiscord:transcript-error";
    };
    "opendiscord:transcript-history": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            transcriptUser: discord.User;
            transcriptList: ODTranscriptHistoryData[];
        };
        workers: "opendiscord:transcript-history";
    };
    "opendiscord:reaction-role": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role";
    };
    "opendiscord:reaction-role-dm": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role-dm";
    };
    "opendiscord:reaction-role-logs": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role-logs";
    };
    "opendiscord:clear-verify-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
            inProgress: boolean;
        };
        workers: "opendiscord:clear-verify-message";
    };
    "opendiscord:clear-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
        };
        workers: "opendiscord:clear-message";
    };
    "opendiscord:clear-logs": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
        };
        workers: "opendiscord:clear-logs";
    };
    "opendiscord:autoclose-message": {
        origin: "timeout" | "leave" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:autoclose-message";
    };
    "opendiscord:autodelete-message": {
        origin: "timeout" | "leave" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:autodelete-message";
    };
    "opendiscord:autoclose-enable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            time: number;
            reason: string | null;
        };
        workers: "opendiscord:autoclose-enable";
    };
    "opendiscord:autodelete-enable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            time: number;
            reason: string | null;
        };
        workers: "opendiscord:autodelete-enable";
    };
    "opendiscord:autoclose-disable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:autoclose-disable";
    };
    "opendiscord:autodelete-disable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:autodelete-disable";
    };
    "opendiscord:topic-set": {
        origin: "slash" | "text" | "ticket-action" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            topic: string;
        };
        workers: "opendiscord:topic-set";
    };
    "opendiscord:priority-set": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            priority: ODPriorityLevel;
            reason: string | null;
        };
        workers: "opendiscord:priority-set";
    };
    "opendiscord:priority-get": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            priority: ODPriorityLevel;
        };
        workers: "opendiscord:priority-get";
    };
    "opendiscord:transfer-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            oldCreator: discord.User;
            newCreator: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:transfer-message";
    };
}

/**## ODEnvHelper `class`
 * This is a utility class that helps you with reading the ENV.
 *
 * It has support for the built-in `process.env` & `.env` file
 * @example
 * const envHelper = new api.ODEnvHelper()
 *
 * const variableA = envHelper.getVariable("value-a")
 * const variableB = envHelper.getVariable("value-b","dotenv") //only get from .env
 * const variableA = envHelper.getVariable("value-c","env") //only get from process.env
 */
declare class ODEnvHelper {
    /**All variables found in the `.env` file */
    dotenv: Record<string, any>;
    /**All variables found in `process.env` */
    env: Record<string, any>;
    constructor(customEnvPath?: string);
    /**Get a variable from the env */
    getVariable(name: string, source?: "dotenv" | "env"): any | undefined;
    protected readDotEnv(src: Buffer): Record<string, any>;
}

/**## ODError `class`
 * This is an Open Discord error.
 *
 * It is used to render and log Node.js errors & crashes in a styled way to the console & `debug.txt` file!
 */
declare class ODError {
    /**The original error that this class wraps around */
    error: Error & {
        "_ODErrorType"?: "system" | "plugin";
    };
    /**The origin of the original error */
    origin: NodeJS.UncaughtExceptionOrigin;
    constructor(error: any, origin: NodeJS.UncaughtExceptionOrigin);
    protected recursiveStack(error: (Error & {
        "_ODErrorType"?: "system" | "plugin";
    }), level?: number): string;
    /**Render this error to the console using `console.log`! Returns `false` when something went wrong. */
    render(): boolean;
    /**Create a more-detailed, non-colored version of this error to store it in the `debug.txt` file! */
    toDebugString(): string;
}

/**## ODErrorConsoleMessage `class`
 * This is an Open Discord console error message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "ERROR" messages!
 */
declare class ODErrorConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODEvent `class`
 * This is an Open Discord event.
 *
 * This class is made to work with the `ODEventManager` to handle events.
 * The function of this specific class is to manage all listeners for a specifc event!
 */
declare class ODEvent<Callback extends ODEventCallback = ODEventCallback> extends ODManagerData {
    /**Alias to Open Discord debugger. */
    protected debug?: ODDebugger;
    /**The list of permanent listeners. */
    listeners: Function[];
    /**The list of one-time listeners. List is cleared every time the event is emitted. */
    oncelisteners: Function[];
    /**The max listener limit before a possible memory leak will be announced */
    listenerLimit: number;
    /**Use the Open Discord debugger in this manager for logs*/
    useDebug(debug: ODDebugger | null): void;
    /**Get a collection of listeners combined from both types. Also clears the one-time listeners array! */
    protected getCurrentListeners(): Function[];
    /**Edit the listener limit */
    setListenerLimit(limit: number): void;
    /**Add a permanent callback to this event. This will stay as long as the bot is running! */
    listen(callback: Callback): void;
    /**Add a one-time-only callback to this event. This will only trigger the callback once! */
    listenOnce(callback: Callback): void;
    /**Wait until this event is fired! Be carefull with it, because it could block the entire bot when wrongly used! */
    wait(): Promise<Parameters<Callback>>;
    /**Emit this event to all listeners. You are required to provide all parameters of the event! */
    emit(params: Parameters<Callback>): Promise<void>;
}

/**## ODEventCallback `type`
 * The base callback function for events.
 */
declare type ODEventCallback = (...args: any) => ODPromiseVoid;

/**## ODEventManager `class`
 * This is an Open Discord event manager.
 *
 * This class is made to manage all events in the bot. You can compare it with the built-in node.js `EventEmitter`
 *
 * It's not recommended to create this class yourself. Plugin events should be registered in their `plugin.json` file instead.
 * All events are available in the `opendiscord.events` global!
 */
declare class ODEventManager<IdList extends ODEventManagerIdConstraint = ODEventManagerIdConstraint> extends ODManager<ODEvent> {
    constructor(debug: ODDebugger);
    add(data: ODEvent, overwrite?: boolean): boolean;
    get<EventId extends keyof ODNoGeneric<IdList>>(id: EventId): IdList[EventId];
    get(id: ODValidId): ODEvent | null;
    remove<EventId extends keyof ODNoGeneric<IdList>>(id: EventId): IdList[EventId];
    remove(id: ODValidId): ODEvent | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODEventManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODEventManager` class.
 */
declare type ODEventManagerIdConstraint = Record<string, ODEvent>;

/**## ODEventManagerIdMappings `interface`
 * A list of all available IDs in the default `ODEventManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODEventManagerIdMappings extends api_2.ODEventManagerIdConstraint {
    "onErrorHandling": api_2.ODEvent<(error: Error, origin: NodeJS.UncaughtExceptionOrigin) => api_2.ODPromiseVoid>;
    "afterErrorHandling": api_2.ODEvent<(error: Error, origin: NodeJS.UncaughtExceptionOrigin, message: api_2.ODError) => api_2.ODPromiseVoid>;
    "afterPluginsLoaded": api_2.ODEvent<(plugins: ODMappedPluginManager) => api_2.ODPromiseVoid>;
    "onPluginClassLoad": api_2.ODEvent<(classes: ODMappedPluginClassManager, plugins: ODMappedPluginManager) => api_2.ODPromiseVoid>;
    "afterPluginClassesLoaded": api_2.ODEvent<(classes: ODMappedPluginClassManager, plugins: ODMappedPluginManager) => api_2.ODPromiseVoid>;
    "onFlagLoad": api_2.ODEvent<(flags: ODMappedFlagManager) => api_2.ODPromiseVoid>;
    "afterFlagsLoaded": api_2.ODEvent<(flags: ODMappedFlagManager) => api_2.ODPromiseVoid>;
    "onFlagInit": api_2.ODEvent<(flags: ODMappedFlagManager) => api_2.ODPromiseVoid>;
    "afterFlagsInitiated": api_2.ODEvent<(flags: ODMappedFlagManager) => api_2.ODPromiseVoid>;
    "onProgressBarRendererLoad": api_2.ODEvent<(renderers: ODMappedProgressBarRendererManager) => api_2.ODPromiseVoid>;
    "afterProgressBarRenderersLoaded": api_2.ODEvent<(renderers: ODMappedProgressBarRendererManager) => api_2.ODPromiseVoid>;
    "onProgressBarLoad": api_2.ODEvent<(progressbars: ODMappedProgressBarManager) => api_2.ODPromiseVoid>;
    "afterProgressBarsLoaded": api_2.ODEvent<(progressbars: ODMappedProgressBarManager) => api_2.ODPromiseVoid>;
    "onConfigLoad": api_2.ODEvent<(configs: ODMappedConfigManager) => api_2.ODPromiseVoid>;
    "afterConfigsLoaded": api_2.ODEvent<(configs: ODMappedConfigManager) => api_2.ODPromiseVoid>;
    "onConfigInit": api_2.ODEvent<(configs: ODMappedConfigManager) => api_2.ODPromiseVoid>;
    "afterConfigsInitiated": api_2.ODEvent<(configs: ODMappedConfigManager) => api_2.ODPromiseVoid>;
    "onDatabaseLoad": api_2.ODEvent<(databases: ODMappedDatabaseManager) => api_2.ODPromiseVoid>;
    "afterDatabasesLoaded": api_2.ODEvent<(databases: ODMappedDatabaseManager) => api_2.ODPromiseVoid>;
    "onDatabaseInit": api_2.ODEvent<(databases: ODMappedDatabaseManager) => api_2.ODPromiseVoid>;
    "afterDatabasesInitiated": api_2.ODEvent<(databases: ODMappedDatabaseManager) => api_2.ODPromiseVoid>;
    "onLanguageLoad": api_2.ODEvent<(languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "afterLanguagesLoaded": api_2.ODEvent<(languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "onLanguageInit": api_2.ODEvent<(languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "afterLanguagesInitiated": api_2.ODEvent<(languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "onLanguageSelect": api_2.ODEvent<(languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "afterLanguagesSelected": api_2.ODEvent<(main: api_2.ODLanguage | null, backup: api_2.ODLanguage | null, languages: ODMappedLanguageManager) => api_2.ODPromiseVoid>;
    "onSessionLoad": api_2.ODEvent<(languages: ODMappedSessionManager) => api_2.ODPromiseVoid>;
    "afterSessionsLoaded": api_2.ODEvent<(languages: ODMappedSessionManager) => api_2.ODPromiseVoid>;
    "onCheckerLoad": api_2.ODEvent<(checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "afterCheckersLoaded": api_2.ODEvent<(checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onCheckerFunctionLoad": api_2.ODEvent<(functions: ODMappedCheckerFunctionManager, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "afterCheckerFunctionsLoaded": api_2.ODEvent<(functions: ODMappedCheckerFunctionManager, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onCheckerExecute": api_2.ODEvent<(checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "afterCheckersExecuted": api_2.ODEvent<(result: api_2.ODCheckerResult, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onCheckerTranslationLoad": api_2.ODEvent<(translations: ODMappedCheckerTranslationRegister, enabled: boolean, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "afterCheckerTranslationsLoaded": api_2.ODEvent<(translations: ODMappedCheckerTranslationRegister, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onCheckerRender": api_2.ODEvent<(renderer: api_2.ODCheckerRenderer, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "afterCheckersRendered": api_2.ODEvent<(renderer: api_2.ODCheckerRenderer, checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onCheckerQuit": api_2.ODEvent<(checkers: ODMappedCheckerManager) => api_2.ODPromiseVoid>;
    "onPluginBeforeClientLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeClientLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onClientLoad": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterClientLoaded": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onClientInit": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterClientInitiated": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onClientReady": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterClientReady": api_2.ODEvent<(client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onClientActivityLoad": api_2.ODEvent<(activity: api_2.ODClientActivityManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterClientActivityLoaded": api_2.ODEvent<(activity: api_2.ODClientActivityManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onClientActivityInit": api_2.ODEvent<(activity: api_2.ODClientActivityManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterClientActivityInitiated": api_2.ODEvent<(activity: api_2.ODClientActivityManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onPriorityLoad": api_2.ODEvent<(priorities: ODMappedPriorityManager) => api_2.ODPromiseVoid>;
    "afterPrioritiesLoaded": api_2.ODEvent<(priorities: ODMappedPriorityManager) => api_2.ODPromiseVoid>;
    "onSlashCommandLoad": api_2.ODEvent<(slash: ODMappedSlashCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterSlashCommandsLoaded": api_2.ODEvent<(slash: ODMappedSlashCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onSlashCommandRegister": api_2.ODEvent<(slash: ODMappedSlashCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterSlashCommandsRegistered": api_2.ODEvent<(slash: ODMappedSlashCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onContextMenuLoad": api_2.ODEvent<(menu: ODMappedContextMenuManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterContextMenusLoaded": api_2.ODEvent<(menu: ODMappedContextMenuManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onContextMenuRegister": api_2.ODEvent<(menu: ODMappedContextMenuManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterContextMenusRegistered": api_2.ODEvent<(menu: ODMappedContextMenuManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onTextCommandLoad": api_2.ODEvent<(text: ODMappedTextCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "afterTextCommandsLoaded": api_2.ODEvent<(text: ODMappedTextCommandManager, client: ODMappedClientManager) => api_2.ODPromiseVoid>;
    "onStateLoad": api_2.ODEvent<(states: ODMappedStateManager) => api_2.ODPromiseVoid>;
    "afterStatesLoaded": api_2.ODEvent<(states: ODMappedStateManager) => api_2.ODPromiseVoid>;
    "onStateInit": api_2.ODEvent<(states: ODMappedStateManager) => api_2.ODPromiseVoid>;
    "afterStatesInitiated": api_2.ODEvent<(states: ODMappedStateManager) => api_2.ODPromiseVoid>;
    "onPluginBeforeManagerLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeManagerLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onQuestionLoad": api_2.ODEvent<(questions: ODQuestionManager) => api_2.ODPromiseVoid>;
    "afterQuestionsLoaded": api_2.ODEvent<(questions: ODQuestionManager) => api_2.ODPromiseVoid>;
    "onOptionLoad": api_2.ODEvent<(options: ODOptionManager) => api_2.ODPromiseVoid>;
    "afterOptionsLoaded": api_2.ODEvent<(options: ODOptionManager) => api_2.ODPromiseVoid>;
    "onPanelLoad": api_2.ODEvent<(panels: ODPanelManager) => api_2.ODPromiseVoid>;
    "afterPanelsLoaded": api_2.ODEvent<(panels: ODPanelManager) => api_2.ODPromiseVoid>;
    "onPanelSpawn": api_2.ODEvent<(panel: ODPanel) => api_2.ODPromiseVoid>;
    "afterPanelSpawned": api_2.ODEvent<(panel: ODPanel) => api_2.ODPromiseVoid>;
    "onTicketLoad": api_2.ODEvent<(tickets: ODTicketManager) => api_2.ODPromiseVoid>;
    "afterTicketsLoaded": api_2.ODEvent<(tickets: ODTicketManager) => api_2.ODPromiseVoid>;
    "onTicketChannelCreation": api_2.ODEvent<(option: ODTicketOption, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTicketChannelCreated": api_2.ODEvent<(option: ODTicketOption, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTicketChannelDeletion": api_2.ODEvent<(ticket: ODTicket, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTicketChannelDeleted": api_2.ODEvent<(ticket: ODTicket, user: discord.User) => api_2.ODPromiseVoid>;
    "onTicketPermissionsCreated": api_2.ODEvent<(option: ODTicketOption, permissions: ODMappedPermissionManager, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTicketPermissionsCreated": api_2.ODEvent<(option: ODTicketOption, permissions: ODMappedPermissionManager, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTicketMainMessageCreated": api_2.ODEvent<(ticket: ODTicket, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTicketMainMessageCreated": api_2.ODEvent<(ticket: ODTicket, message: discord.Message, channel: discord.GuildTextBasedChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTicketCreate": api_2.ODEvent<(creator: discord.User) => api_2.ODPromiseVoid>;
    "afterTicketCreated": api_2.ODEvent<(ticket: ODTicket, creator: discord.User, channel: discord.GuildTextBasedChannel) => api_2.ODPromiseVoid>;
    "onTicketClose": api_2.ODEvent<(ticket: ODTicket, closer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketClosed": api_2.ODEvent<(ticket: ODTicket, closer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketReopen": api_2.ODEvent<(ticket: ODTicket, reopener: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketReopened": api_2.ODEvent<(ticket: ODTicket, reopener: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketDelete": api_2.ODEvent<(ticket: ODTicket, deleter: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketDeleted": api_2.ODEvent<(ticket: ODTicket, deleter: discord.User, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketMove": api_2.ODEvent<(ticket: ODTicket, mover: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketMoved": api_2.ODEvent<(ticket: ODTicket, mover: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketClaim": api_2.ODEvent<(ticket: ODTicket, claimer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketClaimed": api_2.ODEvent<(ticket: ODTicket, claimer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketUnclaim": api_2.ODEvent<(ticket: ODTicket, unclaimer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketUnclaimed": api_2.ODEvent<(ticket: ODTicket, unclaimer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketPin": api_2.ODEvent<(ticket: ODTicket, pinner: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketPinned": api_2.ODEvent<(ticket: ODTicket, pinner: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketUnpin": api_2.ODEvent<(ticket: ODTicket, unpinner: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketUnpinned": api_2.ODEvent<(ticket: ODTicket, unpinner: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketUserAdd": api_2.ODEvent<(ticket: ODTicket, adder: discord.User, user: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketUserAdded": api_2.ODEvent<(ticket: ODTicket, adder: discord.User, user: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketUserRemove": api_2.ODEvent<(ticket: ODTicket, remover: discord.User, user: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketUserRemoved": api_2.ODEvent<(ticket: ODTicket, remover: discord.User, user: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketRename": api_2.ODEvent<(ticket: ODTicket, renamer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketRenamed": api_2.ODEvent<(ticket: ODTicket, renamer: discord.User, channel: discord.GuildTextBasedChannel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketsClear": api_2.ODEvent<(tickets: ODTicket[], clearer: discord.User, channel: discord.GuildTextBasedChannel, filter: ODTicketClearFilter) => api_2.ODPromiseVoid>;
    "afterTicketsCleared": api_2.ODEvent<(tickets: ODTicket[], clearer: discord.User, channel: discord.GuildTextBasedChannel, filter: ODTicketClearFilter) => api_2.ODPromiseVoid>;
    "onTicketTopicChange": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldTopic: string, newTopic: string) => api_2.ODPromiseVoid>;
    "afterTicketTopicChanged": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldTopic: string, newTopic: string) => api_2.ODPromiseVoid>;
    "onTicketPriorityChange": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldPriority: ODPriorityLevel, newPriority: ODPriorityLevel, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketPriorityChanged": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldPriority: ODPriorityLevel, newPriority: ODPriorityLevel, reason: string | null) => api_2.ODPromiseVoid>;
    "onTicketTransfer": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldCreator: discord.User, newCreator: discord.User, reason: string | null) => api_2.ODPromiseVoid>;
    "afterTicketTransferred": api_2.ODEvent<(ticket: ODTicket, changer: discord.User, channel: discord.GuildTextBasedChannel, oldCreator: discord.User, newCreator: discord.User, reason: string | null) => api_2.ODPromiseVoid>;
    "onRoleLoad": api_2.ODEvent<(roles: ODRoleManager) => api_2.ODPromiseVoid>;
    "afterRolesLoaded": api_2.ODEvent<(roles: ODRoleManager) => api_2.ODPromiseVoid>;
    "onRoleUpdate": api_2.ODEvent<(user: discord.User, role: ODRole) => api_2.ODPromiseVoid>;
    "afterRolesUpdated": api_2.ODEvent<(user: discord.User, role: ODRole) => api_2.ODPromiseVoid>;
    "onBlacklistLoad": api_2.ODEvent<(blacklist: ODBlacklistManager) => api_2.ODPromiseVoid>;
    "afterBlacklistLoaded": api_2.ODEvent<(blacklist: ODBlacklistManager) => api_2.ODPromiseVoid>;
    "onTranscriptCompilerLoad": api_2.ODEvent<(transcripts: ODMappedTranscriptManager) => api_2.ODPromiseVoid>;
    "afterTranscriptCompilersLoaded": api_2.ODEvent<(transcripts: ODMappedTranscriptManager) => api_2.ODPromiseVoid>;
    "onTranscriptHistoryLoad": api_2.ODEvent<(transcripts: ODMappedTranscriptManager) => api_2.ODPromiseVoid>;
    "afterTranscriptHistoryLoaded": api_2.ODEvent<(transcripts: ODMappedTranscriptManager) => api_2.ODPromiseVoid>;
    "onTranscriptCreate": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTranscriptCreated": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTranscriptInit": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTranscriptInitiated": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTranscriptCompile": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTranscriptCompiled": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onTranscriptReady": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "afterTranscriptReady": api_2.ODEvent<(transcripts: ODMappedTranscriptManager, ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => api_2.ODPromiseVoid>;
    "onPluginBeforeBuilderLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeBuilderLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onButtonBuilderLoad": api_2.ODEvent<(buttons: ODMappedButtonManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterButtonBuildersLoaded": api_2.ODEvent<(buttons: ODMappedButtonManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onDropdownBuilderLoad": api_2.ODEvent<(dropdowns: ODMappedDropdownManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterDropdownBuildersLoaded": api_2.ODEvent<(dropdowns: ODMappedDropdownManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onFileBuilderLoad": api_2.ODEvent<(files: ODMappedFileManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterFileBuildersLoaded": api_2.ODEvent<(files: ODMappedFileManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onEmbedBuilderLoad": api_2.ODEvent<(embeds: ODMappedEmbedManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterEmbedBuildersLoaded": api_2.ODEvent<(embeds: ODMappedEmbedManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onMessageBuilderLoad": api_2.ODEvent<(messages: ODMappedMessageManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterMessageBuildersLoaded": api_2.ODEvent<(messages: ODMappedMessageManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onModalBuilderLoad": api_2.ODEvent<(modals: ODMappedModalManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterModalBuildersLoaded": api_2.ODEvent<(modals: ODMappedModalManager, builders: ODMappedBuilderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onSharedComponentLoad": api_2.ODEvent<(shared: ODMappedSharedComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterSharedComponentsLoaded": api_2.ODEvent<(shared: ODMappedSharedComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onMessageComponentLoad": api_2.ODEvent<(shared: ODMappedMessageComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterMessageComponentsLoaded": api_2.ODEvent<(shared: ODMappedMessageComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onModalComponentLoad": api_2.ODEvent<(shared: ODMappedModalComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterModalComponentsLoaded": api_2.ODEvent<(shared: ODMappedModalComponentManager, components: ODMappedComponentManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onComponentModifierLoad": api_2.ODEvent<(modifiers: ODMappedComponentModifierManager, msgComponents: ODMappedMessageComponentManager, msgBuilders: ODMappedMessageManager) => api_2.ODPromiseVoid>;
    "afterComponentModifiersLoaded": api_2.ODEvent<(modifiers: ODMappedComponentModifierManager, msgComponents: ODMappedMessageComponentManager, msgBuilders: ODMappedMessageManager) => api_2.ODPromiseVoid>;
    "onPluginBeforeResponderLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeResponderLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onCommandResponderLoad": api_2.ODEvent<(commands: ODMappedCommandResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterCommandRespondersLoaded": api_2.ODEvent<(commands: ODMappedCommandResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onButtonResponderLoad": api_2.ODEvent<(buttons: ODMappedButtonResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterButtonRespondersLoaded": api_2.ODEvent<(buttons: ODMappedButtonResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onDropdownResponderLoad": api_2.ODEvent<(dropdowns: ODMappedDropdownResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterDropdownRespondersLoaded": api_2.ODEvent<(dropdowns: ODMappedDropdownResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onModalResponderLoad": api_2.ODEvent<(modals: ODMappedModalResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterModalRespondersLoaded": api_2.ODEvent<(modals: ODMappedModalResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onContextMenuResponderLoad": api_2.ODEvent<(menus: ODMappedContextMenuResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterContextMenuRespondersLoaded": api_2.ODEvent<(menus: ODMappedContextMenuResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onAutocompleteResponderLoad": api_2.ODEvent<(autocomplete: ODMappedAutocompleteResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterAutocompleteRespondersLoaded": api_2.ODEvent<(autocomplete: ODMappedAutocompleteResponderManager, responders: ODMappedResponderManager, actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onPluginBeforeFinalizationLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeFinalizationLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onActionLoad": api_2.ODEvent<(actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "afterActionsLoaded": api_2.ODEvent<(actions: ODMappedActionManager) => api_2.ODPromiseVoid>;
    "onVerifyBarLoad": api_2.ODEvent<(verifybars: ODMappedVerifyBarManager) => api_2.ODPromiseVoid>;
    "afterVerifyBarsLoaded": api_2.ODEvent<(verifybars: ODMappedVerifyBarManager) => api_2.ODPromiseVoid>;
    "onPermissionLoad": api_2.ODEvent<(permissions: ODMappedPermissionManager) => api_2.ODPromiseVoid>;
    "afterPermissionsLoaded": api_2.ODEvent<(permissions: ODMappedPermissionManager) => api_2.ODPromiseVoid>;
    "onPostLoad": api_2.ODEvent<(posts: ODMappedPostManager) => api_2.ODPromiseVoid>;
    "afterPostsLoaded": api_2.ODEvent<(posts: ODMappedPostManager) => api_2.ODPromiseVoid>;
    "onPostInit": api_2.ODEvent<(posts: ODMappedPostManager) => api_2.ODPromiseVoid>;
    "afterPostsInitiated": api_2.ODEvent<(posts: ODMappedPostManager) => api_2.ODPromiseVoid>;
    "onCooldownLoad": api_2.ODEvent<(cooldowns: ODMappedCooldownManager) => api_2.ODPromiseVoid>;
    "afterCooldownsLoaded": api_2.ODEvent<(cooldowns: ODMappedCooldownManager) => api_2.ODPromiseVoid>;
    "onCooldownInit": api_2.ODEvent<(cooldowns: ODMappedCooldownManager) => api_2.ODPromiseVoid>;
    "afterCooldownsInitiated": api_2.ODEvent<(cooldowns: ODMappedCooldownManager) => api_2.ODPromiseVoid>;
    "onHelpMenuCategoryLoad": api_2.ODEvent<(menu: ODMappedHelpMenuManager) => api_2.ODPromiseVoid>;
    "afterHelpMenuCategoriesLoaded": api_2.ODEvent<(menu: ODMappedHelpMenuManager) => api_2.ODPromiseVoid>;
    "onHelpMenuComponentLoad": api_2.ODEvent<(menu: ODMappedHelpMenuManager) => api_2.ODPromiseVoid>;
    "afterHelpMenuComponentsLoaded": api_2.ODEvent<(menu: ODMappedHelpMenuManager) => api_2.ODPromiseVoid>;
    "onStatisticScopeLoad": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "afterStatisticScopesLoaded": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "onStatisticLoad": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "afterStatisticsLoaded": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "onStatisticInit": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "afterStatisticsInitiated": api_2.ODEvent<(stats: ODMappedStatisticManager) => api_2.ODPromiseVoid>;
    "onPluginBeforeTaskLoad": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "afterPluginBeforeTaskLoaded": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onTaskLoad": api_2.ODEvent<(tasks: ODMappedTaskManager) => api_2.ODPromiseVoid>;
    "afterTasksLoaded": api_2.ODEvent<(tasks: ODMappedTaskManager) => api_2.ODPromiseVoid>;
    "onTaskExecute": api_2.ODEvent<(tasks: ODMappedTaskManager) => api_2.ODPromiseVoid>;
    "afterTasksExecuted": api_2.ODEvent<(tasks: ODMappedTaskManager) => api_2.ODPromiseVoid>;
    "onLiveStatusSourceLoad": api_2.ODEvent<(livestatus: ODMappedLiveStatusManager) => api_2.ODPromiseVoid>;
    "afterLiveStatusSourcesLoaded": api_2.ODEvent<(livestatus: ODMappedLiveStatusManager) => api_2.ODPromiseVoid>;
    "onStartScreenLoad": api_2.ODEvent<(startscreen: ODMappedStartScreenManager) => api_2.ODPromiseVoid>;
    "afterStartScreensLoaded": api_2.ODEvent<(startscreen: ODMappedStartScreenManager) => api_2.ODPromiseVoid>;
    "onStartScreenRender": api_2.ODEvent<(startscreen: ODMappedStartScreenManager) => api_2.ODPromiseVoid>;
    "afterStartScreensRendered": api_2.ODEvent<(startscreen: ODMappedStartScreenManager) => api_2.ODPromiseVoid>;
    "beforeReadyForUsage": api_2.ODEvent<() => api_2.ODPromiseVoid>;
    "onReadyForUsage": api_2.ODEvent<() => api_2.ODPromiseVoid>;
}

/**## ODExtraHelpMenuCategory `class
 * A special class with types for the Open Ticket `Extra Commands` help menu category.
 */
declare class ODExtraHelpMenuCategory extends api_2.ODHelpMenuCategory<ODExtraHelpMenuCategoryIdMappings> {
}

/**## ODExtraHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODExtraHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODExtraHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
}

/**## ODFile `class`
 * This is an Open Discord file builder.
 *
 * With this class, you can create a file to use in a message.
 * The only difference with normal files is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODFile<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODFileInstance, Origin, Params, ODFileBuildResult, WorkerIds> {
    /**Build this attachment & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODFileBuildResult>;
}

/**## ODFileBuildResult `interface`
 * This interface contains the result from a built file (attachment). This can be used in the `ODMessage` builder!
 */
declare interface ODFileBuildResult {
    /**The id of this file */
    id: ODId;
    /**The discord file */
    file: discord.AttachmentBuilder | null;
}

/**## ODFileComponent `class`
 * A file component which adds a file in a message.
 */
declare class ODFileComponent extends ODComponent<ODFileComponentData, {
    file: discord.FileBuilder;
    attachment: discord.AttachmentBuilder | null;
}> {
    constructor(id: ODValidId, data: Partial<ODFileComponentData>);
    build(): Promise<{
        attachment: discord.AttachmentBuilder | null;
        file: discord.FileBuilder;
    }>;
    /**Set the filename + extension. */
    setName(value: string): this;
    /**Set the file description. */
    setDescription(value: string | null): this;
    /**Set the text/binary contents of the file. */
    setContent(value: discord.BufferResolvable | null): this;
    /**Set a URL to an external file or image. When used, `setContent()` will be ignored! */
    setExternalUrl(value: string | null): this;
    /**Mark the file as spoiler. */
    setSpoiler(value: boolean): this;
}

/**## ODFileComponentData `type`
 * The configurable settings/options for the `ODFileComponent`.
 */
declare interface ODFileComponentData {
    /**The name of this file. */
    name: string;
    /**The description of this file. */
    description?: string;
    /**Should this file be marked as a spoiler? */
    spoiler?: boolean;
    /**The binary/text contents of the file. Ignored when `externalUrl` is used. */
    content?: discord.BufferResolvable;
    /**A URL to an external file or image. When specified, the `content` (setContent) will be ignored. */
    externalUrl?: string;
}

/**## ODFileData `interface`
 * This interface contains the data to build a file.
 */
declare interface ODFileData {
    /**The file buffer, string or raw data */
    file: discord.BufferResolvable;
    /**The name of the file */
    name: string;
    /**The description of the file */
    description: string | null;
    /**Set the file to be a spoiler */
    spoiler: boolean;
}

/**## ODFileInstance `class`
 * This is an Open Discord file instance.
 *
 * It contains all properties & functions to build a file!
 */
declare class ODFileInstance {
    /**The current data of this file */
    data: ODFileData;
    /**Set the file path of this attachment */
    setFile(file: string): this;
    /**Set the file contents of this attachment */
    setContents(contents: string | Buffer): this;
    /**Set the name of this attachment */
    setName(name: ODFileData["name"]): this;
    /**Set the description of this attachment */
    setDescription(description: ODFileData["description"]): this;
    /**Set this attachment to show as a spoiler */
    setSpoiler(spoiler: ODFileData["spoiler"]): this;
}

/**## ODFileManager `class`
 * This is an Open Discord file manager.
 *
 * It contains all Open Discord file builders. Here, you can add your own files or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODFileManager<IdList extends ODFileManagerIdConstraint = ODFileManagerIdConstraint> extends ODManagerWithSafety<ODFile<string, {}, string>> {
    constructor(debug: ODDebugger);
    get<FileId extends keyof ODNoGeneric<IdList>>(id: FileId): ODFile<IdList[FileId]["origin"], IdList[FileId]["params"], IdList[FileId]["workers"]>;
    get(id: ODValidId): ODFile<string, {}, string> | null;
    remove<FileId extends keyof ODNoGeneric<IdList>>(id: FileId): ODFile<IdList[FileId]["origin"], IdList[FileId]["params"], IdList[FileId]["workers"]>;
    remove(id: ODValidId): ODFile<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<FileId extends keyof ODNoGeneric<IdList>>(id: FileId): ODFile<IdList[FileId]["origin"], IdList[FileId]["params"], IdList[FileId]["workers"]>;
    getSafe(id: ODValidId): ODFile<string, {}, string>;
}

/**## ODFileManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODFileManager` class.
 */
declare type ODFileManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODFileManagerIdMappings `interface`
 * A list of all available IDs in the default `ODFileManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODFileManagerIdMappings extends api_2.ODFileManagerIdConstraint {
    "opendiscord:text-transcript": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<any, object | null>;
            result: ODTranscriptCompilerCompileResult<any>;
        };
        workers: "opendiscord:text-transcript";
    };
}

/**## ODFileUploadComponent `class`
 * A file upload component which allows users to upload one or multiple files inside a modal.
 * The label & description should be set via an `ODLabelComponent`
 */
declare class ODFileUploadComponent extends ODComponent<ODFileUploadComponentData, discord.FileUploadBuilder> {
    constructor(id: ODValidId, data: Partial<ODFileUploadComponentData>);
    build(): Promise<discord.FileUploadBuilder>;
    /**Set the custom id of this dropdown. */
    setCustomId(id: string | null): this;
    /**Mark this file upload as required. */
    setRequired(required: boolean): this;
    /**Set the minimum amount of files to upload (0-10). */
    setMinAmount(amount: number | null): this;
    /**Set the maximum amount of files to upload (1-10). */
    setMaxAmount(amount: number | null): this;
}

/**## ODFileUploadComponentData `type`
 * The configurable settings/options for the `ODFileUploadComponent`.
 */
declare interface ODFileUploadComponentData {
    /**The custom id of this file upload. */
    customId?: string;
    /**Is this file upload required? */
    required: boolean;
    /**The minimum amount of files to upload (0-10). */
    minAmount?: number;
    /**The maximum amount of files to upload (1-10). */
    maxAmount?: number;
}

/**## ODFileUploadQuestion `class`
 * An Open Ticket file-upload question. It contains all config properties of the file-upload question type.
 */
declare class ODFileUploadQuestion extends ODQuestion<ODFileUploadQuestionIdMappings> {
    readonly type: "opendiscord:file-upload";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODFileUploadQuestion;
}

/**## ODFileUploadQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODFileUploadQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODFileUploadQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:limits-enabled": ODQuestionData<boolean>;
    "opendiscord:limits-min": ODQuestionData<number>;
    "opendiscord:limits-max": ODQuestionData<number>;
}

/**## ODFlag `class`
 * This is an Open Discord flag.
 *
 * A flag is a boolean that can be specified by a parameter in the console.
 * It's useful for small settings that are only required once in a while.
 *
 * Flags can also be enabled manually by plugins!
 */
declare class ODFlag extends ODManagerData {
    /**The method that has been used to set the value of this flag. (`null` when not set) */
    method: "param" | "manual" | null;
    /**The name of this flag. Visible to the user. */
    name: string;
    /**The description of this flag. Visible to the user. */
    description: string;
    /**The name of the parameter in the console. (e.g. `--test`) */
    param: string;
    /**A list of aliases for the parameter in the console. */
    aliases: string[];
    /**The value of this flag. */
    value: boolean;
    constructor(id: ODValidId, name: string, description: string, param: string, aliases?: string[], initialValue?: boolean);
    /**Set the value of this flag. */
    setValue(value: boolean, method?: "param" | "manual"): void;
    /**Detect if the process contains the param or aliases & set the value. Use `force` to overwrite a manually set value. */
    detectProcessParams(force?: boolean): void;
}

/**## ODFlagManager `class`
 * This is an Open Discord flag manager.
 *
 * This class is responsible for managing & initiating all flags of the bot.
 * It also contains a shortcut for initiating all flags.
 */
declare class ODFlagManager<IdList extends ODFlagManagerIdConstraint = ODFlagManagerIdConstraint> extends ODManager<ODFlag> {
    constructor(debug: ODDebugger);
    /**Set all flags to their `process.argv` value. */
    init(): Promise<void>;
    get<FlagId extends keyof ODNoGeneric<IdList>>(id: FlagId): IdList[FlagId];
    get(id: ODValidId): ODFlag | null;
    remove<FlagId extends keyof ODNoGeneric<IdList>>(id: FlagId): IdList[FlagId];
    remove(id: ODValidId): ODFlag | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODFlagManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODFlagManager` class.
 */
declare type ODFlagManagerIdConstraint = Record<string, ODFlag>;

/**## ODFlagManagerIdMappings `interface`
 * A list of all available IDs in the default `ODFlagManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODFlagManagerIdMappings extends api_2.ODFlagManagerIdConstraint {
    "opendiscord:no-migration": api_2.ODFlag;
    "opendiscord:dev-config": api_2.ODFlag;
    "opendiscord:dev-database": api_2.ODFlag;
    "opendiscord:debug": api_2.ODFlag;
    "opendiscord:crash": api_2.ODFlag;
    "opendiscord:no-transcripts": api_2.ODFlag;
    "opendiscord:no-checker": api_2.ODFlag;
    "opendiscord:checker": api_2.ODFlag;
    "opendiscord:no-easter": api_2.ODFlag;
    "opendiscord:no-plugins": api_2.ODFlag;
    "opendiscord:soft-plugins": api_2.ODFlag;
    "opendiscord:force-slash-update": api_2.ODFlag;
    "opendiscord:no-compile": api_2.ODFlag;
    "opendiscord:compile-only": api_2.ODFlag;
    "opendiscord:silent": api_2.ODFlag;
    "opendiscord:cli": api_2.ODFlag;
}

/**## ODFormattedJsonDatabase `class`
 * This is an Open Discord Formatted JSON database.
 * It stores data in a `json` file as a large `Array` using the `category`, `key`, `value` strategy.
 * You can store the following types: `string`, `number`, `boolean`, `array`, `object` & `null`!
 *
 * This one is exactly the same as `ODJsonDatabase`, but it has a formatter from the `formatted-json-stringify` package.
 * This can help you organise it a little bit better!
 */
declare class ODFormattedJsonDatabase<IdList extends ODDatabaseIdConstraint = ODDatabaseIdConstraint> extends ODDatabase<IdList> {
    /**The formatter to use on the database array */
    formatter: fjs.ArrayFormatter;
    constructor(id: ODValidId, file: string, formatter: fjs.ArrayFormatter, customPath?: string);
    /**Init the database. */
    init(): ODPromiseVoid;
    /**Set/overwrite the value of `category` & `key`. Returns `true` when overwritten!
     * @example
     * const didOverwrite = database.setData("category","key","value") //value can be any of the valid types
     * //You need an ODFormattedJsonDatabase class named "database" for this example to work!
     */
    set<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string, value: IdList[CategoryId]): ODOptionalPromise<boolean>;
    set(category: string, key: string, value: ODValidJsonType): ODOptionalPromise<boolean>;
    /**Get the value of `category` & `key`. Returns `undefined` when non-existent!
     * @example
     * const data = database.getData("category","key") //data will be the value
     * //You need an ODFormattedJsonDatabase class named "database" for this example to work!
     */
    get<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<IdList[CategoryId] | undefined>;
    get(category: string, key: string): ODOptionalPromise<ODValidJsonType | undefined>;
    /**Remove the value of `category` & `key`. Returns `undefined` when non-existent!
     * @example
     * const didExist = database.deleteData("category","key") //delete this value
     * //You need an ODFormattedJsonDatabase class named "database" for this example to work!
     */
    delete<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<boolean>;
    delete(category: string, key: string): ODOptionalPromise<boolean>;
    /**Check if a value of `category` & `key` exists. Returns `false` when non-existent! */
    exists(category: keyof ODNoGeneric<IdList>, key: string): ODOptionalPromise<boolean>;
    exists(category: string, key: string): ODOptionalPromise<boolean>;
    /**Get all values in `category`. Returns `undefined` when non-existent! */
    getCategory<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId): ODOptionalPromise<{
        key: string;
        value: IdList[CategoryId];
    }[] | undefined>;
    getCategory(category: string): ODOptionalPromise<{
        key: string;
        value: ODValidJsonType;
    }[] | undefined>;
    /**Get all values in `category`. */
    getAll(): ODOptionalPromise<ODJsonDatabaseStructure>;
    /**Read parsed data from the json file */
    protected getRawData(): ODJsonDatabaseStructure;
    /**Write parsed data to the json file */
    protected setRawData(data: ODJsonDatabaseStructure): void;
}

/**## ODFuseBooleans `type`
 * This type is a list of boolean fuses available in the `ODFuseManager` class.
 * It's used to generate typescript declarations for this class.
 */
declare type ODFuseBooleans<FuseList extends object> = {
    [Key in keyof FuseList]: FuseList[Key] extends boolean ? Key : never;
}[keyof FuseList];

/**## ODFuseManager `class`
 * This is an Open Discord fuse manager.
 *
 * It manages all settings in Open Discord that are not meant to be in the config.
 * Here you can disable certain default features of the bot to replace them with your own implementation!
 *
 * You can think of them like real fuses, they disable an entire branch of the bot!
 */
declare class ODFuseManager<FuseList extends object> {
    /**A list of all the defaults */
    protected fuses: FuseList;
    constructor(fuses: FuseList);
    /**Set a fuse to a specific value. Remember! All plugins can edit these values, so your value could be overwritten! */
    setFuse<DefaultName extends keyof FuseList>(key: DefaultName, value: FuseList[DefaultName]): void;
    /**Get a fuse. Remember! All plugins can edit these values, so this value could be overwritten! */
    getFuse<DefaultName extends keyof FuseList>(key: DefaultName): FuseList[DefaultName];
}

/**## ODFuseNumbers `type`
 * This type is a list of number fuses available in the `ODFuseManager` class.
 * It's used to generate typescript declarations for this class.
 */
declare type ODFuseNumbers<FuseList extends object> = {
    [Key in keyof FuseList]: FuseList[Key] extends number ? Key : never;
}[keyof FuseList];

/**## ODFuseStringArray `type`
 * This type is a list of string[] fuses available in the `ODFuseManager` class.
 * It's used to generate typescript declarations for this class.
 */
declare type ODFuseStringArray<FuseList extends object> = {
    [Key in keyof FuseList]: FuseList[Key] extends string[] ? Key : never;
}[keyof FuseList];

/**## ODFuseStrings `type`
 * This type is a list of string fuses available in the `ODFuseManager` class.
 * It's used to generate typescript declarations for this class.
 */
declare type ODFuseStrings<FuseList extends object> = {
    [Key in keyof FuseList]: FuseList[Key] extends string ? Key : never;
}[keyof FuseList];

/**## ODGalleryComponent `class`
 * A gallery component which renders a grid of media items (images/videos) in a message.
 * Add items to this gallery using `addComponent()`.
 */
declare class ODGalleryComponent extends ODGroupComponent<ODGalleryComponentData, ODFileComponent, {
    gallery: discord.MediaGalleryBuilder;
    attachments: discord.AttachmentBuilder[];
}> {
    constructor(id: ODValidId, data?: Partial<ODGalleryComponentData>);
    build(): Promise<{
        gallery: discord.MediaGalleryBuilder;
        attachments: discord.AttachmentBuilder[];
    }>;
}

/**## ODGalleryComponentData `type`
 * The configurable settings/options for the `ODGalleryComponent`.
 */
declare interface ODGalleryComponentData {
}

/**## ODGeneralHelpMenuCategory `class
 * A special class with types for the Open Ticket `General Commands` help menu category.
 */
declare class ODGeneralHelpMenuCategory extends api_2.ODHelpMenuCategory<ODGeneralHelpMenuCategoryIdMappings> {
}

/**## ODGeneralHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODGeneralHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODGeneralHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:help": api_2.ODHelpMenuCommandComponent;
    "opendiscord:ticket": api_2.ODHelpMenuCommandComponent | null;
}

/**## ODGeneralJsonCommentsConfig `class
 * A special class with types for the Open Ticket `config/general.jsonc` config file
 */
declare class ODGeneralJsonCommentsConfig extends api_2.ODJsonCommentsConfig<ODGeneralJsonConfig_GeneralData> {
}

/**## ODGeneralJsonConfig_CmdPermissionSettingsType `type`
 * This type is a collection of command permission settings for the "system"."permissions".... object in the `general.jsonc` config!
 */
declare type ODGeneralJsonConfig_CmdPermissionSettingsType = "admin" | "everyone" | "none" | string;

/**## ODGeneralJsonConfig_GeneralData `interface`
 * All contents of the `general.jsonc` config file.
 */
declare interface ODGeneralJsonConfig_GeneralData {
    /**This object contains a few URLs and metadata for the config. */
    _CONFIG_VERSION: string;
    /**The token of the bot. (Empty when using `tokenFromENV`) */
    token: string;
    /**Use the token from the `.env` file as `TOKEN=xxxxx`. */
    tokenFromENV: boolean;
    /**The main (hex) color used in almost every embed in the bot. */
    mainColor: discord.ColorResolvable | string;
    /**The language to use. Can be the id of the language or the id without the prefix when using `opendiscord:...`. */
    language: string;
    /**The prefix used in all text-commands. */
    prefix: string;
    /**The id of the discord server where the bot is used. */
    serverId: string;
    /**A list of discord role ids which are able to access all tickets & commands. */
    globalAdmins: string[];
    /**Are slash commands enabled? */
    slashCommands: boolean;
    /**Are text commands enabled? */
    textCommands: boolean;
    /**All settings related to the status of the bot. */
    status: ODGeneralJsonConfig_Status;
    /**All settings related to the ticket system. */
    ticketSystem: ODGeneralJsonConfig_TicketSystem;
    /**Configure permissions for all Open Ticket commands & actions. */
    permissions: ODGeneralJsonConfig_SystemPermissions;
    /**All settings related to the log channel. */
    logs: ODGeneralJsonConfig_SystemLogs;
}

/**## ODGeneralJsonConfig_LogMessages `interface`
 * Configure dm & log messages for all Open Ticket commands & actions.
 */
declare interface ODGeneralJsonConfig_LogMessages {
    creation: ODGeneralJsonConfig_MessageSettings;
    closing: ODGeneralJsonConfig_MessageSettings;
    deleting: ODGeneralJsonConfig_MessageSettings;
    reopening: ODGeneralJsonConfig_MessageSettings;
    claiming: ODGeneralJsonConfig_MessageSettings;
    pinning: ODGeneralJsonConfig_MessageSettings;
    adding: ODGeneralJsonConfig_MessageSettings;
    removing: ODGeneralJsonConfig_MessageSettings;
    renaming: ODGeneralJsonConfig_MessageSettings;
    moving: ODGeneralJsonConfig_MessageSettings;
    blacklisting: ODGeneralJsonConfig_MessageSettings;
    transferring: ODGeneralJsonConfig_MessageSettings;
    topicChange: ODGeneralJsonConfig_MessageSettings;
    priorityChange: ODGeneralJsonConfig_MessageSettings;
    reactionRole: ODGeneralJsonConfig_MessageSettings;
}

/**## ODGeneralJsonConfig_MessageSettings `interface`
 * This interface is an object which has all properties for the "system"."messages".... object in the `general.jsonc` config!
 */
declare interface ODGeneralJsonConfig_MessageSettings {
    /**Enable sending DM logs to the ticket creator for this action. */
    dm: boolean;
    /**Enable sending logsto the log channel for this action. */
    logs: boolean;
}

/**## ODGeneralJsonConfig_Status `interface`
 * This interface is an object which has all properties for the status object in the `general.jsonc` config!
 */
declare interface ODGeneralJsonConfig_Status {
    /**Is the status enabled? */
    enabled: boolean;
    /**The type of status (e.g. playing, listening, custom, ...) */
    type: Exclude<api_2.ODClientActivityType, false>;
    /**The mode/status of the bot (e.g. online, invisible, idle, do not disturb) */
    mode: api_2.ODClientActivityMode;
    /**The text for the status. */
    text: string;
    /**Additional text for the status. (visible below 'text') */
    state: string;
}

/**## ODGeneralJsonConfig_SystemChannelTopic `interface`
 * All global channel topic settings.
 */
declare interface ODGeneralJsonConfig_SystemChannelTopic {
    /**Show the option name in the channel topic. */
    showOptionName: boolean;
    /**Show the option description in the channel topic. */
    showOptionDescription: boolean;
    /**Show the option topic text in the channel topic (configured in the options config). */
    showOptionTopic: boolean;
    /**Show the current priority in the channel topic (auto-updated). */
    showPriority: boolean;
    /**Show the current close/reopen status in the channel topic (auto-updated). */
    showClosed: boolean;
    /**Show the current claim status in the channel topic (auto-updated). */
    showClaimed: boolean;
    /**Show the current pin status in the channel topic (auto-updated). */
    showPinned: boolean;
    /**Show the creator of the ticket in the channel topic (auto-updated on transfer). */
    showCreator: boolean;
    /**Show the first 5 participants of the ticket in the channel topic (auto-updated). */
    showParticipants: boolean;
}

/**## ODGeneralJsonConfig_SystemLimits `interface`
 * All settings related to global ticket limits.
 */
declare interface ODGeneralJsonConfig_SystemLimits {
    /**Enable global ticket limits. */
    enabled: boolean;
    /**The maximum amount of tickets that are allowed in the server at the same time. */
    globalMaximum: number;
    /**The maximum amount of tickets that a user is allowed to create at the same time. */
    userMaximum: number;
}

/**## ODGeneralJsonConfig_SystemLogs `interface`
 * All settings related to the log channel.
 */
declare interface ODGeneralJsonConfig_SystemLogs {
    /**Enable logging. Individual actions should still be added via the `"system"."messages"..."logs"` */
    enabled: boolean;
    /**The channel to send logs to. */
    channel: string;
    /**Configure dm & log messages for all Open Ticket commands & actions. */
    logMessages: ODGeneralJsonConfig_LogMessages;
}

/**## ODGeneralJsonConfig_SystemPermissions `interface`
 * Configure permissions for all Open Ticket commands & actions.
 */
declare interface ODGeneralJsonConfig_SystemPermissions {
    help: ODGeneralJsonConfig_CmdPermissionSettingsType;
    panel: ODGeneralJsonConfig_CmdPermissionSettingsType;
    ticket: ODGeneralJsonConfig_CmdPermissionSettingsType;
    close: ODGeneralJsonConfig_CmdPermissionSettingsType;
    delete: ODGeneralJsonConfig_CmdPermissionSettingsType;
    reopen: ODGeneralJsonConfig_CmdPermissionSettingsType;
    claim: ODGeneralJsonConfig_CmdPermissionSettingsType;
    unclaim: ODGeneralJsonConfig_CmdPermissionSettingsType;
    pin: ODGeneralJsonConfig_CmdPermissionSettingsType;
    unpin: ODGeneralJsonConfig_CmdPermissionSettingsType;
    move: ODGeneralJsonConfig_CmdPermissionSettingsType;
    rename: ODGeneralJsonConfig_CmdPermissionSettingsType;
    add: ODGeneralJsonConfig_CmdPermissionSettingsType;
    remove: ODGeneralJsonConfig_CmdPermissionSettingsType;
    blacklist: ODGeneralJsonConfig_CmdPermissionSettingsType;
    stats: ODGeneralJsonConfig_CmdPermissionSettingsType;
    clear: ODGeneralJsonConfig_CmdPermissionSettingsType;
    autoclose: ODGeneralJsonConfig_CmdPermissionSettingsType;
    autodelete: ODGeneralJsonConfig_CmdPermissionSettingsType;
    transfer: ODGeneralJsonConfig_CmdPermissionSettingsType;
    topic: ODGeneralJsonConfig_CmdPermissionSettingsType;
    priority: ODGeneralJsonConfig_CmdPermissionSettingsType;
    transcripts: ODGeneralJsonConfig_CmdPermissionSettingsType;
}

/**## ODGeneralJsonConfig_TicketSystem `interface`
 * All settings related to the ticket system.
 */
declare interface ODGeneralJsonConfig_TicketSystem {
    /**Prefer slash-commands over text-commands when displaying them in menu's and messages. */
    preferSlashOverText: boolean;
    /**Reply with "unknown command" when the prefix is used without a valid command. */
    sendErrorOnUnknownCommand: boolean;
    /**Display the question fields (in a ticket message) in code blocks. */
    questionFieldsInCodeBlock: boolean;
    /**Display embed fields together with question fields (in a ticket message). */
    displayFieldsWithQuestions: boolean;
    /**Show global admins roles together with ticket admins in panel embeds. */
    showGlobalAdminsInPanelRoles: boolean;
    /**Disable the (✅❌) buttons and directly run the action. */
    disableVerifyBars: boolean;
    /**Display error embeds/messages with red instead of the default bot color. */
    useRedErrorEmbeds: boolean;
    /**Always show the reason field in embeds, even when there is no reason provided. */
    alwaysShowReason: boolean;
    /**The emoji style used in the bot. This will affect all embeds, titles & messages in the bot. */
    emojiStyle: "before" | "after" | "double" | "disabled";
    /**The emoji used when pinning tickets. This is '📌' by default. */
    pinEmoji: string;
    /**The emoji used when closing tickets. This is '🔒' by default. */
    closeEmoji: string;
    /**Reply with an ephemeral message when a ticket is created. */
    replyOnTicketCreation: boolean;
    /**Reply with an ephemeral message when reaction roles are changed. */
    replyOnReactionRole: boolean;
    /**Ask for the priority of this ticket on ticket creation. This will happen in a dropdown in the ticket message. */
    askPriorityOnTicketCreation: boolean;
    /**Remove all participants (except admins) from the ticket when it's closed. */
    removeParticipantsOnClose: boolean;
    /**Disable autoclose for a ticket when it has been closed and re-opened. */
    disableAutocloseAfterReopen: boolean;
    /**Only allow autodelete when the ticket is already closed. */
    autodeleteRequiresClosedTicket: boolean;
    /**When enabled, only global admins are able to delete a ticket without transcript. */
    adminOnlyDeleteWithoutTranscript: boolean;
    /**Only allow ticket closing when at least 1 message has been sent by the creator. (admins are able to bypass) */
    allowCloseBeforeMessage: boolean;
    /**Only allow ticket closing when at least 1 message has been sent by a global or ticket admin. (admins are able to bypass) */
    allowCloseBeforeAdminMessage: boolean;
    /**Use a translated config checker in the console. */
    useTranslatedConfigChecker: boolean;
    /**Pin the (first) ticket message in the channel. This simulates old behaviour like Open Ticket v1, v2 & v3. */
    pinFirstTicketMessage: boolean;
    /**Enable/disable the ticket claim & unclaim button in the ticket message. */
    enableTicketClaimButtons: boolean;
    /**Enable/disable the ticket close & re-open button in the ticket message. */
    enableTicketCloseButtons: boolean;
    /**Enable/disable the ticket pin & unpin button in the ticket message. */
    enableTicketPinButtons: boolean;
    /**Enable/disable the ticket delete button in the ticket message. */
    enableTicketDeleteButtons: boolean;
    /**Enable/disable the "with reason" button for all actions in the ticket message. */
    enableTicketActionWithReason: boolean;
    /**Enable/disable the delete without transcript feature (button & /delete command). */
    enableDeleteWithoutTranscript: boolean;
    /**Enable/disable creating tickets for other users with /ticket <user>. (ADMIN ONLY) */
    enableCreateTicketForOtherUser: boolean;
    /**All settings related to global ticket limits. */
    limits: ODGeneralJsonConfig_SystemLimits;
    /**All global channel topic settings. */
    channelTopic: ODGeneralJsonConfig_SystemChannelTopic;
    /**Move closed tickets to this channel category. */
    closedCategory: {
        enabled: boolean;
        categoryId: string;
    };
    /**Create tickets in this channel category when the original category is full (max 50 channels). */
    backupCategory: {
        enabled: boolean;
        categoryId: string;
    };
    /**Move claimed tickets to the matching channel category of the user that claimed the ticket. */
    claimedCategories: {
        /**The user who claimed the ticket. */
        user: string;
        /**The category to move the ticket to. */
        category: string;
    }[];
}

/**## ODGlobalDatabase `class
 * A special class with types for the Open Ticket `database/global.json` database file
 */
declare class ODGlobalDatabase extends api_2.ODFormattedJsonDatabase<ODGlobalDatabaseIdMappings> {
}

/**## ODGlobalDatabaseIdMappings `interface`
 * A list of all available IDs in the default `ODGlobalDatabase` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODGlobalDatabaseIdMappings extends api_2.ODDatabaseIdConstraint {
    "opendiscord:option-suffix-counter": number;
    "opendiscord:option-suffix-history": string[];
    "opendiscord:last-version": string;
}

/**## ODGlobalStatisticScope `class
 * A special class with types for the Open Ticket `Global` statistics category/scope.
 */
declare class ODGlobalStatisticScope extends api_2.ODStatisticGlobalScope<ODGlobalStatisticScopeIdMappings> {
}

/**## ODGlobalStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODGlobalStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODGlobalStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:tickets-created": api_2.ODBaseStatistic;
    "opendiscord:tickets-closed": api_2.ODBaseStatistic;
    "opendiscord:tickets-deleted": api_2.ODBaseStatistic;
    "opendiscord:tickets-reopened": api_2.ODBaseStatistic;
    "opendiscord:tickets-autoclosed": api_2.ODBaseStatistic;
    "opendiscord:tickets-autodeleted": api_2.ODBaseStatistic;
    "opendiscord:tickets-claimed": api_2.ODBaseStatistic;
    "opendiscord:tickets-pinned": api_2.ODBaseStatistic;
    "opendiscord:tickets-moved": api_2.ODBaseStatistic;
    "opendiscord:tickets-transferred": api_2.ODBaseStatistic;
    "opendiscord:users-blacklisted": api_2.ODBaseStatistic;
    "opendiscord:transcripts-created": api_2.ODBaseStatistic;
    "opendiscord:ticket-volume": api_2.ODDynamicStatistic;
    "opendiscord:average-tickets": api_2.ODDynamicStatistic;
}

/**## ODGroupComponent `class`
 * An Open Discord message/modal component with children.
 *
 * This class itself doesn't do anything, but is a blueprint for other
 * `ODGroupComponent` classes which represent the new Discord message/modal components.
 */
declare abstract class ODGroupComponent<Data extends object, ChildComponent extends ODComponent<object, any>, BuildResult> extends ODComponent<Data, BuildResult> {
    /**The collection of child components. */
    children: ChildComponent[];
    /**Add a new component to this group. There are multiple modes available:
     * - `start`: insert at the start of the list.
     * - `end`: insert at the end of the list.
     * - `before`: insert before an existing component `referenceId` (`start` if `referenceId` is invalid)
     * - `after`: insert after an existing component `referenceId` (`end` if `referenceId` is invalid)
     * - `index`: insert at a certain index `referenceIndex` (`end` if `referenceIndex` is invalid)
     */
    addComponent(c: ChildComponent, mode: "start" | "end"): ChildComponent;
    addComponent(c: ChildComponent, mode: "before" | "after", referenceId: ODValidId): ChildComponent;
    addComponent(c: ChildComponent, mode: "index", referenceIndex: number): ChildComponent;
    /**Get a component with a certain ID in this group. Returns `null` if non-existent. Also able to search for components recursively. */
    getComponent(id: ODValidId): ChildComponent | null;
    getComponent(id: ODValidId, recursive: true, recursiveLimit?: number): ODComponent<any, any, ODComponentType> | null;
    /**Get all components of a certain type in this group. Also able to search for components recursively. */
    getComponentsOfType<Type extends ODComponentType>(type: Type): ODComponentForType[Type][];
    getComponentsOfType<Type extends ODComponentType>(type: Type, recursive: true, recursiveLimit?: number): ODComponentForType[Type][];
    /**Get the position of a component with a certain ID in this group. Returns `-1` if non-existent. */
    getComponentPosition(id: ODValidId): number;
    /**List all child components of this group. */
    listComponent(): ChildComponent[];
    /**Returns if a component with a certain ID exists in this group. */
    existsComponent(id: ODValidId): boolean;
    /**Remove a component with a certain ID from this group. Returns the removed component or `null if non-existent. */
    removeComponent(id: ODValidId): ChildComponent | null;
    /**Remove all child components from this group. Returns the removed components. */
    clearComponents(): ChildComponent[];
    /**Moves an existing component to a new location in this group. There are multiple modes available:
     * - `start`: move to the start of the list.
     * - `end`: move to the end of the list.
     * - `before`: move before an existing component `referenceId` (`start` if `referenceId` is invalid)
     * - `after`: move after an existing component `referenceId` (`end` if `referenceId` is invalid)
     * - `index`: move to a certain index `referenceIndex` (`end` if `referenceIndex` is invalid)
     */
    moveComponent(id: ODValidId, mode: "start" | "end"): void;
    moveComponent(id: ODValidId, mode: "before" | "after", referenceId: ODValidId): void;
    moveComponent(id: ODValidId, mode: "index", referenceIndex: number): void;
}

/**## ODHelpMenuCategory `class`
 * This is an Open Discord help menu category.
 *
 * Every category in the help menu is an embed field by default.
 * Try to limit the amount of components per category.
 */
declare class ODHelpMenuCategory<IdList extends ODHelpMenuCategoryIdConstraint = ODHelpMenuCategoryIdConstraint> extends ODManager<ODHelpMenuComponent> {
    /**The id of this category. */
    id: ODId;
    /**The priority of this category. The higher, the earlier it will appear in the menu. */
    priority: number;
    /**The name of this category. (can include emoji's) */
    name: string;
    /**When enabled, it automatically starts this category on a new page. */
    newPage: boolean;
    constructor(id: ODValidId, priority: number, name: string, newPage?: boolean);
    /**Render this category and it's components. */
    render(page: number, category: number, mode: "slash" | "text"): Promise<string>;
    get<HelpMenuComponentId extends keyof ODNoGeneric<IdList>>(id: HelpMenuComponentId): IdList[HelpMenuComponentId];
    get(id: ODValidId): ODHelpMenuComponent | null;
    remove<HelpMenuComponentId extends keyof ODNoGeneric<IdList>>(id: HelpMenuComponentId): IdList[HelpMenuComponentId];
    remove(id: ODValidId): ODHelpMenuComponent | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODHelpMenuCategoryIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODHelpMenuCategory` class.
 */
declare type ODHelpMenuCategoryIdConstraint = Record<string, ODHelpMenuComponent | null>;

/**## ODHelpMenuCommandComponent `class`
 * This is an Open Discord help menu command component.
 *
 * It contains a useful helper to render a command in the Open Discord help menu.
 */
declare class ODHelpMenuCommandComponent extends ODHelpMenuComponent {
    /**The settings for this help menu component. */
    settings: ODHelpMenuCommandComponentSettings;
    constructor(id: ODValidId, priority: number, settings: ODHelpMenuCommandComponentSettings);
    render(page: number, category: number, location: number, mode: "slash" | "text"): string;
    /**Utility function to render all command options. */
    protected renderOptions(options: ODHelpMenuCommandComponentOption[]): string;
}

/**## ODHelpMenuCommandComponentOption `interface`
 * This interface contains a command option for the `ODHelpMenuCommandComponent`.
 */
declare interface ODHelpMenuCommandComponentOption {
    /**The name of this option. */
    name: string;
    /**Is this option optional? */
    optional: boolean;
}

/**## ODHelpMenuCommandComponentSettings `interface`
 * This interface contains the settings for the `ODHelpMenuCommandComponent`.
 */
declare interface ODHelpMenuCommandComponentSettings {
    /**The name of this text command. */
    textName?: string;
    /**The name of this slash command. */
    slashName?: string;
    /**Options available in the text command. */
    textOptions?: ODHelpMenuCommandComponentOption[];
    /**Options available in the slash command. */
    slashOptions?: ODHelpMenuCommandComponentOption[];
    /**The description for the text command. */
    textDescription?: string;
    /**The description for the slash command. */
    slashDescription?: string;
}

/**## ODHelpMenuComponent `class`
 * This is an Open Discord help menu component.
 *
 * It can render something on the Open Discord help menu.
 */
declare abstract class ODHelpMenuComponent extends ODManagerData {
    /**The priority of this component. The higher, the earlier it will appear in the help menu. */
    priority: number;
    constructor(id: ODValidId, priority: number);
    /**The render function for this component. */
    abstract render(page: number, category: number, location: number, mode: "slash" | "text"): string | Promise<string>;
}

/**## ODHelpMenuManager `class`
 * This is an Open Discord help menu manager.
 *
 * It is responsible for rendering the entire help menu content.
 * You are also able to configure the amount of categories per page here.
 *
 * Fewer Categories == More Clean Menu
 */
declare class ODHelpMenuManager<IdList extends ODHelpMenuManagerIdConstraint = ODHelpMenuManagerIdConstraint> extends ODManager<ODHelpMenuCategory> {
    /**The amount of categories per-page. */
    categoriesPerPage: number;
    constructor(debug: ODDebugger);
    add(data: ODHelpMenuCategory, overwrite?: boolean): boolean;
    /**Render this entire help menu & return a `ODHelpMenuRenderResult`. */
    render(mode: "slash" | "text"): Promise<ODHelpMenuRenderResult>;
    get<HelpMenuCategoryId extends keyof ODNoGeneric<IdList>>(id: HelpMenuCategoryId): IdList[HelpMenuCategoryId];
    get(id: ODValidId): ODHelpMenuCategory | null;
    remove<HelpMenuCategoryId extends keyof ODNoGeneric<IdList>>(id: HelpMenuCategoryId): IdList[HelpMenuCategoryId];
    remove(id: ODValidId): ODHelpMenuCategory | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODHelpMenuManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODHelpMenuManager` class.
 */
declare type ODHelpMenuManagerIdConstraint = Record<string, ODHelpMenuCategory>;

/**## ODHelpMenuManagerIdMappings `interface`
 * A list of all available IDs in the default `ODHelpMenuManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODHelpMenuManagerIdMappings extends api_2.ODHelpMenuManagerIdConstraint {
    "opendiscord:general": ODGeneralHelpMenuCategory;
    "opendiscord:ticket-basic": ODBasicTicketHelpMenuCategory;
    "opendiscord:ticket-advanced": ODAdvancedTicketHelpMenuCategory;
    "opendiscord:ticket-user": ODUserTicketHelpMenuCategory;
    "opendiscord:admin": ODAdminHelpMenuCategory;
    "opendiscord:advanced": ODAdvancedHelpMenuCategory;
    "opendiscord:extra": ODExtraHelpMenuCategory;
}

/**## ODHelpMenuRenderResult `type`
 * This is the array returned when the help menu has been rendered successfully.
 *
 * It contains a list of pages, which contain categories by name & value (content).
 */
declare type ODHelpMenuRenderResult = {
    name: string;
    value: string;
}[][];

/**## ODHelpMenuTextComponent `class`
 * This is an Open Discord help menu text component.
 *
 * It can render a static piece of text on the Open Discord help menu.
 */
declare class ODHelpMenuTextComponent extends ODHelpMenuComponent {
    /**The text of this help menu component. */
    text: string;
    constructor(id: ODValidId, priority: number, text: string);
    render(page: number, category: number, location: number, mode: "slash" | "text"): string;
}

/**## ODHTTPGetRequest `class`
 * This is a class that can help you with creating simple HTTP GET requests.
 *
 * It works using the native node.js fetch() method. You can configure all options in the constructor!
 * @example
 * const request = new api.ODHTTPGetRequest("https://www.example.com/abc.txt",false,{})
 *
 * const result = await request.run()
 * result.body //the response body (string)
 * result.status //the response code (number)
 * result.response //the full response (object)
 */
declare class ODHTTPGetRequest {
    /**The url used in the request */
    url: string;
    /**The request config for additional options */
    config: RequestInit;
    /**Throw on error OR return http code 500 */
    throwOnError: boolean;
    constructor(main: ODMain, url: string, throwOnError: boolean, config?: RequestInit);
    /**Execute the GET request.*/
    run(): Promise<{
        status: number;
        body: string;
        response?: Response;
    }>;
}

/**## ODHTTPPostRequest `class`
 * This is a class that can help you with creating simple HTTP POST requests.
 *
 * It works using the native node.js fetch() method. You can configure all options in the constructor!
 * @example
 * const request = new api.ODHTTPPostRequest("https://www.example.com/abc.txt",false,{})
 *
 * const result = await request.run()
 * result.body //the response body (string)
 * result.status //the response code (number)
 * result.response //the full response (object)
 */
declare class ODHTTPPostRequest {
    /**The url used in the request */
    url: string;
    /**The request config for additional options */
    config: RequestInit;
    /**Throw on error OR return http code 500 */
    throwOnError: boolean;
    constructor(main: ODMain, url: string, throwOnError: boolean, config?: RequestInit);
    /**Execute the POST request.*/
    run(): Promise<{
        status: number;
        body: string;
        response?: Response;
    }>;
}

/**## ODId `class`
 * This is an Open Discord identifier.
 *
 * It can only contain the following characters: `a-z`, `A-Z`, `0-9`, `:`, `-` & `_`
 *
 * You can use this class to assign a unique id when creating configs, databases, languages & more!
 */
declare class ODId {
    /**The raw value of this `ODId` as a `string`. */
    private rawValue;
    /**The change listener for the parent `ODManager` of this `ODId`. */
    private changeListener;
    constructor(id: ODValidId);
    /**The full value of this `ODId` as a `string`. */
    set value(id: string);
    get value(): string;
    /**Returns a string representation of this id. (same as `this.value`) */
    toString(): string;
    /**The namespace of the id before `:`. (e.g. `opendiscord` for `opendiscord:autoclose-enabled`) */
    getNamespace(): string;
    /**The identifier of the id after `:`. (e.g. `autoclose-enabled` for `opendiscord:autoclose-enabled`) */
    getIdentifier(): string;
    /**Trigger an `onChange()` event in the parent `ODManager` of this class. */
    protected _change(oldId: string, newId: string): void;
    /****(❌ SYSTEM ONLY!!)** Set the callback executed when a value inside this class changes. */
    changed(callback: ((oldId: string, newId: string) => void) | null): void;
}

/**## ODIncrementalCounterCooldown `class`
 * This is an Open Discord incremental counter cooldown.
 *
 * It is is a cooldown based on an incremental counter. It is exactly the same as the normal counter,
 * with the only difference being that it still increments when the limit is already exeeded.
 */
declare class ODIncrementalCounterCooldown extends ODCooldown<{
    value: number;
}> {
    /**The cooldown will activate when exceeding this limit. */
    activeLimit: number;
    /**The cooldown will deactivate when below this limit. */
    cancelLimit: number;
    /**The amount to increase the counter with everytime the cooldown is triggered/updated. */
    increment: number;
    /**The amount to decrease the counter over time. */
    decrement: number;
    /**The interval between decrements in milliseconds. */
    invervalMs: number;
    constructor(id: ODValidId, activeLimit: number, cancelLimit: number, increment: number, decrement: number, intervalMs: number);
    use(id: string): boolean;
    check(id: string): boolean;
    delete(id: string): void;
    init(): Promise<void>;
}

/**## ODIncrementalTimeoutCooldown `class`
 * This is an Open Discord incremental timeout cooldown.
 *
 * It is is a cooldown based on an incremental timer. It is exactly the same as the normal timer,
 * with the only difference being that it adds additional time when triggered/updated while the cooldown is already active.
 */
declare class ODIncrementalTimeoutCooldown extends ODCooldown<{
    date: number;
}> {
    /**The amount of milliseconds before the cooldown times-out */
    timeoutMs: number;
    /**The amount of milliseconds to add when triggered/updated while the cooldown is already active. */
    incrementMs: number;
    constructor(id: ODValidId, timeoutMs: number, incrementMs: number);
    use(id: string): boolean;
    check(id: string): boolean;
    delete(id: string): void;
    /**Get the remaining amount of milliseconds before the timeout stops. */
    remaining(id: string): number | null;
    init(): Promise<void>;
}

/**## ODInfoConsoleMessage `class`
 * This is an Open Discord console info message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "INFO" messages!
 */
declare class ODInfoConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODInteractiveMessageState `class
 * A special class with state types for interactive Open Ticket message.
 */
declare class ODInteractiveMessageState extends api_2.ODState<{
    /**The method this message was generated with. */
    messageOrigin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
    /**The type of message. Used when editing messages. */
    messageType: "ticket-message" | "close-message" | "reopen-message" | "autoclose-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message";
    /**A reason this interactive message was generated. */
    messageReason?: string | null;
    /**The original author of this interactive message. */
    messageAuthor?: string;
    /**Additional data of this interactive message. */
    messageExtraData?: any;
}, false, false> {
    constructor(id: api_2.ODValidId, client: api_2.ODClientManager, database: api_2.ODDatabase);
}

/**## ODInterfaceWithPartialProperty `type`
 * A utility type to create an interface where some properties are optional!
 */
declare type ODInterfaceWithPartialProperty<Interface, Key extends keyof Interface> = Omit<Interface, Key> & Partial<Pick<Interface, Key>>;

/**## ODJsonCommentsConfig `class`
 * An Open Discord JSONC (`.jsonc`) config.
 * Use this class to get & edit variables from the config files or to create your own JSON config!
 * @example
 * //create a config from: ./config/test.jsonc with the id "some-config"
 * const config = new api.ODJsonCommentsConfig("some-config","test.jsonc")
 *
 * //create a config with custom dir: ./plugins/testplugin/test.jsonc
 * const config = new api.ODJsonCommentsConfig("plugin-config","test.jsonc","./plugins/testplugin/")
 */
declare class ODJsonCommentsConfig<Data extends any> extends ODConfig<Data> {
    formatter: fjs.custom.BaseFormatter;
    protected readonly defaultFormatter: fjs.DefaultFormatter;
    constructor(id: ODValidId, file: string, customPath?: string, formatter?: fjs.custom.BaseFormatter);
    /**Init the config. */
    init(): ODPromiseVoid;
    /**Reload the config. Be aware that this doesn't update the config data everywhere in the bot! */
    reload(): void;
    /**Save the edited config to the filesystem. This is used by the Interactive Setup CLI. It's not recommended to use this while the bot is running. */
    save(withoutFormatter?: boolean): ODPromiseVoid;
}

/**## ODJsonConfig `class`
 * This is an Open Discord JSON config.
 * You can use this class to get & edit variables from the config files or to create your own JSON config!
 * @example
 * //create a config from: ./config/test.json with the id "some-config"
 * const config = new api.ODJsonConfig("some-config","test.json")
 *
 * //create a config with custom dir: ./plugins/testplugin/test.json
 * const config = new api.ODJsonConfig("plugin-config","test.json","./plugins/testplugin/")
 */
declare class ODJsonConfig<Data extends any> extends ODConfig<Data> {
    formatter: fjs.custom.BaseFormatter;
    protected readonly defaultFormatter: fjs.DefaultFormatter;
    constructor(id: ODValidId, file: string, customPath?: string, formatter?: fjs.custom.BaseFormatter);
    /**Init the config. */
    init(): ODPromiseVoid;
    /**Reload the config. Be aware that this doesn't update the config data everywhere in the bot! */
    reload(): void;
    /**Save the edited config to the filesystem. This is used by the Interactive Setup CLI. It's not recommended to use this while the bot is running. */
    save(withoutFormatter?: boolean): ODPromiseVoid;
}

/**## ODJsonDatabase `class`
 * This is an Open Discord JSON database.
 * It stores data in a `json` file as a large `Array` using the `category`, `key`, `value` strategy.
 * You can store the following types: `string`, `number`, `boolean`, `array`, `object` & `null`!
 *
 * You can use this class if you want to add your own database or to use an existing one!
 */
declare class ODJsonDatabase<IdList extends ODDatabaseIdConstraint = ODDatabaseIdConstraint> extends ODDatabase<IdList> {
    constructor(id: ODValidId, file: string, customPath?: string);
    /**Init the database. */
    init(): ODPromiseVoid;
    /**Set/overwrite the value of `category` & `key`. Returns `true` when overwritten!
     * @example
     * const didOverwrite = database.setData("category","key","value") //value can be any of the valid types
     * //You need an ODJsonDatabase class named "database" for this example to work!
     */
    set<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string, value: IdList[CategoryId]): ODOptionalPromise<boolean>;
    set(category: string, key: string, value: ODValidJsonType): ODOptionalPromise<boolean>;
    /**Get the value of `category` & `key`. Returns `undefined` when non-existent!
     * @example
     * const data = database.getData("category","key") //data will be the value
     * //You need an ODJsonDatabase class named "database" for this example to work!
     */
    get<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<IdList[CategoryId] | undefined>;
    get(category: string, key: string): ODOptionalPromise<ODValidJsonType | undefined>;
    /**Remove the value of `category` & `key`. Returns `undefined` when non-existent!
     * @example
     * const didExist = database.deleteData("category","key") //delete this value
     * //You need an ODJsonDatabase class named "database" for this example to work!
     */
    delete<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId, key: string): ODOptionalPromise<boolean>;
    delete(category: string, key: string): ODOptionalPromise<boolean>;
    /**Check if a value of `category` & `key` exists. Returns `false` when non-existent! */
    exists(category: keyof ODNoGeneric<IdList>, key: string): ODOptionalPromise<boolean>;
    exists(category: string, key: string): ODOptionalPromise<boolean>;
    /**Get all values in `category`. Returns `undefined` when non-existent! */
    getCategory<CategoryId extends keyof ODNoGeneric<IdList>>(category: CategoryId): ODOptionalPromise<{
        key: string;
        value: IdList[CategoryId];
    }[] | undefined>;
    getCategory(category: string): ODOptionalPromise<{
        key: string;
        value: ODValidJsonType;
    }[] | undefined>;
    /**Get all values in `category`. */
    getAll(): ODOptionalPromise<ODJsonDatabaseStructure>;
    /**Read parsed data from the json file */
    protected getRawData(): ODJsonDatabaseStructure;
    /**Write parsed data to the json file */
    protected setRawData(data: ODJsonDatabaseStructure): void;
}

/**## ODJsonDatabaseStructure `type`
 * This is the structure of how a JSON database file!
 */
declare type ODJsonDatabaseStructure = {
    category: string;
    key: string;
    value: ODValidJsonType;
}[];

/**## ODJsonLanguage `class`
 * This is an Open Discord JSON language file.
 *
 * It contains metadata and all translation strings from a certain JSON file (in `./languages/`).
 * Register this class to an `ODLanguageManager` to use it!
 *
 * Use the `ODLanguage` class to use translations from non-JSON files!
 */
declare class ODJsonLanguage extends ODLanguage {
    constructor(id: ODValidId, file: string, customPath?: string);
    /**Init the langauge. */
    init(): ODPromiseVoid;
}

/**## ODLabelComponent `class`
 * A visual separator between components. The visibility and padding of this separator can be changed.
 */
declare class ODLabelComponent extends ODParentComponent<ODLabelComponentData, ODValidLabelComponents, discord.LabelBuilder> {
    constructor(id: ODValidId, data: Partial<ODLabelComponentData>);
    build(): Promise<discord.LabelBuilder>;
    /**Set the title of the child component in the modal. */
    setTitle(title: string): this;
    /**Set the description of the child component in the modal. */
    setDescription(description: string | null): this;
}

/**## ODLabelComponentData `type`
 * The configurable settings/options for the `ODLabelComponent`.
 */
declare interface ODLabelComponentData {
    /**The title for the child component in the modal. */
    title: string;
    /**An option description for the child component in the modal. */
    description?: string;
}

/**## ODLanguage `class`
 * This is an Open Discord language file.
 *
 * It contains metadata and all translation strings available in this language.
 * Register this class to an `ODLanguageManager` to use it!
 *
 * JSON languages should be created using the `ODJsonLanguage` class instead!
 */
declare abstract class ODLanguage extends ODManagerData {
    /**The name of the file with extension. */
    file: string;
    /**The path to the file relative to the main directory. */
    path: string;
    /**The raw object data of the translation. */
    data: any;
    /**The metadata of the language if available. */
    metadata: ODLanguageMetadata | null;
    constructor(id: ODValidId, data: any);
    /**Init the language. */
    abstract init(): ODPromiseVoid;
}

/**## ODLanguageManager `class`
 * This is an Open Discord language manager.
 *
 * It manages all languages in the bot and manages translation for you!
 * Get a translation via the `getTranslation()` or `getTranslationWithParams()` methods.
 *
 * Add new languages using the `ODlanguage` class in your plugin!
 */
declare class ODLanguageManager<IdList extends ODLanguageManagerIdConstraint = ODLanguageManagerIdConstraint, TranslationIds extends string = string> extends ODManager<ODLanguage> {
    /**The currently selected language. */
    current: ODLanguage | null;
    /**The currently selected backup language. (used when translation missing in current language) */
    backup: ODLanguage | null;
    constructor(debug: ODDebugger, presets: boolean);
    /**Set the current language by providing the ID of a language which is registered in this manager. */
    setCurrentLanguage(id: keyof ODNoGeneric<IdList>): void;
    setCurrentLanguage(id: ODValidId): void;
    /**Get the current language (same as `this.current`) */
    getCurrentLanguage(): ODLanguage | null;
    /**Set the backup language by providing the ID of a language which is registered in this manager. */
    setBackupLanguage(id: keyof ODNoGeneric<IdList>): void;
    setBackupLanguage(id: ODValidId): void;
    /**Get the backup language (same as `this.backup`) */
    getBackupLanguage(): ODLanguage | null;
    /**Get the metadata of the current/backup language. */
    getLanguageMetadata(frombackup?: boolean): ODLanguageMetadata | null;
    /**Get the ID (string) of the current language. (Not backup language) */
    getCurrentLanguageId(): string;
    /**Get a translation string by JSON location. (e.g. `"checker.system.typeError"`) */
    getTranslation(id: TranslationIds): string;
    getTranslation(id: string): string | null;
    /**Get a backup translation string by JSON location. (system only) */
    protected getBackupTranslation(id: string): string | null;
    /**Get a backup translation string by JSON location and replace `{0}`,`{1}`,`{2}`,... with the provided parameters. */
    getTranslationWithParams(id: TranslationIds, params: string[]): string;
    getTranslationWithParams(id: string, params: string[]): string | null;
    /**Init all language files. */
    init(): Promise<void>;
    get<LanguageId extends keyof ODNoGeneric<IdList>>(id: LanguageId): IdList[LanguageId];
    get(id: ODValidId): ODLanguage | null;
    remove<LanguageId extends keyof ODNoGeneric<IdList>>(id: LanguageId): IdList[LanguageId];
    remove(id: ODValidId): ODLanguage | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODLanguageManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODLanguageManager` class.
 */
declare type ODLanguageManagerIdConstraint = Record<string, ODLanguage>;

/**## ODLanguageManagerIdMappings `interface`
 * A list of all available IDs in the default `ODLanguageManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODLanguageManagerIdMappings extends api_2.ODLanguageManagerIdConstraint {
    "opendiscord:custom": api_2.ODLanguage;
    "opendiscord:english": api_2.ODLanguage;
    "opendiscord:dutch": api_2.ODLanguage;
    "opendiscord:portuguese": api_2.ODLanguage;
    "opendiscord:czech": api_2.ODLanguage;
    "opendiscord:german": api_2.ODLanguage;
    "opendiscord:catalan": api_2.ODLanguage;
    "opendiscord:hungarian": api_2.ODLanguage;
    "opendiscord:spanish": api_2.ODLanguage;
    "opendiscord:romanian": api_2.ODLanguage;
    "opendiscord:ukrainian": api_2.ODLanguage;
    "opendiscord:indonesian": api_2.ODLanguage;
    "opendiscord:italian": api_2.ODLanguage;
    "opendiscord:estonian": api_2.ODLanguage;
    "opendiscord:finnish": api_2.ODLanguage;
    "opendiscord:danish": api_2.ODLanguage;
    "opendiscord:thai": api_2.ODLanguage;
    "opendiscord:turkish": api_2.ODLanguage;
    "opendiscord:french": api_2.ODLanguage;
    "opendiscord:arabic": api_2.ODLanguage;
    "opendiscord:hindi": api_2.ODLanguage;
    "opendiscord:lithuanian": api_2.ODLanguage;
    "opendiscord:polish": api_2.ODLanguage;
    "opendiscord:latvian": api_2.ODLanguage;
    "opendiscord:norwegian": api_2.ODLanguage;
    "opendiscord:russian": api_2.ODLanguage;
    "opendiscord:swedish": api_2.ODLanguage;
    "opendiscord:vietnamese": api_2.ODLanguage;
    "opendiscord:persian": api_2.ODLanguage;
    "opendiscord:bengali": api_2.ODLanguage;
    "opendiscord:greek": api_2.ODLanguage;
    "opendiscord:japanese": api_2.ODLanguage;
    "opendiscord:korean": api_2.ODLanguage;
    "opendiscord:kurdish": api_2.ODLanguage;
    "opendiscord:simplified-chinese": api_2.ODLanguage;
    "opendiscord:traditional-chinese": api_2.ODLanguage;
    "opendiscord:slovenian": api_2.ODLanguage;
    "opendiscord:tamil": api_2.ODLanguage;
    "opendiscord:khmer  ": api_2.ODLanguage;
}

/**## ODLanguageManagerTranslationIdMappings `type`
 * A list of all available translation IDs in the default `ODLanguageManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare type ODLanguageManagerTranslationIdMappings = ("checker.system.headerOpenTicket" | "checker.system.typeError" | "checker.system.typeWarning" | "checker.system.typeInfo" | "checker.system.headerConfigChecker" | "checker.system.headerDescription" | "checker.system.footerError" | "checker.system.footerWarning" | "checker.system.footerSupport" | "checker.system.compactInformation" | "checker.system.dataPath" | "checker.system.dataDocs" | "checker.system.dataMessages" | "checker.messages.invalidType" | "checker.messages.propertyMissing" | "checker.messages.propertyOptional" | "checker.messages.objectDisabled" | "checker.messages.nullInvalid" | "checker.messages.switchInvalidType" | "checker.messages.objectSwitchInvalid" | "checker.messages.stringTooShort" | "checker.messages.stringTooLong" | "checker.messages.stringLengthInvalid" | "checker.messages.stringStartsWith" | "checker.messages.stringEndsWith" | "checker.messages.stringContains" | "checker.messages.stringChoices" | "checker.messages.stringRegex" | "checker.messages.stringInvertedContains" | "checker.messages.stringLowercase" | "checker.messages.stringUppercase" | "checker.messages.stringSpecialCharacters" | "checker.messages.stringNoSpaces" | "checker.messages.stringCapitalWord" | "checker.messages.stringCapitalSentence" | "checker.messages.stringPunctuation" | "checker.messages.numberTooShort" | "checker.messages.numberTooLong" | "checker.messages.numberLengthInvalid" | "checker.messages.numberTooSmall" | "checker.messages.numberTooLarge" | "checker.messages.numberNotEqual" | "checker.messages.numberStep" | "checker.messages.numberStepOffset" | "checker.messages.numberStartsWith" | "checker.messages.numberEndsWith" | "checker.messages.numberContains" | "checker.messages.numberChoices" | "checker.messages.numberFloat" | "checker.messages.numberNegative" | "checker.messages.numberPositive" | "checker.messages.numberZero" | "checker.messages.numberNan" | "checker.messages.numberInvertedContains" | "checker.messages.booleanTrue" | "checker.messages.booleanFalse" | "checker.messages.arrayEmptyDisabled" | "checker.messages.arrayEmptyRequired" | "checker.messages.arrayTooShort" | "checker.messages.arrayTooLong" | "checker.messages.arrayLengthInvalid" | "checker.messages.arrayInvalidTypes" | "checker.messages.arrayDouble" | "checker.messages.discordInvalidId" | "checker.messages.discordInvalidIdOptions" | "checker.messages.discordInvalidToken" | "checker.messages.colorInvalid" | "checker.messages.emojiTooShort" | "checker.messages.emojiTooLong" | "checker.messages.emojiCustom" | "checker.messages.emojiInvalid" | "checker.messages.urlInvalid" | "checker.messages.urlInvalidHttp" | "checker.messages.urlInvalidProtocol" | "checker.messages.urlInvalidHostname" | "checker.messages.urlInvalidExtension" | "checker.messages.urlInvalidPath" | "checker.messages.idNotUnique" | "checker.messages.idNonExistent" | "checker.messages.invalidLanguage" | "checker.messages.invalidButton" | "checker.messages.unusedOption" | "checker.messages.unusedQuestion" | "checker.messages.dropdownOption" | "checker.messages.customInvalidVersion" | "actions.buttons.create" | "actions.buttons.close" | "actions.buttons.delete" | "actions.buttons.reopen" | "actions.buttons.claim" | "actions.buttons.unclaim" | "actions.buttons.pin" | "actions.buttons.unpin" | "actions.buttons.clear" | "actions.buttons.helpSwitchSlash" | "actions.buttons.helpSwitchText" | "actions.buttons.helpPage" | "actions.buttons.withReason" | "actions.buttons.withoutTranscript" | "actions.buttons.blacklistAdd" | "actions.buttons.blacklistRemove" | "actions.titles.created" | "actions.titles.close" | "actions.titles.delete" | "actions.titles.reopen" | "actions.titles.claim" | "actions.titles.unclaim" | "actions.titles.pin" | "actions.titles.unpin" | "actions.titles.rename" | "actions.titles.move" | "actions.titles.add" | "actions.titles.remove" | "actions.titles.help" | "actions.titles.statsReset" | "actions.titles.blacklistAdd" | "actions.titles.blacklistRemove" | "actions.titles.blacklistGet" | "actions.titles.blacklistView" | "actions.titles.blacklistAddDm" | "actions.titles.blacklistRemoveDm" | "actions.titles.clear" | "actions.titles.clearTickets" | "actions.titles.roles" | "actions.titles.autoclose" | "actions.titles.autocloseEnabled" | "actions.titles.autocloseDisabled" | "actions.titles.autodelete" | "actions.titles.autodeleteEnabled" | "actions.titles.autodeleteDisabled" | "actions.titles.topicSet" | "actions.titles.prioritySet" | "actions.titles.priorityGet" | "actions.titles.transfer" | "actions.titles.transcripts" | "actions.descriptions.create" | "actions.descriptions.close" | "actions.descriptions.delete" | "actions.descriptions.reopen" | "actions.descriptions.claim" | "actions.descriptions.unclaim" | "actions.descriptions.pin" | "actions.descriptions.unpin" | "actions.descriptions.rename" | "actions.descriptions.move" | "actions.descriptions.add" | "actions.descriptions.remove" | "actions.descriptions.helpExplanation" | "actions.descriptions.statsReset" | "actions.descriptions.statsError" | "actions.descriptions.blacklistAdd" | "actions.descriptions.blacklistRemove" | "actions.descriptions.blacklistGetSuccess" | "actions.descriptions.blacklistGetEmpty" | "actions.descriptions.blacklistViewEmpty" | "actions.descriptions.blacklistViewTip" | "actions.descriptions.clearVerify" | "actions.descriptions.clearReady" | "actions.descriptions.rolesEmpty" | "actions.descriptions.autocloseLeave" | "actions.descriptions.autocloseTimeout" | "actions.descriptions.autodeleteLeave" | "actions.descriptions.autodeleteTimeout" | "actions.descriptions.autocloseEnabled" | "actions.descriptions.autocloseDisabled" | "actions.descriptions.autodeleteEnabled" | "actions.descriptions.autodeleteDisabled" | "actions.descriptions.ticketMessageLimit" | "actions.descriptions.ticketMessageAutoclose" | "actions.descriptions.ticketMessageAutodelete" | "actions.descriptions.panelReady" | "actions.descriptions.topicSet" | "actions.descriptions.prioritySet" | "actions.descriptions.priorityGet" | "actions.descriptions.transfer" | "actions.modal.closePlaceholder" | "actions.modal.deletePlaceholder" | "actions.modal.reopenPlaceholder" | "actions.modal.claimPlaceholder" | "actions.modal.unclaimPlaceholder" | "actions.modal.pinPlaceholder" | "actions.modal.unpinPlaceholder" | "actions.logs.createLog" | "actions.logs.closeLog" | "actions.logs.closeDm" | "actions.logs.deleteLog" | "actions.logs.deleteDm" | "actions.logs.reopenLog" | "actions.logs.reopenDm" | "actions.logs.claimLog" | "actions.logs.claimDm" | "actions.logs.unclaimLog" | "actions.logs.unclaimDm" | "actions.logs.pinLog" | "actions.logs.pinDm" | "actions.logs.unpinLog" | "actions.logs.unpinDm" | "actions.logs.renameLog" | "actions.logs.renameDm" | "actions.logs.moveLog" | "actions.logs.moveDm" | "actions.logs.addLog" | "actions.logs.addDm" | "actions.logs.removeLog" | "actions.logs.removeDm" | "actions.logs.blacklistAddLog" | "actions.logs.blacklistRemoveLog" | "actions.logs.blacklistAddDm" | "actions.logs.blacklistRemoveDm" | "actions.logs.clearLog" | "actions.logs.transferLog" | "actions.logs.transferDm" | "actions.logs.prioritySetLog" | "actions.logs.prioritySetDm" | "actions.logs.roleUpdateLog" | "actions.logs.roleUpdateDm" | "actions.logs.topicSetLog" | "actions.logs.topicSetDm" | "transcripts.success.visit" | "transcripts.success.ready" | "transcripts.success.textFileDescription" | "transcripts.success.htmlProgress" | "transcripts.success.createdChannel" | "transcripts.success.createdCreator" | "transcripts.success.createdParticipant" | "transcripts.success.createdActiveAdmin" | "transcripts.success.createdEveryAdmin" | "transcripts.success.createdOther" | "transcripts.errors.retry" | "transcripts.errors.continue" | "transcripts.errors.backup" | "transcripts.errors.error" | "transcripts.errors.title" | "transcripts.errors.noHistory" | "transcripts.errors.historyNotSupported" | "transcripts.text.messagesTitle" | "transcripts.text.embedTitle" | "transcripts.text.fileTitle" | "transcripts.text.fieldsTitle" | "transcripts.text.reactionsTitle" | "transcripts.text.statsTitle" | "transcripts.text.emptyContent" | "transcripts.text.noTitle" | "transcripts.text.noDesc" | "errors.titles.internalError" | "errors.titles.optionMissing" | "errors.titles.optionInvalid" | "errors.titles.unknownCommand" | "errors.titles.noPermissions" | "errors.titles.unknownTicket" | "errors.titles.deprecatedTicket" | "errors.titles.unknownOption" | "errors.titles.unknownPanel" | "errors.titles.notInGuild" | "errors.titles.channelRename" | "errors.titles.channelCategory" | "errors.titles.busy" | "errors.titles.permissionError" | "errors.descriptions.askForInfo" | "errors.descriptions.askForInfoResolve" | "errors.descriptions.internalError" | "errors.descriptions.optionMissing" | "errors.descriptions.optionInvalid" | "errors.descriptions.optionInvalidChoose" | "errors.descriptions.unknownCommand" | "errors.descriptions.noPermissions" | "errors.descriptions.noPermissionsList" | "errors.descriptions.noPermissionsCooldown" | "errors.descriptions.noPermissionsBlacklist" | "errors.descriptions.noPermissionsLimitGlobal" | "errors.descriptions.noPermissionsLimitGlobalUser" | "errors.descriptions.noPermissionsLimitOption" | "errors.descriptions.noPermissionsLimitOptionUser" | "errors.descriptions.unknownTicket" | "errors.descriptions.deprecatedTicket" | "errors.descriptions.notInGuild" | "errors.descriptions.channelRename" | "errors.descriptions.channelCategory" | "errors.descriptions.channelRenameSource" | "errors.descriptions.busy" | "errors.descriptions.closeBeforeMessage" | "errors.descriptions.closeBeforeAdminMessage" | "errors.descriptions.unableToCreateTicket" | "errors.descriptions.messageMissing" | "errors.descriptions.stateExpired" | "errors.descriptions.panelStateExpired" | "errors.optionInvalidReasons.stringRegex" | "errors.optionInvalidReasons.stringMinLength" | "errors.optionInvalidReasons.stringMaxLength" | "errors.optionInvalidReasons.numberInvalid" | "errors.optionInvalidReasons.numberMin" | "errors.optionInvalidReasons.numberMax" | "errors.optionInvalidReasons.numberDecimal" | "errors.optionInvalidReasons.numberNegative" | "errors.optionInvalidReasons.numberPositive" | "errors.optionInvalidReasons.numberZero" | "errors.optionInvalidReasons.channelNotFound" | "errors.optionInvalidReasons.userNotFound" | "errors.optionInvalidReasons.roleNotFound" | "errors.optionInvalidReasons.memberNotFound" | "errors.optionInvalidReasons.mentionableNotFound" | "errors.optionInvalidReasons.channelType" | "errors.optionInvalidReasons.notInGuild" | "errors.permissions.developer" | "errors.permissions.owner" | "errors.permissions.admin" | "errors.permissions.moderator" | "errors.permissions.support" | "errors.permissions.member" | "errors.permissions.discord-administrator" | "errors.actionInvalid.close" | "errors.actionInvalid.reopen" | "errors.actionInvalid.claim" | "errors.actionInvalid.unclaim" | "errors.actionInvalid.pin" | "errors.actionInvalid.unpin" | "errors.actionInvalid.add" | "errors.actionInvalid.remove" | "params.uppercase.ticket" | "params.uppercase.tickets" | "params.uppercase.reason" | "params.uppercase.creator" | "params.uppercase.remaining" | "params.uppercase.added" | "params.uppercase.removed" | "params.uppercase.filter" | "params.uppercase.method" | "params.uppercase.type" | "params.uppercase.blacklisted" | "params.uppercase.panel" | "params.uppercase.command" | "params.uppercase.system" | "params.uppercase.true" | "params.uppercase.false" | "params.uppercase.syntax" | "params.uppercase.originalName" | "params.uppercase.newName" | "params.uppercase.originalCategory" | "params.uppercase.newCategory" | "params.uppercase.until" | "params.uppercase.validOptions" | "params.uppercase.validPanels" | "params.uppercase.autoclose" | "params.uppercase.autodelete" | "params.uppercase.startupDate" | "params.uppercase.version" | "params.uppercase.name" | "params.uppercase.role" | "params.uppercase.status" | "params.uppercase.claimed" | "params.uppercase.pinned" | "params.uppercase.creationDate" | "params.uppercase.noone" | "params.uppercase.open" | "params.uppercase.closed" | "params.uppercase.priority" | "params.uppercase.status" | "params.uppercase.participants" | "params.uppercase.yes" | "params.uppercase.no" | "params.uppercase.accept" | "params.uppercase.cancel" | "params.uppercase.option" | "params.uppercase.topic" | "params.uppercase.uptime" | "params.uppercase.messages" | "params.uppercase.embeds" | "params.uppercase.files" | "params.uppercase.components" | "params.uppercase.cooldown" | "params.uppercase.maxTickets" | "params.uppercase.admins" | "params.uppercase.roles" | "params.uppercase.size" | "params.lowercase.text" | "params.lowercase.html" | "params.lowercase.command" | "params.lowercase.modal" | "params.lowercase.button" | "params.lowercase.dropdown" | "params.lowercase.method" | "commands.reason" | "commands.help" | "commands.panel" | "commands.panelId" | "commands.panelAutoUpdate" | "commands.ticket" | "commands.ticketId" | "commands.ticketOtherUser" | "commands.close" | "commands.delete" | "commands.deleteNoTranscript" | "commands.reopen" | "commands.claim" | "commands.claimUser" | "commands.unclaim" | "commands.pin" | "commands.unpin" | "commands.move" | "commands.moveId" | "commands.rename" | "commands.renameName" | "commands.add" | "commands.addUser" | "commands.remove" | "commands.removeUser" | "commands.blacklist" | "commands.blacklistView" | "commands.blacklistAdd" | "commands.blacklistRemove" | "commands.blacklistGet" | "commands.blacklistGetUser" | "commands.stats" | "commands.statsReset" | "commands.statsGlobal" | "commands.statsUser" | "commands.statsUserUser" | "commands.statsTicket" | "commands.statsTicketTicket" | "commands.clear" | "commands.clearFilter" | "commands.clearFilters.all" | "commands.clearFilters.open" | "commands.clearFilters.close" | "commands.clearFilters.claim" | "commands.clearFilters.unclaim" | "commands.clearFilters.pin" | "commands.clearFilters.unpin" | "commands.clearFilters.autoclose" | "commands.autoclose" | "commands.autocloseDisable" | "commands.autocloseEnable" | "commands.autocloseEnableTime" | "commands.autodelete" | "commands.autodeleteDisable" | "commands.autodeleteEnable" | "commands.autodeleteEnableTime" | "commands.topic" | "commands.topicSet" | "commands.topicValue" | "commands.topicList" | "commands.priority" | "commands.prioritySet" | "commands.priorityValue" | "commands.priorityGet" | "commands.priorityList" | "commands.transfer" | "commands.transferUser" | "commands.transcripts" | "commands.transcriptsUser" | "helpMenu.help" | "helpMenu.ticket" | "helpMenu.close" | "helpMenu.delete" | "helpMenu.reopen" | "helpMenu.pin" | "helpMenu.unpin" | "helpMenu.move" | "helpMenu.rename" | "helpMenu.claim" | "helpMenu.unclaim" | "helpMenu.add" | "helpMenu.remove" | "helpMenu.panel" | "helpMenu.blacklistView" | "helpMenu.blacklistAdd" | "helpMenu.blacklistRemove" | "helpMenu.blacklistGet" | "helpMenu.statsGlobal" | "helpMenu.statsTicket" | "helpMenu.statsUser" | "helpMenu.statsReset" | "helpMenu.autocloseDisable" | "helpMenu.autocloseEnable" | "helpMenu.autodeleteDisable" | "helpMenu.autodeleteEnable" | "helpMenu.categories.general" | "helpMenu.categories.basicTicket" | "helpMenu.categories.advancedTicket" | "helpMenu.categories.userTicket" | "helpMenu.categories.admin" | "helpMenu.categories.advanced" | "helpMenu.categories.extra" | "stats.scopes.global" | "stats.scopes.system" | "stats.scopes.user" | "stats.scopes.ticket" | "stats.scopes.participants" | "stats.scopes.messages" | "stats.properties.ticketsCreated" | "stats.properties.ticketsClosed" | "stats.properties.ticketsDeleted" | "stats.properties.ticketsReopened" | "stats.properties.ticketsAutoclosed" | "stats.properties.ticketsClaimed" | "stats.properties.ticketsPinned" | "stats.properties.ticketsMoved" | "stats.properties.usersBlacklisted" | "stats.properties.transcriptsCreated" | "stats.properties.ticketsAutodeleted" | "stats.properties.ticketsTransferred" | "stats.properties.ticketVolume" | "stats.properties.averageTickets" | "stats.properties.currentTickets" | "stats.properties.age" | "stats.properties.responseTime" | "stats.properties.resolutionTime" | "stats.properties.createdOn" | "stats.properties.createdBy" | "stats.properties.closedOn" | "stats.properties.closedBy" | "stats.properties.claimedOn" | "stats.properties.claimedBy" | "stats.properties.pinnedOn" | "stats.properties.pinnedBy" | "stats.properties.deletedOn" | "stats.properties.deletedBy" | "stats.roles.developer" | "stats.roles.serverOwner" | "stats.roles.serverAdmin" | "stats.roles.moderator" | "stats.roles.support" | "stats.roles.member" | "panel.selectTicket" | "panel.selectRole" | "panel.selectOption" | "panel.selectPriorityLevel" | "priorities.urgent" | "priorities.veryHigh" | "priorities.high" | "priorities.normal" | "priorities.low" | "priorities.veryLow" | "priorities.none");

/**## ODLanguageMetadata `interface`
 * This interface contains all metadata available in the language files.
 */
declare interface ODLanguageMetadata {
    /**The version of Open Discord this translation is made for. */
    otversion: string;
    /**The name of the language in english (with capital letter). */
    language: string;
    /**A list of translators (discord/github username) who've contributed to this language. */
    translators: string[];
    /**The last date that this translation has been modified (format: DD/MM/YYYY) */
    lastedited: string;
    /**When `true`, the translator made use of some sort of automation while creating the translation. (e.g. ChatGPT, Google Translate, DeepL, ...) */
    automated: boolean;
}

/**## ODLivestatusColor `type`
 * This is a collection of all the colors available within the LiveStatus system.
 */
declare type ODLiveStatusColor = "normal" | "red" | "green" | "blue" | "yellow" | "white" | "gray" | "magenta" | "cyan";

/**## ODLiveStatusFileSource `class`
 * This is the Open Discord livestatus file source.
 *
 * It is a LiveStatus source that will read the data from a local file.
 *
 * This can be used for testing/extending the LiveStatus system!
 */
declare class ODLiveStatusFileSource extends ODLiveStatusSource {
    /**The path to the source file */
    path: string;
    constructor(id: ODValidId, path: string);
}

/**## ODLiveStatusManager `class`
 * This is the Open Discord livestatus manager.
 *
 * It manages all LiveStatus sources and has the renderer for all LiveStatus messages.
 *
 * You can use this to customise or add stuff to the LiveStatus system.
 * Access it in the global `opendiscord.startscreen.livestatus` variable!
 */
declare class ODLiveStatusManager<IdList extends ODLiveStatusManagerIdConstraint = ODLiveStatusManagerIdConstraint> extends ODManager<ODLiveStatusSource> {
    /**The class responsible for rendering the livestatus messages. */
    renderer: ODLiveStatusRenderer;
    /**A reference to the ODMain or "opendiscord" global variable */
    protected main: ODMain | null;
    constructor(debug: ODDebugger, console: ODConsoleManager);
    /**Get the messages from all sources combined! */
    getAllMessages(): Promise<ODLiveStatusSourceData[]>;
    /**Set the opendiscord `ODMain` class to use for fetching message filters. */
    useMain(main: ODMain): void;
    get<LiveStatusId extends keyof ODNoGeneric<IdList>>(id: LiveStatusId): IdList[LiveStatusId];
    get(id: ODValidId): ODLiveStatusSource | null;
    remove<LiveStatusId extends keyof ODNoGeneric<IdList>>(id: LiveStatusId): IdList[LiveStatusId];
    remove(id: ODValidId): ODLiveStatusSource | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODLiveStatusManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODLiveStatusManager` class.
 */
declare type ODLiveStatusManagerIdConstraint = Record<string, ODLiveStatusSource>;

/**## ODLiveStatusManagerIdMappings `interface`
 * A list of all available IDs in the default `ODLiveStatusManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODLiveStatusManagerIdMappings extends api_2.ODLiveStatusManagerIdConstraint {
    "opendiscord:default-djdj-dev": api_2.ODLiveStatusUrlSource;
}

/**## ODLiveStatusRenderer `class`
 * This is the Open Discord livestatus renderer.
 *
 * It's responsible for rendering all LiveStatus messages to the console.
 */
declare class ODLiveStatusRenderer {
    /**A reference to the ODConsoleManager or "opendiscord.console" global variable */
    protected console: ODConsoleManager;
    constructor(console: ODConsoleManager);
    /**Render all messages */
    render(messages: ODLiveStatusSourceData[]): string;
}

/**## ODLiveStatusSource `class`
 * This is the Open Discord livestatus source.
 *
 * It is an empty template for a livestatus source.
 * By default, you should use `ODLiveStatusUrlSource` or `ODLiveStatusFileSource`,
 * unless you want to create one on your own!
 *
 * This class doesn't do anything on it's own! It's just a template!
 */
declare class ODLiveStatusSource extends ODManagerData {
    /**The raw data of this source */
    data: ODLiveStatusSourceData[];
    constructor(id: ODValidId, data: ODLiveStatusSourceData[]);
    /**Change the current data using this method! */
    setData(data: ODLiveStatusSourceData[]): void;
    /**Get all messages relevant to the bot based on some parameters. */
    getMessages(main: ODMain): Promise<ODLiveStatusSourceData[]>;
}

/**## ODLiveStatusSourceData `interface`
 * This is an interface containing all raw data received from the LiveStatus system.
 */
declare interface ODLiveStatusSourceData {
    /**The message to display */
    message: {
        /**The title of the message to display */
        title: string;
        /**The title color of the message to display */
        titleColor: ODLiveStatusColor;
        /**The description of the message to display */
        description: string;
        /**The description color of the message to display */
        descriptionColor: ODLiveStatusColor;
    };
    /**The message will only be shown when the bot matches all statements */
    active: {
        /**A list of versions to match */
        versions: string[];
        /**A list of languages to match */
        languages: string[];
        /**All languages should match */
        allLanguages: boolean;
        /**Match when the bot is using plugins */
        usingPlugins: boolean;
        /**Match when the bot is not using plugins */
        notUsingPlugins: boolean;
        /**Match when the bot is using slash commands */
        usingSlashCommands: boolean;
        /**Match when the bot is not using slash commands */
        notUsingSlashCommands: boolean;
        /**Match when the bot is not using transcripts */
        notUsingTranscripts: boolean;
        /**Match when the bot is using text transcripts */
        usingTextTranscripts: boolean;
        /**Match when the bot is using html transcripts */
        usingHtmlTranscripts: boolean;
    };
}

/**## ODLiveStatusUrlSource `class`
 * This is the Open Discord livestatus url source.
 *
 * It is a LiveStatus source that will read the data from a http URL (json file).
 *
 * This is the default way of receiving LiveStatus messages!
 */
declare class ODLiveStatusUrlSource extends ODLiveStatusSource {
    /**The url used in the request */
    url: string;
    /**The `ODHTTPGetRequest` helper to fetch the url! */
    request: ODHTTPGetRequest;
    constructor(main: ODMain, id: ODValidId, url: string);
    getMessages(main: ODMain): Promise<ODLiveStatusSourceData[]>;
}

/**## ODMain `class`
 * This is the main Open Discord class.
 * It contains all managers from the entire bot & has shortcuts to the event & logging system.
 *
 * This class can't be overwritten or extended & is available as the global variable `opendiscord`!
 */
declare abstract class ODMain implements ODMainManagers {
    readonly project: ODProjectType;
    readonly versions: ODVersionManager;
    readonly processStartupDate: Date;
    readyStartupDate: Date | null;
    readonly debugfile: ODDebugFileManager;
    readonly console: ODConsoleManager;
    readonly debug: ODDebugger;
    readonly events: ODEventManager;
    readonly plugins: ODPluginManager;
    readonly flags: ODFlagManager;
    readonly progressbars: ODProgressBarManager;
    readonly configs: ODConfigManager;
    readonly databases: ODDatabaseManager;
    readonly sessions: ODSessionManager;
    readonly languages: ODLanguageManager;
    readonly checkers: ODCheckerManager;
    readonly builders: ODBuilderManager;
    readonly components: ODComponentManager;
    readonly responders: ODResponderManager;
    readonly actions: ODActionManager;
    readonly verifybars: ODVerifyBarManager;
    readonly permissions: ODPermissionManager;
    readonly cooldowns: ODCooldownManager;
    readonly helpmenu: ODHelpMenuManager;
    readonly statistics: ODStatisticManager;
    readonly tasks: ODTaskManager;
    readonly posts: ODPostManager;
    readonly states: ODStateManager;
    readonly client: ODClientManager;
    readonly sharedFuses: ODSharedFuseManager;
    readonly env: ODEnvHelper;
    readonly livestatus: ODLiveStatusManager;
    readonly startscreen: ODStartScreenManager;
    constructor(managers: ODMainManagers, project: ODProjectType);
    /**Log a message to the console. But in the Open Discord style :) */
    log(message: ODConsoleMessage): void;
    log(message: ODError): void;
    log(message: string, type?: ODConsoleMessageTypes, params?: ODConsoleMessageParam[]): void;
}

/**## ODMainManagers `interface`
 * The global properties for the main class of the bot.
 */
declare interface ODMainManagers {
    /**A collection of versions of the bot, systems, frameworks & services. */
    versions: ODVersionManager;
    /**The timestamp that the (node.js) process of the bot started. */
    processStartupDate: Date;
    /**The timestamp that the bot finished loading and is ready for usage. */
    readyStartupDate: Date | null;
    /**The manager responsible for the debug file. (`...debug.txt`) */
    debugfile: ODDebugFileManager;
    /**The manager responsible for the console system. (logs, errors, etc) */
    console: ODConsoleManager;
    /**The manager responsible for sending debug logs to the debug file. (`...debug.txt`) */
    debug: ODDebugger;
    /**The manager containing all Open Discord events. */
    events: ODEventManager;
    /**The manager that handles & executes all plugins in the bot. */
    plugins: ODPluginManager;
    /**The manager that manages & checks all the console flags of the bot. (like `--debug`) */
    flags: ODFlagManager;
    /**The manager responsible for displaying progress bars in the console. */
    progressbars: ODProgressBarManager;
    /**A collection of all the config files of the bot and plugins. (like `config/general.json`) */
    configs: ODConfigManager;
    /**A collection of all the databases of the bot and plugins. (like `database/global.json`) */
    databases: ODDatabaseManager;
    /**A collection of all the sessions of the bot. (Sessions are temporary objects stored in memory) */
    sessions: ODSessionManager;
    /**The global translation manager which manges all language files, translations & switches between them. (Does not manage translations for plugins) */
    languages: ODLanguageManager;
    /**The manager responsible for checking the bot & plugin configs. (it checks for mistakes in your config) */
    checkers: ODCheckerManager;
    /**A collection of button, dropdown, embed, ... templates which can be used to construct messages and modals.
     * ### (🚨 Better alternative: `opendiscord.components (ODComponentManager)`)
     */
    builders: ODBuilderManager;
    /**A collection of building blocks and templates for messages & modals with native support for Discord Components v2. (e.g. buttons, dropdowns, checkboxes, radio groups, file uploads, ...)
     * ### (✅ New replacement for: `opendiscord.builders (ODBuilderManager)`)
     */
    components: ODComponentManager;
    /**The manager that handles responses to all interactions of the bot. (e.g. slash/text commands, buttons, dropdowns, modals) */
    responders: ODResponderManager;
    /**A collection of procedures. A procedure is a complex task which can be executed from multiple responders or events. (e.g. ticket-creation, ticket-deletion, ticket-claiming, ...) */
    actions: ODActionManager;
    /**A collection of verify bars from the bot. (the ✅ ❌ buttons in messages) */
    verifybars: ODVerifyBarManager;
    /**A manager which will help with calculating permissions for commands & actions. */
    permissions: ODPermissionManager;
    /**The manager which will manage cooldowns in the bot. (e.g. ticket-create cooldowns) */
    cooldowns: ODCooldownManager;
    /**The manager that collects & renders the Open Discord help menu contents. (not the final embed) */
    helpmenu: ODHelpMenuManager;
    /**The manager that registers, saves & updates statistics in the database. */
    statistics: ODStatisticManager;
    /**A place to put general-purpose code and background tasks which will execute on startup. */
    tasks: ODTaskManager;
    /**A collection of static Discord post channels. It allows the bot to find back log, transcript or configured channels based on a linked ID. */
    posts: ODPostManager;
    /**A system for tracking messages or linking metadata, states or progress to Discord messages (ID-based). Features automatic garbage collection. */
    states: ODStateManager;
    /**A wrapper around the `discord.Client` class. It handles client login, activity and registering text/slash commands. */
    client: ODClientManager;
    /**Shared fuses between Open Discord bots. Turn off "default behaviours" from the bot which is useful for replacing default behaviour with a custom implementation.  */
    sharedFuses: ODSharedFuseManager;
    /**A manager which collects variables from the Process ENV and `.env` file. */
    env: ODEnvHelper;
    /**LiveStatus is a protocol which displays live updates from DJdj Development in the startscreen of the bot. (e.g. new version available) */
    livestatus: ODLiveStatusManager;
    /**The manager responsible for rendering the startscreen of the bot. */
    startscreen: ODStartScreenManager;
}

/**## ODManager `class`
 * This is an Open Discord manager.
 *
 * It can be used to store & manage classes based on their `ODId`.
 * It is somewhat the same as the default JS `Map()`.
 * You can extend this class when creating your own classes & managers.
 *
 * This class has many useful functions based on `ODId` (add, get, remove, getAll, getFiltered, exists, loopAll, ...)
 */
declare class ODManager<DataType extends ODManagerData> extends ODManagerChangeHelper {
    /**Alias to Open Discord debugger. */
    protected debug?: ODDebugger;
    /**The message to send when debugging this manager. */
    protected debugname?: string;
    /**The map storing all data classes in this manager. */
    private data;
    /**An array storing all listeners when data is added. */
    private addListeners;
    /**An array storing all listeners when data has changed. */
    private changeListeners;
    /**An array storing all listeners when data is removed. */
    private removeListeners;
    constructor(debug?: ODDebugger, debugname?: string);
    /**Add data to the manager. The `ODId` in the data class will be used as identifier! You can optionally select to overwrite existing data!*/
    add(data: DataType | DataType[], overwrite?: boolean): boolean;
    /**Get data that matches the `ODId`. Returns the found data.*/
    get(id: ODValidId): DataType | null;
    /**Remove data that matches the `ODId`. Returns the removed data. */
    remove(id: ODValidId): DataType | null;
    /**Check if data that matches the `ODId` exists. Returns a boolean. */
    exists(id: ODValidId): boolean;
    /**Get all data inside this manager*/
    getAll(): DataType[];
    /**Get all data that matches inside the filter function*/
    getFiltered(predicate: (value: DataType, index: number, array: DataType[]) => unknown): DataType[];
    /**Get all data where the `ODId` matches the provided RegExp. */
    getRegex(regex: RegExp): DataType[];
    /**Get the length/size/amount of the data inside this manager. */
    getLength(): number;
    /**Get a list of all the ids inside this manager*/
    getIds(): ODId[];
    /**Run an iterator over all data in this manager. This method also supports async-await behaviour!*/
    loopAll(cb: (data: DataType, id: ODId) => ODPromiseVoid): Promise<void>;
    /**Use the Open Discord debugger in this manager for logs*/
    useDebug(debug?: ODDebugger, debugname?: string): void;
    /**Listen for when data is added to this manager. */
    onAdd(callback: ODManagerAddCallback<DataType>): void;
    /**Listen for when data is changed in this manager. */
    onChange(callback: ODManagerCallback<DataType>): void;
    /**Listen for when data is removed from this manager. */
    onRemove(callback: ODManagerCallback<DataType>): void;
}

/**## ODManagerAddCallback `type`
 * This is a callback for the `onAdd` event in the `ODManager`
 */
declare type ODManagerAddCallback<DataType extends ODManagerData> = (data: DataType, overwritten: boolean) => void;

/**## ODManagerCallback `type`
 * This is a callback for the `onChange` and `onRemove` events in the `ODManager`
 */
declare type ODManagerCallback<DataType extends ODManagerData> = (data: DataType) => void;

/**## ODManagerChangeHelper `class`
 * This is an Open Discord manager change helper.
 *
 * It is used to let the "onChange" event in the `ODManager` class work.
 * You can use this class when extending your own `ODManager`
 */
declare abstract class ODManagerChangeHelper {
    private changeListener;
    /**Trigger an `onChange()` event in the parent `ODManager` of this class. */
    protected _change(): void;
    /****(❌ SYSTEM ONLY!!)** Set the callback executed when a value inside this class changes. */
    changed(callback: (() => void) | null): void;
}

/**## ODManagerData `class`
 * This is Open Discord manager data.
 *
 * It provides a template for all classes that are used in the `ODManager`.
 *
 * There is an `id:ODId` property & also some events used in the manager.
 */
declare abstract class ODManagerData extends ODManagerChangeHelper {
    /**The id of this data. */
    id: ODId;
    constructor(id: ODValidId);
}

/**## ODManagerWithSafety `class`
 * This is an Open Discord safe manager.
 *
 * It functions exactly the same as a normal `ODManager`, but it has 1 function extra!
 * The `getSafe()` function will always return data, because when it doesn't find an id, it returns pre-configured backup data.
 */
declare class ODManagerWithSafety<DataType extends ODManagerData> extends ODManager<DataType> {
    /**The function that creates backup data returned in `getSafe()` when an id is missing in this manager. */
    protected backupGenerator: () => DataType;
    constructor(backupGenerator: () => DataType, debug?: ODDebugger, debugname?: string);
    /**Get data that matches the `ODId`. Returns the backup data when not found.
     *
     * ### ⚠️ This should only be used when the data doesn't need to be written/edited
     */
    getSafe(id: ODValidId): DataType;
}

/**## ODManualProgressBar `class`
 * This is an Open Discord manual console progress bar.
 *
 * It is used to create a simple manual progress bar in the console.
 * You can update the progress manually using `update()`.
 */
declare class ODManualProgressBar extends ODProgressBar {
    constructor(id: ODValidId, renderer: ODProgressBarRenderer<{}>, amount: number, autoStop: null | "min" | "max", prefix: string | null, suffix: string | null);
    /**Set the value of the progress bar. */
    set(value: number, stop?: boolean): void;
    /**Get the current value of the progress bar. */
    get(): number;
    /**Increase the value of the progress bar. */
    increase(amount: number, stop?: boolean): void;
    /**Decrease the value of the progress bar. */
    decrease(amount: number, stop?: boolean): void;
}

/**## ODMappedActionManager `class
 * A special class with types for the Open Ticket `ODActionManager` class.
 */
declare class ODMappedActionManager extends api_2.ODActionManager<ODActionManagerIdMappings> {
}

/**## ODMappedAutocompleteResponderManager `class
 * A special class with types for the Open Ticket `ODAutocompleteResponderManager` class.
 */
declare class ODMappedAutocompleteResponderManager extends api_2.ODAutocompleteResponderManager<ODAutocompleteResponderManagerIdMappings> {
}

/**## ODMappedBuilderManager `class
 * A special class with types for the Open Ticket `ODBuilderManager` class.
 */
declare class ODMappedBuilderManager extends api_2.ODBuilderManager<ODButtonManagerIdMappings, ODDropdownManagerIdMappings, ODFileManagerIdMappings, ODEmbedManagerIdMappings, ODMessageManagerIdMappings, ODModalManagerIdMappings> {
}

/**## ODMappedButtonManager `class
 * A special class with types for the Open Ticket `ODButtonManager` class.
 */
declare class ODMappedButtonManager extends api_2.ODButtonManager<ODButtonManagerIdMappings> {
}

/**## ODMappedButtonResponderManager `class
 * A special class with types for the Open Ticket `ODButtonResponderManager` class.
 */
declare class ODMappedButtonResponderManager extends api_2.ODButtonResponderManager<ODButtonResponderManagerIdMappings> {
}

/**## ODMappedCheckerFunctionManager `class
 * A special class with types for the Open Ticket `ODCheckerFunctionManager` class.
 */
declare class ODMappedCheckerFunctionManager extends api_2.ODCheckerFunctionManager<ODCheckerFunctionManagerIdMappings> {
}

/**## ODMappedCheckerManager `class
 * A special class with types for the Open Ticket `ODCheckerManager` class.
 */
declare class ODMappedCheckerManager extends api_2.ODCheckerManager<ODCheckerManagerIdMappings, ODCheckerFunctionManagerIdMappings, api_2.ODDefaultCheckerRenderer, ODCheckerTranslationRegisterMessageIdMappings, ODCheckerTranslationRegisterOtherIdMappings> {
}

/**## ODMappedCheckerTranslationRegister `class
 * A special class with types for the Open Ticket `ODCheckerTranslationRegister` class.
 */
declare class ODMappedCheckerTranslationRegister extends api_2.ODCheckerTranslationRegister<ODCheckerTranslationRegisterMessageIdMappings, ODCheckerTranslationRegisterOtherIdMappings> {
}

/**## ODMappedClientManager `class
 * A special class with types for the Open Ticket `ODClientManager` class.
 */
declare class ODMappedClientManager extends api_2.ODClientManager<ODSlashCommandManagerIdMappings, ODTextCommandManagerIdMappings, ODContextMenuManagerIdMappings> {
}

/**## ODMappedCommandResponderManager `class
 * A special class with types for the Open Ticket `ODCommandResponderManager` class.
 */
declare class ODMappedCommandResponderManager extends api_2.ODCommandResponderManager<ODCommandResponderManagerIdMappings> {
}

/**## ODMappedComponentManager `class
 * A special class with types for the Open Ticket `ODBuilderManager` class.
 */
declare class ODMappedComponentManager extends api_2.ODComponentManager<ODSharedComponentManagerIdMappings, ODMessageComponentManagerIdMappings, ODModalComponentManagerIdMappings, ODComponentModifierManagerIdMappings> {
}

/**## ODMappedComponentModifierManager `class
 * A special class with types for the Open Ticket `ODComponentModifierManager` class.
 */
declare class ODMappedComponentModifierManager extends api_2.ODComponentModifierManager<ODComponentModifierManagerIdMappings> {
}

/**## ODMappedConfigManager `class
 * A special class with types for the Open Ticket `ODConfigManager` class.
 */
declare class ODMappedConfigManager extends api_2.ODConfigManager<ODConfigManagerIdMappings> {
}

/**## ODMappedContextMenuManager `class
 * A special class with types for the Open Ticket `ODContextMenuManager` class.
 */
declare class ODMappedContextMenuManager extends api_2.ODContextMenuManager<ODContextMenuManagerIdMappings> {
}

/**## ODMappedContextMenuResponderManager `class
 * A special class with types for the Open Ticket `ODContextMenuResponderManager` class.
 */
declare class ODMappedContextMenuResponderManager extends api_2.ODContextMenuResponderManager<ODContextMenuResponderManagerIdMappings> {
}

/**## ODMappedCooldownManager `class
 * A special class with types for the Open Ticket `ODCooldownManager` class.
 */
declare class ODMappedCooldownManager extends api_2.ODCooldownManager<ODCooldownManagerIdMappings> {
}

/**## ODMappedDatabaseManager `class
 * A special class with types for the Open Ticket `ODDatabaseManager` class.
 */
declare class ODMappedDatabaseManager extends api_2.ODDatabaseManager<ODDatabaseManagerIdMappings> {
}

/**## ODMappedDropdownManager `class
 * A special class with types for the Open Ticket `ODDropdownManager` class.
 */
declare class ODMappedDropdownManager extends api_2.ODDropdownManager<ODDropdownManagerIdMappings> {
}

/**## ODMappedDropdownResponderManager `class
 * A special class with types for the Open Ticket `ODDropdownResponderManager` class.
 */
declare class ODMappedDropdownResponderManager extends api_2.ODDropdownResponderManager<ODDropdownResponderManagerIdMappings> {
}

/**## ODMappedEmbedManager `class
 * A special class with types for the Open Ticket `ODEmbedManager` class.
 */
declare class ODMappedEmbedManager extends api_2.ODEmbedManager<ODEmbedManagerIdMappings> {
}

/**## ODMappedEventManager `class
 * A special class with types for the Open Ticket `ODEventManager` class.
 */
declare class ODMappedEventManager extends api_2.ODEventManager<ODEventManagerIdMappings> {
}

/**## ODMappedFileManager `class
 * A special class with types for the Open Ticket `ODFileManager` class.
 */
declare class ODMappedFileManager extends api_2.ODFileManager<ODFileManagerIdMappings> {
}

/**## ODMappedFlagManager `class
 * A special class with types for the Open Ticket `ODFlagManager` class.
 */
declare class ODMappedFlagManager extends api_2.ODFlagManager<ODFlagManagerIdMappings> {
}

/**## ODMappedHelpMenuManager `class
 * A special class with types for the Open Ticket `ODHelpMenuManager` class.
 */
declare class ODMappedHelpMenuManager extends api_2.ODHelpMenuManager<ODHelpMenuManagerIdMappings> {
}

/**## ODMappedLanguageManager `class
 * A special class with types for the Open Ticket `ODLanguageManager` class.
 */
declare class ODMappedLanguageManager extends api_2.ODLanguageManager<ODLanguageManagerIdMappings, ODLanguageManagerTranslationIdMappings> {
}

/**## ODMappedLiveStatusManager `class
 * A special class with types for the Open Ticket `ODLiveStatusManager` class.
 */
declare class ODMappedLiveStatusManager extends api_2.ODLiveStatusManager<ODLiveStatusManagerIdMappings> {
}

/**## ODMappedMessageComponentManager `class
 * A special class with types for the Open Ticket `ODMessageComponentManager` class.
 */
declare class ODMappedMessageComponentManager extends api_2.ODMessageComponentManager<ODMessageComponentManagerIdMappings> {
}

/**## ODMappedMessageManager `class
 * A special class with types for the Open Ticket `ODMessageManager` class.
 */
declare class ODMappedMessageManager extends api_2.ODMessageManager<ODMessageManagerIdMappings> {
}

/**## ODMappedModalComponentManager `class
 * A special class with types for the Open Ticket `ODModalComponentManager` class.
 */
declare class ODMappedModalComponentManager extends api_2.ODModalComponentManager<ODModalComponentManagerIdMappings> {
}

/**## ODMappedModalManager `class
 * A special class with types for the Open Ticket `ODModalManager` class.
 */
declare class ODMappedModalManager extends api_2.ODModalManager<ODModalManagerIdMappings> {
}

/**## ODMappedModalResponderManager `class
 * A special class with types for the Open Ticket `ODModalResponderManager` class.
 */
declare class ODMappedModalResponderManager extends api_2.ODModalResponderManager<ODModalResponderManagerIdMappings> {
}

/**## ODMappedPermissionManager `class
 * A special class with types for the Open Ticket `ODPermissionManager` class.
 */
declare class ODMappedPermissionManager extends api_2.ODPermissionManager<ODPermissionManagerIdMappings> {
}

/**## ODMappedPluginClassManager `class
 * A special class with types for the Open Ticket `ODPluginClassManager` class.
 */
declare class ODMappedPluginClassManager extends api_2.ODPluginClassManager<ODPluginClassManagerIdMappings> {
}

/**## ODMappedPluginManager `class
 * A special class with types for the Open Ticket `ODPluginManager` class.
 */
declare class ODMappedPluginManager extends api_2.ODPluginManager<ODPluginManagerIdMappings, ODPluginClassManagerIdMappings> {
}

/**## ODMappedPostManager `class
 * A special class with types for the Open Ticket `ODPostManager` class.
 */
declare class ODMappedPostManager extends api_2.ODPostManager<ODPostManagerIdMappings> {
}

/**## ODMappedPriorityManager `class
 * A special class with types for the Open Ticket `ODPriorityManager` class.
 */
declare class ODMappedPriorityManager extends ODPriorityManager<ODPriorityManagerIdMappings> {
}

/**## ODMappedProgressBarManager `class
 * A special class with types for the Open Ticket `ODProgressBarManager` class.
 */
declare class ODMappedProgressBarManager extends api_2.ODProgressBarManager<ODProgressBarManagerIdMappings, ODProgressBarRendererManagerIdMappings> {
}

/**## ODMappedProgressBarRendererManager `class
 * A special class with types for the Open Ticket `ODProgressBarRendererManager` class.
 */
declare class ODMappedProgressBarRendererManager extends api_2.ODProgressBarRendererManager<ODProgressBarRendererManagerIdMappings> {
}

/**## ODMappedResponderManager `class
 * A special class with types for the Open Ticket `ODResponderManager` class.
 */
declare class ODMappedResponderManager extends api_2.ODResponderManager<ODCommandResponderManagerIdMappings, ODButtonResponderManagerIdMappings, ODDropdownResponderManagerIdMappings, ODModalResponderManagerIdMappings, ODContextMenuResponderManagerIdMappings, ODAutocompleteResponderManagerIdMappings> {
}

/**## ODMappedSessionManager `class
 * A special class with types for the Open Ticket `ODSessionManager` class.
 */
declare class ODMappedSessionManager extends api_2.ODSessionManager<ODSessionManagerIdMappings> {
}

/**## ODMappedSharedComponentManager `class
 * A special class with types for the Open Ticket `ODSharedComponentManager` class.
 */
declare class ODMappedSharedComponentManager extends api_2.ODSharedComponentManager<ODSharedComponentManagerIdMappings> {
}

/**## ODMappedSlashCommandManager `class
 * A special class with types for the Open Ticket `ODSlashCommandManager` class.
 */
declare class ODMappedSlashCommandManager extends api_2.ODSlashCommandManager<ODSlashCommandManagerIdMappings> {
}

/**## ODMappedStartScreenManager `class
 * A special class with types for the Open Ticket `ODStartScreenManager` class.
 */
declare class ODMappedStartScreenManager extends api_2.ODStartScreenManager<ODStartScreenManagerIdMappings> {
}

/**## ODMappedStateManager `class
 * A special class with types for the Open Ticket `ODStateManager` class.
 */
declare class ODMappedStateManager extends api_2.ODStateManager<ODStateManagerIdMappings> {
}

/**## ODMappedStatisticManager `class
 * A special class with types for the Open Ticket `ODStatisticManager` class.
 */
declare class ODMappedStatisticManager extends api_2.ODStatisticManager<ODStatisticManagerIdMappings> {
}

/**## ODMappedTaskManager `class
 * A special class with types for the Open Ticket `ODTaskManager` class.
 */
declare class ODMappedTaskManager extends api_2.ODTaskManager<ODTaskManagerIdMappings> {
}

/**## ODMappedTextCommandManager `class
 * A special class with types for the Open Ticket `ODTextCommandManager` class.
 */
declare class ODMappedTextCommandManager extends api_2.ODTextCommandManager<ODTextCommandManagerIdMappings> {
}

/**## ODMappedTranscriptManager `class
 * A special class with types for the Open Ticket `ODTranscriptManager` class.
 */
declare class ODMappedTranscriptManager extends ODTranscriptManager<ODTranscriptManagerIdMappings> {
}

/**## ODMappedVerifyBarManager `class
 * A special class with types for the Open Ticket `ODVerifyBarManager` class.
 */
declare class ODMappedVerifyBarManager extends api_2.ODVerifyBarManager<ODVerifyBarManagerIdMappings> {
}

/**## ODMappedVersionManager `class
 * A special class with types for the Open Ticket `ODVersionManager` class.
 */
declare class ODMappedVersionManager extends api_2.ODVersionManager<ODVersionManagerIdMappings> {
}

/**## ODMemoryConfig `class`
 * An Open Discord memory config.
 * This config lives in-memory and does not have any connection to the filesystem.
 *
 * It is perfect for temporary configs or using the `ODChecker` without a real config file.
 */
declare class ODMemoryConfig<Data extends any> extends ODConfig<Data> {
    constructor(id: ODValidId, data: Data);
}

/**## ODMessage `class`
 * This is an Open Discord message builder.
 *
 * With this class, you can create a message to send in a discord channel.
 * The only difference with normal messages is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODMessage<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODMessageInstance, Origin, Params, ODMessageBuildResult, WorkerIds> {
    /**Build this message & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODMessageBuildResult>;
    /**Duplicate this message. Warning: If workers access external variables (outside parameters), the clone will still use those variables. This might result in unexpected behaviour! */
    duplicate(newId?: ODValidId): ODMessage<Origin, Params, WorkerIds>;
}

/**## ODMessageBuildResult `interface`
 * This interface contains the result from a built message. This can be sent in a discord channel!
 */
declare interface ODMessageBuildResult {
    /**The id of this message */
    id: ODId;
    /**The discord message */
    message: Omit<discord.MessageCreateOptions, "flags">;
    /**When enabled, the bot will try to send this as an ephemeral message */
    ephemeral: boolean;
}

/**## ODMessageComponent `class`
 * A message builder with **components v2** support.
 * Add items to this message using `addComponent()`.
 *
 * Use `ODSimpleMessageComponent` for components v1, polls, embeds, etc
 */
declare class ODMessageComponent extends ODGroupComponent<ODMessageComponentData, ODValidMessageComponents, ODMessageComponentBuildResult> {
    constructor(id: ODValidId, data?: Partial<ODMessageComponentData>);
    build(): Promise<{
        id: ODId;
        msg: {
            nonce?: string | number;
            forward?: discord.ForwardOptions;
            tts?: boolean;
            reply?: discord.ReplyOptions;
            allowedMentions?: discord.MessageMentionOptions;
            enforceNonce?: boolean;
            components: discord.JSONEncodable<discord.APIMessageTopLevelComponent>[];
            files: discord.AttachmentBuilder[];
        };
        componentsV2: boolean;
        ephemeral: boolean;
        supressEmbeds: boolean;
        supressNotifications: boolean;
    }>;
    /**Enable/disable ephemeral mode. */
    setEphemeral(value: boolean): this;
    /**Enable supress (hide) embeds mode. */
    setSupressEmbeds(value: boolean): this;
    /**Enable supress (hide) notifications mode. */
    setSupressNotifications(value: boolean): this;
    /**Add an additional attachment which can be used in components as `attachment://...` */
    addAdditionalAttachments(...attachments: discord.AttachmentBuilder[]): this;
}

/**## ODMessageComponentBuildResult `type`
 * The constructed message from an `ODMessageComponent`.
 */
declare interface ODMessageComponentBuildResult {
    /**The message to send. */
    msg: discord.MessageCreateOptions;
    /**Is this message using Components V2? */
    componentsV2: boolean;
    /**Should the message be sent as ephemeral? */
    ephemeral: boolean;
    /**Suppress/hide embeds. */
    supressEmbeds: boolean;
    /**Do not send notifications to mentioned users or roles. */
    supressNotifications: boolean;
    /**The id of the `ODMessageComponent` this message was built with. */
    id: ODId;
}

/**## ODMessageComponentData `type`
 * The configurable settings/options for the `ODMessageComponent`.
 */
declare interface ODMessageComponentData {
    /**Should the message be sent as ephemeral? */
    ephemeral?: boolean;
    /**Suppress/hide embeds. */
    supressEmbeds?: boolean;
    /**Do not send notifications to mentioned users or roles. */
    supressNotifications?: boolean;
    /**Additional options that aren't covered by the Open Discord api!*/
    additionalOptions?: Omit<discord.MessageCreateOptions, "poll" | "content" | "embeds" | "components" | "files" | "flags" | "stickers">;
    /**Add additional files which can be used in components as `attachment://...`  */
    additionalAttachments?: discord.AttachmentBuilder[];
}

/**## ODMessageComponentManager `class
 * A special class with types for `ODMessageComponent`'s.
 * Create message templates to use as replies and make use of shared components.
 */
declare class ODMessageComponentManager<IdList extends ODComponentManagerIdConstraint = ODComponentManagerIdConstraint> extends ODBaseComponentManager<IdList, ODMessageComponent | ODSimpleMessageComponent> {
    constructor(debug: ODDebugger);
}

/**## ODMessageComponentManagerIdMappings `interface`
 * A list of all available IDs in the default `ODMessageComponentManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODMessageComponentManagerIdMappings extends api_2.ODComponentManagerIdConstraint {
}

/**## ODMessageComponentModifier `class`
 * This is an Open Discord message component modifier.
 *
 * It contains a worker which is can be added to a message.
 *
 * The original message is preserved and a duplicate of `ODMessage` or `ODComponentFactory` is returned.
 *
 * Warning: If workers access external variables (outside parameters), the clone will still use those variables. This might result in unexpected behaviour!
 */
declare class ODMessageComponentModifier<Origin extends string, Params, WorkerIds extends string> extends ODManagerData {
    /**The workers which will modify the message. */
    workers: ODWorkerManager<ODMessageInstance | ODComponentFactoryInstance<ODMessageComponent>, Origin, Params, WorkerIds>;
    constructor(id: ODValidId, callback?: ODWorkerCallback<ODMessageInstance | ODComponentFactoryInstance<ODMessageComponent>, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Modify an `ODMessage` or `ODComponentFactory` with these workers. A copy will be returned and the original is preserved. */
    modify<Message extends ODMessage<any, any, any> | ODComponentFactory<ODMessageComponent, any, any, any>>(message: Message, origin: Origin, params: Params): Message;
}

/**## ODMessageData `interface`
 * This interface contains the data to build a message.
 */
declare interface ODMessageData {
    /**The content of this message. `null` when no content */
    content: string | null;
    /**Poll data for this message */
    poll: discord.PollData | null;
    /**Try to make this message ephemeral when available */
    ephemeral: boolean;
    /**Embeds from this message */
    embeds: ODEmbedBuildResult[];
    /**Components from this message */
    components: ODComponentBuildResult[];
    /**Files from this message */
    files: ODFileBuildResult[];
    /**Additional options that aren't covered by the Open Discord api!*/
    additionalOptions: Omit<discord.MessageCreateOptions, "poll" | "content" | "embeds" | "components" | "files" | "flags">;
}

/**## ODMessageInstance `class`
 * This is an Open Discord message instance.
 *
 * It contains all properties & functions to build a message!
 */
declare class ODMessageInstance {
    /**The current data of this message */
    data: ODMessageData;
    /**Set the content of this message */
    setContent(content: ODMessageData["content"]): this;
    /**Set the poll of this message */
    setPoll(poll: ODMessageData["poll"]): this;
    /**Make this message ephemeral when possible */
    setEphemeral(ephemeral: ODMessageData["ephemeral"]): this;
    /**Set the embeds of this message */
    setEmbeds(...embeds: ODEmbedBuildResult[]): this;
    /**Add an embed to this message! */
    addEmbed(embed: ODEmbedBuildResult): this;
    /**Remove an embed from this message */
    removeEmbed(id: ODValidId): this;
    /**Get an embed from this message */
    getEmbed(id: ODValidId): discord.EmbedBuilder | null;
    /**Set the components of this message */
    setComponents(...components: ODComponentBuildResult[]): this;
    /**Add a component to this message! */
    addComponent(component: ODComponentBuildResult): this;
    /**Remove a component from this message */
    removeComponent(id: ODValidId): this;
    /**Get a component from this message */
    getComponent(id: ODValidId): "\n" | discord.MessageActionRowComponentBuilder | null;
    /**Set the files of this message */
    setFiles(...files: ODFileBuildResult[]): this;
    /**Add a file to this message! */
    addFile(file: ODFileBuildResult): this;
    /**Remove a file from this message */
    removeFile(id: ODValidId): this;
    /**Get a file from this message */
    getFile(id: ODValidId): discord.AttachmentBuilder | null;
}

/**## ODMessageManager `class`
 * This is an Open Discord message manager.
 *
 * It contains all Open Discord message builders. Here, you can add your own messages or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODMessageManager<IdList extends ODMessageManagerIdConstraint = ODMessageManagerIdConstraint> extends ODManagerWithSafety<ODMessage<string, {}, string>> {
    constructor(debug: ODDebugger);
    get<MessageId extends keyof ODNoGeneric<IdList>>(id: MessageId): ODMessage<IdList[MessageId]["origin"], IdList[MessageId]["params"], IdList[MessageId]["workers"]>;
    get(id: ODValidId): ODMessage<string, {}, string> | null;
    remove<MessageId extends keyof ODNoGeneric<IdList>>(id: MessageId): ODMessage<IdList[MessageId]["origin"], IdList[MessageId]["params"], IdList[MessageId]["workers"]>;
    remove(id: ODValidId): ODMessage<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<MessageId extends keyof ODNoGeneric<IdList>>(id: MessageId): ODMessage<IdList[MessageId]["origin"], IdList[MessageId]["params"], IdList[MessageId]["workers"]>;
    getSafe(id: ODValidId): ODMessage<string, {}, string>;
}

/**## ODMessageManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODMessageManager` class.
 */
declare type ODMessageManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODMessageManagerIdMappings `interface`
 * A list of all available IDs in the default `ODMessageManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODMessageManagerIdMappings extends api_2.ODMessageManagerIdConstraint {
    "opendiscord:error": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: string;
            layout: "simple" | "advanced";
            customTitle?: string;
        };
        workers: "opendiscord:error";
    };
    "opendiscord:error-option-missing": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorMissingOption;
        };
        workers: "opendiscord:error-option-missing";
    };
    "opendiscord:error-option-invalid": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorInvalidOption;
        };
        workers: "opendiscord:error-option-invalid";
    };
    "opendiscord:error-unknown-command": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            error: api_2.ODTextCommandErrorUnknownCommand;
        };
        workers: "opendiscord:error-unknown-command";
    };
    "opendiscord:error-no-permissions": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            permissions: ODPermissionEmbedType[];
        };
        workers: "opendiscord:error-no-permissions";
    };
    "opendiscord:error-no-permissions-cooldown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            until?: Date;
        };
        workers: "opendiscord:error-no-permissions-cooldown";
    };
    "opendiscord:error-no-permissions-blacklisted": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-no-permissions-blacklisted";
    };
    "opendiscord:error-no-permissions-limits": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            limit: "global" | "global-user" | "option" | "option-user";
        };
        workers: "opendiscord:error-no-permissions-limits";
    };
    "opendiscord:error-responder-timeout": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-responder-timeout";
    };
    "opendiscord:error-ticket-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-unknown";
    };
    "opendiscord:error-ticket-deprecated": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-deprecated";
    };
    "opendiscord:error-option-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-option-unknown";
    };
    "opendiscord:error-panel-unknown": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-panel-unknown";
    };
    "opendiscord:error-not-in-guild": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-not-in-guild";
    };
    "opendiscord:error-channel-rename": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "ticket-pin" | "ticket-unpin" | "ticket-close" | "ticket-reopen" | "ticket-rename" | "ticket-move" | "ticket-priority" | "ticket-transfer" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            originalName: string;
            newName: string;
        };
        workers: "opendiscord:error-channel-rename";
    };
    "opendiscord:error-channel-category": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "ticket-create" | "ticket-close" | "ticket-reopen" | "ticket-claim" | "ticket-unclaim" | "ticket-move" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
            originalCategory: string;
            newCategory: string;
        };
        workers: "opendiscord:error-channel-category";
    };
    "opendiscord:error-ticket-busy": {
        origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
        params: {
            guild: discord.Guild | null;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:error-ticket-busy";
    };
    "opendiscord:help-menu": {
        origin: "slash" | "text" | "button" | "other";
        params: {
            mode: "slash" | "text";
            page: number;
        };
        workers: "opendiscord:help-menu";
    };
    "opendiscord:stats-global": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:stats-global";
    };
    "opendiscord:stats-ticket": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            scopeData: ODTicket;
        };
        workers: "opendiscord:stats-ticket";
    };
    "opendiscord:stats-user": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            scopeData: discord.User;
        };
        workers: "opendiscord:stats-user" | "opendiscord:easter-egg";
    };
    "opendiscord:stats-reset": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:stats-reset";
    };
    "opendiscord:stats-ticket-unknown": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            id: string;
        };
        workers: "opendiscord:stats-ticket-unknown";
    };
    "opendiscord:panel": {
        origin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
            isSubPanel: boolean;
        };
        workers: "opendiscord:panel-layout" | "opendiscord:panel-components";
    };
    "opendiscord:panel-ready": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            panel: ODPanel;
        };
        workers: "opendiscord:panel-ready";
    };
    "opendiscord:ticket-created": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created";
    };
    "opendiscord:ticket-created-dm": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created-dm";
    };
    "opendiscord:ticket-created-logs": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-created-logs";
    };
    "opendiscord:ticket-message": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:ticket-message-layout" | "opendiscord:ticket-message-components" | "opendiscord:ticket-message-disable-components";
    };
    "opendiscord:close-message": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "autoclose" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:close-message";
    };
    "opendiscord:reopen-message": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "autoclose-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:reopen-message";
    };
    "opendiscord:delete-message": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:delete-message";
    };
    "opendiscord:claim-message": {
        origin: "slash" | "text" | "ticket-message" | "unclaim-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:claim-message";
    };
    "opendiscord:unclaim-message": {
        origin: "slash" | "text" | "ticket-message" | "claim-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:unclaim-message";
    };
    "opendiscord:pin-message": {
        origin: "slash" | "text" | "ticket-message" | "unpin-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:pin-message";
    };
    "opendiscord:unpin-message": {
        origin: "slash" | "text" | "ticket-message" | "pin-message" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:unpin-message";
    };
    "opendiscord:rename-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: string;
        };
        workers: "opendiscord:rename-message";
    };
    "opendiscord:move-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: ODTicketOption;
        };
        workers: "opendiscord:move-message";
    };
    "opendiscord:add-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: discord.User;
        };
        workers: "opendiscord:add-message";
    };
    "opendiscord:remove-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
            data: discord.User;
        };
        workers: "opendiscord:remove-message";
    };
    "opendiscord:ticket-action-dm": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "reopen-message" | "delete-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message" | "autoclose-message" | "priority-message" | "topic-message" | "transfer-message" | "autoclose" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "close" | "reopen" | "delete" | "claim" | "unclaim" | "pin" | "unpin" | "rename" | "move" | "add" | "remove" | "priority" | "transfer" | "topic";
            ticket: ODTicket;
            reason: string | null;
            additionalData: null | string | discord.User | ODTicketOption;
            additionalData2?: discord.User;
        };
        workers: "opendiscord:ticket-action-dm";
    };
    "opendiscord:ticket-action-logs": {
        origin: "slash" | "text" | "ticket-message" | "close-message" | "reopen-message" | "delete-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message" | "autoclose-message" | "priority-message" | "topic-message" | "transfer-message" | "autoclose" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "close" | "reopen" | "delete" | "claim" | "unclaim" | "pin" | "unpin" | "rename" | "move" | "add" | "remove" | "priority" | "transfer" | "topic";
            ticket: ODTicket;
            reason: string | null;
            additionalData: null | string | discord.User | ODTicketOption;
            additionalData2?: discord.User;
        };
        workers: "opendiscord:ticket-action-logs";
    };
    "opendiscord:blacklist-view": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
        };
        workers: "opendiscord:blacklist-view";
    };
    "opendiscord:blacklist-get": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
        };
        workers: "opendiscord:blacklist-get";
    };
    "opendiscord:blacklist-add": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-add";
    };
    "opendiscord:blacklist-remove": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-remove";
    };
    "opendiscord:blacklist-dm": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "add" | "remove";
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-dm";
    };
    "opendiscord:blacklist-logs": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            mode: "add" | "remove";
            data: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:blacklist-logs";
    };
    "opendiscord:transcript-text-ready": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                contents: string;
            }, null>;
            result: ODTranscriptCompilerCompileResult<{
                contents: string;
            }>;
        };
        workers: "opendiscord:transcript-text-ready";
    };
    "opendiscord:transcript-html-ready": {
        origin: "channel" | "creator-dm" | "participant-dm" | "active-admin-dm" | "every-admin-dm" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                url: string;
                availableUntil: Date;
            }, {
                auth: string;
            }>;
            result: ODTranscriptCompilerCompileResult<{
                url: string;
                availableUntil: Date;
            }>;
        };
        workers: "opendiscord:transcript-html-ready";
    };
    "opendiscord:transcript-html-progress": {
        origin: "channel" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<{
                url: string;
                availableUntil: Date;
            }, {
                auth: string;
            }>;
            remaining: number;
        };
        workers: "opendiscord:transcript-html-progress";
    };
    "opendiscord:transcript-error": {
        origin: "slash" | "text" | "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "autodelete" | "clear" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            compiler: ODTranscriptCompiler<any, object | null>;
            reason: string | null;
        };
        workers: "opendiscord:transcript-error";
    };
    "opendiscord:transcript-history": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            transcriptUser: discord.User;
            transcriptList: ODTranscriptHistoryData[];
        };
        workers: "opendiscord:transcript-history";
    };
    "opendiscord:reaction-role": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role";
    };
    "opendiscord:reaction-role-dm": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role-dm";
    };
    "opendiscord:reaction-role-logs": {
        origin: "panel-button" | "other";
        params: {
            guild: discord.Guild;
            user: discord.User;
            role: ODRole;
            result: ODRoleUpdateResult[];
        };
        workers: "opendiscord:reaction-role-logs";
    };
    "opendiscord:clear-verify-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
            inProgress: boolean;
        };
        workers: "opendiscord:clear-verify-message";
    };
    "opendiscord:clear-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
        };
        workers: "opendiscord:clear-message";
    };
    "opendiscord:clear-logs": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            filter: ODTicketClearFilter;
            list: string[];
        };
        workers: "opendiscord:clear-logs";
    };
    "opendiscord:autoclose-message": {
        origin: "timeout" | "leave" | "verifybar" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:autoclose-message";
    };
    "opendiscord:autodelete-message": {
        origin: "timeout" | "leave" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
        };
        workers: "opendiscord:autodelete-message";
    };
    "opendiscord:autoclose-enable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            time: number;
            reason: string | null;
        };
        workers: "opendiscord:autoclose-enable";
    };
    "opendiscord:autodelete-enable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            time: number;
            reason: string | null;
        };
        workers: "opendiscord:autodelete-enable";
    };
    "opendiscord:autoclose-disable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:autoclose-disable";
    };
    "opendiscord:autodelete-disable": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            reason: string | null;
        };
        workers: "opendiscord:autodelete-disable";
    };
    "opendiscord:topic-set": {
        origin: "slash" | "text" | "ticket-action" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            topic: string;
        };
        workers: "opendiscord:topic-set";
    };
    "opendiscord:priority-set": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            priority: ODPriorityLevel;
            reason: string | null;
        };
        workers: "opendiscord:priority-set";
    };
    "opendiscord:priority-get": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            priority: ODPriorityLevel;
        };
        workers: "opendiscord:priority-get";
    };
    "opendiscord:transfer-message": {
        origin: "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.GuildTextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            oldCreator: discord.User;
            newCreator: discord.User;
            reason: string | null;
        };
        workers: "opendiscord:transfer-message";
    };
}

/**## ODMessagesStatisticScope `class
 * A special class with types for the Open Ticket `Messages` statistics category/scope.
 */
declare class ODMessagesStatisticScope extends api_2.ODStatisticScope<ODMessagesStatisticScopeIdMappings> {
}

/**## ODMessagesStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODMessagesStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODMessagesStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:count": api_2.ODDynamicStatistic;
}

/**## ODMessageStatesDatabase `class
 * A special class with types for the Open Ticket `database/states.json` database file
 */
declare class ODMessageStatesDatabase extends api_2.ODFormattedJsonDatabase {
}

/**## ODModal `class`
 * This is an Open Discord modal builder.
 *
 * With this class, you can create a modal to use as response in interactions.
 * The only difference with normal modals is that this one can be edited by Open Discord plugins!
 *
 * This is possible by using "workers" or multiple functions that will be executed in priority order!
 */
declare class ODModal<Origin extends string, Params, WorkerIds extends string = string> extends ODBuilderImplementation<ODModalInstance, Origin, Params, ODModalBuildResult, WorkerIds> {
    /**Build this modal & compile it for discord.js */
    build(origin: Origin, params: Params): Promise<ODModalBuildResult>;
}

/**## ODModalBuildResult `interface`
 * This interface contains the result from a built modal (form). This can be used in the `ODMessage` builder!
 */
declare interface ODModalBuildResult {
    /**The id of this modal */
    id: ODId;
    /**The discord modal */
    modal: discord.ModalBuilder;
}

/**## ODModalComponent `class`
 * A modal builder with **components v2** support.
 * Add questions, select menu's & labels to this modal using `addComponent()`.
 */
declare class ODModalComponent extends ODGroupComponent<ODModalComponentData, ODValidModalComponents, ODModalBuildResult> {
    constructor(id: ODValidId, data?: Partial<ODModalComponentData>);
    build(): Promise<{
        id: ODId;
        modal: discord.ModalBuilder;
    }>;
    /**Set the title of the modal. */
    setTitle(title: string): this;
    /**Set the custom id of this modal. */
    setCustomId(id: string | null): this;
}

/**## ODModalComponentData `type`
 * The configurable settings/options for the `ODModalComponent`.
 */
declare interface ODModalComponentData {
    /**The title of the modal (max 45 characters). */
    title: string;
    /**The custom id of this modal. */
    customId?: string;
}

/**## ODModalComponentManager `class
 * A special class with types for `ODModalComponent`'s.
 * Create modal templates to use as forms and make use of shared components.
 */
declare class ODModalComponentManager<IdList extends ODComponentManagerIdConstraint = ODComponentManagerIdConstraint> extends ODBaseComponentManager<IdList, ODModalComponent> {
    constructor(debug: ODDebugger);
}

/**## ODModalComponentManagerIdMappings `interface`
 * A list of all available IDs in the default `ODModalComponentManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODModalComponentManagerIdMappings extends api_2.ODComponentManagerIdConstraint {
    "opendiscord:ticket-questions": {
        origin: "panel-button" | "panel-dropdown" | "slash" | "text" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            option: ODTicketOption;
        };
        workers: "opendiscord:ticket-questions";
    };
    "opendiscord:close-ticket-reason": {
        origin: "ticket-message" | "reopen-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:close-ticket-reason";
    };
    "opendiscord:reopen-ticket-reason": {
        origin: "ticket-message" | "close-message" | "autoclose-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:reopen-ticket-reason";
    };
    "opendiscord:delete-ticket-reason": {
        origin: "ticket-message" | "reopen-message" | "close-message" | "autoclose-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:delete-ticket-reason";
    };
    "opendiscord:claim-ticket-reason": {
        origin: "ticket-message" | "unclaim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:claim-ticket-reason";
    };
    "opendiscord:unclaim-ticket-reason": {
        origin: "ticket-message" | "claim-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:unclaim-ticket-reason";
    };
    "opendiscord:pin-ticket-reason": {
        origin: "ticket-message" | "unpin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:pin-ticket-reason";
    };
    "opendiscord:unpin-ticket-reason": {
        origin: "ticket-message" | "pin-message" | "other";
        params: {
            guild: discord.Guild;
            channel: discord.TextBasedChannel;
            user: discord.User;
            ticket: ODTicket;
            message: discord.Message;
        };
        workers: "opendiscord:unpin-ticket-reason";
    };
}

/**## ODModalData `interface`
 * This interface contains the data to build a modal.
 */
declare interface ODModalData {
    /**The custom id of this modal */
    customId: string;
    /**The title of this modal */
    title: string | null;
    /**The collection of questions in this modal */
    questions: ODModalDataQuestion[];
}

/**## ODModalDataQuestion `interface`
 * This interface contains the data to build a modal question.
 */
declare interface ODModalDataQuestion {
    /**The style of this modal question */
    style: "short" | "paragraph";
    /**The custom id of this modal question */
    customId: string;
    /**The label of this modal question */
    label?: string;
    /**The min length of this modal question */
    minLength?: number;
    /**The max length of this modal question */
    maxLength?: number;
    /**Is this modal question required? */
    required?: boolean;
    /**The placeholder of this modal question */
    placeholder?: string;
    /**The initial value of this modal question */
    value?: string;
}

/**## ODModalInstance `class`
 * This is an Open Discord modal instance.
 *
 * It contains all properties & functions to build a modal!
 */
declare class ODModalInstance {
    /**The current data of this modal */
    data: ODModalData;
    /**Set the custom id of this modal */
    setCustomId(customId: ODModalData["customId"]): this;
    /**Set the title of this modal */
    setTitle(title: ODModalData["title"]): this;
    /**Set the questions of this modal */
    setQuestions(...questions: ODModalData["questions"]): this;
    /**Add a question to this modal! */
    addQuestion(question: ODModalDataQuestion): this;
    /**Remove a question from this modal */
    removeQuestion(customId: string): this;
    /**Get a question from this modal */
    getQuestion(customId: string): ODModalDataQuestion | null;
}

/**## ODModalManager `class`
 * This is an Open Discord modal manager.
 *
 * It contains all Open Discord modal builders. Here, you can add your own modals or edit existing ones!
 *
 * It's recommended to use this system in combination with all the other Open Discord builders!
 */
declare class ODModalManager<IdList extends ODModalManagerIdConstraint = ODModalManagerIdConstraint> extends ODManagerWithSafety<ODModal<string, {}, string>> {
    constructor(debug: ODDebugger);
    get<ModalId extends keyof ODNoGeneric<IdList>>(id: ModalId): ODModal<IdList[ModalId]["origin"], IdList[ModalId]["params"], IdList[ModalId]["workers"]>;
    get(id: ODValidId): ODModal<string, {}, string> | null;
    remove<ModalId extends keyof ODNoGeneric<IdList>>(id: ModalId): ODModal<IdList[ModalId]["origin"], IdList[ModalId]["params"], IdList[ModalId]["workers"]>;
    remove(id: ODValidId): ODModal<string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    getSafe<ModalId extends keyof ODNoGeneric<IdList>>(id: ModalId): ODModal<IdList[ModalId]["origin"], IdList[ModalId]["params"], IdList[ModalId]["workers"]>;
    getSafe(id: ODValidId): ODModal<string, {}, string>;
}

/**## ODModalManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODModalManager` class.
 */
declare type ODModalManagerIdConstraint = Record<string, {
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODModalManagerIdMappings `interface`
 * A list of all available IDs in the default `ODModalManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODModalManagerIdMappings extends api_2.ODModalManagerIdConstraint {
}

/**## ODModalResponder `class`
 * This is an Open Discord modal responder.
 *
 * This class manages all workers which are executed when the related modal is triggered.
 */
declare class ODModalResponder<Origin extends string, Params, WorkerIds extends string = string> extends ODResponderImplementation<ODModalResponderInstance, Origin, Params, WorkerIds> {
    /**Respond to this modal */
    respond(instance: ODModalResponderInstance, origin: Origin, params: Params): Promise<void>;
}

/**## ODModalResponderInstance `class`
 * This is an Open Discord modal responder instance.
 *
 * An instance is an active modal interaction. You can reply to the modal using `reply()`.
 */
declare class ODModalResponderInstance extends ODBaseResponderInstance {
    /**The interaction which is the source of this instance. */
    interaction: discord.ModalSubmitInteraction;
    /**Switches to `true` when a worker replies, edits or defers interaction. Will stop the timeout error from being shown. */
    protected ignoreResponderTimeout: boolean;
    /**The manager for all fields of this modal. */
    values: ODModalResponderInstanceValues;
    /**The user who triggered this modal. */
    user: discord.User;
    /**The guild member who triggered this modal. */
    member: discord.GuildMember | null;
    /**The guild where this modal was triggered. */
    guild: discord.Guild | null;
    /**The channel where this modal was triggered. */
    channel: discord.TextBasedChannel | null;
    constructor(interaction: discord.ModalSubmitInteraction, errorCallback: ODResponderTimeoutErrorCallback<ODModalResponderInstance, "modal"> | null, timeoutMs: number | null);
    /**Reply to this modal. */
    reply(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Update the message of this modal. */
    update(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<boolean>>;
    /**Defer this modal. */
    defer(type: "reply" | "update", ephemeral: boolean): Promise<boolean>;
}

/**## ODModalResponderInstanceValues `class`
 * This is an Open Discord modal responder instance values manager.
 *
 * This class will manage all fields from the modals.
 */
declare class ODModalResponderInstanceValues {
    /**The interaction to get data from. */
    private interaction;
    constructor(interaction: discord.ModalSubmitInteraction);
    /**Get the value of a text field. */
    getTextField(name: string, required: true): string;
    getTextField(name: string, required: false): string | null;
    /**Get the state of a single checkbox field. */
    getSingleCheckbox(name: string): boolean;
    /**Get the selected checkboxes of a checkbox group. */
    getCheckboxGroup(name: string): string[];
    /**Get the selected value of a radio group. */
    getRadioGroup(name: string, required: true): string;
    getRadioGroup(name: string, required: false): string | null;
    /**Get the selected values of a string/text dropdown. */
    getStringDropdownValues(name: string): string[];
    /**Get the selected values of a role dropdown. */
    getRoleDropdownValues(name: string): Promise<discord.Role[]>;
    /**Get the selected values of a user dropdown. */
    getUserDropdownValues(name: string): Promise<discord.User[]>;
    /**Get selected values of a channel dropdown. */
    getChannelDropdownValues(name: string): Promise<discord.Channel[]>;
    /**Get the selected values of a mentionable dropdown. */
    getMentionableDropdownValues(name: string): Promise<(discord.User | discord.Role)[]>;
    /**Get the uploaded files of a modal file upload component. */
    getUploadedFiles(name: string): discord.Attachment[];
}

/**## ODModalResponderManager `class`
 * This is an Open Discord modal responder manager.
 *
 * It contains all Open Discord modal responders. These can respond to modal interactions.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - know where the request came from!
 * - And so much more!
 */
declare class ODModalResponderManager<IdList extends ODModalResponderManagerIdConstraint = ODModalResponderManagerIdConstraint> extends ODManager<ODModalResponder<"modal", any>> {
    /**An alias to the Open Discord client manager. */
    private client;
    /**The callback executed when the default workers take too much time to reply. */
    private timeoutErrorCallback;
    /**The amount of milliseconds before the timeout error callback is executed. */
    private timeoutMs;
    /**A list of listeners which will listen to the raw interactionCreate event from discord.js */
    private listeners;
    constructor(debug: ODDebugger, debugname: string, client: ODClientManager);
    /**Set the message to send when the response times out! */
    setTimeoutErrorCallback(callback: ODResponderTimeoutErrorCallback<ODModalResponderInstance, "modal"> | null, ms: number | null): void;
    add(data: ODModalResponder<"modal", any>, overwrite?: boolean): boolean;
    get<ModalResponderId extends keyof ODNoGeneric<IdList>>(id: ModalResponderId): ODModalResponder<IdList[ModalResponderId]["origin"], IdList[ModalResponderId]["params"], IdList[ModalResponderId]["workers"]>;
    get(id: ODValidId): ODModalResponder<"modal", any> | null;
    remove<ModalResponderId extends keyof ODNoGeneric<IdList>>(id: ModalResponderId): ODModalResponder<IdList[ModalResponderId]["origin"], IdList[ModalResponderId]["params"], IdList[ModalResponderId]["workers"]>;
    remove(id: ODValidId): ODModalResponder<"modal", any> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODModalResponderManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODModalResponderManager` class.
 */
declare type ODModalResponderManagerIdConstraint = Record<string, {
    origin: "modal";
    params: object;
    workers: string;
}>;

/**## ODModalResponderManagerIdMappings `interface`
 * A list of all available IDs in the default `ODModalResponderManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODModalResponderManagerIdMappings extends api_2.ODModalResponderManagerIdConstraint {
    "opendiscord:ticket-questions": {
        origin: "modal";
        params: {};
        workers: "opendiscord:ticket-questions";
    };
    "opendiscord:close-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:close-ticket-reason";
    };
    "opendiscord:reopen-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:reopen-ticket-reason";
    };
    "opendiscord:delete-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:delete-ticket-reason";
    };
    "opendiscord:claim-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:claim-ticket-reason";
    };
    "opendiscord:unclaim-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:unclaim-ticket-reason";
    };
    "opendiscord:pin-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:pin-ticket-reason";
    };
    "opendiscord:unpin-ticket-reason": {
        origin: "modal";
        params: {};
        workers: "opendiscord:unpin-ticket-reason";
    };
}

/**## ODNoGeneric `type`
 * A utility type to remove generic index signatures from interfaces. This is required for providing autocomplete in all `IdList`'s of the `ODManagers`.
 */
declare type ODNoGeneric<T extends Record<string | number | symbol, any>> = {
    [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K];
};

declare interface ODOpenTicketFuseList {
    /**Load the default Open Ticket ticket priority levels. */
    priorityLoading: boolean;
    /**Load the default Open Ticket questions (from `config/questions.jsonc`) */
    questionLoading: boolean;
    /**Load the default Open Ticket options (from `config/options.jsonc`) */
    optionLoading: boolean;
    /**Load the default Open Ticket panels (from `config/panels.jsonc`) */
    panelLoading: boolean;
    /**Load the default Open Ticket tickets (from `database/tickets.json`) */
    ticketLoading: boolean;
    /**Load the default Open Ticket reaction roles (from `config/options.jsonc`) */
    roleLoading: boolean;
    /**Load the default Open Ticket blacklist (from `database/users.json`) */
    blacklistLoading: boolean;
    /**Load the default Open Ticket transcript compilers. */
    transcriptCompilerLoading: boolean;
    /**Load the default Open Ticket transcript history (from `database/transcripts.jsonc`) */
    transcriptHistoryLoading: boolean;
    /**The interval in milliseconds that are between autoclose timeout checkers. */
    autocloseCheckInterval: number;
    /**The interval in milliseconds that are between autodelete timeout checkers. */
    autodeleteCheckInterval: number;
}

declare class ODOpenTicketMain extends api_3.ODMain {
    versions: api_3.ODMappedVersionManager;
    events: api_3.ODMappedEventManager;
    plugins: api_3.ODMappedPluginManager;
    flags: api_3.ODMappedFlagManager;
    progressbars: api_3.ODMappedProgressBarManager;
    configs: api_3.ODMappedConfigManager;
    databases: api_3.ODMappedDatabaseManager;
    sessions: api_3.ODMappedSessionManager;
    languages: api_3.ODMappedLanguageManager;
    checkers: api_3.ODMappedCheckerManager;
    builders: api_3.ODMappedBuilderManager;
    components: api_3.ODMappedComponentManager;
    responders: api_3.ODMappedResponderManager;
    actions: api_3.ODMappedActionManager;
    verifybars: api_3.ODMappedVerifyBarManager;
    permissions: api_3.ODMappedPermissionManager;
    cooldowns: api_3.ODMappedCooldownManager;
    helpmenu: api_3.ODMappedHelpMenuManager;
    statistics: api_3.ODMappedStatisticManager;
    tasks: api_3.ODMappedTaskManager;
    posts: api_3.ODMappedPostManager;
    states: api_3.ODMappedStateManager;
    client: api_3.ODMappedClientManager;
    livestatus: api_3.ODMappedLiveStatusManager;
    startscreen: api_3.ODMappedStartScreenManager;
    /**Open Ticket specific fuses. With these fuses/switches, you can turn off "default behaviours" from the bot. Useful for replacing default behaviour with a custom implementation.  */
    fuses: api_3.ODFuseManager<api_3.ODOpenTicketFuseList>;
    /**The manager that manages all the data of questions in the bot. (these are used in options & tickets) */
    questions: api_3.ODQuestionManager;
    /**The manager that manages all the data of options in the bot. (these are used for panels, ticket creation, reaction roles) */
    options: api_3.ODOptionManager;
    /**The manager that manages all the data of panels in the bot. (panels contain the options) */
    panels: api_3.ODPanelManager;
    /**The manager that manages all tickets in the bot. (here, you can get & edit a lot of data from tickets) */
    tickets: api_3.ODTicketManager;
    /**The manager that manages the ticket blacklist. (people who are blacklisted can't create a ticket) */
    blacklist: api_3.ODBlacklistManager;
    /**The manager that manages the ticket transcripts. (both the history & compilers) */
    transcripts: api_3.ODMappedTranscriptManager;
    /**The manager that manages all reaction roles in the bot. (here, you can add additional data to roles) */
    roles: api_3.ODRoleManager;
    /**The manager that manages all priority levels in the bot. (register/edit ticket priority levels) */
    priorities: api_3.ODMappedPriorityManager;
    constructor();
    private readVersionFromPackage;
}

/**## ODOption `class`
 * This is an Open Ticket option.
 *
 * This class contains all data related to this option (parsed from the config).
 *
 * It's recommended to use `ODTicketOption`, `ODWebsiteOption` or `ODRoleOption` instead!
 */
declare abstract class ODOption<IdList extends ODOptionIdConstraint = ODOptionIdConstraint> extends api_2.ODManager<ODOptionData<api_2.ODValidJsonType>> {
    /**The id of this option. (from the config) */
    id: api_2.ODId;
    /**The type of this option. (e.g. `opendiscord:ticket`, `opendiscord:website`, `opendiscord:role`) */
    abstract readonly type: string;
    constructor(id: api_2.ODValidId, data: ODOptionData<api_2.ODValidJsonType>[]);
    get<OptionId extends keyof api_2.ODNoGeneric<IdList>>(id: OptionId): IdList[OptionId];
    get(id: api_2.ODValidId): ODOptionData<api_2.ODValidJsonType> | null;
    remove<OptionId extends keyof api_2.ODNoGeneric<IdList>>(id: OptionId): IdList[OptionId];
    remove(id: api_2.ODValidId): ODOptionData<api_2.ODValidJsonType> | null;
    exists(id: keyof api_2.ODNoGeneric<IdList>): boolean;
    exists(id: api_2.ODValidId): boolean;
    /**Convert this option to a JSON object for storing this option in the database. */
    toJson(version: api_2.ODVersion): ODOptionJson;
}

/**## ODOptionalPromise `type`
 * This is a simple type to represent a type as normal value or a promise value.
 */
declare type ODOptionalPromise<T> = T | Promise<T>;

/**## ODOptionCounterDynamicSuffix `class`
 * This is an Open Ticket counter-dynamic option suffix.
 *
 * This class can generate a counter-dynamic suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionCounterDynamicSuffix extends ODOptionSuffix {
    /**The database where the value of this counter is stored. */
    database: api_2.ODDatabase;
    constructor(id: api_2.ODValidId, option: ODTicketOption, database: api_2.ODDatabase);
    /**Initialize the database for this suffix. */
    private init;
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionCounterFixedSuffix `class`
 * This is an Open Ticket counter-fixed option suffix.
 *
 * This class can generate a counter-fixed suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionCounterFixedSuffix extends ODOptionSuffix {
    /**The database where the value of this counter is stored. */
    database: api_2.ODDatabase;
    constructor(id: api_2.ODValidId, option: ODTicketOption, database: api_2.ODDatabase);
    /**Initialize the database for this suffix. */
    private init;
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionData `class`
 * This is Open Ticket option data.
 *
 * This class contains a single property for an option. (string, number, boolean, object, array, null)
 *
 * When this property is edited, the database will be updated automatically.
 */
declare class ODOptionData<DataType extends api_2.ODValidJsonType> extends api_2.ODManagerData {
    /**The value of this property. */
    private rawValue;
    constructor(id: api_2.ODValidId, value: DataType);
    /**The value of this property. */
    set value(value: DataType);
    get value(): DataType;
    /**Refresh the database. Is only required to be used when updating `ODOptionData` with an object/array as value. */
    refreshDatabase(): void;
}

/**## ODOptionDataJson `interface`
 * The JSON representatation from a single option property.
 */
declare interface ODOptionDataJson {
    /**The id of this property. */
    id: string;
    /**The value of this property. */
    value: api_2.ODValidJsonType;
}

/**## ODOptionIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODOption` class.
 */
declare type ODOptionIdConstraint = Record<string, ODOptionData<api_2.ODValidJsonType>>;

/**## ODOptionDataJson `interface`
 * The JSON representatation from a single option.
 */
declare interface ODOptionJson {
    /**The id of this option. */
    id: string;
    /**The type of this option. (e.g. `opendiscord:ticket`, `opendiscord:website`, `opendiscord:role`) */
    type: string;
    /**The version of Open Ticket used to create this option & store it in the database. */
    version: string;
    /**The full list of properties/variables related to this option. */
    data: ODOptionDataJson[];
}

/**## ODOptionManager `class`
 * This is an Open Ticket option manager.
 *
 * This class manages all registered options in the bot. This also includes temporary options generated from tickets where the original option got deleted.
 *
 * All option types including: tickets, websites & reaction roles are stored here.
 */
declare class ODOptionManager extends api_2.ODManager<ODOption> {
    /**The option suffix manager used to generate channel suffixes for ticket names. */
    suffix: ODOptionSuffixManager;
    constructor(debug: api_2.ODDebugger);
    add(data: ODOption, overwrite?: boolean): boolean;
}

/**## ODOptionRandomHexSuffix `class`
 * This is an Open Ticket random-hex option suffix.
 *
 * This class can generate a random-hex suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionRandomHexSuffix extends ODOptionSuffix {
    /**The database where previous random hexes are stored. */
    database: api_2.ODDatabase;
    constructor(id: api_2.ODValidId, option: ODTicketOption, database: api_2.ODDatabase);
    /**Initialize the database for this suffix. */
    private init;
    /**Get a unique hex-string for this suffix. */
    protected generateUniqueValue(history: string[]): string;
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionRandomNumberSuffix `class`
 * This is an Open Ticket random-number option suffix.
 *
 * This class can generate a random-number suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionRandomNumberSuffix extends ODOptionSuffix {
    /**The database where previous random numbers are stored. */
    database: api_2.ODDatabase;
    constructor(id: api_2.ODValidId, option: ODTicketOption, database: api_2.ODDatabase);
    /**Initialize the database for this suffix. */
    private init;
    /**Get a unique number for this suffix. */
    protected generateUniqueValue(history: string[]): string;
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionsDatabase `class
 * A special class with types for the Open Ticket `database/options.json` database file
 */
declare class ODOptionsDatabase extends api_2.ODFormattedJsonDatabase<ODOptionsDatabaseIdMappings> {
}

/**## ODOptionsDatabaseIdMappings `interface`
 * A list of all available IDs in the default `ODOptionsDatabase` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODOptionsDatabaseIdMappings extends api_2.ODDatabaseIdConstraint {
    "opendiscord:used-option": ODOptionJson;
}

/**## ODOptionsJsonCommentsConfig `class
 * A special class with types for the Open Ticket `config/options.jsonc` config file
 */
declare class ODOptionsJsonCommentsConfig extends api_2.ODJsonCommentsConfig<ODOptionsJsonConfig_OptionsData> {
}

/**## ODOptionsJsonConfig_BaseOption `interface`
 * The basic properties for options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_BaseOption {
    /**The id of this option. */
    id: string;
    /**The name of this option. */
    name: string;
    /**The description of this option. */
    description: string;
    /**The type of this option. This type also determines the other option-specific variables. */
    type: "ticket" | "website" | "role" | "sub-panel";
    /**All settings related to the button for the 3 option types. */
    button: {
        /**The emoji of the button. (can also be empty) */
        emoji: string;
        /**The label of the button (can also be empty) */
        label: string;
    };
}

/**## ODOptionsJsonConfig_OptionButtonSettings `interface`
 * The button settings for ticket, sub-panel & reaction role options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_OptionButtonSettings {
    /**The emoji of the button. (can also be empty) */
    emoji: string;
    /**The label of the button (can also be empty) */
    label: string;
    /**The color of the button (not available in options with the 'website' type!) */
    color: api_2.ODValidButtonColor;
}

/**## ODOptionsJsonConfig_OptionsData `type`
 * All contents of the `options.jsonc` config file.
 */
declare type ODOptionsJsonConfig_OptionsData = (ODOptionsJsonConfig_TicketOption | ODOptionsJsonConfig_WebsiteOption | ODOptionsJsonConfig_RoleOption | ODOptionsJsonConfig_SubPanelOption)[];

/**## ODOptionsJsonConfig_RoleOption `interface`
 * All properties for reaction-role options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_RoleOption extends ODOptionsJsonConfig_BaseOption {
    type: "role";
    button: ODOptionsJsonConfig_OptionButtonSettings;
    /**All roles which will be affected by this button. */
    roles: string[];
    /**The mode determines what will happen with the affected roles on the user. */
    mode: ODRoleUpdateMode;
    /**A list of roles to remove from the user when given at least one of the affected roles. */
    removeRolesOnAdd: string[];
    /**Automatically add these roles when the user joins the server. */
    addOnMemberJoin: boolean;
}

/**## ODOptionsJsonConfig_SubPanelOption `interface`
 * All properties for sub-panel options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_SubPanelOption extends ODOptionsJsonConfig_BaseOption {
    type: "sub-panel";
    button: ODOptionsJsonConfig_OptionButtonSettings;
    /**The panel ID of the sub-panel to show when the button is clicked. */
    subPanelId: string;
}

/**## ODOptionsJsonConfig_TicketOption `interface`
 * All properties for ticket options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_TicketOption extends ODOptionsJsonConfig_BaseOption {
    type: "ticket";
    button: ODOptionsJsonConfig_OptionButtonSettings;
    /**A list of discord role ids which are able to access this ticket type & use commands. */
    ticketAdmins: string[];
    /**A list of discord role ids which are able to access this ticket type but can't write in the chat. */
    readonlyAdmins: string[];
    /**When enabled, blacklisted users can still create this ticket type. (used for appeals, etc) */
    allowCreationByBlacklistedUsers: boolean;
    /**A list of valid question ids from the `questions.jsonc` config. */
    questions: string[];
    /**All settings related to the ticket channel itself. */
    channel: ODOptionsJsonConfig_TicketOptionChannelSettings;
    /**All settings related to the message sent in DM to the creator when the ticket is created. */
    dmMessage: {
        /**Enable this message. */
        enabled: boolean;
        /**The raw text contents of this message. (empty for embed only) */
        text: string;
        /**The embed of this message. */
        embed: ODOptionsJsonConfig_TicketOptionEmbedSettings;
    };
    /**All settings related to the message sent in the ticket channel when the ticket is created. */
    ticketMessage: {
        /**Enable this message. */
        enabled: boolean;
        /**The raw text contents of this message. (empty for embed only) */
        text: string;
        /**The embed of this message. */
        embed: ODOptionsJsonConfig_TicketOptionEmbedSettings;
        /**Additional ping/mention settings for this ticket channel. */
        ping: ODOptionsJsonConfig_TicketOptionPingSettings;
    };
    /**All settings related to autoclosing this ticket type. */
    autoclose: {
        /**Enable autoclosing when the ticket is inactive for the set duration of time. */
        enableInactiveHours: boolean;
        /**The amount of hours this ticket is required to be inactive for. */
        inactiveHours: number;
        /**Enable autoclosing when the creator of the ticket leaves the server. */
        enableUserLeave: boolean;
        /**Disable autoclosing when the ticket is claimed by someone. */
        disableOnClaim: boolean;
    };
    /**All settings related to autodeleting this ticket type. */
    autodelete: {
        /**Enable autodeleting when the ticket is inactive for the set duration of time. */
        enableInactiveDays: boolean;
        /**The amount of days this ticket is required to be inactive for. */
        inactiveDays: number;
        /**Enable autodeleting when the creator of the ticket leaves the server. */
        enableUserLeave: boolean;
        /**Disable autodeleting when the ticket is claimed by someone. */
        disableOnClaim: boolean;
    };
    /**All settings related to the cooldown of this ticket type. */
    cooldown: {
        /**Enable cooldown (per user) */
        enabled: boolean;
        /**The amount of minutes a user needs to wait before being able to create a ticket again. */
        cooldownMinutes: number;
    };
    /**All settings related to the limits of this ticket type. */
    limits: {
        /**Enable option ticket limits. */
        enabled: boolean;
        /**The maximum amount of tickets of this type that are allowed in the server at the same time. */
        globalMaximum: number;
        /**The maximum amount of tickets of this type that a user is allowed to create at the same time. */
        userMaximum: number;
    };
    /**All settings related to the slow mode of this ticket type. */
    slowMode: {
        /**Enable channel slow mode. */
        enabled: boolean;
        /**The amount of seconds users need to wait between sending messages. */
        slowModeSeconds: number;
    };
}

/**## ODOptionsJsonConfig_TicketOptionChannelSettings `interface`
 * All settings related to the ticket channel itself in a ticket option.
 */
declare interface ODOptionsJsonConfig_TicketOptionChannelSettings {
    /**The prefix used in the name of this ticket channel. */
    prefix: string;
    /**The type of suffix used in the name of this ticket channel. */
    suffix: "user-name" | "user-nickname" | "user-id" | "random-number" | "random-hex" | "counter-dynamic" | "counter-fixed";
    /**An optional discord category id to create this ticket in. */
    category: string;
    /**The channel topic shown at the top of the channel in discord. */
    topic: string;
}

/**## ODOptionsJsonConfig_TicketOptionEmbedSettings `interface`
 * The message embed settings for ticket options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_TicketOptionEmbedSettings {
    /**Is this embed enabled? */
    enabled: boolean;
    /**The title of the embed. */
    title: string;
    /**The description of this embed. */
    description: string;
    /**A custom color for this embed. (The default bot color is used when empty) */
    customColor: discord.ColorResolvable | string;
    /**A URL to an image displayed in the embed. */
    image: string;
    /**A URL to a thumbnail displayed in the embed. */
    thumbnail: string;
    /**A list of fields displayed in the embed. */
    fields: {
        /**The name of this field. */
        name: string;
        /**The value of this field. => empty not allowed */
        value: string;
        inline: boolean;
    }[];
    /**Enable setting the timestamp of the embed to the current time. */
    timestamp: boolean;
}

/**## ODOptionsJsonConfig_TicketOptionPingSettings `interface`
 * The message ping settings for ticket options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_TicketOptionPingSettings {
    /**Ping `@here`. */
    "@here": boolean;
    /**Ping `@everyone`. */
    "@everyone": boolean;
    /**A list of custom discord role ids to ping. */
    custom: string[];
}

/**## ODOptionsJsonConfig_WebsiteOption `interface`
 * All properties for website options in the `options.jsonc` config!
 */
declare interface ODOptionsJsonConfig_WebsiteOption extends ODOptionsJsonConfig_BaseOption {
    type: "website";
    /**The URL this button will point to. */
    url: string;
}

/**## ODOptionSuffix `class`
 * This is an Open Ticket option suffix.
 *
 * This class can generate a suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare abstract class ODOptionSuffix extends api_2.ODManagerData {
    /**The option of this suffix. */
    option: ODTicketOption;
    constructor(id: api_2.ODValidId, option: ODTicketOption);
    /**Get the suffix for a new ticket. */
    abstract getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionSuffixManager `class`
 * This is an Open Ticket option suffix manager.
 *
 * This class manages all suffixes from option in the bot. The id of an option suffix is the same as the option id.
 *
 * All ticket options should have a corresponding option suffix class.
 */
declare class ODOptionSuffixManager extends api_2.ODManager<ODOptionSuffix> {
    constructor(debug: api_2.ODDebugger);
    /**Instantly get the suffix from an `ODTicketOption`. */
    getSuffixFromOption(option: ODTicketOption, user: discord.User, guild: discord.Guild): Promise<string | null>;
    private getMember;
}

/**## ODOptionUserIdSuffix `class`
 * This is an Open Ticket user-id option suffix.
 *
 * This class can generate a user-id suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionUserIdSuffix extends ODOptionSuffix {
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionUserNameSuffix `class`
 * This is an Open Ticket user-name option suffix.
 *
 * This class can generate a user-name suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionUserNameSuffix extends ODOptionSuffix {
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODOptionUserNicknameSuffix `class`
 * This is an Open Ticket user-nickname option suffix.
 *
 * This class can generate a user-nickname suffix for a discord channel name from a specific option.
 *
 * Use `getSuffix()` to get the new suffix!
 */
declare class ODOptionUserNicknameSuffix extends ODOptionSuffix {
    getSuffix(member: discord.GuildMember): Promise<string>;
}

/**## ODPanel `class`
 * This is an Open Ticket panel.
 *
 * This class contains all data related to this panel (parsed from the config).
 */
declare class ODPanel extends api_2.ODManager<ODPanelData<api_2.ODValidJsonType>> {
    /**The id of this panel. (from the config) */
    id: api_2.ODId;
    constructor(id: api_2.ODValidId, data: ODPanelData<api_2.ODValidJsonType>[]);
    /**Convert this panel to a JSON object for storing this panel in the database. */
    toJson(version: api_2.ODVersion): ODPanelJson;
    /**Create a panel from a JSON object in the database. */
    static fromJson(json: ODPanelJson): ODPanel;
    get<PanelId extends keyof api_2.ODNoGeneric<ODPanelIdMappings>>(id: PanelId): ODPanelIdMappings[PanelId];
    get(id: api_2.ODValidId): ODPanelData<api_2.ODValidJsonType> | null;
    remove<PanelId extends keyof api_2.ODNoGeneric<ODPanelIdMappings>>(id: PanelId): ODPanelIdMappings[PanelId];
    remove(id: api_2.ODValidId): ODPanelData<api_2.ODValidJsonType> | null;
    exists(id: keyof api_2.ODNoGeneric<ODPanelIdMappings>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODPanelData `class`
 * This is Open Ticket panel data.
 *
 * This class contains a single property for a panel. (string, number, boolean, object, array, null)
 *
 * When this property is edited, the database will be updated automatically.
 */
declare class ODPanelData<DataType extends api_2.ODValidJsonType> extends api_2.ODManagerData {
    /**The value of this property. */
    private rawValue;
    constructor(id: api_2.ODValidId, value: DataType);
    /**The value of this property. */
    set value(value: DataType);
    get value(): DataType;
    /**Refresh the database. Is only required to be used when updating `ODPanelData` with an object/array as value. */
    refreshDatabase(): void;
}

/**## ODPanelDataJson `interface`
 * The JSON representatation from a single panel property.
 */
declare interface ODPanelDataJson {
    /**The id of this property. */
    id: string;
    /**The value of this property. */
    value: api_2.ODValidJsonType;
}

/**## ODPanelIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPanel` class.
 */
declare type ODPanelIdConstraint = Record<string, ODPanelData<api_2.ODValidJsonType>>;

/**## ODPanelIdMappings `interface`
 * A list of all available IDs in the default `ODPanel` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPanelIdMappings extends ODPanelIdConstraint {
    "opendiscord:name": ODPanelData<string>;
    "opendiscord:options": ODPanelData<string[]>;
    "opendiscord:dropdown": ODPanelData<boolean>;
    "opendiscord:text": ODPanelData<string>;
    "opendiscord:embed": ODPanelData<ODPanelsJsonConfig_PanelEmbedSettings>;
    "opendiscord:dropdown-placeholder": ODPanelData<string>;
    "opendiscord:maximum-buttons-per-row": ODPanelData<number>;
    "opendiscord:enable-max-tickets-warning-text": ODPanelData<boolean>;
    "opendiscord:enable-max-tickets-warning-embed": ODPanelData<boolean>;
    "opendiscord:describe-options-layout": ODPanelData<"simple" | "normal" | "detailed">;
    "opendiscord:describe-options-custom-title": ODPanelData<string>;
    "opendiscord:describe-options-in-text": ODPanelData<boolean>;
    "opendiscord:describe-options-in-embed-fields": ODPanelData<boolean>;
    "opendiscord:describe-options-in-embed-description": ODPanelData<boolean>;
}

/**## ODPanelDataJson `interface`
 * The JSON representatation from a single panel.
 */
declare interface ODPanelJson {
    /**The id of this panel. */
    id: string;
    /**The version of Open Ticket used to create this panel. */
    version: string;
    /**The full list of properties/variables related to this panel. */
    data: ODPanelDataJson[];
}

/**## ODPanelManager `class`
 * This is an Open Ticket panel manager.
 *
 * This class manages all registered panels in the bot. Only panels which are available in this manager can be auto-updated.
 *
 * Panels are not stored in the database and will be parsed from the config every startup.
 */
declare class ODPanelManager extends api_2.ODManager<ODPanel> {
    constructor(debug: api_2.ODDebugger);
    add(data: ODPanel, overwrite?: boolean): boolean;
}

/**## ODPanelMessageState `class
 * A special class with state types for the Open Ticket panel message.
 */
declare class ODPanelMessageState extends api_2.ODState<{
    /**The method this message was generated with. */
    messageOrigin: "slash" | "text" | "sub-panel" | "auto-update" | "other";
    /**The Id of the panel associated with this message. */
    panelId: string;
    /**A list of options available in this panel. (buttons or dropdown) */
    panelOptionIds: string[];
    /**Should this panel be auto-updated on restart? */
    panelAutoUpdate: boolean;
    /**Is this panel a sub-panel? */
    isSubPanel: boolean;
}, false, false> {
    constructor(id: api_2.ODValidId, client: api_2.ODClientManager, database: api_2.ODDatabase);
}

/**## ODPanelsJsonCommentsConfig `class
 * A special class with types for the Open Ticket `config/panels.jsonc` config file
 */
declare class ODPanelsJsonCommentsConfig extends api_2.ODJsonCommentsConfig<ODPanelsJsonConfig_PanelsData> {
}

/**## ODPanelsJsonConfig_Panel `interface`
 * This interface is an object which has all properties for panels in the `panels.jsonc` config!
 */
declare interface ODPanelsJsonConfig_Panel {
    /**The id of this panel. */
    id: string;
    /**The name of this panel. */
    name: string;
    /**When enabled, the panel uses a dropdown instead of buttons. */
    dropdown: boolean;
    /**A list of valid options ids from the `options.jsonc` config. */
    options: string[];
    /**The raw text contents of this panel. (empty for embed only) */
    text: string;
    /**The embed of this panel. */
    embed: ODPanelsJsonConfig_PanelEmbedSettings;
    /**A collection of additional settings for extra customisation in a panel. */
    settings: ODPanelsJsonConfig_PanelSettings;
}

/**## ODPanelsJsonConfig_PanelEmbedSettings `interface`
 * This interface is an object which has all message embed settings for panels in the `panels.jsonc` config!
 */
declare interface ODPanelsJsonConfig_PanelEmbedSettings {
    /**Is this embed enabled? */
    enabled: boolean;
    /**The title of the embed. */
    title: string;
    /**The description of this embed. */
    description: string;
    /**A custom color for this embed. (The default bot color is used when empty) */
    customColor: discord.ColorResolvable | string;
    /**An optional URL used in the title of the embed. */
    url: string;
    /**A URL to an image displayed in the embed. */
    image: string;
    /**A URL to a thumbnail displayed in the embed. */
    thumbnail: string;
    /**The footer of this embed. */
    footer: string;
    /**A list of fields displayed in the embed. (except when using "describeOptionsInEmbedFields") */
    fields: {
        /**The name of this field. */
        name: string;
        /**The value of this field. => empty not allowed */
        value: string;
        inline: boolean;
    }[];
    /**Enable setting the timestamp of the embed to the current time. */
    timestamp: boolean;
}

/**## ODPanelsJsonConfig_PanelsData `type`
 * All contents of the `panels.jsonc` config file.
 */
declare type ODPanelsJsonConfig_PanelsData = ODPanelsJsonConfig_Panel[];

/**## ODPanelsJsonConfig_PanelSettings `interface`
 * This interface is a collection of additional settings for extra customisation in a panel.
 */
declare interface ODPanelsJsonConfig_PanelSettings {
    /**The placeholder used in the dropdown when enabled. */
    dropdownPlaceholder: string;
    /**The maximum amount of option buttons before starting a new row. */
    maximumButtonsPerRow: number;
    /**Enable a max tickets warning in the text contents. */
    enableMaxTicketsWarningInText: boolean;
    /**Enable a max tickets warning in the embed. */
    enableMaxTicketsWarningInEmbed: boolean;
    /**The layout/complexity of the describe options feature. */
    describeOptionsLayout: "simple" | "normal" | "detailed";
    /**A custom title for the describe options feature. */
    describeOptionsCustomTitle: string;
    /**Describe the options in the text contents. */
    describeOptionsInText: boolean;
    /**Describe the options in the embed fields. */
    describeOptionsInEmbedFields: boolean;
    /**Describe the options in the embed description. */
    describeOptionsInEmbedDescription: boolean;
}

/**## ODParagraphInputComponent `class`
 * A paragraph text input component for modals.
 * It must be placed inside an `ODLabelComponent`.
 */
declare class ODParagraphInputComponent extends ODComponent<ODParagraphInputComponentData, discord.TextInputBuilder> {
    constructor(id: ODValidId, data: Partial<ODParagraphInputComponentData>);
    build(): Promise<discord.TextInputBuilder>;
    /**Set the custom id of this modal text input. */
    setCustomId(id: string | null): this;
    /**Set the minimum amount of characters of this modal text input. */
    setMinLength(length: number | null): this;
    /**Set the maximum amount of characters of this modal text input. */
    setMaxLength(length: number | null): this;
    /**Set the placeholder of this modal text input. */
    setPlaceholder(placeholder: string | null): this;
    /**Set the initial value of this modal text input. */
    setInitialValue(initialValue: string | null): this;
    /**Mark this modal text input as required. */
    setRequired(required: boolean): this;
}

/**## ODParagraphInputComponentData `type`
 * The configurable settings/options for the `ODParagraphInputComponent`.
 */
declare interface ODParagraphInputComponentData {
    /**The custom id of this modal text input. */
    customId?: string;
    /**The min length of this modal text input. */
    minLength?: number;
    /**The max length of this modal text input. */
    maxLength?: number;
    /**Is this modal text input required? */
    required: boolean;
    /**The placeholder of this modal text input. */
    placeholder?: string;
    /**The initial value of this modal text input. */
    initialValue?: string;
}

/**## ODParagraphQuestion `class`
 * An Open Ticket paragraph question. It contains all config properties of the paragraph question type.
 */
declare class ODParagraphQuestion extends ODQuestion<ODParagraphQuestionIdMappings> {
    readonly type: "opendiscord:paragraph";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODParagraphQuestion;
}

/**## ODParagraphQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODParagraphQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODParagraphQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:placeholder": ODQuestionData<string>;
    "opendiscord:length-enabled": ODQuestionData<boolean>;
    "opendiscord:length-min": ODQuestionData<number>;
    "opendiscord:length-max": ODQuestionData<number>;
}

/**## ODParentComponent `class`
 * An Open Discord message/modal component with a single child.
 *
 * This class itself doesn't do anything, but is a blueprint for other
 * `ODParentComponent` classes which represent the new Discord message/modal components.
 */
declare abstract class ODParentComponent<Data extends object, ChildComponent extends ODComponent<object, any>, BuildResult> extends ODComponent<Data, BuildResult> {
    /**The child component of this parent. */
    private rawChild;
    /**The child component of this parent. */
    get child(): ChildComponent | null;
    /**Set the child component of this parent. */
    setComponent(c: ChildComponent | null): ChildComponent | null;
}

/**## ODParticipantsStatisticScope `class
 * A special class with types for the Open Ticket `Participants` statistics category/scope.
 */
declare class ODParticipantsStatisticScope extends api_2.ODStatisticScope<ODParticipantsStatisticScopeIdMappings> {
}

/**## ODParticipantsStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODParticipantsStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODParticipantsStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:participants": api_2.ODDynamicStatistic;
}

/**## ODPermission `class`
 * This is an Open Discord permission.
 *
 * It defines a single permission level for a specific scope (global/channel & user/role)
 * These permissions only apply to commands & interactions.
 * They are not related to channel permissions in the ticket system.
 *
 * Register this class to an `ODPermissionManager` to use it!
 */
declare class ODPermission extends ODManagerData {
    /**The scope of this permission. */
    readonly scope: ODPermissionScope;
    /**The type/level of this permission. */
    readonly permission: ODPermissionType;
    /**The user/role of this permission. */
    readonly value: discord.Role | discord.User;
    /**The channel that this permission applies to. (`null` when global) */
    readonly channel: discord.Channel | null;
    constructor(id: ODValidId, scope: "global-user", permission: ODPermissionType, value: discord.User);
    constructor(id: ODValidId, scope: "global-role", permission: ODPermissionType, value: discord.Role);
    constructor(id: ODValidId, scope: "channel-user", permission: ODPermissionType, value: discord.User, channel: discord.Channel);
    constructor(id: ODValidId, scope: "channel-role", permission: ODPermissionType, value: discord.Role, channel: discord.Channel);
}

/**## ODPermissionCalculationCallback `type`
 * The callback of the permission calculation. (Used in `ODPermissionManager`)
 */
declare type ODPermissionCalculationCallback = (user: discord.User, channel?: discord.Channel | null, guild?: discord.Guild | null, settings?: ODPermissionSettings | null) => Promise<ODPermissionResult>;

/**## ODPermissionCommandResult `type`
 * The result of calculating permissions for a command.
 */
declare type ODPermissionCommandResult = {
    /**Returns `true` when the user has valid permissions. */
    hasPerms: false;
    reason: "no-perms" | "disabled" | "not-in-server";
} | {
    /**Returns `true` when the user has valid permissions. */
    hasPerms: true;
    /**Is the user a server admin or a normal member? This does not decide if the user has permissions or not. */
    isAdmin: boolean;
};

/**## ODPermissionEmbedType `type`
 * A collection of all types available in the `opendiscord:no-permissions` embed.
 */
declare type ODPermissionEmbedType = ("developer" | "owner" | "admin" | "moderator" | "support" | "member" | "discord-administrator");

/**## ODPermissionLevel `enum`
 * All available permission types/levels. But as `enum` instead of `type`. Used to calculate the level.
 */
declare enum ODPermissionLevel {
    /**A normal member. (Default for everyone) */
    member = 0,
    /**Support team. Higher than a normal member. (Used for ticket-admins) */
    support = 1,
    /**Moderator. Higher than the support team. (Unused) */
    moderator = 2,
    /**Admin. Higher than a moderator. (Used for global-admins) */
    admin = 3,
    /**Server owner. (Able to use all commands including `/stats reset`) */
    owner = 4,
    /**Bot owner or all users from dev team. (Able to use all commands including `/stats reset`) */
    developer = 5
}

/**## ODPermissionManager `class`
 * This is an Open Discord permission manager.
 *
 * It manages all permissions in the bot!
 * Use the `getPermissions()` and `hasPermissions()` methods to get user perms.
 *
 * Add new permissions using the `ODPermission` class in your plugin!
 */
declare class ODPermissionManager<IdList extends ODPermissionManagerIdConstraint = ODPermissionManagerIdConstraint> extends ODManager<ODPermission> {
    /**The function for calculating permissions in this manager. */
    private calculation;
    /**An alias to the Open Discord client manager. */
    private client;
    /**The result which is returned when no other permissions match. (`member` by default) */
    defaultResult: ODPermissionResult;
    constructor(debug: ODDebugger, client: ODClientManager, useDefaultCalculation?: boolean);
    /**Edit the permission calculation function in this manager. */
    setCalculation(calculation: ODPermissionCalculationCallback): void;
    /**Edit the result which is returned when no other permissions match. (`member` by default) */
    setDefaultResult(result: ODPermissionResult): void;
    /**Get an `ODPermissionResult` based on a few context factors. Use `hasPermissions()` to simplify the result. */
    getPermissions(user: discord.User, channel?: discord.Channel | null, guild?: discord.Guild | null, settings?: ODPermissionSettings | null): Promise<ODPermissionResult>;
    /**Simplifies the `ODPermissionResult` returned from `getPermissions()` and returns a boolean to check if the user matches the required permissions. */
    hasPermissions(minimum: ODPermissionType, data: ODPermissionResult): boolean;
    /**Check for permissions. (default calculation) */
    private defaultCalculation;
    /**Check for global permissions. Result will be compared with the channel perms in `#defaultCalculation()`. */
    private defaultGlobalCalculation;
    /**Check for channel permissions. Result will be compared with the global perms in `#defaultCalculation()`. */
    private defaultChannelCalculation;
    /**Check the permissions for a certain command of the bot. Permission mode: `none`, `everyone`, `admin` or any valid discord role ID. */
    checkCommandPerms(permissionMode: string, requiredLevel: ODPermissionType, user: discord.User, member?: discord.GuildMember | null, channel?: discord.Channel | null, guild?: discord.Guild | null, settings?: ODPermissionSettings): Promise<ODPermissionCommandResult>;
    get<PermissionId extends keyof ODNoGeneric<IdList>>(id: PermissionId): IdList[PermissionId];
    get(id: ODValidId): ODPermission | null;
    remove<PermissionId extends keyof ODNoGeneric<IdList>>(id: PermissionId): IdList[PermissionId];
    remove(id: ODValidId): ODPermission | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODPermissionManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPermissionManager` class.
 */
declare type ODPermissionManagerIdConstraint = Record<string, ODPermission>;

/**## ODPermissionManagerIdMappings `interface`
 * A list of all available IDs in the default `ODPermissionManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPermissionManagerIdMappings extends api_2.ODPermissionManagerIdConstraint {
}

/**## ODPermissionResult `interface`
 * The result returned by `ODPermissionManager.getPermissions()`.
 */
declare interface ODPermissionResult {
    /**The permission type. */
    type: ODPermissionType;
    /**The permission scope. */
    scope: ODPermissionScope | "default";
    /**The highest level available for this scope. */
    level: ODPermissionLevel;
    /**The permission which returned this level. */
    source: ODPermission | null;
}

/**## ODPermissionScope `type`
 * The scope in which a certain permission is active.
 */
declare type ODPermissionScope = "global-user" | "channel-user" | "global-role" | "channel-role";

/**## ODPermissionSettings `interface`
 * Optional settings for the `getPermissions()` method in the `ODPermissionManager`.
 */
declare interface ODPermissionSettings {
    /**Include permissions from the global user scope. */
    allowGlobalUserScope?: boolean;
    /**Include permissions from the global role scope. */
    allowGlobalRoleScope?: boolean;
    /**Include permissions from the channel user scope. */
    allowChannelUserScope?: boolean;
    /**Include permissions from the channel role scope. */
    allowChannelRoleScope?: boolean;
    /**Only include permissions of which the id matches this regex. */
    idRegex?: RegExp;
}

/**## ODPermissionType `type`
 * All available permission types/levels. Can be used in the `ODPermission` class.
 */
declare type ODPermissionType = "member" | "support" | "moderator" | "admin" | "owner" | "developer";

/**## ODPlugin `class`
 * This is an Open Discord plugin.
 *
 * It represents a single plugin in the `./plugins/` directory.
 * All plugins are accessible via the `opendiscord.plugins` global.
 *
 * Don't re-execute plugins which are already enabled! It might break the bot or plugin.
 */
declare class ODPlugin extends ODManagerData {
    /**The name of the directory of this plugin. (same as id) */
    dir: string;
    /**All plugin data found in the `plugin.json` file. */
    data: ODPluginData;
    /**The name of this plugin. */
    name: string;
    /**The priority of this plugin. */
    priority: number;
    /**The version of this plugin. */
    version: ODVersion;
    /**The additional details of this plugin. */
    details: ODPluginDetails;
    /**Is this plugin enabled? */
    enabled: boolean;
    /**Did this plugin execute successfully?. */
    executed: boolean;
    /**Did this plugin crash? (A reason is available in the `crashReason`) */
    crashed: boolean;
    /**The reason which caused this plugin to crash. */
    crashReason: null | "incompatible.plugin" | "missing.plugin" | "missing.dependency" | "incompatible.version" | "executed";
    constructor(dir: string, jsondata: ODPluginData);
    /**Get the startfile location relative to the `./plugins/` directory. (`./dist/plugins/`) when compiled) */
    getStartFile(): string;
    /**Execute this plugin. Returns `false` on crash. */
    execute(debug: ODDebugger, force?: boolean): Promise<boolean>;
    /**Check if a npm dependency exists. */
    checkDependency(id: string): boolean;
    /**Get a list of all missing npm dependencies that are required for this plugin. */
    dependenciesInstalled(): string[];
    /**Get a list of all missing plugins that are required for this plugin. */
    pluginsInstalled(manager: ODPluginManager): string[];
    /**Get a list of all enabled incompatible plugins that interfere with this plugin. */
    pluginsIncompatible(manager: ODPluginManager): string[];
    /**Get a list of all authors & contributors of this plugin. */
    getAuthors(): string[];
}

/**## ODPluginClassManager `class`
 * This is an Open Discord plugin class manager.
 *
 * It manages all managers registered by plugins!
 * Plugins are able to register their own managers, handlers, functions, classes, ... here.
 * By doing this, other plugins are also able to make use of it.
 * This can be useful for plugins that want to extend other plugins.
 *
 * Use `isPluginLoaded()` to check if a plugin has been loaded before trying to access the manager.
 */
declare class ODPluginClassManager<IdList extends ODPluginClassManagerIdConstraint = ODPluginClassManagerIdConstraint> extends ODManager<ODManagerData> {
    constructor(debug: ODDebugger);
    get<PluginClassId extends keyof ODNoGeneric<IdList>>(id: PluginClassId): IdList[PluginClassId];
    get(id: ODValidId): ODManagerData | null;
    remove<PluginClassId extends keyof ODNoGeneric<IdList>>(id: PluginClassId): IdList[PluginClassId];
    remove(id: ODValidId): ODManagerData | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODPluginClassManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPluginClassManager` class.
 */
declare type ODPluginClassManagerIdConstraint = Record<string, ODManagerData>;

/**## ODPluginClassManagerIdMappings `interface`
 * A list of all available IDs in the default `ODPluginClassManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPluginClassManagerIdMappings extends api_2.ODPluginClassManagerIdConstraint {
}

/**## ODPluginConsoleMessage `class`
 * This is an Open Discord console plugin message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "PLUGIN" messages!
 */
declare class ODPluginConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODPluginData `interface`
 * Parsed data from the `plugin.json` file in a plugin.
 */
declare interface ODPluginData {
    /**The name of this plugin (shown on startup) */
    name: string;
    /**The id of this plugin. (Must be identical to directory name) */
    id: string;
    /**The version of this plugin. */
    version: string;
    /**The location of the start file of the plugin relative to the rootDir of the plugin */
    startFile: string;
    /**A list of compatible versions. (e.g. `["OTv4.0.x", "OMv1.x.x"]`) (optional, will be required in future version)
     * - `OT` --> Open Ticket support
     * - `OM` --> Open Moderation support
     */
    supportedVersions?: string[];
    /**Is this plugin enabled? */
    enabled: boolean;
    /**The priority of this plugin. Higher priority will load before lower priority. */
    priority: number;
    /**A list of events to register to the `opendiscord.events` global before loading any plugins. This way, plugins with a higher priority are able to use events from this plugin as well! */
    events: string[];
    /**Npm dependencies which are required for this plugin to work. */
    npmDependencies: string[];
    /**Plugins which are required for this plugin to work. */
    requiredPlugins: string[];
    /**Plugins which are incompatible with this plugin. */
    incompatiblePlugins: string[];
    /**Additional details about this plugin. */
    details: ODPluginDetails;
}

/**## ODPluginDetails `interface`
 * Additional details in the `plugin.json` file from a plugin.
 */
declare interface ODPluginDetails {
    /**The main author of the plugin. Additional contributors can be specified in `contributors`. */
    author: string;
    /**A list of plugin contributors. (optional, will be required in future version) */
    contributors?: string[];
    /**A short description of this plugin. */
    shortDescription: string;
    /**A large description of this plugin. */
    longDescription: string;
    /**A URL to a cover image of this plugin. (currently unused) */
    imageUrl: string;
    /**A URL to the website/project page of this plugin. (currently unused) */
    projectUrl: string;
    /**A list of tags/categories that this plugin affects. */
    tags: string[];
}

/**## ODPluginError `class`
 * A wrapper for the node.js `Error` class that makes the error look better in the console!
 *
 * This wrapper is made for Open Discord plugin errors! **It can only be used by plugins!**
 */
declare class ODPluginError extends Error {
    /**This variable gets detected by the error handling system to know how to render it */
    readonly _ODErrorType = "plugin";
    /**Create an `ODPluginError` directly from an `Error` class */
    static fromError(err: Error): ODPluginError;
}

/**## ODPluginManager `class`
 * This is an Open Discord plugin manager.
 *
 * It manages all active plugins in the bot!
 * It also contains all "plugin classes" which are managers registered by plugins.
 * These are accessible via the `opendiscord.plugins.classes` global.
 *
 * Use `isPluginLoaded()` to check if a plugin has been loaded.
 */
declare class ODPluginManager<IdList extends ODPluginManagerIdConstraint = ODPluginManagerIdConstraint, PluginClassIdList extends ODPluginClassManagerIdConstraint = ODPluginClassManagerIdConstraint> extends ODManager<ODPlugin> {
    /**A manager for all custom managers registered by plugins. */
    classes: ODPluginClassManager<PluginClassIdList>;
    /**A list of basic details from all plugins that crashed while loading the `plugin.json` file. */
    unknownCrashedPlugins: ODUnknownCrashedPlugin[];
    constructor(debug: ODDebugger);
    /**Check if a plugin has been loaded successfully and is available for usage.*/
    isPluginLoaded(id: ODValidId): boolean;
    get<PluginId extends keyof ODNoGeneric<IdList>>(id: PluginId): IdList[PluginId];
    get(id: ODValidId): ODPlugin | null;
    remove<PluginId extends keyof ODNoGeneric<IdList>>(id: PluginId): IdList[PluginId];
    remove(id: ODValidId): ODPlugin | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODPluginManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPluginManager` class.
 */
declare type ODPluginManagerIdConstraint = Record<string, ODPlugin>;

/**## ODPluginManagerIdMappings `interface`
 * A list of all available IDs in the default `ODPluginManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPluginManagerIdMappings extends api_2.ODPluginManagerIdConstraint {
}

/**## ODPollComponent `class`
 * A poll component which adds a poll to a message without `Components V2` enabled. (Old behaviour)
 */
declare class ODPollComponent extends ODComponent<ODPollComponentData, discord.PollData> {
    constructor(id: ODValidId, data: Partial<ODPollComponentData>);
    build(): Promise<{
        layoutType: discord.PollLayoutType;
        allowMultiselect: boolean;
        duration: number;
        question: {
            text: string;
        };
        answers: discord.PollAnswerData[];
    }>;
    /**Set the poll question. */
    setQuestion(question: string): this;
    /**Set the poll duration in hours. */
    setDurationHours(duration: number): this;
    /**Allow selecting multiple answers. */
    setMultiSelect(multi: boolean): this;
    /**Set the poll answers. */
    setAnswers(answers: discord.PollAnswerData[]): this;
    /**Add additional poll answers. */
    addAnswers(...answers: discord.PollAnswerData[]): this;
}

/**## ODPollComponentData `type`
 * The configurable settings/options for the `ODPollComponent`.
 */
declare interface ODPollComponentData {
    /**The poll question. */
    question: string;
    /**The duration of the poll in hours. */
    durationHours: number;
    /**Available poll answers. */
    answers: discord.PollAnswerData[];
    /**Allow selecting multiple answers. */
    allowMultiSelect: boolean;
}

/**## ODPost `class`
 * This is an Open Discord post class.
 *
 * A post is just a shortcut to a static discord channel or category.
 * This can be used to get a specific channel over and over again!
 *
 * This class also contains utilities for sending messages via the Open Discord builders.
 */
declare class ODPost<ChannelType extends discord.GuildBasedChannel> extends ODManagerData {
    /**A reference to the main server of the bot */
    protected guild: discord.Guild | null;
    /**Is this post already initialized? */
    ready: boolean;
    /**The discord.js channel */
    channel: ChannelType | null;
    /**The discord channel id */
    channelId: string;
    constructor(id: ODValidId, channelId: string);
    /**Use a specific guild in this class for fetching the channel*/
    useGuild(guild: discord.Guild | null): void;
    /**Change the channel id to another channel! */
    setChannelId(id: string): void;
    /**Initialize the discord.js channel of this post. */
    init(): Promise<null | undefined>;
    /**Send a message to this channel using the Open Discord builder system */
    send(build: ODMessageBuildResult | ODMessageComponentBuildResult): Promise<ODResponderSendResult<true>>;
    /**Get the final `messageCreateOptions` from a returned build result from builders/components. */
    protected getMessageFromBuildResult(build: ODMessageBuildResult | ODMessageComponentBuildResult, type: "interaction" | "message"): discord.MessageCreateOptions & {
        flags: number[];
    };
}

/**## ODPostManager `class`
 * This is an Open Discord post manager.
 *
 * It manages `ODPosts`'s for you.
 *
 * You can use this to get the logs channel of the bot (or some other static channel/category).
 */
declare class ODPostManager<IdList extends ODPostManagerIdConstraint = ODPostManagerIdConstraint> extends ODManager<ODPost<discord.GuildBasedChannel>> {
    /**A reference to the main server of the bot */
    protected guild: discord.Guild | null;
    constructor(debug: ODDebugger);
    add(data: ODPost<discord.GuildBasedChannel>, overwrite?: boolean): boolean;
    /**Initialize the post manager & all posts. */
    init(guild: discord.Guild): Promise<void>;
    get<PostId extends keyof ODNoGeneric<IdList>>(id: PostId): IdList[PostId];
    get(id: ODValidId): ODPost<discord.GuildBasedChannel> | null;
    remove<PostId extends keyof ODNoGeneric<IdList>>(id: PostId): IdList[PostId];
    remove(id: ODValidId): ODPost<discord.GuildBasedChannel> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODPostManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPostManager` class.
 */
declare type ODPostManagerIdConstraint = Record<string, ODPost<discord.GuildBasedChannel> | null>;

/**## ODPostManagerIdMappings `interface`
 * A list of all available IDs in the default `ODPostManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPostManagerIdMappings extends api_2.ODPostManagerIdConstraint {
    "opendiscord:logs": api_2.ODPost<discord.GuildTextBasedChannel> | null;
    "opendiscord:transcripts": api_2.ODPost<discord.GuildTextBasedChannel> | null;
}

/**## ODPriorityLevel `class`
 * This is an Open Ticket priority level.
 *
 * Using this class, you can register or edit a priority level for the ticket priority system.
 *
 * Priority levels should be registered in `opendiscord.priorities`.
 *
 * #### 🚨 Negative priorities are treated as `disabled/no-priority`!
 */
declare class ODPriorityLevel extends api_2.ODManagerData {
    /**The priority level itself. A negative number (e.g. `-1`) is treated as `disabled/no-priority`. */
    priority: number;
    /**The raw name of the level (used in text/slash command inputs). */
    rawName: string;
    /**The display name of the level (used in embeds & messages). */
    displayName: string;
    /**The display emoji of the level (used in embeds & messages). */
    displayEmoji: string | null;
    /**The emoji added to the channel name when the level is applied to a ticket. */
    channelEmoji: string | null;
    constructor(id: api_2.ODValidId, priority: number, rawName: string, displayName: string, displayEmoji: string | null, channelEmoji: string | null);
    /**Get the display name + emoji for rendering this priority in the UI/embeds. */
    renderDisplayName(): string;
}

/**## ODPriorityManager `class`
 * This is an Open Ticket priority manager.
 *
 * This class manages all registered priority levels in the bot.
 *
 * Priorities levels can be changed/updated/translated by plugins to allow for more customisability.
 */
declare class ODPriorityManager<IdList extends ODPriorityManagerIdConstraint = ODPriorityManagerIdConstraint> extends api_2.ODManager<ODPriorityLevel> {
    constructor(debug: api_2.ODDebugger);
    /**Get an `ODPriorityLevel` from the priority level value. Returns a dummy value when the level doesn't exist. */
    getFromPriorityLevel(level: number): ODPriorityLevel;
    /**List the available priority levels. */
    listAvailableLevels(): number[];
    get<PriorityId extends keyof api_2.ODNoGeneric<IdList>>(id: PriorityId): IdList[PriorityId];
    get(id: api_2.ODValidId): ODPriorityLevel | null;
    remove<PriorityId extends keyof api_2.ODNoGeneric<IdList>>(id: PriorityId): IdList[PriorityId];
    remove(id: api_2.ODValidId): ODPriorityLevel | null;
    exists(id: keyof api_2.ODNoGeneric<IdList>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODPriorityManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODPriorityManager` class.
 */
declare type ODPriorityManagerIdConstraint = Record<string, ODPriorityLevel>;

/**## ODPriorityManagerIdMappings `interface`
 * A list of all available IDs in the default `ODPriorityManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODPriorityManagerIdMappings extends ODPriorityManagerIdConstraint {
    "opendiscord:urgent": ODPriorityLevel;
    "opendiscord:very-high": ODPriorityLevel;
    "opendiscord:high": ODPriorityLevel;
    "opendiscord:normal": ODPriorityLevel;
    "opendiscord:low": ODPriorityLevel;
    "opendiscord:very-low": ODPriorityLevel;
    "opendiscord:none": ODPriorityLevel;
}

/**## ODProgressBar `class`
 * This is an Open Discord console progress bar.
 *
 * It is used to create a simple or advanced progress bar in the console of the bot.
 * These progress bars are not visible in the `debug.txt` file and should only be used as extra visuals.
 *
 * Use other classes as existing templates or create your own progress bar from scratch using this class.
 */
declare abstract class ODProgressBar extends ODManagerData {
    /**The renderer of this progress bar. */
    renderer: ODProgressBarRenderer<{}>;
    /**Is this progress bar currently active? */
    protected active: boolean;
    /**A list of listeners when the progress bar stops. */
    protected stopListeners: Function[];
    /**The current value of the progress bar. */
    protected value: number;
    /**The minimum value of the progress bar. */
    min: number;
    /**The maximum value of the progress bar. */
    max: number;
    /**The initial value of the progress bar. */
    initialValue: number;
    /**The prefix displayed in the progress bar. */
    prefix: string | null;
    /**The prefix displayed in the progress bar. */
    suffix: string | null;
    /**Enable automatic stopping when reaching `min` or `max`. */
    autoStop: null | "min" | "max";
    constructor(id: ODValidId, renderer: ODProgressBarRenderer<{}>, min: number, max: number, value: number, autoStop: null | "min" | "max", prefix: string | null, suffix: string | null);
    /**Parse a value in such a way that it doesn't go below/above the min/max limits. */
    private parseValue;
    /**Render progress bar to the console. */
    private renderStdout;
    /**Start showing this progress bar in the console. */
    start(): boolean;
    /**Update this progress bar while active. (will automatically update the progress bar in the console) */
    protected update(value: number, stop?: boolean): boolean;
    /**Wait for the progress bar to finish. */
    finished(): Promise<void>;
}

/**## ODProgressBarManager `class`
 * This is an Open Discord progress bar manager.
 *
 * It is responsible for managing all console progress bars in Open Discord. An example of this is the slash command registration progress bar.
 *
 * There are many types of progress bars available, but you can also create your own!
 */
declare class ODProgressBarManager<IdList extends ODProgressBarManagerIdConstraint = ODProgressBarManagerIdConstraint, RendererIdList extends ODProgressBarRendererManagerIdConstraint = ODProgressBarRendererManagerIdConstraint> extends ODManager<ODProgressBar> {
    /**A collection of render types for progress bars. */
    renderers: ODProgressBarRendererManager<RendererIdList>;
    constructor(debug: ODDebugger);
    get<ProgressBarId extends keyof ODNoGeneric<IdList>>(id: ProgressBarId): IdList[ProgressBarId];
    get(id: ODValidId): ODProgressBar | null;
    remove<ProgressBarId extends keyof ODNoGeneric<IdList>>(id: ProgressBarId): IdList[ProgressBarId];
    remove(id: ODValidId): ODProgressBar | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODProgressBarManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODProgressBarManager` class.
 */
declare type ODProgressBarManagerIdConstraint = Record<string, ODProgressBar>;

/**## ODProgressBarManagerIdMappings `interface`
 * A list of all available IDs in the default `ODProgressBarManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODProgressBarManagerIdMappings extends api_2.ODProgressBarManagerIdConstraint {
    "opendiscord:slash-command-remove": api_2.ODManualProgressBar;
    "opendiscord:slash-command-create": api_2.ODManualProgressBar;
    "opendiscord:slash-command-update": api_2.ODManualProgressBar;
    "opendiscord:context-menu-remove": api_2.ODManualProgressBar;
    "opendiscord:context-menu-create": api_2.ODManualProgressBar;
    "opendiscord:context-menu-update": api_2.ODManualProgressBar;
}

/**## ODProgressBarRenderer `class`
 * This is an Open Discord console progress bar renderer.
 *
 * It is used to render a progress bar in the console of the bot.
 *
 * There are already a lot of default options available if you just want an easy progress bar!
 */
declare class ODProgressBarRenderer<Settings extends {}> extends ODManagerData {
    settings: Settings;
    private renderFunction;
    constructor(id: ODValidId, renderFunction: ODProgressBarRenderFunc<Settings>, settings: Settings);
    /**Render a progress bar using this renderer. */
    render(min: number, max: number, value: number, prefix: string | null, suffix: string | null): string;
    /**Create a clone of this progress bar renderer, but with additional settings. */
    withAdditionalSettings(settings: Partial<Settings>): ODProgressBarRenderer<Settings>;
}

/**## ODProgressBarRendererManager `class`
 * This is an Open Discord progress bar renderer manager.
 *
 * It is responsible for managing all console progress bar renderers in Open Discord.
 *
 * A renderer is a function which will try to visualize the progress bar in the console.
 */
declare class ODProgressBarRendererManager<IdList extends ODProgressBarRendererManagerIdConstraint = ODProgressBarRendererManagerIdConstraint> extends ODManager<ODProgressBarRenderer<{}>> {
    constructor(debug: ODDebugger);
    get<RendererId extends keyof ODNoGeneric<IdList>>(id: RendererId): IdList[RendererId];
    get(id: ODValidId): ODProgressBarRenderer<{}> | null;
    remove<RendererId extends keyof ODNoGeneric<IdList>>(id: RendererId): IdList[RendererId];
    remove(id: ODValidId): ODProgressBarRenderer<{}> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODProgressBarRendererManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODProgressBarRendererManager` class.
 */
declare type ODProgressBarRendererManagerIdConstraint = Record<string, ODProgressBarRenderer<{}>>;

/**## ODProgressBarRendererManagerIdMappings `interface`
 * A list of all available IDs in the default `ODProgressBarRendererManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODProgressBarRendererManagerIdMappings extends api_2.ODProgressBarRendererManagerIdConstraint {
    "opendiscord:value-renderer": api_2.ODDefaultProgressBarRenderer;
    "opendiscord:fraction-renderer": api_2.ODDefaultProgressBarRenderer;
    "opendiscord:percentage-renderer": api_2.ODDefaultProgressBarRenderer;
    "opendiscord:time-ms-renderer": api_2.ODDefaultProgressBarRenderer;
    "opendiscord:time-sec-renderer": api_2.ODDefaultProgressBarRenderer;
    "opendiscord:time-min-renderer": api_2.ODDefaultProgressBarRenderer;
}

/**## ODProgressBarRenderFunc `type`
 * This is the render function for an Open Discord console progress bar.
 */
declare type ODProgressBarRenderFunc<Settings extends {}> = (settings: Settings, min: number, max: number, value: number, prefix: string | null, suffix: string | null) => string;

/**## ODProjectType `type`
 * Valid project types for using Open Discord.
 */
declare type ODProjectType = "openticket" | "openmoderation";

/**## ODPromiseVoid `type`
 * This is a simple type to represent a callback return value that could be a promise or not.
 */
declare type ODPromiseVoid = void | Promise<void>;

/**## ODQuestion `class`
 * This is an Open Ticket question.
 *
 * This class contains all question data parsed from the config.
 *
 * This is an abstract class. Use instances like `ODShortQuestion` or `ODParagraphQuestion` instead.
 */
declare abstract class ODQuestion<IdList extends ODQuestionIdConstraint = ODQuestionIdConstraint> extends api_2.ODManager<ODQuestionData<api_2.ODValidJsonType>> {
    /**The id of this question. (from the config) */
    id: api_2.ODId;
    /**The type of this question (e.g. `opendiscord:short` or `opendiscord:paragraph`) */
    abstract readonly type: string;
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    /**Convert this question to a JSON object for storing this question in the database. */
    toJson(version: api_2.ODVersion): ODQuestionJson;
    get<QuestionId extends keyof api_2.ODNoGeneric<IdList>>(id: QuestionId): IdList[QuestionId];
    get(id: api_2.ODValidId): ODQuestionData<api_2.ODValidJsonType> | null;
    remove<QuestionId extends keyof api_2.ODNoGeneric<IdList>>(id: QuestionId): IdList[QuestionId];
    remove(id: api_2.ODValidId): ODQuestionData<api_2.ODValidJsonType> | null;
    exists(id: keyof api_2.ODNoGeneric<IdList>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODQuestionAnswer `type`
 * A question answer stored in the database.
 */
declare type ODQuestionAnswer = {
    id: string;
    name: string;
    type: Exclude<ODQuestionsJsonConfig_BaseQuestion["type"], "text-display" | "file-upload">;
    value: string | null;
} | {
    id: string;
    name: string;
    type: "file-upload";
    files: {
        id: string;
        url: string;
        name: string;
        title: string | null;
        description: string | null;
        contentType: string | null;
    }[];
};

/**## ODQuestionData `class`
 * This is Open Ticket question data.
 *
 * This class contains a single property for a question. (string, number, boolean, object, array, null)
 *
 * When this property is edited, the database will be updated automatically.
 */
declare class ODQuestionData<DataType extends api_2.ODValidJsonType> extends api_2.ODManagerData {
    /**The value of this property. */
    private rawValue;
    constructor(id: api_2.ODValidId, value: DataType);
    /**The value of this property. */
    set value(value: DataType);
    get value(): DataType;
    /**Refresh the database. Is only required to be used when updating `ODQuestionData` with an object/array as value. */
    refreshDatabase(): void;
}

/**## ODQuestionDataJson `interface`
 * The JSON representatation from a single question property.
 */
declare interface ODQuestionDataJson {
    /**The id of this property. */
    id: string;
    /**The value of this property. */
    value: api_2.ODValidJsonType;
}

/**## ODQuestionIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODQuestion` class.
 */
declare type ODQuestionIdConstraint = Record<string, ODQuestionData<api_2.ODValidJsonType>>;

/**## ODQuestionDataJson `interface`
 * The JSON representatation from a single question.
 */
declare interface ODQuestionJson {
    /**The id of this question. */
    id: string;
    /**The type of this question. */
    type: string;
    /**The version of Open Ticket used to create this question. */
    version: string;
    /**The full list of properties/variables related to this question. */
    data: ODQuestionDataJson[];
}

/**## ODQuestionManager `class`
 * This is an Open Ticket question manager.
 *
 * This class manages all registered questions in the bot. Only questions which are available in this manager can be used in options.
 *
 * Questions are not stored in the database and will be parsed from the config every startup.
 */
declare class ODQuestionManager extends api_2.ODManager<ODQuestion> {
    constructor(debug: api_2.ODDebugger);
    add(data: ODQuestion, overwrite?: boolean): boolean;
}

/**## ODQuestionsJsonCommentsConfig `class
 * A special class with types for the Open Ticket `config/questions.jsonc` config file
 */
declare class ODQuestionsJsonCommentsConfig extends api_2.ODJsonCommentsConfig<ODQuestionsJsonConfig_QuestionsData> {
}

/**## ODQuestionsJsonConfig_BaseQuestion `interface`
 * This interface is an object which has all universal properties for questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_BaseQuestion {
    /**The id of this question. */
    id: string;
    /**The name of this question. */
    name: string;
    /**The description of this question. (Leave empty for none) */
    description: string;
    /**The type of this question. */
    type: "short" | "paragraph" | "text-display" | "dropdown" | "radio-select" | "checkbox-select" | "file-upload";
    /**Is this question required? */
    required: boolean;
}

/**## ODQuestionsJsonConfig_CheckboxLimits `interface`
 * The required amount of checkboxes validation in a question.
 */
declare interface ODQuestionsJsonConfig_CheckboxLimits {
    /**Enable checkbox limits. */
    enabled: boolean;
    /**The minimum amount of selected checkboxes. */
    min: number;
    /**The maximum amount of selected checkboxes. */
    max: number;
}

/**## ODQuestionsJsonConfig_CheckboxSelectQuestion `interface`
 * All properties for checkbox select questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_CheckboxSelectQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "checkbox-select";
    /**Verify the checked amount of checkboxes with a minimum & maximum. */
    limits: ODQuestionsJsonConfig_CheckboxLimits;
    /**A list of minimum 1, maximum 10 checkbox choices. */
    choices: ODQuestionsJsonConfig_RadioCheckboxChoice[];
}

/**## ODQuestionsJsonConfig_DropdownChoice `interface`
 * A dropdown choice used in `ODQuestionsJsonConfig_DropdownQuestion`
 */
declare interface ODQuestionsJsonConfig_DropdownChoice {
    /**The title of the choice. */
    title: string;
    /**The optional description of the choice. (Leave empty for none) */
    description: string;
    /**The optional emoji of the choice. (Leave empty for none) */
    emoji: string;
}

/**## ODQuestionsJsonConfig_DropdownQuestion `interface`
 * All properties for dropdown questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_DropdownQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "dropdown";
    /**A placeholder for the dropdown. */
    placeholder: string;
    /**A list of maximum 25 dropdown choices. */
    choices: ODQuestionsJsonConfig_DropdownChoice[];
}

/**## ODQuestionsJsonConfig_FileUploadLimits `interface`
 * Verify the amount of uploaded files in a question.
 */
declare interface ODQuestionsJsonConfig_FileUploadLimits {
    /**Enable file limits. */
    enabled: boolean;
    /**The minimum amount of uploaded files. */
    min: number;
    /**The maximum amount of uploaded files. */
    max: number;
}

/**## ODQuestionsJsonConfig_FileUploadQuestion `interface`
 * All properties for checkbox select questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_FileUploadQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "file-upload";
    /**Verify the amount of uploaded files (minimum/maximum). */
    limits: ODQuestionsJsonConfig_FileUploadLimits;
}

/**## ODQuestionsJsonConfig_ParagraphQuestion `interface`
 * All properties for paragraph questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_ParagraphQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "paragraph";
    /**A placeholder for the question. */
    placeholder: string;
    /**A collection of settings related to length validation in a question. */
    length: ODQuestionsJsonConfig_TextLengthLimits;
}

/**## ODQuestionsJsonConfig_QuestionsData `type`
 * All contents of the `questions.jsonc` config file.
 */
declare type ODQuestionsJsonConfig_QuestionsData = (ODQuestionsJsonConfig_ShortQuestion | ODQuestionsJsonConfig_ParagraphQuestion | ODQuestionsJsonConfig_TextDisplayQuestion | ODQuestionsJsonConfig_DropdownQuestion | ODQuestionsJsonConfig_RadioSelectQuestion | ODQuestionsJsonConfig_CheckboxSelectQuestion | ODQuestionsJsonConfig_FileUploadQuestion)[];

/**## ODQuestionsJsonConfig_RadioCheckboxChoice `interface`
 * A radio/checkbox choice used in `ODQuestionsJsonConfig_RadioSelectQuestion` & `ODQuestionsJsonConfig_CheckboxSelectQuestion`
 */
declare interface ODQuestionsJsonConfig_RadioCheckboxChoice {
    /**The title of the choice. */
    title: string;
    /**The optional description of the choice. (Leave empty for none) */
    description: string;
    /**Is this choice selected by default? */
    selectedByDefault: boolean;
}

/**## ODQuestionsJsonConfig_RadioSelectQuestion `interface`
 * All properties for radio select questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_RadioSelectQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "radio-select";
    /**A list of minimum 2, maximum 10 radio choices. */
    choices: ODQuestionsJsonConfig_RadioCheckboxChoice[];
}

/**## ODQuestionsJsonConfig_ShortQuestion `interface`
 * All properties for short questions in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_ShortQuestion extends ODQuestionsJsonConfig_BaseQuestion {
    type: "short";
    /**A placeholder for the question. */
    placeholder: string;
    /**A collection of settings related to length validation in a question. */
    length: ODQuestionsJsonConfig_TextLengthLimits;
}

/**## ODQuestionsJsonConfig_TextDisplayQuestion `interface`
 * All properties for a text-display in the `questions.jsonc` config!
 */
declare interface ODQuestionsJsonConfig_TextDisplayQuestion extends Omit<ODQuestionsJsonConfig_BaseQuestion, "name" | "description" | "required"> {
    /**The type of this question. */
    type: "text-display";
    /**The text contents to show in the modal. */
    textContents: string;
}

/**## ODQuestionsJsonConfig_TextLengthLimits `interface`
 * This interface is a collection of settings related to length validation in a question.
 */
declare interface ODQuestionsJsonConfig_TextLengthLimits {
    /**Enable text length verification. */
    enabled: boolean;
    /**The minimum text input length. */
    min: number;
    /**The maximum text input length. */
    max: number;
}

/**## ODQuickButton `class`
 * This is an Open Discord quick button builder.
 *
 * With this class, you can quickly create a button to use in a message.
 * This quick button can be used by Open Discord plugins instead of the normal builders to speed up the process!
 *
 * Because of the quick functionality, these buttons are less customisable by other plugins.
 */
declare class ODQuickButton {
    /**The id of this button. */
    id: ODId;
    /**The current data of this button */
    data: Partial<ODButtonData>;
    constructor(id: ODValidId, data: Partial<ODButtonData>);
    /**Build this button & compile it for discord.js */
    build(): Promise<ODComponentBuildResult>;
}

/**## ODQuickDropdown `class`
 * This is an Open Discord quick dropdown builder.
 *
 * With this class, you can quickly create a dropdown to use in a message.
 * This quick dropdown can be used by Open Discord plugins instead of the normal builders to speed up the process!
 *
 * Because of the quick functionality, these dropdowns are less customisable by other plugins.
 */
declare class ODQuickDropdown {
    /**The id of this dropdown. */
    id: ODId;
    /**The current data of this dropdown */
    data: Partial<ODDropdownData>;
    constructor(id: ODValidId, data: Partial<ODDropdownData>);
    /**Build this dropdown & compile it for discord.js */
    build(): Promise<ODComponentBuildResult>;
}

/**## ODQuickEmbed `class`
 * This is an Open Discord quick embed builder.
 *
 * With this class, you can quickly create a embed to use in a message.
 * This quick embed can be used by Open Discord plugins instead of the normal builders to speed up the process!
 *
 * Because of the quick functionality, these embeds are less customisable by other plugins.
 */
declare class ODQuickEmbed {
    /**The id of this embed. */
    id: ODId;
    /**The current data of this embed */
    data: Partial<ODEmbedData>;
    constructor(id: ODValidId, data: Partial<ODEmbedData>);
    /**Build this embed & compile it for discord.js */
    build(): Promise<ODEmbedBuildResult>;
}

/**## ODQuickFile `class`
 * This is an Open Discord quick file builder.
 *
 * With this class, you can quickly create a file to use in a message.
 * This quick file can be used by Open Discord plugins instead of the normal builders to speed up the process!
 *
 * Because of the quick functionality, these files are less customisable by other plugins.
 */
declare class ODQuickFile {
    /**The id of this file. */
    id: ODId;
    /**The current data of this file */
    data: Partial<ODFileData>;
    constructor(id: ODValidId, data: Partial<ODFileData>);
    /**Build this attachment & compile it for discord.js */
    build(): Promise<ODFileBuildResult>;
}

/**## ODQuickMessage `class`
 * This is an Open Discord quick message builder.
 *
 * With this class, you can quickly create a message to send in a discord channel.
 * This quick message can be used by Open Discord plugins instead of the normal builders to speed up the process!
 *
 * Because of the quick functionality, these messages are less customisable by other plugins.
 */
declare class ODQuickMessage {
    /**The id of this message. */
    id: ODId;
    /**The current data of this message. */
    data: Partial<ODMessageData>;
    constructor(id: ODValidId, data: Partial<ODMessageData>);
    /**Build this message & compile it for discord.js */
    build(): Promise<ODMessageBuildResult>;
}

/**## ODRadioGroupComponent `class`
 * A radio group component which renders an interactive radio group input inside a modal.
 */
declare class ODRadioGroupComponent extends ODComponent<ODRadioGroupComponentData, discord.RadioGroupBuilder> {
    constructor(id: ODValidId, data: Partial<ODRadioGroupComponentData>);
    build(): Promise<discord.RadioGroupBuilder>;
    /**Set the custom id of this radio group. */
    setCustomId(id: string | null): this;
    /**Mark this radio group as required (At least one option must be selected). */
    setRequired(required: boolean): this;
    /**Set the available radio options (min 2, max 10) */
    setOptions(options: discord.APIRadioGroupOption[]): this;
}

/**## ODRadioGroupComponentData `type`
 * The configurable settings/options for the `ODRadioGroupComponent`.
 */
declare interface ODRadioGroupComponentData {
    /**The custom id of this radio group. */
    customId?: string;
    /**Is this radio group required? (At least one option must be selected) */
    required: boolean;
    /**The available radio options. (min 2, max 10) */
    options: discord.APIRadioGroupOption[];
}

/**## ODRadioSelectQuestion `class`
 * An Open Ticket radio-select question. It contains all config properties of the radio-select question type.
 */
declare class ODRadioSelectQuestion extends ODQuestion<ODRadioSelectQuestionIdMappings> {
    readonly type: "opendiscord:radio-select";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODRadioSelectQuestion;
}

/**## ODRadioSelectQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODRadioSelectQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODRadioSelectQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:choices": ODQuestionData<ODQuestionsJsonConfig_RadioCheckboxChoice[]>;
}

/**## ODResponderImplementation `class`
 * This is an Open Discord responder implementation.
 *
 * It is a basic implementation of the `ODWorkerManager` used by all `ODResponder` classes.
 *
 * This class can't be used stand-alone & needs to be extended from!
 */
declare abstract class ODResponderImplementation<Instance, Origin extends string, Params, WorkerIds extends string = string> extends ODManagerData {
    /**The manager that has all workers of this implementation */
    workers: ODWorkerManager<Instance, Origin, Params, WorkerIds>;
    /**The `commandName` or `customId` needs to match this string or regex for this responder to be executed. */
    match: string | RegExp;
    constructor(id: ODValidId, match: string | RegExp, callback?: ODWorkerCallback<Instance, Origin, Params>, priority?: number, callbackId?: ODValidId);
    /**Execute all workers & return the result. */
    abstract respond(instance: Instance, origin: Origin, params: Params): Promise<void>;
}

/**## ODResponderManager `class`
 * This is an Open Discord responder manager.
 *
 * It contains all Open Discord responders. Responders can respond to an interaction, button, dropdown, modal or command.
 *
 * Using the Open Discord responder system has a few advantages compared to vanilla discord.js:
 * - plugins can extend/edit replies
 * - automatically reply on error
 * - independent workers (with priority)
 * - fail-safe design using try-catch
 * - write code once => reply to both slash & text commands at the same time!
 * - know where the request came from & parse options/subcommands & without errors!
 * - And so much more!
 */
declare class ODResponderManager<CommandIdList extends ODCommandResponderManagerIdConstraint = ODCommandResponderManagerIdConstraint, ButtonIdList extends ODButtonResponderManagerIdConstraint = ODButtonResponderManagerIdConstraint, DropdownIdList extends ODDropdownResponderManagerIdConstraint = ODDropdownResponderManagerIdConstraint, ModalIdList extends ODModalResponderManagerIdConstraint = ODModalResponderManagerIdConstraint, ContextMenuIdList extends ODContextMenuResponderManagerIdConstraint = ODContextMenuResponderManagerIdConstraint, AutocompleteIdList extends ODAutocompleteResponderManagerIdConstraint = ODAutocompleteResponderManagerIdConstraint> {
    /**A manager for all (text & slash) command responders. */
    commands: ODCommandResponderManager<CommandIdList>;
    /**A manager for all button responders. */
    buttons: ODButtonResponderManager<ButtonIdList>;
    /**A manager for all dropdown/select menu responders. */
    dropdowns: ODDropdownResponderManager<DropdownIdList>;
    /**A manager for all modal responders. */
    modals: ODModalResponderManager<ModalIdList>;
    /**A manager for all context menu responders. */
    contextMenus: ODContextMenuResponderManager<ContextMenuIdList>;
    /**A manager for all autocomplete responders. */
    autocomplete: ODAutocompleteResponderManager<AutocompleteIdList>;
    constructor(debug: ODDebugger, client: ODClientManager);
}

/**## ODResponderSendResult `type`
 * The result from a sent message using responders. Can be used to edit, view & save the message that got created.
 */
declare type ODResponderSendResult<InGuild extends boolean> = {
    /**Did the message get sent successfully? */
    success: true;
    /**The message that got sent. */
    message: discord.Message<InGuild>;
    /**Was the message sent as ephemeral? */
    ephemeral: boolean;
} | {
    /**Did the message get sent successfully? */
    success: false;
};

/**## ODResponderTimeoutErrorCallback `type`
 * This is the callback for the responder timeout function. It will be executed when something went wrong or the action takes too much time.
 */
declare type ODResponderTimeoutErrorCallback<Instance, Origin extends "slash" | "text" | "button" | "dropdown" | "modal" | "other" | "context-menu" | "autocomplete"> = (instance: Instance, origin: Origin) => ODResponderSendResult<boolean> | Promise<ODResponderSendResult<boolean>>;

/**## ODRole `class`
 * This is an Open Ticket role.
 *
 * This class contains all data related to this role (parsed from the config).
 *
 * These properties will be used to handle reaction role options.
 */
declare class ODRole extends api_2.ODManager<ODRoleData<api_2.ODValidJsonType>> {
    /**The id of this role. (from the config) */
    id: api_2.ODId;
    constructor(id: api_2.ODValidId, data: ODRoleData<api_2.ODValidJsonType>[]);
    /**Convert this role to a JSON object for storing this role in the database. */
    toJson(version: api_2.ODVersion): ODRoleJson;
    /**Create a role from a JSON object in the database. */
    static fromJson(json: ODRoleJson): ODRole;
    get<OptionId extends keyof api_2.ODNoGeneric<ODRoleIdMappings>>(id: OptionId): ODRoleIdMappings[OptionId];
    get(id: api_2.ODValidId): ODRoleData<api_2.ODValidJsonType> | null;
    remove<OptionId extends keyof api_2.ODNoGeneric<ODRoleIdMappings>>(id: OptionId): ODRoleIdMappings[OptionId];
    remove(id: api_2.ODValidId): ODRoleData<api_2.ODValidJsonType> | null;
    exists(id: keyof api_2.ODNoGeneric<ODRoleIdMappings>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODRoleData `class`
 * This is Open Ticket role data.
 *
 * This class contains a single property for a role. (string, number, boolean, object, array, null)
 *
 * When this property is edited, the database will be updated automatically.
 */
declare class ODRoleData<DataType extends api_2.ODValidJsonType> extends api_2.ODManagerData {
    /**The value of this property. */
    private rawValue;
    constructor(id: api_2.ODValidId, value: DataType);
    /**The value of this property. */
    set value(value: DataType);
    get value(): DataType;
    /**Refresh the database. Is only required to be used when updating `ODRoleData` with an object/array as value. */
    refreshDatabase(): void;
}

/**## ODRoleDataJson `interface`
 * The JSON representatation from a single role property.
 */
declare interface ODRoleDataJson {
    /**The id of this property. */
    id: string;
    /**The value of this property. */
    value: api_2.ODValidJsonType;
}

/**## ODRoleIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODRole` class.
 */
declare type ODRoleIdConstraint = Record<string, ODRoleData<api_2.ODValidJsonType>>;

/**## ODRoleIdMappings `interface`
 * A list of all available IDs in the default `ODRole` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODRoleIdMappings extends ODRoleIdConstraint {
    "opendiscord:roles": ODRoleData<string[]>;
    "opendiscord:mode": ODRoleData<ODRoleUpdateMode>;
    "opendiscord:remove-roles-on-add": ODRoleData<string[]>;
    "opendiscord:add-on-join": ODRoleData<boolean>;
}

/**## ODRoleJson `interface`
 * The JSON representatation from a single role.
 */
declare interface ODRoleJson {
    /**The id of this role. */
    id: string;
    /**The version of Open Ticket used to create this role. */
    version: string;
    /**The full list of properties/variables related to this role. */
    data: ODRoleDataJson[];
}

/**## ODRoleManager `class`
 * This is an Open Ticket role manager.
 *
 * This class manages all registered reaction roles in the bot.
 *
 * Roles are not stored in the database and will be parsed from the config every startup.
 */
declare class ODRoleManager extends api_2.ODManager<ODRole> {
    constructor(debug: api_2.ODDebugger);
    add(data: ODRole, overwrite?: boolean): boolean;
}

/**## ODRoleOption `class`
 * This is an Open Ticket role option.
 *
 * This class contains all data related to an Open Ticket role option (parsed from the config).
 *
 * Use this option to create a button for reaction roles!
 */
declare class ODRoleOption extends ODOption<ODRoleOptionIdMappings> {
    readonly type: "opendiscord:role";
    constructor(id: api_2.ODValidId, data: ODOptionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODOptionJson): ODRoleOption;
}

/**## ODRoleOptionIdMappings `interface`
 * A list of all available IDs in the default `ODRoleOption` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODRoleOptionIdMappings extends ODOptionIdConstraint {
    "opendiscord:name": ODOptionData<string>;
    "opendiscord:description": ODOptionData<string>;
    "opendiscord:button-emoji": ODOptionData<string>;
    "opendiscord:button-label": ODOptionData<string>;
    "opendiscord:button-color": ODOptionData<api_2.ODValidButtonColor>;
    "opendiscord:roles": ODOptionData<string[]>;
    "opendiscord:mode": ODOptionData<ODRoleUpdateMode>;
    "opendiscord:remove-roles-on-add": ODOptionData<string[]>;
    "opendiscord:add-on-join": ODOptionData<boolean>;
}

/**## ODRoleUpdateMode `type`
 * This is the mode of the reaction role option in the config.
 */
declare type ODRoleUpdateMode = "add&remove" | "add" | "remove";

/**## ODRoleUpdateResult `interface`
 * This interface represents the result of a single role when the roles of users are updated.
 */
declare interface ODRoleUpdateResult {
    /**The role which was affected. */
    role: discord.Role;
    /**The action which was done. `null` when nothing happend. */
    action: "added" | "removed" | null;
}

/**## ODSectionComponent `class`
 * A layout component that allows you to contextually associate content with an accessory component.
 * - Components: Left
 * - Accessory: Right
 */
declare class ODSectionComponent extends ODGroupComponent<ODSectionComponentData, ODTextComponent, discord.SectionBuilder> {
    constructor(id: ODValidId, data?: Partial<ODSectionComponentData>);
    build(): Promise<discord.SectionBuilder>;
    /**Set the accessory component shown on the right side of the section. */
    setAccessory(accessory: ODButtonComponent | ODThumbnailComponent | null): this;
}

/**## ODSectionComponentData `type`
 * The configurable settings/options for the `ODSectionComponent`.
 */
declare interface ODSectionComponentData {
    /**The accessory component shown on the right side of the section. */
    accessory?: ODButtonComponent | ODThumbnailComponent;
}

/**## ODSeparatorComponent `class`
 * A visual separator between components. The visibility and padding of this separator can be changed.
 */
declare class ODSeparatorComponent extends ODComponent<ODSeparatorComponentData, discord.SeparatorBuilder> {
    constructor(id: ODValidId, data: Partial<ODSeparatorComponentData>);
    build(): Promise<discord.SeparatorBuilder>;
    /**Set whether a visual divider should be displayed in the component. (Default: `true`). */
    setDivider(divider: boolean): this;
    /**Set the size of separator padding (Default `small`). */
    setSpacing(spacing: "small" | "large"): this;
}

/**## ODSeparatorComponentData `type`
 * The configurable settings/options for the `ODSeparatorComponent`.
 */
declare interface ODSeparatorComponentData {
    /**Whether a visual divider should be displayed in the component. (Default: `true`) */
    divider: boolean;
    /**Size of separator padding (Default: `small`) */
    spacing: "small" | "large";
}

/**## ODSession `class`
 * This is an Open Discord session.
 *
 * It can be used to create unique user sessions with an ID. Each session can store additional data which isn't saved to the filesystem.
 * You can almost compare it to the PHP session system.
 */
declare class ODSession extends ODManagerData {
    /**The history of previously generated instance ids. Used to reduce the risk of generating the same id twice. */
    protected idHistory: string[];
    /**The max length of the instance id history. */
    protected maxIdHistoryLength: number;
    /**An array of all the currently active session instances. */
    sessions: ODSessionInstance[];
    /**The default amount of minutes before a session automatically stops. */
    timeoutMinutes: number;
    /**The id of the auto-timeout session checker interval */
    protected intervalId: NodeJS.Timeout;
    /**Listeners for when a session times-out. */
    protected timeoutListeners: ODSessionTimeoutCallback[];
    constructor(id: ODValidId, intervalSeconds?: number);
    /**Create a unique hex id of 8 characters and add it to the instance id history */
    protected createUniqueId(): string;
    /**Stop the global interval that automatically deletes timed-out sessions. (This action can't be reverted!) */
    stopAutoTimeout(): void;
    /**Start a session instance with data. Returns the unique id required to access the session. */
    start(data?: any): string;
    /**Get the data of a session instance. Returns `null` when not found. */
    data(id: string): any | null;
    /**Stop & delete a session instance. Returns `true` when sucessful. */
    stop(id: string): boolean;
    /**Update the data of a session instance. Returns `true` when sucessful. */
    update(id: string, data: any): boolean;
    /**Change the global or session timeout minutes. Returns `true` when sucessful. */
    setTimeout(min: number, id?: string): boolean;
    /**Listen for a session timeout (default or custom) */
    onTimeout(callback: ODSessionTimeoutCallback): void;
}

/**## ODSessionInstance `interface`
 * This interface represents a single session instance. It contains an id, data & some dates.
 */
declare interface ODSessionInstance {
    /**The id of this session instance. */
    id: string;
    /**The creation date of this session instance. */
    creation: number;
    /**The custom amount of minutes before this session expires. */
    timeout: number | null;
    /**This is the data from this session instance */
    data: any;
}

/**## ODSessionManager `class`
 * This is an Open Discord session manager.
 *
 * It contains all sessions in Open Discord. Sessions are a sort of temporary storage which will be cleared when the bot stops.
 * Data in sessions have a randomly generated key which will always be unique.
 *
 * Visit the `ODSession` class for more info
 */
declare class ODSessionManager<IdList extends ODSessionManagerIdConstraint = ODSessionManagerIdConstraint> extends ODManager<ODSession> {
    constructor(debug: ODDebugger);
    get<SessionId extends keyof ODNoGeneric<IdList>>(id: SessionId): IdList[SessionId];
    get(id: ODValidId): ODSession | null;
    remove<SessionId extends keyof ODNoGeneric<IdList>>(id: SessionId): IdList[SessionId];
    remove(id: ODValidId): ODSession | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODSessionManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODSessionManager` class.
 */
declare type ODSessionManagerIdConstraint = Record<string, ODSession>;

/**## ODSessionManagerIdMappings `interface`
 * A list of all available IDs in the default `ODSessionManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSessionManagerIdMappings extends api_2.ODSessionManagerIdConstraint {
}

/**## ODSessionTimeoutCallback `type`
 * This is the callback used for session timeout listeners.
 */
declare type ODSessionTimeoutCallback = (id: string, timeout: "default" | "custom", data: any, creation: Date) => void;

/**## ODSharedComponentManager `class
 * A special class with types for shared message/modal `ODComponent`'s.
 * Create button, dropdown or any other layout component template to use them in messages & modals.
 */
declare class ODSharedComponentManager<IdList extends ODSharedComponentManagerIdConstraint = ODSharedComponentManagerIdConstraint> extends ODBaseComponentManager<IdList, ODComponent<object, any>> {
    constructor(debug: ODDebugger);
    get<FactoryId extends keyof ODNoGeneric<IdList>>(id: FactoryId): ODComponentFactory<IdList[FactoryId]["component"], IdList[FactoryId]["origin"], IdList[FactoryId]["params"], IdList[FactoryId]["workers"]>;
    get(id: ODValidId): ODComponentFactory<ODComponent<object, any>, string, {}, string> | null;
    remove<FactoryId extends keyof ODNoGeneric<IdList>>(id: FactoryId): ODComponentFactory<IdList[FactoryId]["component"], IdList[FactoryId]["origin"], IdList[FactoryId]["params"], IdList[FactoryId]["workers"]>;
    remove(id: ODValidId): ODComponentFactory<ODComponent<object, any>, string, {}, string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODSharedComponentManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODComponentManager` class.
 */
declare type ODSharedComponentManagerIdConstraint = Record<string, {
    component: ODComponent<object, any>;
    origin: string;
    params: object;
    workers: string;
}>;

/**## ODSharedComponentManagerIdMappings `interface`
 * A list of all available IDs in the default `ODSharedComponentManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSharedComponentManagerIdMappings extends api_2.ODSharedComponentManagerIdConstraint {
}

/**## ODSharedFuseList `interface`
 * This type is a list of all fuses available in the `ODSharedFuseManager` class.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSharedFuseList {
    /**Enable the default error handling system. */
    errorHandling: boolean;
    /**Crash when there is an unknown bot error. */
    crashOnError: boolean;
    /**Enable the system responsible for the `--debug` flag. */
    debugLoading: boolean;
    /**Enable the system responsible for the `--silent` flag. */
    silentLoading: boolean;
    /**When enabled, you're able to use the "!OPENTICKET:dump" command to send the debug file. This is only possible when you're the owner of the bot. */
    allowDumpCommand: boolean;
    /**Enable loading all Open Discord plugins, sadly enough is only useful for the system :) */
    pluginLoading: boolean;
    /**Don't crash the bot when a plugin crashes! */
    softPluginLoading: boolean;
    /**Load the default Open Discord plugin classes. */
    pluginClassLoading: boolean;
    /**Load the default Open Discord flags. */
    flagLoading: boolean;
    /**Enable the default initializer for Open Discord flags. */
    flagInitiating: boolean;
    /**Load the default Open Discord progress bar renderers. */
    progressBarRendererLoading: boolean;
    /**Load the default Open Discord progress bars. */
    progressBarLoading: boolean;
    /**Load the default Open Discord configs. */
    configLoading: boolean;
    /**Enable the default initializer for Open Discord config. */
    configInitiating: boolean;
    /**Load the default Open Discord databases. */
    databaseLoading: boolean;
    /**Enable the default initializer for Open Discord database. */
    databaseInitiating: boolean;
    /**Load the default Open Discord sessions. */
    sessionLoading: boolean;
    /**Load the default Open Discord languages. */
    languageLoading: boolean;
    /**Enable the default initializer for Open Discord languages. */
    languageInitiating: boolean;
    /**Enable selecting the current language from `config/general.json`. */
    languageSelection: boolean;
    /**Set the backup language when the primary language is missing a property. */
    backupLanguage: string;
    /****[NOT FOR PLUGIN TRANSLATIONS]** The full list of available languages (used in the default config checker). */
    languageList: string[];
    /**Load the default Open Discord config checker. */
    checkerLoading: boolean;
    /**Load the default Open Discord config checker functions. */
    checkerFunctionLoading: boolean;
    /**Enable the default execution of the config checkers. */
    checkerExecution: boolean;
    /**Load the default Open Discord config checker translations. */
    checkerTranslationLoading: boolean;
    /**Enable the default rendering of the config checkers. */
    checkerRendering: boolean;
    /**Enable the default quit action when there is an error in the config checker. */
    checkerQuit: boolean;
    /**Render the checker even when there are no errors & warnings. */
    checkerRenderEmpty: boolean;
    /**Load the default Open Discord client configuration. */
    clientLoading: boolean;
    /**Load the default Open Discord client initialization. */
    clientInitiating: boolean;
    /**Load the default Open Discord client ready actions (status, commands, permissions, ...). */
    clientReady: boolean;
    /**Create a warning when the bot is present in multiple guilds. */
    clientMultiGuildWarning: boolean;
    /**Load the default Open Discord client activity (from `config/general.json`). */
    clientActivityLoading: boolean;
    /**Load the default Open Discord client activity initialization (& status refresh). */
    clientActivityInitiating: boolean;
    /**Load the default Open Discord slash commands. */
    slashCommandLoading: boolean;
    /**Load the default Open Discord slash command registerer (register slash cmds in discord). */
    slashCommandRegistering: boolean;
    /**When enabled, the bot is forced to re-register all slash commands in the server. This can be used in case of a auto-update malfunction. */
    forceSlashCommandRegistration: boolean;
    /**When enabled, the bot is allowed to unregister all slash commands which aren't used in Open Discord. Disable this if you don't want to use the Open Discord `ODSlashCommand` classes. */
    allowSlashCommandRemoval: boolean;
    /**Load the default Open Discord context menus. */
    contextMenuLoading: boolean;
    /**Load the default Open Discord context menu registerer (register menus in discord). */
    contextMenuRegistering: boolean;
    /**When enabled, the bot is forced to re-register all context menus in the server. This can be used in case of a auto-update malfunction. */
    forceContextMenuRegistration: boolean;
    /**When enabled, the bot is allowed to unregister all context menus which aren't used in Open Discord. Disable this if you don't want to use the Open Discord `ODContextMenu` classes. */
    allowContextMenuRemoval: boolean;
    /**Load the default Open Discord text commands. */
    textCommandLoading: boolean;
    /**Load the default Open Discord message states. */
    stateLoading: boolean;
    /**Initiate the default Open Discord message states. */
    stateInitiating: boolean;
    /**Load the default Open Discord button builders. */
    buttonBuildersLoading: boolean;
    /**Load the default Open Discord dropdown builders. */
    dropdownBuildersLoading: boolean;
    /**Load the default Open Discord file builders. */
    fileBuildersLoading: boolean;
    /**Load the default Open Discord embed builders. */
    embedBuildersLoading: boolean;
    /**Load the default Open Discord message builders. */
    messageBuildersLoading: boolean;
    /**Load the default Open Discord modal builders. */
    modalBuildersLoading: boolean;
    /**Load the default Open Discord shared components. */
    sharedComponentsLoading: boolean;
    /**Load the default Open Discord message components. */
    messageComponentsLoading: boolean;
    /**Load the default Open Discord modal components. */
    modalComponentsLoading: boolean;
    /**Load the default Open Discord component modifiers. */
    componentModifiersLoading: boolean;
    /**Load the default Open Discord command responders. */
    commandRespondersLoading: boolean;
    /**Load the default Open Discord button responders. */
    buttonRespondersLoading: boolean;
    /**Load the default Open Discord dropdown responders. */
    dropdownRespondersLoading: boolean;
    /**Load the default Open Discord modal responders. */
    modalRespondersLoading: boolean;
    /**Load the default Open Discord context menu responders. */
    contextMenuRespondersLoading: boolean;
    /**Load the default Open Discord autocomplete responders. */
    autocompleteRespondersLoading: boolean;
    /**Set the time (in ms) before Open Discord sends an error message when no reply is sent in a responder. */
    responderTimeoutMs: number;
    /**Load the default Open Discord actions. */
    actionsLoading: boolean;
    /**Load the default Open Discord verify bars. */
    verifyBarsLoading: boolean;
    /**Load the default Open Discord permissions. */
    permissionsLoading: boolean;
    /**Load the default Open Discord posts. */
    postsLoading: boolean;
    /**Initiate the default Open Discord posts. */
    postsInitiating: boolean;
    /**Load the default Open Discord cooldowns. */
    cooldownsLoading: boolean;
    /**Initiate the default Open Discord cooldowns. */
    cooldownsInitiating: boolean;
    /**Load the default Open Discord help menu categories. */
    helpMenuCategoryLoading: boolean;
    /**Load the default Open Discord help menu components. */
    helpMenuComponentLoading: boolean;
    /**Load the default Open Discord statistic scopes. */
    statisticScopesLoading: boolean;
    /**Load the default Open Discord statistics. */
    statisticLoading: boolean;
    /**Initiate the default Open Discord statistics. */
    statisticInitiating: boolean;
    /**Load the default Open Discord task/functions. */
    taskLoading: boolean;
    /**Execute the default Open Discord task/functions. */
    taskExecution: boolean;
    /**Load the default Open Discord livestatus. */
    liveStatusLoading: boolean;
    /**Load the default Open Discord startscreen. */
    startScreenLoading: boolean;
    /**Render the default Open Discord startscreen. */
    startScreenRendering: boolean;
    /**Load the emoji style from the Open Discord general config. */
    emojiTitleStyleLoading: boolean;
    /**The emoji style to use in embed & message titles using `utilities.emoijTitle()` */
    emojiTitleStyle: "disabled" | "before" | "after" | "double";
    /**The emoji divider to use in embed & message titles using `utilities.emoijTitle()` */
    emojiTitleDivider: string;
}

/**## ODFuseManager `class`
 * This is an Open Discord fuse manager.
 *
 * It manages all settings in Open Discord that are not meant to be in the config.
 * Here you can disable certain default features of the bot to replace them with your own implementation!
 *
 * You can think of them like real fuses, they disable an entire branch of the bot!
 */
declare class ODSharedFuseManager extends ODFuseManager<ODSharedFuseList> {
    constructor();
}

/**## ODShortInputComponent `class`
 * A short text input component for modals.
 * It must be placed inside an `ODLabelComponent`.
 */
declare class ODShortInputComponent extends ODComponent<ODShortInputComponentData, discord.TextInputBuilder> {
    constructor(id: ODValidId, data: Partial<ODShortInputComponentData>);
    build(): Promise<discord.TextInputBuilder>;
    /**Set the custom id of this modal text input. */
    setCustomId(id: string | null): this;
    /**Set the minimum amount of characters of this modal text input. */
    setMinLength(length: number | null): this;
    /**Set the maximum amount of characters of this modal text input. */
    setMaxLength(length: number | null): this;
    /**Set the placeholder of this modal text input. */
    setPlaceholder(placeholder: string | null): this;
    /**Set the initial value of this modal text input. */
    setInitialValue(initialValue: string | null): this;
    /**Mark this modal text input as required. */
    setRequired(required: boolean): this;
}

/**## ODShortInputComponentData `type`
 * The configurable settings/options for the `ODShortInputComponent`.
 */
declare interface ODShortInputComponentData {
    /**The custom id of this modal text input. */
    customId?: string;
    /**The min length of this modal text input. */
    minLength?: number;
    /**The max length of this modal text input. */
    maxLength?: number;
    /**Is this modal text input required? */
    required: boolean;
    /**The placeholder of this modal text input. */
    placeholder?: string;
    /**The initial value of this modal text input. */
    initialValue?: string;
}

/**## ODShortQuestion `class`
 * An Open Ticket short question. It contains all config properties of the short question type.
 */
declare class ODShortQuestion extends ODQuestion<ODShortQuestionIdMappings> {
    readonly type: "opendiscord:short";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODShortQuestion;
}

/**## ODShortQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODShortQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODShortQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:name": ODQuestionData<string>;
    "opendiscord:description": ODQuestionData<string>;
    "opendiscord:required": ODQuestionData<boolean>;
    "opendiscord:placeholder": ODQuestionData<string>;
    "opendiscord:length-enabled": ODQuestionData<boolean>;
    "opendiscord:length-min": ODQuestionData<number>;
    "opendiscord:length-max": ODQuestionData<number>;
}

/**## ODSimpleMessageComponent `class`
 * A message builder with **components v1** support.
 * Add items to this message using `addComponent()`.
 *
 * Use `ODMessageComponent` for components v2, components, containers, etc
 */
declare class ODSimpleMessageComponent extends ODGroupComponent<ODSimpleMessageComponentData, ODValidSimpleMessageComponents, ODMessageComponentBuildResult> {
    constructor(id: ODValidId, data?: Partial<ODMessageComponentData>);
    build(): Promise<{
        id: ODId;
        msg: {
            nonce?: string | number;
            forward?: discord.ForwardOptions;
            stickers?: readonly discord.StickerResolvable[];
            tts?: boolean;
            reply?: discord.ReplyOptions;
            allowedMentions?: discord.MessageMentionOptions;
            enforceNonce?: boolean;
            content: string | undefined;
            embeds: discord.EmbedBuilder[];
            poll: discord.PollData | undefined;
            files: discord.AttachmentBuilder[];
        };
        componentsV2: boolean;
        ephemeral: boolean;
        supressEmbeds: boolean;
        supressNotifications: boolean;
    }>;
    /**Enable/disable ephemeral mode. */
    setEphemeral(value: boolean): this;
    /**Enable supress (hide) embeds mode. */
    setSupressEmbeds(value: boolean): this;
    /**Enable supress (hide) notifications mode. */
    setSupressNotifications(value: boolean): this;
    /**Add an additional attachment which can be used in components as `attachment://...` */
    addAdditionalAttachments(...attachments: discord.AttachmentBuilder[]): this;
}

/**## ODSimpleMessageComponentData `type`
 * The configurable settings/options for the `ODSimpleMessageComponent`.
 */
declare interface ODSimpleMessageComponentData {
    /**Should the message be sent as ephemeral? */
    ephemeral?: boolean;
    /**Suppress/hide embeds. */
    supressEmbeds?: boolean;
    /**Do not send notifications to mentioned users or roles. */
    supressNotifications?: boolean;
    /**Additional options that aren't covered by the Open Discord api!*/
    additionalOptions?: Omit<discord.MessageCreateOptions, "poll" | "content" | "embeds" | "components" | "files" | "flags">;
    /**Add additional files which can be used in components as `attachment://...`  */
    additionalAttachments?: discord.AttachmentBuilder[];
}

/**## ODSlashCommand `class`
 * This is an Open Discord slash command.
 *
 * When registered, you can listen for this command using the `ODCommandResponder`. The advantages of using this class for creating a slash command are:
 * - automatic option parsing (even for channels, users, roles & mentions)!
 * - automatic registration in discord.js
 * - error reporting to the user when the bot fails to respond
 * - plugins can extend this command
 * - the bot won't re-register the command when it already exists (except when requested)!
 *
 * And more!
 */
declare class ODSlashCommand extends ODManagerData {
    /**The discord.js builder for this slash command. */
    builder: ODSlashCommandBuilder;
    /**The id of the guild this command is for. Null when not set. */
    guildId: string | null;
    /**Function to check if the slash command requires to be updated (when it already exists). */
    requiresUpdate: ODSlashCommandUpdateFunction | null;
    constructor(id: ODValidId, builder: ODSlashCommandBuilder, requiresUpdate?: ODSlashCommandUpdateFunction, guildId?: string);
    /**The name of this slash command. */
    get name(): string;
    set name(name: string);
}

/**## ODSlashCommandBuilder `interface`
 * The builder for slash commands. Here you can add options to the command.
 */
declare interface ODSlashCommandBuilder extends discord.ChatInputApplicationCommandData {
    /**This field is required in Open Discord for future compatibility. */
    integrationTypes: discord.ApplicationIntegrationType[];
    /**This field is required in Open Discord for future compatibility. */
    contexts: discord.InteractionContextType[];
}

/**## ODSlashCommandComparator `class`
 * A utility class to compare existing slash commands with newly registered ones.
 */
declare class ODSlashCommandComparator {
    /**Convert a `discord.ApplicationCommandOptionChoiceData<string>` to a universal Open Discord slash command option choice object for comparison. */
    protected convertOptionChoice(choice: discord.ApplicationCommandOptionChoiceData<string>): ODSlashCommandUniversalOptionChoice;
    /**Convert a `discord.ApplicationCommandOptionData` to a universal Open Discord slash command option object for comparison. */
    protected convertBuilderOption(option: discord.ApplicationCommandOptionData): ODSlashCommandUniversalOption;
    /**Convert a `discord.ApplicationCommandOption` to a universal Open Discord slash command option object for comparison. */
    protected convertCommandOption(option: discord.ApplicationCommandOption): ODSlashCommandUniversalOption;
    /**Convert a `ODSlashCommandBuilder` to a universal Open Discord slash command object for comparison. */
    convertBuilder(builder: ODSlashCommandBuilder, guildId: string | null): ODSlashCommandUniversalCommand | null;
    /**Convert a `discord.ApplicationCommand` to a universal Open Discord slash command object for comparison. */
    convertCommand(cmd: discord.ApplicationCommand): ODSlashCommandUniversalCommand | null;
    /**Returns `true` when the 2 slash command options are the same. */
    compareOption(optA: ODSlashCommandUniversalOption, optB: ODSlashCommandUniversalOption): boolean;
    /**Returns `true` when the 2 slash commands are the same. */
    compare(cmdA: ODSlashCommandUniversalCommand, cmdB: ODSlashCommandUniversalCommand): boolean;
}

/**## ODSlashCommandInteractionCallback `type`
 * Callback for the slash command interaction listener.
 */
declare type ODSlashCommandInteractionCallback = (interaction: discord.ChatInputCommandInteraction, cmd: ODSlashCommand) => void;

/**## ODSlashCommandManager `class`
 * This is an Open Discord client slash manager.
 *
 * It's responsible for managing all the slash commands from the client.
 *
 * Here, you can add & remove slash commands & the bot will do the (de)registering.
 */
declare class ODSlashCommandManager<IdList extends ODSlashCommandManagerIdConstraint = ODSlashCommandManagerIdConstraint> extends ODManager<ODSlashCommand> {
    /**Refrerence to discord.js client. */
    protected client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>;
    /**Discord.js application commands manager. */
    commandManager: discord.ApplicationCommandManager | null;
    /**Collection of all interaction listeners. */
    protected interactionListeners: {
        name: string | RegExp;
        callback: ODSlashCommandInteractionCallback;
    }[];
    /**Set the soft limit for maximum amount of listeners. A warning will be shown when there are more listeners than this limit. */
    listenerLimit: number;
    /**A utility class used to compare 2 slash commands with each other. */
    comparator: ODSlashCommandComparator;
    constructor(debug: ODDebugger, client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>);
    /**Get all registered & unregistered slash commands. */
    getAllRegisteredCommands(guildId?: string): Promise<ODSlashCommandRegisteredResult>;
    /**Create all commands that are not registered yet.*/
    createNewCommands(instances: ODSlashCommand[], progress?: ODManualProgressBar): Promise<void>;
    /**Update all commands that are already registered. */
    updateExistingCommands(instances: ODSlashCommand[], progress?: ODManualProgressBar): Promise<void>;
    /**Remove all commands that are registered but unused by Open Discord. */
    removeUnusedCommands(instances: ODSlashCommandUniversalCommand[], guildId?: string, progress?: ODManualProgressBar): Promise<void>;
    /**Create a slash command. **(SYSTEM ONLY)** => Use `ODSlashCommandManager` for registering commands the default way! */
    createCmd(cmd: ODSlashCommand): Promise<void>;
    /**Start listening to the discord.js client `interactionCreate` event. */
    startListeningToInteractions(): void;
    /**Callback on interaction from one or multiple slash commands. */
    onInteraction(commandName: keyof ODNoGeneric<IdList>, callback: ODSlashCommandInteractionCallback): void;
    onInteraction(commandName: string | RegExp, callback: ODSlashCommandInteractionCallback): void;
    get<SlashCommandId extends keyof ODNoGeneric<IdList>>(id: SlashCommandId): IdList[SlashCommandId];
    get(id: ODValidId): ODSlashCommand | null;
    remove<SlashCommandId extends keyof ODNoGeneric<IdList>>(id: SlashCommandId): IdList[SlashCommandId];
    remove(id: ODValidId): ODSlashCommand | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODSlashCommandManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODSlashCommandManager` class.
 */
declare type ODSlashCommandManagerIdConstraint = Record<string, ODSlashCommand>;

/**## ODSlashCommandManagerIdMappings `interface`
 * A list of all available IDs in the default `ODSlashCommandManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSlashCommandManagerIdMappings extends api_2.ODSlashCommandManagerIdConstraint {
    "opendiscord:help": api_2.ODSlashCommand;
    "opendiscord:panel": api_2.ODSlashCommand;
    "opendiscord:ticket": api_2.ODSlashCommand;
    "opendiscord:close": api_2.ODSlashCommand;
    "opendiscord:delete": api_2.ODSlashCommand;
    "opendiscord:reopen": api_2.ODSlashCommand;
    "opendiscord:claim": api_2.ODSlashCommand;
    "opendiscord:unclaim": api_2.ODSlashCommand;
    "opendiscord:pin": api_2.ODSlashCommand;
    "opendiscord:unpin": api_2.ODSlashCommand;
    "opendiscord:move": api_2.ODSlashCommand;
    "opendiscord:rename": api_2.ODSlashCommand;
    "opendiscord:add": api_2.ODSlashCommand;
    "opendiscord:remove": api_2.ODSlashCommand;
    "opendiscord:blacklist": api_2.ODSlashCommand;
    "opendiscord:stats": api_2.ODSlashCommand;
    "opendiscord:clear": api_2.ODSlashCommand;
    "opendiscord:autoclose": api_2.ODSlashCommand;
    "opendiscord:autodelete": api_2.ODSlashCommand;
    "opendiscord:topic": api_2.ODSlashCommand;
    "opendiscord:priority": api_2.ODSlashCommand;
    "opendiscord:transfer": api_2.ODSlashCommand;
    "opendiscord:transcripts": api_2.ODSlashCommand;
}

/**## ODSlashCommandRegisteredResult `type`
 * The result which will be returned when getting all (un)registered slash commands from the manager.
 */
declare type ODSlashCommandRegisteredResult = {
    /**A list of all registered commands. */
    registered: {
        /**The instance (`ODSlashCommand`) from this command. */
        instance: ODSlashCommand;
        /**The (universal) slash command object/template of this command. */
        cmd: ODSlashCommandUniversalCommand;
        /**Does this command require an update? */
        requiresUpdate: boolean;
    }[];
    /**A list of all unregistered commands. */
    unregistered: {
        /**The instance (`ODSlashCommand`) from this command. */
        instance: ODSlashCommand;
        /**The (universal) slash command object/template of this command. */
        cmd: null;
        /**Does this command require an update? */
        requiresUpdate: true;
    }[];
    /**A list of all unused commands (not found in `ODSlashCommandManager`). */
    unused: {
        /**The instance (`ODSlashCommand`) from this command. */
        instance: null;
        /**The (universal) slash command object/template of this command. */
        cmd: ODSlashCommandUniversalCommand;
        /**Does this command require an update? */
        requiresUpdate: false;
    }[];
};

/**## ODSlashCommandUniversalCommand `interface`
 * A universal template for a slash command.
 *
 * Why universal? Both **existing slash commands** & **unregistered templates** can be converted to this type.
 */
declare interface ODSlashCommandUniversalCommand {
    /**The type of this command. (required => `ChatInput`) */
    type: discord.ApplicationCommandType.ChatInput;
    /**The name of this command. */
    name: string;
    /**All localized names of this command. */
    nameLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**The description of this command. */
    description: string;
    /**All localized descriptions of this command. */
    descriptionLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**The id of the guild this command is registered in. */
    guildId: string | null;
    /**Is this command for 18+ users only? */
    nsfw: boolean;
    /**A list of options for this command. */
    options: readonly ODSlashCommandUniversalOption[];
    /**A bitfield of the user permissions required to use this command. */
    defaultMemberPermissions: bigint;
    /**Is this command available in DM? */
    dmPermission: boolean;
    /**A list of contexts where you can install this command. */
    integrationTypes: readonly discord.ApplicationIntegrationType[];
    /**A list of contexts where you can use this command. */
    contexts: readonly discord.InteractionContextType[];
}

/**## ODSlashCommandUniversalOption `interface`
 * A universal template for a slash command option.
 *
 * Why universal? Both **existing slash commands** & **unregistered templates** can be converted to this type.
 */
declare interface ODSlashCommandUniversalOption {
    /**The type of this option. */
    type: discord.ApplicationCommandOptionType;
    /**The name of this option. */
    name: string;
    /**All localized names of this option. */
    nameLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**The description of this option. */
    description: string;
    /**All localized descriptions of this option. */
    descriptionLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**Is this option required? */
    required: boolean;
    /**Is autocomplete enabled in this option? */
    autocomplete: boolean | null;
    /**Choices for this option (only when type is `string`) */
    choices: ODSlashCommandUniversalOptionChoice[];
    /**A list of sub-options for this option (only when type is `subCommand` or `subCommandGroup`) */
    options: readonly ODSlashCommandUniversalOption[];
    /**A list of allowed channel types for this option (only when type is `channel`) */
    channelTypes: readonly discord.ChannelType[];
    /**The minimum amount required for this option (only when type is `number` or `integer`) */
    minValue: number | null;
    /**The maximum amount required for this option (only when type is `number` or `integer`) */
    maxValue: number | null;
    /**The minimum length required for this option (only when type is `string`) */
    minLength: number | null;
    /**The maximum length required for this option (only when type is `string`) */
    maxLength: number | null;
}

/**## ODSlashCommandUniversalOptionChoice `interface`
 * A universal template for a slash command option choice. (used in `string` options)
 *
 * Why universal? Both **existing slash commands** & **unregistered templates** can be converted to this type.
 */
declare interface ODSlashCommandUniversalOptionChoice {
    /**The name of this choice. */
    name: string;
    /**All localized names of this choice. */
    nameLocalizations: readonly ODSlashCommandUniversalTranslation[];
    /**The value of this choice. */
    value: string;
}

/**## ODSlashCommandUniversalTranslation `interface`
 * A universal template for a slash command translation. (used in names & descriptions)
 *
 * Why universal? Both **existing slash commands** & **unregistered templates** can be converted to this type.
 */
declare interface ODSlashCommandUniversalTranslation {
    /**The language code or locale of this language. */
    language: `${discord.Locale}`;
    /**The translation of the name in this language. */
    value: string;
}

/**## ODSlashCommandUpdateFunction `type`
 * The function responsible for updating slash commands when they already exist.
 */
declare type ODSlashCommandUpdateFunction = (command: ODSlashCommandUniversalCommand) => boolean;

/**## ODStartScreenCategoryComponent `class`
 * This is an Open Discord startscreen category component.
 *
 * This component will render a category to the startscreen. This will only render the category name. You'll need to provide your own renderer for the contents.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenCategoryComponent extends ODStartScreenComponent {
    /**The name of this category. */
    name: string;
    /**When enabled, this category will still be rendered when the contents are empty. (enabled by default) */
    renderIfEmpty: boolean;
    constructor(id: ODValidId, priority: number, name: string, render: ODStartScreenComponentRenderCallback, renderIfEmpty?: boolean);
}

/**## ODStartScreenComponent `class`
 * This is an Open Discord startscreen component.
 *
 * This component can be rendered to the start screen of the bot.
 * An optional priority can be specified to choose the location of the component.
 *
 * It's recommended to use pre-built components except if you really need a custom one.
 */
declare abstract class ODStartScreenComponent extends ODManagerData {
    /**The priority of this component. */
    priority: number;
    /**An optional render function which will be inserted before the default renderer. */
    renderBefore: ODStartScreenComponentRenderCallback | null;
    /**The render function which will render the contents of this component. */
    render: ODStartScreenComponentRenderCallback;
    /**An optional render function which will be inserted behind the default renderer. */
    renderAfter: ODStartScreenComponentRenderCallback | null;
    constructor(id: ODValidId, priority: number, render: ODStartScreenComponentRenderCallback, renderBefore?: ODStartScreenComponentRenderCallback, renderAfter?: ODStartScreenComponentRenderCallback);
    /**Render this component and combine it with the `renderBefore` & `renderAfter` contents. */
    renderAll(location: number): Promise<string>;
}

/**## ODStartScreenComponentRenderCallback `type`
 * This is the render function of a startscreen component. It also sends the location of where the component is rendered.
 */
declare type ODStartScreenComponentRenderCallback = (location: number) => string | Promise<string>;

/**## ODStartScreenFlagsCategoryComponent `class`
 * This is an Open Discord startscreen flags category component.
 *
 * This component will render a flags category to the startscreen. This will list the enabled flags in the category.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenFlagsCategoryComponent extends ODStartScreenCategoryComponent {
    /**A list of all flags to render. */
    flags: ODFlag[];
    constructor(id: ODValidId, priority: number, flags: ODFlag[]);
}

/**## ODStartScreenHeaderAlignmentSettings `type`
 * This interface contains all settings used in the startscreen header component.
 */
declare interface ODStartScreenHeaderAlignmentSettings {
    /**The alignment settings for this header. */
    align: "center" | "left" | "right";
    /**The width or component to use when calculating center & right alignment. */
    width: number | ODStartScreenComponent;
}

/**## ODStartScreenHeaderComponent `class`
 * This is an Open Discord startscreen header component.
 *
 * This component will render a header to the startscreen. Properties can be aligned left, right or centered.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenHeaderComponent extends ODStartScreenComponent {
    /**All properties of this header component. */
    properties: ODStartScreenProperty[];
    /**The spacer used between properties. */
    spacer: string;
    /**The alignment settings of this header component. */
    align: ODStartScreenHeaderAlignmentSettings | null;
    constructor(id: ODValidId, priority: number, properties: ODStartScreenProperty[], spacer?: string, align?: ODStartScreenHeaderAlignmentSettings);
}

/**## ODStartScreenLiveStatusCategoryComponent `class`
 * This is an Open Discord startscreen livestatus category component.
 *
 * This component will render a livestatus category to the startscreen. This will list the livestatus messages in the category.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenLiveStatusCategoryComponent<LiveStatus extends ODLiveStatusManager<ODLiveStatusManagerIdConstraint>> extends ODStartScreenCategoryComponent {
    /**A reference to the Open Discord livestatus manager. */
    livestatus: LiveStatus;
    constructor(id: ODValidId, priority: number, livestatus: LiveStatus);
}

/**## ODStartScreenLogsCategoryComponent `class`
 * This is an Open Discord startscreen logs category component.
 *
 * This component will render a logs category to the startscreen. This will only render the logs category name.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenLogCategoryComponent extends ODStartScreenCategoryComponent {
    constructor(id: ODValidId, priority: number);
}

/**## ODStartScreenLogoComponent `class`
 * This is an Open Discord startscreen logo component.
 *
 * This component will render an ASCII art logo (from an array) to the startscreen. Every property in the array is another row.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenLogoComponent extends ODStartScreenComponent {
    /**The ASCII logo contents. */
    logo: string[];
    /**When enabled, the component will add a new line above the logo. */
    topPadding: boolean;
    /**When enabled, the component will add a new line below the logo. */
    bottomPadding: boolean;
    /**The color of the logo in hex format. */
    logoHexColor: string;
    constructor(id: ODValidId, priority: number, logo: string[], topPadding?: boolean, bottomPadding?: boolean, logoHexColor?: string);
}

/**## ODStartScreenManager `class`
 * This is an Open Discord startscreen manager.
 *
 * This class is responsible for managing & rendering the startscreen of the bot.
 * The startscreen is the part you see when the bot has started up successfully. (e.g. the Open Discord logo, logs, livestatus, flags, ...)
 */
declare class ODStartScreenManager<IdList extends ODStartScreenManagerIdConstraint = ODStartScreenManagerIdConstraint, LiveStatus extends ODLiveStatusManager = ODLiveStatusManager> extends ODManager<ODStartScreenComponent> {
    /**Alias to the livestatus manager. */
    livestatus: LiveStatus;
    constructor(debug: ODDebugger, livestatus: LiveStatus);
    /**Get all components in sorted order. */
    getSortedComponents(priority: "ascending" | "descending"): ODStartScreenComponent[];
    /**Render all startscreen components in priority order. */
    renderAllComponents(): Promise<void>;
    get<StartScreenId extends keyof ODNoGeneric<IdList>>(id: StartScreenId): IdList[StartScreenId];
    get(id: ODValidId): ODStartScreenComponent | null;
    remove<StartScreenId extends keyof ODNoGeneric<IdList>>(id: StartScreenId): IdList[StartScreenId];
    remove(id: ODValidId): ODStartScreenComponent | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODStartScreenManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODStartScreenManager` class.
 */
declare type ODStartScreenManagerIdConstraint = Record<string, ODStartScreenComponent>;

/**## ODStartScreenManagerIdMappings `interface`
 * A list of all available IDs in the default `ODStartScreenManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODStartScreenManagerIdMappings extends api_2.ODStartScreenManagerIdConstraint {
    "opendiscord:logo": api_2.ODStartScreenLogoComponent;
    "opendiscord:header": api_2.ODStartScreenHeaderComponent;
    "opendiscord:flags": api_2.ODStartScreenFlagsCategoryComponent;
    "opendiscord:plugins": api_2.ODStartScreenPluginsCategoryComponent;
    "opendiscord:stats": api_2.ODStartScreenPropertiesCategoryComponent;
    "opendiscord:livestatus": api_2.ODStartScreenLiveStatusCategoryComponent<api_2.ODLiveStatusManager<ODLiveStatusManagerIdMappings>>;
    "opendiscord:logs": api_2.ODStartScreenCategoryComponent;
}

/**## ODStartScreenPluginsCategoryComponent `class`
 * This is an Open Discord startscreen plugins category component.
 *
 * This component will render a plugins category to the startscreen. This will list the enabled, disabled & crashed plugins in the category.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenPluginsCategoryComponent extends ODStartScreenCategoryComponent {
    /**A list of all plugins to render. */
    plugins: ODPlugin[];
    /**A list of all crashed plugins to render. */
    unknownCrashedPlugins: ODUnknownCrashedPlugin[];
    constructor(id: ODValidId, priority: number, plugins: ODPlugin[], unknownCrashedPlugins: ODUnknownCrashedPlugin[]);
}

/**## ODStartScreenPropertiesCategoryComponent `class`
 * This is an Open Discord startscreen properties category component.
 *
 * This component will render a properties category to the startscreen. This will list the properties in the category.
 * An optional priority can be specified to choose the location of the component.
 */
declare class ODStartScreenPropertiesCategoryComponent extends ODStartScreenCategoryComponent {
    /**The properties of this category component. */
    properties: ODStartScreenProperty[];
    /**The hex color for the key/name of all the properties. */
    propertyHexColor: string;
    constructor(id: ODValidId, priority: number, name: string, properties: ODStartScreenProperty[], propertyHexColor?: string, renderIfEmpty?: boolean);
}

/**## ODStartScreenProperty `type`
 * This interface contains properties used in a few default templates of the startscreen component.
 */
declare interface ODStartScreenProperty {
    /**The key or name of this property. */
    key: string;
    /**The value or contents of this property. */
    value: string;
}

/**## ODState `class`
 * An Open Discord state is a system for storing additional chunks of metadata for Discord messages.
 * A system for tracking messages or linking metadata, states or progress to Discord messages (ID-based).
 *
 * Features automatic garbage collection to clear expired states.
 */
declare class ODState<StateData extends any, WithGuildKey extends boolean, WithUserKey extends boolean> extends ODManagerData {
    /**Alias to Open Discord message states database. */
    protected database: ODDatabase<ODDatabaseIdConstraint>;
    /**Alias to Open Discord client manager. */
    protected client: ODClientManager;
    /**Alias to Open Discord debugger. */
    protected debug: ODDebugger | null;
    /**The settings of this state. */
    settings: ODStateSettings;
    constructor(id: ODValidId, client: ODClientManager, database: ODDatabase<ODDatabaseIdConstraint>, settings: Partial<ODStateSettings>);
    /**Use the Open Discord debugger in this manager for logs. */
    useDebug(debug?: ODDebugger | null): void;
    /**Init the state and start autodeleting. The client must already be logged-in for this to work. */
    init(): Promise<void>;
    /**Purge all expired message states that reached a timeout or ephemeral. */
    protected purgeExpiredStates(): Promise<void>;
    /**Transform the object-based message state key contents to a string. */
    protected transformKey(key: ODStateKey<WithGuildKey, WithUserKey>): string;
    /**Transform the message state data contents for storage in the database. */
    protected transformData(key: ODStateKey<WithGuildKey, WithUserKey>, data: StateData, isEphemeral: boolean, keepCreatedDate?: number): ODStateData<StateData>;
    /**Calculate milliseconds from a time + unit. */
    protected timeoutToUnixTime(): number | null;
    /**Set a message state using guild, channel & message id as key. Returns `true` when overwritten. */
    setMsgState(key: ODStateKey<WithGuildKey, WithUserKey>, data: StateData, isEphemeral: boolean): Promise<boolean>;
    /**Get a message state using guild, channel & message id as key. */
    getMsgState(key: ODStateKey<WithGuildKey, WithUserKey>): Promise<ODStateData<StateData> | null>;
    /**Delete a message state using guild, channel & message id as key. Returns `true` when deleted. */
    deleteMsgState(key: ODStateKey<WithGuildKey, WithUserKey>): Promise<boolean>;
    /**List all message states of this `ODState`. */
    listMsgStates(): Promise<{
        key: string;
        value: ODStateData<StateData>;
    }[]>;
    /**Delete all message states from this ODState. */
    clearAllMsgStates(): Promise<void>;
    /**Delete a message state using the raw key. Returns `true` when deleted. */
    protected deleteMsgStateWithRawKey(rawKey: string): Promise<boolean>;
}

/**## ODStateData `type`
 * The raw data template for message states used for storing in the database.
 */
declare interface ODStateData<StateData extends any> {
    /**The linked Guild ID of this message state. */
    guildId: string | null;
    /**The linked Channel ID of this message state. */
    channelId: string;
    /**The linked Message ID of this message state. */
    messageId: string;
    /**The linked User ID of this message state. */
    userId: string | null;
    /**The creation date of this state (UNIX TIMESTAMP). */
    createdDate: number;
    /**The modified date of this state (UNIX TIMESTAMP). */
    modifiedDate: number;
    /**Optional date after which this state should be regarded as expired (UNIX TIMESTAMP). */
    deleteAfterDate: number | null;
    /**The state data. */
    data: StateData;
}

/**## ODStateKey `type`
 * The key template for message states.
 */
declare type ODStateKey<WithGuildKey extends boolean, WithUserKey extends boolean> = {
    /**A valid discord channel ID or instance. */
    channel: discord.Channel | string;
    /**A valid discord message ID or instance. */
    message: discord.Message | string;
} & (WithGuildKey extends true ? {
    /**A valid discord server/guild ID or instance. */
    guild: discord.Guild | string;
} : {}) & (WithUserKey extends true ? {
    /**A valid discord user ID or instance. */
    user: discord.User | discord.GuildMember | string;
} : {});

/**## ODStateManager `class`
 * The Open Discord state manager is a system for tracking messages or linking metadata, states or progress to Discord messages (ID-based).
 *
 * Features automatic garbage collection to clear expired states.
 */
declare class ODStateManager<IdList extends ODStateManagerIdConstraint = ODStateManagerIdConstraint> extends ODManager<ODState<any, boolean, boolean>> {
    constructor(debug: ODDebugger);
    /**Init all states. */
    init(): Promise<void>;
    add(data: ODState<any, boolean, boolean>, overwrite?: boolean): boolean;
    get<StateId extends keyof ODNoGeneric<IdList>>(id: StateId): IdList[StateId];
    get(id: ODValidId): ODState<any, boolean, boolean> | null;
    remove<StateId extends keyof ODNoGeneric<IdList>>(id: StateId): IdList[StateId];
    remove(id: ODValidId): ODState<any, boolean, boolean> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODStateManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODStateManager` class.
 */
declare type ODStateManagerIdConstraint = Record<string, ODState<any, boolean, boolean>>;

/**## ODStateManagerIdMappings `interface`
 * A list of all available IDs in the default `ODStateManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODStateManagerIdMappings extends api_2.ODStateManagerIdConstraint {
    "opendiscord:interactive-message": ODInteractiveMessageState;
    "opendiscord:clear-message": ODClearMessageState;
    "opendiscord:panel-message": ODPanelMessageState;
}

/**## ODStateSettings `type`
 * Configurable settings for an ODState.
 */
declare interface ODStateSettings {
    /**(Default: `false`) Completely disable autodelete of message states. (unless manually activated using other settings) */
    disableAutodelete: boolean;
    /**(Default: `true`) Delete state on channel deletion. */
    autodeleteOnChannelDelete: boolean;
    /**(Default: `true`) Delete state on message deletion. */
    autodeleteOnMessageDelete: boolean;
    /**(Default: `true`) Delete state when the user leaves the guild/server. */
    autodeleteOnUserLeave: boolean;
    /**(Default: `false`) Delete state on bot restart. */
    autodeleteOnRestart: boolean;
    /**(Default: `true`) Delete state after 1 hour of an ephemeral message being sent. */
    autodeleteOnEphemeral: boolean;
    /**(Default: `null`) Delete state when unmodified/inactive for more than.... */
    autodeleteAfterTimeout: null | {
        time: number;
        unit: "seconds" | "minutes" | "hours" | "days";
    };
}

/**## ODStatistic `class`
 * This is an Open Discord statistic.
 *
 * This single statistic doesn't do anything except defining the rules of this statistic.
 * Use it in a statistics scope to register a new statistic. A statistic can also include a priority to choose the render priority.
 *
 * It's recommended to use the `ODBaseStatistic` & `ODDynamicStatistic` classes instead of this one!
 */
declare class ODStatistic extends ODManagerData {
    /**The priority of this statistic. */
    priority: number;
    /**The render function of this statistic. */
    render: ODStatisticRenderer;
    /**The value of this statistic. */
    value: ODValidStatisticValue | null;
    constructor(id: ODValidId, priority: number, render: ODStatisticRenderer, value?: ODValidStatisticValue);
}

/**## ODStatisticGlobalScope `class`
 * This is an Open Discord statistic global scope.
 *
 * A scope can contain multiple statistics. Every scope is seperated from other scopes.
 * Here, you can read & write the values of all statistics.
 *
 * This scope is made specifically for the global statistics of Open Discord.
 */
declare class ODStatisticGlobalScope<IdList extends ODStatisticScopeIdConstraint = ODStatisticScopeIdConstraint> extends ODStatisticScope<IdList> {
    getStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId): Promise<ODValidStatisticValue | null>;
    getStat(id: ODValidId): Promise<ODValidStatisticValue | null>;
    getAllStats<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId): Promise<{
        id: string;
        value: ODValidStatisticValue;
    }[]>;
    getAllStats(id: ODValidId): Promise<{
        id: string;
        value: ODValidStatisticValue;
    }[]>;
    setStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId, value: ODValidStatisticValue, mode: ODStatisticScopeSetMode): Promise<boolean>;
    setStat(id: ODValidId, value: ODValidStatisticValue, mode: ODStatisticScopeSetMode): Promise<boolean>;
    resetStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: ODValidId): Promise<ODValidStatisticValue | null>;
    resetStat(id: ODValidId): Promise<ODValidStatisticValue | null>;
    render(scopeId: "GLOBAL", guild: discord.Guild, channel: discord.TextBasedChannel, user: discord.User): Promise<string>;
}

/**## ODStatisticManager `class`
 * This is an Open Discord statistics manager.
 *
 * This class is responsible for managing all statistics of the bot.
 * Statistic are categorized in "scopes" which can be accessed in this manager.
 *
 * Statistic can be accessed in the individual scopes.
 */
declare class ODStatisticManager<IdList extends ODStatisticManagerIdConstraint = ODStatisticManagerIdConstraint> extends ODManager<ODStatisticScope> {
    /**Alias to Open Discord statistics database. */
    database: ODDatabase<ODDatabaseIdConstraint> | null;
    /**All the listeners for the init event. */
    protected initListeners: ODStatisticManagerInitCallback[];
    constructor(debug: ODDebugger);
    /**Select the database to use to read/write all statistics from/to. */
    useDatabase(database: ODDatabase<ODDatabaseIdConstraint>): void;
    add(data: ODStatisticScope, overwrite?: boolean): boolean;
    /**Init all statistics and run `onInit()` listeners. */
    init(): Promise<void>;
    /**Reset all statistics. (clears the entire database) */
    reset(): Promise<void>;
    /**Run a function when the statistics are initialized. This can be used to clear statistics from users that left the server or tickets which don't exist anymore. */
    onInit(callback: ODStatisticManagerInitCallback): void;
    get<ScopeId extends keyof ODNoGeneric<IdList>>(id: ScopeId): IdList[ScopeId];
    get(id: ODValidId): ODStatisticScope | null;
    remove<ScopeId extends keyof ODNoGeneric<IdList>>(id: ScopeId): IdList[ScopeId];
    remove(id: ODValidId): ODStatisticScope | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODStatisticManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODStatisticManager` class.
 */
declare type ODStatisticManagerIdConstraint = Record<string, ODStatisticScope>;

/**## ODStatisticManagerIdMappings `interface`
 * A list of all available IDs in the default `ODStatisticManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODStatisticManagerIdMappings extends api_2.ODStatisticManagerIdConstraint {
    "opendiscord:global": ODGlobalStatisticScope;
    "opendiscord:system": ODSystemStatisticScope;
    "opendiscord:user": ODUserStatisticScope;
    "opendiscord:ticket": ODTicketStatisticScope;
    "opendiscord:participants": ODParticipantsStatisticScope;
    "opendiscord:messages": ODMessagesStatisticScope;
}

/**## ODStatisticManagerInitCallback `type`
 * This callback can be used to execute something when the statistics have been initiated.
 *
 * By default this is used to clear statistics from users that left the server or tickets which don't exist anymore.
 */
declare type ODStatisticManagerInitCallback = (database: ODJsonDatabaseStructure, deletables: ODJsonDatabaseStructure) => void | Promise<void>;

/**## ODStatisticRenderer `type`
 * This callback will render a single statistic for a discord embed/message.
 */
declare type ODStatisticRenderer = (value: ODValidStatisticValue, scopeId: string, guild: discord.Guild, channel: discord.TextBasedChannel, user: discord.User) => string | Promise<string>;

/**## ODStatisticScope `class`
 * This is an Open Discord statistic scope.
 *
 * A scope can contain multiple statistics. Every scope is seperated from other scopes.
 * Here, you can read & write the values of all statistics.
 *
 * The built-in Open Discord scopes are: `global`, `user`, `ticket`
 */
declare class ODStatisticScope<IdList extends ODStatisticScopeIdConstraint = ODStatisticScopeIdConstraint> extends ODManager<ODStatistic> {
    /**The id of this statistics scope. */
    id: ODId;
    /**Is this scope already initialized? */
    ready: boolean;
    /**Alias to Open Discord statistics database. */
    database: ODDatabase<ODDatabaseIdConstraint> | null;
    /**The name of this scope (used in embed title) */
    name: string;
    constructor(id: ODValidId, name: string);
    /**Select the database to use to read/write all statistics from/to. (Automatically assigned when used in `ODStatisticManager`) */
    useDatabase(database: ODDatabase<ODDatabaseIdConstraint>): void;
    /**Get the value of a statistic. The `scopeId` is the unique id of the user, channel, role, etc that the statistics are related to. */
    getStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId, scopeId: string): Promise<ODValidStatisticValue | null>;
    getStat(id: ODValidId, scopeId: string): Promise<ODValidStatisticValue | null>;
    /**Get the value of a statistic for all `scopeId`'s. The `scopeId` is the unique id of the user, channel, role, etc that the statistics are related to. */
    getAllStats<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId): Promise<{
        id: string;
        value: ODValidStatisticValue;
    }[]>;
    getAllStats(id: ODValidId): Promise<{
        id: string;
        value: ODValidStatisticValue;
    }[]>;
    /**Set, increase or decrease the value of a statistic. The `scopeId` is the unique id of the user, channel, role, etc that the statistics are related to. */
    setStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId, scopeId: string, value: ODValidStatisticValue, mode: ODStatisticScopeSetMode): Promise<boolean>;
    setStat(id: ODValidId, scopeId: string, value: ODValidStatisticValue, mode: ODStatisticScopeSetMode): Promise<boolean>;
    /**Reset the value of a statistic to the initial value. The `scopeId` is the unique id of the user, channel, role, etc that the statistics are related to. */
    resetStat<StatisticId extends keyof ODNoGeneric<IdList>>(id: ODValidId, scopeId: string): Promise<ODValidStatisticValue | null>;
    resetStat(id: ODValidId, scopeId: string): Promise<ODValidStatisticValue | null>;
    /**Initialize this statistic scope & return a list of all statistic ids in the following format: `<scopeid>_<statid>`  */
    init(): string[];
    /**Render all statistics in this scope for usage in a discord message/embed. */
    render(scopeId: string, guild: discord.Guild, channel: discord.TextBasedChannel, user: discord.User): Promise<string>;
    get<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId): IdList[StatisticId];
    get(id: ODValidId): ODStatistic | null;
    remove<StatisticId extends keyof ODNoGeneric<IdList>>(id: StatisticId): IdList[StatisticId];
    remove(id: ODValidId): ODStatistic | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODStatisticScopeIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODStatisticScope` class.
 */
declare type ODStatisticScopeIdConstraint = Record<string, ODStatistic>;

/**## ODStatisticScopeSetMode `type`
 * This type contains all valid methods for changing the value of a statistic.
 */
declare type ODStatisticScopeSetMode = "set" | "increase" | "decrease";

/**## ODStatsDatabase `class
 * A special class with types for the Open Ticket `database/stats.json` database file
 */
declare class ODStatsDatabase extends api_2.ODFormattedJsonDatabase {
}

/**## ODSubPanelOption `class`
 * This is an Open Ticket sub-panel option.
 *
 * This class contains all data related to an Open Ticket sub-panel option (parsed from the config).
 *
 * Use this option to create a button for sub-panels!
 */
declare class ODSubPanelOption extends ODOption<ODSubPanelOptionIdMappings> {
    readonly type: "opendiscord:sub-panel";
    constructor(id: api_2.ODValidId, data: ODOptionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODOptionJson): ODSubPanelOption;
}

/**## ODSubPanelOptionIdMappings `interface`
 * A list of all available IDs in the default `ODSubPanelOption` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSubPanelOptionIdMappings extends ODOptionIdConstraint {
    "opendiscord:name": ODOptionData<string>;
    "opendiscord:description": ODOptionData<string>;
    "opendiscord:button-emoji": ODOptionData<string>;
    "opendiscord:button-label": ODOptionData<string>;
    "opendiscord:button-color": ODOptionData<api_2.ODValidButtonColor>;
    "opendiscord:panel-id": ODOptionData<string>;
}

/**## ODSystemConsoleMessage `class`
 * This is an Open Discord console system message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "SYSTEM" messages!
 */
declare class ODSystemConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODSystemError `class`
 * A wrapper for the node.js `Error` class that makes the error look better in the console!
 *
 * This wrapper is made for Open Discord system errors! **It can only be used by Open Discord itself!**
 */
declare class ODSystemError extends Error {
    /**This variable gets detected by the error handling system to know how to render it */
    readonly _ODErrorType = "system";
    /**Create an `ODSystemError` directly from an `Error` class */
    static fromError(err: Error): ODSystemError;
}

/**## ODSystemStatisticScope `class
 * A special class with types for the Open Ticket `System` statistics category/scope.
 */
declare class ODSystemStatisticScope extends api_2.ODStatisticGlobalScope<ODSystemStatisticScopeIdMappings> {
}

/**## ODSystemStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODSystemStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODSystemStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:startup-date": api_2.ODDynamicStatistic;
    "opendiscord:system-uptime": api_2.ODDynamicStatistic;
    "opendiscord:version": api_2.ODDynamicStatistic;
}

/**## ODTask `class`
 * This is an Open Discord task runner.
 *
 * Use this to execute a function just before the startup screen. (with more than 90% of the code already loaded)
 * You can also specify a priority to change the execution order.
 * In Open Ticket, this is used for the following processes:
 * - Autoclose/delete
 * - Database syncronisation (with tickets, statistics & used options)
 * - Panel auto-update
 * - Database Garbage Collection (removing tickets that don't exist anymore)
 * - And more!
 */
declare class ODTask extends ODManagerData {
    /**The priority of this task */
    priority: number;
    /**The main function of this task */
    func: () => void | Promise<void>;
    constructor(id: ODValidId, priority: number, func: () => void | Promise<void>);
}

/**## ODTaskManager `class`
 * This is an Open Discord task manager.
 *
 * It manages & executes `ODTask`'s in the correct order.
 *
 * Register functions/tasks that execute just before the startup screen. (with more than 90% of the code already loaded)
 */
declare class ODTaskManager<IdList extends ODTaskManagerIdConstraint = ODTaskManagerIdConstraint> extends ODManager<ODTask> {
    constructor(debug: ODDebugger);
    /**Execute all `ODTask` functions in order of their priority (high to low). */
    execute(): Promise<void>;
    get<TaskId extends keyof ODNoGeneric<IdList>>(id: TaskId): IdList[TaskId];
    get(id: ODValidId): ODTask | null;
    remove<TaskId extends keyof ODNoGeneric<IdList>>(id: TaskId): IdList[TaskId];
    remove(id: ODValidId): ODTask | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODTaskManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODTaskManager` class.
 */
declare type ODTaskManagerIdConstraint = Record<string, ODTask>;

/**## ODTaskManagerIdMappings `interface`
 * A list of all available IDs in the default `ODTaskManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTaskManagerIdMappings extends api_2.ODTaskManagerIdConstraint {
    "opendiscord:command-error-handling": api_2.ODTask;
    "opendiscord:start-listening-interactions": api_2.ODTask;
    "opendiscord:panel-database-cleaner": api_2.ODTask;
    "opendiscord:suffix-database-cleaner": api_2.ODTask;
    "opendiscord:option-database-cleaner": api_2.ODTask;
    "opendiscord:user-database-cleaner": api_2.ODTask;
    "opendiscord:ticket-database-cleaner": api_2.ODTask;
    "opendiscord:transcript-database-cleaner": api_2.ODTask;
    "opendiscord:panel-auto-update": api_2.ODTask;
    "opendiscord:ticket-saver": api_2.ODTask;
    "opendiscord:blacklist-saver": api_2.ODTask;
    "opendiscord:auto-role-on-join": api_2.ODTask;
    "opendiscord:autoclose-timeout": api_2.ODTask;
    "opendiscord:autoclose-leave": api_2.ODTask;
    "opendiscord:autodelete-timeout": api_2.ODTask;
    "opendiscord:autodelete-leave": api_2.ODTask;
    "opendiscord:ticket-anti-busy": api_2.ODTask;
}

/**## ODTextCommand `class`
 * This is an Open Discord text command.
 *
 * When registered, you can listen for this command using the `ODCommandResponder`. The advantages of using this class for creating a text command are:
 * - automatic option parsing (even for channels, users, roles & mentions)!
 * - automatic errors on invalid parameters
 * - error reporting to the user when the bot fails to respond
 * - plugins can extend this command
 *
 * And more!
 */
declare class ODTextCommand extends ODManagerData {
    /**The builder for this slash command. */
    builder: ODTextCommandBuilder;
    /**The name of this slash command. */
    name: string;
    constructor(id: ODValidId, builder: ODTextCommandBuilder);
}

/**## ODTextCommandBuilder `interface`
 * The builder for text commands. Here you can add options to the command.
 */
declare interface ODTextCommandBuilder {
    /**The prefix of this command */
    prefix: string;
    /**The name of this command (can include spaces for subcommands) */
    name: string;
    /**Is this command allowed in dm? */
    dmPermission?: boolean;
    /**Is this command allowed in guilds? */
    guildPermission?: boolean;
    /**When specified, only allow this command to be executed in the following guilds */
    allowedGuildIds?: string[];
    /**Are bots allowed to execute this command? */
    allowBots?: boolean;
    /**The options for this text command (like slash commands) */
    options?: ODTextCommandBuilderOption[];
}

/**## ODTextCommandBuilderBaseOption `interface`
 * The default option builder for text commands.
 */
declare interface ODTextCommandBuilderBaseOption {
    /**The name of this option */
    name: string;
    /**The type of this option */
    type: ODTextCommandBuilderBaseOptionType;
    /**Is this option required? (optional options can only exist at the end of the command!) */
    required?: boolean;
}

/**## ODTextCommandBuilderBaseOptionType `type`
 * The types available in the text command option builder.
 */
declare type ODTextCommandBuilderBaseOptionType = "string" | "number" | "boolean" | "user" | "guildmember" | "role" | "mentionable" | "channel";

/**## ODTextCommandBuilderBooleanOption `interface`
 * The boolean option builder for text commands.
 */
declare interface ODTextCommandBuilderBooleanOption extends ODTextCommandBuilderBaseOption {
    type: "boolean";
    /**The value when `true` */
    trueValue?: string;
    /**The value when `false` */
    falseValue?: string;
}

/**## ODTextCommandBuilderChannelOption `interface`
 * The channel option builder for text commands.
 */
declare interface ODTextCommandBuilderChannelOption extends ODTextCommandBuilderBaseOption {
    type: "channel";
    /**When specified, only allow the following channel types */
    channelTypes?: discord.GuildChannelType[];
}

/**## ODTextCommandBuilderGuildMemberOption `interface`
 * The guild member option builder for text commands.
 */
declare interface ODTextCommandBuilderGuildMemberOption extends ODTextCommandBuilderBaseOption {
    type: "guildmember";
}

/**## ODTextCommandBuilderMentionableOption `interface`
 * The mentionable option builder for text commands.
 */
declare interface ODTextCommandBuilderMentionableOption extends ODTextCommandBuilderBaseOption {
    type: "mentionable";
}

/**## ODTextCommandBuilderNumberOption `interface`
 * The number option builder for text commands.
 */
declare interface ODTextCommandBuilderNumberOption extends ODTextCommandBuilderBaseOption {
    type: "number";
    /**The number can't be higher than this value */
    max?: number;
    /**The number can't be lower than this value */
    min?: number;
    /**Allow the number to be negative */
    allowNegative?: boolean;
    /**Allow the number to be positive */
    allowPositive?: boolean;
    /**Allow the number to be zero */
    allowZero?: boolean;
    /**Allow a number with decimal */
    allowDecimal?: boolean;
}

/**## ODTextCommandBuilderOption `type`
 * The option builder for text commands.
 */
declare type ODTextCommandBuilderOption = (ODTextCommandBuilderStringOption | ODTextCommandBuilderBooleanOption | ODTextCommandBuilderNumberOption | ODTextCommandBuilderChannelOption | ODTextCommandBuilderRoleOption | ODTextCommandBuilderUserOption | ODTextCommandBuilderGuildMemberOption | ODTextCommandBuilderMentionableOption);

/**## ODTextCommandBuilderRoleOption `interface`
 * The role option builder for text commands.
 */
declare interface ODTextCommandBuilderRoleOption extends ODTextCommandBuilderBaseOption {
    type: "role";
}

/**## ODTextCommandBuilderStringOption `interface`
 * The string option builder for text commands.
 */
declare interface ODTextCommandBuilderStringOption extends ODTextCommandBuilderBaseOption {
    type: "string";
    /**Set the maximum length of this string */
    maxLength?: number;
    /**Set the minimum length of this string */
    minLength?: number;
    /**The string needs to match this regex or it will be invalid */
    regex?: RegExp;
    /**The string needs to match one of these choices or it will be invalid */
    choices?: string[];
    /**When this is the last option, allow this string to contain spaces */
    allowSpaces?: boolean;
}

/**## ODTextCommandBuilderUserOption `interface`
 * The user option builder for text commands.
 */
declare interface ODTextCommandBuilderUserOption extends ODTextCommandBuilderBaseOption {
    type: "user";
}

/**## ODTextCommandError `type`
 * A list of types returned for errors from a text command interaction.
 */
declare type ODTextCommandError = (ODTextCommandErrorUnknownPrefix | ODTextCommandErrorUnknownCommand | ODTextCommandErrorInvalidOption | ODTextCommandErrorMissingOption);

/**## ODTextCommandErrorBase `interface`
 * The object returned from a text command error callback.
 */
declare interface ODTextCommandErrorBase {
    /**The type of text command error */
    type: "unknown_prefix" | "unknown_command" | "invalid_option" | "missing_option";
    /**The message this error originates from */
    msg: discord.Message;
}

/**## ODTextCommandErrorCallback `type`
 * Callback for the text command error listener.
 */
declare type ODTextCommandErrorCallback = (error: ODTextCommandError) => void;

/**## ODTextCommandErrorInvalidOption `interface`
 * The object returned from a text command invalid option error callback.
 */
declare interface ODTextCommandErrorInvalidOption extends ODTextCommandErrorBase {
    type: "invalid_option";
    /**The command this error originates from */
    command: ODTextCommand;
    /**The command prefix this error originates from */
    prefix: string;
    /**The command name this error originates from (can include spaces for subcommands) */
    name: string;
    /**The option that this error originates from */
    option: ODTextCommandBuilderOption;
    /**The location that this option was found */
    location: number;
    /**The current value of this invalid option */
    value: string;
    /**The reason for this invalid option */
    reason: ODTextCommandErrorInvalidOptionReason;
}

/**## ODTextCommandErrorInvalidOptionReason `type`
 * A list of reasons for the invalid_option error to be thrown.
 */
declare type ODTextCommandErrorInvalidOptionReason = ("boolean" | "number_max" | "number_min" | "number_decimal" | "number_negative" | "number_positive" | "number_zero" | "number_invalid" | "string_max_length" | "string_min_length" | "string_regex" | "string_choice" | "not_in_guild" | "channel_not_found" | "channel_type" | "user_not_found" | "member_not_found" | "role_not_found" | "mentionable_not_found");

/**## ODTextCommandErrorMissingOption `interface`
 * The object returned from a text command missing option error callback.
 */
declare interface ODTextCommandErrorMissingOption extends ODTextCommandErrorBase {
    type: "missing_option";
    /**The command this error originates from */
    command: ODTextCommand;
    /**The command prefix this error originates from */
    prefix: string;
    /**The command name this error originates from (can include spaces for subcommands) */
    name: string;
    /**The option that this error originates from */
    option: ODTextCommandBuilderOption;
    /**The location that this option was found */
    location: number;
}

/**## ODTextCommandErrorUnknownCommand `interface`
 * The object returned from a text command unknown command error callback.
 */
declare interface ODTextCommandErrorUnknownCommand extends ODTextCommandErrorBase {
    type: "unknown_command";
}

/**## ODTextCommandErrorUnknownPrefix `interface`
 * The object returned from a text command unknown prefix error callback.
 */
declare interface ODTextCommandErrorUnknownPrefix extends ODTextCommandErrorBase {
    type: "unknown_prefix";
}

/**## ODTextCommandInteractionCallback `type`
 * Callback for the text command interaction listener.
 */
declare type ODTextCommandInteractionCallback = (msg: discord.Message, cmd: ODTextCommand, options: ODTextCommandInteractionOption[]) => void;

/**## ODTextCommandInteractionOption `type`
 * A list of types returned for options from a text command interaction.
 */
declare type ODTextCommandInteractionOption = (ODTextCommandInteractionOptionBase<"string", string> | ODTextCommandInteractionOptionBase<"number", number> | ODTextCommandInteractionOptionBase<"boolean", boolean> | ODTextCommandInteractionOptionBase<"channel", discord.GuildBasedChannel> | ODTextCommandInteractionOptionBase<"role", discord.Role> | ODTextCommandInteractionOptionBase<"user", discord.User> | ODTextCommandInteractionOptionBase<"guildmember", discord.GuildMember> | ODTextCommandInteractionOptionBase<"mentionable", discord.Role | discord.User>);

/**## ODTextCommandInteractionOptionBase `interface`
 * The object returned for options from a text command interaction.
 */
declare interface ODTextCommandInteractionOptionBase<Name, Type> {
    /**The name of this option */
    name: string;
    /**The type of this option */
    type: Name;
    /**The value of this option */
    value: Type;
}

/**## ODTextCommandManager `class`
 * This is an Open Discord client text manager.
 *
 * It's responsible for managing all the text commands from the client.
 *
 * Here, you can add & remove text commands & the bot will do the (de)registering.
 */
declare class ODTextCommandManager<IdList extends ODTextCommandManagerIdConstraint = ODTextCommandManagerIdConstraint> extends ODManager<ODTextCommand> {
    /**Copy of discord.js client. */
    protected client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>;
    /**Collection of all interaction listeners. */
    protected interactionListeners: {
        prefix: string;
        name: string | RegExp;
        callback: ODTextCommandInteractionCallback;
    }[];
    /**Collection of all error listeners. */
    protected errorListeners: ODTextCommandErrorCallback[];
    /**Set the soft limit for maximum amount of listeners. A warning will be shown when there are more listeners than this limit. */
    listenerLimit: number;
    constructor(debug: ODDebugger, client: ODClientManager<ODSlashCommandManagerIdConstraint, ODTextCommandManagerIdConstraint, ODContextMenuManagerIdConstraint>);
    private checkMessage;
    /**Check if all options of a command are correct. */
    private checkOptions;
    /**Start listening to the discord.js client `messageCreate` event. */
    startListeningToInteractions(): void;
    /**Check if optional values are only present at the end of the command. */
    private checkBuilderOptions;
    /**Callback on interaction from one of the registered text commands */
    onInteraction(commandPrefix: string, commandName: keyof ODNoGeneric<IdList>, callback: ODTextCommandInteractionCallback): void;
    onInteraction(commandPrefix: string, commandName: string | RegExp, callback: ODTextCommandInteractionCallback): void;
    /**Callback on error from all the registered text commands */
    onError(callback: ODTextCommandErrorCallback): void;
    get<TextCommandId extends keyof ODNoGeneric<IdList>>(id: TextCommandId): IdList[TextCommandId];
    get(id: ODValidId): ODTextCommand | null;
    remove<TextCommandId extends keyof ODNoGeneric<IdList>>(id: TextCommandId): IdList[TextCommandId];
    remove(id: ODValidId): ODTextCommand | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
    add(data: ODTextCommand, overwrite?: boolean): boolean;
}

/**## ODTextCommandManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODTextCommandManager` class.
 */
declare type ODTextCommandManagerIdConstraint = Record<string, ODTextCommand>;

/**## ODTextCommandManagerIdMappings `interface`
 * A list of all available IDs in the default `ODTextCommandManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTextCommandManagerIdMappings extends api_2.ODTextCommandManagerIdConstraint {
    "opendiscord:dump": api_2.ODTextCommand;
    "opendiscord:help": api_2.ODTextCommand;
    "opendiscord:panel": api_2.ODTextCommand;
    "opendiscord:close": api_2.ODTextCommand;
    "opendiscord:delete": api_2.ODTextCommand;
    "opendiscord:reopen": api_2.ODTextCommand;
    "opendiscord:claim": api_2.ODTextCommand;
    "opendiscord:unclaim": api_2.ODTextCommand;
    "opendiscord:pin": api_2.ODTextCommand;
    "opendiscord:unpin": api_2.ODTextCommand;
    "opendiscord:move": api_2.ODTextCommand;
    "opendiscord:rename": api_2.ODTextCommand;
    "opendiscord:add": api_2.ODTextCommand;
    "opendiscord:remove": api_2.ODTextCommand;
    "opendiscord:blacklist-view": api_2.ODTextCommand;
    "opendiscord:blacklist-add": api_2.ODTextCommand;
    "opendiscord:blacklist-remove": api_2.ODTextCommand;
    "opendiscord:blacklist-get": api_2.ODTextCommand;
    "opendiscord:stats-global": api_2.ODTextCommand;
    "opendiscord:stats-reset": api_2.ODTextCommand;
    "opendiscord:stats-ticket": api_2.ODTextCommand;
    "opendiscord:stats-user": api_2.ODTextCommand;
    "opendiscord:clear": api_2.ODTextCommand;
    "opendiscord:autoclose-disable": api_2.ODTextCommand;
    "opendiscord:autoclose-enable": api_2.ODTextCommand;
    "opendiscord:autodelete-disable": api_2.ODTextCommand;
    "opendiscord:autodelete-enable": api_2.ODTextCommand;
    "opendiscord:topic-set": api_2.ODTextCommand;
    "opendiscord:priority-set": api_2.ODTextCommand;
    "opendiscord:priority-get": api_2.ODTextCommand;
    "opendiscord:transfer": api_2.ODTextCommand;
    "opendiscord:transcripts": api_2.ODTextCommand;
}

/**## ODTextComponent `class`
 * A text component which renders markdown text in a message.
 */
declare class ODTextComponent extends ODComponent<ODTextComponentData, discord.TextDisplayBuilder> {
    constructor(id: ODValidId, data: Partial<ODTextComponentData>);
    build(): Promise<discord.TextDisplayBuilder>;
    /**Set the text to display. */
    setContent(value: string): this;
}

/**## ODTextComponentData `type`
 * The configurable settings/options for the `ODTextComponent`.
 */
declare interface ODTextComponentData {
    /**The text to display. */
    content: string;
}

/**## ODTextDisplayQuestion `class`
 * An Open Ticket text-display question. It contains all config properties of the text-display question type.
 */
declare class ODTextDisplayQuestion extends ODQuestion<ODTextDisplayQuestionIdMappings> {
    readonly type: "opendiscord:text-display";
    constructor(id: api_2.ODValidId, data: ODQuestionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODQuestionJson): ODTextDisplayQuestion;
}

/**## ODTextDisplayQuestionIdMappings `interface`
 * A list of all available IDs in the default `ODTextDisplayQuestion` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTextDisplayQuestionIdMappings extends ODQuestionIdConstraint {
    "opendiscord:text-contents": ODQuestionData<string>;
}

/**## ODThumbnailComponent `class`
 * A thumbnail component which renders a small image as an accessory inside an `ODSectionComponent`.
 * This component must be used via `ODSectionComponent.setComponent()`
 */
declare class ODThumbnailComponent extends ODComponent<ODThumbnailComponentData, discord.ThumbnailBuilder> {
    constructor(id: ODValidId, data: Partial<ODThumbnailComponentData>);
    build(): Promise<discord.ThumbnailBuilder>;
    /**Set the URL of the thumbnail image. */
    setUrl(value: string): this;
    /**Set the alt text/description of the thumbnail image. */
    setDescription(value: string | null): this;
    /**Mark the thumbnail as a spoiler. */
    setSpoiler(value: boolean): this;
}

/**## ODThumbnailComponentData `type`
 * The configurable settings/options for the `ODThumbnailComponent`.
 */
declare interface ODThumbnailComponentData {
    /**The URL of the thumbnail image. Can be an external URL or `attachment://filename.ext`. */
    url: string;
    /**The alt text/description of the thumbnail image. */
    description?: string;
    /**Should this thumbnail be marked as a spoiler? */
    spoiler?: boolean;
}

/**## ODTicket `class`
 * This is an Open Ticket ticket.
 *
 * This class contains all data related to this ticket (parsed from the database).
 *
 * These properties contain the current state of the ticket & are used by actions like claiming, pinning, closing, ...
 */
declare class ODTicket extends api_2.ODManager<ODTicketData<api_2.ODValidJsonType>> {
    /**The id of this ticket. (discord channel id) */
    id: api_2.ODId;
    /**The option this ticket is made of. */
    private rawOption;
    constructor(id: api_2.ODValidId, option: ODTicketOption, data: ODTicketData<api_2.ODValidJsonType>[]);
    /**The option this ticket is made of. */
    set option(option: ODTicketOption);
    get option(): ODTicketOption;
    /**Convert this ticket to a JSON object for storing this ticket in the database. */
    toJson(version: api_2.ODVersion): ODTicketJson;
    /**Create a ticket from a JSON object in the database. */
    static fromJson(json: ODTicketJson, option: ODTicketOption): ODTicket;
    get<OptionId extends keyof api_2.ODNoGeneric<ODTicketIdMappings>>(id: OptionId): ODTicketIdMappings[OptionId];
    get(id: api_2.ODValidId): ODTicketData<api_2.ODValidJsonType> | null;
    remove<OptionId extends keyof api_2.ODNoGeneric<ODTicketIdMappings>>(id: OptionId): ODTicketIdMappings[OptionId];
    remove(id: api_2.ODValidId): ODTicketData<api_2.ODValidJsonType> | null;
    exists(id: keyof api_2.ODNoGeneric<ODTicketIdMappings>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODTicketClearFilter `type`
 * This type contains all possible "clear filters" for the `/clear` command.
 */
declare type ODTicketClearFilter = "all" | "open" | "closed" | "claimed" | "unclaimed" | "pinned" | "unpinned" | "autoclosed";

/**## ODTicketData `class`
 * This is Open Ticket ticket data.
 *
 * This class contains a single property for a ticket. (string, number, boolean, object, array, null)
 *
 * When this property is edited, the database will be updated automatically.
 */
declare class ODTicketData<DataType extends api_2.ODValidJsonType> extends api_2.ODManagerData {
    /**The value of this property. */
    private rawValue;
    constructor(id: api_2.ODValidId, value: DataType);
    /**The value of this property. */
    set value(value: DataType);
    get value(): DataType;
    /**Refresh the database. Is only required to be used when updating `ODTicketData` with an object/array as value. */
    refreshDatabase(): void;
}

/**## ODTicketDataJson `interface`
 * The JSON representatation from a single ticket property.
 */
declare interface ODTicketDataJson {
    /**The id of this property. */
    id: string;
    /**The value of this property. */
    value: api_2.ODValidJsonType;
}

/**## ODTicketIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODTicket` class.
 */
declare type ODTicketIdConstraint = Record<string, ODTicketData<api_2.ODValidJsonType>>;

/**## ODTicketIdMappings `interface`
 * A list of all available IDs in the default `ODTicket` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTicketIdMappings extends ODTicketIdConstraint {
    "opendiscord:busy": ODTicketData<boolean>;
    "opendiscord:ticket-message": ODTicketData<string | null>;
    "opendiscord:participants": ODTicketData<{
        type: "role" | "user";
        id: string;
    }[]>;
    "opendiscord:channel-suffix": ODTicketData<string>;
    "opendiscord:channel-renamed": ODTicketData<string | null>;
    "opendiscord:previous-creators": ODTicketData<string[]>;
    "opendiscord:open": ODTicketData<boolean>;
    "opendiscord:opened-by": ODTicketData<string | null>;
    "opendiscord:opened-on": ODTicketData<number | null>;
    "opendiscord:closed": ODTicketData<boolean>;
    "opendiscord:closed-by": ODTicketData<string | null>;
    "opendiscord:closed-on": ODTicketData<number | null>;
    "opendiscord:reopened": ODTicketData<boolean>;
    "opendiscord:reopened-by": ODTicketData<string | null>;
    "opendiscord:reopened-on": ODTicketData<number | null>;
    "opendiscord:claimed": ODTicketData<boolean>;
    "opendiscord:claimed-by": ODTicketData<string | null>;
    "opendiscord:claimed-on": ODTicketData<number | null>;
    "opendiscord:pinned": ODTicketData<boolean>;
    "opendiscord:pinned-by": ODTicketData<string | null>;
    "opendiscord:pinned-on": ODTicketData<number | null>;
    "opendiscord:for-deletion": ODTicketData<boolean>;
    "opendiscord:category": ODTicketData<string | null>;
    "opendiscord:category-mode": ODTicketData<string | null>;
    "opendiscord:autoclose-enabled": ODTicketData<boolean>;
    "opendiscord:autoclose-hours": ODTicketData<number>;
    "opendiscord:autoclosed": ODTicketData<boolean>;
    "opendiscord:autodelete-enabled": ODTicketData<boolean>;
    "opendiscord:autodelete-days": ODTicketData<number>;
    "opendiscord:answers": ODTicketData<ODQuestionAnswer[]>;
    "opendiscord:priority": ODTicketData<number>;
    "opendiscord:topic": ODTicketData<string>;
    "opendiscord:message-sent": ODTicketData<boolean>;
    "opendiscord:admin-message-sent": ODTicketData<boolean>;
}

/**## ODTicketDataJson `interface`
 * The JSON representatation from a single ticket.
 */
declare interface ODTicketJson {
    /**The id of this ticket. */
    id: string;
    /**The option id related to this ticket. */
    option: string;
    /**The version of Open Ticket used to create this ticket. */
    version: string;
    /**The full list of properties/variables related to this ticket. */
    data: ODTicketDataJson[];
}

/**## ODTicketManager `class`
 * This is an Open Ticket ticket manager.
 *
 * This class manages all currently created tickets in the bot.
 *
 * All tickets which are added, removed or modified in this manager will be updated automatically in the database.
 */
declare class ODTicketManager extends api_2.ODManager<ODTicket> {
    /**A reference to the main server of the bot */
    private guild;
    /**A reference to the Open Ticket client manager. */
    private client;
    constructor(debug: api_2.ODDebugger, client: api_2.ODClientManager);
    add(data: ODTicket, overwrite?: boolean): boolean;
    /**Use a specific guild in this class for fetching the channel*/
    useGuild(guild: discord.Guild | null): void;
    /**Get the discord channel for a specific ticket. */
    getTicketChannel(ticket: ODTicket): Promise<discord.GuildTextBasedChannel | null>;
    /**Get the main ticket message of a ticket channel when found. */
    getTicketMessage(ticket: ODTicket): Promise<discord.Message<true> | null>;
    /**Shortcut for getting a discord.js user within a ticket. */
    getTicketUser(ticket: ODTicket, user: "creator" | "closer" | "claimer" | "pinner"): Promise<discord.User | null>;
    /**Shortcut for getting all users that are able to view a ticket. */
    getAllTicketParticipants(ticket: ODTicket): Promise<{
        user: discord.User;
        role: "creator" | "participant" | "admin";
    }[] | null>;
}

/**## ODTicketOption `class`
 * This is an Open Ticket ticket option.
 *
 * This class contains all data related to an Open Ticket ticket option (parsed from the config).
 *
 * Use this option to create a new ticket!
 */
declare class ODTicketOption extends ODOption<ODTicketOptionIdMappings> {
    readonly type: "opendiscord:ticket";
    constructor(id: api_2.ODValidId, data: ODOptionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODOptionJson): ODTicketOption;
}

/**## ODTicketOptionIdMappings `interface`
 * A list of all available IDs in the default `ODTicketOption` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTicketOptionIdMappings extends ODOptionIdConstraint {
    "opendiscord:name": ODOptionData<string>;
    "opendiscord:description": ODOptionData<string>;
    "opendiscord:button-emoji": ODOptionData<string>;
    "opendiscord:button-label": ODOptionData<string>;
    "opendiscord:button-color": ODOptionData<api_2.ODValidButtonColor>;
    "opendiscord:admins": ODOptionData<string[]>;
    "opendiscord:admins-readonly": ODOptionData<string[]>;
    "opendiscord:allow-blacklisted-users": ODOptionData<boolean>;
    "opendiscord:questions": ODOptionData<string[]>;
    "opendiscord:channel-prefix": ODOptionData<string>;
    "opendiscord:channel-suffix": ODOptionData<"user-name" | "user-nickname" | "user-id" | "random-number" | "random-hex" | "counter-dynamic" | "counter-fixed">;
    "opendiscord:channel-category": ODOptionData<string>;
    "opendiscord:channel-topic": ODOptionData<string>;
    "opendiscord:dm-message-enabled": ODOptionData<boolean>;
    "opendiscord:dm-message-text": ODOptionData<string>;
    "opendiscord:dm-message-embed": ODOptionData<ODOptionsJsonConfig_TicketOptionEmbedSettings>;
    "opendiscord:ticket-message-enabled": ODOptionData<boolean>;
    "opendiscord:ticket-message-text": ODOptionData<string>;
    "opendiscord:ticket-message-embed": ODOptionData<ODOptionsJsonConfig_TicketOptionEmbedSettings>;
    "opendiscord:ticket-message-ping": ODOptionData<ODOptionsJsonConfig_TicketOptionPingSettings>;
    "opendiscord:autoclose-enable-hours": ODOptionData<boolean>;
    "opendiscord:autoclose-enable-leave": ODOptionData<boolean>;
    "opendiscord:autoclose-disable-claim": ODOptionData<boolean>;
    "opendiscord:autoclose-hours": ODOptionData<number>;
    "opendiscord:autodelete-enable-days": ODOptionData<boolean>;
    "opendiscord:autodelete-enable-leave": ODOptionData<boolean>;
    "opendiscord:autodelete-disable-claim": ODOptionData<boolean>;
    "opendiscord:autodelete-days": ODOptionData<number>;
    "opendiscord:cooldown-enabled": ODOptionData<boolean>;
    "opendiscord:cooldown-minutes": ODOptionData<number>;
    "opendiscord:limits-enabled": ODOptionData<boolean>;
    "opendiscord:limits-maximum-global": ODOptionData<number>;
    "opendiscord:limits-maximum-user": ODOptionData<number>;
    "opendiscord:slowmode-enabled": ODOptionData<boolean>;
    "opendiscord:slowmode-seconds": ODOptionData<number>;
}

/**## ODTicketsDatabase `class
 * A special class with types for the Open Ticket `database/tickets.json` database file
 */
declare class ODTicketsDatabase extends api_2.ODFormattedJsonDatabase<ODTicketsDatabaseIdMappings> {
}

/**## ODTicketsDatabaseIdMappings `interface`
 * A list of all available IDs in the default `ODTicketsDatabase` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTicketsDatabaseIdMappings extends api_2.ODDatabaseIdConstraint {
    "opendiscord:ticket": ODTicketJson;
}

/**## ODTicketStatisticScope `class
 * A special class with types for the Open Ticket `Ticket` statistics category/scope.
 */
declare class ODTicketStatisticScope extends api_2.ODStatisticScope<ODTicketStatisticScopeIdMappings> {
}

/**## ODTicketStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODTicketStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTicketStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:name": api_2.ODDynamicStatistic;
    "opendiscord:status": api_2.ODDynamicStatistic;
    "opendiscord:claimed": api_2.ODDynamicStatistic;
    "opendiscord:pinned": api_2.ODDynamicStatistic;
    "opendiscord:creation-date": api_2.ODDynamicStatistic;
    "opendiscord:creator": api_2.ODDynamicStatistic;
    "opendiscord:ticket-age": api_2.ODDynamicStatistic;
    "opendiscord:response-time": api_2.ODDynamicStatistic;
    "opendiscord:resolution-time": api_2.ODDynamicStatistic;
}

/**## ODTimedProgressBar `class`
 * This is an Open Discord timed console progress bar.
 *
 * It is used to create a simple timed progress bar in the console.
 * You can set a fixed duration (milliseconds) in the constructor.
 */
declare class ODTimedProgressBar extends ODProgressBar {
    /**The time in milliseconds. */
    time: number;
    /**The mode of the timer. */
    mode: "increasing" | "decreasing";
    constructor(id: ODValidId, renderer: ODProgressBarRenderer<{}>, time: number, mode: "increasing" | "decreasing", prefix: string | null, suffix: string | null);
    /**The timer which is used. */
    private timer;
    /**Run the timed progress bar. */
    private execute;
    start(): boolean;
}

/**## ODTimeoutCooldown `class`
 * This is an Open Discord timeout cooldown.
 *
 * It is a cooldown based on a timer. When triggered/updated, the cooldown is activated for the set amount of time.
 * After the timer has timed out, the cooldown will be deleted.
 */
declare class ODTimeoutCooldown extends ODCooldown<{
    date: number;
}> {
    /**The amount of milliseconds before the cooldown times-out */
    timeoutMs: number;
    constructor(id: ODValidId, timeoutMs: number);
    use(id: string): boolean;
    check(id: string): boolean;
    delete(id: string): void;
    /**Get the remaining amount of milliseconds before the timeout stops. */
    remaining(id: string): number | null;
    init(): Promise<void>;
}

/**## ODTranscriptButtonComponentData `interface`
 * A universal representatation of a discord message button for transcripts.
 */
declare interface ODTranscriptButtonComponentData extends ODTranscriptComponentData {
    /**The type of this component. */
    type: "button";
    /**The label of this button. */
    label: string | null;
    /**The emoji of this button. */
    emoji: ODTranscriptEmojiData | null;
    /**The color of this button. */
    color: api_2.ODValidButtonColor;
    /**Is this button a url or button? */
    mode: "url" | "button";
    /**The url of this button. */
    url: string | null;
}

/**## ODTranscriptCollector `class`
 * This is an Open Ticket transcript collector.
 *
 * The only goal of this class is to collect & parse all messages from a ticket channel.
 *
 * It also contains utility functions for counting all messages, calculating file sizes & more!
 */
declare class ODTranscriptCollector {
    /**Alias for the ticket manager. */
    private tickets;
    /**Alias for the client manager. */
    private client;
    /**Alias for the permissions manager. */
    private permissions;
    constructor(tickets: ODTicketManager, client: api_2.ODClientManager, permissions: api_2.ODPermissionManager);
    /**Collect all messages from a given ticket channel. It may not include all messages depending on the ratelimit. */
    collectAllMessages(ticket: ODTicket, include?: ODTranscriptCollectorIncludeSettings): Promise<discord.Message<true>[] | null>;
    /**Count all messages from a given ticket channel. It may not include all messages depending on the ratelimit. */
    countAllMessages(ticket: ODTicket, include?: ODTranscriptCollectorIncludeSettings): Promise<number | null>;
    /**Convert an array of discord messages to an array of `ODTranscriptMessageData`'s. This is used to simplify the process of the transcript compilers. */
    convertMessagesToTranscriptData(messages: discord.Message<true>[]): Promise<ODTranscriptMessageData[]>;
    /**Calculate a human-readable file size. Used in transcripts. */
    calculateFileSize(bytes: number): {
        size: number;
        unit: "B" | "KB" | "MB" | "GB" | "TB";
    };
    /**Get the `ODTranscriptEmojiData` from a discord.js component emoji. */
    private handleComponentEmoji;
    /**Create the `ODValidButtonColor` from the discord.js button style. */
    private handleButtonComponentStyle;
    /**Create the `ODTranscriptUserData` from a discord.js user. */
    private handleUserData;
    /**Analyse the ticket for the amount of messages users & admins have sent in the ticket. */
    ticketUserMessagesAnalysis(ticket: ODTicket, guild: discord.Guild, channel: discord.GuildTextBasedChannel): Promise<{
        userMessages: number;
        adminMessages: number;
        totalMessages: number;
    } | null>;
}

/**## ODTranscriptCollectorIncludeSettings `interface`
 * Additional settings for the `ODTranscriptCollector`
 */
declare interface ODTranscriptCollectorIncludeSettings {
    /**Collect messages from normal discord users. */
    users: boolean;
    /**Collect messages from bots & system users. */
    bots: boolean;
    /**Collect messages from this bot. */
    client: boolean;
}

/**## ODTranscriptCompiler `class`
 * This is an Open Ticket transcript compiler.
 *
 * This class manages all functions to generate a transcript.
 *
 * These functions should be defined when creating this compiler. Existing compilers already exist for html & text transcripts.
 */
declare class ODTranscriptCompiler<Data extends object, InitData extends (object | null)> extends api_2.ODManagerData {
    init: ODTranscriptCompilerInitFunction<InitData> | null;
    compile: ODTranscriptCompilerCompileFunction<Data, InitData> | null;
    ready: ODTranscriptCompilerReadyFunction<Data> | null;
    constructor(id: api_2.ODValidId, init?: ODTranscriptCompilerInitFunction<InitData>, compile?: ODTranscriptCompilerCompileFunction<Data, InitData>, ready?: ODTranscriptCompilerReadyFunction<Data> | null);
}

/**## ODTranscriptCompilerCompileFunction `type`
 * This function will generate/compile the transcript itself.
 */
declare type ODTranscriptCompilerCompileFunction<Data extends object, InitData extends object | null> = (ticket: ODTicket, channel: discord.TextChannel, user: discord.User, initData: InitData) => ODTranscriptCompilerCompileResult<Data> | Promise<ODTranscriptCompilerCompileResult<Data>>;

/**## ODTranscriptCompilerCompileResult `interface`
 * This is the result which is returned by the `compile()` function.
 */
declare interface ODTranscriptCompilerCompileResult<Data extends object> {
    /**The ticket this transcript is being created for. */
    ticket: ODTicket;
    /**The channel this transcript is being created for. */
    channel: discord.TextChannel;
    /**The user who created the transcript. */
    user: discord.User;
    /**Was the compilation successfull? */
    success: boolean;
    /**When not successfull, what was the reason? This will also be shown to the user. */
    errorReason: string | null;
    /**A list of all messages sent in the ticket channel. */
    messages: ODTranscriptMessageData[] | null;
    /**The result returned by the `compiler()` function. Contains the transcript contents, url or something else. */
    data: Data | null;
}

/**## ODTranscriptCompilerInitFunction `type`
 * This function will initiate/prepare the transcript system for an incoming transcript.
 */
declare type ODTranscriptCompilerInitFunction<InitData extends object | null> = (ticket: ODTicket, channel: discord.TextChannel, user: discord.User) => (ODTranscriptCompilerInitResult<InitData>) | Promise<ODTranscriptCompilerInitResult<InitData>>;

/**## ODTranscriptCompilerInitResult `interface`
 * This is the result which is returned by the `init()` function.
 */
declare interface ODTranscriptCompilerInitResult<InitData extends object | null> {
    /**Was the initialization successfull? */
    success: boolean;
    /**When not successfull, what was the reason? This will also be shown to the user. */
    errorReason: string | null;
    /**An optional message which will be sent while the transcript is being generated. */
    pendingMessage: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult | null;
    /**An optional object containing data from the init() function which can be used in the compiler. */
    initData: InitData;
}

/**## ODTicketClearFilter `type`
 * This function will finish, clear-up & shut-down the transcript system. This will also initiate the sending of the messages to all recipients.
 */
declare type ODTranscriptCompilerReadyFunction<Data extends object> = (result: ODTranscriptCompilerCompileResult<Data>) => ODTranscriptCompilerReadyResult | Promise<ODTranscriptCompilerReadyResult>;

/**## ODTranscriptCompilerReadyResult `interface`
 * This is the result which is returned by the `ready()` function.
 */
declare interface ODTranscriptCompilerReadyResult {
    /**The message to be sent in the specified channel in the server. */
    channelMessage?: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult;
    /**The message to be sent to the DM of the ticket creator. */
    creatorDmMessage?: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult;
    /**The message to be sent to the DM of all participants. */
    participantDmMessage?: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult;
    /**The message to be sent to the DM of all admins who actively participated in the ticket. */
    activeAdminDmMessage?: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult;
    /**The message to be sent to the DM of all admins who were assigned to this ticket. */
    everyAdminDmMessage?: api_2.ODMessageBuildResult | api_2.ODMessageComponentBuildResult;
}

/**## ODTranscriptComponentData `interface`
 * A universal representatation of a discord message action row component for transcripts.
 */
declare interface ODTranscriptComponentData {
    /**The custom id of this component. */
    id: string | null;
    /**Is this component disabled? */
    disabled: boolean;
    /**The type of this component. */
    type: "button" | "dropdown";
}

/**## ODTranscriptComponentRowData `interface`
 * A universal representatation of a discord message action row for transcripts.
 */
declare interface ODTranscriptComponentRowData {
    /**All components (buttons & dropdowns) present in this action row. */
    components: (ODTranscriptButtonComponentData | ODTranscriptDropdownComponentData)[];
}

/**## ODTranscriptDropdownComponentData `interface`
 * A universal representatation of a discord message dropdown for transcripts.
 */
declare interface ODTranscriptDropdownComponentData extends ODTranscriptComponentData {
    /**The type of this component. */
    type: "dropdown";
    /**The placeholder in this dropdown. */
    placeholder: string | null;
    /**All options available in this dropdown. */
    options: ODTranscriptDropdownComponentOptionData[];
}

/**## ODTranscriptDropdownComponentOptionData `interface`
 * A universal representatation of a discord message dropdown option for transcripts.
 */
declare interface ODTranscriptDropdownComponentOptionData {
    /**The custom id of this dropdown option. */
    id: string;
    /**The label of this dropdown option. */
    label: string | null;
    /**The description of this dropdown option. */
    description: string | null;
    /**The emoji of this dropdown option. */
    emoji: ODTranscriptEmojiData | null;
}

/**## ODTranscriptEmbedData `interface`
 * A universal representatation of a discord embed for transcripts.
 */
declare interface ODTranscriptEmbedData {
    /**The title of this embed. */
    title: string | null;
    /**The description of this embed. */
    description: string | null;
    /**The author image of this embed. */
    authorimg: string | null;
    /**The author text of this embed. */
    authortext: string | null;
    /**The footer image of this embed. */
    footerimg: string | null;
    /**The footer text of this embed. */
    footertext: string | null;
    /**The color of this embed (hex color). */
    color: discord.HexColorString;
    /**The image of this embed. */
    image: string | null;
    /**The thumbnail of this embed. */
    thumbnail: string | null;
    /**The url in the title of this embed. */
    url: string | null;
    /**All fields available in this embed. */
    fields: ODTranscriptEmbedFieldData[];
}

/**## ODTranscriptEmbedFieldData `interface`
 * A universal representatation of a discord embed field for transcripts.
 */
declare interface ODTranscriptEmbedFieldData {
    /**The name of this embed field. */
    name: string;
    /**The value or contents of this embed field. */
    value: string;
    /**Is this field rendered inline? */
    inline: boolean;
}

/**## ODTranscriptEmojiData `interface`
 * A universal representatation of a discord emoji for transcripts.
 */
declare interface ODTranscriptEmojiData {
    /**The id of this emoji. */
    id: string | null;
    /**The name of this emoji. */
    name: string | null;
    /**Is this emoji animated? */
    animated: boolean;
    /**Is this a custom emoji (img/gif)? */
    custom: boolean;
    /**The url or emoji. */
    emoji: string;
}

/**## ODTranscriptFileData `interface`
 * A universal representatation of a discord message attachment for transcripts.
 */
declare interface ODTranscriptFileData {
    /**The file type or extension. */
    type: string;
    /**The size of this file. */
    size: number;
    /**The unit used for the size of this file. */
    unit: "B" | "KB" | "MB" | "GB" | "TB";
    /**The name of this file. */
    name: string;
    /**The url of this file. */
    url: string;
    /**Is this file a spoiler? */
    spoiler: boolean;
    /**The alternative text for this file. */
    alt: string | null;
}

/**## ODTranscriptHistoryData `interface`
 * The transcript data stored in the transcripts database of deleted tickets.
 */
declare interface ODTranscriptHistoryData {
    ticketId: string;
    ticketName: string;
    ticketCreatorId: string;
    ticketCreatedDate: number | null;
    ticketDeletedDate: number | null;
    transcriptType: "localContents" | "remoteUrl";
    transcriptContents: string | null;
    transcriptUrl: string | null;
}

/**## ODTranscriptHtmlV2Data `interface`
 * The structure of the data sent to the Open Ticket HTML Transcripts v2 API.
 */
declare interface ODTranscriptHtmlV2Data {
    version: "2.1";
    otversion: string;
    language: string;
    style: {
        background: {
            enableCustomBackground: boolean;
            backgroundModus: "color" | "image";
            backgroundData: string;
        };
        header: {
            enableCustomHeader: boolean;
            decoColor: string;
            backgroundColor: string;
            textColor: string;
        };
        stats: {
            enableCustomStats: boolean;
            backgroundColor: string;
            keyTextColor: string;
            valueTextColor: string;
            hideBackgroundColor: string;
            hideTextColor: string;
        };
        favicon: {
            enableCustomFavicon: boolean;
            imageUrl: string;
        };
    };
    bot: {
        name: string;
        id: string;
        pfp: string;
    };
    ticket: {
        name: string;
        id: string;
        guildname: string;
        guildid: string;
        guildinvite: string | false;
        createdname: string | false;
        createdid: string | false;
        closedname: string | false;
        closedid: string | false;
        claimedname: string | false;
        claimedid: string | false;
        pinnedname: string | false;
        pinnedid: string | false;
        deletedname: string | false;
        deletedid: string | false;
        createdpfp: string | false;
        closedpfp: string | false;
        claimedpfp: string | false;
        pinnedpfp: string | false;
        deletedpfp: string | false;
        createdtime: number | false;
        closedtime: number | false;
        claimedtime: number | false;
        pinnedtime: number | false;
        deletedtime: number | false;
        components: {
            messages: number;
            files: number;
            embeds: number;
            reactions: number;
            interactions: {
                dropdowns: number;
                buttons: number;
                total: number;
            };
            attachments: {
                invites: number;
                images: number;
                gifs: number;
                stickers: number;
            };
        };
        roleColors: {
            id: string;
            color: string;
        }[];
    };
    messages: {
        author: {
            name: string;
            id: string;
            color: string;
            pfp: string;
            bot: boolean;
            verifiedBot: boolean;
            system: boolean;
        };
        content: string | false;
        timestamp: number;
        type: "normal";
        important: boolean;
        edited: boolean;
        embeds: {
            title: string | false;
            description: string | false;
            authorimg: string | false;
            authortext: string | false;
            footerimg: string | false;
            footertext: string | false;
            color: string;
            image: string | false;
            thumbnail: string | false;
            url: string | false;
            fields: {
                name: string;
                value: string;
                inline: boolean;
            }[];
        }[];
        attachments: ({
            type: "FILE";
            name: string;
            fileType: string;
            size: string;
            url: string;
        } | {
            type: "FILE:image";
            name: string;
            fileType: string;
            size: string;
            url: string;
        } | {
            type: "URL:invite";
            guildId: string;
            guildName: string;
            guildSize: number;
            guildOnline: number;
            image: string;
            url: string;
        } | {
            type: "URL:gif";
            url: string;
        } | {
            type: "BUILDIN:sticker";
            name: string;
            url: string;
        })[];
        components: ({
            type: "buttons";
            buttons: {
                type: "interaction" | "url";
                label: string | false;
                icon: string | false;
                color: "gray" | "green" | "red" | "blue";
                id: string | false;
                url: string | false;
                disabled: boolean;
            }[];
        } | {
            type: "dropdown";
            placeholder: string | false;
            options: {
                label: string | false;
                icon: string | false;
                description: string | false;
                id: string | false;
            }[];
        } | {
            type: "reactions";
            reactions: {
                amount: number;
                emoji: string;
                type: "svg" | "image" | "gif";
            }[];
        })[];
        reply: {
            type: "reply" | "command" | false;
            user?: {
                name: string;
                id: string;
                color: string;
                pfp: string;
                bot: boolean;
                verifiedBot: boolean;
                system: boolean;
            };
            replyOptions?: {
                content: string;
                messageId: string;
                channelId: string;
                guildId: string;
            };
            commandOptions?: {
                interactionName: string;
                interactionId: string;
            };
        };
    }[];
    premium: {
        enabled: boolean;
        premiumToken: string;
        customCredits: {
            enable: boolean;
            replaceText: string;
            replaceURL: string;
            enableReportBug: boolean;
        };
        customHeaderUrl: {
            enabled: boolean;
            url: string;
            text: string;
        };
        customTranscriptUrl: {
            enabled: boolean;
            name: string;
        };
        customFavicon: {
            enabled: boolean;
            image: string;
        };
        additionalFlags: string[];
    };
}

/**## ODTranscriptHtmlV2Response `interface`
 * The structure of the response received from the Open Ticket HTML Transcripts v2 API.
 */
declare interface ODTranscriptHtmlV2Response {
    status: "success" | "error";
    type: "transcript";
    url: string;
    availableUntil: number;
    time: number;
    id: string;
}

/**## ODTranscriptReplyData `interface`
 * A universal representatation of a discord interaction reply for transcripts.
 */
declare interface ODTranscriptInteractionReplyData extends ODTranscriptReplyData {
    /**The type of reply. */
    type: "interaction";
    /**The bot used for this interaction. */
    user: ODTranscriptUserData;
    /**The name of the slash command used. */
    name: string;
}

/**## ODTranscriptManager `class`
 * This is an Open Ticket transcript manager.
 *
 * This class manages all transcript generators in the bot.
 *
 * The 2 default built-in transcript generators are: `opendiscord:html-compiler` & `opendiscord:text-compiler`.
 */
declare class ODTranscriptManager<IdList extends ODTranscriptManagerIdConstraint = ODTranscriptManagerIdConstraint> extends api_2.ODManager<ODTranscriptCompiler<any, null | object>> {
    /**The manager responsible for collecting all messages in a channel. */
    collector: ODTranscriptCollector;
    /**Alias for the client manager. */
    private client;
    constructor(debug: api_2.ODDebugger, tickets: ODTicketManager, client: api_2.ODClientManager, permissions: api_2.ODPermissionManager);
    get<CompilerId extends keyof api_2.ODNoGeneric<IdList>>(id: CompilerId): IdList[CompilerId];
    get(id: api_2.ODValidId): ODTranscriptCompiler<any, null | object> | null;
    remove<CompilerId extends keyof api_2.ODNoGeneric<IdList>>(id: CompilerId): IdList[CompilerId];
    remove(id: api_2.ODValidId): ODTranscriptCompiler<any, null | object> | null;
    exists(id: keyof api_2.ODNoGeneric<IdList>): boolean;
    exists(id: api_2.ODValidId): boolean;
}

/**## ODTranscriptManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODTranscriptManager` class.
 */
declare type ODTranscriptManagerIdConstraint = Record<string, ODTranscriptCompiler<any, null | object>>;

/**## ODTranscriptManagerIdMappings `interface`
 * A list of all available IDs in the default `ODTranscriptManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTranscriptManagerIdMappings extends ODTranscriptManagerIdConstraint {
    "opendiscord:html-compiler": ODTranscriptCompiler<{
        url: string;
        availableUntil: Date;
    }, {
        auth: string;
    }>;
    "opendiscord:text-compiler": ODTranscriptCompiler<{
        contents: string;
    }, null>;
}

/**## ODTranscriptMessageData `interface`
 * A universal representatation of a discord message for transcripts.
 */
declare interface ODTranscriptMessageData {
    /**The message author. */
    author: ODTranscriptUserData;
    /**The server this message originated from. */
    guild: string;
    /**The channel this message originated from. */
    channel: string;
    /**The id of this message. */
    id: string;
    /**Is this message edited? */
    edited: boolean;
    /**The unix timestamp of the creation of this message. */
    timestamp: number;
    /**The type of message. */
    type: ODTranscriptMessageType;
    /**The contents of this message. */
    content: string | null;
    /**The embeds of this message. */
    embeds: ODTranscriptEmbedData[];
    /**The files of this message. */
    files: ODTranscriptFileData[];
    /**The components (buttons & dropdowns) of this message. */
    components: ODTranscriptComponentRowData[];
    /**When this message is a reply to something, the data will be here. */
    reply: (ODTranscriptMessageReplyData | ODTranscriptInteractionReplyData | null);
    /**All reactions of htis message. */
    reactions: ODTranscriptReactionData[];
}

/**## ODTranscriptReplyData `interface`
 * A universal representatation of a discord message reply for transcripts.
 */
declare interface ODTranscriptMessageReplyData extends ODTranscriptReplyData {
    /**The type of reply. */
    type: "message";
    /**The server this message originated from. */
    guild: string;
    /**The channel this message originated from. */
    channel: string;
    /**The id of this message. */
    id: string;
    /**The author of this message. */
    user: ODTranscriptUserData;
    /**The content of this message. */
    content: string | null;
}

/**## ODTranscriptMessageType `type`
 * A message type for the `ODTranscriptMessageData` interface.
 */
declare type ODTranscriptMessageType = "default" | "important" | "ephemeral" | "pinned.message" | "welcome.message" | "boost.message" | "thread.message";

/**## ODTranscriptReactionData `interface`
 * A universal representatation of a discord message reaction for transcripts.
 */
declare interface ODTranscriptReactionData extends ODTranscriptEmojiData {
    /**The amount of emojis for this reaction.  */
    amount: number;
    /**Is this a super (nitro) reaction? */
    super: boolean;
}

/**## ODTranscriptReplyData `interface`
 * A universal representatation of a discord reply/interaction for transcripts.
 */
declare interface ODTranscriptReplyData {
    /**The type of reply. */
    type: "interaction" | "message";
}

/**## ODTranscriptsDatabase `class
 * A special class with types for the Open Ticket `database/transcripts.json` database file
 */
declare class ODTranscriptsDatabase extends api_2.ODFormattedJsonDatabase<ODTranscriptsDatabaseIdMappings> {
}

/**## ODTranscriptsDatabaseIdMappings `interface`
 * A list of all available IDs in the default `ODTranscriptsDatabase` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODTranscriptsDatabaseIdMappings extends api_2.ODDatabaseIdConstraint {
    "opendiscord:transcript": ODTranscriptHistoryData;
}

/**## ODTranscriptsJsonCommentsConfig `class
 * A special class with types for the Open Ticket `config/transcripts.jsonc` config file
 */
declare class ODTranscriptsJsonCommentsConfig extends api_2.ODJsonCommentsConfig<ODTranscriptsJsonConfig_TranscriptsData> {
}

/**## ODTranscriptsJsonConfig_TranscriptsData `interface`
 * All contents of the `transcripts.jsonc` config file.
 */
declare interface ODTranscriptsJsonConfig_TranscriptsData {
    /**All general settings related to transcripts. */
    general: {
        /**Are transcripts enabled? */
        enabled: boolean;
        /**Enable sending the generated transcript in a channel. */
        enableChannel: boolean;
        /**Enable sending the generated transcript to the DM of the ticket creator. */
        enableCreatorDM: boolean;
        /**Enable sending the generated transcript to the DM of the participants. */
        enableParticipantDM: boolean;
        /**Enable sending the generated transcript to the DM of all admins which were active in the ticket. */
        enableActiveAdminDM: boolean;
        /**Enable sending the generated transcript to the DM of all admins which were assigned to the ticket. */
        enableEveryAdminDM: boolean;
        /**A discord channel id for the `"enableChannel"` setting. */
        channel: string;
        /**Want to use text or HTML transcripts? */
        mode: "html" | "text";
    };
    /**All settings related to the embed from the transcripts. (UNIMPLEMENTED!!) */
    embedSettings: {
        /**Unimplemented feature */
        customColor: discord.ColorResolvable | string;
        /**Unimplemented feature */
        listAllParticipants: boolean;
        /**Unimplemented feature */
        includeTicketStats: boolean;
    };
    /**The layout of the text transcripts. */
    textTranscriptStyle: ODTranscriptsJsonConfig_TranscriptsTextLayout;
    /**The layout of the HTML transcripts. */
    htmlTranscriptStyle: ODTranscriptsJsonConfig_TranscriptsHtmlLayout;
}

/**## ODTranscriptsJsonConfig_TranscriptsHtmlLayout `interface`
 * This interface contains the layout of the HTML transcripts.
 */
declare interface ODTranscriptsJsonConfig_TranscriptsHtmlLayout {
    /**Settings related to the background. */
    background: {
        /**Enable a custom background. */
        enableCustomBackground: boolean;
        /**The background (hex) color. */
        backgroundColor: string;
        /**The background image url. */
        backgroundImage: string;
    };
    /**Settings related to the header. */
    header: {
        /**Enable a custom header. */
        enableCustomHeader: boolean;
        /**The background (hex) color of the header. */
        backgroundColor: string;
        /**The deco color (horizontal line) of the header. */
        decoColor: string;
        /**The text color of the header. */
        textColor: string;
    };
    /**Settings related to the stats section. */
    stats: {
        /**Enable a custom stats section. */
        enableCustomStats: false;
        /**The background color of the stats section. */
        backgroundColor: string;
        /**The key text color of the stats section. */
        keyTextColor: string;
        /**The value text color of the stats section. */
        valueTextColor: string;
        /**The background color of the hide button in the stats section. */
        hideBackgroundColor: string;
        /**The text color of the hide button in the stats section. */
        hideTextColor: string;
    };
    /**Settings related to the favicon. */
    favicon: {
        /**Enable a custom background. */
        enableCustomFavicon: boolean;
        /**A link to the custom favicon. */
        imageUrl: string;
    };
}

/**## ODTranscriptsJsonConfig_TranscriptsTextLayout `interface`
 * This interface contains the layout of the text transcripts.
 */
declare interface ODTranscriptsJsonConfig_TranscriptsTextLayout {
    /**The layout/complexity of the text transcripts. */
    layout: "simple" | "normal" | "detailed";
    /**Include stats in the transcript. */
    includeStats: boolean;
    /**Include user & message ids in the transcript. */
    includeIds: boolean;
    /**Include embeds in the transcript. */
    includeEmbeds: boolean;
    /**Include files in the transcript. */
    includeFiles: boolean;
    /**Include bot messages in the transcript. */
    includeBotMessages: boolean;
    /**How to name the transcript file? */
    fileMode: "custom" | "channel-name" | "channel-id" | "user-name" | "user-id";
    /**A custom name for the transcript file (when using `"custom"`) */
    customFileName: string;
}

/**## ODTranscriptUserData `interface`
 * A universal representatation of a discord user for transcripts.
 */
declare interface ODTranscriptUserData {
    /**The id of this user. */
    id: string;
    /**The username of this user. */
    username: string;
    /**The display name of this user. */
    displayname: string;
    /**The profile picture url of this user. */
    pfp: string;
    /**The additional tag of this user. */
    tag: "app" | "verified" | "system" | null;
    /**When in a server, this is the color of the highest role. */
    color: discord.HexColorString;
}

/**## ODUnknownCrashedPlugin `interface`
 * Basic details for a plugin that crashed while loading the `plugin.json` file.
 */
declare interface ODUnknownCrashedPlugin {
    /**The name of the plugin. (path when plugin crashed before `name` was loaded) */
    name: string;
    /**The description of the plugin. (when found before crashing) */
    description: string;
}

/**## ODUsersDatabase `class
 * A special class with types for the Open Ticket `database/users.json` database file
 */
declare class ODUsersDatabase extends api_2.ODFormattedJsonDatabase<ODUsersDatabaseIdMappings> {
}

/**## ODUsersDatabaseIdMappings `interface`
 * A list of all available IDs in the default `ODUsersDatabase` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODUsersDatabaseIdMappings extends api_2.ODDatabaseIdConstraint {
    "opendiscord:blacklist": ODTicketJson;
}

/**## ODUserStatisticScope `class
 * A special class with types for the Open Ticket `User` statistics category/scope.
 */
declare class ODUserStatisticScope extends api_2.ODStatisticScope<ODUserStatisticScopeIdMappings> {
}

/**## ODUserStatisticScopeIdMappings `interface`
 * A list of all available IDs in the default `ODUserStatisticScope` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODUserStatisticScopeIdMappings extends api_2.ODStatisticScopeIdConstraint {
    "opendiscord:name": api_2.ODDynamicStatistic;
    "opendiscord:role": api_2.ODDynamicStatistic;
    "opendiscord:tickets-created": api_2.ODBaseStatistic;
    "opendiscord:tickets-closed": api_2.ODBaseStatistic;
    "opendiscord:tickets-deleted": api_2.ODBaseStatistic;
    "opendiscord:tickets-reopened": api_2.ODBaseStatistic;
    "opendiscord:tickets-claimed": api_2.ODBaseStatistic;
    "opendiscord:tickets-pinned": api_2.ODBaseStatistic;
    "opendiscord:tickets-moved": api_2.ODBaseStatistic;
    "opendiscord:tickets-transferred": api_2.ODBaseStatistic;
    "opendiscord:users-blacklisted": api_2.ODBaseStatistic;
    "opendiscord:transcripts-created": api_2.ODBaseStatistic;
    "opendiscord:current-tickets": api_2.ODDynamicStatistic;
}

/**## ODUserTicketHelpMenuCategory `class
 * A special class with types for the Open Ticket `User ticket Commands` help menu category.
 */
declare class ODUserTicketHelpMenuCategory extends api_2.ODHelpMenuCategory<ODUserTicketHelpMenuCategoryIdMappings> {
}

/**## ODUserTicketHelpMenuCategoryIdMappings `interface`
 * A list of all available IDs in the default `ODUserTicketHelpMenuCategory` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODUserTicketHelpMenuCategoryIdMappings extends api_2.ODHelpMenuCategoryIdConstraint {
    "opendiscord:claim": api_2.ODHelpMenuCommandComponent;
    "opendiscord:unclaim": api_2.ODHelpMenuCommandComponent;
    "opendiscord:add": api_2.ODHelpMenuCommandComponent;
    "opendiscord:remove": api_2.ODHelpMenuCommandComponent;
    "opendiscord:transfer": api_2.ODHelpMenuCommandComponent;
}

/**## ODValidActionRowComponents `type`
 * A collection of all valid action row components.
 */
declare type ODValidActionRowComponents = ODButtonComponent | ODDropdownComponent;

/**## ODValidButtonColor `type`
 * This is a collection of all the possible button colors.
 */
declare type ODValidButtonColor = "gray" | "red" | "green" | "blue";

/**## ODValidConsoleColor `type`
 * This is a collection of all the supported console colors within Open Discord.
 */
declare type ODValidConsoleColor = "white" | "red" | "yellow" | "green" | "blue" | "gray" | "cyan" | "magenta";

/**## ODValidContainerComponents `type`
 * A collection of all valid container components.
 */
declare type ODValidContainerComponents = ODActionRowComponent | ODTextComponent | ODSectionComponent | ODGalleryComponent | ODSeparatorComponent | ODFileComponent;

/**## ODValidId `type`
 * A valid Open Discord identifier. It can be an `ODId` or `string`!
 *
 * You will see this type in many functions from Open Discord.
 */
declare type ODValidId = string | number | symbol | ODId;

/**## ODValidJsonType `type`
 * A collection of all types that can be stored in a JSON file!
 *
 * list: `string`, `number`, `boolean`, `array`, `object`, `null`
 */
declare type ODValidJsonType = string | number | boolean | {
    [key: string]: ODValidJsonType;
} | ODValidJsonType[] | null | object;

/**## ODValidLabelComponents `type`
 * A collection of all valid label components.
 */
declare type ODValidLabelComponents = ODShortInputComponent | ODParagraphInputComponent | ODDropdownComponent | ODRadioGroupComponent | ODCheckboxGroupComponent | ODCheckboxComponent | ODFileUploadComponent;

/**## ODValidMessageComponents `type`
 * A collection of all valid top-level components that can be sent in a message.
 */
declare type ODValidMessageComponents = ODTextComponent | ODFileComponent | ODGalleryComponent | ODActionRowComponent | ODContainerComponent | ODSectionComponent | ODSeparatorComponent;

/**## ODValidModalComponents `type`
 * A collection of all valid top-level components that can be sent in a message.
 */
declare type ODValidModalComponents = ODLabelComponent | ODTextComponent;

/**## ODValidSimpleMessageComponents `type`
 * A collection of all valid top-level components that can be sent in a simple message (components v1).
 */
declare type ODValidSimpleMessageComponents = ODContentComponent | ODEmbedComponent | ODFileComponent | ODPollComponent;

/**## ODValidStatisticValue `type`
 * These are the only allowed types for a statistic value to improve compatibility with different database systems.
 */
declare type ODValidStatisticValue = string | number | boolean;

/**## ODVerifyBar `class`
 * This is an Open Discord verifybar responder.
 *
 * It contain `ODWorkerManager`'s that will be fired when the continue/stop (✅ ❌) buttons are pressed.
 *
 * Verifybars don't automatically trigger these workers. The button responders of the verifybars should implement it manually.
 */
declare class ODVerifyBar<ButtonIds extends string, WorkerIds extends string = string> extends ODManagerData {
    /**All workers that will run when a button in the verifybar is pressed. */
    workers: ODWorkerManager<ODButtonResponderInstance, "button", {
        verifybar: ODVerifyBar<ButtonIds, WorkerIds>;
        selectedButtonId: ButtonIds;
    }, WorkerIds>;
    constructor(id: ODValidId);
    /**Activate the verifybar response to this button. */
    activate(responder: ODButtonResponderInstance, selectedButtonId: ButtonIds): Promise<void>;
}

/**## ODVerifyBarManager `class`
 * The Open Discord verifybar manager manages all responders for (✅ ❌) verifybars in the bot.
 * The `ODVerifyBar` classes contain `ODWorkerManager`'s that will be fired when the continue/stop buttons are pressed.
 *
 * Verifybars don't automatically trigger these workers. The button responders of the verifybars should implement it manually.
 */
declare class ODVerifyBarManager<IdList extends ODVerifyBarManagerIdConstraint = ODVerifyBarManagerIdConstraint> extends ODManager<ODVerifyBar<string>> {
    constructor(debug: ODDebugger);
    get<VerifyBarId extends keyof ODNoGeneric<IdList>>(id: VerifyBarId): IdList[VerifyBarId];
    get(id: ODValidId): ODVerifyBar<string> | null;
    remove<VerifyBarId extends keyof ODNoGeneric<IdList>>(id: VerifyBarId): IdList[VerifyBarId];
    remove(id: ODValidId): ODVerifyBar<string> | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODVerifyBarManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODVerifyBarManager` class.
 */
declare type ODVerifyBarManagerIdConstraint = Record<string, ODVerifyBar<string>>;

/**## ODVerifyBarManagerIdMappings `interface`
 * A list of all available IDs in the default `ODVerifyBarManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODVerifyBarManagerIdMappings extends api_2.ODVerifyBarManagerIdConstraint {
    "opendiscord:close-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:close-ticket">;
    "opendiscord:reopen-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:reopen-ticket">;
    "opendiscord:delete-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason" | "accept-without-transcript", "opendiscord:delete-ticket">;
    "opendiscord:claim-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:claim-ticket">;
    "opendiscord:unclaim-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:unclaim-ticket">;
    "opendiscord:pin-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:pin-ticket">;
    "opendiscord:unpin-ticket": api_2.ODVerifyBar<"accept" | "cancel" | "accept-with-reason", "opendiscord:unpin-ticket">;
}

/**## ODVerifyButtonId `enum`
 * Frequently used button ids in Open Ticket verify bars.
 */
declare enum ODVerifyButtonId {
    Cancel = "cancel",
    Accept = "accept",
    AcceptWithReason = "accept-with-reason",
    AcceptWithoutTranscript = "accept-without-transcript"
}

/**## ODVersion `class`
 * This is an Open Discord version.
 *
 * It has many features like comparing versions & checking if they are compatible.
 *
 * You can use it in your own plugin, but most of the time you will use it to check the Open Discord version!
 */
declare class ODVersion extends ODManagerData {
    /**The first number of the version (example: `v1.2.3` => `1`) */
    primary: number;
    /**The second number of the version (example: `v1.2.3` => `2`) */
    secondary: number;
    /**The third number of the version (example: `v1.2.3` => `3`) */
    tertiary: number;
    constructor(id: ODValidId, primary: number, secondary: number, tertiary: number);
    /**Get the version from a string (also possible with `v` prefix)
     * @example const version = api.ODVersion.fromString("id","v1.2.3") //creates version 1.2.3
     */
    static fromString(id: ODValidId, version: string): ODVersion;
    /**Get the version as a string (`noprefix:true` => with `v` prefix)
     * @example
     * new api.ODVersion(1,0,0).toString(false) //returns "v1.0.0"
     * new api.ODVersion(1,0,0).toString(true) //returns "1.0.0"
     */
    toString(noprefix?: boolean): string;
    /**Compare this version with another version and returns the result: `higher`, `lower` or `equal`
     * @example
     * new api.ODVersion(1,0,0).compare(new api.ODVersion(1,2,0)) //returns "lower"
     * new api.ODVersion(1,3,0).compare(new api.ODVersion(1,2,0)) //returns "higher"
     * new api.ODVersion(1,2,0).compare(new api.ODVersion(1,2,0)) //returns "equal"
     */
    compare(comparator: ODVersion): "higher" | "lower" | "equal";
    /**Check if this version is included in the list
     * @example
     * const list = [
     *     new api.ODVersion(1,0,0),
     *     new api.ODVersion(1,0,1),
     *     new api.ODVersion(1,0,2)
     * ]
     * new api.ODVersion(1,0,0).compatible(list) //returns true
     * new api.ODVersion(1,0,1).compatible(list) //returns true
     * new api.ODVersion(1,0,3).compatible(list) //returns false
     */
    compatible(list: ODVersion[]): boolean;
    /**Check if this version is higher or equal to the provided `requirement`. */
    min(requirement: string | ODVersion): boolean;
    /**Check if this version is lower or equal to the provided `requirement`. */
    max(requirement: string | ODVersion): boolean;
    /**Check if this version is matches the major version (`vX.X`) of the provided `requirement`. */
    major(requirement: string | ODVersion): boolean;
    /**Check if this version is matches the minor version (`vX.X.X`) of the provided `requirement`. */
    minor(requirement: string | ODVersion): boolean;
}

/**## ODVersionManager `class`
 * A Open Discord version manager.
 *
 * It is used to manage different `ODVersion`'s from the bot. You will use it to check which version of the bot is used.
 */
declare class ODVersionManager<IdList extends ODVersionManagerIdConstraint = ODVersionManagerIdConstraint> extends ODManager<ODVersion> {
    constructor();
    get<VersionId extends keyof ODNoGeneric<IdList>>(id: VersionId): IdList[VersionId];
    get(id: ODValidId): ODVersion | null;
    remove<VersionId extends keyof ODNoGeneric<IdList>>(id: VersionId): IdList[VersionId];
    remove(id: ODValidId): ODVersion | null;
    exists(id: keyof ODNoGeneric<IdList>): boolean;
    exists(id: ODValidId): boolean;
}

/**## ODVersionManagerIdConstraint `type`
 * The constraint/layout for id mappings/interfaces of the `ODVersionManager` class.
 */
declare type ODVersionManagerIdConstraint = Record<string, ODVersion>;

/**## ODVersionManagerIdMappings `interface`
 * A list of all available IDs in the default `ODVersionManager` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODVersionManagerIdMappings extends api_2.ODVersionManagerIdConstraint {
    "opendiscord:version": api_2.ODVersion;
    "opendiscord:last-version": api_2.ODVersion;
    "opendiscord:api": api_2.ODVersion;
    "opendiscord:transcripts": api_2.ODVersion;
    "opendiscord:livestatus": api_2.ODVersion;
}

/**## ODVersionMigration `class`
 * This class is used to manage data migration between Open Ticket versions.
 *
 * It shouldn't be used by plugins because this is an internal API feature!
 */
declare class ODVersionMigration {
    /**The version to migrate data to */
    version: ODVersion;
    /**The migration functions */
    private functions;
    constructor(version: ODVersion, functions: ODVersionMigrationFunctions);
    /**Run this migration before any other part of the bot is started (pure node.js). */
    migrateBeforeStartup(): Promise<boolean>;
    /**Run this migration in the Open Discord migration context (incl. flags, configs, database). */
    migrateInContext(): Promise<boolean>;
    /**Run this migration when the bot starts like normal (incl. plugins) */
    migrateAfterStartup(): Promise<boolean>;
}

declare interface ODVersionMigrationFunctions {
    /**The migration to run before any part of the bot is started (pure node.js). */
    beforeStartupMigrate?: () => void | Promise<void>;
    /**The migration to run in the Open Discord migration context (incl. flags, configs, database). */
    contextMigrate?: () => void | Promise<void>;
    /**The migration to run when the bot starts like normal (incl. plugins) */
    afterStartupMigrate?: () => void | Promise<void>;
}

/**## ODWarningConsoleMessage `class`
 * This is an Open Discord console warning message.
 *
 * It is the same as a normal `ODConsoleMessage`, but it has a predefined prefix & color scheme for the "WARNING" messages!
 */
declare class ODWarningConsoleMessage extends ODConsoleMessage {
    constructor(message: string, params?: ODConsoleMessageParam[]);
}

/**## ODWebsiteOption `class`
 * This is an Open Ticket website option.
 *
 * This class contains all data related to an Open Ticket website option (parsed from the config).
 *
 * Use this option to create a button which links to a website!
 */
declare class ODWebsiteOption extends ODOption<ODWebsiteOptionIdMappings> {
    readonly type: "opendiscord:website";
    constructor(id: api_2.ODValidId, data: ODOptionData<api_2.ODValidJsonType>[]);
    static fromJson(json: ODOptionJson): ODWebsiteOption;
}

/**## ODWebsiteOptionIdMappings `interface`
 * A list of all available IDs in the default `ODWebsiteOption` class in `opendiscord`.
 * It's used to generate typescript declarations for this class.
 */
declare interface ODWebsiteOptionIdMappings extends ODOptionIdConstraint {
    "opendiscord:name": ODOptionData<string>;
    "opendiscord:description": ODOptionData<string>;
    "opendiscord:button-emoji": ODOptionData<string>;
    "opendiscord:button-label": ODOptionData<string>;
    "opendiscord:url": ODOptionData<string>;
}

/**## ODWorker `class`
 * This is an Open Discord worker.
 *
 * You can compare it with a normal javascript callback, but slightly more advanced!
 *
 * - It has an `id` for identification of the function
 * - A `priority` to know when to execute this callback (related to others)
 * - It knows who called this callback (`origin`)
 * - And much more!
 */
declare class ODWorker<Instance, Origin extends string, Params> extends ODManagerData {
    /**The priority of this worker */
    priority: number;
    /**The main callback of this worker */
    callback: ODWorkerCallback<Instance, Origin, Params>;
    constructor(id: ODValidId, priority: number, callback: ODWorkerCallback<Instance, Origin, Params>);
    /**Duplicate this worker. Warning: If the callback accesses external variables (outside parameters), the clone will still use those variables. This might result in unexpected behaviour! */
    duplicate(newId?: ODValidId): ODWorker<Instance, Origin, Params>;
}

/**## ODWorkerCallback `type`
 * This is the callback used in `ODWorker`!
 */
declare type ODWorkerCallback<Instance, Origin extends string, Params> = (instance: Instance, params: Params, origin: Origin, cancel: () => void) => void | Promise<void>;

/**## ODWorker `class`
 * This is an Open Discord worker manager.
 *
 * It manages & executes `ODWorker`'s in the correct order.
 *
 * You can register a custom worker in this class to create a message or button.
 */
declare class ODWorkerManager<Instance, Origin extends string, Params, WorkerIds extends string = string> extends ODManager<ODWorker<Instance, Origin, Params>> {
    /**The order of execution for workers inside this manager. */
    protected priorityOrder: "ascending" | "descending";
    /**The backup worker will be executed when one of the workers fails or cancels execution. */
    backupWorker: ODWorker<{
        reason: "error" | "cancel";
    }, Origin, Params> | null;
    constructor(priorityOrder: "ascending" | "descending");
    /**Get all workers in sorted order. */
    getSortedWorkers(priority: "ascending" | "descending"): ODWorker<Instance, Origin, Params>[];
    /**Execute all workers on an instance using the given origin & parameters. */
    executeWorkers(instance: Instance, origin: Origin, params: Params): Promise<void>;
    get(id: WorkerIds): ODWorker<Instance, Origin, Params>;
    get(id: ODValidId): ODWorker<Instance, Origin, Params> | null;
    remove(id: WorkerIds): ODWorker<Instance, Origin, Params>;
    remove(id: ODValidId): ODWorker<Instance, Origin, Params> | null;
    exists(id: WorkerIds): boolean;
    exists(id: ODValidId): boolean;
}

export declare const opendiscord: api_3.ODOpenTicketMain;

export declare namespace openticketUtils {
    export {
        checkTicketCreationPerms,
        replyInteractiveMessageState,
        replyHasPermissions,
        replyIsInGuild,
        replyIsTicket,
        replyTicketIsAvailable,
        replyTicketMustBeOpen,
        replyTicketMustBeClosed,
        replyTicketMustBeUnclaimed,
        replyTicketMustBeClaimed,
        replyTicketMustBeUnpinned,
        replyTicketMustBePinned,
        replyMessageMustBeSentBeforeClose,
        updateTicketMessage
    }
}

/**## ordinalNumber `utility function`
 * Get a human readable ordinal number (e.g. 1st, 2nd, 3rd, 4th, ...) from a Javascript number.
 */
declare function ordinalNumber(num: number): string;

/**Check the permissions for this command. If not allowed, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyHasPermissions(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", commandName: keyof api.ODGeneralJsonConfig_SystemPermissions, settings?: api.ODPermissionSettings): Promise<boolean>;

/**Fetch the interactive message state. If not present, auto replies with error and returns `null`. When `null` is received, the worker should be returned and canceled. */
declare function replyInteractiveMessageState(instance: api.ODButtonResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", channel: discord.TextBasedChannel, message: discord.Message | null, replacementCommandName: string): Promise<api.ODStateData<{
    messageOrigin: "slash" | "text" | "button" | "dropdown" | "modal" | "other";
    messageType: "ticket-message" | "close-message" | "reopen-message" | "autoclose-message" | "claim-message" | "unclaim-message" | "pin-message" | "unpin-message";
    messageReason?: string | null;
    messageAuthor?: string;
    messageExtraData?: any;
}> | null>;

/**Check if channel is in guild/server. If not, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyIsInGuild(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other"): Promise<boolean>;

/**Check if channel is valid ticket. If not, auto replies with error and returns `null`. When `null` is received, the worker should be returned and canceled. */
declare function replyIsTicket(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other"): Promise<api.ODTicket | null>;

/**Check if the ticket can be closed/deleted before a message has been sent by an admin or user. If not passing the test, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyMessageMustBeSentBeforeClose(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket, commandName: keyof api.ODGeneralJsonConfig_SystemPermissions): Promise<boolean>;

/**Check if ticket is not busy and available. If not, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketIsAvailable(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is claimed. If unclaimed, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBeClaimed(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is closed. If open, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBeClosed(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is open. If closed, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBeOpen(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is pinned. If unpinned, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBePinned(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is unclaimed. If claimed, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBeUnclaimed(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**Check if ticket is unpinned. If pinned, auto replies with error and returns `false`. When `false` is received, the worker should be returned and canceled. */
declare function replyTicketMustBeUnpinned(instance: api.ODButtonResponderInstance | api.ODCommandResponderInstance | api.ODDropdownResponderInstance | api.ODModalResponderInstance, origin: "slash" | "text" | "button" | "dropdown" | "modal" | "other", ticket: api.ODTicket): Promise<boolean>;

/**## runAsync `utility function`
 * Use this function to run a snippet of code asyncronous without creating a separate function for it!
 */
declare function runAsync(func: () => Promise<void>): Promise<void>;

/**## sharedFuses `utility variable`
 * All shared fuses from Open Discord. Please use `opendiscord.sharedFuses` instead!
 */
declare const sharedFuses: api_2.ODSharedFuseManager;

/**## timedAwait `utility function`
 * Use this function to await a promise but reject after the certain timeout has been reached.
 */
declare function timedAwait<ReturnValue>(promise: ReturnValue, timeout: number, onError: (err: Error) => void): ReturnValue;

/**## timer `utility function`
 * Use this to wait for a certain amount of milliseconds. This only works when using `await`
 * @example await utilities.timer(1000) //wait 1sec
 */
declare function timer(ms: number): Promise<void>;

/**## trimEmojis `utility function`
 * Trim/remove all emoji's from a Javascript string.
 */
declare function trimEmojis(text: string): string;

/**Update the ticket message from a given ticket channel. This should be used after every change to the `ODTicket` after an action. */
declare function updateTicketMessage(guild: discord.Guild, channel: discord.TextBasedChannel, user: discord.User, ticket: api.ODTicket): Promise<void>;

export declare namespace utilities {
    export {
        checkNodeVersion,
        moduleInstalled,
        initialStartupLogs,
        timer,
        emojiTitle,
        runAsync,
        timedAwait,
        dateString,
        asyncReplace,
        getLongestLength,
        ordinalNumber,
        trimEmojis,
        getMessageFromBuildResult,
        sharedFuses,
        easterEggs
    }
}

export { }
