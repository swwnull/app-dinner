import { getToken, getIslogin,getUserinfo} from '@/utils/auth'
import { getshoplists} from '@/utils/shop'
const getDefaultState = () => {
    return {
      token: getToken(),
      userinfo: getUserinfo(),
      shoplists: getshoplists(),
      islogin: getIslogin()
    }
  }
  export default getDefaultState