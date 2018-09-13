import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./services/blogs')
jest.mock('./services/login')

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {},
  removeItem: () => {
    savedItems = {}
  }
}

window.localStorage = localStorageMock
