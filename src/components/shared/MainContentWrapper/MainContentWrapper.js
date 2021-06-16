import SubHeader from '../SubHeader/SubHeader';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

export const MainContentWrapper = ({ subHeaderTitle, children }) => {
  let subheaderBlock = subHeaderTitle ? <SubHeader title={subHeaderTitle} /> : '';

  return (
    <Fragment>
      {subheaderBlock}
      <div className="content">{children}</div>
    </Fragment>
  )
}

MainContentWrapper.propTypes = {
  subHeaderTitle: PropTypes.string
}

export default MainContentWrapper;