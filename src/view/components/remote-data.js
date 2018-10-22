// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Empty = () => null;

const StyledActivityIndicator = styled.ActivityIndicator`
  flex: 1;
`;

type Props = {
  isLoading: boolean,
  hasData: boolean,
  hasError: boolean,
  NotAsked?: void => void,
  Success?: React.ComponentType<any>,
  Failure?: React.ComponentType<any>,
  Loading?: React.ComponentType<any>
};

const RemoteData = ({isLoading, hasData, hasError, Success, Failure, Loading, NotAsked}: Props) => {
  if (isLoading && Loading) {
    return <Loading />;
  }
  if (hasError && Failure) {
    return <Failure />;
  }
  if (hasData && Success) {
    return <Success />;
  }
  // Silencing flow here, since `NotAsked` is passed in as a default
  // prop thorugh using `prop-types`
  // $FlowFixMe
  return <NotAsked />;
};

RemoteData.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  NotAsked: PropTypes.func,
  Loading: PropTypes.func,
  Success: PropTypes.func,
  Failure: PropTypes.func
};

RemoteData.defaultProps = {
  NotAsked: StyledActivityIndicator,
  Loading: StyledActivityIndicator,
  Success: Empty,
  Failure: Empty
};

export default RemoteData;
