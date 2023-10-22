import { EmailOptions } from 'email-templates';
import * as Email from 'email-templates';
import { GenericObject } from '@core/type';
export type Locals = {
    [key: string]: string | number;
};
export type SendEmailConfig = {
    to: string[];
    cc?: string[];
    template: string;
    locals?: Locals;
};
export type EnvelopeInfo = {
    from: string;
    to: string[];
};
export type OriginalMessageInfo = {
    to: string;
    cc: string;
    from: string;
    attachments: any[];
    subject: string;
    html: string;
    text: string;
};
export type SentEmailInfo = {
    accepted: string[];
    rejected: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: EnvelopeInfo;
    messageId: string;
    originalMessage: OriginalMessageInfo;
};
export interface WebResourcesOptions {
    fileContent?: string;
    inlineAttribute?: string;
    images?: boolean | number;
    svgs?: boolean | number;
    scripts?: boolean | number;
    links?: boolean | number;
    relativeTo?: string;
    rebaseRelativeTo?: string;
    strict?: boolean;
}
export type JuiceOptions = {
    extraCss?: string;
    applyStyleTags?: boolean;
    removeStyleTags?: boolean;
    preserveMediaQueries?: boolean;
    preserveFontFaces?: boolean;
    preserveKeyFrames?: boolean;
    preservePseudos?: boolean;
    insertPreservedExtraCss?: boolean;
    applyWidthAttributes?: boolean;
    applyHeightAttributes?: boolean;
    applyAttributesTableElements?: boolean;
    webResources?: WebResourcesOptions;
    inlinePseudoElements?: boolean;
    xmlMode?: boolean;
    preserveImportant?: boolean;
};
export type OptionsMap = {
    hbs: string;
    njk: string;
};
export type OptionsEngine = {
    requires: GenericObject;
};
export type ViewsOptions = {
    extension: string;
    map: OptionsMap;
    engineSource: OptionsEngine;
};
export type ViewsLocals = {
    cache: boolean;
    pretty: boolean;
};
export type ConfigViews = {
    root: string;
    options: ViewsOptions;
    locals: ViewsLocals;
};
export type TransporterConfig = {
    views: ConfigViews;
    send: boolean;
    subjectPrefix: boolean;
    textonly: boolean;
    preview: boolean;
    lastLocaleField: string;
    juice: boolean;
    i18n: boolean;
    customRender: boolean;
    transport: any;
    render: any;
    message: any;
    juiceSettings: any;
    juiceResources: any;
    htmlToText: any;
    getPath: any;
};
export type EmailTransporter = {
    config?: TransporterConfig;
    juiceResources?: (html: string, options?: JuiceOptions) => Promise<string>;
    render?: (view: string, locals?: Locals) => Promise<string>;
    renderAll?: (view: string, locals?: Locals) => Promise<Partial<Email.EmailMessage>>;
    send?: (options?: EmailOptions) => Promise<SentEmailInfo>;
};
