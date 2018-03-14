import PropTypes from 'prop-types';

import FromType from './From';

export default PropTypes.shape({
    from: FromType.isRequired,
    message: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    delay: PropTypes.number,
    typingDuration: PropTypes.number,
});