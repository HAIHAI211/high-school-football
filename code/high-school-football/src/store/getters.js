import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import assign from 'lodash/assign'
import {markBase, selectedMarkBase} from 'pages/site/config'
export default {
  markers (state) {
    let result = reduce(state.sites, (markers, site) => {
      markers.push(assign({}, site.id === state.selectedSiteId ? selectedMarkBase : markBase, site))
      return markers
    }, [])
    return result
  },
  selectedMarker (state) {
    if (!isEmpty(state.sites) && state.selectedSiteId !== -1) {
      let sm = find(state.sites, (o) => {
        return o.id === state.selectedSiteId
      })
      let result = assign({}, selectedMarkBase, sm)
      return result
    }
    return null
  }
}
