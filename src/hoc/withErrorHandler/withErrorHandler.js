import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Hux from '../Hux';

const withErrorHandler = (WrappedComponent, ax) => {
  // eslint-disable-next-line react/display-name
  return class extends Component {

    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {

      this.reqInterceptor = ax.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });

      this.resInterceptor = ax.interceptors.response.use(response => response, error => {
        this.setState({error: error.message});
      });

    }

    componentWillUnmount() {
      // console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
      // can use a timeout function
      ax.interceptors.request.eject(this.reqInterceptor);
      ax.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Hux>
          <Modal 
            visible={this.state.error === null ? false : true}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Hux>
      );
    }
  };
};

export default withErrorHandler;