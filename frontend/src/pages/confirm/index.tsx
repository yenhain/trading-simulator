import styles from './Confirmation.module.scss';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import authentication from '@redux/actions/authentication';

const Confirmation = () => {

  const params = useParams();

  const {errors} = useAppSelector(state => state.authentication);

  const dispatch = useAppDispatch();

  useEffect(() => {

    if(params.token) dispatch(authentication.confirm_with_email(params.token));

    return () =>  { dispatch(authentication.state_clear("errors", "")) };

  }, [params.token, dispatch]);

  return (
    <div className={styles.container}>
      {
        errors.confirm
        ? 
          <div>
            <Link to="/login">{errors.confirm}</Link>
          </div>
        : 
          <div>
            <p>Checking</p>
            <div className='loading-30 center' />
          </div>
      }

    </div>
  )

}

export default Confirmation