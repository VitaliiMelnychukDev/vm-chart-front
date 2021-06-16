import './Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <span>{t('footer.title')}</span>
    </footer>
  )
}

export default Footer;