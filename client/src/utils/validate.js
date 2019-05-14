exports.validateEmail = (email) => {
    const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && !re.test(String(email).toLowerCase())){
        return `These emails are invalid: ${email}`;
    }
    return;
}

exports.validatePropertyValue = (value) => {
    if (value < 0){
        return `Value sholud be more than 0. ${value}`;
    }
    return undefined;
}

exports.required = (value) => {
    return value => (value ? undefined : 'Required')
}
