import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";
import { Tween } from 'react-gsap';

import { CREATE_USER_FULFILLED } from "src/redux/constants";
// import ErrorWithDelay from "./ErrorWithDelay";
import { createUser, showPreloader, hidePreloader } from "src/redux/actions";
import { login } from "src/storage";
// import { fetchUser } from "src/api";


// validation
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const required = value => (value ? undefined : "Required");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
const match_email = value => (
    value.match(emailRegexp) ? undefined : 'Email does not match validation scheme "my@mail.com"'
);

const instRegexp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;
const match_inst = value => (
    value.match(instRegexp) ? undefined : "Your name Instagram is incorrect"
);

// const phoneRegexp = /\(?([0-9]{3})\)?([ .-])?([0-9]{3})([ .-])?([0-9]{4})/g;
// const match_phone = value => (
//     value.match(phoneRegexp) ? undefined : "Phone does not match validation scheme (999) 999-9999"
// );

// parse
// const normalizePhone = value => {
//     if (!value) return value;
//     const onlyNums = value.replace(/[^\d]/g, "");
//     if (onlyNums.length <= 3) return onlyNums;
//     if (onlyNums.length <= 7)
//         return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
//     return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
// };

// formatter
//

// animations
const delay = 1.2;

const WrappedField = ({ input, meta, placeholder, animationDelay }) => {
    const name = input.name;
    const { touched, error } = meta;
    const invalid = error && touched;
    let classes = `field field-${name}`;
    if (invalid) classes += ' invalid';

    return (
        <Tween
            from={{
                opacity: 0,
                x: -270,
                delay: delay + animationDelay,
            }}
            duration={0.8}
            ease="elastic.out(0.2, 0.1)"
        >
            <div className={classes}>
                <div className="control">
                    <input {...input} type="text" placeholder={placeholder} />
                    {invalid && <div className="error"><span>{error}</span></div>}
                    {/*<ErrorWithDelay name={name} delay={3000}>*/}
                    {/*{error => <div className="error"><span>{error}</span></div>}*/}
                    {/*</ErrorWithDelay>*/}
                </div>
            </div>
        </Tween>
    )
};

WrappedField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object
};


export const LoginForm = ({ next }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const onSubmit = async values => {
        dispatch(showPreloader());

        // trying fetch user
        // try {
        //     const response = await fetchUser(
        //         values.email, values.instagram
        //     );
        //     if (response.data.data.length) {
        //         login(values);
        //         history.push(next);
        //         return Promise.resolve();
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        // if no user, create it
        return dispatch(createUser(
            values.email, values.instagram
        )).then(
            ({value, action}) => {
                if (action && action.type === CREATE_USER_FULFILLED) {
                    login(value.data.id);
                    dispatch(hidePreloader());
                    history.push(next);
                }
            }, (error) => {});
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, values }) => (
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <Field name="email"
                               placeholder="Email"
                               animationDelay={0}
                               component={WrappedField}
                               validate={composeValidators(required, match_email)} />
                        <Field name="instagram"
                               placeholder="Instagram"
                               animationDelay={0.1}
                               component={WrappedField}
                               validate={composeValidators(required, match_inst)} />
                        {/*<Field name="phone"*/}
                        {/*       placeholder="(999) 999-9999"*/}
                        {/*       animationDelay={0.2}*/}
                        {/*       component={WrappedField}*/}
                        {/*       validate={composeValidators(required, match_phone)}*/}
                        {/*       parse={normalizePhone} />*/}
                    </div>

                    <div className="form-btn-wrap center-text">
                        <Tween
                            from={{
                                opacity: 0,
                                x: 270,
                                rotationX: -180,
                                rotationY: -210,
                                rotationZ: -90,
                                delay: delay + 0.1
                            }}
                            duration={0.8}
                            ease="elastic.out(0.2, 0.1)"
                        >
                            <button type="submit" disabled={submitting} className="btn btn-green">
                                <span className="btn-text">{"play"}</span>
                            </button>
                        </Tween>
                    </div>
                </form>
            )}
        />
    )
};

LoginForm.propTypes = {
    next: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};
