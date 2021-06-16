import MainContentWrapper from '../shared/MainContentWrapper/MainContentWrapper';
import GoBackButton from '../shared/GoBackButton/GoBackButton';
import { globalPath } from '../../constants/paths';
import './PageNotFound.scss';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return(
    <MainContentWrapper subHeaderTitle="not-found.title">
      <div class="not-found-page-text-container">
        <p className="not-found-page-text">{t('not-found.text')}</p>
      </div>
      <GoBackButton text='not-found.buttons.go-to-home' link={globalPath} />
    </MainContentWrapper>
  )
}

export default PageNotFound;