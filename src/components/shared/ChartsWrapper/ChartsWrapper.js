import PropTypes from 'prop-types';
import { chartPropTypes } from '../../../constants/prop-types/chart';
import ChartItem from './ChartItem/ChartItem';
import './ChartsWrapper.scss';

const ChartsWrapper = ({ charts }) => {
  const chartsHtml = charts.map((chart) => {
    return <ChartItem
      key ={chart._id}
      slug={chart.slug}
      description={chart.description}
      title={chart.name}
    />
  })

  return <div className="charts-container">{chartsHtml}</div>;
}

ChartsWrapper.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    ...chartPropTypes,
    _id: PropTypes.string.isRequired
  }))
}

export default ChartsWrapper;