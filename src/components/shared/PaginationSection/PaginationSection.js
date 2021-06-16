import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import React from 'react';
import './PaginationSection.scss';
import { useTranslation } from 'react-i18next';

const PaginationSection = ({ pageCount, paginationClickHandler }) => {
  const { t } = useTranslation();

  let paginativeSection = pageCount <= 1 ? '' :
    <ReactPaginate
      previousLabel={t('pagination.prev')}
      nextLabel={t('pagination.next')}
      breakLabel={t('pagination.break-label')}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={paginationClickHandler}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />;

  return <React.Fragment>{paginativeSection}</React.Fragment>;
}

PaginationSection.propTypes = {
  pageCount: PropTypes.number.isRequired,
  paginationClickHandler: PropTypes.func.isRequired
}

export default PaginationSection;