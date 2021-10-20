import React, { useCallback, useContext, useEffect, useState } from "react";
import sendInfoToAirtableAndEmail from "../api";
import { UserInfoContext } from "../contexts/UserInfoContext";
import "./Interressed.css";

function Interressed() {
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
    <div className="wanted">
      <BackgroundTwoColor firstColor="#f6f8fb" secondColor="#fff" />
      <div className="wantedCenter">
        <div className="inputAndTextContentWanted">
          <p className="wantedText">
            Intéressé par sa mise en place, nous vous contactons rapidement,
            c’est promis !
          </p>
          <input
            placeholder="Téléphone"
            type="tel"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              updateInupt("emailOrPhone", ev.target.value)
            }
            value={info.emailOrPhone}
            name="tel"
            className="inputInfo wantedInput"
          />
        </div>
        <img
          className="arrowIconWanted"
          alt="wanted"
          src={require(`../assets/images/other/arrowSend.svg`).default}
        />
        <div className="wantedButton" onClick={sendInfo}>
          {info.isSubmitting ? "Bienvenu dans l'aventure 😄" : "Je veux !"}
        </div>
      </div>
      <BackgroundTwoColor firstColor="#f6f8fb" secondColor="#fff" />
    </div>
  );
}

export default Interressed;

function BackgroundTwoColor({
  firstColor,
  secondColor,
}: BackgroundTwoColorProps) {
  return (
    <div className="wantedSide">
      <div
        className="wantedSideContent"
        style={{ backgroundColor: firstColor }}
      ></div>
      <div
        className="wantedSideContent"
        style={{ backgroundColor: secondColor }}
      ></div>
    </div>
  );
}

interface BackgroundTwoColorProps {
  firstColor: string;
  secondColor: string;
}
