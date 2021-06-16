import Article from './Article/Article';
import './ArticlesWrapper.scss';
import PropTypes from 'prop-types';
import { articlePropTypes } from '../../../constants/prop-types/article';

const ArticlesWrapper = ({ articles }) => {
  const renderedArticleItems = articles.map((article, key) => {
    return <Article
      title={article.title}
      description={article.description}
      image={article.image}
      url={article.src}
      key={key}
    />;
  })

  return <div className="articles-container">{renderedArticleItems}</div>;
}
ArticlesWrapper.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    ...articlePropTypes
  }))
}

export default ArticlesWrapper;
