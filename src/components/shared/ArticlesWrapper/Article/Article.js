import './Article.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articlePropTypes } from '../../../../constants/prop-types/article';

const Article = ({ title, description, image, url }) => {
  const { t } = useTranslation();

  return (
    <article className="article-container">
      <h2 className="article-title">{t(title)}</h2>
      <p className="article-description">{t(description)}</p>
      <Link to={url}>
        <div className="article-image" style={{ backgroundImage: `url(${image})` }}></div>
      </Link>
    </article>
  );
}

Article.propTypes = {
  ...articlePropTypes
}


export default Article;