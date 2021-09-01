import { ReactNode } from 'react';

interface handlerProps {
  receiveShareSuccess: Function,
  receiveShareError: Function,
};

type receiveShareSuccessProps = {
  setSubmitting: (submitting: boolean) => void,
  setImageSource: (imageSource: string | null) => void,
};

type AppProps = {
  receiveShareSuccess: (data: any) => void,
  receiveShareError: (error: any) => void,
};

type PropsWithChildren = AppProps & { children?: ReactNode };

type EnhanceProps = {
  submitting: boolean,
};

export type {
  EnhanceProps,
  handlerProps,
  receiveShareSuccessProps,
  AppProps,
  PropsWithChildren,
};
