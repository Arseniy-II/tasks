import Formsy                   from 'formsy-react';
import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import scrollToElemById         from '../../../../util/scrollToElemById';
import styles                   from './styles.scss';

class FormsyComponent extends PureComponent {
    state = {
        errorMessage: null,
    };
    /**
     *
     * @param {string} [errorMessage]
     */
    setErrorMessage = (errorMessage) => {
        this.setState({ errorMessage });
    };
    /**
     * Remove error message and run onValidSubmit
     *
     * @param {Array} params
     */
    handleValidSubmit = (...params) => {
        this.props.onValidSubmit(...params);
        this.setErrorMessage(null);
    };
    /**
     * Will set general error to form and scroll to first wrong input
     *
     * @param {Array} params
     */
    handleInvalidSubmit = (...params) => {
        if (this.props.onInvalidSubmit) {
            this.props.onInvalidSubmit(...params);
        }
        let scrolled = false;
        const requiredErrors = {};
        for (let i = 0; i < this.ref.inputs.length; i++) {
            const isInvalid = !this.ref.inputs[ i ].isValid();
            if (isInvalid && !scrolled) {
                scrolled = true;
                scrollToElemById(this.ref.inputs[ i ].props.name, true);
            }
            if (isInvalid) {
                requiredErrors[ this.ref.inputs[ i ].props.name ] = 'Required' ;
            }
        }
        this.ref.updateInputsWithError(
            requiredErrors,
            true,
        );
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage !== this.props.errorMessage && !(nextProps.errorMessage instanceof Array)) {
            this.setErrorMessage(nextProps.errorMessage);
        }
        if (nextProps.errorMessage !== this.props.errorMessage && (nextProps.errorMessage instanceof Array)) {
            const inputNames = [];
            for (let i = 0; i < this.ref.inputs.length; i++) {
                inputNames.push(this.ref.inputs[ i ].props.name);
            }
            const inputsWithError = {};
            nextProps.errorMessage.forEach(({ key, value }) => {
                if (inputNames.includes(key)) {
                    inputsWithError[ key ] = value;
                }
            });
            this.ref.updateInputsWithError(
                inputsWithError,
                true,
            );
        }
    }

    render() {
        const { errorMessage } = this.state;
        const { handleValidSubmit, handleInvalidSubmit } = this;
        const { onChange, children, onValid, onInvalid, className, formId } = this.props;
        return (
            <Formsy
                className={ className }
                onValidSubmit={ handleValidSubmit }
                onInvalidSubmit={ handleInvalidSubmit }
                onValid={ onValid }
                onInvalid={ onInvalid }
                onChange={ onChange }
                ref={ (ref) => {
                    this.ref = ref;
                } }
            >
                { children }
                <input
                    type="submit"
                    id={ formId }
                    hidden
                />
                { errorMessage && <div
                    className={ styles.error }
                >
                    { errorMessage }
                </div>
                }
            </Formsy>
        );
    }
}

FormsyComponent.propTypes = {
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
    errorMessage: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    onChange: PropTypes.func,
    onValidSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    formId: PropTypes.string.isRequired, // pass same id for FormsyButtonComponent
    className: PropTypes.string,
};

export default FormsyComponent;
