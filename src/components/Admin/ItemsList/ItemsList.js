import PropTypes from 'prop-types';
import './ItemList.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const ItemsList = ({ items, onRemove }) => {
  const getUpdateEl = (url) => {
    return onRemove ? <Link to={url}> <EditIcon  className='item-remove' /></Link> : '';
  }

  const getRemoveEl = (id) => {
    return onRemove ? <DeleteIcon className='item-edit' onClick={() => { onRemove(id) }} /> : '';
  }

  const itemsToShow = items.map((item) => {
    return <div className="list-item" key={item.id}>
      <div className="item-title">{item.title}</div>
      <div className="item-actions">
        {getRemoveEl(item.id)}
        {getUpdateEl(item.url)}
      </div>
    </div>;
  })

  return <div className="list-container">{itemsToShow}</div>;
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf((PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }))).isRequired,
  onRemove: PropTypes.func
}

export default ItemsList;