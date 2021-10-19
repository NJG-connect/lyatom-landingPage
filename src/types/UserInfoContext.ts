export interface UserInfoType {
  emailOrPhone?: string;
  isSubmitting?: boolean;
}

export interface UserInfoContextType {
  userContext: UserInfoType;
  setUserContext: (value: UserInfoType) => void;
}
