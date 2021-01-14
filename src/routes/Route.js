import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signedIn } = useSelector((state) => state.auth);

  if (!signedIn && isPrivate) {
    window.location.href = '/signin';
  }
  if (signedIn && !isPrivate) {
    window.location.href = '/';
  }

  return (
    <Route {...rest} render={(props) => (<Component {...props} />)} />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
