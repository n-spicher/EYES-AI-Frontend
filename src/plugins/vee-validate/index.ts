import Vue from 'vue';
import {ValidationProvider, extend} from 'vee-validate';
import {required, email, max, min, confirmed, size, ext} from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
    ...required,
    message: 'This field is required.'
});

extend('email', {
    ...email,
    message: 'Email must be valid.'
});

extend('password', {
    validate: (value: string) => new RegExp(/^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/).test(value),
    message: `Password should contain at least one digit, one lower case, one upper case and one character
  `
});

extend('true', {
    validate: value => value === true,
    message: 'This is requried.'
});

extend('phone', {
    validate: value => new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/).test(value),
    message: 'Phone must be in xxx-xxx-xxxx format.'
});
extend('alphanumeric', {
    validate: value => new RegExp(/^[a-zA-Z ]+$/).test(value),

    message: 'This field only gets alphabets'
});

extend('max', {
    ...max,
    message: 'This field must not be greater than {length} characters!'
});

extend('min', {
    ...min,
    message: 'This field must be at least {length} characters!'
});

extend('confirmed', {
    ...confirmed,
    message: "{target} confirmation doesn't match!"
});

extend('size', {
    ...size,
    message: 'File must not be greater than {size}KB!'
});

extend('alphabetic', {
    params: ['fieldName'],
    validate: value => new RegExp(/^[a-zA-Z ]+$/).test(value),

    message: (field, {fieldName}: any) => {
        return `${fieldName ?? 'This field'} can only contain alpha characters.`;
    }
});

extend('positive_float', {
    validate: value => +value >= 0,
    message: 'The value must not be negative.'
});
extend('excel_files', {
    ...ext,
    message: 'File must be of these extensions: xls, xlsx, csv.'
});

extend('mask', {
    params: ['identifier'],
    validate: (value: string, {identifier}: any) => {
        if (Array.isArray(identifier)) {
            return (identifier as Array<string>)
                .reduce((acc: Array<boolean>, curr: string) => {
                    acc.push(!!value.match(new RegExp(`^${curr.replace(/#/g, '\\d')}$`))?.length);
                    return acc;
                }, [])
                .some((x: boolean) => x);
        }
        return !!value.match(new RegExp(`^${(identifier as string).replace(/#/g, '\\d')}$`))?.length;
    },
    message: (field, {identifier}: any) => {
        return `This field must match ${
            Array.isArray(identifier) ? (identifier as Array<string>).reduce((acc, curr) => (acc += acc.length > 0 ? ` or ${curr}` : curr), '') : identifier
        } format.`;
    }
});
