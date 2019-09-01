const validatProps = (params, props) => {
    const paramsKeys = Object.keys(params)
        .sort()
        .join(',');
    const propsKeys = Object.keys(props)
        .sort()
        .join(',');
    if (paramsKeys !== propsKeys) {
        console.warn(`Unsupported prop exiting ${paramsKeys} != ${propsKeys}`);
        return false;
    }
    return true;
};

export default validatProps;
