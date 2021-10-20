import React, { useCallback, useContext, useEffect, useState } from "react";
import sendInfoToAirtableAndEmail from "../api";
import { UserInfoContext } from "../contexts/UserInfoContext";
import "./Header.css";

function Header() {
  const { userContext, setUserContext } = useContext(UserInfoContext);
  const [info, setInfo] = useState({
    emailOrPhone: userContext.emailOrPhone,
    isSubmitting: userContext.isSubmitting,
  });

  useEffect(() => {
    if (userContext.emailOrPhone !== info.emailOrPhone) {
      setInfo({ ...info, emailOrPhone: userContext.emailOrPhone });
    }
    if (userContext.isSubmitting !== info.isSubmitting) {
      setInfo({ ...info, isSubmitting: userContext.isSubmitting || false });
    }
  }, [info, userContext]);

  const updateInupt = useCallback(
    (key: string, value: string | boolean) => {
      setInfo({ ...info, [key]: value });
      setUserContext({ [key]: value });
    },
    [info, setUserContext]
  );

  const sendInfo = useCallback(async () => {
    if (info.emailOrPhone) {
      updateInupt("isSubmitting", true);
      await sendInfoToAirtableAndEmail({ emailOrPhone: info.emailOrPhone! });
    }
  }, [info.emailOrPhone, updateInupt]);

  return (
    <div className="header">
      <div className="headerLeftContent">
        <h1 className="headerTitle">
          Modifiez le contenu de votre site web en quelques clics
        </h1>
        <h2 className="headerSubtitle">
          Intégrez le module Lyatom CMS sur votre site web ou partez sur un
          Template et modifiez votre site facilement depuis votre PC, votre
          tablette ou votre Smartphone.
        </h2>
        <div className="headerButtonContent">
          <input
            placeholder="Téléphone"
            type="tel"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              updateInupt("emailOrPhone", ev.target.value)
            }
            value={info.emailOrPhone}
            name="phone"
            className="inputInfo"
          />
          <div className="headerButton" onClick={sendInfo}>
            {info.isSubmitting
              ? "Bienvenu dans l'aventure 😄"
              : "M'accompagner"}
          </div>
        </div>
        <div className="headerSponsorContent">
          <p className="headerSponsorText">Propulsé par :</p>
          <div className="headerSponsorDivImg">
            <img
              className="headerSponsorImg"
              alt="Github"
              src={require("../assets/images/header/github.png").default}
            />
            <img
              className="headerSponsorImg"
              alt="React.js"
              src={require("../assets/images/header/react.png").default}
            />
            <img
              className="headerSponsorImg"
              alt="NJG Connect"
              src={require("../assets/images/header/njgconnect.png").default}
            />
          </div>
        </div>
      </div>
      <div className="headerRightContent">
        <img
          className="headerIMG"
          alt="LyatomCMS"
          src={require("../assets/images/header/imageHeader.png").default}
        />
      </div>
    </div>
  );
}

export default Header;
