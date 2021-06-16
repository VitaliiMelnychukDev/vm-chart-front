import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import useAuth from '../../../store/auth';
import { Redirect } from 'react-router-dom';
import { baseAdminPath } from '../../../constants/paths/admin/admin';
import { useForm, Controller } from 'react-hook-form';
import { emailValidationPattern } from '../../../constants/patterns/shared';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import './Login.scss';
import Alert from '@material-ui/lab/Alert';

const Login = () => {
  const { handleSubmit, formState: { errors }, control } = useForm();
  const { user, loadingStatus, login } = useAuth();
  const { t } = useTranslation();

  const redirect = user ? <Redirect to={baseAdminPath} /> : '';

  const onFromSubmit = (data) => {
    const { email, password } = data;
    login(email, password);
  }

  const error = loadingStatus.error ? <Alert severity="error">{t('login.errors.login-fail')}</Alert> : '';

  return (
    <MainContentWrapper subHeaderTitle={'login.title'}>
      <form className="login-form" onSubmit={handleSubmit(onFromSubmit)}>
        <Controller
          control={control}
          rules={{ required: true, pattern: emailValidationPattern }}
          name="email"
          defaultValue=""
          render={
            ({ field }) =>
              <TextField
                {...field}
                error={!!errors.email}
                id="standard-name"
                label={t('login.form.label.email')}
              />}
        />
        <Controller
          control={control}
          rules={{ required: true, minLength: 8 }}
          name="password"
          defaultValue=""
          render={
            ({ field }) =>
              <TextField
                {...field}
                type="password"
                error={!!errors.password}
                id="standard-name"
                label={t('login.form.label.password')}
              />}
        />
        {error}
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={loadingStatus.loading}
        >{t('login.form.buttons.login')}</Button>
      </form>
      {redirect}
    </MainContentWrapper>
  )
}

export default Login;