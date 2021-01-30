import React, {Component} from 'react';
import {connect} from 'react-redux';
interface obj {
  isAuthenticated: boolean,
  history: {
    push: Function}
}
const CheckLoggedInUser = (ComposedComponent) => {
  /**
   *
   */
  class Authenticate extends Component {
    /**
     * @return {*} set user authentication status
     */
    props: obj
    componentWillMount (): any {
        if (this.props.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    }

    /**
     *
     * @param {*} nextProps
     * @return {*} props
     */
    componentWillUpdate (nextProps: { isAuthenticated: any; }): any {
        if (nextProps.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    }

    /**
     * @return {DOM} DOM
     */
    render () {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  
 

  const mapStateToProps = (state: { setCurrentUser: { isAuthenticated: any; }; }) => ({
    isAuthenticated: state.setCurrentUser.isAuthenticated,
  });

  return connect(mapStateToProps, null)(Authenticate);
};
export default CheckLoggedInUser;