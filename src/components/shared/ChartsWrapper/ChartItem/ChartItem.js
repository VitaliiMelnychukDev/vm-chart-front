import { useTranslation } from 'react-i18next';
import { chartPropTypes } from '../../../../constants/prop-types/chart';
import { Link } from 'react-router-dom';
import { UrlHelper } from '../../../../helpers/url';
import { Button } from '@material-ui/core';
import './ChartItem.scss';

const ChartItem = ({ title, description, slug }) => {
  const { t } = useTranslation();

  const descriptionText = description ? t(description) : '';

  return (
    <div className="chart-container">
      <h2 className="chart-title">{t(title)}</h2>
      <p className="chart-description">{descriptionText}</p>
      <Link to={UrlHelper.buildChartUrl(slug)} >
        <Button
          size="medium"
          variant="contained"
          color="primary"
        >{t('shared.buttons.open-chart')}</Button>
      </Link>
    </div>
  );
}

ChartItem.propTypes = {
  ...chartPropTypes
}

export default ChartItem;