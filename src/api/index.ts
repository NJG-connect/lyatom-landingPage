import { validePhoneOrEmail } from "../utils/validators";
import sendEmailFromEmailJS from "./sendEmail";
import { addInfoAirtableForContact } from "./stockInfoOnAirtable";

async function sendInfoToAirtableAndEmail(info: { emailOrPhone: string }) {
  const response: { succes: boolean } = await addInfoAirtableForContact(info);

  // if fail on Airtable, send email to us
  if (!response.succes) {
    await sendEmailFromEmailJS(info, "us");
  }

  // if user have email send a confirmation Email
  const emailOrTel: false | "Tel" | "Email" = validePhoneOrEmail(
    info.emailOrPhone
  );
  if (emailOrTel === "Email") {
    await sendEmailFromEmailJS({ ...info, mail: info.emailOrPhone }, "user");
  }
}

export default sendInfoToAirtableAndEmail;
