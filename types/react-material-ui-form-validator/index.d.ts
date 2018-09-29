declare module 'react-material-ui-form-validator' {
  import * as React from 'react';
  import { TextFieldProps } from '@material-ui/core/TextField';

  export interface ValidatorFormProps {
    children?: React.ReactNode | React.ReactNodeArray;
    debounceTime?: number;
    instantValidate?: boolean;
    onSubmit: (event: React.FormEvent) => void;
    onError?: (errors?: any[]) => void;
  }

  export interface TextValidatorProps extends TextFieldProps {
    errorMessages?: string[] | string;
    validators: any[];
    withRequiredValidator?: boolean;
    name: string;
    validatorListener?: () => void;
  }
  export class ValidatorComponent extends React.Component<TextValidatorProps> { }
  export class ValidatorForm extends React.Component<ValidatorFormProps> {
    public static addValidationRule: (name: string, callback: (value: string) => boolean) => void;
  }
  export class TextValidator extends ValidatorComponent { }
}