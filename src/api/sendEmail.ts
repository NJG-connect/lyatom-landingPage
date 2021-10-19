const BASE_URL = "/.netlify/functions/sendMail";

const sendEmailFromEmailJS = async (
  body: { [value: string]: string | undefined | any },
  forWho: "us" | "user"
) => {
  const { REACT_APP_MAILER_SEND_TEMPLATE_ID } = process.env;

  const data = {
    from: {
      email: "contact@njgconnect.fr",
    },
    to: [
      {
        email: forWho === "us" ? "njgconnect@gmail.com" : body.emailOrPhone,
      },
    ],
    variables: [
      {
        email: forWho === "us" ? "njgconnect@gmail.com" : body.emailOrPhone,
        substitutions: [
          {
            var: "info",
            value:
              forWho === "us"
                ? selectMessageForEmailForUs(body.emailOrPhone)
                : selectMessageForEmailForUser(),
          },
        ],
      },
    ],
    subject:
      forWho === "us"
        ? `Nouvelle demande Pour LyatomCMS 😁`
        : "Votre demande de prise de contact",
    template_id: REACT_APP_MAILER_SEND_TEMPLATE_ID,
  };

  const responseFetch = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(data) : null,
  });
  let response = {};
  try {
    const responseJson = await responseFetch.json();
    response = { succes: true, data: responseJson };
  } catch (error) {
    response = { succes: false, data: error };
  }
  return response;
};

function selectMessageForEmailForUs(emailOrPhone: string) {
  return `
    Vous avez reçu une nouvelle demande sur LyatomCMS :  <br /> <br />
    
    Contact :  ${emailOrPhone}  <br /> <br />`;
}

function selectMessageForEmailForUser() {
  return `Nous avons bien reçu votre demande.<br />
    Nous vous remercions de l'intérêt que vous nous portez et ne manquerons pas de revenir vers vous dans les plus bref délai   <br /> <br />

    -------------
  `;
}

export default sendEmailFromEmailJS;
