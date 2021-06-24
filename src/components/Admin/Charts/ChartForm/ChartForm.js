import PropTypes from 'prop-types';
import { Fragment } from 'react';
import GoBackButton from '../../../shared/GoBackButton/GoBackButton';
import { adminChartPath } from '../../../../constants/paths/admin/chart';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import './ChartForm.scss';
import { rockGenre } from '../../../../constants/genres';
import useCreateChart from '../../../../hooks/chart/createChart';
import useUpdateChart from '../../../../hooks/chart/updateChart';
import { Link } from 'react-router-dom';
import { UrlHelper } from '../../../../helpers/url';

const ChartForm = ({ chart }) => {
  const { handleSubmit, formState: { errors }, control } = useForm();
  const { t } = useTranslation();
  const [createChartLoadingStatus, setChartToCreate] = useCreateChart();
  const [updateChartLoadingStatus, setChartToUpdate] = useUpdateChart();

  const onFromSubmit = (data) => {
    if (!chart || !chart._id) {
      setChartToCreate(data);
    } else {
      setChartToUpdate({id: chart._id, body: data});
    }
  }

  const getErrorBlock = () => {
    if (createChartLoadingStatus && createChartLoadingStatus.error) {
      return <Alert severity="error">{t('admin-charts.errors.create-fail')}</Alert>
    }

    if (updateChartLoadingStatus && updateChartLoadingStatus.error) {
      return <Alert severity="error">{t('admin-charts.errors.update-fail')}</Alert>
    }

    return '';
  }

  const getSuccessMessage = () => {
    if (createChartLoadingStatus && createChartLoadingStatus.success) {
      return 'admin-charts.messages.chart-created';
    }

    if (updateChartLoadingStatus && updateChartLoadingStatus.success) {
      return 'admin-charts.messages.chart-updated';
    }

    return '';
  }

  const disabledButton = createChartLoadingStatus.loading || updateChartLoadingStatus.loading;
  const buttonTranslation = chart && chart._id
    ? 'admin-charts.form.buttons.update-chart'
    : 'admin-charts.form.buttons.create-chart';
  const updateSongsButton = chart && chart._id ? (
      <Link
        to={UrlHelper.buildUpdateChartSongsUrl(chart._id)}
        className="update-chart-songs"
      >
        <Button
          size="large"
          variant="contained"
          color="primary"
        >{t('admin-charts.form.buttons.update-chart-songs')}
        </Button>
      </Link>
    ) : '';
  const successMessage = getSuccessMessage();

  const genres = [{
    value: rockGenre.metal
  },{
    value: rockGenre.alternative
  },{
    value: rockGenre.punk
  },{
    value: rockGenre.general
  },{
    value: rockGenre.grunge
  }]

  const content = successMessage
    ?  <Alert severity="success">{t(successMessage)}</Alert>
    : (
      <form className="chart-form-container" onSubmit={handleSubmit(onFromSubmit)}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          defaultValue={(chart && chart.name) || ''}
          render={
            ({ field }) =>
              <TextField
                {...field}
                error={!!errors.name}
                id="standard-name"
                label={t('admin-charts.form.labels.name')}
              />}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="slug"
          defaultValue={(chart && chart.slug) || ''}
          render={
            ({ field }) =>
              <TextField
                {...field}
                error={!!errors.slug}
                id="standard-name"
                label={t('admin-charts.form.labels.slug')}
              />}
        />
        <Controller
          control={control}
          name="description"
          defaultValue={(chart && chart.description) || ''}
          render={
            ({ field }) =>
              <TextField
                {...field}
                error={!!errors.description}
                id="standard-name"
                label={t('admin-charts.form.labels.description')}
              />}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="genre"
          defaultValue={(chart && chart.genre) || rockGenre.metal}
          render={
            ({ field }) =>
              <TextField
                {...field}
                error={!!errors.genre}
                id="standard-select-currency-native"
                select
                label={t('admin-charts.form.labels.genre')}
              >
                {genres.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
          }
        />
        {getErrorBlock()}
        <div className="buttons-container">
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={disabledButton}
          >{t(buttonTranslation)}</Button>
          {updateSongsButton}
        </div>
      </form>
    );

  return (
    <Fragment>
      {content}
      <GoBackButton text="admin-charts.form.buttons.go-to-charts" link={adminChartPath.charts} />
    </Fragment>
  );
}

ChartForm.propTypes = {
  chart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre:  PropTypes.string
  })
};

export default ChartForm;