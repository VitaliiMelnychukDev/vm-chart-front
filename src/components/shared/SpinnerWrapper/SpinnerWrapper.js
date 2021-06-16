import './SpinnerWrapper.scss';
import Loader from '../Loader/Loader';

const SpinnerWrapper = () => {
  return (
    <div className="spinner-container">
      <Loader />
    </div>
  );
}

export default SpinnerWrapper;