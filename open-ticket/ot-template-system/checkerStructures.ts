import { api } from "#opendiscord"

// Checker structure for template configuration
export const templatesConfigStructure = new api.ODCheckerArrayStructure("templates:config", {
    allowedTypes: ["object"],
    propertyChecker: new api.ODCheckerObjectStructure("templates:template", {
        children: [
            // Template ID
            {
                key: "id",
                optional: false,
                priority: 0,
                checker: new api.ODCheckerCustomStructure_UniqueId(
                    "templates:template-id",
                    "templates",
                    "template-ids",
                    { minLength: 1, maxLength: 64 }
                )
            },
            // Template Name
            {
                key: "name",
                optional: false,
                priority: 0,
                checker: new api.ODCheckerStringStructure("templates:template-name", {
                    minLength: 1,
                    maxLength: 100
                })
            },
            // Template Description
            {
                key: "description",
                optional: false,
                priority: 0,
                checker: new api.ODCheckerStringStructure("templates:template-description", {
                    minLength: 1,
                    maxLength: 100
                })
            },
            // Message Configuration
            {
                key: "message",
                optional: false,
                priority: 0,
                checker: new api.ODCheckerEnabledObjectStructure("templates:message", {
                    property: "enabled",
                    enabledValue: true,
                    checker: new api.ODCheckerObjectStructure("templates:message-content", {
                        children: [
                            // Message Text
                            {
                                key: "text",
                                optional: false,
                                priority: 0,
                                checker: new api.ODCheckerStringStructure("templates:message-text", {
                                    maxLength: 2000
                                })
                            },
                            // Embed Configuration
                            {
                                key: "embed",
                                optional: false,
                                priority: 0,
                                checker: new api.ODCheckerEnabledObjectStructure("templates:embed", {
                                    property: "enabled",
                                    enabledValue: true,
                                    checker: new api.ODCheckerObjectStructure("templates:embed-content", {
                                        children: [
                                            // Embed Title
                                            {
                                                key: "title",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerStringStructure("templates:embed-title", {
                                                    maxLength: 256
                                                })
                                            },
                                            // Embed Description
                                            {
                                                key: "description",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerStringStructure("templates:embed-description", {
                                                    maxLength: 4096
                                                })
                                            },
                                            // Embed Color
                                            {
                                                key: "customColor",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerCustomStructure_HexColor(
                                                    "templates:embed-color",
                                                    true,
                                                    true
                                                )
                                            },
                                            // Embed Image
                                            {
                                                key: "image",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerCustomStructure_UrlString(
                                                    "templates:embed-image",
                                                    true,
                                                    {
                                                        allowHttp: false,
                                                        allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".gif"]
                                                    }
                                                )
                                            },
                                            // Embed Thumbnail
                                            {
                                                key: "thumbnail",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerCustomStructure_UrlString(
                                                    "templates:embed-thumbnail",
                                                    true,
                                                    {
                                                        allowHttp: false,
                                                        allowedExtensions: [".png", ".jpg", ".jpeg", ".webp", ".gif"]
                                                    }
                                                )
                                            },
                                            // Embed Fields
                                            {
                                                key: "fields",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerArrayStructure("templates:embed-fields", {
                                                    allowedTypes: ["object"],
                                                    propertyChecker: new api.ODCheckerObjectStructure("templates:embed-field", {
                                                        children: [
                                                            {
                                                                key: "name",
                                                                optional: false,
                                                                priority: 0,
                                                                checker: new api.ODCheckerStringStructure("templates:embed-field-name", {
                                                                    minLength: 1,
                                                                    maxLength: 256
                                                                })
                                                            },
                                                            {
                                                                key: "value",
                                                                optional: false,
                                                                priority: 0,
                                                                checker: new api.ODCheckerStringStructure("templates:embed-field-value", {
                                                                    minLength: 1,
                                                                    maxLength: 1024
                                                                })
                                                            },
                                                            {
                                                                key: "inline",
                                                                optional: false,
                                                                priority: 0,
                                                                checker: new api.ODCheckerBooleanStructure("templates:embed-field-inline", {})
                                                            }
                                                        ]
                                                    })
                                                })
                                            },
                                            // Embed Timestamp
                                            {
                                                key: "timestamp",
                                                optional: false,
                                                priority: 0,
                                                checker: new api.ODCheckerBooleanStructure("templates:embed-timestamp", {})
                                            }
                                        ]
                                    })
                                })
                            },
                            // Ping Configuration
                            {
                                key: "ping",
                                optional: false,
                                priority: 0,
                                checker: new api.ODCheckerObjectStructure("templates:ping", {
                                    children: [
                                        {
                                            key: "@here",
                                            optional: false,
                                            priority: 0,
                                            checker: new api.ODCheckerBooleanStructure("templates:ping-here", {})
                                        },
                                        {
                                            key: "@everyone",
                                            optional: false,
                                            priority: 0,
                                            checker: new api.ODCheckerBooleanStructure("templates:ping-everyone", {})
                                        },
                                        {
                                            key: "custom",
                                            optional: false,
                                            priority: 0,
                                            checker: new api.ODCheckerArrayStructure("templates:ping-custom", {
                                                allowedTypes: ["string"]
                                            })
                                        }
                                    ]
                                })
                            }
                        ]
                    })
                })
            }
        ]
    })
});
