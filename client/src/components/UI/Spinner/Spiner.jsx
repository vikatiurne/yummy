import {FidgetSpinner} from 'react-loader-spinner'

const Spiner = () => {
  return (
    <FidgetSpinner
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    ballColors={['#e5a6fb', '#e5a6fb', '#e5a6fb']}
    backgroundColor="#6d1e93"
  />
  )
}

export default Spiner