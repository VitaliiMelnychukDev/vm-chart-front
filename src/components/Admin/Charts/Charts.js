import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import GoBackButton from '../../shared/GoBackButton/GoBackButton';
import { baseAdminPath } from '../../../constants/paths/admin/admin';
import './Charts.scss';
import useAuth from '../../../store/auth';
import { useEffect, useState } from 'react';
import { UrlHelper } from '../../../helpers/url';
import Alert from '@material-ui/lab/Alert';
import { UserHelper } from '../../../helpers/user';
import ItemsList from '../ItemsList/ItemsList';
import Loader from '../../shared/Loader/Loader';
import Modal from '../../shared/Modal/Modal';
import YesNoModal from '../YesNoModal/YesNoModal';
import SpinnerWrapper from '../../shared/SpinnerWrapper/SpinnerWrapper';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Search from '../Search/Search';
import PaginationSection from '../../shared/PaginationSection/PaginationSection';
import useSearchCharts from '../../../hooks/chart/searchCharts';
import useRemoveChart from '../../../hooks/chart/removeChart';
import { adminChartPath } from '../../../constants/paths/admin/chart';

//ToDo pagination if delete last chart on page; message in case chart was not deleted.
const Charts = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [pageCount, charts, loadingStatus, setPage, setFilters] = useSearchCharts();
  const [deleteChartId, setDeleteChartId] = useState('');
  const [removeChartLoadingStatus, setChartIdToRemove] = useRemoveChart();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const onItemRemove = (id) => {
    setDeleteChartId(id);
  }

  const onRemoveItemYes = () => {
    setChartIdToRemove(deleteChartId);
    setDeleteChartId('');
  }

  const onRemoveItemNo = () => {
    setDeleteChartId('');
  }

  const onFindChart = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm || searchTerm === '') {
      setFilters({
        searchTerm
      })
      setSearchTerm(searchTerm);
    }
  }

  useEffect(() => {
    if (removeChartLoadingStatus && removeChartLoadingStatus.success) {
      setFilters({
        searchTerm,
        timestamp: Date.now()
      });
    }
  }, [removeChartLoadingStatus]);

  const getItemsListsToShow = () => {
    return charts.map((chart) => {
      return {
        title: chart.name,
        id: chart._id,
        url: getUpdateUrl(chart._id)
      }
    });
  }

  const getUpdateUrl = (id) => {
    return UrlHelper.buildUpdateChartUrl(id);
  }

  const getContent = () => {
    if (loadingStatus.error) {
      return <Alert severity="error">{t('shared.errors.server-error')}</Alert>;
    }

    const manageProps = UserHelper.canManageCharts(user.roles) ? { onRemove: onItemRemove } : {};

    return <ItemsList {...manageProps} items={getItemsListsToShow()} />
  }

  const content = loadingStatus.loading ? <Loader /> : getContent();

  const deleteChartBlock = deleteChartId ? (
    <Modal>
      <YesNoModal onYes={onRemoveItemYes} onNo={onRemoveItemNo} text="admin-charts.delete-message" />
    </Modal>
  ) : '';

  const spinnerWrapperBlock = removeChartLoadingStatus && removeChartLoadingStatus.loading ? <SpinnerWrapper /> : '';

  const errorBlock = removeChartLoadingStatus && removeChartLoadingStatus.error
    ? <Alert severity="error">{t('admin-charts.errors.remove-fail')}</Alert>
    : '';

  const createChartButton = UserHelper.canManageCharts(user.roles) ? (
    <Link to={adminChartPath.create} >
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="primary"
      >{t('admin-charts.buttons.create-chart')}</Button>
  </Link>
  ) : '';

  return (
    <MainContentWrapper subHeaderTitle={t('admin-charts.title')}>
      <div className="charts-page-wrapper">
        {errorBlock}
        <div className="charts-table-header">
          <Search label="admin-charts.search-text" onChange={onFindChart} />
          {createChartButton}
        </div>
        <div>
          {content}
        </div>
        <PaginationSection pageCount={pageCount} paginationClickHandler={handlePageClick} />
        <GoBackButton text={'shared.buttons.go-to-admin'} link={baseAdminPath} />
        {deleteChartBlock}
        {spinnerWrapperBlock}
      </div>
    </MainContentWrapper>
  );
}

export default Charts;