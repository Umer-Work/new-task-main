import { google } from "googleapis";

const CLIENT_ID ="45955205274-g8iuub1759tsibl0nqs0o2cnltigfudm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN ="1//04exj83pJ8VmUCgYIARAAGAQSNwF-L9IrjR0e-2UQ6tnjp5GV1CorBpV066Z7ig_16en84bhitFODJEDMulI6nFoI_kZjoqcPj5U";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
