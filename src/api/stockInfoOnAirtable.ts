import { validePhoneOrEmail } from "../utils/validators";

export const BASE_URL_AIRTABLE = "https://api.airtable.com/";

const addInfoAirtableForContact = async (data: {
  [value: string]: string | undefined | any;
}): Promise<{ succes: boolean; data: any }> => {
  const { REACT_APP_AIRTABLE_BASE_ID_CONTACT } = process.env;
  let url = `${BASE_URL_AIRTABLE}v0/${REACT_APP_AIRTABLE_BASE_ID_CONTACT}/Contacts`;
  const emailOrTel: false | "Tel" | "Email" = validePhoneOrEmail(
    data.emailOrPhone
  );
  let infoEmailOrTel = {};
  if (!!emailOrTel) {
    infoEmailOrTel = {
      [emailOrTel as unknown as "Tel" | "Email"]: data.emailOrPhone,
    };
  }
  const body = {
    records: [
      {
        fields: {
          "Email-Tel": data.emailOrPhone,
          ...infoEmailOrTel,
          Status: "Prospect",
          Services: ["dev"],
          Activités: ["Lyatom CMS"],
          Support: ["Ordinateur", "PC", "Mobile"],
          Description: "Origine : Landing Page LyatomCMS",
        },
      },
    ],
  };
  return postDataOnAirtable(body, url);
};

const postDataOnAirtable = async (
  body: {
    [value: string]: string | undefined | any;
  },
  url: string
): Promise<{ succes: boolean; data: any }> => {
  const { REACT_APP_AIRTABLE_API_KEY } = process.env;

  let response = { succes: false, data: undefined };
  try {
    const responseFetch = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
    const responseJson = await responseFetch.json();
    response = { succes: responseFetch.ok, data: responseJson };
  } catch (error) {
    response = { succes: false, data: undefined };
  }
  return response;
};

export { addInfoAirtableForContact };
