import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import en_messages from "./data/translations/en.json";
import fr_messages from "./data/translations/fr.json";
import es_messages from "./data/translations/fr.json";

addLocaleData([...en, ...fr, ...es]);

const messages = {
  en: en_messages,
  fr: fr_messages,
  es: es_messages,
};

export const browserLanguage = navigator.language.split("-")[0];
export default messages[browserLanguage];
