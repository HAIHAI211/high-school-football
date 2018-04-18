import _ from 'lodash'
import {markBase, selectedMarkBase} from 'pages/site/config'
export default {
  markers (state) {
    let result = _.reduce(state.sites, (markers, site) => {
      markers.push(_.assign({}, site.id === state.selectedSiteId ? selectedMarkBase : markBase, site))
      return markers
    }, [])
    console.log('GETTER markers:', result)
    return result
  },
  selectedMarker (state) {
    if (!_.isEmpty(state.sites) && state.selectedSiteId !== -1) {
      let sm = _.find(state.sites, (o) => {
        return o.id === state.selectedSiteId
      })
      let result = _.assign({}, selectedMarkBase, sm)
      console.log('GETTER selectedMarker:', result)
      return result
    }
    return null
  }
}
