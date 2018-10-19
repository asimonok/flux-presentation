import React from 'react'

export const fluxConnect = (stores = [], mapStateToProps = () => ({})) => WrappedComponent =>
  class FluxConnect extends React.Component {
    state = {}
    unsubscribeFunctions = []

    componentWillMount () {
      this.subscribeOnStores()
      this.stateToPropsMapper()
    }

    componentWillUnmount () {
      this.onUnsubscribeOnStores()
    }

    onUnsubscribeOnStores = () => {
      this.unsubscribeFunctions.forEach(unsubscribe => unsubscribe())
    }

    subscribeOnStores = () => {
      this.unsubscribeFunctions = stores.map(store => {
        return store.subscribe(() => {
          this.stateToPropsMapper()
        })
      })
    }

    stateToPropsMapper = () => {
      const storeStates = stores.map(({ getState }) => getState())
      this.setState(mapStateToProps(...storeStates))
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
