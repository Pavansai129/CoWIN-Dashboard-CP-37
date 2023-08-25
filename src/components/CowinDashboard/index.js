import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    lastSevenDaysVaccination: '',
    vaccinationByGender: '',
    vaccinationByAge: '',
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (response.ok === true) {
      const updatedLastSevenDaysVaccination = data.last_7_days_vaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        each => ({
          gender: each.gender,
          count: each.count,
        }),
      )
      const updatedVaccinationByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        lastSevenDaysVaccination: updatedLastSevenDaysVaccination,
        vaccinationByAge: updatedVaccinationByAge,
        vaccinationByGender: updatedVaccinationByGender,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      lastSevenDaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state
    return (
      <>
        <div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1>Co-WIN</h1>
          </div>
          <h1>CoWIN Vaccination in India</h1>
          <div>
            <h1>Vaccination Coverage</h1>
            <VaccinationCoverage
              lastSevenDaysVaccination={lastSevenDaysVaccination}
            />
          </div>
          <div>
            <h1>Vaccination by Gender</h1>
            <VaccinationByGender vaccinationByGender={vaccinationByGender} />
          </div>
          <div>
            <h1>vaccination by Age</h1>
            <VaccinationByAge vaccinationByAge={vaccinationByAge} />
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinDashboard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCowinDashboard()}</div>
  }
}

export default CowinDashboard
