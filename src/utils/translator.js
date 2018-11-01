/* eslint-disable */
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';
import _ from 'lodash';

const supportedLocales = ['de'];
const filePattern = './translations/messages/**/*.json';
const outputLanguageDataDir = './translations/locales/';

// Aggregates the default messages that were extracted from the app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(filePattern)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({ id, defaultMessage }) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }
            collection[id] = defaultMessage;
        });
        return collection;
    }, {});

supportedLocales.forEach((locale) => {
    const newTranslations = {};
    var oldTranslations = {};
    var oldEnglishTranslations = {};

    oldEnglishTranslations = fs.existsSync(outputLanguageDataDir + 'en.json') ?
    JSON.parse(fs.readFileSync(outputLanguageDataDir + 'en.json')) : {};

    oldTranslations = fs.existsSync(outputLanguageDataDir + locale + '.json') ?
        JSON.parse(fs.readFileSync(outputLanguageDataDir + locale + '.json')) : {};
      
    Object.keys(defaultMessages).forEach((id, index) => {
        if(id in oldTranslations) {
            if(oldEnglishTranslations[id] === defaultMessages[id]) {
                newTranslations[id] = oldTranslations[id];
            } else {
                newTranslations[id] = '[TRANSLATE]' + defaultMessages[id];
            }
        } else {
            newTranslations[id] = '[TRANSLATE]' + defaultMessages[id]
        }
    });

    fs.writeFileSync(outputLanguageDataDir + locale + '.json', JSON.stringify(newTranslations, null, 4));
});

fs.writeFileSync(outputLanguageDataDir + 'en.json', JSON.stringify(defaultMessages, null, 4));

