import * as Sentry from "@sentry/react-native";

const setupSentry = (enableSentry: boolean) => {
  if (enableSentry) {
    Sentry.init({
      dsn: "https://4e12512b3920456280975bae77b94592@o563780.ingest.sentry.io/5704093",
      enableNative: false
    });
    
    Sentry.setTag("app", "instasaver");
  }
};

export default setupSentry;
